import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const AddCategoryButton = () => {
  return (
    <Pressable style={styles.container}>
      <Ionicons name="add-circle-outline" size={40} color="blue" />
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
  },
});
export default AddCategoryButton;
