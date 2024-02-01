import {
  FlatList,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
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
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
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
        {bankAccountStatus === 0 && (
          <View style={styles.buttonBox}>
            <CustomButton
              title="Uzupełnij stan konta"
              onPress={() => navigation.navigate("Oszczędności")}
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
                  <Text style={styles.modalLabel}>Planujesz wydatki</Text>
                  <TextInput
                    style={styles.textInput}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    keyboardType="numeric"
                    placeholder="Podaj kwotę"
                    placeholderTextColor={COLORS_STYLE.labelGrey}
                  />
                  <View style={styles.modalButtonsBox}>
                    <Pressable
                      style={styles.modalButton}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.modalButtonText}>Anuluj</Text>
                    </Pressable>
                    <Text style={styles.textGold}>|</Text>
                    <Pressable
                      style={styles.modalButton}
                      onPress={submitHandler}
                    >
                      <Text style={styles.modalButtonText}>Zapisz</Text>
                    </Pressable>
                  </View>
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
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
    width: "90%",
    backgroundColor: COLORS_STYLE.tabGrey,
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
    fontSize: 20,
    marginBottom: 20,
    color: COLORS_STYLE.basicGold,
    fontWeight: "500",
  },
  textInput: {
    borderColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 0,
    color: "white",
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
  modalButtonsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    justifyContent: "center",
    width: "40%",
  },
  modalButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  textGold: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
  },
});
export default PlannedExpensesScreen;
