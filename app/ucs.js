import react,{useState} from 'react';
import { View, Text, ScrollView, SafeAreaView,StyleSheet, Dimensions} from 'react-native';
import { Stack, useRouter , useSearchParams,useLocalSearchParams} from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, RScreenHeaderBtn,LScreenHeaderBtn, Welcome} from '../components';
import { JobFooter } from '../components';
// import {spawn} from 'react-native-childprocess';

// const spawner = require('child_process').spawn;
// const data_to_pass = 'send to py';
// console.log('data sent : ',data_to_pass);
// const python_process = spawner('python',['./python.py',data_to_pass]);
// python_process.stdout.on('data', (data) =>{
//     console.log("data recieved : ",data.toString())
// });

import  GOOGLE_API_KEY  from '../env';

import MapItem from'./mapitem';

import { Marker } from 'react-native-maps';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';



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

    function compare( a, b ) {
      let aLen = a.length;
      let total_cost_a = 0;
      for (let i = 0; i < aLen; i++) {
        total_cost_a +=  a[i]["cost"] ;
      }

      let bLen = b.length;
      let total_cost_b = 0;
      for (let i = 0; i < bLen; i++) {
        total_cost_b +=  b[i]["cost"] ;
      }

      if ( total_cost_a < total_cost_b ){
        return -1;
      }
      if ( total_cost_a > total_cost_b ){
        return 1;
      }
      return 0;
    }

function ucs(graph, start,goal) {
    
    console.log(" starting ")
    const queue = [[{city:start, cost:0}]];
    const visited = new Set();
    const result = [];
  
    while (queue.length) {

      queue.sort(compare);
      const path = queue.shift();
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
          queue.push(copyPath);
          
           
        }
      }
    }
  
    return path;
  }



const Home = () =>{
    const router = useRouter();
    const {rootCity,goalCity,searchAlgo} =useLocalSearchParams();
    console.log(rootCity)
    console.log(goalCity)
    console.log(searchAlgo)

    const search_result = ucs(romania_graph,rootCity,goalCity);
    
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

    search_result_arr.push("G_COST : " + total_cost());



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
              {/* {search_result.map((item)=>{

                  return <Marker coordinate={markers.item}/>

              })} */}
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