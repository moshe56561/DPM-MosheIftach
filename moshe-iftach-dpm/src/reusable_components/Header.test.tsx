import { render, screen } from "@testing-library/react";
import Header from "./Header";

// Mock props
const mockEmail = "user@example.com";

describe("Header Component", () => {
  test("renders header with the correct email", () => {
    // Render the Header component with mock email prop
    render(<Header email={mockEmail} />);

    // Check if the email is displayed in the header
    const emailText = screen.getByText(`Welcome, ${mockEmail}`);
    expect(emailText).toBeInTheDocument();
  });

  test("renders the header with correct typography", () => {
    // Render the Header component
    render(<Header email={mockEmail} />);

    // Check if Typography element is rendered with variant="h6"
    const typography = screen.getByText(`Welcome, ${mockEmail}`);
    expect(typography).toHaveClass("MuiTypography-h6");
  });

  test("does not render incorrect email", () => {
    // Render the Header component with a different email
    render(<Header email="another@example.com" />);

    // Check that the original email is not rendered
    const incorrectEmail = screen.queryByText(`Welcome, ${mockEmail}`);
    expect(incorrectEmail).not.toBeInTheDocument();
  });
});
