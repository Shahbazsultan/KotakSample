import AsyncStorage from "@react-native-async-storage/async-storage";

export const Storage = {

    getItem: async function (key) {
        let item = await AsyncStorage.getItem(key);
        //You'd want to error check for failed JSON parsing...
        return item;
    },
    setItem: async function (key, value) {
        return await AsyncStorage.setItem(key, value);
    },
    removeItem: async function (key) {
        return await AsyncStorage.removeItem(key);
    }
};
