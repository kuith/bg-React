import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest"; // <-- Agregado
import HelloWorld from "./HelloWorld";

test("renders Hello, World! text", () => {
    render(<HelloWorld />);
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});
