import { render, fireEvent } from "@testing-library/react";

import ColoredWrapper from "./ColoredWrapper";

describe("ColoredWrapper", () => {
  it("renders correctly.", () => {
    const { container } = render(
      <ColoredWrapper bg="orange">Test text</ColoredWrapper>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_container_c02314 _bg-orange_c02314"
        >
          Test text
        </div>
      </div>
    `);
  });

  it("should render wrapper with class bg-orange.", () => {
    const { getByText } = render(
      <div>
        <ColoredWrapper bg="orange">Test text</ColoredWrapper>
      </div>
    );

    expect(getByText("Test text").className.includes("bg-orange")).toBe(true);
  });

  it("should render wrapper with class bg-green.", () => {
    const { getByText } = render(
      <div>
        <ColoredWrapper bg="green">Test text</ColoredWrapper>
      </div>
    );

    expect(getByText("Test text").className.includes("bg-green")).toBe(true);
  });

  it("should render wrapper with class bg-yellow.", () => {
    const { getByText } = render(
      <div>
        <ColoredWrapper bg="yellow">Test text</ColoredWrapper>
      </div>
    );

    expect(getByText("Test text").className.includes("bg-yellow")).toBe(true);
  });

  it("should render wrapper with class bg-blue.", () => {
    const { getByText } = render(
      <div>
        <ColoredWrapper bg="blue">Test text</ColoredWrapper>
      </div>
    );

    expect(getByText("Test text").className.includes("bg-blue")).toBe(true);
  });

  it("should render wrapper with class bg-red.", () => {
    const { getByText } = render(
      <div>
        <ColoredWrapper bg="red">Test text</ColoredWrapper>
      </div>
    );

    expect(getByText("Test text").className.includes("bg-red")).toBe(true);
  });

  it("should change class bg of the wrapper on mouse over and mouse leave.", () => {
    const { container, getByText } = render(
      <div>
        <ColoredWrapper isHovering bg="red">
          Test text
        </ColoredWrapper>
      </div>
    );

    fireEvent.mouseOver(container);

    expect(getByText("Test text").className.includes("bg-red-hover")).toBe(
      true
    );

    fireEvent.mouseLeave(container);

    expect(getByText("Test text").className.includes("bg-red")).toBe(true);
  });

  it("should not change class bg of the wrapper on mouse over, if props isHovering not provided.", () => {
    const { container, getByText } = render(
      <div>
        <ColoredWrapper bg="red">Test text</ColoredWrapper>
      </div>
    );

    fireEvent.mouseOver(container);

    expect(getByText("Test text").className.includes("bg-red-hover")).not.toBe(
      true
    );
  });
});
