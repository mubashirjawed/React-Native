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
            uri: "data:image/jpeg;base64,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",
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
          <Card title={"Carpool"} icon={"directions-car"} bgColor={"#ccc"} />
          <Card title={"Carpool"} icon={"directions-car"} bgColor={"#ccc"} />
        </View>
        <View style={Styles.cardRow}>
          <Card title={"Carpool"} icon={"directions-car"} bgColor={"#ccc"} />
          <Card title={"Carpool"} icon={"directions-car"} bgColor={"#ccc"} />
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
      <MaterialIcons name={icon} size={80} color="black" />
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
    height: "86%",
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
