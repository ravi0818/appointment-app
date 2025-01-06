import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import AppointmentCard from '@/components/appointment/AppointmentCard';
import { IAppointmentDetails } from '@/interfaces';
import { useCancelAppointmentMutation, useGetUserAppointmentsQuery } from '@/services';
import commonStyles from '@/styles';

const AppointmentsContainer = () => {
  const { data: appointmentList, isLoading, refetch } = useGetUserAppointmentsQuery();
  const [cancelAppointment, { isLoading: isCancelling }] = useCancelAppointmentMutation();

  const handleCancelAppointment = async (appointmentId: string) => {
    await cancelAppointment({ appointmentId });
  };

  const renderAppointmentItem = ({ item }: { item: IAppointmentDetails }) => {
    return <AppointmentCard appointment={item} actionHandler={handleCancelAppointment} />;
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Appointments</Text>

      <FlatList
        //@ts-ignore
        data={appointmentList?.data || []}
        keyExtractor={(item) => item._id}
        renderItem={renderAppointmentItem}
        contentContainerStyle={commonStyles.list}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      />
    </View>
  );
};

export default AppointmentsContainer;

const styles = StyleSheet.create({});
