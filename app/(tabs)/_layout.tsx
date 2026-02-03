import React from 'react';
// import {images} from "@/constants/images"
import { View, Text, StyleSheet } from 'react-native';
import {Image, ImageBackground} from "react-native"
import {Tabs} from "expo-router"
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";
import {StatusBar} from "react-native";
// const TabIcon = ({focused, icon , title}: any ) => {
//     if(focused) {
//         return (
//             <ImageBackground
//                 source={images.highlight}
//                 className="flex flex-row w-full flex-1 min-w-[112px] min-h-14  mt-4  justify-center items-center rounded-full overflow-hidden"
//             >
//                 <Image source={icon} tintColor="#151312" className="size-5"/>
//                 <Text className= "text-secondary text-base font-semibold ml-4">{title}</Text>
//             </ImageBackground>
//         )
//     }
//     return (
//         <View className="size-full justify-center items-center mt-4 rounded-full">
//             <Image source={icon} tintColor="#ABB5DB" className="size-5"/>
//         </View>
//     )
// };

// const TabIcon = ({ focused, icon, title }: any) => {
//     return (
//         <View
//             style={{
//                 height: 40, // Match tabBar height
//                 width: 80,
//                 borderRadius: 20,
//                 backgroundColor: focused ? 'source={images.highlight}' : 'transparent',
//
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 paddingHorizontal: focused ? 14 : 0,
//             }}
//         >
//             <Image
//                 source={icon}
//                 style={{
//                     width: 20,
//                     height: 20,
//                     tintColor: focused ? '#AB8BFF' : '#ABB5DB',
//                     marginRight: focused ? 8 : 0,
//                 }}
//             />
//             {focused && (
//                 <Text
//                     style={{
//                         color: '#AB8BFF',
//                         fontWeight: '600',
//                         fontSize: 14,
//                     }}
//                 >
//                     {title}
//                 </Text>
//             )}
//         </View>
//     );
// };

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                style={{
                    height: 47, // same height as tabBar
                    width: 90, // adjust so pill fits
                    borderRadius: 20,
                    overflow: 'hidden',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                imageStyle={{
                    borderRadius: 20, // make sure image corners are rounded
                }}
            >
                <Image
                    source={icon}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: '#151312',
                        marginRight: 8,
                    }}
                />
                <Text
                    style={{
                        color: '#151312',
                        fontWeight: '600',
                        fontSize: 14,
                    }}
                >
                    {title}
                </Text>
            </ImageBackground>
        );
    }
    return (
        <View style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: '#ABB5DB',
                }}
            />
        </View>
    );
};

const _Layout = () => {
    return (

        // <Tabs
        //     screenOptions={{
        //         tabBarShowLabel: false,
        //         tabBarItemStyle: {
        //             width: '100%',
        //             height: '100%',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //
        //         },
        //         tabBarStyle: {
        //             backgroundColor: '#0f0D23',
        //             borderRadius: 50,
        //             marginHorizontal: 10,
        //             marginBottom: 35,
        //             height: 52,
        //             position: 'absolute',
        //             overflow: 'hidden',
        //             borderWidth: 1,
        //             borderColor: '#0f0D23'
        //
        //         },
        //     }}
        // >
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#0f0D23',
                    borderRadius: 50,
                    marginHorizontal: 8,
                    marginBottom: 35,
                    paddingTop: 20,
                    height: 47,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#0f0D23',
                    //paddingVertical: 0, // prevent vertical shift
                },

            }}
        >

        <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <>
                            <TabIcon
                                focused={focused}
                                icon={icons.home}
                                title="Home"
                            />
                        </>
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <>
                            <TabIcon
                                focused={focused}
                                icon={icons.search}
                                title="Search"
                            />
                        </>
                    )
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <>
                            <TabIcon
                                focused={focused}
                                icon={icons.save}
                                title="Saved"
                            />
                        </>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <>
                            <TabIcon
                                focused={focused}
                                icon={icons.person}
                                title="Profile"
                            />
                        </>
                    )
                }}
            />

        </Tabs>
    )
}

export default _Layout;

// import React from 'react';
// import { View, Text, Image, ImageBackground, StatusBar } from 'react-native';
// import { Tabs } from "expo-router";
// import { icons } from "@/constants/icons";
// import { images } from "@/constants/images";
//
// const TabIcon = ({ focused, icon, title }: any) => {
//     if (focused) {
//         return (
//             <ImageBackground
//                 source={images.highlight}
//                 className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
//             >
//                 <Image source={icon} tintColor="#151312" className="size-5" />
//                 <Text className="text-secondary text-base font-semibold ml-4">{title}</Text>
//             </ImageBackground>
//         );
//     }
//     return (
//         <View className="size-full justify-center items-center mt-4 rounded-full">
//             <Image source={icon} tintColor="#ABB5DB" className="size-5" />
//         </View>
//     );
// };
//
// const _Layout = () => {
//     return (
//         <>
//             {/* 🟣 Custom StatusBar */}
//             <StatusBar
//                 barStyle="light-content"   // White icons for dark background
//                 backgroundColor="#0f0D23"  // Matches your tab background
//                 translucent={false}        // Keeps layout safe
//             />
//
//             <Tabs
//                 screenOptions={{
//                     tabBarShowLabel: false,
//                     tabBarItemStyle: {
//                         width: '100%',
//                         height: '100%',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     },
//                     tabBarStyle: {
//                         backgroundColor: '#0f0D23',
//                         borderRadius: 50,
//                         marginHorizontal: 10,
//                         marginBottom: 35,
//                         height: 52,
//                         position: 'absolute',
//                         overflow: 'hidden',
//                         borderWidth: 1,
//                         borderColor: '#0f0D23'
//                     },
//                 }}
//             >
//                 <Tabs.Screen
//                     name="index"
//                     options={{
//                         title: 'Home',
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <TabIcon focused={focused} icon={icons.home} title="Home" />
//                         ),
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="search"
//                     options={{
//                         title: 'Search',
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <TabIcon focused={focused} icon={icons.search} title="Search" />
//                         ),
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="saved"
//                     options={{
//                         title: 'Saved',
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <TabIcon focused={focused} icon={icons.save} title="Saved" />
//                         ),
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="profile"
//                     options={{
//                         title: 'Profile',
//                         headerShown: false,
//                         tabBarIcon: ({ focused }) => (
//                             <TabIcon focused={focused} icon={icons.person} title="Profile" />
//                         ),
//                     }}
//                 />
//             </Tabs>
//         </>
//     );
// };
//
// export default _Layout;

