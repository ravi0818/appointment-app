import React, { useEffect, useMemo, useState } from 'react';

import Loader from '@/components/Loader';
import Profile from '@/components/Profile';
import { IPatientResponse, IPatientUpdateRequest, IProfileField } from '@/interfaces/Profile';
import { useAppSelector } from '@/redux/hooks';
import { useGetPatientProfileQuery, useUpdatePatientProfileMutation } from '@/services/profileService';

const PatientProfileContainer = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data: patientProfileResponseData, isFetching: isPatientProfileFetching } = useGetPatientProfileQuery();

  const [updatePatientProfile, { isLoading: isUserProfileUpdating }] = useUpdatePatientProfileMutation();

  const [patientProfileData, setPatientProfileData] = useState<IPatientResponse>({
    name: '',
    phone: {
      primary: '',
      secondary: '',
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
      phone: {
        ...prevData.phone,
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
        phone: {
          primary: patientProfileData.phone.primary,
          secondary: patientProfileData.phone.secondary,
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
      value: user?.email || '',
      onChange: () => {},
      editable: false,
    },
    {
      key: 'primaryPhone',
      label: 'Primary Phone',
      value: patientProfileData?.phone?.primary || '',
      onChange: handleContactChange,
      keyboardType: 'numeric',
      maxLength: 10,
      editable: true,
    },
    {
      key: 'alternativePhone',
      label: 'Alternative Phone',
      value: patientProfileData?.phone?.secondary || '',
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

  if (isPatientProfileFetching || isUserProfileUpdating) return <Loader />;

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
