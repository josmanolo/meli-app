"use client";
import { ErrorProps } from "@/interfaces";
import ErrorInformation from "@/components/ErrorInformation";

export default function GlobalError({ error }: ErrorProps) {
  return <ErrorInformation error={error} />;
}
