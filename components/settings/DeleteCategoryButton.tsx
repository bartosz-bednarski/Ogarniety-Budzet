import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import { OnPressHandler } from "../../types/settings";
const DeleteCategoryButton: React.FC<{ onPress: OnPressHandler }> = ({
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name="trash" size={30} color="red" />
      <Text style={styles.text}>Usuń kategorię</Text>
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
    color: "red",
  },
});
export default DeleteCategoryButton;
