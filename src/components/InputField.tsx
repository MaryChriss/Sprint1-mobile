import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

type Props = {
  label?: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: any;
  secureTextEntry?: boolean;

  containerStyle?: ViewStyle | ViewStyle[];
  style?: TextStyle | TextStyle[];
  textColor?: string;
  placeholderTextColor?: string;
  labelColor?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
};

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry,
  containerStyle,
  style,
  textColor,
  placeholderTextColor,
  labelColor,
  autoCapitalize,
  autoCorrect,
}: Props) {
  const { colors, dark } = useTheme();

  const finalTextColor = textColor ?? colors.text;
  const finalPlaceholder =
    placeholderTextColor ?? (dark ? "#FFFFFF99" : "#20202066");
  const finalLabelColor = labelColor ?? colors.text;

  return (
    <View style={[styles.box, containerStyle]}>
      {!!label && (
        <Text style={[styles.label, { color: finalLabelColor, opacity: 0.7 }]}>
          {label}
        </Text>
      )}

      <TextInput
        mode="flat"
        underlineColor="transparent"
        selectionColor={colors.primary}
        cursorColor={colors.primary}
        textColor={finalTextColor}
        style={[
          styles.input,
          { color: finalTextColor, backgroundColor: "transparent" },
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={finalPlaceholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        theme={{
          colors: {
            text: finalTextColor,
            primary: colors.primary,
            placeholder: finalPlaceholder,
            background: "transparent",
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    fontSize: 16,
  },
});
