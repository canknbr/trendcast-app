import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import BreakingNewsCard from "./BreakingNewsCard";
const { width } = Dimensions.get("window");
const BreakingNews = ({ data, label }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("NewDetails", item);
  };
  return (
    <View>
      <Carousel
        data={data}
        loop={true}
        autoplayInterval={3000}
        autoplay={true}
        renderItem={({ item }) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        firstItem={2}
        inactiveSlideScale={0.85}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{
          display: "flex",
          alignItems: "center",
        }}
      />
    </View>
  );
};

export default BreakingNews;
