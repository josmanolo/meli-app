import formatPrice from "@/helpers/formatPrice";
import Image from "next/image";
import { NEW, NEW_TEXT, USED_TEXT } from "./constants";
import Button from "@/ui/Button";
import "./styles.scss";
import { Metadata } from "next";
import { ItemDetailResponse, ProductDetailProps } from "@/interfaces";
import Breadcrumbs from "@/components/Breadcrums";

export const getItem = async (id: string): Promise<ItemDetailResponse> => {
  try {
    const response = await fetch(`http://localhost:3002/api/items/${id}`, {
      cache: "no-store",
    }).then((res) => res.json());

    if (response.status === 404) {
      throw new Error("No se encontro el producto");
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const generateMetadata = async ({
  params,
}: ProductDetailProps): Promise<Metadata> => {
  const itemDetails = await getItem(params.id);

  const details = itemDetails?.item || [];
  const { title, picture, description } = details;

  return {
    title: `${title} - Mercado Libre`,
    description: description,
    openGraph: {
      images: [{ url: picture }],
    },
  };
};

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
  const itemDetails = await getItem(params.id);

  const details = itemDetails?.item || [];
  const {
    title,
    price,
    picture,
    condition,
    description,
    categories_path,
    initial_quantity,
  } = details;

  const formattedPrice = formatPrice(price);
  const itemCondition = condition === NEW ? NEW_TEXT : USED_TEXT;

  return (
    <>
      <Breadcrumbs categories={categories_path} />
      <div className="details-container" aria-labelledby="product-title">
        <div className="item-info">
          <div className="image-container">
            {picture ? (
              <Image
                src={picture}
                alt={`Imagen de ${title}`}
                width={680}
                height={680}
                priority
                style={{
                  width: "100%",
                }}
                sizes="100vw"
              />
            ) : (
              <div>Imagen no disponible</div>
            )}
          </div>
          <div className="item-details">
            <p className="item-condition">{`${itemCondition} - ${initial_quantity} ${
              initial_quantity > 1 ? "disponibles" : "disponible"
            }`}</p>
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
};

export default ProductDetailPage;
