import { useEffect, useState } from "react";
import {StatusBar} from "react-native";
import './global.css';
//import {falseTag} from "yaml/dist/schema/yaml-1.1/bool";
import {Stack, useRouter} from "expo-router";
import { account } from "@/services/appwrite"; // make sure path is correct
import { ActivityIndicator, View } from "react-native";
import CameraSplash from "@/app/splash";
//
// export default function RootLayout() {
//     const [isLoading, setIsLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [showSplash, setShowSplash] = useState(true);
//
//     useEffect(() => {
//         if (!showSplash) {
//             const checkAuth = async () => {
//                 try {
//                     await account.get();
//                     setIsAuthenticated(true);
//                 } catch {
//                     setIsAuthenticated(false);
//                 } finally {
//                     setIsLoading(false);
//                 }
//             };
//             checkAuth();
//         }
//     }, [showSplash]);
//
//     // ✅ Show splash (contains SignIn) until it finishes animation
//     if (showSplash) {
//         return <CameraSplash />;
//     }
//
//     // if (isLoading) {
//     //     return (
//     //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     //             <ActivityIndicator size="large" />
//     //         </View>
//     //     );
//     // }
//
//     return (
//         <Stack screenOptions={{ headerShown: false }}>
//             {isAuthenticated ? (
//                 <>
//                     <Stack.Screen name="(tabs)" />
//                     <Stack.Screen name="movies/[id]" />
//                 </>
//             ) : (
//                 <>
//                     {/* 👇 Removed SignIn because Splash already handles it */}
//                     <Stack.Screen name="(auth)/signup" />
//                 </>
//             )}
//         </Stack>
//     );
// }


// oooooooooooooooooooooooooooo

export default function RootLayout() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await account.get();
                setIsAuthenticated(true);
                // ✅ If authenticated, skip splash immediately
                setShowSplash(false);
            } catch {
                //setIsAuthenticated(false);
                // ✅ If not authenticated, still show splash for first launch
                //setTimeout(() => setShowSplash(false), 8000);
                setShowSplash(true);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <ActivityIndicator size="large" />
    //         </View>
    //     );
    // }

    if (showSplash) {
        return <CameraSplash />;
    }

    return (
        <>
            <StatusBar hidden />
            <Stack screenOptions={{ headerShown: false }}>

                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="movies/[id]" />
                    </>
                ) : (
                    <>
                        {/*<Stack.Screen name="(auth)/signin" />*/}
                        <Stack.Screen name="(auth)/signin" />
                    </>
                )}
            </Stack>
        </>

    );
}
