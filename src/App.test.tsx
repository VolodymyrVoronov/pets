import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders correctly", () => {
    const { getAllByRole, container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_wrapper_b0f89f"
          style="opacity: 0;"
        >
          <button
            class="_left-side_b0f89f"
            type="button"
          >
            <div
              class="_container_c02314 _bg-blue_c02314 _bg-blue-hover_c02314 _left-side-wrapper_b0f89f"
            >
              <img
                alt="Pets in house icon/image."
                class="_left-side-image_b0f89f"
                src="/src/assets/images/pet-image-01.png"
              />
              <h2
                class="_hTag_1c0db3 _h2_1c0db3 _left-side-text_b0f89f"
              >
                My pets
              </h2>
            </div>
          </button>
          <button
            class="_right-side_b0f89f"
            type="button"
          >
            <div
              class="_container_c02314 _bg-green_c02314 _bg-green-hover_c02314 _right-side-wrapper_b0f89f"
            >
              <img
                alt="Pets' list icon/image."
                class="_right-side-image_b0f89f"
                src="/src/assets/images/pet-image-02.png"
              />
              <h2
                class="_hTag_1c0db3 _h2_1c0db3 _right-side-text_b0f89f"
              >
                Add pet
              </h2>
            </div>
          </button>
        </div>
      </div>
    `);

    expect(getAllByRole("button")).toHaveLength(2);
  });
});
