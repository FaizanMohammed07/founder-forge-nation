import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FoundersMeetRegisterPage from "@/pages/FoundersMeetRegisterPage";

Object.defineProperty(window, "scrollTo", {
  value: () => {},
  writable: true,
});

vi.stubGlobal("fetch", vi.fn());

describe("FoundersMeetRegisterPage", () => {
  it("renders the closed state when registrations are stopped", () => {
    render(
      <MemoryRouter>
        <FoundersMeetRegisterPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("REGISTRATIONS PAUSED"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Registrations are currently unavailable. Please try again shortly."),
    ).toBeInTheDocument();
  });
});
