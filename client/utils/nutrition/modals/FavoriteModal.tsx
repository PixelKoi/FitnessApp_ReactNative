// Favorites Modal
import React from "react";
import { Card, Modal, Portal } from "react-native-paper";
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { removeFavorite } from "../../../redux-manager/redux-slice/favorite-slice";
import { useAppSelector, useAppDispatch } from "../../../redux-manager/hooks";

const FavoritesModal = React.memo(
  ({
    isModalVisible,
    closeFavoriteModal,
    favorites,
    primary_color,
    secondary_color,
  }) => {
    const dispatch = useAppDispatch();

    // Creating a higher-order function where outer function takes `item` from flatlist
    const leftSwipe = (item) => (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: "clamp",
      });

      return (
        <View
          style={{ backgroundColor: primary_color, justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(removeFavorite(item));
            }}
          >
            <Animated.Text
              className="items-start"
              style={{
                color: "white",
                paddingHorizontal: 20,
                fontWeight: "600",
                transform: [{ scale }],
              }}
            >
              Delete
            </Animated.Text>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <Portal>
        <Modal
          dismissable={false}
          theme={{
            colors: { backdrop: "transparent" },
          }}
          style={{
            flex: 1,
            zIndex: 10,
            position: "absolute",
            top: -60,
            left: 0,
            right: 0,
            overflow: "hidden",
            backgroundColor: "white",
            height: Dimensions.get("window").height * 0.45,
            borderRadius: 20,
            margin: 12,
          }}
          visible={isModalVisible}
          animationType="none"
          onDismiss={closeFavoriteModal}
        >
          <View className="" style={{ backgroundColor: secondary_color }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 30,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                  color: primary_color,
                  paddingLeft: 16,
                }}
              >
                Favorites
              </Text>
              <AntIcon
                name="closecircle"
                color={primary_color}
                size={24}
                onPress={closeFavoriteModal}
                style={{ paddingRight: 16 }}
              />
            </View>
            {/* Favorite Modal Body with ScrollView */}
            {favorites.length > 0 ? (
              <FlatList
                style={{
                  height: Dimensions.get("window").height * 0.4,
                  padding: 10,
                }}
                indicatorStyle="black"
                data={favorites}
                keyExtractor={(item) => item.fav_id.toString()}
                renderItem={({ item, index }) => (
                  <View key={item.fav_id} className="p-1">
                    <Swipeable renderRightActions={leftSwipe(item)}>
                      <View className="flex flex-row mt-0">
                        <View className="flex flex-col">
                          <Card.Content>
                            <Text
                              style={{
                                color: primary_color,
                                fontWeight: "bold", // Changed className to fontWeight
                              }}
                            >
                              {item.description}
                            </Text>
                            <Text style={{ color: primary_color }}>
                              Calories: {item.Calories}
                            </Text>
                          </Card.Content>
                        </View>
                      </View>
                      {index !== favorites.length - 1 && (
                        <View
                          className="mx-4"
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: secondary_color,
                          }}
                        />
                      )}
                    </Swipeable>
                  </View>
                )}
              />
            ) : (
              <View
                style={{
                  height: Dimensions.get("window").height * 0.4,
                  padding: 10,
                }}
              >
                <Text
                  style={{ color: primary_color }}
                  className="pt-4 pl-4 capitalize"
                  variant="titleLarge"
                >
                  No favorite selected
                </Text>
                <Text
                  style={{ color: primary_color }}
                  className="pt-4 pl-4 italic"
                  variant="bodyMedium"
                >
                  Please heart a food option to display here for quick
                  selections.
                </Text>
              </View>
            )}
          </View>
        </Modal>
      </Portal>
    );
  }
);

export default FavoritesModal;
