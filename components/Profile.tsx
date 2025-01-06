import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Card, TextInput, IconButton, Text } from 'react-native-paper';

import { IProfileField } from '@/interfaces/Profile';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';

interface IProfileProps {
  profilePicture: string;
  fields: IProfileField[];
  handleSave: () => void;
  isSaveEnabled: boolean;
}

const Profile = ({ profilePicture, fields, handleSave, isSaveEnabled }: IProfileProps) => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const dispatch = useAppDispatch();

  const toggleEdit = (field: string) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const cancelEditing = () => {
    setIsEditing({});
  };

  const renderField = ({ key, label, value, onChange, keyboardType, editable, maxLength }: IProfileField) => {
    return isEditing[key] ? (
      <TextInput
        key={key}
        label={label}
        value={value}
        onChangeText={(text) => onChange(key, text)}
        style={styles.input}
        onBlur={() => toggleEdit(key)}
        autoFocus
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    ) : (
      <View style={styles.fieldContainer} key={key}>
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>{label}</Text>
          <Text style={styles.fieldValue}>{value}</Text>
        </View>
        {editable ? (
          <IconButton icon="pencil" size={20} onPress={() => toggleEdit(key)} style={styles.editIcon} />
        ) : (
          <View style={{ height: 48 }}></View>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card} onPress={cancelEditing}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Image
            size={100}
            source={{
              uri: profilePicture
                ? profilePicture
                : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
            }}
            style={styles.avatar}
          />
          {fields.map((field) => renderField(field))}
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => {
              cancelEditing();
              handleSave();
            }}
            disabled={!isSaveEnabled}
          >
            Save Changes
          </Button>
          <Button mode="contained" onPress={() => dispatch(logout())}>
            Logout
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    height: '100%',
  },
  cardContent: {
    paddingBottom: 16,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  fieldContainer: {
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
  },
});
