import React, { Component } from "react";
// import { View, Text } from "react-native";
import MapView, {Marker,Polyline } from "react-native-maps";
import { decode } from "@mapbox/polyline";
// import MapViewDirections from 'react-native-maps-directions';

// const origin = {latitude: 37.3318456, longitude: -122.0296002};
// const destination = {latitude: 37.771707, longitude: -122.4053769};
// const GOOGLE_MAPS_APIKEY = 'AIzaSyCNpl-g_PXWP5mW2i44ySwpNuygZryO8zY';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const getDirections = async (startLoc, destinationLoc) => {
  try {
    const KEY = "AIzaSyCNpl-g_PXWP5mW2i44ySwpNuygZryO8zY";
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    );
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    return coords;
  } catch (error) {
    return error;
  }
};

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      coords:[],
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
      ],
      path:[
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
        },
      ]
    }
  }
  
  componentDidMount(){
    this.state.path.map((value,index) => {
      if(index%2==0){
        var start=value.latlng.latitude+','+value.latlng.longitude;
        var nextval=this.state.path[index+1];
        var end=nextval.latlng.latitude+','+nextval.latlng.longitude;
        console.log(start,end)
        getDirections(start, end)
        .then(coords =>this.setState({coords:this.state.coords.concat([coords])}))
        .catch(err => console.log(err));
      }
    })
    // this.setState({routes:rtrn})

      
  }
  
  render(){
    // console.log(this.state.routes.length)3
  // this.state.routes.forEach(element => {
  //     console.log(element.length);
  //   });
console.log(this.state.markers.length)
    return (
      <MapView style={{flex:1}}
      initialRegion={{
        latitude: 13.09,
        longitude: 80.28,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
      onPress={(e)=>{this.setState({markers:this.state.markers.concat({title:'hi',latlng:e.nativeEvent.coordinate, description:'stop'})})}}
        >

    {this.state.coords.map((marker,index) =>{
        console.log(marker[0].latitude,marker[0].longitude)
        return <>
                <Marker
                    key={index}
                    coordinate={{latitude:marker[0].latitude,longitude:marker[0].longitude}}
                    // title={marker.title}
                    // description={marker.description} 
                    pinColor='green'
                    />
                <Marker
                    key={index+10}
                    coordinate={{latitude:marker[25].latitude,longitude:marker[25].longitude}}
                    // title={marker.title}
                    // description={marker.description} 
                    pinColor='green'
                    />
                <Marker
                    key={index+20}
                    coordinate={{latitude:marker[marker.length-1].latitude,longitude:marker[marker.length-1].longitude}}
                    // title={marker.title}
                    // description={marker.description} 
                    pinColor='green'
                    />
                  </>
          
        
        })}

      {this.state.coords.map((value,index) =><Polyline coordinates={value} strokeWidth={6} strokeColor={getRandomColor()} tappable={true} onPress={(e)=>console.log(e.nativeEvent.coordinate)} />)}
      {/* <Polyline coordinates={this.state[this.state.arr[0]]} />
      <Polyline coordinates={this.state[this.state.arr[1]]}  />
      <Polyline coordinates={this.state[this.state.arr[2]]}  />
         */}
    </MapView>
  );
  }
};

export default App;


// {this.state.markers.map((value,index) => {
//   if(index%2==0){
//     var start=value.latlng;
//     var end=this.state.markers[index+1].latlng;
//     console.log(start,end)
//     return <MapViewDirections
//       key={index}
//       origin={start}
//       destination={end}
//       strokeWidth={3}
//       strokeColor={getRandomColor()}
//       apikey={GOOGLE_MAPS_APIKEY}
      
//       />
//   }
//   else 
//   return;
// })}