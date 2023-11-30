import { View, Text, Switch, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
const Header = () => {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View>
        <Text
          style={{
            fontFamily: "SGB",
          }}
          className="text-2xl text-[#339af0] dark:text-white uppercase">
          TrendCast
        </Text>
      </View>
      <View className="flex-row items-center justify-between space-x-4">
        <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          className="bg-gray-200 dark:bg-[#339af0] rounded-full p-2">
          <MagnifyingGlassIcon
            size={25}
            strokeWidth={2}
            color={colorScheme == "dark" ? "white" : "#339af0"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
