import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import io from "socket.io-client";
import * as ImagePicker from "expo-image-picker";

import { Camera } from "expo-camera";

import CustomModal from "../Components/CustomModal";
import styles from "../Styles/MapStyles";

const Map = ({ navigation }) => {
  const [loaded] = useFonts({
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoBlack: require("../../assets/fonts/Roboto-Black.ttf"),
    RobotoItalic: require("../../assets/fonts/Roboto-Italic.ttf"),
  });
  // console.log("loaded", loaded);
  const map = useRef(null);
  const [marker, setMarker] = useState([]);
  const [fullAddress, setFullAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentSocket, setCurrentSocket] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [user, setUser] = useState({
    email: "test",
    name: "test",
  });
  const [initialRegion, setInitialRegion] = useState({
    latitude: 41.3275,
    longitude: 19.8187,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });
  const [hasPermission, setHasPermission] = useState(null);
  const actions = ["Report Now", "Send Location"];

  const getUserEmailName = async () => {
    try {
      const UserEmail = await AsyncStorage.getItem("UserEmail");
      const UserName = await AsyncStorage.getItem("UserName");
      setUser({
        email: UserEmail,
        name: UserName,
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("AppUserToken");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserEmailName();
    const socket = io("http://192.168.1.205:3000");
    setCurrentSocket(socket);
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied!");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      };
      setInitialRegion(userLocation);
    })();
  }, []);
  useEffect(() => {
    map.current.animateToRegion(initialRegion, 1000);
  }, [initialRegion]);

  const fetchNearestPlaces = () => {
    const latitude = initialRegion.latitude;
    const longitude = initialRegion.longitude;
    let radMetter = 2 * 1000; // Search withing 2 KM radius
    // const url =
    //   "https://roads.googleapis.com/v1/snapToRoads?path=-35.27801,149.12958|-35.28032,149.12907|-35.28099,149.12929|-35.28144,149.12984|-35.28194,149.13003|-35.28282,149.12956|-35.28302,149.12881|-35.28473,149.12836 &interpolate=true &key=AIzaSyDN5AeCYbAjzbBgl-_d4Z2bwKLoJg6a0YU";
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      latitude +
      "," +
      longitude +
      "&radius=" +
      radMetter +
      "&key=" +
      "AIzaSyDN5AeCYbAjzbBgl-_d4Z2bwKLoJg6a0YU";
  };
  const handleMapPress = (e) => {
    setMarker([...marker, e.nativeEvent.coordinate]);
    fetchNearestPlaces();
  };
  const handleLeftPress = () => {
    setReportModalVisible(true);
  };
  const handleDismiss = () => {
    setReportModalVisible(false);
  };
  const handleImageDelete = () => {
    console.log("Delete");
  };
  const handleMessageChange = (text) => {
    setReportMessage / text;
  };
  const handleModalOpen = () => {
    setModalVisible(!modalVisible);
  };
  const handleRightPress = async () => {
    currentSocket.emit("location message", fullAddress);
  };
  const handleLogOut = () => {
    removeToken();
    navigation.navigate("Home");
    currentSocket.disconnect();
    setModalVisible(!modalVisible);
  };
  const getAddress = async (coordinate) => {
    const address = await Location.reverseGeocodeAsync(coordinate);
    setFullAddress(
      `${address[0].street?.length >= 25 ? "" : `${address[0].city},`} ${
        address[0].street !== null ? address[0].street : address[0].name
      }`
    );
  };

  const SERVER_URL = "http://192.168.1.205:3000/imageUpload";

  const [photos, setPhotos] = React.useState([]);

  const handleChoosePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhotos([
        ...photos,
        {
          uri: result.uri,
          type: result.type,
          name: result.uri.split("/").pop(),
        },
      ]);
    }
  };

  const handleUploadPhoto = () => {
    const formData = new FormData();

    photos.map((photo) => {
      formData.append("photo", {
        name: photo.name,
        uri: photo.uri,
      });
    });
    // formData.append("photo", {
    //   name: photos[0].name,
    //   value: photos[0].uri,
    // });

    fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("Error Uploading:", error);
      });
    photos.length > 0
      ? setTimeout(() => {
          setReportModalVisible(false);
          setPhotos([]);
        }, 500)
      : null;
  };

  const handleTakeAndUploadPhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    if (hasPermission) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setPhotos([
          ...photos,
          {
            uri: result.uri,
            type: result.type,
            name: result.uri.split("/").pop(),
          },
        ]);
      }
    }
  };

  //wait until fonts are loaded
  if (!loaded) {
    console.log("Fonts not loaded");
    // return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={initialRegion}
        onPress={handleMapPress}
        onRegionChangeComplete={getAddress}
        followsUserLocation={true}
      >
        {/* {marker.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            ></Marker>
          );
        })} */}
      </MapView>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
            <View style={styles.userAction}>
              <TouchableOpacity
                style={[styles.buttonAction, styles.buttonSignOut]}
                onPress={handleLogOut}
              >
                <Text style={styles.textStyle}>Sign Out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonAction, styles.buttonClose]}
                onPress={handleModalOpen}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <CustomModal
        modalVisible={reportModalVisible}
        handleDismiss={handleDismiss}
        handleImageDelete={handleImageDelete}
        handleMessageChange={handleMessageChange}
        handleChoosePhoto={handleChoosePhoto}
        handleUploadPhoto={handleUploadPhoto}
        handleTakeAndUploadPhoto={handleTakeAndUploadPhoto}
        photos={photos}
      />
      <View style={styles.marker}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../../assets/marker.png")}
        ></Image>
      </View>
      <View style={styles.centerContainer}>
        <Icon name="map-marker-alt" size={25} color="red" />
        <Text style={styles.center}>{fullAddress}</Text>
        <TouchableOpacity style={styles.profile} onPress={handleModalOpen}>
          <Text style={styles.initial}>{user?.email[0].toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      {actions.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              item == "Report Now" ? styles.buttonLeft : styles.buttonRight,
            ]}
            onPress={item == "Report Now" ? handleLeftPress : handleRightPress}
          >
            <Text style={item == "Report Now" ? styles.left : styles.right}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Map;
