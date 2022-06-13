import { isValidEmail, pathTransform } from "../helpers";

describe("pathTransform", () => {
  test("should correctly transform path", () => {
    expect(pathTransform("/login")).toMatch("Login");
    expect(pathTransform("/reset")).toMatch("Reset");
    expect(pathTransform("/")).toMatch("");
  });
});

describe("isValidEmail", () => {
  test("should return falsy for invalid emails", () => {
    expect(isValidEmail("1234")).toBeFalsy();
    expect(isValidEmail("")).toBeFalsy();
    // @ts-ignore invalid iput type
    expect(isValidEmail(null)).toBeFalsy();
    expect(isValidEmail(" ")).toBeFalsy();
    expect(isValidEmail("@gmail")).toBeFalsy();
    expect(isValidEmail("@gmail.com")).toBeFalsy();
  });

  test("should return truthy for valid emails", () => {
    expect(isValidEmail("1234@yahoo.com")).toBeTruthy();
    expect(isValidEmail("user@uottawa.ca")).toBeTruthy();
    expect(isValidEmail("ca@gmail.com")).toBeTruthy();
  });
});
