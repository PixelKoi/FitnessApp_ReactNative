import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import {
  HeartIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { HeartIcon as FilledHeartIcon } from "react-native-heroicons/solid";
import { params } from "../../../constants";
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
import FontIcon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet } from "react-native";
import { addFavorite } from "../../../redux-manager/redux-slice/favorite-slice";
import {
  addInventory,
  deleteInventory,
  reduceInventory,
} from "../../../redux-manager/redux-slice/nutrition-slice";
import { useAppSelector, useAppDispatch } from "../../../redux-manager/hooks";
import Swipeable from "react-native-gesture-handler/Swipeable";
import MealPicker from "../../../utils/nutrition/meal-picker/MealPicker";
import { BlurView } from "expo-blur";

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

const Nutrition: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useAppSelector((state) => state.theme);
  const { dailyCal } = useAppSelector((state) => state.user);
  console.log("PROFILE CALS: ", dailyCal);
  console.log("colors:", colors.primary);
  // ACCESS THEME COLORS
  // const primary_color = colors.primary;
  let primary_color = colors.primary;
  let secondary_color = colors.secondary;
  let background = colors.background;
  // ENDOF THEME COLORS

  // INVENTORY FOOD LIST
  const { inventory } = useAppSelector((state) => state.inventory);
  console.log("inventory: ", inventory);
  // FAVORITE FOOD LIST
  const { favorites } = useAppSelector((state) => state.favorite);
  // console.log("VALUES", favorites);
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
  const closeFavoriteModal = () => {
    setIsModalVisible(false);
  };

  // Food Inventory: Keeps track of food we plan on adding to the Diary
  const [foodInventory, setFoodInventory] = useState([]);
  const [foodInventoryCalories, setFoodInventoryCalories] = useState([]);

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

  const [selectedLanguage, setSelectedLanguage] = useState<string>("java");
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);

  const handleLanguageChange = (itemValue: string, itemIndex: number) => {
    setSelectedLanguage(itemValue);
    handleOptionSelect(itemValue);
    setTimeout(() => {
      if (itemValue != "select") handlePickerClose();
    }, 200); // Delay of 1000 milliseconds (1 second)
  };

  const handleIconPress = () => {
    setIsPickerVisible(true);
  };

  const handlePickerClose = () => {
    setIsPickerVisible(false);
  };

  const clearTextInput = () => {
    setFoodName(""); // Clear the TextInput value
  };
  React.useLayoutEffect(() => {
    tabNavigation.setOptions({
      title: "Nutrition",
      headerTintColor: primary_color,

      headerStyle: {
        shadowColor: "transparent",
      },
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
          <TouchableOpacity onPress={() => tabNavigation.navigate("Diary")}>
            <AntIcon
              name="book"
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
          description: item.description,
          Protein: item.foodNutrients[0].value,
          Fat: item.foodNutrients[1].value,
          Carbs: item.foodNutrients[2].value,
          Calories: item.foodNutrients[3].value,
        };
        tempArray.push(foodLog);
      });
      setFoodArray(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  const increment_inventory_item = (item) => {};

  const add_inventory_item = (foodArray, index) => {
    let data = foodArray[index];
    const updatedFoodArray = [...foodArray];
    const updatedFood = { ...updatedFoodArray[index] };
    if (updatedFood.quantity < 20) {
      updatedFood.quantity += 1;
      updatedFoodArray[index] = updatedFood;
      setFoodArray(updatedFoodArray);
      // console.log("updatedFoodArray: ", updatedFoodArray);
      let quantity = updatedFood.quantity;
      const InventoryItem = {
        Calories: data.food.Calories,
        Carbs: data.food.Carbs,
        Fat: data.food.Fat,
        Protein: data.food.Protein,
        description: data.food.description,
        id: data.id,
        quantity: quantity,
      };
      console.log("InventoryItem", InventoryItem);
      dispatch(addInventory(InventoryItem));
    }
  };
  useEffect(() => {
    let loggedFoods = inventory.filter((food) => food.quantity > 0);
    let inventory_calories = loggedFoods
      .map((item) => item.Calories * item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    setFoodInventoryCalories(inventory_calories);
  }, [inventory]);

  const handleMinus = (foodArray, index) => {
    let data = foodArray[index];
    const updatedFoodArray = [...foodArray];
    const updatedFood = { ...updatedFoodArray[index] };
    if (updatedFood.quantity > 0) {
      updatedFood.quantity -= 1;
      updatedFoodArray[index] = updatedFood;
      setFoodArray(updatedFoodArray);
      let quantity = updatedFood.quantity;
      const InventoryItem = {
        Calories: data.food.Calories,
        Carbs: data.food.Carbs,
        Fat: data.food.Fat,
        Protein: data.food.Protein,
        description: data.food.description,
        id: data.id,
        quantity: quantity,
      };
      console.log("REDUCE InventoryItem", InventoryItem);
      dispatch(reduceInventory(InventoryItem));
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
    return (
      <View className="mx-2 py-2 rounded-3xl">
        <Card>
          <Card.Content style={{ paddingVertical: 8 }}>
            <View className="flex flex-row items-center ">
              <View className="flex flex-col">
                <Text style={{ color: primary_color }} className="font-bold">
                  {food.description}
                </Text>
                <Text style={{ color: primary_color }}>
                  {food.Protein}g Protein
                </Text>
                <Text style={{ color: primary_color }}>{food.Fat}g Fat</Text>
                <Text style={{ color: primary_color }}>
                  {food.Carbs}g Carbs
                </Text>
                <Text style={{ color: primary_color }} className="font-bold">
                  {food.Calories} Calories
                </Text>
              </View>

              <View className="flex flex-col ml-auto">
                <TouchableOpacity
                  onPress={() => add_inventory_item(foodArray, index)}
                  className="px-2 pb-4"
                >
                  <AntIcon size={24} name="pluscircle" color={primary_color} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleFavoriteToggle(index, foodArray)}
                  className="rounded-full px-2 text-primary pt-1"
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
      <View className="flex-1 bg-white">
        <Portal>
          <Modal
            className="h-full"
            visible={isModalVisible}
            animationType="fade"
            onDismiss={closeFavoriteModal}
          >
            <View className="flex-col bg-white">
              <View className="py-4">
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
                <TouchableOpacity onPress={() => handleIconPress()}>
                  <Text
                    style={{ color: primary_color }}
                    className="font-bold px-2"
                  >
                    {selectedOption || "Select a meal"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleIconPress()}>
                  <ChevronDownIcon size={18} color={primary_color} />
                </TouchableOpacity>
              </View>
            }
          ></Menu>
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
        <FlatList
          data={foodArray}
          renderItem={({ item, index }) =>
            renderFoodItem(item, index, foodArray)
          }
          keyExtractor={(item) => item.id.toString()}
        />
        {favoritesList ? (
          <Card className="h-2/5 rounded-3xl m-3 overflow-hidden">
            <Card.Content className="">
              <Text
                style={{ color: primary_color }}
                className="font-bold pb-2 text-xl"
              >
                Favorites
              </Text>
              {favorites.length > 0 ? (
                <FlatList
                  indicatorStyle="black"
                  data={favorites}
                  keyExtractor={(item) => item.fav_id.toString()}
                  renderItem={({ item: favorite }) => (
                    <View key={favorite.fav_id} className="pt-3">
                      <View className="flex flex-row mt-0">
                        <View className="flex flex-col mr-8 pl-0">
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
        ) : (
          <Card
            className="rounded-3xl overflow-hidden"
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: primary_color,
            }}
          >
            <View>
              <Card.Content>
                {inventory.length > 0 ? (
                  // Code to be executed when foodInventory has items
                  <FlatList
                    style={{ maxHeight: 150 }}
                    indicatorStyle="white"
                    data={inventory}
                    renderItem={({ item }) => (
                      <View className="flex flex-row justify-between px-4 pt-2">
                        <View className="flex flex-col mt-2 w-2/3">
                          <Text style={{ color: background }}>
                            {item.description}
                          </Text>
                        </View>
                        <View className="flex flex-col mt-1 justify-center">
                          <View className="flex flex-row">
                            <View className="bg-white flex flex-row rounded-2xl mr-2 items-center">
                              <TouchableOpacity
                                onPress={() => {
                                  console.log("ADD INVENTORY ITEM?", item);

                                  // dispatch(reduceInventory(item));
                                }}
                              >
                                <AntIcon
                                  name="minuscircle"
                                  size={22}
                                  color={secondary_color}
                                />
                              </TouchableOpacity>

                              <Text
                                style={{
                                  color: primary_color,
                                  alignItems: "center",
                                  paddingHorizontal: 5,
                                }}
                              >
                                {item.quantity}
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  console.log("ADD INVENTORY ITEM?", item);
                                  // dispatch(addInventory(item));
                                }}
                              >
                                <AntIcon
                                  name="pluscircle"
                                  size={22}
                                  color={primary_color}
                                />
                              </TouchableOpacity>
                            </View>
                            <View className="justify-center">
                              <TouchableOpacity
                                onPress={() => {
                                  dispatch(deleteInventory(item));
                                }}
                              >
                                <FontIcon
                                  name="trash"
                                  size={18}
                                  color={background}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                  />
                ) : (
                  // Code to be executed when foodInventory is empty
                  <View className="pt-4 items-center">
                    <Text className="font-bold" style={{ color: background }}>
                      Food Inventory is empty
                    </Text>
                  </View>
                )}
              </Card.Content>
              <View></View>
              <View
                className="mx-7 py-2"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: background,
                }}
              />
              <View className="flex-row justify-between items-center px-8 pt-2">
                <View>
                  <Text className="font-bold" style={{ color: background }}>
                    Total
                  </Text>
                </View>
                <View>
                  <Text style={{ color: background }}>
                    {foodInventoryCalories}
                  </Text>
                </View>
              </View>

              <View className="items-center py-2">
                <Card.Actions>
                  <AntIcon
                    // TODO: Refactor old meal-picker to use react-native-meal-picker
                    // onPress={() => checkOption()}
                    onPress={() => handleIconPress()}
                    name="pluscircle"
                    size={24}
                    color={background}
                    style={{ marginRight: 10 }}
                  />
                  <Portal>
                    <Dialog
                      onBackdropPress={handlePickerClose}
                      visible={isPickerVisible}
                      onDismiss={handlePickerClose}
                    >
                      <MealPicker
                        onBackdropPress={handlePickerClose}
                        color={primary_color}
                        selectedValue={selectedLanguage}
                        onValueChange={handleLanguageChange}
                      />
                    </Dialog>
                  </Portal>
                </Card.Actions>
              </View>
            </View>
          </Card>
        )}
      </View>
    </Provider>
  );
};

export default Nutrition;
