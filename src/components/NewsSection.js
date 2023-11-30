import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewsSection = ({ data, label }) => {
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("NewDetails", item);
  };
  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Check if the article is already in the bookmarked list
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        // If the article is not bookmarked, add it to the bookmarked list
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
        console.log("Article is bookmarked");
      } else {
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
        console.log("Article is removed from bookmarks");
      }
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };
  console.log(bookmarkStatus);
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const newDate = new Date(date);

    return newDate.toLocaleDateString(undefined, options);
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 mx-4 space-y-1"
        onPress={() => handleClick(item)}>
        <View className="flex-row space-x-4 justify-start  w-[100%] shadow-sm ">
          <Image
            className="rounded-3xl"
            source={{
              uri: item?.urlToImage || "https://picsum.photos/200/300",
            }}
            style={{
              width: heightPercentageToDP(14),
              height: heightPercentageToDP(14),
            }}
          />
          <View className="space-y-4 flex-1">
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item?.author?.length > 20
                ? item.author?.slice(0, 20) + "..."
                : item.author}
            </Text>
            <Text
              style={{
                fontSize: heightPercentageToDP(1.5),
                fontFamily: "SGB",
              }}
              className="text-neutral-800 dark:text-white capitalize max-w-[90%]">
              {item.title?.length > 50 ? item.title.slice(0, 50) : item.title}
            </Text>
            <Text className="">{formatDate(item.publishedAt)}</Text>
          </View>
          <View className="mt-4">
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
              className="bg-neutral-100 shadow-md flex items-center justify-center p-2 rounded-full">
              <Ionicons
                name={bookmarkStatus[index] ? "bookmark" : "bookmark-outline"}
                size={20}
                color={bookmarkStatus[index] ? "#339af0" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  useFocusEffect(
    useCallback(() => {
      const loadSaveArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];
          const isArticleBookmarkedList = urlList.map((url) => {
            savedArticlesArray.some((article) => article.url === url);
          });
          setBookmarkStatus(isArticleBookmarkedList);
        } catch (error) {
          console.log(error);
        }
      };
      loadSaveArticles();
    }, [urlList, navigation])
  );
  useEffect(() => {
    const urls = data.map((item) => item.url);
    setUrlList(urls);
  }, [data]);
  return (
    <View className="space-y-2  dark:bg-neutral-900">
      <FlatList
        data={data}
        nestedScrollEnabled
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};
const NewsSectionItem = ({ item, index }) => {
  return (
    <TouchableOpacity
      className="mb-4 mx-4 space-y-1"
      onPress={() => handleClick(item)}>
      <View className="flex-row space-x-4 justify-start  w-[100%] shadow-sm ">
        <Image
          className="rounded-3xl"
          source={{
            uri: item?.urlToImage || "https://picsum.photos/200/300",
          }}
          style={{
            width: heightPercentageToDP(14),
            height: heightPercentageToDP(14),
          }}
        />
        <View className="space-y-4 flex-1">
          <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
            {item?.author?.length > 20
              ? item.author?.slice(0, 20) + "..."
              : item.author}
          </Text>
          <Text
            style={{
              fontSize: heightPercentageToDP(1.5),
              fontFamily: "SGB",
            }}
            className="text-neutral-800 dark:text-white capitalize max-w-[90%]">
            {item.title?.length > 50 ? item.title.slice(0, 50) : item.title}
          </Text>
          <Text className="">{formatDate(item.publishedAt)}</Text>
        </View>
        <View className="mt-4">
          <TouchableOpacity
            onPress={() => toggleBookmarkSaved(item, index)}
            className="bg-neutral-100 shadow-md flex items-center justify-center p-2 rounded-full">
            <Ionicons
              name="bookmark-outline"
              size={20}
              color={bookmarkStatus[index] ? "#339af0" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default NewsSection;
