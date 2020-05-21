import React,{Component } from 'react';
import {View,Text,StyleSheet, ScrollView,TouchableOpacity} from 'react-native';
import {Image, SearchBar,Badge,Icon} from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import Geocoder from 'react-native-geocoder';



class HomeTab extends Component {
    constructor(props){
        super(props);
        this.state ={
            search:"",
            images: [         
                require('../assets/Sunrise.jpg'),        
                require('../assets/River.jpg'),
                require('../assets/Road.jpg'),
                require('../assets/Sea.jpg')              
                ],
            icon: [
                {
                    image:require('../assets/Icon/png/001-steak.png'),
                    title:'Steak'
                },
                {
                    image:require('../assets/Icon/png/002-bowling.png'),
                    title:'Bowling'
                },
                {
                    image:require('../assets/Icon/png/003-kite.png'),
                    title:'Kite'

                },
                {
                    image:require('../assets/Icon/png/004-videogames.png'),
                    title:'VideoGame'
                },
                {
                    image:require('../assets/Icon/png/011-basketball.png'),
                    title:'BasketBall'
                },
                {
                    image:require('../assets/Icon/png/006-spray.png'),
                    title:'Spray'
                }
            ],
            dish :[
                    {
                    id: 0,
                    name:'Uthappizza',
                    image: require('../assets/image/uthappizza.png'),
                    description:'Uthappam and pizza'                    
                    },
                    {
                    id: 1,
                    name:'Zucchipakoda',
                    image: require('../assets/image/zucchipakoda.png'),
                    description:'Deep fried Zucchini'
                    },
                    {
                    id: 2,
                    name:'Vadonut',
                    image: require('../assets/image/vadonut.png'),
                    description:'it a vada or is it a donut?'
                    },
                    {
                    id: 3,
                    name:'ElaiCheese Cake',
                    image: require('../assets/image/elaicheesecake.png'),
                    description:'New York Style Cheese Cake'
                    }
                ]
        }
    }
    
    updateSearch =(search) =>{
        this.setState({search});
    }
    render(){
        
        const iconItems=this.state.icon.map((item,index)=>{ 
            return (
                <View key={index.toString()} style={{margin:8,padding:5, backgroundColor:'white',borderRadius:20}}>
                    <Image
                        source={item.image}
                        style={{width:80,height:80,borderRadius:20}}
                        />
                    <Text style={{marginLeft:12,marginTop:5}}>{item.title}</Text>
                </View>
            );  
          })
        
        const cardItems=this.state.dish.map((item,index)=>{
            return (
                    <View  key={item.id} style={{flex:1, flexDirection:'row' ,backgroundColor:'white', padding:10,margin:10,borderRadius:20}}>
                        <Image source={item.image} style={{flex:1,width:100, height:100, marginHorizontal:5,borderRadius:20}}/>
                        <View style={{flex:1,width: 140,height:100}}>
                            <Text style={{fontSize:18,marginLeft:10, marginTop:5}}>{item.name}</Text>
                            <Text style={{fontSize:12,marginLeft:10,marginTop:15,color:'#666'}}>{item.description}</Text>
                        </View>
                    </View>
            );
        })

        return(
                <ScrollView>
                    <View style={{backgroundColor:'#fff'}}>
                    <SearchBar
                        platform='android'
                        containerStyle={{marginHorizontal:10, height:50, justifyContent:'center',borderRadius:50, backgroundColor:'#ffe6ff' }}
                        placeholder="Type Here..."
                        placeholderTextColor='#bbb'
                        onChangeText={this.updateSearch}
                        value={ this.state.search}
                        />
                    <View style={{margin:10}}>
                        <SliderBox   
                            images={this.state.images} 
                            style={{height:150,width:'95%',borderRadius:20}} 
                            sliderBoxHeight={200}   
                            onCurrentImagePressed={
                            index => console.warn(`image ${index} pressed`)
                            }  
                            dotColor="#ff0"   
                            inactiveDotColor="white"   
                            paginationBoxVerticalPadding={20}   
                            autoplay   
                            circleLoop />
                    </View>
                    <View style={{marginTop:10, marginLeft:10}}>
                        <Text style={{fontSize:20}}>Explore By Category</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        >
                            {iconItems}
    
                    </ScrollView>
                    <View style={{marginTop:10, marginLeft:10}}>
                        <Text style={{fontSize:20}}>Order Again</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        >
                            {cardItems}
                    </ScrollView>
                    
                    <View style={{marginTop:10, marginLeft:10}}>
                        <Text style={{fontSize:20}}>Recommended</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        >
                        <View style={{flex:1, flexDirection:'row' ,backgroundColor:'white', padding:10,margin:5,borderRadius:20}}>
                            <Image source={require('../assets/Cake.jpg')} style={{flex:1,width:200, height:150, marginHorizontal:5,borderRadius:20}}/>
                            <View style={{flex:1,width: 120,height:100}}>
                                <Text style={{fontSize:18,marginLeft:10, marginTop:5}}>Chocalate Blueberries Cake</Text>
                                <Badge containerStyle={{marginLeft:-45, marginTop:10}} textStyle={{fontSize:8}} value=" 20% off " status="warning" />
                                <TouchableOpacity onPress={()=>{alert('helo')}  }>
                                    <Icon
                                        name="plus"
                                        type='font-awesome'
                                        color='#ff33bb'
                                        style={{backgroundColor:'#ffe6f7', borderRadius:10,margin:10,padding:10,height:40,width:40}}
                                        size={20}
                                        />
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row' ,backgroundColor:'white', padding:10,margin:5,borderRadius:20}}>
                            <Image source={require('../assets/pasta.jpg')} style={{flex:1,width:200, height:150, marginHorizontal:5,borderRadius:20}}/>
                            <View style={{flex:1,width: 120,height:100}}>
                                <Text style={{fontSize:18,marginLeft:10, marginTop:5}}>Pasta with Green Sauce</Text>
                                <Badge containerStyle={{marginLeft:-45, marginTop:10}} textStyle={{fontSize:8}} value=" 12% off " status="warning" />
                                <TouchableOpacity onPress={()=>{alert('helo')}  }>
                                    <Icon
                                        name="plus"
                                        type='font-awesome'
                                        color='#ff33bb'
                                        style={{backgroundColor:'#ffe6f7', borderRadius:10,margin:10,padding:10,height:40,width:40}}
                                        size={20}
                                        />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row' ,backgroundColor:'white', padding:10,margin:5,borderRadius:20}}>
                            <Image source={require('../assets/pizza.jpg')} style={{flex:1,width:200, height:150, marginHorizontal:5,borderRadius:20}}/>
                            <View style={{flex:1,width: 120,height:100}}>
                                <Text style={{fontSize:18,marginLeft:10, marginTop:5}}>Colorful Pizza</Text>
                                <Badge containerStyle={{marginLeft:-45, marginTop:10}} textStyle={{fontSize:8}} value=" 10% off " status="warning" />
                                <TouchableOpacity onPress={()=>{alert('helo')}  }>
                                    <Icon
                                        name="plus"
                                        type='font-awesome'
                                        color='#ff33bb'
                                        style={{backgroundColor:'#ffe6f7', borderRadius:10,margin:10,padding:10,height:40,width:40}}
                                        size={20}
                                        />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    </View>
                </ScrollView>

                
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
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        borderTopRightRadius:0,
        width:200,
        height:50,
        backgroundColor:'red',
    },
    headerImage:{
        flex:1,
        alignItems:'flex-end'
    }
})

export default HomeTab;
