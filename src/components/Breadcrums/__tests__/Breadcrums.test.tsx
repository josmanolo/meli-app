import { render, screen } from "@testing-library/react";
import Breadcrumbs from "..";

describe("Breadcrumbs Component", () => {
  it("Renders breadcrumb items based on categories prop", () => {
    const categories = ["Música", "Guitarras", "Fender"];

    render(<Breadcrumbs categories={categories} />);
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument(); 
    });
  });
});
