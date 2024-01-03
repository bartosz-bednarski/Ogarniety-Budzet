import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Button,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { CATEGORY_ICONS } from "../../utils/categoryIcons";
import { AddEditCategoryProps } from "../../types/settings";
import COLORS_STYLE from "../../utils/styles/colors";
import DeleteCategoryButton from "./DeleteCategoryButton";
import CustomButton from "../../utils/ui/CustomButton";
const AddEditCategory: React.FC<AddEditCategoryProps> = ({
  onSetCategoryIcon,
  onSetInputText,
  onCategoryEdit,
  onCategoryDelete,
  categoryIcon,
  inputText,
  newCategory,
}) => {
  const icons = CATEGORY_ICONS;
  const [modalVisible, setModalVisible] = useState(false);
  const renderCategoryIconHandler = (item: any) => {
    return (
      <Pressable onPress={() => onSetCategoryIcon(item.item.iconName)}>
        <Ionicons
          name={item.item.iconName}
          size={50}
          color="white"
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>
    );
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
              <CustomButton title="Potwierdzam" onPress={onCategoryDelete!} />
              <CustomButton
                title="Rezygnuję"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.presentDataBox}>
        <Ionicons
          name={categoryIcon}
          size={80}
          color={COLORS_STYLE.basicGold}
        />
        <Text style={styles.categoryName}>{inputText}</Text>
      </View>
      <View style={styles.categoriesBox}>
        <Text style={styles.label}>Wybierz ikone dla kategorii</Text>
        <FlatList
          data={icons}
          renderItem={renderCategoryIconHandler}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
      <View style={styles.formBox}>
        <Text style={styles.label}>Wpisz nazwę kategorii</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onSetInputText(text)}
          value={inputText}
          maxLength={20}
        />
        <View style={styles.buttonsBox}>
          <CustomButton title="Zatwierdź" onPress={onCategoryEdit} />
          {!newCategory && (
            <DeleteCategoryButton onPress={() => setModalVisible(true)} />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "column",
  },
  presentDataBox: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    fontSize: 16,
    color: "white",
  },
  categoriesBox: {
    flex: 3,
    justifyContent: "flex-end",
  },
  formBox: {
    flex: 4,
  },
  buttonsBox: {
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginLeft: 5,
    marginVertical: 10,
    color: COLORS_STYLE.labelGrey,
  },
  textInput: {
    backgroundColor: "grey",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: "white",
    marginBottom: 20,
    borderRadius: 10,
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
export default AddEditCategory;
