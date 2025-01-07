import * as React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';

interface ConfirmationBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const ConfirmationBox = ({ isOpen, onClose, onConfirm, title, children }: ConfirmationBoxProps) => {
  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={onClose}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{children}</Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Close</Button>
          <Button onPress={onConfirm}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationBox;
