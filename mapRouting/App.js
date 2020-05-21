import React, { Component } from "react";
// import { View, Text } from "react-native";
import MapView, {Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';

// const origin = {latitude: 37.3318456, longitude: -122.0296002};
// const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyCNpl-g_PXWP5mW2i44ySwpNuygZryO8zY';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      coords:[],
      routes:[],
      position:{
        latitude: 26.2418801,
        longitude: 78.1824043,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers:[
        {
          title:'Moti Karpe',
          latlng:{ latitude: 13.09, longitude: 80.28 },
          description:'Start'
        },
        {
          title:'Moti Karpe',
          latlng:{ latitude: 13.156614, longitude: 80.26875 },
          description:'End'
        },
        {
          title:'Umar Bhai D\'Alia',
          latlng:{ latitude: 13.127521, longitude: 80.268495 },
          description:'Start'
        },
        {
          title:'Umar Bhai D\'Alia',
          latlng:{ latitude: 13.184588, longitude: 80.308629 },
          description:'End'
        },
        {
          title:'Naseer Lal Beharry',
          latlng:{ latitude: 13.06872, longitude: 80.276393 },
          description:'Start'
        },
        {
          title:'Naseer Lal Beharry',
          latlng:{ latitude: 13.084705, longitude: 80.261833 },
          description:'End'
        }
      ]
    }
  }
  
  
  render(){
    // console.log(this.state.routes.length)3
    return (
      <MapView style={{flex:1}}
      initialRegion={{
        latitude: 13.09,
        longitude: 80.28,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
        >

    {this.state.markers.map((marker,index) =>{
        if(index%2==0){
          return <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description} 
                    pinColor='green'
                    />
        }
        else{
          return <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description} 
                    pinColor='red'
                    />
        }})}
      {this.state.markers.map((value,index) => {
        if(index%2==0){
          var start=value.latlng;
          var end=this.state.markers[index+1].latlng;
          console.log(start,end)
          return <MapViewDirections
            key={index}
            origin={start}
            destination={end}
            strokeWidth={3}
            strokeColor={getRandomColor()}
            apikey={GOOGLE_MAPS_APIKEY}
            />
        }
        else 
        return;
      })}
        
    </MapView>
  );
  }
};

export default App;
