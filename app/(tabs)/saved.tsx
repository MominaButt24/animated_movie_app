import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import SavedCard from "@/components/SavedCard";
import {fetchMovieDetails, fetchMovies} from "@/services/api";
import { FontAwesome } from "@expo/vector-icons";
import { useFavorites } from '@/services/useFavorites';

const Saved = () => {
    const router = useRouter();
    //const userId = "1"; // ⚠️ Replace with actual userId from Appwrite Auth later

   // const { favorites, loading: favLoading } = useFavorites(userId);
    const { favorites, loading: favLoading, refetch } = useFavorites();

    const [movies, setMovies] = useState<MovieDetails[]>([]);
    const [loadingMovies, setLoadingMovies] = useState(true);
    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );
    useEffect(() => {
        const fetchSavedMovies = async () => {
            if (!favorites?.some(() => true)) {
                setMovies([]);
                return;
            }

            try {
                const movieDetails = await Promise.all(
                    favorites.map((id) => fetchMovieDetails(id))
                );
                setMovies(movieDetails);
            } catch (err) {
                console.error("Error fetching movie details:", err);
            } finally {
                setLoadingMovies(false);
            }
        };

        if (!favLoading) fetchSavedMovies();
    }, [favLoading, favorites]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" />
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
                {/*<Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />*/}
                <Image
                    source={require('../../assets/icons/logo4.png')}
                    style={{ width: 200, height: 200, resizeMode: 'contain', marginTop: 24 , marginLeft: 'auto', marginRight: 'auto'}}
                />
                <ImageBackground
                    source={images.highlight}
                    className="flex-row w-full h-32 px-4 items-center bg-accent shadow-lg shadow-[#1f1f20] rounded-3xl justify-between"
                    resizeMode="cover"
                >
                    <Text className="text-pink-100 font-semibold ml-4 text-4xl">My Saved Movies</Text>
                    <FontAwesome name="heart" size={40} color="#ff2c2c" className="mr-3" />
                </ImageBackground>

                {favLoading || loadingMovies ? (
                    <ActivityIndicator size="large" color="#0000ff" className="mt-5 self-center" />
                ) : (
                    <View className="flex-1 mt-5">
                        <FlatList
                            ItemSeparatorComponent={() => <View className="w-4" />}
                            className="mt-4 mb-3"
                            data={movies}
                            renderItem={({ item }) => <SavedCard {...item} />}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Saved;

