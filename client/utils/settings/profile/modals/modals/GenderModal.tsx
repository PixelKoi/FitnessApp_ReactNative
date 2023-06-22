import React, { useState } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import headerIMG from "../../../../../assets/images/weight_lifting.png";
import { Button, Surface } from "react-native-paper";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux-manager/hooks";
import { changeGender } from "../../../../../redux-manager/redux-slice/user-slice";
import Ionicons from "react-native-vector-icons/Ionicons";

const GenderModal = (props) => {
  const [gender, setGender] = useState("");
  const [currentIndex, setIndex] = useState(-1);

  const { colors } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const genderList = ["female", "male", "male-female"];

  return (
    <Modal visible={true}>
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
              // style={{ color: colors.primary }}
              className="text-2xl font-bold"
            >
              How do you identify?
            </Text>
            {/* Display Activity Buttons */}
            <View className="mt-14">
              <View className="items-center gap-5">
                {genderList.map((gender, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setGender(gender);
                      setIndex(index);
                    }}
                  >
                    <Ionicons
                      name={gender}
                      color={
                        currentIndex === index ? colors.primary : "#9B9B99"
                      }
                      size={65}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View className="flex-row justify-center mt-12">
            <Button
              onPress={() => {
                props.setShowActivityModal(false);
              }}
              style={{
                backgroundColor: colors.primary,
                width: 214,
              }}
              mode="contained"
            >
              <Text style={{ fontSize: 18 }} className="font-bold">
                Next
              </Text>
            </Button>
          </View>
        </Surface>
      </View>
    </Modal>
  );
};

export default GenderModal;
