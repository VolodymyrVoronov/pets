import { render } from "@testing-library/react";

import NavBar from "./NavBar";

describe("NavBar", () => {
  it("renders correctly", () => {
    const { container } = render(<NavBar />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          style="opacity: 0;"
        >
          <div
            class="_container_214497"
          />
        </div>
      </div>
    `);
  });
});
