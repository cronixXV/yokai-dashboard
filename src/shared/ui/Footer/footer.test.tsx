import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer", () => {
  it("Отображает текущий год и текст об авторских правах", () => {
    render(<Footer />);

    expect(
      screen.getByText(/© 2026 Spirit Defense Corps\./)
    ).toBeInTheDocument();
  });

  it("Отображает ссылку на GitHub с правильным атрибутом href", () => {
    render(<Footer />);

    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/cronixXV");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("Выводит текущий год", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} Spirit Defense Corps\\.`))
    ).toBeInTheDocument();
  });
});
