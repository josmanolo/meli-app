import { render, screen } from "@testing-library/react";
import { ItemProps } from "@/interfaces";
import Item from "..";

describe("Item Component", () => {
  const mockItem: ItemProps = {
    details: {
      id: "1",
      title: "Cámara",
      price: {
        currency: "ARS",
        amount: 5999,
        decimals: 0,
      },
      picture: "/path/to/image.jpg",
      condition: "",
      free_shipping: true,
      city: "Buenos Aires",
    },
  };

  it("Renders the item with details", () => {
    render(<Item details={mockItem.details} />);

    const price = screen.getByText("$ 5.999");
    const title = screen.getByText("Cámara");
    const image = screen.getByRole("img", { name: /Imagen de Cámara/ });

    expect(price).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("Displays free shipping image", () => {
    render(<Item details={mockItem.details} />);

    const freeShippingImage = screen.getByRole("img", {
      name: "Envío gratis disponible",
    });
    expect(freeShippingImage).toBeInTheDocument();
  });

  it("Doesn't display free shipping image", () => {
    const newItemProps = {
      ...mockItem,
      details: {
        ...mockItem.details,
        free_shipping: false,
      },
    };
    render(<Item details={newItemProps.details} />);

    const freeShippingImage = screen.queryByRole("img", {
      name: "Envío gratis disponible",
    });
    expect(freeShippingImage).not.toBeInTheDocument();
  });

  it("Renders the city information", () => {
    render(<Item details={mockItem.details} />);

    const city = screen.getByText("Buenos Aires");
    expect(city).toBeInTheDocument();
  });
});
