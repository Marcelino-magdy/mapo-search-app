import React from 'react'
import { useState} from 'react'
import { View, Text,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import {useRouter } from 'expo-router'
import styles from './popularjobs.style'
import {COLORS, SIZES} from '../constants';
import MapCard from './mapcard'
import {forwardRef} from 'react';

const isloading = false;
const error = false;


const MapItem = ({search_result}) => {
  const setGoal = (item) =>{
    setGoalCity(item);
  }

  const [selected,setSelected] = useState(search_result[0]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Route To : {search_result[search_result.length - 2]}</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isloading ? (
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) :error ? (
            <Text>Something Went Wrong</Text>
        ) : (
          <FlatList 
            data={search_result}
            renderItem={({item}) =>{
              return(
                <MapCard
                  selected={selected}
                  setSelected={setSelected}
                  setGoal={setGoal}
                  item={item}
                  />
              )
            } }
            keyExtractor={item => item?.job_id}
            horizontal
            contentContainerStyle={{columnGap: SIZES.medium}}
          

          ></FlatList>
        )}
      </View>
    </View>
  )
}

export default MapItem;