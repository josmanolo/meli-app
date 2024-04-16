"use client";

import React, { useState, useRef } from "react";
import "./styles.scss";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const figtree = Figtree({ subsets: ["latin"] });

const SearchBar = () => {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams().get("search");
  const [search, setSearch] = useState(searchParams || "");


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search.trim() === "") {
      inputRef.current?.focus(); 
    } else {
      router.push(`/items?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header className="header">
      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <Link href="/" className="logo-container">
          <Image
            src="/images/Logo_ML@2x.png"
            alt="Logotipo de Mercado Libre"
            width={53}
            height={36}
            priority
          />
        </Link>
        <input
          ref={inputRef}
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
            alt="Icono de búsqueda"
            width={18}
            height={18}
          />
        </button>
      </form>
    </header>
  );
};

export default React.memo(SearchBar);
