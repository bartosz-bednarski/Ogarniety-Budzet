import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoryItem } from "../../types/settings";
const CategoryItemBox: React.FC<{
  category: CategoryItem;
  onPressHandler: () => void;
}> = ({ category, onPressHandler }) => {
  return (
    <Pressable style={styles.box} onPress={onPressHandler}>
      <Ionicons name={category.iconName} size={30} color="blue" />
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
    backgroundColor: "gold",
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
  },
});
export default CategoryItemBox;
