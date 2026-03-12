import { expect, test } from "bun:test";
import { mandatory } from "./helpers";

test("mandatory - returns value when it is not null or undefined", () => {
    expect(mandatory(5)).toBe(5);
    expect(mandatory("hello")).toBe("hello");
    expect(mandatory({ key: "value" })).toEqual({ key: "value" });
});

test("mandatory - throws error when value is null", () => {
    expect(() => mandatory(null)).toThrow("Mandatory value is missing");
});

test("mandatory - throws error when value is undefined", () => {
    expect(() => mandatory(undefined)).toThrow("Mandatory value is missing");
});

test("mandatory - works with array splice", () => {
    const hand: string[] = [];

    const [playedCard] = hand.splice(1, 1);
    expect(() => mandatory(playedCard)).toThrow("Mandatory value is missing");
});
