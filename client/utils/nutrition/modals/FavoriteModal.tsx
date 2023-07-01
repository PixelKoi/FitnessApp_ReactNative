// Favorites Modal
import React from "react";
import { Card, Modal, Portal } from "react-native-paper";
import { Animated, Dimensions, FlatList, Text, View } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import Swipeable from "react-native-gesture-handler/Swipeable";

const FavoritesModal = React.memo(
  ({
    isModalVisible,
    closeFavoriteModal,
    handleFavoritePress,
    favorites,
    primary_color,
    secondary_color,
  }) => {
    const leftSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: "clamp",
      });

      return (
        <View
          style={{ backgroundColor: primary_color, justifyContent: "center" }}
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
        </View>
      );
    };
    return (
      <Portal>
        <Modal
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
                marginTop: 24,
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
                onPress={handleFavoritePress}
                style={{ paddingRight: 16 }}
              />
            </View>
            {/* Favorite Modal Body with ScrollView */}
            <View className="">
              <FlatList
                style={{
                  height: Dimensions.get("window").height * 0.45,
                  padding: 10,
                }}
                indicatorStyle="black"
                className="pt-8"
                data={favorites}
                keyExtractor={(item) => item.fav_id.toString()}
                renderItem={({ item, index }) => (
                  <View key={item.fav_id} className="p-1">
                    <Swipeable renderRightActions={leftSwipe}>
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
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
);

export default FavoritesModal;
