import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");
const BreakingNewsCard = ({ item, handleClick }) => {
  return (
    <TouchableOpacity className="my-4" onPress={() => handleClick(item)}>
      <View
        className="relative "
        style={{
          width: width * 0.85,
          height: height * 0.22,
        }}>
        <Image
          source={{ uri: item?.urlToImage }}
          className="w-full h-full rounded-3xl overflow-hidden"
        />
        <LinearGradient
          className="rounded-3xl"
          colors={["transparent", "rgba(0,0,0,.6)"]}
          start={{ x: 0.5, y: 0 }}
          end={{
            x: 0.5,
            y: 1,
          }}
          style={{
            position: "absolute",

            width: "100%",
            height: "100%",
          }}
        />
        <View className="absolute bottom-6 left-4 justify-end h-[80%]">
          <View className="space-y-1">
            <View className="max-w-[90%]">
              <Text className="text-zinc-100 text-sm font-semibold capitalize">
                {item?.title?.length > 60
                  ? item.title?.slice(0, 60) + "..."
                  : item.title.split(" - ")[0] || "N/A"}
              </Text>
            </View>
            <View>
              <Text className="text-zinc-100 text-sm font-semibold capitalize">
                {item?.author?.length > 20
                  ? item.author.slice(0, 20)
                  : item.author}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BreakingNewsCard;
