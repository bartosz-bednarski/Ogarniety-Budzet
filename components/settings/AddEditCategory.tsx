import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORY_ICONS } from "../../utils/categoryIcons";
import { AddEditCategoryProps } from "../../types/settings";
const AddEditCategory: React.FC<AddEditCategoryProps> = ({
  onSetCategoryIcon,
  onSetInputText,
  onPressHandler,
  categoryIcon,
  inputText,
}) => {
  const icons = CATEGORY_ICONS;
  const renderCategoryIconHandler = (item: any) => {
    return (
      <Pressable onPress={() => onSetCategoryIcon(item.item.iconName)}>
        <Ionicons
          name={item.item.iconName}
          size={50}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.presentDataBox}>
        <Ionicons name={categoryIcon} size={80} color="blue" />
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
        <Button title="Zatwierdź" onPress={onPressHandler} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: "column",
  },
  presentDataBox: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    fontSize: 16,
  },
  categoriesBox: {
    flex: 3,
    justifyContent: "flex-end",
  },
  formBox: {
    flex: 4,
  },
  label: {
    fontSize: 12,
    marginLeft: 5,
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: "grey",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: "white",
    marginBottom: 20,
  },
});
export default AddEditCategory;
