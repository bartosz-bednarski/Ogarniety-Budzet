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
import StripsColumn from "../../utils/ui/StripsColumn";
import ModalSetPlannedExpense from "../../components/planning/ModalSetPlannedExpense";
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
            <ModalSetPlannedExpense
              modalVisible={modalVisible}
              setModalVisible={(value) => setModalVisible(value)}
              value={value}
              setValue={(value) => setValue(value)}
              submitHandler={submitHandler}
            />
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
