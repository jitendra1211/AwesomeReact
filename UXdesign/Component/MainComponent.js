import React, { Component} from 'react';
import {View,Text, Platform,StyleSheet} from 'react-native';
import {Image,Icon} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './HomeComponent';
import BrowseTab from './BrowseComponent';
import FavouriteTab from './FavouriteComponent';

const HomeStack= createStackNavigator();
const Tab= createBottomTabNavigator();


const headerIcon=()=>{
    return (
        {
            headerLeft:() =>(
                <View style={styles.header}>
                    <Text style={{color:'white'}}> Hello</Text>
                </View>
            ),
            headerRight:() =>(
                <Image
                    source={require('../assets/logo.jpg')}
                    style={styles.headerImage}
                    />
            )
        }
    );
} 

function tabBarScreenIcon(icon,color){
    return (
          <Icon
            name={icon}
            type='font-awesome'            
            size={24}
            color={color}
          />
    );
}
function TabNavigator(){
    return(
        <Tab.Navigator tabBarOptions={{activeBackgroundColor: '#ff99cc',
            inactiveBackgroundColor: '#ffe6f2',
            activeTintColor: '#ffffff',
            inactiveTintColor: '#999'}}
             >
            <Tab.Screen 
                name='Home'
                component={HomeTab}
                options={
                    { 
                      tabBarLabel:'Home',
                      tabBarIcon: (props)=>tabBarScreenIcon('home', props.color)
                    }
                  }   
                />
            <Tab.Screen
                name='Browse'
                component={BrowseTab}
                options={
                    { 
                      tabBarLabel:'Browse',
                      tabBarIcon: (props)=>tabBarScreenIcon('tv', props.color)
                    }
                  }   
                />
            <Tab.Screen
                name='Favourite'
                component={FavouriteTab}
                options={
                    { 
                      tabBarLabel:'Favourites',
                      tabBarIcon: (props)=>tabBarScreenIcon('heart-o', props.color)
                    }
                  }   
                />
        </Tab.Navigator>
    );
}

function HomeStackNavigator(){
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name=' ' component={TabNavigator} options={headerIcon}/>
        </HomeStack.Navigator>
    );
    
} 

class Main extends Component{
    render(){
        return(

            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <NavigationContainer>
                    <HomeStackNavigator/>
                </NavigationContainer>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container :{
        flex:1,
        // justifyContent:'space-between'
        flexDirection:'row',
        padding :20,
        backgroundColor:'blue'
    },
    header :{
        margin:8,
        marginLeft:5,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        borderTopRightRadius:0,
        width:200,
        height:50,
        backgroundColor:'#f30'
    },
    headerImage:{
        height:50,
        width:60,
        margin:8,
        marginRight:20
    }
})

export default Main;