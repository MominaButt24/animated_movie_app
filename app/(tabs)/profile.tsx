import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import {signOut} from '@/services/auth'
import { useFavorites } from '@/services/useFavorites';
import { database, Query } from '@/services/appwrite';
import { account } from '@/services/appwrite';
import {useRouter} from "expo-router";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const RATED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_RATED_ID!;
const PROFILE_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_PROFILE_ID!;

export default function Profile() {
    const [userProfile, setUserProfile] = useState<any>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [ratedCount, setRatedCount] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await account.get();
                setUserId(user.$id);
            } catch (error) {
                console.error("Failed to get user:", error);
            }
        };

        fetchUser();
    }, []);

    const fetchRatedCount = useCallback(async () => {
        if (!userId) return;
        try {
            const result = await database.listDocuments(
                DATABASE_ID,
                RATED_COLLECTION_ID,
                [Query.equal("user_id", userId)]
            );
            setRatedCount(result.total);
        } catch (err) {
            console.error("Error fetching rated count:", err);
        }
    }, [userId]);

    const { favorites, refetch } = useFavorites();
    useFocusEffect(
        useCallback(() => {
            const fetchUserProfile = async () => {
                if (!userId) return;

                try {
                    const result = await database.listDocuments(
                        DATABASE_ID,
                        PROFILE_COLLECTION_ID,
                        [Query.equal('user_id', userId)]
                    );

                    if (result.total > 0) {
                        const profile = result.documents[0];
                        setUserProfile(result.documents[0]);
                        // ✅ Handle preferences with default fallback

                        const prefs = profile.preferences
                            ? profile.preferences.split(',')
                            : ['Animation', 'Fantasy', 'Comedy'];
                        setGenres(prefs); // Update genres dynamically
                    }else {
                        console.warn("No profile found for this user.");
                        setGenres(['Animation', 'Fantasy', 'Comedy']); // default
                    }
                } catch (error) {
                    console.error("Failed to refresh user profile:", error);
                    setGenres(['Animation', 'Fantasy', 'Comedy']); // default
                }
            };

            fetchUserProfile(); // refresh when focused
            refetch();
            fetchRatedCount();
        }, [userId, refetch, fetchRatedCount])
    );

   // const [genres] = useState(['Animation', 'Fantasy', 'Comedy']);
    const [genres, setGenres] = useState<string[]>(['Animation', 'Fantasy', 'Comedy']);

    const router = useRouter();
    const handleLogout = () => {
        Alert.alert('Logout', 'Do you really want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await signOut();
                        // router.replace('/(auth)/signin');
                        router.replace('/splash');
                    } catch (error) {
                        console.error('Logout failed:', error);
                    }
                },
            }
        ]);
    };

    const ProfileStat = ({ icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
        <View className="flex-1 bg-[#ab8bff33] rounded-xl items-center p-4">
            <View style={{ backgroundColor: color + '20' }} className="p-2 rounded-full mb-1.5">
                <FontAwesome name={icon} size={20} color={color} />
            </View>
            <Text className="text-white font-bold text-xl">{value}</Text>
            <Text className="text-gray-400 text-xs">{label}</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-primary px-5">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="items-center bg-accent shadow-lg shadow-[#1f1f20] rounded-3xl mt-5 mb-6">
                    <View className="w-[95px] h-[95px] rounded-full bg-[#1f1f20] justify-center items-center mb-4 mt-2 overflow-hidden">
                        {userProfile?.avatar ? (
                            <Image
                                source={{ uri: userProfile.avatar }}
                                style={{ width: 95, height: 95 }}
                                resizeMode="cover"
                            />
                        ) : (
                            <FontAwesome name="user" size={70} color="#ab8bff" />
                        )}
                    </View>

                    {/*<Text className="text-white text-2xl font-bold">{userName}</Text>*/}
                    <Text className="text-white text-2xl font-bold">
                        {userProfile?.username || 'Little Explorer'}
                    </Text>
                    <Text className="text-gray-700 text-sm mt-1">Young Movie Explorer</Text>
                </View>


                <View className="flex-row justify-between gap-3 mb-8">

                    <ProfileStat icon="film" label="Explored" value={favorites.length+ratedCount} color="#ab8bff" />
                    <ProfileStat icon="heart" label="Saved" value={favorites.length}  color="#f87171" />
                    <ProfileStat icon="star" label="Rated" value={ratedCount} color="#facc15" />
                </View>

                <View className="mb-7">
                    <Text className="text-white text-base font-semibold mb-3">Favorite Genres</Text>
                    <View className="flex-row flex-wrap gap-2">
                        {genres.map((genre, idx) => (
                            <View key={idx} className="bg-[#ab8bff33] px-3 py-1.5 rounded-full">
                                <Text className="text-[#ab8bff] font-medium">{genre}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View className="mb-7">
                    <TouchableOpacity className="flex-row items-center gap-3 py-3.5 border-b border-[#262626]" onPress={() => router.push('/profile/edit')}
                    >
                        <FontAwesome name="edit" size={20} color="#ab8bff" />
                        <Text className="text-white text-base font-medium">Edit Profile</Text>
                    </TouchableOpacity>

                    {/*<TouchableOpacity className="flex-row items-center gap-3 py-3.5 border-b border-[#262626]" onPress={() => Alert.alert('Parental Controls')}>*/}
                    {/*    <FontAwesome name="shield" size={20} color="#10b981" />*/}
                    {/*    <Text className="text-white text-base font-medium">Parental Controls</Text>*/}
                    {/*</TouchableOpacity>*/}

                    <TouchableOpacity className="flex-row items-center gap-3 py-3.5 border-b border-[#262626]" onPress={() => router.push('/profile/settings')}>
                        <FontAwesome name="cog" size={20} color="#60a5fa" />
                        <Text className="text-white text-base font-medium">Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center gap-3 py-3.5 border-b border-[#262626]" onPress={handleLogout}>
                        <FontAwesome name="sign-out" size={20} color="#f87171" />
                        <Text className="text-[#f87171] text-base font-medium">Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
