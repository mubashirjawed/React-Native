// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';
// import { ThemeProvider, useTheme } from './context/ThemeContext';
// import HomeScreen from './screens/HomeScreen';
// import SavedRecipesScreen from './screens/SavedRecipesScreen';
// import RecipeDetailScreen from './screens/RecipeDetailScreen';
// import { RecipeProvider } from './context/RecipeContext';
// import { View, Text } from 'react-native';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// class ErrorBoundary extends React.Component {
//   state = { hasError: false };

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.log('Error:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Something went wrong.</Text>
//         </View>
//       );
//     }

//     return this.props.children;
//   }
// }

// function HomeTabs() {
//   const theme = useTheme();

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Saved Recipes') {
//             iconName = focused ? 'bookmark' : 'bookmark-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: theme.colors.primary,
//         tabBarInactiveTintColor: theme.colors.textLight,
//         tabBarStyle: {
//           backgroundColor: theme.colors.card,
//           borderTopWidth: 0,
//           elevation: 8,
//           shadowOpacity: 0.1,
//           shadowRadius: 4,
//           shadowColor: theme.colors.text,
//           shadowOffset: { width: 0, height: -4 },
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//       <Tab.Screen name="Saved Recipes" component={SavedRecipesScreen} options={{ headerShown: false }} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   console.log('App component is rendering');

//   return (
//     <ErrorBoundary>
//       <ThemeProvider>
//         <RecipeProvider>
//           <NavigationContainer>
//             <Stack.Navigator
//               screenOptions={({ route }) => ({
//                 headerStyle: {
//                   backgroundColor: theme.colors.primary,
//                 },
//                 headerTintColor: theme.colors.card,
//                 headerTitleStyle: {
//                   fontWeight: 'bold',
//                 },
//               })}
//             >
//               <Stack.Screen
//                 name="Main"
//                 component={HomeTabs}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="RecipeDetail"
//                 component={RecipeDetailScreen}
//                 options={({ route }) => ({ title: route.params.recipe.title })}
//               />
//             </Stack.Navigator>
//           </NavigationContainer>
//         </RecipeProvider>
//       </ThemeProvider>
//     </ErrorBoundary>
//   );
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import HomeScreen from "./screens/HomeScreen";
import SavedRecipesScreen from "./screens/SavedRecipesScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import { RecipeProvider } from "./context/RecipeContext";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Something went wrong.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

function HomeTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Saved Recipes") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowColor: theme.colors.text,
          shadowOffset: { width: 0, height: -4 },
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Saved Recipes"
        component={SavedRecipesScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.card,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={({ route }) => ({
          title: route.params?.recipe?.title || "Recipe",
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  if (__DEV__) {
    console.log("App component is rendering");
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RecipeProvider>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </RecipeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
