// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { account } from '@/services/appwrite';
// import { signIn, signOut } from '@/services/auth';
// import { LinearGradient } from 'expo-linear-gradient';
// import { FontAwesome } from '@expo/vector-icons';
//
// export default function SignIn() {
//     const router = useRouter();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//
//     const handleSignIn = async () => {
//         setLoading(true);
//         try {
//             const user = await account.get().catch(() => null);
//             if (user) await signOut();
//             await signIn(email, password);
//             router.replace('/');
//         } catch (error) {
//             alert('Login failed. Check credentials.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <SafeAreaView style={styles.container}>
//             {/* Logo & App Name */}
//             {/*<View style={styles.logoContainer}>*/}
//             {/*    <FontAwesome name="play-circle" size={40} color="#AB8BFF" />*/}
//             {/*    <Text style={styles.logoText}>MovieApp</Text>*/}
//             {/*</View>*/}
//
//             {/* Sign In Card */}
//             <LinearGradient colors={['#5C4DFF', '#8F6BFF']} style={styles.card}>
//                 <Text style={styles.title}>Welcome Back 👋</Text>
//                 <Text style={styles.subtitle}>Sign in to continue</Text>
//
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Email"
//                     placeholderTextColor="#E0D4FF"
//                     value={email}
//                     onChangeText={setEmail}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Password"
//                     placeholderTextColor="#E0D4FF"
//                     secureTextEntry
//                     value={password}
//                     onChangeText={setPassword}
//                 />
//
//                 <TouchableOpacity
//                     style={styles.buttonContainer}
//                     onPress={handleSignIn}
//                     disabled={loading}
//                 >
//                     <LinearGradient
//                         colors={['#AB8BFF', '#8F6BFF']}
//                         style={styles.button}
//                     >
//                         <Text style={styles.buttonText}>
//                             {loading ? 'Signing in...' : 'Sign In'}
//                         </Text>
//                     </LinearGradient>
//                 </TouchableOpacity>
//
//                 <Text style={styles.footer}>
//                     Don’t have an account?{' '}
//                     <Text style={styles.link} onPress={() => router.push('/(auth)/signup')}>
//                         Sign Up
//                     </Text>
//                 </Text>
//             </LinearGradient>
//         </SafeAreaView>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         height: '100%',
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center'
//     },
//     logoContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 40,
//         marginBottom: 20
//     },
//     logoText: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#AB8BFF',
//         marginLeft: 8
//     },
//     card: {
//         width: '100%',
//         padding: 20,
//         borderRadius: 20,
//         shadowColor: '#000',
//         shadowOpacity: 0.2,
//         shadowRadius: 10,
//         elevation: 6
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginBottom: 4
//     },
//     subtitle: {
//         color: '#E0D4FF',
//         marginBottom: 20
//     },
//     input: {
//         backgroundColor: 'rgba(255,255,255,0.15)',
//         color: '#fff',
//         borderRadius: 12,
//         paddingHorizontal: 12,
//         paddingVertical: 10,
//         marginBottom: 15
//     },
//     buttonContainer: {
//         marginTop: 10
//     },
//     button: {
//         paddingVertical: 12,
//         borderRadius: 12,
//         alignItems: 'center'
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16
//     },
//     footer: {
//         textAlign: 'center',
//         color: '#fff',
//         marginTop: 15
//     },
//     link: {
//         fontWeight: 'bold',
//         color: '#fff'
//     }
// });
//0000000000000000000000000000000

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signIn, signUp, signOut } from '@/services/auth';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false); // 🔄 Toggle mode
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        if (isSignup && password !== confirmPassword) {
            Alert.alert('❌ Error', 'Passwords do not match!');
            return;
        }
        setLoading(true);
        try {
            if (isSignup) {
                await signUp(email, password);
                Alert.alert('✅ Success', 'Account created!');
                setIsSignup(false); // Switch to sign in
            } else {
                await signOut().catch(() => {}); // Ensure no session conflict
                await signIn(email, password);
                router.replace('/');
            }
        } catch (err: any) {
            Alert.alert('❌ Failed', err?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    {isSignup ? 'Create Account' : 'Welcome Back 👋'}
                </Text>
                <Text style={styles.subtitle}>
                    {isSignup ? 'Sign up to get started' : 'Sign in to continue'}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#E0D4FF"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#E0D4FF"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {isSignup && (
                    <TextInput
                        style={styles.input}
                        placeholder="Re-enter Password"
                        placeholderTextColor="#E0D4FF"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                )}

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleAuth}
                    disabled={loading}
                >
                    <LinearGradient
                        colors={['#AB8BFF', '#8F6BFF']}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? (isSignup ? 'Signing up...' : 'Signing in...') : isSignup ? 'Sign Up' : 'Sign In'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.footer}>
                    {isSignup ? 'Already have an account? ' : "Don’t have an account? "}
                    <Text
                        style={styles.link}
                        onPress={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     // backgroundColor: '#030014',
    //     backgroundColor: 'transparent',
    //
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: '100%',
    //     height: '100%',
    // },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        shadowColor: '#AB8BFF',
        shadowOffset: { width: 0, height: 0 },
        borderRadius: 20,
        shadowOpacity: 0.2,
        shadowRadius: 20, // Glow spread
        elevation: 10, // Android glow
    },

    card: {
        width: '97%',
        padding: 20,
        borderRadius: 40,
        // shadowColor: '#000',
        // shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4
    },
    subtitle: {
        color: '#E0D4FF',
        marginBottom: 20
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 15
    },
    buttonContainer: {
        marginTop: 10
    },
    button: {
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    footer: {
        textAlign: 'center',
        color: '#fff',
        marginTop: 15
    },
    link: {
        fontWeight: 'bold',
        color: '#fff'
    }
});

