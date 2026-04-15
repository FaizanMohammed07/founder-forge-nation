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
  it("renders the updated passes and registration notice", () => {
    render(
      <MemoryRouter>
        <FoundersMeetRegisterPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Registrations open till April 18 (morning)"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Choose Your Pass" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Normal Pass" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Premium Pass" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(screen.getByText("Rs. 1299")).toBeInTheDocument();
  });
});
