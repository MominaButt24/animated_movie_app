// import { useState } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// import { signUp } from '@/services/auth';
//
//
// export default function SignUp() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const router = useRouter();
//
//     const handleSignUp = async () => {
//         try {
//             //await account.create(ID.unique(), email, password);
//             await signUp(email, password);
//             Alert.alert("Success", "Account created successfully!");
//             router.replace('/(auth)/signin'); // redirect to sign in
//         } catch (err) {
//             //Alert.alert("Error");
//             console.error("Signup error:", err);
//             Alert.alert("Signup failed", err?.message || "Unknown error");
//         }
//     };
//
//     return (
//         <View>
//             <Text>Email</Text>
//             <TextInput value={email} onChangeText={setEmail} />
//             <Text>Password</Text>
//             <TextInput value={password} onChangeText={setPassword} secureTextEntry />
//             <Button title="Sign Up" onPress={handleSignUp} />
//         </View>
//     );
// }
//00000000000000000000

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { signUp } from '@/services/auth';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignUp = async () => {
        console.log("✅ Sign Up button pressed"); // Debug log
        try {
            await signUp(email, password);
            Alert.alert("✅ Success", "Account created successfully!");
            router.replace('/(auth)/signin');
        } catch (err) {
            console.error("Signup error:", err);
            Alert.alert("❌ Signup failed", err?.message || "Unknown error");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Create Account</Text>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleSignUp} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/(auth)/signin')} style={{ marginTop: 15 }}>
                    <Text style={styles.link}>Already have an account? Sign In</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#764ba2',
        marginBottom: 20
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    button: {
        width: '100%',
        backgroundColor: '#764ba2',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 5,
        elevation: 3
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
    link: {
        color: '#764ba2',
        fontSize: 16,
        fontWeight: '500'
    }
});

