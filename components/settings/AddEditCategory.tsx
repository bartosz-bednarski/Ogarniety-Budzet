import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { CATEGORY_ICONS } from "../../utils/categoryIcons";
import { AddEditCategoryProps } from "../../types/settings";
import COLORS_STYLE from "../../utils/styles/colors";
import CustomButton from "../../utils/ui/CustomButton";
const AddEditCategory: React.FC<AddEditCategoryProps> = ({
  onSetCategoryIcon,
  onSetInputText,
  onCategoryEdit,
  categoryIcon,
  inputText,
}) => {
  const icons = CATEGORY_ICONS;
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.iconBig}>
        <Ionicons
          name={categoryIcon}
          size={80}
          color={COLORS_STYLE.basicGold}
        />
      </View>

      {!dropdownActive && (
        <>
          <View style={styles.iconsContainer}>
            <Text style={styles.label}>Wybierz ikone dla kategorii</Text>

            <View style={styles.iconsBox}>
              {icons.slice(0, 4).map((item) => (
                <Pressable
                  onPress={() => onSetCategoryIcon(item.iconName)}
                  key={item.id}
                >
                  <Ionicons
                    name={item.iconName}
                    size={45}
                    color="white"
                    style={{ marginHorizontal: 10 }}
                  />
                </Pressable>
              ))}
              <Pressable onPress={() => setDropdownActive(true)}>
                <Ionicons
                  name="add"
                  size={45}
                  color="green"
                  style={{ marginHorizontal: 10 }}
                />
              </Pressable>
            </View>
            <Text style={styles.label}>Wpisz nazwę kategorii</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => onSetInputText(text)}
              value={inputText}
              maxLength={20}
            />
            <View style={styles.buttonsBox}>
              <CustomButton title="Zatwierdź" onPress={onCategoryEdit} />
            </View>
          </View>
        </>
      )}
      {dropdownActive && (
        <View style={styles.iconsContainerDropped}>
          <Text style={styles.label}>Wybierz ikone dla kategorii</Text>
          <View style={styles.iconsBoxDropped}>
            <View style={styles.closeBox}>
              <Pressable onPress={() => setDropdownActive(false)}>
                <Ionicons
                  name="close"
                  color={COLORS_STYLE.labelGrey}
                  size={24}
                />
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={{
                justifyContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
              }}
            >
              {icons.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    onSetCategoryIcon(item.iconName);
                    setDropdownActive(false);
                  }}
                >
                  <Ionicons
                    name={item.iconName}
                    size={45}
                    color="white"
                    style={{ marginHorizontal: 10 }}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  iconBig: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    fontSize: 16,
    color: "white",
  },
  iconsContainer: {
    flex: 8,
  },
  closeBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
  iconsBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconsContainerDropped: {
    flex: 6,
  },
  iconsBoxDropped: {
    backgroundColor: COLORS_STYLE.tabGrey,
    padding: 10,
    borderRadius: 15,
    height: 300,
  },
  buttonsBox: {
    gap: 30,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 20,
    color: COLORS_STYLE.labelGrey,
  },
  textInput: {
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: "white",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "white",
  },
});
export default AddEditCategory;
