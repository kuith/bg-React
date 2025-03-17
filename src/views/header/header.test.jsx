import React from "react";
import { render } from "@testing-library/react";
import Header from "./header";

test("Renderiza el Header correctamente", () => {
    render(<Header />);

    //expect(screen.getByRole("banner")).toBeInTheDocument();
    //expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
