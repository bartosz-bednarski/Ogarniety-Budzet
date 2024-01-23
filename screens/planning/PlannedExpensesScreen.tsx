import {
  FlatList,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import CategoryItemBox from "../../components/CategoryItemBox";
import { addPlannedExpense } from "../../redux/expenses-slice";
import COLORS_STYLE from "../../utils/styles/colors";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import CircleNumberColorButton from "../../utils/ui/CircleNumberColorButton";
import CircleStringColorButton from "../../utils/ui/CircleStringColorButton";
import StripsColumn from "../../components/expenses/StripsColumn";
const PlannedExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const [selectedCatId, setSelectedCatId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const plannedExpenses = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );
  console.log("plannedExpenses", plannedExpenses);
  const onPressHandler = (catId: string) => {
    setSelectedCatId(catId);
    setModalVisible(true);
  };
  const submitHandler = () => {
    if (value !== "" && value !== "0") {
      dispatch(addPlannedExpense({ catId: selectedCatId, value: value }));
      setValue("");
    }
    setModalVisible(!modalVisible);
  };
  const sumOfPlannedExpenses = plannedExpenses
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const stripsColumnData = plannedExpenses.map((item) => ({
    catId: item.catId,
    iconName: item.iconName,
    name: item.name,
    value: sumOfPlannedExpenses,
    sum: Number(item.value),
  }));
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {plannedExpenses.length === 0 && (
          <View style={styles.informationBox}>
            <CustomButton
              title="Dodaj kategorie wydatków"
              onPress={() =>
                navigation.navigate("settingsNavigator", {
                  screen: "editCategories",
                })
              }
            />
          </View>
        )}
        {plannedExpenses.length > 0 && (
          <>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Wydatek nie został dodany!");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalLayout}>
                <View style={styles.modalView}>
                  <Text style={styles.modalLabel}>Podaj kwotę</Text>
                  <TextInput
                    style={styles.textInput}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    keyboardType="numeric"
                  />
                  <CustomButton title="Zatwierdź" onPress={submitHandler} />
                </View>
              </View>
            </Modal>
            <GoldenFrame name="SUMA" value={sumOfPlannedExpenses} />
            <Text style={styles.label}>Edytuj zaplanowane wydatki</Text>
            <View style={styles.flatlistBox}>
              {plannedExpenses.map((item, index) => (
                <CircleNumberColorButton
                  key={item.catId}
                  iconName={item.iconName}
                  catId={item.catId}
                  value={item.value}
                  color={index}
                  onPressHandler={() => onPressHandler(item.catId)}
                />
              ))}

              <CircleStringColorButton
                iconName="add"
                catId="addNewExpenseCategoy"
                name="Dodaj nową kategorię"
                color={20}
                onPressHandler={() =>
                  navigation.navigate("settingsNavigator", {
                    screen: "addNewCategory",
                  })
                }
              />
            </View>
            <Text style={styles.label}>Udziały zaplanowanych wydatków</Text>
            <StripsColumn data={stripsColumnData} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  informationBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  scrollView: {
    flex: 1,
  },
  categoriesBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
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
  modalLabel: {
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: "black",
    marginBottom: 20,
  },
  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 10,
    marginVertical: 10,
  },
  flatlistBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
export default PlannedExpensesScreen;
