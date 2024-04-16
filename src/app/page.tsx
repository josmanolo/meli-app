import Image from "next/image";
import "./styles.scss";

const SearchPage = () => {
  return (
    <div className="home">
      <Image
        src="/images/Logo_ML_25.png"
        alt="Logo de Mercado Libre"
        width={225}
        height={225}
      />
      <h2 className="home-title">
        Mercado Libre <span>Busqueda de Productos</span>
      </h2>
    </div>
  );
};

export default SearchPage;
