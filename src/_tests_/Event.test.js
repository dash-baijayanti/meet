import Event from "../components/Event";
import { mockData } from "../mock-data";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe('<Event /> component', () => {
  let EventComponent;
  const event = mockData[0];
  beforeEach(() => {
    EventComponent = render(<Event event={event}/>);
  })

  test('renders event location', () => {
    expect (EventComponent.queryByText(mockData[0].location)).toBeInTheDocument;
  });

  test('renders event starttime', () => {
    expect (EventComponent.queryByText(mockData[0].created)).toBeInTheDocument;
  });

  test('renders event title', () => {
    expect (EventComponent.queryByText(mockData[0].summary)).toBeInTheDocument;
  })

  test('renders event show details button', () => {
    expect (EventComponent.queryByText('show details')).toBeInTheDocument;
  })

  test('event details are hidden by default', () => {
    const eventDetails = EventComponent.container.querySelector('.details');
    expect (eventDetails).not.toBeInTheDocument;
  })

  test('renders event details when user clicks on show details button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText('Show Details');
    await user.click(button);
    const details = EventComponent.container.querySelector('.details');
    expect (details).toBeInTheDocument;
  })
  
  test('hides event details when user clicks on hide details button', async () => {
    const user = userEvent.setup();
    let button = EventComponent.queryByText('Show Details');
    await user.click(button);
    let details = EventComponent.container.querySelector('.details');
    expect (details).toBeInTheDocument;

    button = EventComponent.queryByText('Hide Details');
    await user.click(button);
    details = EventComponent.container.querySelector('.details');
    expect (details).not.toBeInTheDocument;
  })

  
});