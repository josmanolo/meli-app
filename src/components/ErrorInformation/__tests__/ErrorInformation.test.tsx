import { render, screen } from '@testing-library/react';
import ErrorInformation from '..';

describe('ErrorInformation Component', () => {
  it('Renders the default title', () => {
    const error = { name: "Error", message: "Error message" };
    render(<ErrorInformation error={error} />);
    const title = screen.getByText("Algo salió mal");
    expect(title).toBeInTheDocument();
  });

  it('Renders a custom title', () => {
    const error = { name: "Error", message: "Error message" };
    render(<ErrorInformation error={error} title="Error en el sitio" />);
    const title = screen.getByText("Error en el sitio");
    expect(title).toBeInTheDocument();
  });

  it('Displays the error message from the error prop', () => {
    const error = { name: "Error", message: "Error message" };
    render(<ErrorInformation error={error} />);
    const message = screen.getByText("Error message");
    expect(message).toBeInTheDocument();
  });

  it('Displays a default message when the error is not passed', () => {
    render(<ErrorInformation />);
    const defaultMessage = screen.getByText("Lo sentimos, pero algo salió mal en nuestra plataforma.");
    expect(defaultMessage).toBeInTheDocument();
  });
});
