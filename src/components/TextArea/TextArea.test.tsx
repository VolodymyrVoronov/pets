import { render } from "@testing-library/react";

import TextArea from "./TextArea";

describe("TextArea", () => {
  it("renders correctly", () => {
    const { container } = render(<TextArea />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <textarea
          class="_text-area_0809d5"
        />
      </div>
    `);
  });

  it("renders correctly", () => {
    const { getByRole } = render(<TextArea rows={1} cols={1} />);

    expect(getByRole("textbox").getAttribute("rows")).toBe("1");
    expect(getByRole("textbox").getAttribute("cols")).toBe("1");
  });
});
