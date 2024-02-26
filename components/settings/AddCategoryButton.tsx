import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";

const AddCategoryButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons
        name="add-circle-outline"
        size={30}
        color={COLORS_STYLE.basicGold}
      />
      <Text style={styles.text}>Dodaj nową kategorie</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 10,
    color: COLORS_STYLE.basicGold,
  },
});
export default AddCategoryButton;
