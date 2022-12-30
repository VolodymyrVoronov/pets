import { render } from "@testing-library/react";

import ImageUpload from "./ImageUpload";

describe("ImageUpload", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ImageUpload onPhotoUploadChange={() => {}} />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
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
    `);
  });
});
