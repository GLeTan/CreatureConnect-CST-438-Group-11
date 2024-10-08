// import { Tabs } from 'expo-router';
// import React from 'react';

// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'LogIn',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'SignUp',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'key' : 'key-outline'} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//               name="settings"
//               options={{
//                 title: 'settings',
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
//                 ),
//               }}
//             />
//     </Tabs>
//   );
// }
