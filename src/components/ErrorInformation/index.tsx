"use client";
import { ErrorProps } from "@/interfaces";
import "./styles.scss";

const ErrorInformation = ({ error, title = "Algo salió mal" }: ErrorProps) => {
  return (
    <div className="error-container">
      <div>
        <h1>{title}</h1>
        <p>
          {error?.message ||
            "Lo sentimos, pero algo salió mal en nuestra plataforma."}
        </p>
      </div>
    </div>
  );
};

export default ErrorInformation;
