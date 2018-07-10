import * as valoo from "valoo";

export function isObservable(x: any): x is valoo.Observable<any> {
  return typeof x === "function" && typeof x.on === "function";
}

export function computed<T, U>(
  obs: Array<valoo.Observable<T>>,
  fn: () => U,
): valoo.Observable<U> {
  let last = fn();
  const out = valoo(last);

  function update() {
    const x = fn();
    if (last !== x) out((last = x));
  }

  obs.forEach(o => o.on(update));
  return out;
}
