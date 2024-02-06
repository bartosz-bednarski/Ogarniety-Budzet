import { View, Text, StyleSheet, Pressable } from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MonthSavings } from "../../../types/piggyBank";
import { MONTHS } from "../../../utils/months";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import { useAppSelector } from "../../../redux/hooks";
const MonthsSavingsBox: React.FC<{
  yearSavings: MonthSavings[];
  onPress: () => void;
}> = ({ yearSavings, onPress }) => {
  const currency = useAppSelector(
    (state) => state.currency.currentCurrency.currencyCode
  );
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.leftBox}>
        {yearSavings.map((item) => (
          <View style={styles.item} key={item.month}>
            <Ionicons
              name="calendar"
              size={64}
              color={COLORS_STYLE.basicGold}
            />
            <Text style={styles.monthName}>{MONTHS[Number(item.month)]}</Text>
            <Text style={styles.monthSavings}>
              {numberWithSpaces(item.savings)} {currency}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.rightBox}>
        <Ionicons name="caret-forward" color={COLORS_STYLE.tabGrey} size={24} />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    flexDirection: "row",

    borderRadius: 15,
  },
  rightBox: {
    paddingVertical: 15,
    width: "5%",
    backgroundColor: COLORS_STYLE.basicGold,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  leftBox: {
    paddingVertical: 15,
    flexDirection: "row",
    width: "95%",
    paddingLeft: 15,
  },
  item: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  monthName: {
    fontSize: 13,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    width: 58,
  },
  monthSavings: {
    color: COLORS_STYLE.basicGold,
    width: 100,
    textAlign: "center",
  },
});
export default MonthsSavingsBox;
