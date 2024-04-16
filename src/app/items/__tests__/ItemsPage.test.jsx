import { render, screen, waitFor } from "@testing-library/react";
import ItemsPage, { fetchResults, generateMetadata } from "../page";
import { jest } from "@jest/globals";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: { search: "fender" },
      asPath: "",
    };
  },
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [
          {
            id: "1",
            title: "Sample Item",
            price: { amount: 1000, currency: "USD" },
            picture: "/path/to/image.jpg",
          },
        ],
        mostFrequentCategory: "Sample Category",
      }),
  })
);

describe("generateMetadata", () => {
  it("Generates correct metadata", async () => {
    const metadata = await generateMetadata({
      params: { search: "fender" },
    });
    expect(metadata.title).toEqual(
      "Mercado Libre - Resultados para fender"
    );
    expect(metadata.description).toEqual(
      "Encuentra los mejores productos para fender en Mercado Libre."
    );
  });
});

describe("fetchResults", () => {
  it("Fetches and processes data correctly", async () => {
    const data = await fetchResults("fender");
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.mostFrequentCategory).toEqual("Sample Category");
  });

  it("Throws an error on fetch failure", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch"))
    );
    await expect(fetchResults("unknown")).rejects.toThrow(
      "Error al obtener los resultados."
    );
  });
});

describe("ItemsPage Component", () => {
  it("Renders items correctly", async () => {
    render(await ItemsPage({ searchParams: { search: "fender" } }));
    await waitFor(() =>
      expect(screen.getByText("Sample Item")).toBeInTheDocument()
    );
    expect(screen.queryByText("No hay resultados, intenta con otro termino")).not.toBeInTheDocument();
  });

  it("Displays no results", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
    
    render(await ItemsPage({ searchParams: { search: "" } }));
    await waitFor(() =>
      expect(screen.getByText("No hay resultados, intenta con otro termino")).toBeInTheDocument()
    );
  });
});
