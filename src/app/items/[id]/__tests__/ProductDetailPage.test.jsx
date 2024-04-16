import { render, screen, waitFor } from "@testing-library/react";
import { jest } from "@jest/globals";
import ProductDetailPage, { generateMetadata, getItem } from "../page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: () => {
    return "Next image";
  },
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        item: {
          id: "1",
          title: "Guitarra Fender",
          price: { amount: 1000, currency: "USD" },
          picture: "/path/to/guitar.jpg",
          condition: "new",
          description: "Descripción de la Guitarra Fender",
          categories_path: ["Música", "Instrumentos", "Guitarras"],
        },
      }),
  })
);

describe("generateMetadata Function", () => {
  it("generates correct metadata for a product", async () => {
    const metadata = await generateMetadata({ params: { id: "1" } });
    expect(metadata).toEqual({
      title: "Guitarra Fender - Mercado Libre",
      description: "Descripción de la Guitarra Fender",
      openGraph: {
        images: [{ url: "/path/to/guitar.jpg" }],
      },
    });
  });
});

describe("getItem Function", () => {
  it("fetches item details correctly", async () => {
    const item = await getItem("1");
    expect(item).toEqual({
      item: {
        id: "1",
        title: "Guitarra Fender",
        price: { amount: 1000, currency: "USD" },
        picture: "/path/to/guitar.jpg",
        condition: "new",
        description: "Descripción de la Guitarra Fender",
        categories_path: ["Música", "Instrumentos", "Guitarras"],
      },
    });
  });
});

describe("ProductDetailPage", () => {
  it("Fetches item details and renders them", async () => {
    render(await ProductDetailPage({ params: { id: "1" } }));
    await waitFor(() =>
      expect(screen.getByText("Guitarra Fender")).toBeInTheDocument()
    );
    expect(
      screen.getByText("Descripción de la Guitarra Fender")
    ).toBeInTheDocument();
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
  });

  it("Renders fallback content when data is missing", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    render(await ProductDetailPage({ params: { id: "1" } }));
    await waitFor(() =>
      expect(
        screen.getByText("No se encontraron las categorias")
      ).toBeInTheDocument()
    );
  });

  it("renders product details correctly", async () => {
    render(await ProductDetailPage({ params: { id: "1" } }));
    await waitFor(() => {
      const titleElement = screen.getByText("Guitarra Fender");
      expect(titleElement).toBeInTheDocument();
      expect(screen.getByText("$1,000.00")).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Imagen de Guitarra Fender/i })
      ).toBeInTheDocument();
    });
  });
});
