import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { account, database, ID, Query } from '@/services/appwrite';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
//const PROFILE_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_PROFILE_ID!;
const PROFILE_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_PROFILE_ID!;
const preferenceOptions = [
    'Family',
    'Animation',
    'Fantasy',
    'Comedy',
    'Action',
    'Drama',
    'Adventure'
];

const avatarOptions = [
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/688797730018f3ff70b3/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/688796ec00110cdbb21c/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/68879716000c334f5892/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/688797840032ef564052/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/6887af360018c3651cc4/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/6887af42003466d3a6b9/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/6887af4e000827cdf202/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/6887af5b0014ad66f662/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/6887af730013f6f256ff/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/6887af850014cc204c99/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/6887af9f002369231d05/view?project=6868d1d8001540a6299b&mode=admin',
    'https://fra.cloud.appwrite.io/v1/storage/buckets/688795df0000ec505655/files/6887afae000d541ca019/view?project=6868d1d8001540a6299b&mode=admin',
];

export default function EditProfile() {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [documentId, setDocumentId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [preferences, setPreferences] = useState<string[]>([]);
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const user = await account.get();
                setUserId(user.$id);
                setEmail(user.email);

                const result = await database.listDocuments(
                    DATABASE_ID,
                    PROFILE_COLLECTION_ID,
                    [Query.equal('user_id', user.$id)]
                );


                if (result.total > 0) {
                    const profile = result.documents[0];
                    setUsername(profile.username);
                    setSelectedAvatar(profile.avatar || null);
                    //setPreferences(profile.preferences || []); // Load preferences from DB

                    setPreferences(profile.preferences ? profile.preferences.split(',') : []);
                    setDocumentId(profile.$id);
                }

            } catch (error) {
                console.error('Error loading profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSave = async () => {
        try {
            await database.updateDocument(DATABASE_ID, PROFILE_COLLECTION_ID, documentId, {
                username,
                avatar: selectedAvatar,
                //preferences: preferences
                preferences: preferences.join(','),
            });

            Alert.alert('Success', 'Profile updated!');
            router.back();
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'Failed to update profile.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-primary px-4">
            <ScrollView>
                <Text className="text-white text-2xl font-bold my-4">Edit Profile</Text>

                <Text className="text-white mb-1">Username</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    className="bg-gray-800 text-white p-3 rounded-lg mb-4"
                />

                <Text className="text-white mb-2 mt-3">Select Preferences</Text>
                {/*<View className="flex-row flex-wrap gap-2 mb-5">*/}
                {/*    {preferenceOptions.map((pref) => {*/}
                {/*        const isSelected = preferences.includes(pref);*/}
                {/*        return (*/}
                {/*            <TouchableOpacity*/}
                {/*                key={pref}*/}
                {/*                onPress={() => {*/}
                {/*                    setPreferences((prev) =>*/}
                {/*                        isSelected ? prev.filter((p) => p !== pref) : [...prev, pref]*/}
                {/*                    );*/}
                {/*                }}*/}
                {/*                style={{*/}
                {/*                    paddingHorizontal: 12,*/}
                {/*                    paddingVertical: 8,*/}
                {/*                    borderRadius: 20,*/}
                {/*                    backgroundColor: isSelected ? '#ab8bff' : '#333',*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                <Text style={{ color: 'white' }}>{pref}</Text>*/}
                {/*            </TouchableOpacity>*/}
                {/*        );*/}
                {/*    })}*/}
                {/*</View>*/}


                <View className="flex-row flex-wrap gap-2 mb-5">
                    {preferenceOptions.map((pref) => {
                        const isSelected = preferences.includes(pref);
                        const scale = useSharedValue(1);

                        const animatedStyle = useAnimatedStyle(() => {
                            return {
                                transform: [{ scale: scale.value }],
                            };
                        });

                        return (
                            <TouchableOpacity
                                key={pref}
                                onPress={() => {
                                    scale.value = withSpring(1.1); // bounce on press
                                    setTimeout(() => (scale.value = withSpring(1)), 100);

                                    setPreferences((prev) =>
                                        isSelected ? prev.filter((p) => p !== pref) : [...prev, pref]
                                    );
                                }}
                            >
                                <Animated.View
                                    style={[
                                        animatedStyle,
                                        {
                                            paddingHorizontal: 12,
                                            paddingVertical: 8,
                                            borderRadius: 20,
                                            backgroundColor: isSelected ? '#ab8bff' : '#333',
                                        },
                                    ]}
                                >
                                    <Text style={{ color: 'white' }}>{pref}</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    })}
                </View>


                <Text className="text-white mb-2">Choose Avatar</Text>
                <View className="flex-row flex-wrap gap-3 mb-5">
                    {avatarOptions.map((avatar, index) => (
                        <TouchableOpacity key={index} onPress={() => setSelectedAvatar(avatar)}>
                            <Image
                                source={{ uri: avatar }}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 35,
                                    borderWidth: selectedAvatar === avatar ? 3 : 0,
                                    borderColor: '#ab8bff',
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    onPress={handleSave}
                    className="bg-[#ab8bff] py-3 rounded-xl items-center"
                >
                    <Text className="text-white font-bold text-base">Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
