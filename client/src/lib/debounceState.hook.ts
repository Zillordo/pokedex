import { debounce } from "lodash";
import { useState, useCallback } from "react";

export const useDebounceState = <T>(
  initialState: T,
  delay: number,
): [T, (value: T) => void] => {
  const [state, setState] = useState(initialState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetState = useCallback(
    debounce((value: T) => setState(value), delay),
    [delay],
  );

  return [state, debounceSetState];
};
