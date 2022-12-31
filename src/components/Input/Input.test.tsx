import { render } from "@testing-library/react";

import Input from "./Input";

describe("Input", () => {
  it("renders correctly", () => {
    const { container } = render(<Input />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <input
          class="_input_98f327"
        />
      </div>
    `);
  });
});
