import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import { View } from "react-native";
const AddCategoryButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.box}>
        <Ionicons
          name="add-circle-outline"
          size={30}
          color={COLORS_STYLE.basicGold}
        />
        <Text style={styles.text}>Dodaj nowy wydatek</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: COLORS_STYLE.backgroundBlack,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  box: {
    width: 150,
    height: 60,
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
