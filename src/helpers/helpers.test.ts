import getErrorMessage from "./index";

describe("api", () => {
  it("should receive error message.", async () => {
    class StatusError extends Error {
      constructor(public status: number, message?: string) {
        super(message);
      }
    }

    async function error(): Promise<void> {
      getErrorMessage(new StatusError(404, "Not found"));
    }

    await expect(error()).rejects.toThrow("An unexpected error occurred");
  });
});
