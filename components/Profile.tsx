import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Card, TextInput, IconButton, Text } from 'react-native-paper';

import ProfilePlaceholder from '@/assets/images/profile-placeholder.png';
import { IProfileField } from '@/interfaces/Profile';

interface IProfileProps {
  profilePicture: string;
  fields: IProfileField[];
  handleSave: () => void;
  isSaveEnabled: boolean;
}

const Profile = ({ profilePicture, fields, handleSave, isSaveEnabled }: IProfileProps) => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

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
            source={profilePicture ? { uri: profilePicture } : ProfilePlaceholder}
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
  },
});
