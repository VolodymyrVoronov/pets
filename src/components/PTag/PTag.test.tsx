import { render } from "@testing-library/react";

import PTag from "./PTag";

describe("PTag", () => {
  it("renders correctly", () => {
    const { container } = render(<PTag>Test text</PTag>);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_pTag_2c6cd0 _medium_2c6cd0"
        >
          Test text
        </p>
      </div>
    `);
  });

  it("should render tag with class small.", () => {
    const { getByText } = render(
      <div>
        <PTag size="s">Test text</PTag>
      </div>
    );

    expect(getByText("Test text").className.includes("small")).toBe(true);
  });

  it("should render tag with class medium.", () => {
    const { getByText } = render(
      <div>
        <PTag size="m">Test text</PTag>
      </div>
    );

    expect(getByText("Test text").className.includes("medium")).toBe(true);
  });

  it("should render tag with class large.", () => {
    const { getByText } = render(
      <div>
        <PTag size="l">Test text</PTag>
      </div>
    );

    expect(getByText("Test text").className.includes("large")).toBe(true);
  });

  it("should render tag with class largeXl.", () => {
    const { getByText } = render(
      <div>
        <PTag size="xl">Test text</PTag>
      </div>
    );

    expect(getByText("Test text").className.includes("largeXl")).toBe(true);
  });
});
