import React from "react";
import "./styles.scss";

interface BreadcrumbProps {
  categories: string[];
}

const Breadcrumbs = ({ categories }: BreadcrumbProps) => {
  if (!categories || categories.length === 0) {
    return <p>No se encontraron las categorias</p>;
  }

  return (
    <nav aria-label="breadcrumb" className="breadcrumbs">
      {categories.map((category, index) => (
        <span key={`${category}-${index}`} className="breadcrumb-item">
          {category}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
