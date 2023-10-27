import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
	element?: HTMLElement;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Portal: FC<PortalProps> = ({ children, element = document.body }) => (
  createPortal(children, element)
);
