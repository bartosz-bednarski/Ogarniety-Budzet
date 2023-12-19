import { View, Text, StyleSheet, FlatList } from "react-native";
import { Navigation, Route } from "../../types/global";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORY_ICONS } from "../../utils/categoryIcons";
const EditCategoryScreen: React.FC<{
  route: Route;
  navigation: Navigation;
}> = ({ route, navigation }) => {
  const categoryName = route.params.name;
  const catId = route.params.catId;
  const iconName = route.params.iconName;
  const icons = CATEGORY_ICONS;
  const renderCategoryIconHandler = (item: any) => {
    return (
      <Ionicons
        name={item.item.iconName}
        size={50}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.presentDataBox}>
        <Ionicons name={iconName} size={80} color="blue" />
        <Text style={styles.categoryName}>{categoryName}</Text>
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
      <View style={styles.formBox}></View>
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
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  categoryName: {
    fontSize: 16,
  },
  categoriesBox: {
    flex: 2,
    gap: 10,
    justifyContent: "flex-end",
  },
  formBox: {
    flex: 5,
  },
  label: {
    fontSize: 12,
    marginLeft: 5,
  },
});
export default EditCategoryScreen;
