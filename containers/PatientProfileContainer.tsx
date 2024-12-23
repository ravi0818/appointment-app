import React, { useEffect, useMemo, useState } from 'react';

import Loader from '@/components/Loader';
import Profile from '@/components/Profile';
import { IPatientResponse, IPatientUpdateRequest, IProfileField } from '@/interfaces/Profile';
import { useGetPatientProfileQuery, useUpdatePatientProfileMutation } from '@/services/profileService';

const PatientProfileContainer = () => {
  const { data: patientProfileResponseData, isFetching: isPatientProfileFetching } = useGetPatientProfileQuery();

  const [updatePatientProfile, { isLoading: isUserProfileUpdating }] = useUpdatePatientProfileMutation();

  const [patientProfileData, setPatientProfileData] = useState<IPatientResponse>({
    name: '',
    contacts: {
      primaryPhone: '',
      alternativePhone: '',
      email: '',
    },
    age: 0,
    gender: '',
    address: '',
    profilePicture: '',
  });

  const handleChange = (field: string, value: string) => {
    setPatientProfileData((prevData) => ({
      ...prevData,
      [field]: field === 'age' ? parseInt(value, 10) : value,
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setPatientProfileData((prevData) => ({
      ...prevData,
      contacts: {
        ...prevData.contacts,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (patientProfileResponseData) setPatientProfileData(patientProfileResponseData.data);
  }, [patientProfileResponseData]);

  const handleSave = () => {
    try {
      const payload: IPatientUpdateRequest = {
        name: patientProfileData.name,
        age: patientProfileData.age,
        gender: patientProfileData.gender,
        address: patientProfileData.address,
        contacts: {
          primaryPhone: patientProfileData.contacts.primaryPhone,
          alternativePhone: patientProfileData.contacts.alternativePhone,
        },
        profilePicture: patientProfileData.profilePicture,
      };
      updatePatientProfile(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const fields: IProfileField[] = [
    {
      key: 'name',
      label: 'Name',
      value: patientProfileData?.name || '',
      onChange: handleChange,
      editable: true,
    },
    {
      key: 'email',
      label: 'Email',
      value: patientProfileData?.contacts?.email || '',
      onChange: () => {},
      editable: false,
    },
    {
      key: 'primaryPhone',
      label: 'Primary Phone',
      value: patientProfileData?.contacts?.primaryPhone || '',
      onChange: handleContactChange,
      keyboardType: 'numeric',
      maxLength: 10,
      editable: true,
    },
    {
      key: 'alternativePhone',
      label: 'Alternative Phone',
      value: patientProfileData?.contacts?.alternativePhone || '',
      onChange: handleContactChange,
      keyboardType: 'numeric',
      maxLength: 10,
      editable: true,
    },
    {
      key: 'age',
      label: 'Age',
      value: patientProfileData?.age?.toString() ?? '',
      onChange: handleChange,
      keyboardType: 'numeric',
      editable: true,
      maxLength: 2,
    },
    {
      key: 'gender',
      label: 'Gender',
      value: patientProfileData?.gender || '',
      onChange: handleChange,
      editable: true,
    },
    {
      key: 'address',
      label: 'Address',
      value: patientProfileData?.address || '',
      onChange: handleChange,
      editable: true,
    },
  ];

  const isSaveEnabled = useMemo(() => {
    return JSON.stringify(patientProfileData) !== JSON.stringify(patientProfileResponseData?.data);
  }, [patientProfileData]);

  if (isPatientProfileFetching || !patientProfileData?.contacts?.email || isUserProfileUpdating) return <Loader />;

  return (
    <Profile
      profilePicture={patientProfileData?.profilePicture || ''}
      fields={fields}
      handleSave={handleSave}
      isSaveEnabled={isSaveEnabled}
    />
  );
};

export default PatientProfileContainer;
