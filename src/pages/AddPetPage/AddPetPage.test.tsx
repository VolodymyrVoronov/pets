import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createMemoryHistory } from "history";

import AddPetPage from "./AddPetPage";

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
            <Route path="/" element={<AddPetPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_wrapper_783fb0"
          style="opacity: 0;"
        >
          <div
            style="opacity: 0;"
          >
            <div
              class="_container_214497"
            >
              <button
                class="_back-button_783fb0"
                data-testid="back-button"
                title="Back to start page."
                type="button"
              >
                <img
                  alt="Arrow back icon"
                  class=""
                  src="/src/assets/icons/arrow-back-outline.svg"
                />
              </button>
              <button
                class="_save-button_783fb0"
                data-testid="save-button"
                disabled=""
                title="Save pet's data."
                type="button"
              >
                <img
                  alt="Save icon"
                  class=""
                  src="/src/assets/icons/save-outline.svg"
                />
              </button>
            </div>
          </div>
          <div
            class="_container_783fb0"
          >
            <div
              class="_container_c02314 _bg-yellow_c02314 _bg-yellow-hover_c02314 _colored-wrapper-upload-image_783fb0"
            >
              <div
                class="_container_e3f91a"
              >
                <div
                  style="opacity: 0;"
                >
                  <div
                    class="_preview-header_e3f91a"
                  >
                    <p
                      class="_pTag_2c6cd0 _largeXl_2c6cd0"
                    >
                      Photo upload:
                    </p>
                    <div
                      class="_preview-upload-btn-wrapper_e3f91a"
                    >
                      <input
                        accept="image/*"
                        title="Upload photo or image."
                        type="file"
                      />
                      <button
                        class="_preview-upload-btn_e3f91a"
                        title="Upload photo button."
                        type="button"
                      >
                        <img
                          alt="Upload icon."
                          class=""
                          src="/src/assets/icons/upload-outline.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="_container_c02314 _bg-green_c02314 _bg-green-hover_c02314 _colored-wrapper_783fb0"
            >
              <p
                class="_pTag_2c6cd0 _largeXl_2c6cd0"
              >
                Name *
              </p>
              <input
                class="_input_783fb0 _input_98f327"
                name="name"
                type="text"
                value=""
              />
            </div>
            <div
              class="_container_c02314 _bg-orange_c02314 _bg-orange-hover_c02314 _colored-wrapper_783fb0"
            >
              <p
                class="_pTag_2c6cd0 _largeXl_2c6cd0"
              >
                Age *
              </p>
              <input
                class="_input_783fb0 _input_98f327"
                min="0"
                name="age"
                type="number"
                value=""
              />
            </div>
            <div
              class="_container_c02314 _bg-blue_c02314 _bg-blue-hover_c02314 _colored-wrapper_783fb0"
            >
              <p
                class="_pTag_2c6cd0 _largeXl_2c6cd0"
              >
                Additional Information
              </p>
              <textarea
                class="_text-area_783fb0 _text-area_0809d5"
                name="info"
                rows="10"
              />
            </div>
            <div
              class="_container_c02314 _bg-red_c02314 _bg-red-hover_c02314 _colored-wrapper_783fb0"
            >
              <p
                class="_pTag_2c6cd0 _largeXl_2c6cd0"
              >
                * Fields are required!
              </p>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("should not have disabled save button, if inputs name and age have values.", () => {
    const { container, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddPetPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );

    const inputName = container.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;

    const inputAge = container.querySelector(
      'input[name="age"]'
    ) as HTMLInputElement;

    fireEvent.change(inputName, { target: { value: "Test name" } });
    fireEvent.change(inputAge, { target: { value: "5" } });

    expect(getByTestId("save-button")).not.toHaveAttribute("disabled");
  });

  it("should have disabled save button, if inputs name and age have no values.", () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddPetPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(getByTestId("save-button")).toHaveAttribute("disabled");
  });

  it("should navigate to /start page", () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/" element={<AddPetPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    );

    fireEvent.click(getByTestId("back-button"));

    expect(history.location.pathname).toBe("/start");
  });
});
