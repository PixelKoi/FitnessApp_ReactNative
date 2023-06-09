import { useState, useEffect } from "react";

// supabase AUTH
import { supabase } from "./utils/supabase_authentication/supabase";
import Auth from "./screens/account/Auth";
import { Session } from "@supabase/supabase-js";
import { View } from "react-native";

// REDUX toolkit
import { store, persistor } from "./redux-manager/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

//navigation
import Navigation from "./components/navigation/Navigation";

// Watermelon
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { database } from "./database/index";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {session && session.user ? (
        <DatabaseProvider database={database}>
          <Provider key={session.user.id} store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Navigation session={session} />
            </PersistGate>
          </Provider>
        </DatabaseProvider>
      ) : (
        <View>
          <Auth />
        </View>
      )}
    </>
  );
}
