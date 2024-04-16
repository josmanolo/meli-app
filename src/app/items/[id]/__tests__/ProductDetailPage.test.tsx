import { render, screen, waitFor } from "@testing-library/react";
import { jest } from "@jest/globals";
import ProductDetailPage, { generateMetadata, getItem } from "../page";
import { ProductDetailProps } from "@/interfaces";

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      redirected: false,
      type: "default",
      url: "",
      text: () => Promise.resolve(""),
      blob: () => Promise.resolve(new Blob()),
      clone: () => this,
      body: null,
      bodyUsed: false,
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
    }) as unknown as Promise<Response>
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
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
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

describe("ProductDetailPage Integration Test", () => {
  it("Completes an scenario where data is fetched and then displayed", async () => {
    render(
      await ProductDetailPage({ params: { id: "1" } } as ProductDetailProps)
    );

    await waitFor(() => {
      expect(screen.getByText("Guitarra Fender")).toBeInTheDocument();
      expect(
        screen.getByText("Descripción de la Guitarra Fender")
      ).toBeInTheDocument();
      expect(screen.getByText("$1,000.00")).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /Imagen de Guitarra Fender/i })
      ).toHaveAttribute(
        "src",
        "/_next/image?url=%2Fpath%2Fto%2Fguitar.jpg&w=3840&q=75"
      );
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3002/api/items/1`,
      expect.anything()
    );
  });
});
