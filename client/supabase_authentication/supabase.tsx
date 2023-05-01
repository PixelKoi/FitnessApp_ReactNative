import * as SecureStore from "expo-secure-store";
import { createClient } from '@supabase/supabase-js'
import { Platform } from 'react-native';
import {SUPABASE_KEY, SUPABASE_URL} from "../config";
import { setupURLPolyfill } from 'react-native-url-polyfill'
if(Platform.OS !=='web'){
    setupURLPolyfill()
}

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    },
};


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})