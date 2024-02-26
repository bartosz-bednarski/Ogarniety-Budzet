import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORY_ICONS } from "../../../utils/categoryIcons";
import COLORS_STYLE from "../../../utils/styles/colors";
import CustomButton from "../../../utils/ui/CustomButton";
import { AddTargetFormProps } from "../../../types/piggyBank";

const AddTargetForm: React.FC<AddTargetFormProps> = ({
  onSetTargetIcon,
  onSetTargetName,
  onSetTargetValue,
  targetIcon,
  targetName,
  targetValue,
  onPressHandler,
}) => {
  const icons = CATEGORY_ICONS;

  const renderCategoryIconHandler = (item: any) => {
    return (
      <Pressable onPress={() => onSetTargetIcon(item.item.iconName)}>
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
      <View style={styles.presentDataBox}>
        <Ionicons name={targetIcon} size={80} color={COLORS_STYLE.basicGold} />
        <Text style={styles.categoryName}>{targetName}</Text>
      </View>
      <View style={styles.categoriesBox}>
        <Text style={styles.label}>Wybierz ikone dla celu finansowego</Text>
        <FlatList
          data={icons}
          renderItem={renderCategoryIconHandler}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
      <View style={styles.formBox}>
        <Text style={styles.label}>Wpisz nazwę celu finansowego</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onSetTargetName(text)}
          value={targetName}
          maxLength={20}
        />
        <Text style={styles.label}>Wpisz kwotę celu finansowego</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          onChangeText={(value) => onSetTargetValue(value)}
          value={targetValue}
          maxLength={10}
        />
        <View style={styles.buttonsBox}>
          <CustomButton title="Zatwierdź" onPress={onPressHandler} />
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
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    fontSize: 16,
    color: "white",
  },
  categoriesBox: {
    flex: 2,
    justifyContent: "flex-end",
  },
  formBox: {
    flex: 6,
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
export default AddTargetForm;
