// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import { Ionicons } from "react-native-vector-icons";
// import MyOrderScreen from "./src/screens/MyOrderScreen";
// import { MenuScreen } from "./src/screens/MenuScreen";
// import { HomeScreen } from "./src/screens/HomeScreen";
// import OrderScreen from "./src/screens/OrderScreen";
// import { Entypo } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native";
// import { theme } from "./theme";

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: { backgroundColor: "red" },
//           tabBarActiveTintColor: "blue",
//           tabBarInactiveTintColor: "white",
//         }}
//       >
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarIcon: ({ size }) => (
//               <Ionicons name="home" size={size} color="white" />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Menu"
//           component={MenuScreen}
//           options={{
//             tabBarIcon: ({ size }) => (
//               <Ionicons name="restaurant-sharp" size={size} color="white" />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Myorder"
//           component={MyOrderScreen}
//           options={({ navigation }) => ({
//             tabBarIcon: ({ size }) => (
//               <Entypo name="shopping-cart" size={size} color="white" />
//             ),
//             headerShown: true,
//             headerTitle: "My Orders",
//             headerTitleAlign: "center",
//             headerTitleStyle: {
//               fontSize: theme.fontSizes.xxl,
//               fontWeight: "bold",
//             },
//             headerTransparent: true,

//             headerLeft: () => (
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("Menu")}
//                 style={{ marginLeft: 20 }}
//               >
//                 <Ionicons name="arrow-back-circle" size={40} color="red" />
//               </TouchableOpacity>
//             ),
//           })}
//         />
//         <Tab.Screen
//           name="Order"
//           component={OrderScreen}
//           options={({ navigation }) => ({
//             headerShown: true,
//             headerTitle: "",
//             headerTitleAlign: "center",
//             headerTransparent: true,

//             headerLeft: () => (
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("Menu")}
//                 style={{ marginLeft: 15 }}
//               >
//                 <Ionicons
//                   name="arrow-back-circle-sharp"
//                   size={40}
//                   color="red"
//                 />
//               </TouchableOpacity>
//             ),
//           })}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "react-native-vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { theme } from "./theme";
import MyOrderScreen from "./src/screens/MyOrderScreen";
import { MenuScreen } from "./src/screens/MenuScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import OrderScreen from "./src/screens/OrderScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MenuStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen
      name="Order"
      component={OrderScreen}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: "",
        headerTitleAlign: "center",
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="arrow-back-circle-sharp" size={40} color="red" />
          </TouchableOpacity>
        ),
      })}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "red" },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "white",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size }) => (
              <Ionicons name="home" size={size} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuStack} // Use MenuStack instead of MenuScreen
          options={{
            tabBarIcon: ({ size }) => (
              <Ionicons name="restaurant-sharp" size={size} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Myorder"
          component={MyOrderScreen}
          options={({ navigation }) => ({
            tabBarIcon: ({ size }) => (
              <Entypo name="shopping-cart" size={size} color="white" />
            ),
            headerShown: true,
            headerTitle: "My Orders",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: theme.fontSizes.xxl,
              fontWeight: "bold",
            },
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Menu")}
                style={{ marginLeft: 20 }}
              >
                <Ionicons name="arrow-back-circle" size={40} color="red" />
              </TouchableOpacity>
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
