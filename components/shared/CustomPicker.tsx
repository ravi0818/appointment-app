import React from 'react';
import { Controller } from 'react-hook-form';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

interface ICustomPickerProps {
  label: string;
  name: string;
  control: any;
  errors: any;
  options: string[];
  rules: any;
  pickerStyle?: any;
  errorStyle?: any;
}

const CustomPicker = ({
  label,
  name,
  control,
  errors,
  options,
  rules,
  pickerStyle,
  errorStyle,
}: ICustomPickerProps) => {
  const theme = useTheme();
  const isDarkMode = theme.dark;
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 16 }}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
            style={[
              isDarkMode
                ? { backgroundColor: theme?.colors?.surfaceDisabled, color: theme.colors.inverseSurface }
                : { backgroundColor: theme?.colors?.surfaceDisabled },
              pickerStyle,
            ]}
            dropdownIconColor={theme?.colors?.inverseSurface}
          >
            <Picker.Item label={`Select ${label}`} value="" />
            {options.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        )}
        rules={rules}
      />
      {errors[name] && <Text style={[styles.error, errorStyle]}>{`${label} is required.`}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomPicker;
