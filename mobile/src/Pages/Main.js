import { MaterialIcons } from '@expo/vector-icons';
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import api from '../services/Api';
import { connect, disconnect, subscribeToNewDev } from '../services/socket';

function Main({navigation}) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

  useEffect(()=>{
    subscribeToNewDev(dev=> setDevs([...devs, dev]));
  },[devs])

  async function loadDevs() {
    const {latitude, longitude} = currentRegion;

    function setUpWebSocket() {

      disconnect();
      const {latitude, longitude} = currentRegion;

      connect(latitude, longitude, techs);
    }

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      },
    });
    
    setDevs(response.data.devs);
    setUpWebSocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  useEffect(() => {
    async function loadInitialPosition() {
      const {granted} = await requestPermissionsAsync();
      if (granted) {
        const {coords} = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const {latitude, longitude} = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        });
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <MapView
          onRegionChangeComplete={handleRegionChanged}
          initialRegion={currentRegion}
          style={styles.mapStyle}
        >
          {devs.map(dev => (
            <Marker key={dev._id}
              coordinate={{
                latitude: dev.location.coordinates[1],
                longitude: dev.location.coordinates[0],
              }}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: dev.avatar_url,
                }}
              />
              <Callout
                onPress={() => {
                  navigation.navigate('Profile', {
                    github_username: dev.github_username,
                  });
                }}
              >
                <View style={styles.callout}>
                  <Text style={styles.devname}>{dev.name}</Text>
                  <Text style={styles.devbio}>{dev.bio}</Text>
              <Text
               style={styles.devtechs}>{
                dev.techs.join(', ')
              }</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Devs por Tecnologia"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: '#fff',
  },
  callout: {
    width: 260,
    minWidth: 260,
  },
  devname: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devbio: {
    color: '#666',
    marginTop: 5,
  },
  devtechs: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#824dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});

export default Main;
