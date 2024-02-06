import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoryItem, PlannedExpenseCategoryItem } from "../types/settings";
import { View } from "react-native";
import COLORS_STYLE from "../utils/styles/colors";
import { CategoryItemBoxProps } from "../types/utils";
import { useAppSelector } from "../redux/hooks";
const CategoryItemBox: React.FC<CategoryItemBoxProps> = ({
  category,
  onPressHandler,
}) => {
  const currency = useAppSelector(
    (state) => state.currency.currentCurrency.currencyCode
  );
  return (
    <View style={styles.container}>
      <Pressable style={styles.box} onPress={onPressHandler}>
        <Ionicons name={category.iconName} size={30} color="white" />
        <Text style={styles.text}>{category.name}</Text>
      </Pressable>
      <Text style={styles.value}>
        {category.value} {currency}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 90,
  },
  box: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS_STYLE.backgroundBlack,
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 2,
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
    color: "white",
  },
  value: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    width: 90,
    height: 40,
  },
});
export default CategoryItemBox;
