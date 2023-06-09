import react, {useState, useEffect,useRef} from 'react';
import { View, Text, ScrollView, SafeAreaView} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, RScreenHeaderBtn,LScreenHeaderBtn, Welcome} from '../components';
import { JobFooter } from '../components';



const Home = () =>{
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");
    const [rootCity, setRootCity] = useState("Arad");
    const [goalCity, setGoalCity] = useState("Bucharest");
    const [searchAlgo, setSearchAlgo] = useState("BREADTH-FIRST");
    const [directionClick, setDirectionClick] = useState(false);
    
    const checkvalues = (value) =>{
        console.log(`values passed is ${value}`);
    }
    
    
    useEffect(() => {
        // run something every time name changes
        
        console.log(`values passed is ${searchAlgo}`);
      }, [searchAlgo]);

      useEffect(() => {
        // run something every time name changes
        
        console.log(`values passed is ${searchTerm}`);
      }, [searchTerm]);

      useEffect(() => {
        // run something every time name changes
        
        console.log(`values passed is ${goalCity}`);
      }, [goalCity]);

      useEffect(() => {
        // run something every time name changes
        
        console.log(`values passed is ${rootCity}`);
      }, [rootCity]);


      useEffect(() => {
        // run something every time name changes
        
        console.log(`values passed is ${directionClick}`);
        if(directionClick == true ){
            if(searchAlgo == "BREADTH-FIRST"){
            router.push({ pathname: '/bfs', params: { 
                rootCity:rootCity,
                goalCity:goalCity,
                searchAlgo:searchAlgo,
            }});
            }else if(searchAlgo == "DEPTH-FIRST"){
                router.push({ pathname: '/dfs', params: { 
                    rootCity:rootCity,
                    goalCity:goalCity,
                    searchAlgo:searchAlgo,
                }});

            }else if(searchAlgo == "DEPTH-LIMITED"){
                router.push({ pathname: '/dls', params: { 
                    rootCity:rootCity,
                    goalCity:goalCity,
                    searchAlgo:searchAlgo,
                }});
            }else if(searchAlgo == "IDS"){
                router.push({ pathname: '/ids', params: { 
                    rootCity:rootCity,
                    goalCity:goalCity,
                    searchAlgo:searchAlgo,
                }});
            }else if(searchAlgo == "UNIFORM-COST"){
                router.push({ pathname: '/ucs', params: { 
                    rootCity:rootCity,
                    goalCity:goalCity,
                    searchAlgo:searchAlgo,
                }});
            }else if(searchAlgo == "GREEDY-BEST-FIRST"){
                router.push({ pathname: '/gbf', params: { 
                    rootCity:rootCity,
                    goalCity:goalCity,
                    searchAlgo:searchAlgo,
                }});
            }else if(searchAlgo == "A*"){
                router.push({ pathname: '/astar', params: { 
                    rootCity:rootCity,
                    goalCity:goalCity,
                    searchAlgo:searchAlgo,
                }});
            }
            setDirectionClick(false);
        }
      }, [directionClick]);

      

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
                    
                    />
                
                    <RScreenHeaderBtn style={{position: "absolute",
    top: 10,right:20}} iconUrl={images.profile} dimension="0%" />
                
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setSearchAlgo={setSearchAlgo}
                        
                    />
                    <Popularjobs
                    setGoalCity={setGoalCity}
                    />
                    <Nearbyjobs
                    setRootCity={setRootCity}
                    />



                </View>
            </ScrollView>
            <JobFooter
            directionClick={directionClick}
            callbackBtn={setDirectionClick}
            
            ></JobFooter>
        </SafeAreaView>
    )
}


export default Home;