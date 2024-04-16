"use client";

import ErrorInformation from "@/components/ErrorInformation";

export default function DetailsError({ error }: { error: Error }) {
  return <ErrorInformation error={error}/>;
}
