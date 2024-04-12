import { Figtree } from 'next/font/google';
import './styles.scss'

interface ButtonProps {
  text: string;
}

const figtree = Figtree({ subsets: ["latin"] });

const Button = ({ text }: ButtonProps) => {
  return <button className={`${"meli-button"} ${figtree.className}`}>{text}</button>;
};

export default Button;
