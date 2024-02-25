import { View, Text, StyleSheet, Pressable } from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MonthSavings } from "../../../types/piggyBank";
import { MONTHS } from "../../../utils/months";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import { useAppSelector } from "../../../redux/hooks";
const MonthsSavingsBox: React.FC<{
  realised: boolean;
  onPress: () => void;
}> = ({ realised, onPress }) => {
  const activeBankAccount = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  return (
    <Pressable
      style={styles.goldenContainer}
      onPress={realised ? onPress : null}
    >
      <View style={styles.goldenBox}>
        <View style={styles.goldenBoxTop}>
          <Ionicons name="wallet" size={64} color={COLORS_STYLE.basicGold} />
          <Text style={styles.textWhiteL}>
            {realised
              ? "Oszczędności"
              : "Oszczędności dostępne w następnym miesiącu"}
          </Text>
        </View>
        <View style={styles.goldenBoxBottom}>
          {realised && (
            <>
              <Ionicons
                name={"arrow-forward-circle"}
                size={20}
                color={COLORS_STYLE.basicGold}
              />
              <Text style={styles.textWhiteSm}>Przejdź do podsumowania</Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  goldenContainer: {
    width: "100%",
    alignItems: "center",
  },
  goldenBox: {
    flexDirection: "column",
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
    borderRadius: 15,
    width: "100%",
  },
  goldenBoxTop: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  goldenBoxBottom: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    borderTopColor: COLORS_STYLE.basicGold,
    borderTopWidth: 1,
    alignItems: "center",
  },
  textWhiteL: {
    color: "white",
    fontSize: 20,
    width: "70%",
    fontWeight: "600",
    textAlign: "center",
  },
  textWhiteSm: {
    color: "white",
    fontSize: 14,
  },
});
export default MonthsSavingsBox;
