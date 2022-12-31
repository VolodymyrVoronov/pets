import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render } from "@testing-library/react";

import NoPage from "./NoPage";

describe("NoPage", () => {
  it("renders correctly", () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_wrapper_3a5b73"
          style="opacity: 0;"
        >
          <div
            style="opacity: 0;"
          >
            <div
              class="_container_214497"
            >
              <button
                class="_back-button_3a5b73"
                title="Back to start page."
                type="button"
              >
                <img
                  alt="Arrow back icon."
                  class=""
                  src="/src/assets/icons/home-outline.svg"
                />
              </button>
            </div>
          </div>
          <div
            class="_container_c02314 _bg-red_c02314 _container_3a5b73"
          >
            <img
              alt="Icon: magnifying glass with paw inside."
              class="_image_3a5b73"
              src="/src/assets/images/pet-image-03.png"
            />
            <h3
              class="_hTag_1c0db3 _h3_1c0db3 _text_3a5b73"
            >
              Page not found
            </h3>
          </div>
        </div>
      </div>
    `);

    expect(getByText("Page not found")).toBeInTheDocument();
  });

  it("renders two buttons correctly", () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );

    expect(getAllByRole("button")).toHaveLength(1);
  });

  it("should navigate to /pets page", () => {
    const history = createMemoryHistory();

    const { getAllByRole } = render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    );

    fireEvent.click(getAllByRole("button")[0]);

    expect(history.location.pathname).toBe("/start");
  });
});
