import { Stack, useNavigation } from "expo-router";
import CustomHeader from "@/Components/CustomHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

import {
  // Import the creation function
  createStackNavigator,
  // Import the types
  StackNavigationOptions,
} from "@react-navigation/stack";

import { withLayoutContext } from "expo-router";

const { Navigator } = createStackNavigator();

// https://github.com/expo/router/issues/640#issuecomment-1626767444
// This can be used like `<JsStack />`
export const JsStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator
>(Navigator);
import { TransitionPresets } from "@react-navigation/stack";

export default function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <BottomSheetModalProvider>
      {Platform.OS === "android" ? (
        <JsStack>
          <JsStack.Screen
            name="index"
            options={{
              header: () => <CustomHeader />,
            }}
          />
          <JsStack.Screen
            name="(modal)/filter"
            options={{
              ...TransitionPresets.ModalPresentationIOS,
              presentation: "modal",
              headerTitle: "Filter",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    style={{
                      marginLeft: 15,
                    }}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Ionicons
                      name="close-outline"
                      size={28}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
        </JsStack>
      ) : (
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              header: () => <CustomHeader />,
            }}
          />
          <Stack.Screen
            name="(modal)/filter"
            options={{
              presentation: "modal",
              headerTitle: "Filter",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Ionicons
                      name="close-outline"
                      size={28}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
        </Stack>
      )}
    </BottomSheetModalProvider>
  );
}
