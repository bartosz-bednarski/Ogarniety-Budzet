import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import pieChartColors from "../../utils/styles/pieChartColors";
import { useEffect, useState } from "react";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CategoryItemBox from "../../components/CategoryItemBox";
import CustomButton from "../../utils/ui/CustomButton";
import {
  CategoriesIncomesWithNames,
  CategoriesItemBoxData,
} from "../../types/incomes";
import { updateIncome } from "../../redux/incomes-slice";
import { Navigation } from "../../types/global";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import PieChartWithFrames from "../../components/incomes/PieChartWithFrames";
import StripsColumn from "../../components/expenses/StripsColumn";
import CircleNumberColorButton from "../../utils/ui/CircleNumberColorButton";
import CircleStringColorButton from "../../utils/ui/CircleStringColorButton";
const MonthIncomesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.incomesCategories.categoriesList
  );
  const categoriesIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
  );
  const sumOfMonthIncomes = categoriesIncomes
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const circleColorButtonData: CategoriesItemBoxData = categoriesIncomes.map(
    (category, index) => ({
      catId: category.catId,
      value: category.value,
      color: index,
      ...categories.find((item) => item.catId === category.catId),
    })
  );
  const categoriesIncomesWithNames: CategoriesIncomesWithNames =
    categoriesIncomes.map((category, index) => ({
      ...category,
      color: pieChartColors[index],
      ...categories.find((item) => item.catId === category.catId),
    }));
  const stripsColumnData = categoriesIncomesWithNames.map((item) => ({
    catId: item.catId,
    iconName: item.iconName,
    name: item.name,
    value: item.value,
    sum: item.value,
  }));
  const [selectedCatId, setSelectedCatId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const onPressHandler = (catId: string) => {
    setSelectedCatId(catId);
    setModalVisible(true);
  };
  const submitHandler = () => {
    if (value !== "" && value !== "0") {
      dispatch(updateIncome({ catId: selectedCatId, value: value }));
      setValue("");
    }
    setModalVisible(!modalVisible);
  };
  // console.log(categories);
  // console.log(categoriesIncomesWithNames);
  return (
    <ScrollView style={styles.container}>
      {bankAccountStatus === 0 && (
        <View style={styles.buttonBox}>
          <CustomButton
            title="Uzupełnij stan konta"
            onPress={() => navigation.navigate("Oszczędności")}
          />
        </View>
      )}

      {sumOfMonthIncomes > 0 && (
        <>
          <Text style={styles.label}>Zestawienie przychodów</Text>
          <PieChartWithFrames
            categoriesIncomesWithNames={categoriesIncomesWithNames}
            sumOfAllIncomes={sumOfMonthIncomes}
          />
          <StripsColumn data={stripsColumnData} />
        </>
      )}
      {categories.length > 0 && bankAccountStatus > 0 && (
        <>
          <Text style={styles.label}>Kategorie przychodów</Text>

          <View style={styles.flatlistBox}>
            {circleColorButtonData.map((item, index) => (
              <CircleNumberColorButton
                key={item.catId}
                iconName={item.iconName}
                value={item.value}
                color={index}
                catId={item.catId}
                onPressHandler={() => onPressHandler(item.catId)}
              />
            ))}
            <CircleStringColorButton
              iconName="add"
              name="Dodaj nową Kategorie"
              color={20}
              catId="addNewIncomesCategory"
              onPressHandler={() =>
                navigation.navigate("settingsNavigator", {
                  screen: "addNewIncomesCategory",
                })
              }
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Zmiany nie zostały wprowadzone!");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalLayout}>
              <View style={styles.modalView}>
                <Text style={styles.modalLabel}>
                  Edytujesz miesięczny przychód
                </Text>
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
                  <Pressable style={styles.modalButton} onPress={submitHandler}>
                    <Text style={styles.modalButtonText}>Zapisz</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  informationBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },
  informationText: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  flatlistBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sumOfIncomes: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    marginVertical: 10,
  },
  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 10,
    marginVertical: 10,
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
    textAlign: "center",
    width: "100%",
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
export default MonthIncomesScreen;
