"use client";
import { ErrorProps } from "@/interfaces";
import ErrorInformation from "@/components/ErrorInformation";

const ItemsError = ({ error }: ErrorProps) => {
  return <ErrorInformation error={error} />;
}

export default ItemsError;
