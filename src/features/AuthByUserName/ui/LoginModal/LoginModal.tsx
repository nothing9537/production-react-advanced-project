import { Dispatch, FC, SetStateAction, Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const LoginModal: FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
  return (
    <Modal
      className={classNames('', {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <LoginFormLazy onSuccess={() => onClose(false)} />
      </Suspense>
    </Modal>
  );
};
