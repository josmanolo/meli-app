"use client";

import React, { useState } from "react";
import "./styles.scss";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { useRouter } from "next/navigation";

const figtree = Figtree({ subsets: ["latin"] });

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/items?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="header">
      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <div className="logo-container">
          <Image
            src="/images/Logo_ML@2x.png"
            alt="Logotipo de Mercado Libre"
            width={53}
            height={36}
          />
        </div>
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="Nunca dejes de buscar"
          aria-label="Buscar"
          className={figtree.className}
        />
        <button type="submit" aria-label="Buscar">
          <Image
            src="/images/ic_Search@2x.png"
            alt="Icono de busqueda"
            width={18}
            height={18}
          />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
