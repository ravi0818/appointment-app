import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, RadioButton, IconButton, useTheme } from 'react-native-paper';

import { IAvailability } from '@/interfaces';
import { useRole } from '@/redux/hooks/useRole';
import { getNextDateForDay, isEqual } from '@/utils';

interface AvailabilityProps {
  selectedAvailability: IAvailability;
  availability: IAvailability[];
  onDelete: (slotId: string) => void;
  handleSlotSelection: (availability: IAvailability) => void;
}

const Availability = ({ availability, onDelete, handleSlotSelection, selectedAvailability }: AvailabilityProps) => {
  const role = useRole();
  const theme = useTheme();
  const selectedDate = useMemo(() => {
    if (!selectedAvailability.day) return '';
    return getNextDateForDay(selectedAvailability.day);
  }, [selectedAvailability]);

  return (
    <View>
      <Text style={styles.availabilityTitle}>Availability:</Text>
      {availability?.map((slot, index) => (
        <View key={index} style={styles.availabilityContainer}>
          <View style={styles.availabilitySlot}>
            {isEqual(role, 'patient') && (
              <RadioButton
                value={slot.day}
                status={selectedAvailability._id === slot._id ? 'checked' : 'unchecked'}
                onPress={() => handleSlotSelection(slot)}
              />
            )}
            <Text style={styles.day}>{slot.day}</Text>
            <Text style={styles.time}>
              {slot.startTime} - {slot.endTime}
            </Text>
            {isEqual(role, 'clinic') && (
              <IconButton icon="delete" iconColor="red" size={20} onPress={() => onDelete(slot._id ?? '')} />
            )}
          </View>
          {selectedAvailability._id === slot._id && (
            <Text style={{ alignSelf: 'center', color: theme.colors.primary }}>{selectedDate}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({
  availabilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  availabilityContainer: {
    marginBottom: 16,
  },
  availabilitySlot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  day: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  time: {
    fontSize: 16,
    marginLeft: 'auto',
  },
});
