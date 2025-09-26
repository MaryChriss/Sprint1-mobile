import { List } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { listPatios } from "../services/rotes";
import { useTranslation } from "react-i18next";

type Patio = { id: number; nome: string };

export default function Dropdown({
  onSelect,
}: {
  onSelect?: (id: number) => void;
}) {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(t("selectFilial"));
  const [patios, setPatios] = useState<Patio[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const fetchPatios = useCallback(async () => {
    try {
      setErro(null);
      setLoading(true);
      const data = await listPatios();
      setPatios(Array.isArray(data) ? data : []);
    } catch {
      setErro(t("erroCarrFiliais"));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPatios();
    }, [fetchPatios])
  );

  useEffect(() => {
    if (expanded) fetchPatios();
  }, [expanded, fetchPatios]);

  const handleSelect = (id: number, nome: string) => {
    setSelectedItem(nome);
    setExpanded(false);
    onSelect?.(id);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.filialTitle, { color: colors.text }]}>
        {t("filialSelect")}
      </Text>

      <View
        style={[
          styles.dropdownContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <List.Accordion
          title={selectedItem}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
          titleStyle={[styles.title, { color: colors.text }]}
          style={[styles.accordion, { backgroundColor: colors.card }]}
          left={(props) => (
            <Entypo
              {...props}
              name="dot-single"
              size={24}
              color={colors.text}
            />
          )}
          theme={{
            colors: {
              primary: colors.primary,
              background: colors.card,
              onSurface: colors.text,
            },
          }}
        >
          {patios.map((patio) => (
            <List.Item
              key={patio.id}
              title={patio.nome}
              onPress={() => handleSelect(patio.id, patio.nome)}
              style={[
                styles.item,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              titleStyle={[styles.itemTitle, { color: colors.text }]}
            />
          ))}
        </List.Accordion>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filialTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 4,
    marginBottom: 10,
  },
  wrapper: {
    position: "absolute",
    top: 80,
    left: 40,
    right: 40,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  dropdownContainer: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
  },
  accordion: {},
  title: { fontSize: 16 },
  item: {
    borderTopWidth: 1,
  },
  itemTitle: { fontSize: 14 },
});
