import axios from "axios";

import getErrorMessage from "../helpers";

export interface IPet {
  id: number;
  name: string;
  age: string;
  photo: string;
  info: string;
}

interface IAddPet {
  name: string;
  age: string;
  photo?: string;
  info?: string;
}

const url = "http://localhost:3000";

const getPets = async (): Promise<IPet[]> => {
  try {
    const { data } = await axios.get<IPet[]>(`${url}/pets`);

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const getPet = async (id: number): Promise<IPet> => {
  try {
    const { data } = await axios.get(`${url}/pets/${id}`);

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const addPet = async (newPet: IAddPet): Promise<IPet> => {
  try {
    const { data } = await axios.post<IAddPet>(`${url}/pets`, newPet);

    return data as IPet;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const deletePet = async (id: number): Promise<IPet> => {
  try {
    const { data } = await axios.delete(`${url}/pets/${id}`);

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export { getPets, getPet, addPet, deletePet };
