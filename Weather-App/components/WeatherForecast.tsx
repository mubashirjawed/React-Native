import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WeatherForecast = ({ forecast, theme }) => {
  const renderForecastItem = ({ item }) => {
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(item.main.temp);
    const icon = item.weather[0].icon;

    return (
      <LinearGradient colors={[theme.cardColor, theme.cardColor]} style={styles.forecastItem}>
        <Text style={[styles.dayName, { color: theme.textColor }]}>{dayName}</Text>
        <Image
          style={styles.weatherIcon}
          source={{
            uri: `http://openweathermap.org/img/wn/${icon}.png`,
          }}
        />
        <Text style={[styles.temperature, { color: theme.textColor }]}>{temp}°C</Text>
      </LinearGradient>
    );
  };

  const dailyData = forecast.list.filter((item, index) => index % 8 === 0);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.textColor }]}>5-Day Forecast</Text>
      <FlatList
        data={dailyData}
        renderItem={renderForecastItem}
        keyExtractor={(item) => item.dt.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  forecastItem: {
    alignItems: 'center',
    margin: 5,
    padding: 15,
    borderRadius: 15,
    minWidth: 100,
  },
  dayName: {
    fontSize: 18,
    marginBottom: 5,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WeatherForecast;

