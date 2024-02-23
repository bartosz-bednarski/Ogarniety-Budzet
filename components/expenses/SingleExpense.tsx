import { View, StyleSheet, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import { SingleExpenseProps } from "../../types/expenses";
import pieChartColors from "../../utils/styles/pieChartColors";
import { numberWithSpaces } from "../../utils/numberWithSpaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { deleteSingleExpense } from "../../redux/expenses-slice";

const SingleExpense: React.FC<SingleExpenseProps> = ({
  iconName,
  price,
  date,
  color,
  name,
  id,
  catId,
}) => {
  const dispatch = useAppDispatch();
  const activeBankAccount = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const [deleteModeVisible, setDeleteModeVisible] = useState(false);
  const onDeleteHandler = () => {
    dispatch(
      deleteSingleExpense({
        id: id,
        catId: catId,
        value: price,
        bankAccountId: activeBankAccount.accountId,
      })
    );
    setDeleteModeVisible(false);
  };
  return (
    <Pressable
      style={styles.container}
      onLongPress={() => setDeleteModeVisible(true)}
    >
      {deleteModeVisible && (
        <View style={styles.deleteContainer}>
          <Pressable
            style={styles.deleteBoxLeft}
            onPress={() => setDeleteModeVisible(false)}
          >
            <Text style={styles.deleteTextWhite}>Anuluj</Text>
          </Pressable>
          <Pressable style={styles.deleteBoxRight} onPress={onDeleteHandler}>
            <Text style={styles.deleteTextWhite}>Usuń</Text>
          </Pressable>
        </View>
      )}
      {!deleteModeVisible && (
        <>
          <View
            style={[styles.boxLeft, { borderColor: pieChartColors[color] }]}
          >
            <Ionicons name={iconName} size={20} color={pieChartColors[color]} />
          </View>
          <View style={styles.boxRight}>
            <Text style={[styles.greyText, { width: 100 }]}>{name}</Text>
            <Text style={styles.goldText}>
              {numberWithSpaces(price)} {activeBankAccount.currency}
            </Text>
            <Text style={styles.greyText}>{date}</Text>
          </View>
        </>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    gap: 3,
  },
  boxLeft: {
    width: "13%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderWidth: 2,

    justifyContent: "center",
    alignItems: "center",
  },
  boxRight: {
    paddingHorizontal: 10,
    width: "86%",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    borderColor: COLORS_STYLE.basicGold,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greyText: {
    color: COLORS_STYLE.labelGrey,
    width: 80,
    textAlign: "left",
  },
  goldText: {
    color: COLORS_STYLE.basicGold,
    width: 80,
  },
  deleteContainer: {
    flex: 1,
    backgroundColor: COLORS_STYLE.basicGold,
    borderRadius: 15,
    flexDirection: "row",
  },
  deleteBoxLeft: {
    height: 40,
    width: "50%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBoxRight: {
    height: 40,
    width: "50%",
    backgroundColor: COLORS_STYLE.red,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteTextWhite: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
export default SingleExpense;
