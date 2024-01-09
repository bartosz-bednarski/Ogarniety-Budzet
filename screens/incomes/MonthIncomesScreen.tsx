import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import pieChartColors from "../../utils/styles/pieChartColors";
import { useState } from "react";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CategoryItemBox from "../../components/CategoryItemBox";
import CustomButton from "../../utils/ui/CustomButton";
import {
  CategoriesIncomesWithNames,
  CategoriesItemBoxData,
} from "../../types/incomes";
import { updateIncome } from "../../redux/incomes-slice";
import SumBox from "../../components/SumBox";
import { Navigation } from "../../types/global";
import GoldenFrame from "../../utils/ui/GoldenFrame";
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

  const sumOfMonthIncomes = categoriesIncomes
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const categoriesItemBoxData: CategoriesItemBoxData = categoriesIncomes.map(
    (category) => ({
      catId: category.catId,
      value: category.value,
      ...categories.find((item) => item.catId === category.catId),
    })
  );
  const categoriesIncomesWithNames: CategoriesIncomesWithNames =
    categoriesIncomes.map((category, index) => ({
      ...category,
      color: pieChartColors[index],
      ...categories.find((item) => item.catId === category.catId),
    }));
  const incomesPieChartData = categoriesIncomesWithNames.map(
    (item) => item.value
  );
  const incomesPieChartColors = categoriesIncomesWithNames.map(
    (item) => item.color
  );
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
      {categories.length === 0 && (
        <View style={styles.informationBox}>
          <CustomButton
            title="Dodaj kategorie przychodów"
            onPress={() =>
              navigation.navigate("settingsNavigator", {
                screen: "addNewIncomesCategory",
              })
            }
          />
        </View>
      )}

      {categories.length > 0 && (
        <>
          <GoldenFrame name="SUMA" value={sumOfMonthIncomes} />
          <Text style={styles.label}>Kategorie przychodów</Text>
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
          <View style={styles.flatlistBox}>
            <FlatList
              data={categoriesItemBoxData}
              scrollEnabled={true}
              renderItem={(item) => {
                return (
                  <CategoryItemBox
                    category={item.item}
                    onPressHandler={() => onPressHandler(item.item.catId)}
                  />
                );
              }}
              horizontal={true}
              contentContainerStyle={{
                alignItems: "center",
                maxHeight: 160,
              }}
            />
          </View>
        </>
      )}

      {sumOfMonthIncomes > 0 && (
        <>
          <Text style={styles.label}>Zestawienie przychodów</Text>
          <View style={styles.pieChartBox}>
            <PieChart
              widthAndHeight={200}
              series={incomesPieChartData}
              sliceColor={incomesPieChartColors}
              coverRadius={0.45}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.legend}>
              {categoriesIncomesWithNames.map((item) => (
                <View style={styles.legendItem} key={item.catId}>
                  <Ionicons
                    name={item.iconName}
                    color={item.color}
                    size={24}
                    key={item.catId}
                  />
                  <Text style={{ color: item.color }}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
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
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  flatlistBox: {
    height: 160,
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
  pieChartBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 300,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    width: "30%",
    gap: 5,
  },
});
export default MonthIncomesScreen;
