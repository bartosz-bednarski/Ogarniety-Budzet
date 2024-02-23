import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../styles/colors";
import { numberWithSpaces } from "../numberWithSpaces";
import { useAppSelector } from "../../redux/hooks";

const RedFrame: React.FC<{ value: number; name: string }> = ({
  value,
  name,
}) => {
  const activeBankAccount = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const valueWithSpaces = numberWithSpaces(value);
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.textRed}>{name}</Text>
        <Text style={styles.textRed}>
          {valueWithSpaces} {activeBankAccount.currency}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 5,
  },
  box: {
    borderColor: COLORS_STYLE.red,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },

  textRed: {
    fontSize: 16,
    color: COLORS_STYLE.red,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default RedFrame;
