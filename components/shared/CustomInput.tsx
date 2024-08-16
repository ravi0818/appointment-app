import React from 'react';
import { Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';

interface ICustomInputProps {
  label: string;
  name: string;
  control: any;
  errors: any;
  rules?: any;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  inputStyle?: any;
  errorStyle?: any;
  multiline?: boolean;
}

const CustomInput = ({
  label,
  name,
  control,
  errors,
  rules,
  placeholder,
  keyboardType = 'default',
  inputStyle,
  errorStyle,
  multiline = false,
}: ICustomInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 16 }}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={inputStyle}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            multiline={multiline}
          />
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

export default CustomInput;
