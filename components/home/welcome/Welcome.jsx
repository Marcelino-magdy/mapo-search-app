import react,{ useState} from 'react'
import {useRouter } from 'expo-router';
import React from 'react'
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         Image,
         FlatList
 } from 'react-native';
import styles from './welcome.style'
import {icons,SIZES} from '../../../constants';



const algos = ["BREADTH-FIRST","UNIFORM-COST","DEPTH-FIRST","DEPTH-LIMITED","IDS","A*","GREEDY-BEST-FIRST"]


const Welcome = ({searchTerm,setSearchTerm,setSearchAlgo,scroll}) => {
  const router = useRouter();
  const [activeAlgo,setactiveAlgo] = useState('BREADTH-FIRST')
  
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Professor</Text>
        <Text style={styles.welcomeMessage}>{'\n'}Welcome to MAPO : {'\n'}Your Application
        to find the {'\n'}shortest, cheapest and fastest {'\n'}route to your destination...</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}  
            value={searchTerm}
            onChangeText={(text) => {setSearchTerm(text)}}
            placeholder="choose your prefered Algorithm from below !"
            placeholderTextColor='white'
            underlineColorAndroid='white'
          />

        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={()=>{
            scroll("scroll");
        }}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={algos}
          renderItem={({item}) => {
            return(
            <TouchableOpacity style={
              styles.tab(activeAlgo,item)}
              onPress={ () => {
                setactiveAlgo(item);
                setSearchAlgo(item);
              }}
              >
              <Text style={styles.tabText(activeAlgo,item)}>{item}</Text> 
            </TouchableOpacity>
            )
          }}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome