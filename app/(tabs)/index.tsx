import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import {text} from "node:stream/consumers";
import {getTrendingMovies} from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import React from "react";

// import {fetchMovies} from "./api";


export default function Index() {
    const router = useRouter();

    const{
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrendingMovies)

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies(
        {query: '', genre: 16}
    ))

    return (

    <View className="flex-1 bg-primary ">
        <Image source={images.bg} className="absolute w-full z-0"/>
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:"100%", paddingBottom: 10}}>
            <Image
                source={require('../../assets/icons/logo4.png')}
                style={{ width: 200, height: 200, resizeMode: 'contain', marginTop: 24 , marginLeft: 'auto', marginRight: 'auto'}}
            />

            {/*<Image source={icons.logo} className="w-30 h-30 mt-20 mb-5 mx-auto"/>*/}
            {moviesLoading || trendingLoading  ? (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="mt-5 self-center"
                />
            ) : moviesError || trendingError ? (
                <Text>Error: {moviesError?.message  ||  trendingError?.message}</Text>
            ) : (
                <View className="flex-1 ">
                    <SearchBar
                        onPress={() => router.push("/search")}
                        placeholder="Search for a movie"
                    />
                    {trendingMovies && (
                        <View className="mt-10">
                            <Text className="text-lg text-white font-bold mb-3">
                                Trending Movies!
                            </Text>
                        </View>
                    )}

                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View className="w-4"/> }

                        className="mt-4 mb-3"
                        data={trendingMovies}
                        renderItem={({item, index}) =>(
                             <TrendingCard movie={item} index={index}/>
                        )}
                        keyExtractor={(item) => item.movie_id.toString()}
                    />
                    <Text className="text-g text-white font-bold mt-5 mb-3">Latest Movies</Text>

                    <FlatList
                        data={movies}
                        renderItem={({item})  =>  (
                            <MovieCard
                                {...item}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}

                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent : "flex-start",
                            gap : 20,
                            paddingRight : 5,
                            marginBottom : 10
                        }}
                        className="mt-2 pb-32"
                        scrollEnabled={false}

                    />

                </View>)}
        </ScrollView>

    </View>
  );
}
