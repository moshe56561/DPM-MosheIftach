import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReusableCardForm from "./ReusableCardForm";
import "@testing-library/jest-dom";

describe("ReusableCardForm", () => {
  it("renders the form and inputs correctly", () => {
    render(<ReusableCardForm />);

    // Check that the title and description input fields are present
    expect(screen.getByLabelText("New Card Title")).toBeInTheDocument();
    expect(screen.getByLabelText("New Card Description")).toBeInTheDocument();
    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Add Card")).toBeInTheDocument();
  });

  it("shows an error message if title or description is missing", async () => {
    render(<ReusableCardForm />);

    // Click the 'Add Card' button without filling in any fields
    fireEvent.click(screen.getByText("Add Card"));

    // Check that an error message is displayed
    await waitFor(() =>
      expect(
        screen.getByText("Title and Description are required.")
      ).toBeInTheDocument()
    );
  });

  it("adds a new card when valid input is provided", async () => {
    render(<ReusableCardForm />);

    const titleInput = screen.getByLabelText("New Card Title");
    const descriptionInput = screen.getByLabelText("New Card Description");
    const addButton = screen.getByText("Add Card");

    // Fill in the inputs
    fireEvent.change(titleInput, { target: { value: "New Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "This is a new task description." },
    });

    // Click the 'Add Card' button
    fireEvent.click(addButton);

    // Check that the new card appears in the grid
    await waitFor(() =>
      expect(screen.getByText("New Task")).toBeInTheDocument()
    );
    expect(
      screen.getByText("This is a new task description.")
    ).toBeInTheDocument();
  });

  it("handles editing a card", async () => {
    const preLoadedData = [
      {
        id: 1,
        title: "Test Card",
        description: "Test Description",
        status: "Active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isEditing: false,
      },
    ];
    render(<ReusableCardForm preLoadedData={preLoadedData} />);

    const editButton = screen.getByText("Edit");

    // Click the 'Edit' button
    fireEvent.click(editButton);

    // Edit the title and description
    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });

    // Save the changes
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    // Check that the updated values are displayed
    await waitFor(() =>
      expect(screen.getByText("Updated Title")).toBeInTheDocument()
    );
    expect(screen.getByText("Updated Description")).toBeInTheDocument();
  });

  it("handles deleting a card", async () => {
    const preLoadedData = [
      {
        id: 1,
        title: "Test Card",
        description: "Test Description",
        status: "Active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isEditing: false,
      },
    ];
    render(<ReusableCardForm preLoadedData={preLoadedData} />);

    const deleteButton = screen.getByText("Delete");

    // Click the 'Delete' button
    fireEvent.click(deleteButton);

    // Check that the card is no longer in the document
    await waitFor(() => expect(screen.queryByText("Test Card")).toBeNull());
  });
});
