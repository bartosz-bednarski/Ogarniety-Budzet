import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import CategoryItemRow from "../../../components/settings/CategoryItemRow";
import { CategoryItem } from "../../../types/settings";
import AddCategoryButton from "../../../components/settings/AddCategoryButton";
const ExpensesCategoriesListScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const categories = useAppSelector(
    (state) => state.expensesCategories.categoriesList
  );
  console.log(categories.length);
  const navigateToaddNewCategoryHandler = () => {
    navigation.navigate("addNewCategory");
  };

  return (
    <View style={styles.editCategoriesContainer}>
      <View style={styles.categoriesScrollList}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <CategoryItemRow
              catId={item.catId}
              iconName={item.iconName}
              name={item.name}
              type="expenses"
              color={index}
              onPress={() =>
                navigation.navigate("editCategory", {
                  name: item.name,
                  catId: item.catId,
                  iconName: item.iconName,
                })
              }
            />
          )}
          keyExtractor={(item) => item.catId.toString()}
        />
      </View>
      {categories.length < 20 && (
        <View style={styles.addCategoryBox}>
          <AddCategoryButton onPress={navigateToaddNewCategoryHandler} />
        </View>
      )}
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
    flexDirection: "row",
    gap: 15,
  },
});
export default ExpensesCategoriesListScreen;
