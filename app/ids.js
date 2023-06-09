import react,{useState} from 'react';
import { View, Text, ScrollView, SafeAreaView,StyleSheet, Dimensions} from 'react-native';
import { Stack, useRouter , useSearchParams,useLocalSearchParams} from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, RScreenHeaderBtn,LScreenHeaderBtn, Welcome} from '../components';
import { JobFooter } from '../components';
import  GOOGLE_API_KEY  from '../env';

import MapItem from'./mapitem';

import { Marker } from 'react-native-maps';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
// import {spawn} from 'react-native-childprocess';

// const spawner = require('child_process').spawn;
// const data_to_pass = 'send to py';
// console.log('data sent : ',data_to_pass);
// const python_process = spawner('python',['./python.py',data_to_pass]);
// python_process.stdout.on('data', (data) =>{
//     console.log("data recieved : ",data.toString())
// });



const romania_graph = {
  'Arad': [{city:'Sibiu',cost:140}, {city:'Zerind',cost:75}, {city:'Timisoara',cost:118}],
  'Zerind': [{city:'Arad',cost:75}, {city:'Oradea',cost:71}],
  'Oradea': [{city:'Zerind',cost:71}, {city:'Sibiu',cost:151}],
  'Sibiu': [{city:'Arad',cost:140}, {city:'Oradea',cost:151}, {city:'Fagaras',cost:99}, {city:'Rimnicu Vilcea',cost:80}],
  'Timisoara': [{city:'Arad',cost:118}, {city:'Lugoj',cost:111}],
  'Lugoj': [{city:'Timisoara',cost:111}, {city:'Mehadia',cost:70}],
  'Mehadia': [{city:'Lugoj',cost:70}, {city:'Drobeta',cost:75}],
  'Drobeta': [{city:'Mehadia',cost:75}, {city:'Craiova',cost:120}],
  'Craiova': [{city:'Drobeta',cost:120}, {city:'Rimnicu Vilcea',cost:146}, {city:'Pitesti',cost:138}],
  'Rimnicu Vilcea': [{city:'Sibiu',cost:80}, {city:'Craiova',cost:146}, {city:'Pitesti',cost:97}],
  'Fagaras': [{city:'Sibiu',cost:99}, {city:'Bucharest',cost:211}],
  'Pitesti': [{city:'Rimnicu Vilcea',cost:97}, {city:'Craiova',cost:138}, {city:'Bucharest',cost:101}],
  'Bucharest': [{city:'Fagaras',cost:211},{city:'Pitesti',cost:101}, {city:'Giurgiu',cost:90}, {city:'Urziceni',cost:85}],
  'Giurgiu': [{city:'Bucharest',cost:90}],
  'Urziceni': [{city:'Bucharest',cost:85}, {city:'Vaslui',cost:142}, {city:'Hirsova',cost:98}],
  'Hirsova': [{city:'Urziceni',cost:98}, {city:'Eforie',cost:86}],
  'Eforie': [{city:'Hirsova',cost:86}],
  'Vaslui': [{city:'Iasi',cost:92}, {city:'Urziceni',cost:142}],
 'Iasi': [{city:'Vaslui',cost:92}, {city:'Neamt',cost:87}],
 'Neamt': [{city:'Iasi',cost:87}]
}





function dls(graph, start,goal,limit) {
    
  console.log(" starting ")
  const stack = [[{city:start,cost:0}]];
  const visited = new Set();
  const result = [];
  let path;
  while (stack.length && limit !=0) {
    const path = stack.pop();
    const current_city = path[path.length - 1].city;
    

    if (!visited.has(current_city)) {
      visited.add(current_city);
      result.push(current_city);

      if(current_city === goal){
        return path;
      }

      for (const neighbor of graph[current_city]) {
        copyPath = JSON.parse(JSON.stringify(path));
        copyPath.push(neighbor);
        stack.push(copyPath);
        
        
         
      }
      
    }
    limit -= 1;
    
  }
  if(path){
  return path;
  }
  else{
    return [];
  }
}
    


const Home = () =>{
    const router = useRouter();
    const {rootCity,goalCity,searchAlgo} =useLocalSearchParams();
    console.log(rootCity)
    console.log(goalCity)
    console.log(searchAlgo)

  let search_result;
    for(let i = 1; i < 100; i++){
      search_result = dls(romania_graph,rootCity,goalCity,i);
    }
    
    console.log(search_result);
    const [searchTerm, setSearchTerm] = useState("")

    const total_cost = () => {
      let cost = 0;
      search_result.forEach((x)=>{cost += x.cost;})
      console.log( cost);
      return cost;
    };
    total_cost();

    const search_result_arr = [];
    const search_result_r = () =>{
      
      for (let i = 0; i < search_result.length; i++){
        search_result_arr.push(search_result[i].city);
      }
      console.log(search_result_arr);

    }
    search_result_r();
    search_result_arr.push("G_COST : " + total_cost() );

    // MAP

    const {width,height} = Dimensions.get("window");
    const ASPECT_RATIO = width/height;
    const LATITUDE_DELTA = 10;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_POSITION ={
      latitude :45.9432,
      longitude: 24.9668,
      latitudeDelta:LATITUDE_DELTA,
      longitudeDelta:LONGITUDE_DELTA,
    }

    const origin ={
      latitude :40.767110,
      longitude: -73.979704,
      latitudeDelta:LATITUDE_DELTA,
      longitudeDelta:LONGITUDE_DELTA,
    }

    const destination ={
      latitude :45.9432,
      longitude: 24.9668,
      latitudeDelta:LATITUDE_DELTA,
      longitudeDelta:LONGITUDE_DELTA,
    }



    const markers = {
      'Arad': {
        latitude :46.1866,
        longitude:21.3123,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA,
      },
      'Zerind': {
        latitude :46.6225,
        longitude:21.5174,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA,
      },
      'Oradea': {
        latitude :47.0465,
        longitude:21.9189,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA,
      },
      'Sibiu': {
        lat:45.8035,
        long:24.1450,
      },
      'Timisoara': {
        lat:45.7489,
        long:21.2087,
      } ,
      'Lugoj': {
        lat:45.6910,
        long:21.9035,
      },
      'Mehadia': {
        lat:44.9052,
        long:22.3673,
      },
      'Drobeta':  {
        lat:44.6369,
        long:22.6597,
      },
      'Craiova': {
        lat:44.3302,
        long:23.7949,
      },
      'Rimnicu Vilcea': {
        lat:45.0997,
        long:24.3693,
      },
      'Fagaras': {
        lat:45.8416,
        long:24.9731,
      },
      'Pitesti':{
        lat:44.8565,
        long:24.8692,
      },
      'Bucharest':{
        lat:44.4268,
        long:26.1025,
      },
      'Giurgiu':{
        lat:43.9037,
        long:25.9699,
      },
      'Urziceni':{
        lat:44.7181,
        long: 26.6453,
      },
      'Hirsova': {
        lat:44.6893,
        long:27.9457,
      },
      'Eforie':{
        lat:44.0491,
        long:28.6527,
      },
      'Vaslui': {
        lat:46.6407,
        long:27.7276,
      },
      'Iasi': {
        lat:47.1585,
        long:27.6014,
      },
      'Neamt': {
        lat:46.9759,
        long:26.3819,
      },
  }





    return (
        <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
            {/* navigation bar */}
            <Stack.Screen
                options={{headerStyle:{backgroundColor:COLORS.secondary},
                headerShadowVisible: false,
                headerBackVisible:true,
                
                headerTitle:"",
                headerShown:false,
                }}
            />  

                {/* body */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View 
                    style={{
                        fles:1, 
                        padding:SIZES.medium
                    }}>
                    <LScreenHeaderBtn style={{position: "absolute",
                    top: 10,left:20}} iconUrl={icons.menu} dimension="50%"
                    handleClick ={() => {
                        router.back()
                    }} 
                    />
                
                    <RScreenHeaderBtn style={{position: "absolute",
    top: 10,right:20}} iconUrl={images.profile} dimension="50%" />
                
                    
                    
                    


                </View>
                
                
                
            
            </ScrollView>


            <MapView style={map_styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION} 
              >
              {search_result.map((item)=>{

                  return <Marker coordinate={markers.item}/>

              })}
              <Marker coordinate={INITIAL_POSITION}/>
              {/* <MapViewDirections>
                origin={origin}
                destination={destination}
                apikey= {GOOGLE_API_KEY}
              </MapViewDirections> */}
              </MapView>

              <MapItem
                search_result={search_result_arr}>
                </MapItem>


              {/* <View style={map_styles.searchCont}>
              <GooglePlacesAutocomplete 
                styles={{textInput:map_styles.input}}
                placeholder='search'
                onPress={(data,details = null )=>{
                  console.log(data,details)
                }}
                query={{
                  key: GOOGLE_API_KEY,
                  language:"en",
                }}
              />
            </View> */}
            
            
            <JobFooter></JobFooter>
        </SafeAreaView>
    )
}


export default Home;

const map_styles = StyleSheet.create({
  
  map: {
    width: '100%',
    height: '100%',
    position:'absolute',
    bottom:90,
    //left:'5%',

  },
  searchCont:{
    position:'absolute',
    width:'90%',
    backgroundColor:'white',
    shadowColor:'black',
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.5,
    shadowRadius:4,
    top:120,
    left:'5%'
  }
});