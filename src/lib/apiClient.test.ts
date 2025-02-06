import { expect, test, vi } from "vitest";
import apiClient, { apiFetch, apiRegister } from "./apiClient";
import { RegisterRequest } from "./types";


const testUser:RegisterRequest = {
    username: "helloteszt",
    email: "hallo@teszt.com",
    nickname: "teszter",
    password: "erosjelszo",
    date_of_birth: "2000-01-01",
}


//mocking localStorage
vi.stubGlobal("localStorage", {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});



test("get all users should be forbidden", async () => {
  const res = await apiClient.get("users")
  console.log(res)
  expect(res.status).toBe(403);
});

test("apiregister", async () => {
    console.log((await apiRegister(testUser)))
    expect(await apiRegister(testUser)).toBe(200)
})
