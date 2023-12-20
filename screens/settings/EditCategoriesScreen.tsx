import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import CategoryItemRow from "../../components/settings/CategoryItemRow";
import { CategoryItem } from "../../types/settings";
import AddCategoryButton from "../../components/settings/AddCategoryButton";
import { Navigation } from "../../types/global";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
const EditCategoriesScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const categories = useAppSelector((state) => state.categories.categoriesList);
  const navigateToaddNewCategoryHandler = () => {
    navigation.navigate("addNewCategory");
  };
  const renderCategoryHandler = ({ item }: { item: CategoryItem }) => {
    return (
      <CategoryItemRow
        catId={item.catId}
        iconName={item.iconName}
        name={item.name}
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
        <AddCategoryButton onPress={navigateToaddNewCategoryHandler} />
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
