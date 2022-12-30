import { getByText, render } from "@testing-library/react";

import HTag from "./HTag";

describe("HTag", () => {
  it("renders correctly", () => {
    const { container } = render(<HTag>Test text</HTag>);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <h1
          class="_hTag_1c0db3 _h1_1c0db3"
        >
          Test text
        </h1>
      </div>
    `);
  });

  it("should render default tag h1.", () => {
    const { container } = render(<HTag>Test text</HTag>);

    const tag = container.querySelector("h1");

    expect(tag).toBeInTheDocument();
  });

  it("should render tag h1.", () => {
    const { container } = render(<HTag tag="h1">Test text</HTag>);

    const tag = container.querySelector("h1");

    expect(tag).toBeInTheDocument();
  });

  it("should render tag h2.", () => {
    const { container } = render(<HTag tag="h2">Test text</HTag>);

    const tag = container.querySelector("h2");

    expect(tag).toBeInTheDocument();
  });

  it("should render tag h3.", () => {
    const { container } = render(<HTag tag="h3">Test text</HTag>);

    const tag = container.querySelector("h3");

    expect(tag).toBeInTheDocument();
  });

  it("should render tag h4.", () => {
    const { container } = render(<HTag tag="h4">Test text</HTag>);

    const tag = container.querySelector("h4");

    expect(tag).toBeInTheDocument();
  });

  it("should render tag h5.", () => {
    const { container } = render(<HTag tag="h5">Test text</HTag>);

    const tag = container.querySelector("h5");

    expect(tag).toBeInTheDocument();
  });

  it("should render tag h6.", () => {
    const { container } = render(<HTag tag="h6">Test text</HTag>);

    const tag = container.querySelector("h6");

    expect(tag).toBeInTheDocument();
  });

  it("should find className.", () => {
    const testClassName = "test-class-name";

    const { container } = render(
      <HTag className={testClassName}>Test text</HTag>
    );

    expect(container.getElementsByClassName(testClassName).length).toBe(1);
  });

  it("should find text.", () => {
    const textText = "Test text";

    const { container } = render(<HTag>{textText}</HTag>);

    expect(getByText(container, textText)).toBeInTheDocument();
  });
});
