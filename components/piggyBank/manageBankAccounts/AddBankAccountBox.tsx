import { Text, StyleSheet, Pressable } from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import { Ionicons } from "@expo/vector-icons";

const AddBankAccountBox: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <Pressable style={styles.box} onPress={onPress}>
      <Text style={styles.goldText}>Dodaj nowy rachunek</Text>
      <Ionicons name="add-circle" size={30} color={COLORS_STYLE.basicGold} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  box: {
    backgroundColor: "#034712",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    gap: 10,
  },

  goldText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
    width: "100%",
    fontWeight: "700",
    textAlign: "center",
  },
});
export default AddBankAccountBox;
