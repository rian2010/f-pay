import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: string;
  iconPosition?: 'left' | 'right'; // Icon position prop
  secureTextEntry?: boolean,
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  iconPosition = 'left', // Default icon position
  keyboardType = 'default',
  secureTextEntry,
  errorMessage,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, errorMessage && styles.errorBorder]}>
        {icon && iconPosition === 'left' && (
          <Icon name={icon} size={20} color="#7B7B8B" style={styles.iconLeft} />
        )}
        <TextInput
          style={[
            styles.input,
            icon && iconPosition === 'right' && { paddingRight: 40 }, // Add padding when icon is on the right
          ]}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
        {icon && iconPosition === 'right' && (
          <Icon name={icon} size={20} color="#7B7B8B" style={styles.iconRight} />
        )}
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
    color: '#808080',
    fontFamily: 'PoppinsMedium'
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    position: 'relative', // Position relative for absolute icon placement
  },
  errorBorder: {
    borderColor: 'red',
  },
  iconLeft: {
    marginRight: 10,
    marginLeft: 10
  },
  iconRight: {
    position: 'absolute',
    right: 10, // Align the icon to the right of the input
    top: '50%', // Vertically center the icon
    transform: [{ translateY: -10 }], // Adjust vertical alignment based on icon size
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#808080',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;

