import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
} from "react-native";
import { USDA_API_KEY } from "../../config";
import {
  CheckCircleIcon,
  HeartIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { HeartIcon as FilledHeartIcon } from "react-native-heroicons/solid";
// import {handleMinus, handlePlus} from "../../counter/logCounter";
import { params } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import {
  Dialog,
  Modal,
  Button,
  Card,
  Menu,
  Provider,
  Portal,
} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import { StyleSheet } from "react-native";
import { addFavorite } from "../../redux-manager/redux-slice/favorite-slice";
import { setTheme } from "../../redux-manager/redux-slice/theme-slice";
import { useAppSelector, useAppDispatch } from "../../redux-manager/hooks";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureDetector } from "react-native-gesture-handler";
import { RectButton } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 4,
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
  searchInput: {
    flex: 1,
    marginRight: 4,
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "blue",
    alignSelf: "center",
  },
});

// TODO: Add delete color to bubble_gum theme?

const Nutrition: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useAppSelector((state) => state.theme);
  console.log("colors:", colors.primary);
  // ACCESS THEME COLORS
  // const primary_color = colors.primary;
  let primary_color = colors.primary;
  let secondary_color = colors.secondary;
  let background = colors.background;
  // ENDOF THEME COLORS
  const { favorites } = useAppSelector((state) => state.favorite);
  console.log("VALUES", favorites);
  function updateFavoriteList(data) {
    const favoriteItem = {
      Calories: data.food.Calories,
      Carbs: data.food.Carbs,
      Fat: data.food.Fat,
      Protein: data.food.Protein,
      description: data.food.description,
      id: data.id,
    };
    console.log("DISPATCH", favoriteItem);
    dispatch(addFavorite(favoriteItem));
  }

  const handleFavoriteToggle = (index, array) => {
    const updatedSelectedHearts = [...selectedHearts];
    updatedSelectedHearts[index] = !updatedSelectedHearts[index];
    setSelectedHearts(updatedSelectedHearts);
    updateFavoriteList(array[index]);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleFavoritePress = () => {
    setIsModalVisible(!isModalVisible);
  };

  const tabNavigation = useNavigation();
  const [foodName, setFoodName] = useState("");
  const [foodArray, setFoodArray] = useState([]);
  const [saveButton, setSaveButton] = useState(false);
  const [selectedHearts, setSelectedHearts] = useState([]);

  const [favoritesList, setFavoritesList] = useState(true);

  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [mealError, setMealError] = useState(false);
  // let redux-slice submit quick log when state selectedOption set
  const checkOption = useCallback(() => {
    if (selectedOption.length > 0) {
      setSaveButton(true);
    } else if (selectedOption.length == 0) {
      showErrorDialog();
    }
  }, [selectedOption, handleOptionSelect]);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setVisible(false);
  };

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <View
        className=""
        style={{ backgroundColor: "#E691A9", justifyContent: "center" }}
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

  const clearTextInput = () => {
    setFoodName(""); // Clear the TextInput value
  };
  React.useLayoutEffect(() => {
    tabNavigation.setOptions({
      title: "Nutrition",
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={handleFavoritePress}>
            <Icon
              name="heart"
              color={primary_color}
              size={24}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        // <TouchableOpacity onPress={() => setSaveButton(true)}>
        <View>
          <TouchableOpacity onPress={() => checkOption()}>
            <AntIcon
              name="pluscircle"
              size={24}
              color={primary_color}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [checkOption, primary_color]);
  const showErrorDialog = () => {
    setMealError(true);
  };
  const hideErrorDialog = () => setMealError(false);

  // convert to RTK: https://redux-toolkit.js.org/rtk-query/overview#configure-the-store
  // Simple Query testing API: https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=Cheddar%20Cheese
  const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}&api_key=${params.api_key}&dataType=${params.dataType}`;
  const handleSearch = async () => {
    setFavoritesList(false);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      let food = data.foods;
      let tempArray = [];
      food.forEach((item) => {
        const foodLog = {
          quantity: 0,
          isSelected: false,
          id: item.fdcId,
          food: {
            description: item.description,
            Protein: item.foodNutrients[0].value,
            Fat: item.foodNutrients[1].value,
            Carbs: item.foodNutrients[2].value,
            Calories: item.foodNutrients[3].value,
          },
        };
        tempArray.push(foodLog);
      });
      setFoodArray(tempArray);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePlus = (foodArray, index) => {
    const updatedFoodArray = [...foodArray];
    const updatedFood = { ...updatedFoodArray[index] };
    if (updatedFood.quantity < 20) {
      updatedFood.quantity += 1;
      updatedFoodArray[index] = updatedFood;
      setFoodArray(updatedFoodArray);
    }
  };

  const handleMinus = (foodArray, index) => {
    const updatedFoodArray = [...foodArray];
    const updatedFood = { ...updatedFoodArray[index] };
    if (updatedFood.quantity > 0) {
      updatedFood.quantity -= 1;
      updatedFoodArray[index] = updatedFood;
      setFoodArray(updatedFoodArray);
    }
  };

  useEffect(() => {
    if (saveButton) {
      saveToDiary();
    }
  }, [saveButton]);
  // Update selectedHearts when foodArray changes
  useEffect(() => {
    setSelectedHearts(Array(foodArray.length).fill(false));
  }, [foodArray]);
  const saveToDiary = () => {
    const selectedFoods = foodArray.filter((food) => food.quantity > 0);
    // console.log("Selected FOODS: ", selectedFoods);
    setSaveButton(false);
    tabNavigation.navigate("Diary", { selectedFoods, selectedOption });
  };

  const handleInputChange = (text, food) => {};
  const renderFoodItem = (food, index, foodArray) => {
    // only create objects when the component renders
    // console.log("food.quantity", food.quantity, index);
    // console.log("STATE", foodArray);
    return (
      <View className="p-2 ">
        <Card>
          <Card.Content>
            <View className="flex flex-row items-center mt-0">
              <View className="flex flex-col">
                <Text style={{ color: primary_color }} className="font-bold">
                  {food.food.description}
                </Text>
                <Text style={{ color: primary_color }}>
                  {food.food.Protein}g Protein
                </Text>
                <Text style={{ color: primary_color }}>
                  {food.food.Fat}g Fat
                </Text>
                <Text style={{ color: primary_color }}>
                  {food.food.Carbs}g Carbs
                </Text>
                <Text style={{ color: primary_color }} className="font-bold">
                  {food.food.Calories} Calories
                </Text>
              </View>

              <View className="flex flex-col ml-auto">
                <TouchableOpacity
                  onPress={() => handlePlus(foodArray, index)}
                  className="rounded-full p-2"
                >
                  <ChevronUpIcon size={24} color={primary_color} />
                </TouchableOpacity>
                <TextInput
                  value={food.quantity.toString()}
                  onChangeText={(text) => handleInputChange(text, food)}
                  keyboardType="numeric"
                  className="rounded"
                  style={{
                    color: primary_color,
                    textAlign: "center",
                  }}
                />
                <TouchableOpacity
                  onPress={() => handleMinus(foodArray, index)}
                  className="rounded-full p-2"
                >
                  <ChevronDownIcon size={24} color={primary_color} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFavoriteToggle(index, foodArray)}
                  className="rounded-full p-2 text-primary"
                >
                  {selectedHearts[index] ? (
                    <FilledHeartIcon size={24} color={primary_color} />
                  ) : (
                    <HeartIcon size={24} color={primary_color} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };
  return (
    <Provider>
      <View className="flex-1">
        <Portal>
          <Modal
            className="m-8 overflow-hidden"
            visible={isModalVisible}
            animationType="fade"
          >
            <View className="flex flex-col items-center justify-start h-full bg-white rounded-3xl">
              <View className="flex items-center justify-center mt-4 py-4">
                <Text
                  className="text-center text-2xl font-bold"
                  style={{ color: primary_color }}
                >
                  Favorites
                </Text>
              </View>
              <View className="absolute top-0 right-0 p-4">
                <AntIcon
                  name="closecircle"
                  color={primary_color}
                  size={24}
                  onPress={handleFavoritePress}
                />
              </View>
              {/*Favorite Modal Body with scrollview */}
              <View className="">
                {favorites.length > 0 ? (
                  <FlatList
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
                                  style={{ color: primary_color }}
                                  className="font-bold"
                                  variant="titleLarge"
                                >
                                  <Text>{item.description}</Text>
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
                  <View></View>
                )}
              </View>
            </View>
          </Modal>
        </Portal>
        <Portal>
          <Dialog visible={mealError} onDismiss={hideErrorDialog}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Text style={{ color: primary_color }} variant="bodyMedium">
                Please Select what meal you are entering
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideErrorDialog}>I understand</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={styles.container}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <View className="flex flex-row justify-center align-middle px-4">
                <TouchableOpacity onPress={openMenu}>
                  <Text
                    style={{ color: primary_color }}
                    className="font-bold px-2"
                  >
                    {selectedOption || "Select a meal"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openMenu}>
                  <ChevronDownIcon size={18} color={primary_color} />
                </TouchableOpacity>
              </View>
            }
          >
            <Menu.Item
              color={primary_color}
              onPress={() => handleOptionSelect("Breakfast")}
              title="Breakfast"
            />
            <Menu.Item
              color={primary_color}
              onPress={() => handleOptionSelect("Lunch")}
              title="Lunch"
            />
            <Menu.Item
              color={primary_color}
              onPress={() => handleOptionSelect("Dinner")}
              title="Dinner"
            />
            <Menu.Item
              color={primary_color}
              onPress={() => handleOptionSelect("Snacks")}
              title="Snacks"
            />
          </Menu>
          <TextInput
            style={styles.searchInput}
            value={foodName}
            onChangeText={setFoodName}
            placeholder="Search Food"
          />
          {foodName.length > 0 && (
            <TouchableOpacity
              onPress={clearTextInput}
              style={styles.clearButton}
            >
              <XCircleIcon size={24} color={primary_color} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="mt-3 mb-3 py-1 mx-4"
            onPress={handleSearch}
          >
            <MagnifyingGlassIcon color={primary_color}></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            buttonColor={primary_color}
            onPress={() => {
              dispatch(setTheme("green_light"));
            }}
          >
            THEME CHANGER
          </Button>
        </View>
        <FlatList
          data={foodArray}
          renderItem={({ item, index }) =>
            renderFoodItem(item, index, foodArray)
          }
          keyExtractor={(item) => item.id.toString()}
        />
        {favoritesList && (
          <Card className="h-2/5 rounded-3xl m-3 overflow-hidden">
            <Card.Content className="">
              <Text
                style={{ color: primary_color }}
                className="font-bold pl-4 pb-2 text-xl"
              >
                Favorites
              </Text>
              {favorites.length > 0 ? (
                <FlatList
                  data={favorites}
                  keyExtractor={(item) => item.fav_id.toString()}
                  renderItem={({ item: favorite }) => (
                    <View key={favorite.fav_id} className="p-2 pt-3">
                      <View className="flex flex-row  mt-0">
                        <View className="flex flex-col">
                          <Card.Content>
                            <Text
                              style={{ color: primary_color }}
                              className="font-extrabold"
                              variant="titleLarge"
                            >
                              {favorite.description}
                            </Text>
                            <Text style={{ color: primary_color }}>
                              Calories: {favorite.Calories}
                            </Text>
                          </Card.Content>
                        </View>
                        <View className="flex flex-col ml-auto">
                          <PlusCircleIcon color={primary_color} />
                        </View>
                      </View>
                    </View>
                  )}
                />
              ) : (
                <View>
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
            </Card.Content>
          </Card>
        )}
      </View>
    </Provider>
  );
};

export default Nutrition;
