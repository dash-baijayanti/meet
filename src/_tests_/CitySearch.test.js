import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";

jest.mock("../api");

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
     CitySearchComponent = render(<CitySearch/>);
  });
  // afterEach(() => {
  //   cleanup(); // Ensure everything is cleaned up after each test
  //  });

  test('renders text input',  () => {
    const CityTextbox = CitySearchComponent.queryByRole('textbox');
    expect(CityTextbox).toBeInTheDocument();
    expect(CityTextbox).toHaveClass('city'); 
  });
  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect (suggestionList).not.toBeInTheDocument();
  });
  test('renders a list of suggesions when city textbox gains focus', async() => {
    const user = userEvent.setup();
    const CityTextbox = CitySearchComponent.queryByRole('textbox');
    await user.click(CityTextbox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });
  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }): [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

});