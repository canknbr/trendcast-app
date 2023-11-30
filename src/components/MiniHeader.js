import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const MiniHeader = ({ label }) => {
  const navigation = useNavigation();
  return (
    <View className="mx-4 mt-4 flex-row items-center justify-between">
      <Text
        className="capitalize text-[20px] text-[#339af0] -tracking-wide"
        style={{
          fontFamily: "SGB",
        }}>
        {label}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Discover")}>
        <Text
          className="text-base text-zinc-700"
          style={{
            fontFamily: "SGSM",
          }}>
          Show More
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MiniHeader;
