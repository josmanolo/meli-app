import Image from "next/image";
import Link from "next/link";
import "./styles.scss";
import formatPrice from "@/helpers/formatPrice";

interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
}

interface ItemProps {
  details: Item;
}

const Item = ({ details }: ItemProps) => {
  const { id, title, price, picture, free_shipping } = details;
  const formattedPrice = formatPrice(price);

  return (
    <li className="item">
      <Link href={`/items/${id}`}>
        <Image src={picture} alt={title} width={180} height={180} />
        <div className="item-content">
          <div className="main-info">
            <div className="price-details">
              <span>{formattedPrice}</span>
              {free_shipping && (
                <Image
                  src="/images/ic_shipping.png"
                  alt="imagen"
                  width={18}
                  height={18}
                />
              )}
            </div>

            <h2>{title}</h2>
          </div>

          <span className="city-info">Ciudad</span>
        </div>
      </Link>
    </li>
  );
};

export default Item;
