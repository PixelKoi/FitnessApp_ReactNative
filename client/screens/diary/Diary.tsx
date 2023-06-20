import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Divider, Text, Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";
import completeDiary from "../../database/models/Food";
import { useAppSelector } from "../../redux-manager/hooks";
// import { RootState } from "../../redux-manager/store";
import Food from "../../database/models/Food";
import Icon from "react-native-vector-icons/FontAwesome";
import AntIcon from "react-native-vector-icons/AntDesign";
import { UserCircleIcon } from "react-native-heroicons/outline";
const Diary = (props) => {
  const tabNavigation = useNavigation();
  const database = useDatabase();
  const profileInfo = useAppSelector((state) => state.user);
  console.log("PROFILE INFO: ", profileInfo);
  console.log("PROFILE CALS: ", profileInfo.dailyCal);
  const { colors } = useAppSelector((state) => state.theme);
  let primary_color = colors.primary;

  React.useLayoutEffect(() => {
    tabNavigation.setOptions({
      title: "Diary",
      headerTintColor: primary_color,
      headerLeft: () => (
        <TouchableOpacity
          className="pl-4"
          onPress={() => {
            tabNavigation.navigate("Nutrition");
          }}
        >
          <Icon name="angle-left" style={{ color: primary_color }} size={24} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        // <TouchableOpacity onPress={() => setSaveButton(true)}>
        <TouchableOpacity
          style={{ backgroundColor: colors.primary }}
          className="mr-8  rounded-full"
          onPress={() => {
            tabNavigation.navigate("Profile");
          }}
        >
          <UserCircleIcon name="ios-add" size={30} color={"white"} />
        </TouchableOpacity>
      ),
    });
  });

  const diaryButton = async () => {
    const food_instance = database.get("foods");

    // console.log("FOODS in 🍉🍉🍉", food_instance);
    console.log("FOODS", typeof selectedFoods[0].food.Carbs);
    //
    // const data = await database.write(async () => {
    //   await database.get<Food>("foods").create((data) => {
    //     data.completeDiary(
    //       (data.calories = selectedFoods[0].food.Calories),
    //       (data.carbs = selectedFoods[0].food.Carbs),
    //       (data.fat = selectedFoods[0].food.Fat),
    //       (data.protein = selectedFoods[0].food.Protein),
    //       (data.description = selectedFoods[0].food.description)
    //     );
    //   });
    // });
    // if (data) {
    //   console.log("Successfully created food post");
    //   const all_food = await database.get("foods").query().fetch();
    //   console.log("food saved in DB!:", all_food);
    // }
  };

  if (props.route.params == undefined) {
    return (
      <View className="flex-1 items-center">
        <View className="justify-center">
          <Card className="px-4">
            <Text className="pt-4">
              {profileInfo.dailyCal} - caloriesConsumed = calories remaining
            </Text>
          </Card>
        </View>
        {/* other content */}
        <View className="w-full">
          <Card className="m-2 pb-4">
            <Card.Title
              title="Breakfast"
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            />
            <Divider className="mb-4" />
            <View className="flex-row start-0">
              <Button
                icon="plus"
                mode="text"
                onPress={() => tabNavigation.navigate("Nutrition")}
              >
                Add Food
              </Button>
            </View>
          </Card>
        </View>
        <Divider />
        <View className="w-full">
          <Card className="m-2 pb-4">
            <Card.Title
              title="Lunch"
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            />
            <Divider />
            <View className="flex-row start-0">
              <Button
                icon="plus"
                mode="text"
                onPress={() => tabNavigation.navigate("Nutrition")}
              >
                Add Food
              </Button>
            </View>
          </Card>
        </View>
        <Divider />
        <View className="w-full">
          <Card className="m-2 pb-4">
            <Card.Title
              title="Dinner"
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            />
            <Divider />
            <View className="flex-row start-0">
              <Button
                icon="plus"
                mode="text"
                onPress={() => tabNavigation.navigate("Nutrition")}
              >
                Add Food
              </Button>
            </View>
          </Card>
        </View>
        <Divider />
        <View className="w-full">
          <Card className="m-2 pb-4">
            <Card.Title
              title="Snacks"
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            />
            <Divider />
            <View className="flex-row start-0">
              <Button
                icon="plus"
                mode="text"
                onPress={() => tabNavigation.navigate("Nutrition")}
              >
                Add Food
              </Button>
            </View>
          </Card>
        </View>
        <Divider />
        <View className="pt-8">
          <Button
            className="bg-green-950"
            icon="book"
            mode="text"
            onPress={() => console.log("log it ")}
          >
            Complete Diary
          </Button>
        </View>
      </View>
    );
  }
  const selectedObject = props.route;
  const selectedFoods = props.route.params.selectedFoods;
  const selectedOption = props.route.params.selectedOption;
  // TODO: set a global state for totalCalories and pass to diary
  const object = props.route.params;
  interface Category {
    name: string;
    items: FoodItem[];
  }
  interface FoodItem {
    food: {
      Calories: number;
      Carbs: number;
      Fat: number;
      Protein: number;
      description: string;
    };
    id: number;
    isSelected: boolean;
    quantity: number;
  }
  const categories: Category[] = [
    { name: "Snacks", items: [] },
    { name: "Breakfast", items: [] },
    { name: "Lunch", items: [] },
    { name: "Dinner", items: [] },
  ];
  const [selectedFud, setSelectedFud] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const caloriesConsumed = Object.keys(selectedFoods).reduce(
    (total, foodId) => {
      const food = selectedFoods[foodId];
      return total + food.food.Calories * food.quantity;
    },
    0
  );
  useEffect(() => {
    const categoryIndex = categories.findIndex(
      (category) => category.name === selectedOption
    );
    if (categoryIndex >= 0) {
      categories[categoryIndex].items.push(...selectedFoods);
      const populatedCategories = categories.filter(
        (category) => category.items.length > 0
      );

      for (const obj of populatedCategories) {
        // loop through each object in the array
        const items = obj.items; // get the "items" array property from the current object
        const option = obj.name;
        console.log("option", option);
        for (const item of items) {
          // loop through each item object in the "items" array
          const food = item.food; // get the "food" object property from the current item object
          console.log("food", food); // target the "food" object and log it to the console
        }
      }

      setSelectedFud(populatedCategories);
    }
  }, [props]);

  useEffect(() => {
    setIsLoaded(true);
  }, [selectedFud]);

  const displaySelectedFud = (mealTime) => {
    console.log("selectedFud", selectedFud);
    return (
      <>
        {selectedFud.map((obj) => {
          const items = obj.items;
          const option = obj.name;
          return (
            <Card.Content key={option}>
              {option === mealTime ? (
                items.map((item) => (
                  <Text key={item.id}>
                    {item.food.description} - {item.quantity} Quantity {"| "}
                    {item.food.Calories * item.quantity} Calories
                  </Text>
                ))
              ) : (
                <Text></Text>
              )}
              <View className="flex-row start-0 pt-2">
                <Button
                  icon="plus"
                  mode="text"
                  onPress={() => tabNavigation.navigate("Nutrition")}
                >
                  Add Food
                </Button>
              </View>
            </Card.Content>
          );
        })}
      </>
    );
  };

  return (
    <View className="flex-1 items-center">
      <View className="justify-center">
        <Card className="px-4 my-2">
          <Text className="my-4">
            Total calories - {caloriesConsumed} = calories remaining
          </Text>
        </Card>
      </View>
      {/* other content */}
      <View className="w-full">
        <Card className="m-2 pb-4">
          <Card.Title
            title="Breakfast"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          />
          <Divider className="mb-4" />
          {isLoaded && displaySelectedFud("Breakfast")}
        </Card>
      </View>
      <Divider />
      <View className="w-full">
        <Card className="m-2 pb-4">
          <Card.Title
            title="Lunch"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          />
          <Divider />
          {isLoaded && displaySelectedFud("Lunch")}
        </Card>
      </View>
      <Divider />
      <View className="w-full">
        <Card className="m-2 pb-4">
          <Card.Title
            title="Dinner"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          />
          <Divider />
          {isLoaded && displaySelectedFud("Dinner")}
        </Card>
      </View>
      <Divider />
      <View className="w-full">
        <Card className="m-2 pb-4">
          <Card.Title
            title="Snacks"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          />
          <Divider />
          {isLoaded && displaySelectedFud("Snacks")}
        </Card>
      </View>
      <Divider />
      <View className="pt-8">
        <Button
          className="bg-green-950"
          icon="book"
          mode="text"
          onPress={() => diaryButton()}
        >
          Complete Diary
        </Button>
      </View>
    </View>
  );
};

export default Diary;
