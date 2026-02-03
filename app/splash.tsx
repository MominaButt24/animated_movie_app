import React, { useEffect } from 'react';
import {View, StyleSheet, Dimensions, Text, Image, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import {icons} from "@/assets/icons";
import MaskedView from '@react-native-masked-view/masked-view';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSequence
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import SignIn from './(auth)/signin';
import {icons} from "@/constants/icons";

const { width, height } = Dimensions.get('window');

export default function CameraSplash() {
    const iconScale = useSharedValue(1);
    const iconOpacity = useSharedValue(1);
    const iconTranslateX = useSharedValue(0);
    const iconTranslateY = useSharedValue(0);

    const rippleScale = useSharedValue(0.5);
    const rippleOpacity = useSharedValue(0);

    const textOpacity = useSharedValue(0);

    const signinOpacity = useSharedValue(0);

    useEffect(() => {
        // Step 1: Logo pop
        iconScale.value = withSequence(
            withTiming(1.2, { duration: 700 }),
            withTiming(1, { duration: 400 })
        );
        iconOpacity.value = withTiming(1, { duration: 1000 });

        // Step 2: Ripple starts after 1s
        rippleScale.value = withDelay(1000, withTiming(5, { duration: 2200 }));
        rippleOpacity.value = withDelay(1000, withTiming(1, { duration: 2000 }));

        // Step 3: Icon moves left after ripple
        iconTranslateX.value = withDelay(3200, withTiming(-80, { duration: 800 }));

        // Step 4: Text appears
        textOpacity.value = withDelay(3500, withTiming(1, { duration: 1000 }));

        // Step 5: After 1.4s of text on screen → Move both up
        iconTranslateY.value = withDelay(
            4900, // 3.5s + 1s text fade + 1.4s wait
            withTiming(-height / 3, { duration: 800 })
        );

        // Step 6: Sign-in screen fades in
        signinOpacity.value = withDelay(
            5000,
            withTiming(1, { duration: 800 })
        );

        // // Step 7: Call onFinish (optional, if SignIn inside splash)
        // const timer = setTimeout(() => {
        //     onFinish?.();
        // }, 6000);
        //
        // return () => clearTimeout(timer);
    }, []);

    const iconStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: iconScale.value },
            { translateX: iconTranslateX.value },
            { translateY: iconTranslateY.value }
        ],
        opacity: iconOpacity.value
    }));

    const rippleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: rippleScale.value }],
        opacity: rippleOpacity.value
    }));

    const textStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateY: iconTranslateY.value }]
    }));

    const signinStyle = useAnimatedStyle(() => ({
        opacity: signinOpacity.value
    }));

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <Animated.View style={[styles.ripple, rippleStyle]} />

            <Animated.View style={iconStyle}>
                {/*<FontAwesome name="play-circle" size={80} color="#AB8BFF" />*/}
                        {/*source={require('@/assets/logo.png')} // Put your logo in assets*/}
                <Image
                    source={require('../assets/icons/logo3.png')}
                    style={{ width: 150, height: 150, resizeMode: 'contain'}}
                />



            </Animated.View>

            <Animated.View style={[styles.textContainer, textStyle]}>
                {/*<Text style={styles.appName}>Animatica</Text>*/}
                <MaskedView
                    maskElement={
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.appName, { backgroundColor: 'transparent' }]}>
                                Animatica
                            </Text>
                        </View>
                    }
                >
                    <LinearGradient
                        colors={['#AB8BFF', '#8F6BFF', '#FF4BC9']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: width*0.4, // Make sure gradient covers text width
                            height: 50, // Same height as text
                        }}
                    />
                </MaskedView>

            </Animated.View>

            {/* SignIn appearing below */}
            <Animated.View style={[styles.signinContainer, signinStyle]}>
                {/*<Text style={{ color: '#fff', fontSize: 20 }}>SignIn Screen Here</Text>*/}
                <SignIn />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    ripple: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#030014'
    },
    textContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        left: (width / 2) - 50, // Adjusted for longer text
        backgroundColor: 'transparent', // No box, just text
    },

    appName: {
        fontSize: 34,
        fontWeight: '900',
        fontFamily: 'Poppins-Bold', // Load from expo-font
        textShadowColor: 'rgba(171, 139, 255, 0.8)', // Purple glow
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 12,
        color: '#fff', // Fallback if gradient not loaded
    },

    signinContainer: {
        width: width * 0.9, // 90% of screen width
        //height: height * 0.9,
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }

});
