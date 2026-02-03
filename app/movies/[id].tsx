import React, {useState} from 'react';
import {Modal, Alert ,View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {router, useLocalSearchParams} from "expo-router";
import {fetchMovieDetails} from "@/services/api";
import useFetch from "@/services/useFetch";
import {icons} from "@/constants/icons";
import { FontAwesome } from '@expo/vector-icons';
import { useFavorites } from "@/services/useFavorites"; // adjust the path
import { useRated } from '@/services/useRated';
import StarRating from 'react-native-star-rating-widget';

//----


//----
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const RATED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_RATED_ID!;

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}
//const userId = "1";  //---
const MovieInfo = ({label, value}: MovieInfoProps )=> (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">
            {label}
        </Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value}
        </Text>
    </View>
)

const MovieDetails = () => {
     // later: get from Appwrite Auth
    const { isFavorite, addFavorite, removeFavorite,fetchFavorites } = useFavorites();
    const {id} = useLocalSearchParams()
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));
    const {
        showModal,
        setShowModal,
        rating,
        setRating,
        rated,
        handleSaveRating
    } = useRated(movie?.id?.toString());
    return (
        <View className=" bg-primary flex-1">
            <ScrollView contentContainerStyle={{paddingBottom: 80}}>
                <View>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className="w-full h-[550px]" resizeMode={"stretch"}/>
                </View>

                <View className="flex-row items-center justify-between mt-4 px-5">
                    <Text className="text-white text-xl font-bold">{movie?.title}</Text>
                    {movie && (
                        <TouchableOpacity
                            onPress={() => {
                                isFavorite(movie.id.toString())
                                    ? removeFavorite(movie.id.toString())
                                    : addFavorite(movie);
                            }}
                        >
                            <FontAwesome
                                name={isFavorite(movie.id.toString()) ? "heart" : "heart-o"}
                                size={24}
                                color="#FF5C5C"
                            />
                        </TouchableOpacity>
                    )}

                </View>

                <View className="flex-col items-start justify-center px-5">

                    <View className="flex-row items-center  gap-x-1">
                        <Text className="text-light-200 text-sm">{movie?.release_date?.split('-')[0]}</Text>
                        <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
                    </View>
                    <View className="flex-row items-center bg-dark-100 px-2 py-1 mt-2 gap-x-1 rounded-md">
                        <Image source={icons.star} className="size-4"/>
                        <Text className="text-white text-sm font-bold">
                            {Math.round(movie?.vote_average ?? 0)} / 10
                        </Text>
                        <Text className="text-light-200 text-sm">
                            {movie?.vote_count} votes
                        </Text>
                    </View>

                    <MovieInfo label="Overview" value={movie?.overview}/>
                    <MovieInfo label="Genres" value={movie?.genres?.map((g)=> g.name).join(' - ') || 'N/A'}/>
                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo label="Budget" value={`$${movie?.budget / 1_000_000} million`}/>
                        <MovieInfo label="Revenue" value={`$${Math.round(movie?.revenue) / 1_000_000} million`}/>
                    </View>
                    <MovieInfo label="Production Companies" value={movie?.production_companies?.map((c)=> c.name).join(' - ') || 'N/A'}/>
                </View>
            </ScrollView>
            <TouchableOpacity
                disabled={rated}
                className={`relative rounded-lg bottom-20 left-0 right-0 mx-5 py-3.5 items-center justify-center ${rated ? 'bg-green-600' : 'bg-white'}`}
                onPress={() => setShowModal(true)}
            >
                <Text className={`text-xl font-semibold ${rated ? 'text-white' : 'text-light-200'}`}>
                    {rated ? 'Rated' : 'Rate Movie'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image source={icons.arrow} className="size-5 mr-1 mt-0.5" tintColor="#fff" />
                <Text className="text-white text-base font-semibold">Go Back</Text>
            </TouchableOpacity>
            <Modal visible={showModal} transparent animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/70">
                    <View className="bg-white p-6 rounded-xl w-[80%]">
                        <Text className="text-lg font-semibold mb-4 text-center">Rate This Movie</Text>
                        <StarRating
                            rating={rating}
                            onChange={setRating}
                            starSize={30}
                            color="#FFC107"
                        />
                        <TouchableOpacity
                            className="mt-4 bg-green-600 py-2 rounded"
                            onPress={() => {
                                setShowModal(false);
                                // setRated(true);
                                handleSaveRating(); // you’ll define this function next
                            }}
                        >
                            <Text className="text-white text-center font-semibold">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({});
export default MovieDetails;