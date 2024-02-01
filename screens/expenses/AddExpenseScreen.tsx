import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  Button,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { addExpense } from "../../redux/expenses-slice";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
import CircleStringColorButton from "../../utils/ui/CircleStringColorButton";
import COLORS_STYLE from "../../utils/styles/colors";
const AddExpenseScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categoriesList);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const onPressHandler = (catId: string) => {
    setSelectedCatId(catId);
    setModalVisible(true);
  };
  const submitHandler = () => {
    if (value !== "" && value !== "0") {
      dispatch(addExpense({ catId: selectedCatId, value: value }));
      setValue("");
    }
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      {categories.length === 0 && (
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
            <Text style={styles.label}>Dodajesz nowy wydatek</Text>
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
      <View style={styles.flatlistBox}>
        {categories.map((item, index) => (
          <CircleStringColorButton
            key={item.catId}
            iconName={item.iconName}
            catId={item.catId}
            name={item.name}
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
      {/* <FlatList
        scrollEnabled={true}
        data={categories}
        renderItem={(item) => {
          return (
            <CircleColorButton
              iconName={item.item.iconName}
              catId={item.item.catId}
              value={item.item.name}
              color={item.index}
              onPressHandler={() => onPressHandler(item.item.catId)}
            />
            // <CategoryItemBox
            //   category={item.item}
            //   onPressHandler={() => onPressHandler(item.item.catId)}
            // />
          );
        }}
        keyExtractor={(item) => item.catId.toString()}
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        numColumns={3}
      /> */}
    </ScrollView>
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
    marginHorizontal: 10,
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
  label: {
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
export default AddExpenseScreen;
