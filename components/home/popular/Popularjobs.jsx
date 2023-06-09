import React from 'react'
import { useState} from 'react'
import { View, Text,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import {useRouter } from 'expo-router'
import styles from './popularjobs.style'
import {COLORS, SIZES} from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import {forwardRef} from 'react';

const isloading = false;
const error = false;


const Popularjobs = ({setGoalCity}) => {
  const setGoal = (item) =>{
    setGoalCity(item);
  }

  const [selected,setSelected] = useState("Zerind");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Suggested Destinations</Text>
        <TouchableOpacity><Text style={styles.headerBtn}>show all</Text></TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isloading ? (
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) :error ? (
            <Text>Something Went Wrong</Text>
        ) : (
          <FlatList 
            data={['Arad','Zerind','Oradea','Sibiu','Timisoara','Lugoj','Mehadia','Drobeta','Craiova','Rimnicu Vilcea',
            'Fagaras','Pitesti','Bucharest','Giurgiu','Urziceni','Hirsova','Eforie','Vaslui','Iasi','Neamt']}
            renderItem={({item}) =>{
              return(
                <PopularJobCard
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

export default Popularjobs;