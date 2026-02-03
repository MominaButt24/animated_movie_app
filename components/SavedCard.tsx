import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Link} from "expo-router";
//import MaskedView from "@react-native-masked-view/masked-view";
//import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const SavedCard = ({id, poster_path, title, vote_average, release_date} : Movie) => {
    // @ts-ignore
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="mx-5 mb-4">
                <View className="h-90 rounded-lg bg-[#1f1f20]">
                    <Image
                        source={{
                            uri: poster_path
                                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                                : 'https://placeholder.co/600x400/1a1a1a/ffffff.png'

                        }}
                        className="w-full h-60 rounded-t-lg rounded-br-none rounded-bl-none"
                        resizeMode="stretch"
                    />

                    <View className="ml-4 mb-4">
                        <Text className="text-white text-sm font-bold mt-2 " numberOfLines={1}>{title}</Text>
                        <Text className="text-light-200 text-sm">{release_date?.split('-')[0]}</Text>
                        <View className="flex-row items-center bg-dark-100 w-[30%] px-2 py-1 mt-2 gap-x-1 rounded-md">
                            <Image source={icons.star} className="size-3"/>
                            <Text className="text-white text-sm font-bold">
                                {Math.round(vote_average ?? 0)} / 10
                            </Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({});

export default SavedCard;