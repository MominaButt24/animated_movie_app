// app/((auth))/_layout.tsx
import { Slot } from "expo-router";
import {StatusBar} from "react-native";
export default function AuthLayout() {
    <StatusBar hidden />
    return <Slot />;
}
