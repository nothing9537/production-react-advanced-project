import { cloneElement, FC, FormEvent, ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { AnimationProvider, useAnimationModules } from '@/shared/lib/components/AnimationProvider';
import { Overlay } from '../Overlay';
import { Portal } from '../Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
  closeCallback?: () => void;
  component: ReactElement;
  root?: HTMLTag;
  lazy?: boolean;
}

const height = window.innerHeight - 100;

export const DrawerContent: FC<DrawerProps> = ({ className, children, onClose, component, root = 'div' }) => {
  const { Spring, Gesture } = useAnimationModules();

  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  const onResolve = useCallback(() => {
    onClose?.();
    setIsOpen(false);
  }, [onClose]);

  const onCloseDrawer = useCallback((velocity = 0) => {
    api.start({ y: height, immediate: false, config: { ...Spring.config.stiff, velocity }, onResolve });
  }, [api, Spring.config.stiff, onResolve]);

  const onOpenDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
    setIsOpen(true);
  }, [api]);

  const clonedTrigger = cloneElement(component, {
    onClick: onOpenDrawer,
  });

  useEffect(() => {
    if (isOpen) {
      onOpenDrawer();
    }
  }, [api, isOpen, onOpenDrawer]);

  const bind = Gesture.useDrag(({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
    if (my < -70) cancel();

    if (last) {
      if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
        onCloseDrawer();
      } else {
        onOpenDrawer();
      }
    } else {
      api.start({ y: my, immediate: true });
    }
  }, {
    from: () => [0, y.get()],
    filterTaps: true,
    bounds: { top: 0 },
    rubberband: true,
  });

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  const RootWrapper = root;

  const onSubmit = useCallback((e: FormEvent) => {
    if (root === 'form') {
      e.preventDefault();
      onCloseDrawer();
    }
  }, [root, onCloseDrawer]);

  return (
    <>
      {clonedTrigger}
      <Portal>
        <RootWrapper onSubmit={onSubmit} className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
          <Overlay onClick={onCloseDrawer} />
          <Spring.a.div
            style={{ display, bottom: `calc(-100vh + ${height - 200}px)`, y }}
            className={classNames(cls.sheet, {}, ['scroll'])}
            {...bind()}
          >
            {children}
          </Spring.a.div>
        </RootWrapper>
      </Portal>
    </>
  );
};

export const DrawerAsync: FC<DrawerProps> = (props) => {
  const { isLoaded } = useAnimationModules();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};

export const Drawer: FC<DrawerProps> = (props) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  );
};
