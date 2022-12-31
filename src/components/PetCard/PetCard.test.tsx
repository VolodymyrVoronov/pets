import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import PetCard from "./PetCard";

import placeholder from "../../assets/images/placeholder.png";

const testPet = {
  id: 1,
  age: "2",
  name: "Cat",
  info: "Test text",
  photo: placeholder,
};

describe("PetCard", () => {
  it("renders correctly.", () => {
    const { container } = render(
      <PetCard
        isErrorMutation={false}
        isLoadingMutation={false}
        activeCard={1}
        mutationError={undefined}
        onCardClick={() => {}}
        onFocusedCardKeyPress={() => {}}
        onCardDeleteButtonClick={() => {}}
        {...testPet}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_card_251135"
          tabindex="0"
        >
          <div
            class="_card-photo_251135"
            style="background-image: url(/assets/images/placeholder.png);"
            title="Cat"
          />
          <h4
            class="_hTag_1c0db3 _h4_1c0db3 _card-name_251135"
          >
            Name: 
            Cat
          </h4>
          <h5
            class="_hTag_1c0db3 _h5_1c0db3 _card-age_251135"
          >
            Age: 
            2
          </h5>
          <p
            class="_pTag_2c6cd0 _card-info_251135 _large_2c6cd0"
          >
            Test text
          </p>
          <button
            class="_card-delete-button_251135"
            title="Delete this card."
            type="button"
          >
            <img
              alt="Delete"
              class=""
              src="/src/assets/icons/trash-outline.svg"
            />
          </button>
        </div>
      </div>
    `);
  });

  it("should display info, if it provided.", () => {
    const { getByText } = render(
      <PetCard
        isErrorMutation={false}
        isLoadingMutation={false}
        activeCard={1}
        mutationError={undefined}
        onCardClick={() => {}}
        onFocusedCardKeyPress={() => {}}
        onCardDeleteButtonClick={() => {}}
        {...testPet}
      />
    );

    expect(getByText("Test text")).toBeInTheDocument();
  });

  it("should not display info, if it not provided.", () => {
    const { container } = render(
      <PetCard
        isErrorMutation={false}
        isLoadingMutation={false}
        activeCard={1}
        mutationError={undefined}
        onCardClick={() => {}}
        onFocusedCardKeyPress={() => {}}
        onCardDeleteButtonClick={() => {}}
        {...testPet}
        info=""
      />
    );

    const p = container.querySelector("p");

    expect(p).not.toBeInTheDocument();
  });

  it("should not display deleted button, if deletion runs.", () => {
    const { container } = render(
      <PetCard
        isErrorMutation={false}
        isLoadingMutation
        activeCard={1}
        mutationError={undefined}
        onCardClick={() => {}}
        onFocusedCardKeyPress={() => {}}
        onCardDeleteButtonClick={() => {}}
        {...testPet}
      />
    );

    const button = container.querySelector("button");

    expect(button).not.toBeInTheDocument();
  });

  it("should display loader, if deletion runs.", () => {
    const { container } = render(
      <PetCard
        isErrorMutation={false}
        isLoadingMutation
        activeCard={1}
        mutationError={undefined}
        onCardClick={() => {}}
        onFocusedCardKeyPress={() => {}}
        onCardDeleteButtonClick={() => {}}
        {...testPet}
      />
    );

    const button = container.querySelector("span");

    expect(button).toBeInTheDocument();
  });

  it("should display error, if deleting failed.", () => {
    class StatusError extends Error {
      constructor(public status: number, message?: string) {
        super(message);
      }
    }

    const { container } = render(
      <PetCard
        isErrorMutation
        isLoadingMutation={false}
        activeCard={1}
        mutationError={new StatusError(404, "Not found")}
        onCardClick={() => {}}
        onFocusedCardKeyPress={() => {}}
        onCardDeleteButtonClick={() => {}}
        {...testPet}
      />
    );

    const errorText = container.innerHTML.includes("Something has gone wrong:");

    expect(errorText).toBe(true);
  });

  it("on card click", () => {
    const onCardClick = vi.fn();
    const onKeyDown = vi.fn();
    const onCardDeleteButtonClick = vi.fn();

    const { container, getByRole } = render(
      <PetCard
        isErrorMutation={false}
        isLoadingMutation={false}
        activeCard={1}
        mutationError={undefined}
        onCardClick={onCardClick}
        onFocusedCardKeyPress={onKeyDown}
        onCardDeleteButtonClick={onCardDeleteButtonClick}
        {...testPet}
      />
    );

    const el = container.querySelector("div") as HTMLElement;

    fireEvent.click(el);
    expect(onCardClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(el);
    expect(onKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.click(getByRole("button"));
    expect(onCardDeleteButtonClick).toHaveBeenCalledTimes(1);
  });
});
