import { useState } from 'react';

const useModalState = ({ initialOpen = false } = {}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, onOpen, onClose, onToggle };
};

export default useModalState;
