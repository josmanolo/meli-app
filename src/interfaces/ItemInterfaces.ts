interface Price {
  currency: string;
  amount: number;
  decimals: number;
}
interface Author {
  name: string;
  lastname: string;
}
interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  description: string;
  categories_path: string[];
  initial_quantity: number;
}
export interface ItemDetails {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  city: string;
}
export interface ItemProps {
  details: ItemDetails;
}
export interface ItemResponse {
  author: Author;
  mostFrequentCategory: string;
  categories: string[];
  items: ItemDetails[];
}
export interface ItemDetailResponse {
  author: Author;
  item: Item;
}

export interface PriceData {
  currency: string;
  amount: number;
  decimals: number;
}
