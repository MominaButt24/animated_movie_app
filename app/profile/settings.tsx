// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, Switch } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { account } from "@/services/appwrite";
//
// export default function Settings() {
//     const [currentPassword, setCurrentPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [newEmail, setNewEmail] = useState("");
//     const [themeDark, setThemeDark] = useState(false);
//
//     // ✅ Change Password
//     // Change Password
//     const handleChangePassword = async () => {
//         try {
//             if (!currentPassword || !newPassword) {
//                 Alert.alert("Error", "Please enter both current and new password.");
//                 return;
//             }
//
//             // Just update password — no need to create a session again
//             await account.updatePassword(newPassword, currentPassword);
//
//             Alert.alert("Success", "Password updated successfully!");
//             setCurrentPassword("");
//             setNewPassword("");
//         } catch (err) {
//             Alert.alert("Error", "Failed to update password.");
//             console.error(err);
//         }
//     };
//
// // Change Email
//     const handleChangeEmail = async () => {
//         try {
//             if (!currentPassword || !newEmail) {
//                 Alert.alert("Error", "Please enter current password and new email.");
//                 return;
//             }
//
//             await account.updateEmail(newEmail, currentPassword);
//
//             Alert.alert("Success", "Email updated successfully!");
//             setCurrentPassword("");
//             setNewEmail("");
//         } catch (err) {
//             Alert.alert("Error", "Failed to update email.");
//             console.error(err);
//         }
//     };
//
//
//     return (
//         <SafeAreaView className="flex-1 bg-primary px-5">
//             <Text className="text-white text-2xl font-bold mb-5">Settings</Text>
//
//             {/* 🎛 Theme Toggle */}
//             <View className="flex-row justify-between items-center mb-5">
//                 <Text className="text-white text-lg">Dark Mode</Text>
//                 <Switch
//                     value={themeDark}
//                     onValueChange={(value) => setThemeDark(value)}
//                     thumbColor={themeDark ? "#ab8bff" : "#ccc"}
//                 />
//             </View>
//
//             {/* 🔑 Change Password */}
//             <Text className="text-white mt-4 mb-1">Current Password</Text>
//             <TextInput
//                 value={currentPassword}
//                 onChangeText={setCurrentPassword}
//                 secureTextEntry
//                 placeholder="Enter current password"
//                 className="bg-gray-800 text-white p-3 rounded-lg mb-3"
//             />
//
//             <Text className="text-white mb-1">New Password</Text>
//             <TextInput
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 secureTextEntry
//                 placeholder="Enter new password"
//                 className="bg-gray-800 text-white p-3 rounded-lg mb-4"
//             />
//
//             <TouchableOpacity
//                 onPress={handleChangePassword}
//                 className="bg-[#ab8bff] py-3 rounded-xl items-center mb-5"
//             >
//                 <Text className="text-white font-bold text-base">Change Password</Text>
//             </TouchableOpacity>
//
//             {/* 📧 Change Email */}
//             <Text className="text-white mb-1">New Email</Text>
//             <TextInput
//                 value={newEmail}
//                 onChangeText={setNewEmail}
//                 keyboardType="email-address"
//                 placeholder="Enter new email"
//                 className="bg-gray-800 text-white p-3 rounded-lg mb-4"
//             />
//
//             <TouchableOpacity
//                 onPress={handleChangeEmail}
//                 className="bg-[#ab8bff] py-3 rounded-xl items-center"
//             >
//                 <Text className="text-white font-bold text-base">Change Email</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// }
//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { account } from "@/services/appwrite";
import { useRouter } from "expo-router";

export default function Settings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [themeDark, setThemeDark] = useState(false);

    const router = useRouter();

    // 🔑 Change Password
    const handleChangePassword = async () => {
        try {
            if (!currentPassword || !newPassword) {
                Alert.alert("Error", "Please enter both current and new password.");
                return;
            }
            await account.updatePassword(newPassword, currentPassword);
            Alert.alert("✅ Success", "Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            Alert.alert("❌ Error", "Failed to update password.");
            console.error(err);
        }
    };

    // 📧 Change Email
    const handleChangeEmail = async () => {
        try {
            if (!currentPassword || !newEmail) {
                Alert.alert("Error", "Please enter current password and new email.");
                return;
            }
            await account.updateEmail(newEmail, currentPassword);
            Alert.alert("✅ Success", "Email updated successfully!");
            setCurrentPassword("");
            setNewEmail("");
        } catch (err) {
            Alert.alert("❌ Error", "Failed to update email.");
            console.error(err);
        }
    };

    // 🗑 Delete Account
    const handleDeleteAccount = async () => {
        Alert.alert(
            "⚠️ Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await account.delete(); // Appwrite deletes current user
                            Alert.alert("✅ Deleted", "Your account has been removed.");
                            router.replace("/(auth)/signin");
                        } catch (err) {
                            Alert.alert("❌ Error", "Failed to delete account.");
                            console.error(err);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-primary px-5">
            <Text className="text-white text-2xl font-bold mb-5">Settings</Text>

            {/*/!* 🎛 Theme Toggle *!/*/}
            {/*<View className="flex-row justify-between items-center mb-5">*/}
            {/*    <Text className="text-white text-lg">Dark Mode</Text>*/}
            {/*    <Switch*/}
            {/*        value={themeDark}*/}
            {/*        onValueChange={(value) => setThemeDark(value)}*/}
            {/*        thumbColor={themeDark ? "#ab8bff" : "#ccc"}*/}
            {/*    />*/}
            {/*</View>*/}

            {/* 🔑 Change Password */}
            <Text className="text-white mt-4 mb-1">Current Password</Text>
            <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                placeholder="Enter current password"
                placeholderTextColor="#aaa"
                className="bg-gray-800 text-white p-3 rounded-lg mb-3"
            />

            <Text className="text-white mb-1">New Password</Text>
            <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                placeholder="Enter new password"
                placeholderTextColor="#aaa"
                className="bg-gray-800 text-white p-3 rounded-lg mb-4"
            />

            <TouchableOpacity
                onPress={handleChangePassword}
                className="bg-[#ab8bff] py-3 rounded-xl items-center mb-5"
            >
                <Text className="text-white font-bold text-base">Change Password</Text>
            </TouchableOpacity>

            {/* 📧 Change Email */}
            <Text className="text-white mb-1">New Email</Text>
            <TextInput
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
                placeholder="Enter new email"
                placeholderTextColor="#aaa"
                className="bg-gray-800 text-white p-3 rounded-lg mb-4"
            />

            <TouchableOpacity
                onPress={handleChangeEmail}
                className="bg-[#ab8bff] py-3 rounded-xl items-center mb-5"
            >
                <Text className="text-white font-bold text-base">Change Email</Text>
            </TouchableOpacity>

            {/* 🗑 Delete Account */}
            <TouchableOpacity
                onPress={handleDeleteAccount}
                className="bg-red-600 py-3 rounded-xl items-center mt-5"
            >
                <Text className="text-white font-bold text-base">Delete Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
