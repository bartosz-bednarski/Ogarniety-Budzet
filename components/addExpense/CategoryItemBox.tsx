import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoryItem } from "../../types/settings";
import COLORS_STYLE from "../../utils/styles/colors";
const CategoryItemBox: React.FC<{
  category: CategoryItem;
  onPressHandler: () => void;
}> = ({ category, onPressHandler }) => {
  return (
    <Pressable style={styles.box} onPress={onPressHandler}>
      <Ionicons
        name={category.iconName}
        size={30}
        color={COLORS_STYLE.basicGold}
      />
      <Text style={styles.text}>{category.name}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  box: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: COLORS_STYLE.tabGrey,
    borderRadius: 50,
    height: 90,
    width: 90,
    marginVertical: 5,
    elevation: 10,
    shadowColor: "black",
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    width: 70,
    color: COLORS_STYLE.basicGold,
  },
});
export default CategoryItemBox;
