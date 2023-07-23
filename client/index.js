import { registerRootComponent } from "expo";
import TrackPlayer from "react-native-track-player";
import { playbackService } from "./musicPlayerServices";
import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the redux-manager in Expo Go or in a native build,
// the environment is set up appropriately

// AppRegistry.registerComponent(...);

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => playbackService);
