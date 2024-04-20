import { normalizeAttribute } from "./normalizeAttributes";
import { describe, expect, it } from "vitest";
describe("normalizeAttribute", () => {
  it("should return a normalized attribute", () => {
    const attribute = "some-attribute";
    const normalizedAttribute = normalizeAttribute(attribute);
    expect(normalizedAttribute).toBe("someAttribute");
  });

  it("should return an empty string if the attribute is empty", () => {
    const attribute = "";
    const normalizedAttribute = normalizeAttribute(attribute);
    expect(normalizedAttribute).toBe("");
  });

  it("should return the same attribute if it is already normalized", () => {
    const attribute = "dataAttribute";
    const normalizedAttribute = normalizeAttribute(attribute);
    expect(normalizedAttribute).toBe("dataAttribute");
  });
});
