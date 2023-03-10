import axios from "axios";

const getErrorMessage = (error: Error | unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.message);
  }

  throw new Error("An unexpected error occurred");
};

export default getErrorMessage;
