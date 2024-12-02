type WeatherTheme = {
    gradientColors: string[];
    textColor: string;
    cardColor: string;
  };
  
  const themes: Record<string, WeatherTheme> = {
    Clear: {
      gradientColors: ['#4DA0B0', '#D39D38'],
      textColor: '#333333',
      cardColor: 'rgba(255, 255, 255, 0.8)',
    },
    Clouds: {
      gradientColors: ['#bdc3c7', '#2c3e50'],
      textColor: '#FFFFFF',
      cardColor: 'rgba(44, 62, 80, 0.8)',
    },
    Rain: {
      gradientColors: ['#000046', '#1CB5E0'],
      textColor: '#FFFFFF',
      cardColor: 'rgba(0, 0, 70, 0.8)',
    },
    Snow: {
      gradientColors: ['#E6DADA', '#274046'],
      textColor: '#333333',
      cardColor: 'rgba(230, 218, 218, 0.8)',
    },
    Thunderstorm: {
      gradientColors: ['#232526', '#414345'],
      textColor: '#FFFFFF',
      cardColor: 'rgba(35, 37, 38, 0.8)',
    },
    Default: {
      gradientColors: ['#4c669f', '#3b5998', '#192f6a'],
      textColor: '#FFFFFF',
      cardColor: 'rgba(28, 41, 106, 0.8)',
    },
  };
  
  export const getTheme = (weatherCondition: string): WeatherTheme => {
    const condition = Object.keys(themes).find(key => weatherCondition.includes(key));
    return themes[condition] || themes.Default;
  };
  
  