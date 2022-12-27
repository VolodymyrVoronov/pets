import axios from "axios";

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
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }

    throw new Error("An unexpected error occurred");
  }
};

const addPet = async (newPet: IAddPet): Promise<IPet | string> => {
  try {
    const { data } = await axios.post<IAddPet>(`${url}/pets`, newPet);

    return data as IPet;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    }

    return "An unexpected error occurred";
  }
};

export { getPets, addPet };
