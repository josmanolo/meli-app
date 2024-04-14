import formatPrice from "@/helpers/formatPrice";
import Image from "next/image";
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
  const itemDetails = await getItem(params.id);

  const { title, picture, description } = itemDetails.item;

  return {
    title: `${title} - Mercado Libre`,
    description: description,
    openGraph: {
      images: [{ url: picture }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const itemDetails = await getItem(params.id);
  const { title, price, picture, condition, description, categories_path } =
    itemDetails?.item;

  const formattedPrice = formatPrice(price);
  const itemCondition = condition === NEW ? NEW_TEXT : USED_TEXT;

  return (
    <>
      <Breadcrumbs categories={categories_path} />
      <div className="details-container" aria-labelledby="product-title">
        <div className="item-info">
          <div className="image-container">
            <Image
              src={picture}
              alt={`Imagen de ${title}`}
              priority
              fill
            />
          </div>
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
