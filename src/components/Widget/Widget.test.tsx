import { fireEvent, render, screen } from "@testing-library/react";
import Widget from "./Widget";
import { describe, it, expect } from "vitest";

describe("Widget", () => {
  it("renders stalesments with a valid price input", async () => {
    const price = "100,99";

    render(<Widget price={price} />);
    const customSelect = await screen.findByTestId("widget-custom-select");
    expect(customSelect).toBeInTheDocument();
  });

  it("doesn't render the wdiget if input is not valid", () => {
    const price = "invalidInput";

    render(<Widget price={price} />);
    const customSelect = screen.queryByTestId("widget-custom-select");
    expect(customSelect).not.toBeInTheDocument();
  });

  it("opens/closes the modal", async () => {
    const price = "100,99";

    render(<Widget price={price} />);
    const button = await screen.findByTestId("widget-modal-trigger");

    fireEvent.click(button);

    const modal = await screen.findByTestId("widget-modal");
    expect(modal).toBeVisible();
    const closeButton = screen.getByTestId("widget-modal-close");
    fireEvent.click(closeButton);
    expect(modal).not.toBeVisible();
  });

  it("renders with the default language spanish if not provided", async () => {
    render(<Widget price={100} />);
    const languageElement = await screen.findByText("Págalo en");
    expect(languageElement).toBeInTheDocument();
  });

  it("renders with the selected language", async () => {
    render(<Widget price={100} language="en" />);
    const languageElement = await screen.findByText("Pay in");
    expect(languageElement).toBeInTheDocument();
  });
});
