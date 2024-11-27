import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      {/* Background Design */}
      <View style={styles.background}>
        <Text style={styles.fizzText}>FIZZ BOOOM</Text>
      </View>

      {/* Can Image */}
      <Image source={"./assets/images/fizz01.png"} style={styles.canImage} />

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F29",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  background: {
    position: "absolute",
    top: 100,
    zIndex: -1,
  },
  fizzText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#004F5A",
    opacity: 0.1,
    textAlign: "center",
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
