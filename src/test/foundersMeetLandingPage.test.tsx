import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FoundersMeetLandingPage from "@/pages/FoundersMeetLandingPage";

Object.defineProperty(window, "scrollTo", {
  value: () => {},
  writable: true,
});

describe("FoundersMeetLandingPage", () => {
  it("renders required core sections and CTA", () => {
    render(
      <MemoryRouter>
        <FoundersMeetLandingPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Founders Meet 2026" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Event Timeline" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "FAQ" })).toBeInTheDocument();

    expect(screen.getByText("Registrations Closed")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /register now/i })).not.toBeInTheDocument();
  });
});
