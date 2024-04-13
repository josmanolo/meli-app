import React from "react";
import "./styles.scss";

interface BreadcrumbProps {
  categories: string[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ categories }) => {
  return (
    <nav className="breadcrumbs">
      {categories.map((category) => (
        <span key={category} className="breadcrumb-item">
          {category}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
