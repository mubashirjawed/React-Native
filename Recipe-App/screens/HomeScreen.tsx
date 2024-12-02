import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecipes } from '../context/RecipeContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { recipes, searchRecipes, getRandomRecipe } = useRecipes();
  const navigation = useNavigation();
  const theme = useTheme();
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    setRandomRecipe(getRandomRecipe());
  }, []);

  const handleSearch = () => {
    searchRecipes(searchQuery);
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.recipeItem, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <View style={styles.recipeContent}>
        <Text style={[styles.recipeTitle, { color: theme.colors.text }]}>{item.title}</Text>
        <Text style={[styles.recipeIngredients, { color: theme.colors.textLight }]}>
          {item.ingredients.join(', ')}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.primary, fontSize: theme.fontSize.header }]}>Recipe Finder</Text>
      
      {randomRecipe && (
        <TouchableOpacity 
          style={[styles.randomRecipe, { backgroundColor: theme.colors.accent }]}
          onPress={() => navigation.navigate('RecipeDetail', { recipe: randomRecipe })}
        >
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }} 
            style={styles.randomRecipeImage} 
          />
          <View style={styles.randomRecipeContent}>
            <Text style={[styles.randomRecipeTitle, { color: theme.colors.text }]}>Recipe of the Day</Text>
            <Text style={[styles.randomRecipeName, { color: theme.colors.text }]}>{randomRecipe.title}</Text>
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput, 
            { 
              backgroundColor: theme.colors.card, 
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }
          ]}
          placeholder="Search recipes..."
          placeholderTextColor={theme.colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity 
          style={[styles.searchButton, { backgroundColor: theme.colors.primary }]} 
          onPress={handleSearch}
        >
          <Ionicons name="search" size={24} color={theme.colors.card} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id}
        style={styles.recipeList}
        contentContainerStyle={styles.recipeListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  randomRecipe: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  randomRecipeImage: {
    width: 100,
    height: 100,
  },
  randomRecipeContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  randomRecipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  randomRecipeName: {
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 10,
    fontSize: 16,
    borderWidth: 1,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeIngredients: {
    fontSize: 14,
  },
});

