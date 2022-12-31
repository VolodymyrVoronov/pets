import { render } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("renders correctly", () => {
    const { container } = render(<Button>Test text</Button>);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class=""
          type="button"
        >
          Test text
        </button>
      </div>
    `);
  });
});
