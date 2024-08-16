import React from 'react';
import { Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Text, RadioButton } from 'react-native-paper';

interface IRadioGroupProps {
  label: string;
  name: string;
  control: any;
  errors: any;
  options: Array<{ label: string; value: string }>;
  rules?: any;
  containerStyle?: any;
  labelStyle?: any;
  radioContainerStyle?: any;
  radioTextStyle?: any;
  errorStyle?: any;
}

const CustomRadio = ({
  label,
  name,
  control,
  errors,
  options,
  rules,
  containerStyle,
  labelStyle,
  radioContainerStyle,
  radioTextStyle,
  errorStyle,
}: IRadioGroupProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.radioGroup}>
            {options.map((option) => (
              <View key={option.value} style={[styles.radioContainer, radioContainerStyle]}>
                <RadioButton
                  value={option.value}
                  status={value === option.value ? 'checked' : 'unchecked'}
                  onPress={() => onChange(option.value)}
                />
                <Text style={[styles.radioText, radioTextStyle]}>{option.label}</Text>
              </View>
            ))}
          </View>
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
  label: {
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioText: {
    marginLeft: 8,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomRadio;
