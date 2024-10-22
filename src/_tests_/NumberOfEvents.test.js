import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";


describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents  setCurrentNOE= {() => {}} setEventCount={() => {}} />);
  })

  test('number of events has the role of textbox', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    expect(input).toBeInTheDocument(); 
  });

  test('ensures the default value of textbox is 32', async() => {
    expect( NumberOfEventsComponent.getByRole('textbox')).toHaveValue('32'); 
  });

  test('texbox value changes according to what user types', async () => {
    const numverOfEvents = NumberOfEventsComponent.getByRole('textbox');
    const user = userEvent.setup(); 
    await user.type(numverOfEvents, '{backspace}{backspace}10');   
    const allEvents = await getEvents(); 
    NumberOfEventsComponent.rerender(<NumberOfEvents setCurrentNOE={allEvents}  setEventCount={() => {}} />);   
    expect(numverOfEvents).toHaveValue('10');
  });

  
});