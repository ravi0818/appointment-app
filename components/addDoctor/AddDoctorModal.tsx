import * as React from 'react';
import { Card, Modal, Portal, useTheme } from 'react-native-paper';

import { IDoctorFormData } from '@/interfaces';

import AddDoctorContent from './AddDoctorContent';

interface AddDoctorModalProps {
  visible: boolean;
  closeModal: () => void;
  onSubmit: (data: IDoctorFormData) => void;
}

const AddDoctorModal = ({ visible, closeModal, onSubmit }: AddDoctorModalProps) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal visible={visible} onDismiss={closeModal}>
        <Card style={{ backgroundColor: theme.colors.background }}>
          <Card.Content>
            <AddDoctorContent onSubmit={onSubmit} />
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

export default AddDoctorModal;
