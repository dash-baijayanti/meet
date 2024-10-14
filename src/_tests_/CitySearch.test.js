import { render } from "@testing-library/react";
import CitySearch from "../components/CitySearch";

describe('<CitySearch /> component', () => {
  test('renders text input',  () => {
    const CitySearchComponent = render(<CitySearch/>);
    const CityTextbox = CitySearchComponent.queryByRole('textbox');
    expect(CityTextbox).toBeInTheDocument();
    expect(CityTextbox).toHaveClass('city'); 
  });
});