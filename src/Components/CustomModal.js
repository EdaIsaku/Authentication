import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { SliderBox } from "react-native-image-slider-box";

import styles from "../Styles/CustomModalStyles";

const CustomModal = ({
  modalVisible,
  handleImageDelete,
  handleDismiss,
  handleMessageChange,
  handleChoosePhoto,
  handleUploadPhoto,
  handleTakeAndUploadPhoto,
  photos,
}) => {
  const buttons = photos.length > 0 ? ["Report", "Update"] : ["Report"];
  const icons = ["camera", "file-image"];

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={-140}
          style={styles.container}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon
                name="times-circle"
                style={styles.closeIcon}
                onPress={handleDismiss}
              />
              <Text style={styles.modalTitle}></Text>
              <View style={styles.imageContainer}>
                <SliderBox
                  style={styles.image}
                  images={photos}
                  parentWidth={300}
                  dotColor="red"
                  dotStyle={{
                    width: 14,
                    height: 14,
                    borderRadius: 7,
                    marginHorizontal: 5,
                  }}
                  inactiveDotColor="#ddd"
                />
                {photos.length > 0 ? (
                  <Icon
                    name="trash"
                    size={20}
                    style={styles.deleteImageIcon}
                    onPress={handleImageDelete}
                  />
                ) : null}

                <View style={styles.uploadPhotoBtn}>
                  {icons.map((icon, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.cameraBtn}
                        onPress={
                          icon === "camera"
                            ? handleTakeAndUploadPhoto
                            : handleChoosePhoto
                        }
                      >
                        <View style={styles.iconContainer}>
                          <Icon name={icon} size={35} color={"red"} />
                        </View>
                        {/* <LinearGradient
                          colors={[
                            "rgba(209, 209, 209, 0.1)",
                            "rgba(222, 222, 222,0.1)",
                          ]}
                          style={styles.cameraGradient}
                        >
                          <Icon name={icon} size={35} color={"teal"} />
                        </LinearGradient> */}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your message"
                  placeholderTextColor="#d3d3d3"
                  onChangeText={handleMessageChange}
                />
              </View>
              <View style={styles.buttonsContainer}>
                {buttons.map((button, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.button}
                      onPress={() => {
                        if (button === "Report") {
                          handleUploadPhoto();
                        } else {
                          handleChoosePhoto();
                        }
                      }}
                    >
                      <LinearGradient
                        colors={
                          button === "Report"
                            ? ["#52c234", "#061700"]
                            : ["#fe8c00", "#f83600"]
                        }
                        style={styles.gradient}
                      >
                        <Text style={styles.buttonName}>{button}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default CustomModal;
