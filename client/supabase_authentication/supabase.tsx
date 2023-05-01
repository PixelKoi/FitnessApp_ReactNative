import * as SecureStore from "expo-secure-store";
import { createClient } from '@supabase/supabase-js'
import {SUPABASE_KEY, SUPABASE_URL} from "../config";
import 'react-native-url-polyfill/auto'

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

const supabaseUrl = SUPABASE_URL
const supabaseAnonKey = SUPABASE_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})