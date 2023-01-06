import { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { store } from "./src/redux/store";
import { Main } from "./src/components";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main onLayoutRootView={onLayoutRootView} />
      <Toast topOffset={60} />
    </Provider>
  );
};

export default App;
