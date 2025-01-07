import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import Loader from '@/components/Loader';
import AppointmentCard from '@/components/appointment/AppointmentCard';
import ConfirmationBox from '@/components/shared/ConfirmationBox';
import { IAppointmentDetails } from '@/interfaces';
import { useCancelAppointmentMutation, useGetUserAppointmentsQuery } from '@/services';
import commonStyles from '@/styles';

const AppointmentsContainer = () => {
  const { data: appointmentList, isLoading, refetch } = useGetUserAppointmentsQuery();
  const [cancelAppointment, { isLoading: isCancelling }] = useCancelAppointmentMutation();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const onCancelConfirmation = (appointmentId: string) => {
    setIsConfirmationOpen(true);
    setSelectedAppointmentId(appointmentId);
  };

  const handleCancelAppointment = async () => {
    setIsConfirmationOpen(false);
    await cancelAppointment({ appointmentId: selectedAppointmentId });
    refetch();
  };

  const renderAppointmentItem = ({ item }: { item: IAppointmentDetails }) => {
    return <AppointmentCard appointment={item} actionHandler={onCancelConfirmation} />;
  };

  if (isCancelling) return <Loader />;

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.heading}>Appointments</Text>

      <FlatList
        //@ts-ignore
        data={appointmentList?.data || []}
        keyExtractor={(item) => item._id}
        renderItem={renderAppointmentItem}
        contentContainerStyle={commonStyles.list}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      />

      <ConfirmationBox
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
        onConfirm={handleCancelAppointment}
        title={'Cancel Appointment'}
      >
        <Text>Are you sure you want to cancel this appointment?</Text>
      </ConfirmationBox>
    </View>
  );
};

export default AppointmentsContainer;

const styles = StyleSheet.create({});
