import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecipes } from "../context/RecipeContext";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function SavedRecipesScreen() {
  const { savedRecipes, removeRecipe } = useRecipes();
  const navigation = useNavigation();
  const theme = useTheme();

  const renderRecipeItem = ({ item }) => (
    <View style={[styles.recipeItem, { backgroundColor: theme.colors.white }]}>
      <TouchableOpacity
        style={styles.recipeContent}
        onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
      >
        <Text style={[styles.recipeTitle, { color: theme.colors.text }]}>
          {item.title}
        </Text>
        <Text
          style={[styles.recipeIngredients, { color: theme.colors.textLight }]}
        >
          {item.ingredients.join(", ")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.removeButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => removeRecipe(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.header, { color: theme.colors.primary }]}>
        Saved Recipes
      </Text>
      {savedRecipes.length > 0 ? (
        <FlatList
          data={savedRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          style={styles.recipeList}
          contentContainerStyle={styles.recipeListContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="bookmark-outline"
            size={64}
            color={theme.colors.textLight}
          />
          <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>
            No saved recipes yet.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  recipeList: {
    flex: 1,
  },
  recipeListContent: {
    paddingBottom: 20,
  },
  recipeItem: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  recipeContent: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeIngredients: {
    fontSize: 14,
  },
  removeButton: {
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    marginTop: 10,
  },
});
