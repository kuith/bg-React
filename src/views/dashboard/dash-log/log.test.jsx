import React from "react";
import { render } from "@testing-library/react";
import Log from "./log";

test("Renderiza el Header y el Footer correctamente", () => {
    render(<Log />);
});
