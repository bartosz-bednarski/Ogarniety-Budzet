import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { Navigate, Navigation, Route } from "../../types/global";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORY_ICONS } from "../../utils/categoryIcons";
import { Button } from "react-native";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { editCategory } from "../../redux/categories-slice";
const EditCategoryScreen: React.FC<{
  route: any;
  navigation: any;
}> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const categoryName = route.params.name;
  const catId = route.params.catId;
  const iconName = route.params.iconName;
  const icons = CATEGORY_ICONS;
  const [inputText, setInputText] = useState(categoryName);
  const [categoryIcon, setCategoryIcon] = useState(iconName);
  const renderCategoryIconHandler = (item: any) => {
    return (
      <Pressable onPress={() => setCategoryIcon(item.item.iconName)}>
        <Ionicons
          name={item.item.iconName}
          size={50}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>
    );
  };
  const onPressHandler = () => {
    if (inputText.length < 20) {
      dispatch(
        editCategory({ catId: catId, name: inputText, iconName: categoryIcon })
      );
      navigation.navigate("editCategories");
    }
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
          onChangeText={(text) => setInputText(text)}
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
export default EditCategoryScreen;
