import { FC, ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../Portal';
import './Modal.scss';
interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ReactNode[];
}
const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  console.log('isOpen', isOpen);

  return (
    <Portal>
      <CSSTransition in={isOpen} nodeRef={ref} timeout={300} classNames="Modal" unmountOnExit>
        <div className="Modal" ref={ref}>
          <div className="Modal-overlay" onClick={onClose}>
            <div className="Modal-content" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;
