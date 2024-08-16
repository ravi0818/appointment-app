import React from 'react';
import { useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { SpecialityOptions } from '@/constants';
import { IDoctorFormData } from '@/interfaces';

import CustomInput from '../shared/CustomInput';
import CustomPicker from '../shared/CustomPicker';
import CustomRadio from '../shared/CutomRadio';

interface AddDoctorContentProps {
  onSubmit: (data: IDoctorFormData) => void;
}

const AddDoctorContent = ({ onSubmit }: AddDoctorContentProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IDoctorFormData>({
    defaultValues: {
      name: '',
      gender: '',
      description: '',
      specialization: SpecialityOptions[0],
    },
  });

  return (
    <View>
      <View>
        <Text variant="headlineMedium">Add Doctor</Text>
      </View>

      <CustomInput
        label="Name"
        name="name"
        control={control}
        errors={errors}
        rules={{ required: true }}
        placeholder="Enter name"
        keyboardType="default"
      />

      <CustomInput
        label="Description"
        name="description"
        control={control}
        errors={errors}
        rules={{ required: true }}
        placeholder="Enter description"
        keyboardType="default"
        multiline
      />

      <CustomRadio
        label="Gender"
        name="gender"
        control={control}
        errors={errors}
        options={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
          { label: 'Other', value: 'Other' },
        ]}
        rules={{ required: true }}
      />

      <CustomPicker
        label="Specialization"
        name="specialization"
        control={control}
        errors={errors}
        options={SpecialityOptions}
        rules={{ required: true }}
      />

      <Button style={styles.button} mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
};

export default AddDoctorContent;

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
});
