import { render } from "@testing-library/react";

import Loader from "./Loader";

describe("Loader", () => {
  it("renders correctly", () => {
    const { container } = render(<Loader />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="_circle_bf668d"
        />
      </div>
    `);
  });

  it("renders correct type of the loader", () => {
    const { container } = render(<Loader type="circle" />);

    const span = container.querySelector("span");

    expect(span?.className).toContain("circle");
  });

  it("renders correct type of the loader", () => {
    const { container } = render(<Loader type="circle-arrow" />);

    const span = container.querySelector("span");

    expect(span?.className).toContain("circle-arrow");
  });
});
