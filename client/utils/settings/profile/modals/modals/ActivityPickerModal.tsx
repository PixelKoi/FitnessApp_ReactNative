import React, { useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import headerIMG from "../../../../../assets/images/weight_lifting.png";
import { Button, Surface } from "react-native-paper";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux-manager/hooks";
import { changeActivity } from "../../../../../redux-manager/redux-slice/user-slice";

const ActivityPickerModal = (props) => {
  const [activity, setActivity] = useState("");
  const [currentIndex, setIndex] = useState(-1);

  const activityList = [
    "Sedentary",
    "Lightly active",
    "Moderately active",
    "Very active",
    "Extremely active",
  ];

  const { colors } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  return (
    <Modal visible={props.showActivityModal}>
      <View
        style={{ backgroundColor: colors.secondary }}
        className="flex-1 items-center"
      >
        <Image className="mt-10" source={headerIMG} />

        <Surface
          style={{
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            backgroundColor: colors.background,
          }}
          className=" h-screen w-screen"
        >
          <View className="mx-14 mt-6">
            <Text
              style={{ color: colors.primary }}
              className="text-2xl font-bold"
            >
              Activity level?
            </Text>
            {/* Display Activity Buttons */}
            <View className="gap-4 mt-4">
              {activityList.map((activity, index) => (
                <Button
                  key={index}
                  onPress={() => {
                    setActivity(activity);
                    setIndex(index);
                  }}
                  style={{
                    backgroundColor: colors.secondary,
                    borderWidth: 1,
                    borderColor:
                      currentIndex === index ? colors.primary : "transparent",
                  }}
                  mode="contained"
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontWeight: "bold",
                    }}
                  >
                    {activity}
                  </Text>
                </Button>
              ))}
            </View>
          </View>
          <View className="flex-row justify-center mt-12">
            <Button
              onPress={() => {
                props.setShowActivityModal(false);
                setActivity("");
                setIndex(-1);
              }}
              style={{ backgroundColor: colors.primary }}
              className="w-24 mr-4"
              mode="contained"
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                dispatch(changeActivity(activity));
                props.setShowActivityModal(false);
                setActivity("");
                setIndex(-1);
              }}
              style={{ backgroundColor: colors.primary }}
              className=" w-24"
              mode="contained"
            >
              Save
            </Button>
          </View>
        </Surface>
      </View>
    </Modal>
  );
};

export default ActivityPickerModal;
