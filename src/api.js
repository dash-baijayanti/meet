import mockData from "./mock-data";
import './App.css';

export const extractLocations = (events = []) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

      // window.location.protocol +
      // "//" +
      // window.location.host +
      // window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = `${window.location.protocol}//${window.location.host}`;
    // newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    try{
    const url =  `https://m4smi1kcse.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    if (result) {
      return result.events;
    } else {
      throw new Error('Empty response from server');
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
};

const getToken = async (code) => {
  // const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    `https://m4smi1kcse.execute-api.eu-central-1.amazonaws.com/dev/api/token/${code}`
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
      if (!code) {
        const response = await fetch(
          "https://cctxyvyeul.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
        );
        const result = await response.json();
        const { authUrl } = result;
        return (window.location.href = authUrl);
      }
      return code && getToken(code);
      }
  return accessToken;
}