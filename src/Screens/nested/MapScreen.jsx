import { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Header } from "../../components";
import GoBackIcon from "../../../assets/icons/arrow-left.svg";

export const MapScreen = ({ navigation, route }) => {
  const [showPhoto, setShowPhoto] = useState(true);
  const { coords, photo } = route.params;
  return (
    <View style={styles.container}>
      <Header>
        <TouchableOpacity onPress={() => navigation.navigate("DefaultScreen")}>
          <GoBackIcon height={24} width={24} />
        </TouchableOpacity>
      </Header>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          onPress={() => setShowPhoto(true)}
        />
      </MapView>
      {showPhoto && (
        <TouchableOpacity onPress={() => setShowPhoto(false)}>
          <Image source={{ uri: photo }} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    position: "absolute",
    bottom: 120,
    right: 30,
    width: 200,
    height: 150,
  },
});
