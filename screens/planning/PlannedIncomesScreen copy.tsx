import {
  FlatList,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import CategoryItemBox from "../../components/CategoryItemBox";
import { addPlannedExpense } from "../../redux/expenses-slice";
import COLORS_STYLE from "../../utils/styles/colors";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
import SumBox from "../../components/SumBox";
const PlannedIncomesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Planowanie przychodów</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  text: {
    color: "white",
  },
});
export default PlannedIncomesScreen;
