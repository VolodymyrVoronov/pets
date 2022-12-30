import { render } from "@testing-library/react";

import Img from "./Img";

import placeholder from "../../assets/images/placeholder.png";

describe("PTag", () => {
  it("renders correctly.", () => {
    const { container } = render(
      <Img imageUrl={placeholder} imageAlt="Test alt text" />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <img
          alt="Test alt text"
          class=""
          src="/assets/images/placeholder.png"
        />
      </div>
    `);
  });

  it("should receive imageSrc and imageAlt correctly.", () => {
    const { getByAltText } = render(
      <Img imageUrl={placeholder} imageAlt="Test alt text" />
    );

    const image = getByAltText("Test alt text") as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain(placeholder);
  });
});
