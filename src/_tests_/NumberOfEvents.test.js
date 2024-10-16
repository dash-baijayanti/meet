import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setEventCount={() => {}} />);
  })

  test('number of events has the role of textbox', () => {
    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('ensures the default value of textbox is 32', () => {
    const inputElement = getByRole('textbox');
    expect(inputElement.value).toBe('32');
  });

  test('texbox value changes according to what user types', async () => {
    const inputElement = getByRole('textbox');
  
    // Simulate typing into the input (e.g., remove 32 and type 10)
    fireEvent.change(inputElement, { target: { value: '10' } });
    
    // Expect the input's value to be 10 now
    expect(inputElement.value).toBe('10');
  });

  
});