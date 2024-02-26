import { Pressable, StyleSheet, Text, View, Alert, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoryItemRowProps } from "../../types/settings";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../types/global";
import pieChartColors from "../../utils/styles/pieChartColors";
import COLORS_STYLE from "../../utils/styles/colors";
import CustomButton from "../../utils/ui/CustomButton";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { deleteExpensesCategory } from "../../redux/expensesCategories-slice";
import { deleteAllExpensesFromCategory } from "../../redux/expenses-slice";
import { OnPressHandler } from "../../types/settings";
import { deleteIncomesCategory } from "../../redux/incomesCategories-slice";
import { deleteIncome } from "../../redux/incomes-slice";
const CategoryItemRow: React.FC<CategoryItemRowProps> = ({
  catId,
  iconName,
  name,
  type,
  color,
  index,
  onPress,
}) => {
  const dispatch = useAppDispatch();
  const navigation: Navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const onCategoryDeleteHandler: OnPressHandler = () => {
    if (type === "incomes") {
      dispatch(deleteIncomesCategory({ catId: catId }));
      dispatch(deleteIncome({ catId: catId }));
      navigation.navigate("incomesCategoriesList");
    } else if (type === "expenses") {
      dispatch(deleteExpensesCategory({ catId: catId }));
      dispatch(deleteAllExpensesFromCategory({ catId: catId }));
      navigation.navigate("editCategories");
    }
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Zmiany nie zostały zapisane!");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalLayout}>
          <View style={styles.modalView}>
            <Text style={styles.modalLabel}>
              Usuwając tą kategorię usuwasz wszystkie dane z nią powiązane!
            </Text>
            <View style={styles.modalButtonsBox}>
              <CustomButton
                title="Potwierdzam"
                onPress={onCategoryDeleteHandler}
              />
              <CustomButton
                title="Rezygnuję"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.catButton} onPress={onPress}>
        <Ionicons name={iconName} size={29} color={pieChartColors[color]} />
        <Text style={styles.catName}>{name}</Text>
      </Pressable>
      <Pressable onPress={() => index !== 0 && setModalVisible(true)}>
        <Ionicons
          name="trash-outline"
          size={29}
          color={index !== 0 ? COLORS_STYLE.red : COLORS_STYLE.labelGrey}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 10,
    width: "100%",
  },
  catButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: "90%",
    gap: 10,
  },
  catName: {
    color: "white",
  },
  basketButton: { width: "10%" },
  modalLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000006b",
  },
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: "#dddbdb",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonsBox: {
    width: "100%",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 20,
  },
});
export default CategoryItemRow;
