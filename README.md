# Animated Movie App 🎬

A modern, high-performance movie discovery application built with **React Native**, **Expo**, and **Appwrite**. This app features smooth animations, a beautiful UI powered by NativeWind, and a robust backend integration for user profiles and saved movies.

## 🚀 Features

- **Movie Discovery**: Explore trending, popular, and top-rated movies.
- **Rich UI/UX**: Smooth animations using `react-native-reanimated` and `lucide-react-native` icons.
- **Dynamic Routing**: Leveraging `expo-router` for seamless navigation.
- **User Authentication & Database**: Powered by **Appwrite** for managing user profiles, saved movies, and ratings.
- **Styling**: Utility-first styling with **NativeWind** (Tailwind CSS for React Native).
- **Glassmorphism**: Beautiful blur effects using `expo-blur`.
- **Image Optimization**: Fast image loading with `expo-image`.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: [NativeWind](https://www.nativewind.dev/)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Backend**: [Appwrite](https://appwrite.io/)
- **Icons**: [Lucide React Native](https://lucide.dev/) & Expo Vector Icons
- **Language**: TypeScript

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo Go app on your mobile device or an emulator (Android Studio / Xcode)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd animated_movie_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your credentials (refer to `.env.example` if available or use the following template):
   ```env
   EXPO_PUBLIC_MOVIE_API_KEY=your_movie_api_key
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_db_id
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
   # Add other collection IDs as needed
   ```

### Running the App

Start the development server:

```bash
npx expo start
```

- Press **`a`** for Android
- Press **`i`** for iOS
- Press **`w`** for Web
- Scan the QR code with **Expo Go** to run on a physical device.

## 📂 Project Structure

- `app/`: Contains the main application routes (Expo Router).
- `components/`: Reusable UI components.
- `constants/`: Theme colors, API endpoints, and static data.
- `interfaces/`: TypeScript type definitions.
- `assets/`: Images, fonts, and local media.

## 📄 License

This project is licensed under the MIT License.
