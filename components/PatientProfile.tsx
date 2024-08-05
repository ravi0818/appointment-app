import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, TextInput, IconButton, Text } from 'react-native-paper';

import { IPatientResponse } from '@/interfaces/Profile';

interface IPatientProfileProps {
  userProfileData: IPatientResponse | any;
  handleChange: any;
  handleContactChange: any;
  handleSave: any;
}
const PatientProfile = ({ userProfileData, handleChange, handleContactChange, handleSave }: IPatientProfileProps) => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    primaryPhone: false,
    alternativePhone: false,
    age: false,
    gender: false,
    address: false,
  });

  const toggleEdit = (field: any) => {
    setIsEditing((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const cancelEditing = () => {
    setIsEditing({
      name: false,
      primaryPhone: false,
      alternativePhone: false,
      age: false,
      gender: false,
      address: false,
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} onPress={cancelEditing}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Image size={100} source={{ uri: userProfileData?.profilePicture }} style={styles.avatar} />

          {isEditing.name ? (
            <TextInput
              label="Name"
              value={userProfileData?.name}
              onChangeText={(text) => handleChange('name', text)}
              style={styles.input}
              onBlur={() => toggleEdit('name')}
              autoFocus
            />
          ) : (
            <View style={styles.fieldContainer}>
              <View style={styles.fieldWrapper}>
                <Text style={styles.fieldLabel}>Name</Text>
                <Text style={styles.fieldValue}>{userProfileData?.name}</Text>
              </View>
              <IconButton icon="pencil" size={20} onPress={() => toggleEdit('name')} style={styles.editIcon} />
            </View>
          )}

          <View style={styles.fieldContainer}>
            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>Email</Text>
              <Text style={styles.fieldValue}>{userProfileData?.contacts?.email}</Text>
            </View>
          </View>

          {isEditing.primaryPhone ? (
            <TextInput
              label="Primary Phone"
              value={userProfileData?.contacts?.primaryPhone}
              onChangeText={(text) => handleContactChange('primaryPhone', text)}
              style={styles.input}
              onBlur={() => toggleEdit('primaryPhone')}
              maxLength={10}
              keyboardType="numeric"
              inputMode="numeric"
              autoFocus
            />
          ) : (
            <View style={styles.fieldContainer}>
              <View style={styles.fieldWrapper}>
                <Text style={styles.fieldLabel}>Primary Phone</Text>
                <Text style={styles.fieldValue}>{userProfileData?.contacts?.primaryPhone}</Text>
              </View>
              <IconButton icon="pencil" size={20} onPress={() => toggleEdit('primaryPhone')} style={styles.editIcon} />
            </View>
          )}

          {isEditing.alternativePhone ? (
            <TextInput
              label="Alternative Phone"
              value={userProfileData?.contacts?.alternativePhone}
              onChangeText={(text) => handleContactChange('alternativePhone', text)}
              style={styles.input}
              onBlur={() => toggleEdit('alternativePhone')}
              maxLength={10}
              keyboardType="numeric"
              autoFocus
            />
          ) : (
            <View style={styles.fieldContainer}>
              <View style={styles.fieldWrapper}>
                <Text style={styles.fieldLabel}>Alternative Phone</Text>
                <Text style={styles.fieldValue}>{userProfileData?.contacts?.alternativePhone}</Text>
              </View>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => toggleEdit('alternativePhone')}
                style={styles.editIcon}
              />
            </View>
          )}

          {isEditing.age ? (
            <TextInput
              label="Age"
              value={userProfileData?.age?.toString()}
              onChangeText={(text) => handleChange('age', text)}
              style={styles.input}
              onBlur={() => toggleEdit('age')}
              autoFocus
              keyboardType="numeric"
            />
          ) : (
            <View style={styles.fieldContainer}>
              <View style={styles.fieldWrapper}>
                <Text style={styles.fieldLabel}>Age</Text>
                <Text style={styles.fieldValue}>{userProfileData?.age}</Text>
              </View>
              <IconButton icon="pencil" size={20} onPress={() => toggleEdit('age')} style={styles.editIcon} />
            </View>
          )}

          {isEditing.gender ? (
            <TextInput
              label="Gender"
              value={userProfileData?.gender}
              onChangeText={(text) => handleChange('gender', text)}
              style={styles.input}
              onBlur={() => toggleEdit('gender')}
              autoFocus
            />
          ) : (
            <View style={styles.fieldContainer}>
              <View style={styles.fieldWrapper}>
                <Text style={styles.fieldLabel}>Gender</Text>
                <Text style={styles.fieldValue}>{userProfileData?.gender}</Text>
              </View>
              <IconButton icon="pencil" size={20} onPress={() => toggleEdit('gender')} style={styles.editIcon} />
            </View>
          )}

          {isEditing.address ? (
            <TextInput
              label="Address"
              value={userProfileData?.address}
              onChangeText={(text) => handleChange('address', text)}
              style={styles.input}
              onBlur={() => toggleEdit('address')}
              autoFocus
            />
          ) : (
            <View style={styles.fieldContainer}>
              <View style={styles.fieldWrapper}>
                <Text style={styles.fieldLabel}>Address</Text>
                <Text style={styles.fieldValue}>{userProfileData?.address}</Text>
              </View>
              <IconButton icon="pencil" size={20} onPress={() => toggleEdit('address')} style={styles.editIcon} />
            </View>
          )}
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => {
              cancelEditing();
              handleSave();
            }}
          >
            Save Changes
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default PatientProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    height: '100%',
    padding: 0,
    overflow: 'scroll',
    justifyContent: 'space-between',
  },
  cardContent: {
    height: '90%',
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  fieldContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    justifyContent: 'space-between',
  },
  fieldWrapper: {
    flexDirection: 'column',
    width: '80%',
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: 'white',
  },
  fieldValue: {
    flex: 1,
  },
  editIcon: {
    marginLeft: 8,
  },
  input: {
    marginBottom: 16,
    width: '100%',
  },
  actions: {
    alignSelf: 'center',
    marginTop: 16,
    height: '10%',
  },
});
