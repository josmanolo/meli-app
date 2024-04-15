import Image from "next/image";
import Link from "next/link";
import "./styles.scss";
import formatPrice from "@/helpers/formatPrice";
import { ItemProps } from "@/interfaces";

const Item = ({ details }: ItemProps) => {
  
  const { id, title, price, picture, free_shipping, city } = details;
  const formattedPrice = formatPrice(price);

  return (
    <li className="item">
      <Link href={`/items/${id}`}>
        <Image
          src={picture}
          alt={`Imagen de ${title}`}
          width={180}
          height={180}
        />
        <div className="item-content">
          <div className="main-info">
            <div className="price-details">
              <span>{formattedPrice}</span>
              {free_shipping && (
                <Image
                  src="/images/ic_shipping@2x.png"
                  alt="Envío gratis disponible"
                  width={18}
                  height={18}
                />
              )}
            </div>

            <h2>{title}</h2>
          </div>

          <span className="city-info">{city}</span>
        </div>
      </Link>
    </li>
  );
};

export default Item;
