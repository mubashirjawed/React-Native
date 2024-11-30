import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const App = () => {
  return (
    
    <ImageBackground
      source={require("./assets/images/bg-text.png")} // अपनी बैकग्राउंड इमेज URL डालें
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Can Image */}
        <Image
          source={require("./assets/images/fizz01.png")} // अपनी can image URL डालें
          style={styles.canImage}
        />

        {/* Text Section */}
        <Text style={styles.title}>ENJOY EVERY SIP</Text>
        <Text style={styles.subTitle}>
          The ultimate refreshing drink to enjoy in every festival
        </Text>

        {/* Buy Button */}
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  canImage: {
    width: 150,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "#B0BEC5",
    textAlign: "center",
    marginBottom: 30,
  },
  buyButton: {
    backgroundColor: "#00B5AD",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default App;


