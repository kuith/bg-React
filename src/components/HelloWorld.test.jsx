import { render, screen } from "@testing-library/react";
import HelloWorld from "./HelloWorld";
import React from "react";

// Usamos `test` y `expect` de Jest (en lugar de `vitest`)
test("renders Hello, World! text", () => {
    render(<HelloWorld />);
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});
