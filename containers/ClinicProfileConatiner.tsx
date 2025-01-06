import React, { useEffect, useMemo, useState } from 'react';

import Loader from '@/components/Loader';
import Profile from '@/components/Profile';
import { IClinicResponse, IClinicUpdateRequest, IProfileField } from '@/interfaces/Profile';
import { useAppSelector } from '@/redux/hooks';
import { useGetClinicProfileQuery, useUpdateClinicProfileMutation } from '@/services/profileService';

const ClinicProfileContainer = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data: clinicProfileResponseData, isFetching: isClinicProfileFetching } = useGetClinicProfileQuery();

  const [updateClinicProfile, { isLoading: isUserProfileUpdating }] = useUpdateClinicProfileMutation();

  const [clinicProfileData, setClinicProfileData] = useState<IClinicResponse>({
    name: '',
    phone: {
      primary: '',
      secondary: '',
    },
    address: '',
    profilePicture: '',
  });

  const handleChange = (field: string, value: string) => {
    setClinicProfileData((prevData) => ({
      ...prevData,
      [field]: field === 'age' ? parseInt(value, 10) : value,
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setClinicProfileData((prevData) => ({
      ...prevData,
      phone: {
        ...prevData.phone,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (clinicProfileResponseData) setClinicProfileData(clinicProfileResponseData.data);
  }, [clinicProfileResponseData]);

  const handleSave = () => {
    try {
      const payload: IClinicUpdateRequest = {
        name: clinicProfileData.name,
        address: clinicProfileData.address,
        phone: {
          primary: clinicProfileData.phone.primary,
          secondary: clinicProfileData.phone.secondary,
        },
        profilePicture: clinicProfileData.profilePicture,
      };
      updateClinicProfile(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const fields: IProfileField[] = [
    {
      key: 'name',
      label: 'Clinic Name',
      value: clinicProfileData?.name || '',
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
      key: 'primary',
      label: 'Primary Phone',
      value: clinicProfileData?.phone?.primary || '',
      onChange: handleContactChange,
      keyboardType: 'numeric',
      editable: true,
      maxLength: 10,
    },
    {
      key: 'secondary',
      label: 'Alternative Phone',
      value: clinicProfileData?.phone?.secondary || '',
      onChange: handleContactChange,
      keyboardType: 'numeric',
      editable: true,
      maxLength: 10,
    },
    {
      key: 'address',
      label: 'Address',
      value: clinicProfileData?.address || '',
      onChange: handleChange,
      editable: true,
    },
  ];

  const isSaveEnabled = useMemo(() => {
    return JSON.stringify(clinicProfileData) !== JSON.stringify(clinicProfileResponseData?.data);
  }, [clinicProfileData]);

  if (isClinicProfileFetching || isUserProfileUpdating) return <Loader />;

  return (
    <Profile
      profilePicture={clinicProfileData?.profilePicture || ''}
      fields={fields}
      handleSave={handleSave}
      isSaveEnabled={isSaveEnabled}
    />
  );
};

export default ClinicProfileContainer;
