import Item from "@/components/Item";
import "./styles.scss";

export default async function ItemsPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const query = searchParams?.search || "";

  const results = await fetch(`http://localhost:3002/api/items?q=${query}`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());

  return (
    <div className="items-container">
      <ul>
        {results?.items?.map((result: any) => (
          <Item key={result.id} details={result} />
        ))}
      </ul>
    </div>
  );
}
