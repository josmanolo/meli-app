import Item from "@/components/Item";
import "./styles.scss";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrums";
import { ItemDetails, ItemResponse, MetadataProps } from "@/interfaces";

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const search = params.search;

  return {
    title: `Mercado Libre - Resultados para ${search}`,
    description: `Encuentra los mejores productos para ${search} en Mercado Libre.`,
  };
}

const fetchResults = async (query: string): Promise<ItemResponse> => {
  try {
    const response = await fetch(`http://localhost:3002/api/items?q=${query}`, {
      cache: "no-store",
    }).then((res) => res.json());

    return response;
  } catch (error) {
    throw new Error("Error al obtener los resultados.");
  }
};

export default async function ItemsPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const query = searchParams?.search || "";

  const results = await fetchResults(query);

  const { items, mostFrequentCategory } = results;

  return (
    <>
      <Breadcrumbs categories={[mostFrequentCategory]} />
      <div className="items-container">
        {!items ? (
          <p>No hay resultados</p>
        ) : (
          <ul>
            {items?.map((result: ItemDetails) => (
              <Item key={result.id} details={result} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
