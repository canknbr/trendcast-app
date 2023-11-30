import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { Feather, EvilIcons } from "@expo/vector-icons";
import Categories from "../components/Categories";
import { categories } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { fetchDiscoverNews } from "../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import NewsSection from "../components/NewsSection";
const DiscoverScreen = () => {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("business");
  const [selectedCategoryTitle, setSelectedCategoryTitle] =
    useState("Architecture");
  const [newsMain, setNewsMain] = useState([]);
  const [discoverNews, setDiscoverNews] = useState([]);
  useEffect(() => {}, [activeCategory]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    setDiscoverNews([]);
  };
  const { isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
    onSuccess: (data) => {
      const filteredNews = data.articles.filter(
        (article) => article.title !== "[Removed]"
      );
      setDiscoverNews(filteredNews);
    },
    onError: (error) => {
      console.log("Error fetching discover news", error);
    },
  });

  return (
    <SafeAreaView className="pt-8 flex-1 bg-white dark:bg-neutral-900">
      <StatusBar
        barStyle={colorScheme == "dark" ? "light-content" : "dark-content"}
      />
      <View className="">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute -top-4 left-4 bg-neutral-100 rounded-full flex items-center justify-center p-2">
          <Feather name="arrow-left" size={24} color="#339af0" />
        </TouchableOpacity>
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-center text-3xl text-[#339af0] dark:text-white"
            style={{
              fontFamily: "SGB",
            }}>
            Discover
          </Text>
          <Text
            style={{
              fontFamily: "SGSM",
            }}
            className="capitalize text-base text-gray-600 dark:text-neutral-200"></Text>
        </View>
        <View className="mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full">
          <TouchableOpacity className="pl-2">
            <Feather name="search" size={24} color="gray" />
          </TouchableOpacity>
          <TextInput
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            placeholder="Search..."
            className="px-2 flex-1 text-base"
            placeholderTextColor={"gray"}
          />
          <EvilIcons name="gear" size={24} color="gray" />
        </View>
        <View className="flex-row mx-4">
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        <View className="h-full">
          {/* News */}
          <View className="my-4 mx-4 flex-row justify-between items-center">
            <Text
              className="text-xl dark:text-white"
              style={{
                fontFamily: "SGB",
              }}></Text>

            <Text
              className="text-base text-[#339af0] dark:text-neutral-300"
              style={{
                fontFamily: "SGB",
              }}>
              View all
            </Text>
          </View>

          {isDiscoverLoading ? (
            <View className="mt-8 flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#339af0" />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(70),
              }}>
              <NewsSection
                categories={categories}
                data={discoverNews}
                label="Discovery"
              />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
