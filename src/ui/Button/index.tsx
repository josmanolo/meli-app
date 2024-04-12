import { Figtree } from "next/font/google";
import "./styles.scss";
import { ButtonProps } from "@/interfaces";

const figtree = Figtree({ subsets: ["latin"] });

const Button = ({ text }: ButtonProps) => {
  return (
    <button className={`${"meli-button"} ${figtree.className}`}>{text}</button>
  );
};

export default Button;
