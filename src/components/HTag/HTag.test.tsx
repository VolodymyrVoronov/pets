import { getByText, render } from "@testing-library/react";

import HTag from "./HTag";

describe("HTag", () => {
  it("should render default tag h1.", () => {
    const { container } = render(<HTag>Test text</HTag>);

    const tag = container.querySelector("h1");

    expect(tag).toBeInTheDocument();
  });

  it("should render passed tag h2.", () => {
    const { container } = render(<HTag tag="h2">Test text</HTag>);

    const tag = container.querySelector("h2");

    expect(tag).toBeInTheDocument();
  });

  it("should not find tag h1, because tag h3 was passed via props.", () => {
    const { container } = render(<HTag tag="h3">Test text</HTag>);

    const tag = container.querySelector("h1");

    expect(tag).not.toBeInTheDocument();
  });

  it("should find passed className.", () => {
    const testClassName = "test-class-name";

    const { container } = render(
      <HTag className={testClassName}>Test text</HTag>
    );

    expect(container.getElementsByClassName(testClassName).length).toBe(1);
  });

  it("should find text passed via children.", () => {
    const textText = "Test text";

    const { container } = render(<HTag>{textText}</HTag>);

    expect(getByText(container, textText)).toBeInTheDocument();
  });
});
