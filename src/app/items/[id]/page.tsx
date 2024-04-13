import formatPrice from "@/helpers/formatPrice";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NEW, NEW_TEXT, USED_TEXT } from "./constants";
import Button from "@/ui/Button";
import "./styles.scss";
import { Metadata } from "next";
import { ProductDetailProps } from "@/interfaces";
import Breadcrumbs from "@/components/Breadcrums";

const getItem = async (id: string) => {
  try {
    const item = await fetch(`http://localhost:3002/api/items/${id}`, {
      cache: "no-store",
    }).then((res) => res.json());

    return item;
  } catch (error) {
    throw new Error("not found!");
  }
};

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const product = await getItem(params.id);

  return {
    title: `${product.title} - Mercado Libre`,
    description: product.description,
    openGraph: {
      images: [{ url: product.picture }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const itemDetails = await getItem(params.id);
  const { title, price, picture, condition, description, categories_path } = itemDetails?.item;

  const formattedPrice = formatPrice(price);
  const itemCondition = condition === NEW ? NEW_TEXT : USED_TEXT;

  console.log(itemDetails)

  return (
    <>
      <Breadcrumbs categories={categories_path} />
      <div className="details-container" aria-labelledby="product-title">
        <div className="item-info">
          <Image
            src={picture}
            alt={`Imagen de ${title}`}
            width={680}
            height={680}
            priority
          />
          <div className="item-details">
            <span className="item-condition">{itemCondition}</span>
            <h1 id="product-title">{title}</h1>
            <span className="item-price">{formattedPrice}</span>
            <Button text="Comprar" />
          </div>
        </div>
        <section
          className="item-description"
          aria-labelledby="description-title"
        >
          <h2 id="description-title">Descripción del producto</h2>
          <p>{description}</p>
        </section>
      </div>
    </>
  );
}
