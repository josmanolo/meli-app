import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import SearchBar from "..";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SearchBar Component", () => {
  it("Renders component correctly", () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
      pathname: "/test",
      query: { search: "" },
    }));

    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Nunca dejes de buscar")
    ).toBeInTheDocument();
  });

  it("Updates input value on change", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Nunca dejes de buscar"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "term" } });
    expect(input.value).toBe("term");
  });

  it("Submits the form and navigates to items URL", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Nunca dejes de buscar"
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "term" } });
    fireEvent.submit(screen.getByRole("search"));

    expect(mockPush).toHaveBeenCalledWith("/items?search=term");
  });

  it("Updates the state on input change", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Nunca dejes de buscar"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Search term" } });
    expect(input.value).toBe("Search term");
  });

  it("Submits the form when the search button is clicked", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push: mockPush }));

    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Nunca dejes de buscar"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "term" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(mockPush).toHaveBeenCalledWith("/items?search=term");
  });

  it("Focuses the input when an empty value is submitted", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Nunca dejes de buscar"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(screen.getByRole("search"));

    expect(document.activeElement).toBe(input);
  });
});
