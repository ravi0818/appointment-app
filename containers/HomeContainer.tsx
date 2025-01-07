import React, { useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { Button, Searchbar, Text, TextInput } from 'react-native-paper';

import Loader from '@/components/Loader';
import AddDoctorModal from '@/components/addDoctor/AddDoctorModal';
import DoctorDetailsCard from '@/components/doctor/DoctorDetailsCard';
import { IDoctorFormData, IDoctorResponse } from '@/interfaces';
import { useAppSelector } from '@/redux/hooks';
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
  useGetDoctorsByUserIdQuery,
  useSaveDoctorMutation,
} from '@/services';
import commonStyles from '@/styles';
import { isEqual } from '@/utils';

const HomeContainer = () => {
  const [visible, setVisible] = useState(false);
  const [saveDoctor] = useSaveDoctorMutation();
  const { data: doctorsList, isLoading, refetch } = useGetDoctorsByUserIdQuery();
  const { data: allDoctorsList } = useGetAllDoctorsQuery();
  const [deleteDoctor] = useDeleteDoctorMutation();
  const user = useAppSelector((state) => state.auth.user);

  const handleSaveDoctor = async (data: IDoctorFormData) => {
    try {
      await saveDoctor(data);
      refetch();
      setVisible(false);
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteDoctor({ id });
      refetch();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const closeModal = () => setVisible(false);

  const renderDoctorItemClinic = ({ item }: { item: IDoctorResponse }) => (
    <DoctorDetailsCard
      doctorDetails={item}
      actionHandler={onDelete}
      actionIcon="delete"
      actionIconColor="red"
      navigationEnabled
    />
  );

  const renderDoctorItemPatient = ({ item }: { item: IDoctorResponse }) => (
    <DoctorDetailsCard doctorDetails={item} navigationEnabled />
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={commonStyles.container}>
      <AddDoctorModal visible={visible} closeModal={closeModal} onSubmit={handleSaveDoctor} />

      <View style={{ paddingBottom: 16 }}>
        <Text style={commonStyles.heading}>Find Your Specialist Doctor</Text>
        <Searchbar placeholder="Search" onChangeText={() => null} value={''} />
      </View>

      {isEqual(user?.role ?? '', 'clinic') && (
        <View>
          <Button icon="plus" mode="contained" onPress={() => setVisible(true)} style={{ marginBottom: 16 }}>
            Add Doctor
          </Button>
          <FlatList
            //@ts-ignore
            data={doctorsList?.data || []}
            keyExtractor={(item) => item._id}
            renderItem={renderDoctorItemClinic}
            contentContainerStyle={commonStyles.list}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
          />
        </View>
      )}

      {isEqual(user?.role ?? '', 'patient') && (
        <View>
          <Text style={commonStyles.subHeading}>Top Doctors</Text>

          <FlatList
            //@ts-ignore
            data={allDoctorsList?.data || []}
            keyExtractor={(item) => item._id}
            renderItem={renderDoctorItemPatient}
            contentContainerStyle={commonStyles.list}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
          />
        </View>
      )}
    </View>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
});
