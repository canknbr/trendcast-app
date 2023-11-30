import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const NewDetailScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const { params } = useRoute();
  console.log(params);
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
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: "white",
      }}>
      <View className="absolute z-10 w-full top-14 flex-row items-center justify-between px-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-black/50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10  p-3 rounded-full">
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex-row space-x-4">
          <View className="bg-black/50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10  p-3 rounded-full">
            <MaterialIcons name="bookmark-border" size={24} color="white" />
          </View>
          <View className="bg-black/50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10  p-3 rounded-full">
            <Entypo name="dots-three-horizontal" size={24} color="white" />
          </View>
        </View>
      </View>
      <StatusBar
        barStyle={colorScheme == "dark" ? "light-content" : "dark-content"}
      />
      <View className="justify-end">
        <Image
          resizeMethod="resize"
          source={{
            uri: params.urlToImage,
          }}
          style={{
            height: heightPercentageToDP(50),
            width: widthPercentageToDP(100),
            position: "relative",
          }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,.65)"]}
          start={{
            x: 1,
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
          }}
        />
        <View className="absolute bottom-20 mx-4">
          <View className="space-y-2">
            <Text
              style={{
                fontFamily: "SGSM",
              }}
              className="text-white text-lg  dark:text-neutral-900">
              {params.title.split(" - ")[0]}
            </Text>
            <Text
              className="text-white"
              style={{
                fontFamily: "SGSM",
              }}>
              {formatDate(params.publishedAt)}
            </Text>
          </View>
        </View>
      </View>

      <View
        className="bg-white  flex-1"
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginTop: -40,
          padding: 40,
        }}>
        <Text
          className="tracking-widest"
          style={{
            fontFamily: "SGSM",
          }}>
          {params.content} <Text> {params.content}</Text>{" "}
          <Text> {params.content}</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewDetailScreen;
