import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Modal, Portal, useTheme } from 'react-native-paper';

import { IAvailabilityFormData } from '@/interfaces';

import AddAvailabilityContent from './AddAvailabilityContent';

interface AddAvailabilityModalProps {
  visible: boolean;
  closeModal: () => void;
  onSubmit: (data: IAvailabilityFormData) => void;
}

const AddAvailabilityModal = ({ visible, closeModal, onSubmit }: AddAvailabilityModalProps) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal visible={visible} onDismiss={closeModal}>
        <Card style={{ backgroundColor: theme.colors.background }}>
          <Card.Content>
            <AddAvailabilityContent onSubmit={onSubmit} />
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

export default AddAvailabilityModal;

const styles = StyleSheet.create({});
