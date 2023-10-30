import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface ForceUpdateConfig {
  value: boolean;
  forceUpdate: () => void;
}

const ForceUpdateContext = createContext<ForceUpdateConfig>({
  value: true,
  forceUpdate: () => { return null; },
});

export const useForceUpdate = () => {
  const { forceUpdate } = useContext(ForceUpdateContext);

  return forceUpdate;
};

export function ForceUpdateProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<boolean>(true);

  const forceUpdate = () => {
    setValue((prev) => !prev);
    setTimeout(() => {
      setValue((prev) => !prev);
    }, 0);
  };

  const valueContext = useMemo(() => ({ value, forceUpdate }), [value]);

  if (!value) {
    return null;
  }

  return (
    <ForceUpdateContext.Provider value={valueContext}>
      {children}
    </ForceUpdateContext.Provider>
  );
}
