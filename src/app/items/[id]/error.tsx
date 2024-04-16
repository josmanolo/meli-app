"use client";

import ErrorInformation from "@/components/ErrorInformation";

const DetailsError = ({ error }: { error: Error }) => {
  return <ErrorInformation error={error}/>;
}

export default DetailsError;
