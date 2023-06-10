import React, { useState, useCallback, useEffect } from "react";
import { View, TextInput, FlatList, TouchableOpacity } from "react-native";
import { USDA_API_KEY } from "../../config";
import {
  CheckCircleIcon,
  HeartIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "react-native-heroicons/outline";
import { HeartIcon as FilledHeartIcon } from "react-native-heroicons/solid";
// import {handleMinus, handlePlus} from "../../counter/logCounter";
import { params } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import {
  Dialog,
  Text,
  Button,
  Card,
  Menu,
  Provider,
  Portal,
} from "react-native-paper";
import { StyleSheet } from "react-native";

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
  text: {
    color: "#E07594",
    // Additional text styles if needed
  },
});

const QuickLog = ({ navigation }) => {
  const tabNavigation = useNavigation();
  const [foodName, setFoodName] = useState("");
  const [foodArray, setFoodArray] = useState([]);
  const [saveButton, setSaveButton] = useState(false);
  const [selectedHearts, setSelectedHearts] = useState(
    Array(foodArray.length).fill(false)
  );

  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [mealError, setMealError] = useState(false);
  // let redux-slice submit quick log when state selectedOption set
  const checkOption = useCallback(() => {
    console.log(selectedOption.length);
    console.log(foodArray.length, "FOODARRAY");
    console.log(selectedOption);
    if (selectedOption.length > 0) {
      setSaveButton(true);
    } else if (selectedOption.length == 0) {
      console.log("DID NOT Select food option");
      showErrorDialog();
    }
  }, [selectedOption, handleOptionSelect]);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setVisible(false);
    console.log("Selected option:", option, selectedOption);
  };
  const clearTextInput = () => {
    setFoodName(""); // Clear the TextInput value
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Food Log",
      headerLeft: () => null, // this will hide the back button
      headerRight: () => (
        // <TouchableOpacity onPress={() => setSaveButton(true)}>
        <TouchableOpacity onPress={() => checkOption()}>
          <CheckCircleIcon
            name="ios-add"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, checkOption]);
  const showErrorDialog = () => {
    console.log("WTF");
    console.log(selectedOption.length);
    setMealError(true);
  };
  const hideErrorDialog = () => setMealError(false);

  // convert to RTK: https://redux-toolkit.js.org/rtk-query/overview#configure-the-store
  // Simple Query testing API: https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=Cheddar%20Cheese
  const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}&api_key=${params.api_key}&dataType=${params.dataType}`;
  const handleSearch = async () => {
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
      console.log(foodArray);
    }
  };

  const handleMinus = (foodArray, index) => {
    const updatedFoodArray = [...foodArray];
    const updatedFood = { ...updatedFoodArray[index] };
    if (updatedFood.quantity > 0) {
      updatedFood.quantity -= 1;
      updatedFoodArray[index] = updatedFood;
      setFoodArray(updatedFoodArray);
      console.log(foodArray);
    }
  };

  useEffect(() => {
    if (saveButton) {
      saveToDiary();
    }
  }, [saveButton]);

  const saveToDiary = () => {
    const selectedFoods = foodArray.filter((food) => food.quantity > 0);
    console.log("Selected FOODS: ", selectedFoods);
    setSaveButton(false);
    tabNavigation.navigate("Diary", { selectedFoods, selectedOption });
  };
  const handleFavoriteToggle = (index) => {
    const updatedSelectedHearts = [...selectedHearts];
    updatedSelectedHearts[index] = !updatedSelectedHearts[index];
    setSelectedHearts(updatedSelectedHearts);
  };

  const handleInputChange = (text, food) => {};
  const renderFoodItem = (food, index, foodArray) => {
    // only create objects when the component renders
    console.log("food.quantity", food.quantity, index);
    // console.log("STATE", foodArray);
    return (
      <View className="p-2 ">
        <Card>
          <Card.Content>
            <View className="flex flex-row items-center mt-0">
              <View className="flex flex-col">
                <Text className="text-primary font-bold">
                  {food.food.description}
                </Text>
                <Text className="text-primary">
                  {food.food.Protein}g Protein
                </Text>
                <Text className="text-primary">{food.food.Fat}g Fat</Text>
                <Text className="text-primary">{food.food.Carbs}g Carbs</Text>
                <Text className="text-primary font-bold">
                  {food.food.Calories} Calories
                </Text>
              </View>

              <View className="flex flex-col ml-auto">
                <TouchableOpacity
                  onPress={() => handlePlus(foodArray, index)}
                  className="rounded-full p-2"
                >
                  <ChevronUpIcon size={24} color="#E07594" />
                </TouchableOpacity>
                <TextInput
                  value={food.quantity.toString()}
                  onChangeText={(text) => handleInputChange(text, food)}
                  keyboardType="numeric"
                  className="rounded"
                  style={{
                    textAlign: "center",
                  }}
                />
                <TouchableOpacity
                  onPress={() => handleMinus(foodArray, index)}
                  className="rounded-full p-2"
                >
                  <ChevronDownIcon size={24} color="#E07594" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFavoriteToggle(index)}
                  className="rounded-full p-2 text-primary"
                >
                  {selectedHearts[index] ? (
                    <FilledHeartIcon size={24} color="#E07594" />
                  ) : (
                    <HeartIcon size={24} color="#E07594" />
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
      <View>
        <Portal>
          <Dialog visible={mealError} onDismiss={hideErrorDialog}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
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
                  <Text className="font-bold px-2 text-primary">
                    {selectedOption || "Select a meal"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openMenu}>
                  <ChevronDownIcon size={18} color="#E07594" />
                </TouchableOpacity>
              </View>
            }
          >
            <Menu.Item
              titleStyle={{ color: "#E07594" }}
              onPress={() => handleOptionSelect("Breakfast")}
              title="Breakfast"
            />
            <Menu.Item
              titleStyle={{ color: "#E07594" }}
              onPress={() => handleOptionSelect("Lunch")}
              title="Lunch"
            />
            <Menu.Item
              titleStyle={{ color: "#E07594" }}
              onPress={() => handleOptionSelect("Dinner")}
              title="Dinner"
            />
            <Menu.Item
              titleStyle={{ color: "#E07594" }}
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
              <XCircleIcon size={24} color="#E07594" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="mt-3 mb-3 py-1 mx-4"
            onPress={handleSearch}
          >
            <MagnifyingGlassIcon color="#E07594"></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>

        <FlatList
          data={foodArray}
          renderItem={({ item, index }) =>
            renderFoodItem(item, index, foodArray)
          }
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Provider>
  );
};

export default QuickLog;
