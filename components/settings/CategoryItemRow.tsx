import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoryItemRowProps } from "../../types/settings";
import { useNavigation } from "@react-navigation/native";
import { Navigate, Navigation } from "../../types/global";
const CategoryItemRow: React.FC<CategoryItemRowProps> = ({
  catId,
  iconName,
  name,
  onPress,
}) => {
  const navigation: Navigation = useNavigation();
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name={iconName} size={29} color="white" />
      <Text style={styles.catName}>{name}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 10,
  },
  catName: {
    color: "white",
  },
});
export default CategoryItemRow;
