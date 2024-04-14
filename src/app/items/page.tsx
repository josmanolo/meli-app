import Item from "@/components/Item";
import "./styles.scss";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrums";

type Props = {
  params: { search: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const search = params.search;

  return {
    title: `Mercado Libre - Resultados para ${search}`,
    description: `Encuentra los mejores productos para ${search} en Mercado Libre.`,
  };
}

const fetchResults = async (query: string) => {
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
        <ul>
          {items?.map((result: any) => (
            <Item key={result.id} details={result} />
          ))}
        </ul>
      </div>
    </>
  );
}
