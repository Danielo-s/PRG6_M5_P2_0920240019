import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const Button = ({
  title,
  onPress,
  type = 'primary', 
  loading = false,
  disabled = false,
  style,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return '#CCCCCC';
    switch (type) {
      case 'primary':
        return '#2E7D32';
      case 'secondary':
        return '#FF8F00';
      case 'danger':
        return '#D32F2F';
      case 'success':
        return '#388E3C';
      default:
        return '#2E7D32';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;