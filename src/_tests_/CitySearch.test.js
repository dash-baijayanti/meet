import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";


describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
     CitySearchComponent = render( <CitySearch
      //  setCurrentCity={() => {}}
       allLocations={[]}
       setCurrentCity={() => { }}
       setInfoAlert={() => { }}
      />);
  });

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
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => {}} 
    />);

    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox,"Berlin");

    
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents(); 
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => {}} />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox,"Berlin");

     // the suggestion's textContent look like this: "Berlin, Germany"
     const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

     await user.click(BerlinGermanySuggestion);
 
     expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
   });

});