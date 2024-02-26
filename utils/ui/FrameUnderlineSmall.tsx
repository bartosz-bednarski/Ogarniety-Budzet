import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../styles/colors";
import { numberWithSpaces } from "../numberWithSpaces";
import { useAppSelector } from "../../redux/hooks";

const FrameUnderlineSmall: React.FC<{
  mainColor: string;
  textUp: string;
  textDown: number;
}> = ({ mainColor, textUp, textDown }) => {
  const activeBankAccount = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  return (
    <View style={[styles.frame, { borderColor: mainColor }]}>
      <Text style={[styles.frameText, { color: "white" }]}>{textUp}</Text>
      <Text style={[styles.frameText, { color: mainColor }]}>
        {numberWithSpaces(Math.abs(Number(textDown.toFixed(2))))}{" "}
        {activeBankAccount.currency}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  frame: {
    borderColor: COLORS_STYLE.basicGold,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
  },
  frameText: {
    fontSize: 16,
    color: "white",
    textAlign: "left",
    fontWeight: "600",
  },
});
export default FrameUnderlineSmall;
