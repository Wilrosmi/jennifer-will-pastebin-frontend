import fillEmptyTitle from "./fillEmptyTitle";

test("Returns template when given null", () => {
  expect(fillEmptyTitle(null)).toBe("(no title)");
});

test("Returns template when given an empty string", () => {
  expect(fillEmptyTitle("")).toBe("(no title)");
});

test("Returns given string when given a non-empty string", () => {
  expect(fillEmptyTitle("test")).toBe("test");
});
