import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRecipes } from '../context/RecipeContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function RecipeDetailScreen({ route }) {
  const { recipe } = route.params;
  const { savedRecipes, saveRecipe, removeRecipe } = useRecipes();
  const theme = useTheme();

  const isSaved = savedRecipes.some(savedRecipe => savedRecipe.id === recipe.id);

  const handleSaveToggle = () => {
    if (isSaved) {
      removeRecipe(recipe.id);
    } else {
      saveRecipe(recipe);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>{recipe.title}</Text>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Ingredients:</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Ionicons name="ellipse" size={8} color={theme.colors.primary} />
              <Text style={[styles.ingredientText, { color: theme.colors.text }]}>{ingredient}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Instructions:</Text>
          {recipe.instructions.map((step, index) => (
            <View key={index} style={styles.instructionItem}>
              <Text style={[styles.instructionNumber, { color: theme.colors.primary }]}>{index + 1}</Text>
              <Text style={[styles.instructionText, { color: theme.colors.text }]}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: isSaved ? theme.colors.secondary : theme.colors.primary }
        ]}
        onPress={handleSaveToggle}
      >
        <Ionicons 
          name={isSaved ? "bookmark" : "bookmark-outline"} 
          size={24} 
          color={theme.colors.white} 
        />
        <Text style={styles.saveButtonText}>
          {isSaved ? 'Saved' : 'Save Recipe'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 16,
    marginLeft: 10,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  instructionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    width: 25,
  },
  instructionText: {
    fontSize: 16,
    flex: 1,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});

