import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoryItemRowProps } from "../../types/settings";
import { useNavigation } from "@react-navigation/native";
import { Navigate, Navigation } from "../../types/global";
const CategoryItemRow: React.FC<CategoryItemRowProps> = ({
  catId,
  iconName,
  name,
}) => {
  const navigation: Navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("editCategory", {
          name: name,
          catId: catId,
          iconName: iconName,
        })
      }
    >
      <Ionicons name={iconName} size={29} color="blue" />
      <Text>{name}</Text>
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
});
export default CategoryItemRow;
