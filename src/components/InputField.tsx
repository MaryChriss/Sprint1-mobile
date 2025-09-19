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

  /** Estilo do WRAPPER (fora do TextInput) */
  containerStyle?: ViewStyle | ViewStyle[];

  /** Estilo do TextInput (você já usa `style` nas telas) */
  style?: TextStyle | TextStyle[];

  /** Overrides de cor (opcionais) */
  textColor?: string;
  placeholderTextColor?: string;
  labelColor?: string;

  /** Demais props pass-through do Paper */
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
    placeholderTextColor ?? (dark ? "#FFFFFF99" : "#00000066");
  const finalLabelColor = labelColor ?? colors.text;

  return (
    <View style={[styles.box, containerStyle]}>
      {!!label && (
        <Text style={[styles.label, { color: finalLabelColor, opacity: 0.7 }]}>
          {label}
        </Text>
      )}

      <TextInput
        mode="flat" // sem outline
        underlineColor="transparent" // sem linha
        selectionColor={colors.primary}
        cursorColor={colors.primary}
        textColor={finalTextColor}
        style={[
          styles.input,
          { color: finalTextColor, backgroundColor: "transparent" },
          style, // <- usa o style que você já passa nas telas
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
    paddingHorizontal: 0, // deixe o padding para o containerStyle, quando precisar “glass”
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
