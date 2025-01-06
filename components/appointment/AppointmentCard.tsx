import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';

import { IAppointmentDetails } from '@/interfaces';
import { getFormattedDate, isEqual } from '@/utils';

interface IAppointmentCardProps {
  appointment: IAppointmentDetails;
  actionHandler?: (id: string) => void;
}

const AppointmentCard = ({ appointment, actionHandler }: IAppointmentCardProps) => {
  const theme = useTheme();

  const getSubTitle = (appointment: IAppointmentDetails) => {
    return (
      <View>
        <Text
          style={{ color: theme.colors.tertiary }}
        >{`${appointment.status.toUpperCase()} | ${appointment.doctorId.specialization}`}</Text>
        <Text
          style={{ color: theme.colors.tertiary }}
        >{`${appointment.availabilityId.startTime} - ${appointment.availabilityId.endTime} | ${getFormattedDate(appointment.date)} | ${appointment.availabilityId.day} `}</Text>
      </View>
    );
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={appointment.doctorId.name}
        subtitle={getSubTitle(appointment)}
        // left={(props) => <Avatar.Icon {...props} icon="account" />}
        right={(props) => (
          <IconButton
            {...props}
            icon={'close'}
            iconColor={'red'}
            onPress={actionHandler ? () => actionHandler(appointment._id) : () => null}
            disabled={isEqual(appointment.status, 'cancelled')}
          />
        )}
        titleStyle={{ color: theme.colors.primary }}
        subtitleStyle={{ color: theme.colors.tertiary }}
      />
    </Card>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
