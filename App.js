import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AsyncStorage } from "react-native";

import SearchRecipeScreen from "./screens/SearchRecipeScreen";
import NavBar from "./navigation/NavBar";
// REACT NAVIGATOR
import { createAppContainer } from "@react-navigation/bottom-tabs";
import MainStackNavigator from "./navigation/MainStackNavigator";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
// REDUX
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import recipeReducer from "./store/reducers/recipeReducer";
import cartReducer from "./store/reducers/cartReducer";
import favouritesReducer from "./store/reducers/favouritesReducer";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const rootReducer = combineReducers({
  recipe: recipeReducer,
  cart: cartReducer,
  favourites: favouritesReducer,
});

const persistConfig = {
  key: "root",
  blacklist: ["recipe"],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {/* <View style={styles.container}> */}
        <BottomTabNavigator />
        {/* </View> */}
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
