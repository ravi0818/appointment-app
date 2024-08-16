import React from 'react';
import { useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { DAYS_OF_WEEK, TimeOptions } from '@/constants';
import { IAvailabilityFormData } from '@/interfaces';

import CustomInput from '../shared/CustomInput';
import CustomPicker from '../shared/CustomPicker';

interface IAddAvailabilityProps {
  onSubmit: (data: IAvailabilityFormData) => void;
}

const AddAvailabilityContent = ({ onSubmit }: IAddAvailabilityProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAvailabilityFormData>({
    defaultValues: {
      day: '',
      startTime: '',
      endTime: '',
      maxAppointments: '',
    },
  });

  return (
    <View style={styles.container}>
      <CustomPicker
        label="Day"
        name="day"
        control={control}
        errors={errors}
        options={DAYS_OF_WEEK}
        rules={{ required: true }}
      />

      <CustomPicker
        label="Start Time"
        name="startTime"
        control={control}
        errors={errors}
        options={TimeOptions}
        rules={{ required: true }}
      />

      <CustomPicker
        label="End Time"
        name="endTime"
        control={control}
        errors={errors}
        options={TimeOptions}
        rules={{ required: true }}
      />

      <CustomInput
        label="Max Appointments"
        name="maxAppointments"
        control={control}
        errors={errors}
        rules={{ required: true }}
        placeholder="Enter Max Appointments"
        keyboardType="numeric"
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default AddAvailabilityContent;
