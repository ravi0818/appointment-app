import React, { useMemo, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';

import { useLocalSearchParams } from 'expo-router';

import Loader from '@/components/Loader';
import AddAvailabilityModal from '@/components/addAvailability/AddAvailabilityModal';
import Availability from '@/components/doctor/Availability';
import DoctorDetailsCard from '@/components/doctor/DoctorDetailsCard';
import { IAvailability, IAvailabilityFormData, IDoctorResponse } from '@/interfaces';
import { useRole } from '@/redux/hooks/useRole';
import {
  useCreateAvailabilityMutation,
  useDeleteAvailabilityMutation,
  useGetDoctorByIdQuery,
  useGetDoctorAvailabilityQuery,
  useGetRemainingSlotsQuery,
  useBookAppointmentMutation,
} from '@/services';
import { getNextDateForDay, isEqual } from '@/utils';

const DoctorContainer = () => {
  const role = useRole();
  const { id: doctorId } = useLocalSearchParams();

  const [selectedAvailability, setSelectedAvailability] = useState<IAvailability>({} as IAvailability);
  const [openAvailabilityModal, setOpenAvailabilityModal] = useState(false);

  const { data: doctorResponseData, isLoading: isDoctorLoading } = useGetDoctorByIdQuery(doctorId as string);
  const {
    data: availabilityResponseData,
    isLoading: isAvailabilityLoading,
    isFetching: isAvailabilityFetching,
    refetch: refetchAvailability,
  } = useGetDoctorAvailabilityQuery(doctorId as string);

  const [createAvailability, { isLoading: isAvailabilityAdding }] = useCreateAvailabilityMutation();
  const [deleteAvailability, { isLoading: isAvailabilityDeleting }] = useDeleteAvailabilityMutation();
  const [bookAppointment, { isLoading: isBookingAppointment }] = useBookAppointmentMutation();

  const {
    data: availableSlotsResponse,
    isLoading: isSlotsLoading,
    isFetching: isSlotsFetching,
  } = useGetRemainingSlotsQuery(
    {
      availabilityId: selectedAvailability._id ?? '',
      date: selectedAvailability.day ? getNextDateForDay(selectedAvailability.day) : '',
    },
    { skip: !selectedAvailability._id }
  );

  const doctorDetails: IDoctorResponse = doctorResponseData?.data || ({} as IDoctorResponse);
  const availability = availabilityResponseData?.data ?? [];

  const { remainingSlots, totalSlots } = useMemo(
    () => availableSlotsResponse?.data || { remainingSlots: 0, totalSlots: 0 },
    [availableSlotsResponse]
  );

  const addAvailabilityHandler = useCallback(
    async (data: IAvailabilityFormData) => {
      try {
        await createAvailability({ doctorId: doctorId as string, ...data });
        refetchAvailability();
        setOpenAvailabilityModal(false);
      } catch (error) {
        console.error('Error creating availability:', error);
      }
    },
    [createAvailability, doctorId, refetchAvailability]
  );

  const deleteAvailabilityHandler = useCallback(
    async (availabilityId: string) => {
      try {
        await deleteAvailability({ availabilityId });
        refetchAvailability();
      } catch (error) {
        console.error('Error deleting availability:', error);
      }
    },
    [deleteAvailability, refetchAvailability]
  );

  const bookAppointmentHandler = useCallback(async () => {
    try {
      const payload = {
        availabilityId: selectedAvailability._id ?? '',
        date: getNextDateForDay(selectedAvailability.day),
      };
      await bookAppointment(payload);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  }, [bookAppointment]);

  const closeModal = useCallback(() => setOpenAvailabilityModal(false), []);

  if (
    isDoctorLoading ||
    isAvailabilityLoading ||
    isAvailabilityFetching ||
    isSlotsLoading ||
    isSlotsFetching ||
    isAvailabilityAdding ||
    isAvailabilityDeleting ||
    isBookingAppointment
  ) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <DoctorDetailsCard doctorDetails={doctorDetails} />

      <Card>
        <Card.Content>
          <Availability
            availability={availability}
            onDelete={deleteAvailabilityHandler}
            handleSlotSelection={setSelectedAvailability}
            selectedAvailability={selectedAvailability}
          />
          {isEqual(role, 'patient') && (
            <View style={styles.centerContent}>
              {remainingSlots > 0 ? (
                <Chip>
                  <Text>Slots Available: </Text>
                  <Text>
                    {remainingSlots}/{totalSlots}
                  </Text>
                </Chip>
              ) : (
                <Text>No slots available.</Text>
              )}
            </View>
          )}
        </Card.Content>
        <Card.Actions style={styles.centerContent}>
          {isEqual(role, 'clinic') ? (
            <Button mode="contained" onPress={() => setOpenAvailabilityModal(true)}>
              Add Availability
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={bookAppointmentHandler}
              disabled={!selectedAvailability._id || remainingSlots === 0}
            >
              Book Slot
            </Button>
          )}
        </Card.Actions>
      </Card>

      <AddAvailabilityModal visible={openAvailabilityModal} closeModal={closeModal} onSubmit={addAvailabilityHandler} />
    </ScrollView>
  );
};

export default DoctorContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContent: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});
