import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import CategoryItemRow from "../../components/settings/CategoryItemRow";
import { CategoryItem } from "../../types/settings";
import AddCategoryButton from "../../components/settings/AddCategoryButton";
import { Navigation } from "../../types/global";
const EditCategoriesScreen: React.FC<Navigation> = ({ navigation }) => {
  const categories = useAppSelector((state) => state.categories.categoriesList);
  // const navigateToEditCategoryHandler = (item: CategoryItem) => {
  //   navigation.navigate("editCategory", {
  //     params: { catId: item.catId },
  //   });
  // };
  const renderCategoryHandler = ({ item }: { item: CategoryItem }) => {
    return (
      <CategoryItemRow
        catId={item.catId}
        iconName={item.iconName}
        name={item.name}
        // onPress={(item: CategoryItem) => navigateToEditCategoryHandler(item)}
      />
    );
  };
  return (
    <View style={styles.editCategoriesContainer}>
      <View style={styles.categoriesScrollList}>
        <FlatList
          data={categories}
          renderItem={renderCategoryHandler}
          keyExtractor={(item) => item.catId.toString()}
        />
      </View>
      <View style={styles.addCategoryBox}>
        <AddCategoryButton />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  editCategoriesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  categoriesScrollList: {
    flex: 9,
  },
  addCategoryBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EditCategoriesScreen;
