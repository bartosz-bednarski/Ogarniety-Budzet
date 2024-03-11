import { Pressable, StyleSheet, Text } from "react-native";
import COLORS_STYLE from "../styles/colors";
import { Button } from "../../types/utils";

const CustomButton: React.FC<Button> = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.box}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS_STYLE.yellow,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: 200,
    borderRadius: 15,
    elevation: 10,
    shadowColor: COLORS_STYLE.yellow,
  },
  text: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
export default CustomButton;
