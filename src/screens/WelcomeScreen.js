import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../../assets/news.avif")}
      className="flex-1 justify-end items-center space-y-4 pb-10">
      <LinearGradient
        colors={["rgba(11, 134, 231,.1)", "rgba(11, 134, 231,.7)"]}
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
        className="text-white text-center text-3xl uppercase font-extrabold"
        style={{
          fontFamily: "SGB",
        }}>
        Stay Informed from Day One
      </Text>
      <Text
        className="text-white text-xl capitalize font-extrabold"
        style={{
          fontFamily: "SGSM",
        }}>
        Discover the latest news
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Tabs")}
        className="mx-auto items-center justify-center p-3 rounded-3xl w-[90%] bg-zinc-100">
        <Text
          style={{
            fontFamily: "SGSM",
          }}
          className="text-[#0b86e7] text-2xl">
          Getting Started
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default WelcomeScreen;
