import { View, StyleSheet, FlatList } from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import CategoryItemRow from "../../../components/settings/CategoryItemRow";
import AddCategoryButton from "../../../components/settings/AddCategoryButton";
const ExpensesCategoriesListScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const categories = useAppSelector(
    (state) => state.expensesCategories.categoriesList
  );

  const navigateToaddNewCategoryHandler = () => {
    navigation.navigate("addNewCategory");
  };

  return (
    <View style={styles.editCategoriesContainer}>
      <View
        style={styles.categoriesScrollList}
        accessibilityLabel="lista kategorii"
      >
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <CategoryItemRow
              catId={item.catId}
              iconName={item.iconName}
              index={index}
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
