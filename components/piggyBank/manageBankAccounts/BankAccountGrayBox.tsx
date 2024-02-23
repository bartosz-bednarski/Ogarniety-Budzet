import { Text, View, StyleSheet, Pressable } from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveBankAccount } from "../../../redux/bankAccounts-slice";

const BankAccountGrayBox: React.FC<{
  accountName: string;
  accountValue: number;
  accountId: string;
  accountCurrency: string;
}> = ({ accountName, accountValue, accountId, accountCurrency }) => {
  const dispatch = useAppDispatch();
  const activeBankAccountStoreId = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountId
  );
  return (
    <Pressable
      style={styles.grayBox}
      onPress={() =>
        dispatch(
          setActiveBankAccount({
            accountName: accountName,
            accountId: accountId,
            currency: accountCurrency,
          })
        )
      }
    >
      <View style={styles.rowBox}>
        <Text style={styles.accountName}>{accountName}</Text>
        <Ionicons name="cog" size={30} color={COLORS_STYLE.basicGold} />
      </View>
      <View style={styles.rowBox}>
        <View
          style={{
            width: "50%",
          }}
        >
          <Text style={styles.textWhite}>Dostępne środki:</Text>
          <Text style={styles.value}>
            {numberWithSpaces(Math.abs(Number(accountValue.toFixed(2))))}{" "}
            {accountCurrency}
          </Text>
        </View>
        {accountId === activeBankAccountStoreId && (
          <View style={styles.greenBox}>
            <Text style={styles.textGreen}>WYBRANY RACHUNEK</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  grayBox: {
    backgroundColor: COLORS_STYLE.tabGrey,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    gap: 10,
  },
  rowBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  accountName: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
    width: "90%",
    fontWeight: "700",
  },
  textWhite: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
  },
  value: {
    color: COLORS_STYLE.basicGold,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
  },
  greenBox: {
    borderColor: COLORS_STYLE.green,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  textGreen: {
    color: COLORS_STYLE.green,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
});
export default BankAccountGrayBox;
