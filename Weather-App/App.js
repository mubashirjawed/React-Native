import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import WeatherInfo from './components/WeatherInfo';
import WeatherForecast from './components/WeatherForecast';
import { getTheme } from './utils/themeUtils';

const API_KEY = 'a13e917c9cc541353f47d8e1e1453db5';
const { width } = Dimensions.get('window');

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [animation] = useState(new Animated.Value(0));
  const [theme, setTheme] = useState(getTheme('Default'));

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  useEffect(() => {
    if (weather && weather.weather && weather.weather[0]) {
      setTheme(getTheme(weather.weather[0].main));
    }
  }, [weather]);

  const getCurrentLocationWeather = async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      await fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      setError('Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      setForecast(forecastResponse.data);
      setError(null);
      animateIn();
    } catch (error) {
      setError('Could not fetch weather data');
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      await fetchWeatherData(response.data.coord.lat, response.data.coord.lon);
    } catch (error) {
      setError('Could not find the specified location');
    } finally {
      setLoading(false);
    }
  };

  const animateIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  if (loading) {
    return (
      <LinearGradient colors={theme.gradientColors} style={styles.container}>
        <ActivityIndicator size="large" color={theme.textColor} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={theme.gradientColors} style={styles.container}>
      <StatusBar style={theme.textColor === '#FFFFFF' ? 'light' : 'dark'} />
      <KeyboardAvoidingView 
        style={styles.content} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, { color: theme.textColor, borderColor: theme.textColor }]}
            placeholder="Search for a city"
            placeholderTextColor={theme.textColor + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={[styles.searchButton, { backgroundColor: theme.cardColor }]} onPress={handleSearch}>
            <Ionicons name="search" size={24} color={theme.textColor} />
          </TouchableOpacity>
        </View>
        {error && <Text style={[styles.errorText, { color: theme.textColor }]}>{error}</Text>}
        <Animated.View style={[styles.weatherContainer, { opacity: animation, transform: [{ translateY }] }]}>
          {weather && <WeatherInfo weather={weather} theme={theme} />}
          {forecast && <WeatherForecast forecast={forecast} theme={theme} />}
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: width * 0.9,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  weatherContainer: {
    width: width * 0.9,
  },
});

