import nock from "nock";

import { getPets, getPet, addPet, deletePet } from "./api";

import placeholder from "../../assets/images/placeholder.png";

const testMockData = [
  {
    id: 1,
    age: "2",
    name: "Cat",
    info: "Test text",
    photo: placeholder,
  },
  {
    id: 2,
    age: "5",
    name: "Cat 2",
    info: "Test text",
    photo: placeholder,
  },
];

describe("api", () => {
  it("should receive pets.", async () => {
    nock("http://localhost:3000").get("/pets").reply(200, {
      testMockData,
    });

    const data = await getPets();

    expect(data.length).not.toBeNull();
  });

  it("should receive pet with id 1.", async () => {
    nock("http://localhost:3000")
      .get(`/pets/1`)
      .reply(200, () => {
        const data = testMockData.filter((p) => p.id === 1);

        return data;
      });

    const data = await getPet(1);

    expect(data).toEqual([
      {
        id: 1,
        age: "2",
        name: "Cat",
        info: "Test text",
        photo: placeholder,
      },
    ]);
  });

  it("should add new pet.", async () => {
    nock("http://localhost:3000")
      .post(`/pets`)
      .reply(200, () => {
        return {
          id: 3,
          age: "5",
          name: "Cat 3",
          info: "Test text text",
          photo: placeholder,
        };
      });

    const data = await addPet({
      age: "5",
      name: "Cat 3",
      info: "Test text text",
      photo: placeholder,
    });

    expect(data).toEqual({
      id: 3,
      age: "5",
      name: "Cat 3",
      info: "Test text text",
      photo: placeholder,
    });
  });

  it("should add delete pet.", async () => {
    nock("http://localhost:3000")
      .delete(`/pets/2`)
      .reply(200, () => {
        const data = testMockData.filter((p) => p.id === 2);

        return data;
      });

    const data = await deletePet(2);

    expect(data).toEqual([
      {
        id: 2,
        age: "5",
        name: "Cat 2",
        info: "Test text",
        photo: placeholder,
      },
    ]);
  });
});
