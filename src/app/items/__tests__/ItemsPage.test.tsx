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

beforeEach(() => {
  jest.resetAllMocks();
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
  }) as Promise<Response>);
});

const mockFetchResponse = (response: any) => {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(response),
    }) as Promise<Response>
  );
};

describe("generateMetadata", () => {
  it("Generates correct metadata", async () => {
    const metadata = await generateMetadata({
      params: { search: "fender" },
    });
    expect(metadata.title).toEqual("Mercado Libre - Resultados para fender");
    expect(metadata.description).toEqual(
      "Encuentra los mejores productos para fender en Mercado Libre."
    );
  });
});

describe("fetchResults", () => {
  it("Fetches and processes data correctly", async () => {
    mockFetchResponse({
      items: [
        {
          id: "1",
          title: "Sample Item",
          price: { amount: 1000, currency: "USD" },
          picture: "/path/to/image.jpg",
        },
      ],
      mostFrequentCategory: "Sample Category",
    });

    const data = await fetchResults("fender");
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.mostFrequentCategory).toEqual("Sample Category");
  });

  it("Throws an error on fetch failure", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch"))
    );
    await expect(fetchResults("unknown")).rejects.toThrow(
      "Error al obtener los resultados."
    );
  });
});

describe("ItemsPage Component", () => {
  it("Renders items correctly", async () => {
    mockFetchResponse({
      items: [
        {
          id: "1",
          title: "Sample Item",
          price: { amount: 1000, currency: "USD" },
          picture: "/path/to/image.jpg",
        },
      ],
      mostFrequentCategory: "Sample Category",
    });

    render(await ItemsPage({ searchParams: { search: "fender" } }));
    await waitFor(() =>
      expect(screen.getByText("Sample Item")).toBeInTheDocument()
    );
    expect(
      screen.queryByText("No hay resultados, intenta con otro termino")
    ).not.toBeInTheDocument();
  });

  it("Displays no results", async () => {
    mockFetchResponse({});

    render(await ItemsPage({ searchParams: { search: "" } }));
    await waitFor(() =>
      expect(
        screen.getByText("No hay resultados, intenta con otro termino")
      ).toBeInTheDocument()
    );
  });
});

describe("ItemsPage Integration Test", () => {
  it("Completes an scenario where data is fetched based on user query and displayed", async () => {
    mockFetchResponse({
      items: [
        {
          id: "1",
          title: "Guitarra Fender",
          price: { amount: 1000, currency: "USD" },
          picture: "/path/to/guitar.jpg",
        },
        {
          id: "2",
          title: "Amplificador Fender",
          price: { amount: 500, currency: "USD" },
          picture: "/path/to/amp.jpg",
        },
      ],
      mostFrequentCategory: "Instrumentos Musicales",
    });

    render(await ItemsPage({ searchParams: { search: "fender" } }));

    await waitFor(() => {
      expect(screen.getByText("Guitarra Fender")).toBeInTheDocument();
      expect(screen.getByText("Amplificador Fender")).toBeInTheDocument();
      expect(screen.getByText("Instrumentos Musicales")).toBeInTheDocument();
    });

    expect(
      screen.queryByText("No hay resultados, intenta con otro termino")
    ).not.toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("fender"),
      expect.anything()
    );
  });
});
