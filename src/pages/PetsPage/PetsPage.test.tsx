import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import PetsPage from "./PetsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

describe("PetsPage", () => {
  it("renders correctly", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PetsPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_wrapper_9fe4fd"
          style="opacity: 0;"
        >
          <div
            style="opacity: 0;"
          >
            <div
              class="_container_214497"
            >
              <button
                class="_back-button_9fe4fd"
                title="Back to start page."
                type="button"
              >
                <img
                  alt="Arrow back icon."
                  class=""
                  src="/src/assets/icons/arrow-back-outline.svg"
                />
              </button>
            </div>
          </div>
          <div
            class="_container_c02314 _bg-blue_c02314 _loader_9fe4fd"
          >
            <span
              class="_circle_bf668d"
            />
          </div>
          <div
            class="_container_c02314 _bg-blue_c02314 _container-no-pets_9fe4fd"
          >
            <img
              alt="Book icon/image."
              class="_container-no-pets-image_9fe4fd"
              src="/src/assets/images/book-image-01.png"
            />
            <h3
              class="_hTag_1c0db3 _h3_1c0db3 _container-no-pets-text_9fe4fd"
            >
              No pets found
            </h3>
          </div>
        </div>
      </div>
    `);
  });

  it("should have no pets.", () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PetsPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(getByText("No pets found")).toBeInTheDocument();
  });
});
