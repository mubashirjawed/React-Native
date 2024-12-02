import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const WeatherInfo = ({ weather, theme }) => {
  const { name, main, weather: weatherDetails, wind } = weather;

  return (
    <LinearGradient colors={[theme.cardColor, theme.cardColor]} style={styles.container}>
      <Text style={[styles.cityName, { color: theme.textColor }]}>{name}</Text>
      {weatherDetails && weatherDetails[0] && (
        <Image
          style={styles.weatherIcon}
          source={{
            uri: `http://openweathermap.org/img/wn/${weatherDetails[0].icon}@4x.png`,
          }}
        />
      )}
      {main && <Text style={[styles.temperature, { color: theme.textColor }]}>{Math.round(main.temp)}°C</Text>}
      {weatherDetails && weatherDetails[0] && (
        <Text style={[styles.description, { color: theme.textColor }]}>{weatherDetails[0].description}</Text>
      )}
      <View style={styles.detailsContainer}>
        {main && (
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={24} color={theme.textColor} />
            <Text style={[styles.detailText, { color: theme.textColor }]}>Humidity: {main.humidity}%</Text>
          </View>
        )}
        {wind && (
          <View style={styles.detailItem}>
            <Ionicons name="speedometer-outline" size={24} color={theme.textColor} />
            <Text style={[styles.detailText, { color: theme.textColor }]}>Wind: {wind.speed} m/s</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 24,
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default WeatherInfo;

