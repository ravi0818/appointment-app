import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, IconButton, Text, useTheme } from 'react-native-paper';

import { useRouter } from 'expo-router';

import { IDoctorResponse } from '@/interfaces';
import { isEqual } from '@/utils';

interface DoctorDetailsCardProps {
  doctorDetails: IDoctorResponse;
  navigationEnabled?: boolean;
  actionHandler?: (id: string) => void;
  actionIcon?: string;
  actionIconColor?: string;
}

const DoctorDetailsCard = ({
  doctorDetails,
  actionHandler,
  actionIcon,
  actionIconColor,
  navigationEnabled = false,
}: DoctorDetailsCardProps) => {
  const router = useRouter();
  const theme = useTheme();
  const getGender = () => (isEqual(doctorDetails?.gender ?? '', 'male') ? 'M' : 'F');
  return (
    <Card
      style={styles.card}
      onPress={() => router.push({ pathname: '/doctor', params: { id: doctorDetails._id } })}
      disabled={!navigationEnabled}
    >
      <Card.Title
        title={`${doctorDetails.name} (${getGender()})`}
        subtitle={doctorDetails.specialization}
        left={(props) => <Avatar.Icon {...props} icon="account" />}
        right={(props) =>
          actionIcon ? (
            <IconButton
              {...props}
              icon={actionIcon}
              iconColor={actionIconColor}
              onPress={actionHandler ? () => actionHandler(doctorDetails._id) : () => null}
            />
          ) : null
        }
        titleStyle={{ color: theme.colors.primary }}
      />

      <Card.Content>
        <Text style={[styles.description, { color: theme.colors.tertiary }]}>{doctorDetails.description}</Text>
      </Card.Content>
    </Card>
  );
};

export default DoctorDetailsCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
});
