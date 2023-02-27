import { useState } from "react";

export function useBoolean(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  function setFalse() {
    setValue(false);
  }

  function setTrue() {
    setValue(true);
  }

  function toggle() {
    setValue((prev) => !prev);
  }

  return [value, { setFalse, setTrue, toggle }] as const;
}
