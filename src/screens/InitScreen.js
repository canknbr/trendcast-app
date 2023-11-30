import { View, Text, ImageBackground } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
SplashScreen.preventAutoHideAsync();

const InitScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded, error] = useFonts({
    SGB: require("../fonts/SpaceGrotesk-Bold.ttf"),
    SGM: require("../fonts/SpaceGrotesk-Medium.ttf"),
    SGSM: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || error) {
      await SplashScreen.hideAsync();
    }
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 7000);
  });

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, error]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ImageBackground
      source={require("../../assets/studio.avif")}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <LinearGradient
        colors={["rgba(11, 134, 231,.3)", "rgba(11, 134, 231,.7)"]}
        start={{
          x: 0.5,
          y: 0,
        }}
        end={{
          x: 0.5,
          y: 1,
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          bottom: 0,
        }}
      />
      <Text
        className="text-white text-3xl uppercase font-extrabold"
        style={{
          fontFamily: "SGB",
        }}>
        TrendCast
      </Text>
    </ImageBackground>
  );
};

export default InitScreen;
