import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { params } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import {
  Dialog,
  Button,
  Card,
  Menu,
  Provider,
  Portal,
} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet } from "react-native";
import { addFavorite } from "../../../redux-manager/redux-slice/favorite-slice";
import {
  addInventory,
  deleteInventory,
  reduceInventory,
  addFavoriteToInventory,
  changeCategory,
  setCategory,
} from "../../../redux-manager/redux-slice/nutrition-slice";
import { useAppSelector, useAppDispatch } from "../../../redux-manager/hooks";
import MealPicker from "../../../utils/nutrition/meal-picker/MealPicker";
import FavoritesModal from "../../../utils/nutrition/modals/FavoriteModal";
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
  cardShadow: {
    elevation: 2, // Add a lighter elevation for Android
    shadowColor: "rgba(0, 0, 0, 0.1)", // Use a lighter shadow color for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5, // Reduce the opacity for a lighter effect
    shadowRadius: 2,
  },
  favoriteModal: {
    backgroundColor: "white",
    padding: 16,
  },
  overlay: {
    backgroundColor: "transparent", // Set overlay background color to transparent
  },
});

// TODO: BUG: Clicking Add Food in Diary doesn't change Nutrition bottom button.
const Nutrition: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const { colors } = useAppSelector((state) => state.theme);
  const { dailyCal } = useAppSelector((state) => state.user);

  // ACCESS THEME COLORS
  // const primary_color = colors.primary;
  const primary_color = colors.primary;
  const secondary_color = colors.secondary;
  const background = colors.background;
  // ENDOF THEME COLORS

  // INVENTORY FOOD LIST
  const { inventory } = useAppSelector((state) => state.inventory);
  const { breakfast, lunch, dinner, snacks } = useAppSelector(
    (state) => state.inventory
  );
  console.log(
    "breakfast",
    breakfast,
    "lunch",
    lunch,
    "dinner",
    dinner,
    "snacks",
    snacks
  );
  console.log("inventory: ", inventory);
  // FAVORITE FOOD LIST
  const { favorites } = useAppSelector((state) => state.favorite);
  // console.log("VALUES", favorites);
  function updateFavoriteList(data) {
    const favoriteItem = {
      Calories: data.Calories,
      Carbs: data.Carbs,
      Fat: data.Fat,
      Protein: data.Protein,
      description: data.description,
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
  const openFavoriteModal = () => {
    setIsModalVisible(true);
  };
  const closeFavoriteModal = () => {
    setIsModalVisible(false);
  };

  // Food Inventory: Keeps track of food we plan on adding to the Diary
  const [foodInventoryCalories, setFoodInventoryCalories] = useState([]);

  const tabNavigation = useNavigation();
  const [foodName, setFoodName] = useState("");
  const [foodArray, setFoodArray] = useState([]);
  const [saveButton, setSaveButton] = useState(false);
  const [selectedHearts, setSelectedHearts] = useState([]);

  const [favoritesList, setFavoritesList] = useState(true);

  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
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
    dispatch(changeCategory(option));
    setVisible(false);
  };

  const [selectedLanguage, setSelectedLanguage] = useState<string>("select");
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
          <TouchableOpacity onPress={openFavoriteModal}>
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
      const food = data.foods;
      const tempArray = [];
      food.forEach((item) => {
        const foodLog = {
          quantity: 0,
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

  const increment_inventory_item = (item) => {
    console.log("increment_inventory_item RUNNING");
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(addInventory(updatedItem));
  };

  const decrement_inventory_item = (item) => {
    const updatedItem = { ...item, quantity: item.quantity - 1 };
    dispatch(reduceInventory(updatedItem));
  };

  useEffect(() => {
    if (props.route && props.route.params && props.route.params.meal) {
      console.log("MEAL: ", props.route.params.meal);
      setSelectedOption(props.route.params.meal);
    }
  }, [props.route && props.route.params ? props.route.params.meal : undefined]);

  useEffect(() => {
    const loggedFoods = inventory.filter((food) => food.quantity > 0);
    const inventory_calories = loggedFoods
      .map((item) => item.Calories * item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    setFoodInventoryCalories(inventory_calories);
  }, [inventory]);

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
    dispatch(setCategory(selectedOption));
    tabNavigation.navigate("Diary");
  };

  const renderFoodItem = (food, index, foodArray) => {
    return (
      <>
        <View className="mx-2 py-2">
          <Card style={styles.cardShadow} className="rounded">
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
                  {/*TODO: Place back animation checkmark after selection*/}
                  {/*{food.quantity > 0 ? (*/}
                  {/*  <TouchableOpacity className="pl-1.5 pb-4">*/}
                  {/*    <Icon*/}
                  {/*      size={24}*/}
                  {/*      name="checkmark-circle-sharp"*/}
                  {/*      color={primary_color}*/}
                  {/*    />*/}
                  {/*  </TouchableOpacity>*/}
                  {/*) : (*/}
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(addFavoriteToInventory(foodArray[index]));
                    }}
                    className="px-1.5 pb-4"
                  >
                    <Icon
                      size={24}
                      name="add-circle-outline"
                      color={primary_color}
                    />
                  </TouchableOpacity>
                  {/*)}*/}

                  <TouchableOpacity
                    onPress={() => handleFavoriteToggle(index, foodArray)}
                    className="rounded-full px-1.5 text-primary "
                  >
                    {selectedHearts[index] ? (
                      <Icon size={24} name="heart" color={primary_color} />
                    ) : (
                      <Icon
                        name="heart-outline"
                        color={primary_color}
                        size={24}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </>
    );
  };

  return (
    <Provider>
      <View
        style={{ backgroundColor: colors.dark }}
        className="flex-1 bg-white"
      >
        <FavoritesModal
          isModalVisible={isModalVisible}
          closeFavoriteModal={() => setIsModalVisible(false)}
          handleFavoritePress={isModalVisible}
          favorites={favorites} // Pass your favorites array here
          primary_color={primary_color} // Pass your primary color here
          secondary_color={secondary_color} // Pass your secondary color here
        />
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
                  <FontIcon
                    name="chevron-down"
                    size={18}
                    color={primary_color}
                  />
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
              <AntIcon name="AntDesign" size={24} color={primary_color} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="mt-3 mb-3 py-1 mx-4"
            onPress={handleSearch}
          >
            <Entypo
              name="magnifying-glass"
              size={20}
              color={primary_color}
            ></Entypo>
          </TouchableOpacity>
        </View>
        <FlatList
          data={foodArray}
          renderItem={({ item, index }) =>
            renderFoodItem(item, index, foodArray)
          }
          keyExtractor={(item) => item.id.toString()}
        />
        <Card
          className="overflow-hidden"
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
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
                                decrement_inventory_item(item);
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
                                increment_inventory_item(item);
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
                {selectedLanguage === "select" ? (
                  <AntIcon
                    onPress={() => handleIconPress()}
                    name="pluscircle"
                    size={24}
                    color={background}
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      saveToDiary();
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: 10,
                        backgroundColor: colors.background,
                        borderWidth: 0,
                      }}
                      className={`text-center w-30`}
                    >
                      <Text
                        className="font-extrabold"
                        style={{
                          color: colors.primary,
                        }}
                      >
                        Add to Diary
                      </Text>
                    </Button>
                  </TouchableOpacity>
                )}
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
      </View>
    </Provider>
  );
};

export default Nutrition;
