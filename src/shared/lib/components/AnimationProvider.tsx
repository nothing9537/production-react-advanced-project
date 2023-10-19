import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  isLoaded: boolean;
}

interface AnimationProviderProps {
  children: ReactNode;
}

const getAsyncAnimationModules = async () => {
  return Promise.all([
    import('@react-spring/web'),
    import('@use-gesture/react'),
  ]);
};

const AnimationContext = createContext<AnimationContextPayload>({ isLoaded: false });

export const useAnimationModules = () => useContext(AnimationContext) as Required<AnimationContextPayload>;

export const AnimationProvider: FC<AnimationProviderProps> = ({ children }) => {
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      setIsLoaded(true);
    });
  }, []);

  const defaultProps = useMemo<AnimationContextPayload>(() => ({
    Gesture: GestureRef.current,
    Spring: SpringRef.current,
    isLoaded,
  }), [isLoaded]);

  return (
    <AnimationContext.Provider value={defaultProps}>
      {children}
    </AnimationContext.Provider>
  );
};
