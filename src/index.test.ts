import * as valoo from "valoo";
import { computed, isObservable } from ".";
import * as t from "assert";

describe("isObservable", () => {
  it("should work", () => {
    t.equal(isObservable(2), false);
    t.equal(isObservable(() => undefined), false);
    t.equal(isObservable(valoo(42)), true);
  });
});

describe("computed", () => {
  it("should work with 1 observable", () => {
    const num = valoo(42);
    const res = computed([num], () => num());
    t.equal(res(), 42);
  });

  it("should work with multiple observables", () => {
    const num = valoo(42);
    const num2 = valoo(1);
    const res = computed([num, num2], () => num() + num2());
    t.equal(res(), 43);
  });
});
