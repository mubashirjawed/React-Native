import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const SCREEN_HEIGHT = Dimensions.get("screen").height;
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={Styles.container}>
      {/* header */}

      <View style={Styles.header}>
        <MaterialIcons name="menu" size={24} color="black" />
        <Text style={Styles.headerTxt}>BYKEA</Text>
        <MaterialIcons name="add-call" size={24} color="black" />
      </View>

      {/* banner */}

      <View style={Styles.bannerView}>
        <Image
          style={Styles.bannerImg}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTQzwjbXzb6hQYGnitjGce_YfI0YY6e6yTzg&s",
          }}
        />
      </View>

      {/* info */}

      <View style={Styles.infoView}>
        <MaterialIcons name="attach-money" size={24} color="green" />
        <MaterialIcons name="message" size={24} color="green" />
      </View>

      {/* card View */}

      <View style={Styles.cardView}>
        <View style={Styles.cardRow}>
          <Card title={"Carpool"} icon={"directions-car"} bgColor={"#c1e1c5"} />
          <Card title={"Ride"} icon={"bike-scooter"} bgColor={"#bedadc"} />
        </View>
        <View style={Styles.cardRow}>
          <Card
            title={"Delivery"}
            icon={"delivery-dining"}
            bgColor={"#DFCCFB"}
          />
          <Card title={"Mobile"} icon={"send-to-mobile"} bgColor={"#ECE5C7"} />
        </View>
        <View style={Styles.cardRow}>
          <Card title={"Shop"} icon={"shopify"} bgColor={"#D7D3BF"} />
          <Card title={"Savings"} icon={"savings"} bgColor={"#9ED2BE"} />
        </View>
      </View>
    </View>
  );
}

const Card = ({
  bgColor,
  icon,
  title,
}: {
  bgColor: string;
  icon: any;
  title: string;
}) => {
  return (
    <View style={[Styles.card, { backgroundColor: bgColor }]}>
      <Text style={{ textAlign: "right" }}>{title}</Text>
      <MaterialIcons name={icon} size={95} color="#41444B" />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTxt: {
    fontWeight: "bold",
    letterSpacing: 3,
    fontSize: 21,
  },
  header: {
    height: 50,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  bannerView: {
    height: SCREEN_HEIGHT / 3.7,
    backgroundColor: "#DEE3E8",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  bannerImg: {
    height: "90%",
    borderRadius: 20,
  },
  infoView: {
    height: 45,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: -15,
    marginHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  cardView: {
    flex: 1,
    margin: 20,
    gap: 15,
  },
  cardRow: {
    flex: 1,
    // borderWidth: 1,
    flexDirection: "row",
    gap: 15,
  },
  card: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "blue",
    borderRadius: 12,
    padding: 10,
    justifyContent: "space-around",
  },
});
