import React from "react";
import "./styles.scss";

interface BreadcrumbProps {
  categories: string[];
}

const Breadcrumbs = ({ categories }: BreadcrumbProps) => {

  return (
    <nav className="breadcrumbs">
      {categories.map((category, index) => (
        <span key={`${category}-${index}`} className="breadcrumb-item">
          {category}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
