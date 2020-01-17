import React, { useState, useEffect } from 'react'
import MapView, { Region, Marker, Callout } from 'react-native-maps'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import Dev from '../services/Dev'
import DevType from '../utils/types/DevType'

export default function Main({navigation}) {
  
  const [devs, setDevs] = useState<[DevType]>()
  const [currentPosition, setCurrentPosition] = useState<Region>()
  const [techs, setTechs] = useState<string>('')
  
  const loadDevs = async () => {
    const { latitude, longitude } = currentPosition
    const devs: [DevType] = await Dev.searchDevs({latitude, longitude, techs})
    setDevs(devs)
  }

  const handleRegionChanged = (region: Region) => {
    setCurrentPosition(region)
  }

  useEffect(() => {
    const loadInitialPosition = async () => {
      const { granted } = await requestPermissionsAsync()

      if(granted){
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        })

        const { latitude, longitude,  } = coords

        setCurrentPosition({
          latitude,
          longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        })

      }
    }

    loadInitialPosition()

  }, [])
  


  return (
    <>
      <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentPosition} style={styles.map}>
        {devs?.map(dev => (
          <Marker key={dev.github_username} coordinate={{
            latitude: dev.location.coordinates[1],
            longitude: dev.location.coordinates[0]
          }}>
            <Image style={styles.avatar}source={{uri: dev.avatar_url}}/>
            <Callout onPress={() => {
              navigation.navigate('Profile', {
                github_username: dev.github_username
              })
            }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
        
        
      </MapView>
      <View style={styles.searchForm}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar Devs por Techs"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={techs => setTechs(techs)}
          />
          <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#fff" />
          </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
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
      height: 4
    },
    elevation: 2

  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
})