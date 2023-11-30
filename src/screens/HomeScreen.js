import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useColorScheme } from "nativewind";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBreakingNews } from "../utils/NewsApi";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Loading from "../components/Loading";
import MiniHeader from "../components/MiniHeader";
import BreakingNews from "../components/BreakingNews";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NewsSection from "../components/NewsSection";

const HomeScreen = () => {
  const queryClient = useQueryClient();
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { isLoading: isBreakingNewsLoading } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      setBreakingNews(data.articles);
    },
    onError: (err) => console.log("error", err),
  });
  const { isLoading: isRecommendedNewsLoading } = useQuery({
    queryKey: ["recommendedNews"],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      setRecommendedNews(data.articles);
    },
    onError: (err) => console.log("error", err),
  });

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={colorScheme == "dark" ? "light-content" : "dark-content"}
      />
      <Header />
      {isBreakingNewsLoading ? (
        <Loading />
      ) : (
        <View>
          <MiniHeader label="Breaking News" />
          <BreakingNews label={"Öne Çıkanlar"} data={breakingNews} />
        </View>
      )}
      <View className="space-y-4">
        <MiniHeader label="Recommended For You" />
        <ScrollView
          style={{
            paddingBottom: hp(80),
          }}>
          {isRecommendedNewsLoading ? (
            <Loading />
          ) : (
            <NewsSection
              label="İlginizi Çekebilecekler"
              data={recommendedNews}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
