import { fireEvent, render } from "@testing-library/react";
import { vi } from "vitest";

import Popup from "./Popup";

describe("Popup", () => {
  const root = document.querySelector("body");
  const popup = document.createElement("div");
  popup.id = "popup";

  root?.appendChild(popup);

  it("renders correctly.", () => {
    const { baseElement } = render(
      <Popup title="Test title" subtitle="Test subtitle" onClose={() => {}} />
    );

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div
          id="popup"
        >
          <div
            style="opacity: 0;"
          >
            <div
              class="_container_597d5a"
            >
              <div
                style="opacity: 0; transform: translateY(-200px) translateZ(0);"
              >
                <div
                  class="_body_597d5a"
                >
                  <div
                    class="_header_597d5a"
                  >
                    <button
                      class="_close_597d5a"
                      type="button"
                    >
                      <img
                        alt="Close icon/image."
                        class=""
                        src="/src/assets/icons/close-outline.svg"
                      />
                    </button>
                    <h4
                      class="_hTag_1c0db3 _h4_1c0db3 _title_597d5a"
                    >
                      Test title
                    </h4>
                    <p
                      class="_pTag_2c6cd0 _subtitle_597d5a _medium_2c6cd0"
                    >
                      Test subtitle
                    </p>
                  </div>
                  <div
                    class="_children_597d5a"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div />
      </body>
    `);
  });

  it("should display title.", () => {
    const { getByText } = render(
      <Popup title="Test title" subtitle="Test subtitle" onClose={() => {}} />
    );

    expect(getByText("Test title")).toBeInTheDocument();
  });

  it("should display subtitle.", () => {
    const { getByText } = render(
      <Popup title="Test title" subtitle="Test subtitle" onClose={() => {}} />
    );

    expect(getByText("Test subtitle")).toBeInTheDocument();
  });

  it("should not display subtitle.", () => {
    render(<Popup title="Test title" subtitle="" onClose={() => {}} />);

    const p = document.querySelector("p");

    expect(p).not.toBeInTheDocument();
  });

  it("should render h1 title.", () => {
    const { baseElement } = render(
      <Popup title="Test title" tag="h1" subtitle="" onClose={() => {}} />
    );

    const tag = baseElement.querySelector("h1");

    expect(tag).toBeInTheDocument();
  });

  it("should render tag with class small.", () => {
    const { getByText } = render(
      <div>
        <Popup
          title="Test title"
          size="s"
          subtitle="Test subtitle"
          onClose={() => {}}
        />
      </div>
    );

    expect(getByText("Test subtitle").className.includes("small")).toBe(true);
  });

  it("on close click", () => {
    const onClose = vi.fn();

    const { getByRole } = render(
      <Popup title="Test title" subtitle="" onClose={onClose} />
    );

    fireEvent.click(getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
