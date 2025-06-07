import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import 'react-native-get-random-values';
import Header from './Components/header';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  return (
    <>
    <Header/>
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    />
   </>
  );
}
