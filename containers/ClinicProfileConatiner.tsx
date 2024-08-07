import React, { useEffect, useState } from 'react';

import Loader from '@/components/Loader';
import Profile from '@/components/Profile';
import { IClinicResponse, IClinicUpdateRequest, IProfileField } from '@/interfaces/Profile';
import { useGetClinicProfileQuery, useUpdateClinicProfileMutation } from '@/services/profile/profileService';

const ClinicProfileContainer = () => {
  const { data: clinicProfileResponseData, isFetching: isClinicProfileFetching } = useGetClinicProfileQuery();

  const [updateClinicProfile, { isLoading: isUserProfileUpdating }] = useUpdateClinicProfileMutation();

  const [clinicProfileData, setClinicProfileData] = useState<IClinicResponse>({
    name: '',
    contacts: {
      primaryPhone: '',
      alternativePhone: '',
      email: '',
    },
    address: '',
    profilePicture: '',
  });

  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const handleChange = (field: string, value: string) => {
    setClinicProfileData((prevData) => ({
      ...prevData,
      [field]: field === 'age' ? parseInt(value, 10) : value,
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setClinicProfileData((prevData) => ({
      ...prevData,
      contacts: {
        ...prevData.contacts,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (clinicProfileResponseData) setClinicProfileData(clinicProfileResponseData);
  }, [clinicProfileResponseData]);

  const handleSave = () => {
    try {
      const payload: IClinicUpdateRequest = {
        name: clinicProfileData.name,
        address: clinicProfileData.address,
        contacts: {
          primaryPhone: clinicProfileData.contacts.primaryPhone,
          alternativePhone: clinicProfileData.contacts.alternativePhone,
        },
        profilePicture: clinicProfileData.profilePicture,
      };
      updateClinicProfile(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const fields: IProfileField[] = [
    {
      key: 'name',
      label: 'Clinic Name',
      value: clinicProfileData?.name || '',
      onChange: handleChange,
    },
    {
      key: 'email',
      label: 'Email',
      value: clinicProfileData?.contacts?.email || '',
      onChange: () => {},
    },
    {
      key: 'primaryPhone',
      label: 'Primary Phone',
      value: clinicProfileData?.contacts?.primaryPhone || '',
      onChange: handleContactChange,
      keyboardType: 'numeric',
    },
    {
      key: 'alternativePhone',
      label: 'Alternative Phone',
      value: clinicProfileData?.contacts?.alternativePhone || '',
      onChange: handleContactChange,
      keyboardType: 'numeric',
    },
    {
      key: 'address',
      label: 'Address',
      value: clinicProfileData?.address || '',
      onChange: handleChange,
    },
  ];

  useEffect(() => {
    const isDataChanged = JSON.stringify(clinicProfileData) !== JSON.stringify(clinicProfileResponseData);
    setIsSaveEnabled(isDataChanged);
  }, [clinicProfileData]);

  if (isClinicProfileFetching || !clinicProfileData?.contacts?.email || isUserProfileUpdating) return <Loader />;

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
