import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Option from "../components/Option";
import { SelectedValue } from "../model/common.model";

describe("Option Component", () => {
  const mockOnSelect = vi.fn();

  it("should render option label correctly", () => {
    render(
      <Option
        label="Test Answer"
        id={1}
        onlyView={false}
        status="normal"
        onSelect={mockOnSelect}
      />,
    );

    expect(screen.getByText("Test Answer")).toBeInTheDocument();
  });

  it("should call onSelect when clicked", async () => {
    const user = userEvent.setup();
    render(
      <Option
        label="Test Answer"
        id={1}
        onlyView={false}
        status="normal"
        onSelect={mockOnSelect}
      />,
    );

    await user.click(screen.getByText("Test Answer"));

    expect(mockOnSelect).toHaveBeenCalledWith({ label: "Test Answer", id: 1 });
  });

  it("should apply correct styling for normal status", () => {
    const { container } = render(
      <Option
        label="Test Answer"
        id={1}
        onlyView={false}
        status="normal"
        onSelect={mockOnSelect}
      />,
    );

    const optionElement = container.firstChild as HTMLElement;
    expect(optionElement).toHaveClass("text-green-500", "border-green-500");
  });

  it("should apply correct styling for correct status", () => {
    const { container } = render(
      <Option
        label="Test Answer"
        id={1}
        onlyView={false}
        status="correct"
        onSelect={mockOnSelect}
      />,
    );

    const optionElement = container.firstChild as HTMLElement;
    expect(optionElement).toHaveClass("bg-green-500");
  });

  it("should apply incorrect styling for incorrect status", () => {
    const { container } = render(
      <Option
        label="Test Answer"
        id={1}
        onlyView={false}
        status="incorrect"
        onSelect={mockOnSelect}
      />,
    );

    const optionElement = container.firstChild as HTMLElement;
    expect(optionElement).toHaveClass("bg-red-500");
  });
});
