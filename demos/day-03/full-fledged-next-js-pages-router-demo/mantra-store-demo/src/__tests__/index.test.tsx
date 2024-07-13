import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import HomePage from "../pages/index";

test("Home Page shows the store title", () => {
    // arrange & act
    render(<HomePage />);
    const el = screen.getByRole("heading", { level: 4, name: "Mantra Store" });

    // assertion
    expect(el).toBeDefined();
});
