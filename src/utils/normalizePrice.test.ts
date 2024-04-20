import { normalizePrice } from "./normalizePrice";
import { describe, expect, it } from "vitest";

describe("normalizePrice", () => {
  it("should return null with odd inputs", () => {
    expect(normalizePrice("0")).toBeNull();
    expect(normalizePrice(0)).toBeNull();
    expect(normalizePrice(-10)).toBeNull();
    expect(normalizePrice("asdasd")).toBeNull();
  });

  it("should return these numbers as proper formatted strings", () => {
    expect(normalizePrice("10")).toBe("1000");
    expect(normalizePrice("10.5")).toBe("1050");
    expect(normalizePrice("10,5")).toBe("1050");
    expect(normalizePrice(10)).toBe("1000");
    expect(normalizePrice(10.5)).toBe("1050");
  });
});
