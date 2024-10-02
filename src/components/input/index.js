import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';

const Input = ({
  placeholder = 'Type someting',
  keyboardType = 'default',
  multiline = false,
  hasIcon= false,
  iconName="pluscircle",
  onIconPress=()=>{},
  value="",
  onChangeText=()=>{}
}) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        keyboardType={keyboardType}
        multiline={multiline}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {hasIcon && (
        <TouchableOpacity onPress={onIconPress}>
        <Icon name={iconName} style={styles.icon} />
      </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
