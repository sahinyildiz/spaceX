import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

const CustomInput = (props) => {
  const [isValid, setIsValid] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const changeTextHandler = (text) => {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  useEffect(() => {
    if (props.error) {
      setIsValid(false);
    } else if (!props.required || props.value) {
      setIsValid(true);
    }
  }, [props.value, props.required, props.error]);

  const blurHandler = () => {
    if (props.required && !props.value) {
      setIsValid(false);
    }
    setIsFocus(false);
  };

  const focusHandler = () => {
    setIsFocus(true);
  };

  const renderContentStyle = () => {
    var style = [styles.containerStyle, props.containerStyle];
    if (isFocus) {
      style = [...style];
    }
    if (!isValid) {
      style = [...style];
    }
    return style;
  };

  const passwordSecurty = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <View style={renderContentStyle()}>
      <View style={[{ flex: 1 }, props.subContainerStyle]}>
        <TextInput
          placeholder={props.placeHolderText ? props.placeHolderText : ''}
          placeholderTextColor={'#aaa'}
          {...props}
          onFocus={focusHandler}
          onBlur={blurHandler}
          keyboardType={props.numeric ? 'number-pad' : 'default'}
          style={[
            styles.style,
            props.value != '' ? { borderColor: '#3F8528' } : { borderColor: '#aaa' },
            props.style,
          ]}
          editable={props.editable !== false}
          multiline={props.multiline ? props.multiline : null}
          numberOfLines={props.numberOfLines ? props.numberOfLines : null}
          secureTextEntry={props.secureTextEntry ? passwordVisible == false ? props.secureTextEntry : false : false}
          onChangeText={changeTextHandler}
        />
      </View>
    </View>
  );
};
export default CustomInput;

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginBottom: 20
  },
  style: {
    height: 50,
    borderBottomWidth: 1,
    color: '#1e2f5e',
    paddingLeft: -10
  },
  logoStyle: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    height: 60,
    color: '#1e2f5e',
    backgroundColor: '#1e2f5e',
  },
  passwordBtn: {
    position: 'absolute',
    right: 0,
    top: 32,
    zIndex: 999
  }
});
