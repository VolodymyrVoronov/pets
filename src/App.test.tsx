import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders correctly", async () => {
    const { getAllByRole, container } = render(
      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <App />
        </Suspense>
      </BrowserRouter>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; opacity: 0;"
        >
          <div
            class="_container_c02314 _bg-blue_c02314"
            style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"
          >
            <span
              class="_circle_bf668d"
            />
          </div>
        </div>
      </div>
    `);

    await waitFor(() => {
      expect(getAllByRole("button")).toHaveLength(2);
    });

    await waitFor(() => {
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
    });
  });
});
