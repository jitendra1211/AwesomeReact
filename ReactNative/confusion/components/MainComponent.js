import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Favourite from "./FavouriteComponent";
import Login from './LoginComponent';
import {View, Text, StyleSheet, ScrollView, Image,ToastAndroid} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
// import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders 
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})




const MenuStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ContactStack = createStackNavigator();
const AboutStack = createStackNavigator();
const FavouriteStack = createStackNavigator();
const ReservationStack = createStackNavigator();
const LoginStack = createStackNavigator();

const MainDrawer =createDrawerNavigator();


const headerOptions = {
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
      color: "#fff"            
  }
};

function StackMenuIconOptions(navigation){
  return ({
  headerLeft: () => (
        <Icon
        name='menu' size={24} 
        color= 'white'
        onPress={ () => navigation.toggleDrawer() }
        />
  )});
}


function DrawerIconOptions(icon,color) {
    return (
          <Icon
            name={icon}
            type='font-awesome'            
            size={icon == 'address-card'? 22 :24}
            color={color}
          />
    );
}

//  Custom Drawer

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
      <View style={styles.drawerHeader}>
          <View style={{flex: 1}}>
              <Image  style={styles.drawerImage}
                  source={require('./images/logo.png')}
              />
          </View>
          <View style={{flex: 2}}>
              <Text style={styles.drawerHeaderText}>
                  Ristorante Con Fusion
              </Text>
          </View>
      </View>
      <DrawerItemList {...props}/>
  </ScrollView>
);

// Below Stack Navigator for All Components Using LatestVersion Navigation

function MenuNavigator() {
    return (
      <MenuStack.Navigator initialRouteName="Menu" screenOptions={headerOptions}>
          <MenuStack.Screen name="Menu" component={Menu} options={({navigation}) => StackMenuIconOptions(navigation) } />
          <MenuStack.Screen name="Dishdetail" component={Dishdetail} />
     </MenuStack.Navigator>
    );
}
function HomeNavigator(){
    return (
      <HomeStack.Navigator screenOptions={headerOptions}>
          <HomeStack.Screen name="Home" component={Home} options={({navigation}) => StackMenuIconOptions(navigation) } />
      </HomeStack.Navigator>
    );
}

function ContactNavigator(){
  return (
    <ContactStack.Navigator screenOptions={headerOptions}>
        <ContactStack.Screen name="ContactUs" component={Contact} options={({navigation}) => StackMenuIconOptions(navigation) } />
    </ContactStack.Navigator>
  );
}
function AboutNavigator(){
  return (
      <AboutStack.Navigator screenOptions={headerOptions}>
          <AboutStack.Screen name="AboutUs" component={About} options={({navigation}) => StackMenuIconOptions(navigation) } />
      </AboutStack.Navigator>
  );
}

function FavouriteNavigator(){
  return (
      <FavouriteStack.Navigator screenOptions={headerOptions}>
          <FavouriteStack.Screen name="Favourite" component={Favourite} options= {({navigation}) => StackMenuIconOptions(navigation)} />
      </FavouriteStack.Navigator>
  );
}

function ReservationNavigator(){
  return (
      <ReservationStack.Navigator screenOptions={headerOptions}>
          <ReservationStack.Screen name="Reservation" component={Reservation} options={({navigation}) => StackMenuIconOptions(navigation)} />
      </ReservationStack.Navigator>
  );
}

function LoginNavigator(){
  return (
    <LoginStack.Navigator screenOptions={headerOptions}>
          <LoginStack.Screen name="Login" component={Login} options={({navigation}) => StackMenuIconOptions(navigation)} />
    </LoginStack.Navigator>
  );
}


     // Drawer Layout  Used Latest Version Navigation

function MainNavigator(){
  return (
      <MainDrawer.Navigator 
        initialRouteName="Home" 
        drawerStyle={
          {
            backgroundColor:'#D1C4E9'
          }
        }  
        drawerContent={
          props => <CustomDrawerContentComponent {...props} /> 
        }
      >

          <MainDrawer.Screen
            name="Login"
            component={LoginNavigator}
            options= {
              {
                drawerLabel : 'Login',
                drawerIcon: (props) => DrawerIconOptions('sign-in', props.color)
              }
            }
            />

          <MainDrawer.Screen 
            name="Home" 
            component={HomeNavigator} 
            options = {
              { 
                drawerLabel:'Home', 
                drawerIcon: (props)=>DrawerIconOptions('home', props.color)
              }
            } 
            />

          <MainDrawer.Screen 
            name="About Us" 
            component={AboutNavigator} 
            options = {
              { 
                drawerLabel:'About Us', 
                drawerIcon: (props)=>DrawerIconOptions('info-circle', props.color)
              }
            } 
            />

          <MainDrawer.Screen 
            name="Menu" 
            component={MenuNavigator} 
            options = {
              { 
                drawerLabel:'Menu', 
                drawerIcon: (props)=>DrawerIconOptions('list',props.color)
              }
            }
            />

          <MainDrawer.Screen 
            name="Contact Us" 
            component={ContactNavigator} 
            options = {
              { 
                drawerLabel:'Contact Us', 
                drawerIcon: (props)=>DrawerIconOptions('address-card',props.color)
              }
            } 
            />
            
          <MainDrawer.Screen
            name='Favourite'
            component={FavouriteNavigator}
            options = {
              {
                drawerLabel: 'Favourite',
                drawerIcon: (props) => DrawerIconOptions('heart', props.color)
              }
            }
            />
          
          <MainDrawer.Screen 
            name='Reserve Table'
            component={ReservationNavigator}
            options = {
              { 
                drawerLabel: 'Reserve Table', 
                drawerIcon: (props)=>DrawerIconOptions('cutlery',props.color)
              }
            } 
            />

      </MainDrawer.Navigator>
  );
}
 
class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.fetch().then((connectionInfo) => {
      ToastAndroid.show('Initial Network Connectivity Type: '
          + connectionInfo.type, ToastAndroid.LONG)
  });
  
  NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
        case 'none': 
            ToastAndroid.show ('You are now offline', ToastAndroid.LONG);
            break;
        case 'wifi':
            ToastAndroid.show ('You are now on WiFi', ToastAndroid.LONG);
            break;
        case 'cellular':
            ToastAndroid.show ('You are now on Cellular', ToastAndroid.LONG);
            break;
        case 'unknown' :
            ToastAndroid.show ('You are now have an Unknown connection', ToastAndroid.LONG);
            break;
        default: 
    }
}

  render() {
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>       
        <NavigationContainer>

          <MainNavigator/>
          
        </NavigationContainer>
      </View> 
 
        
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

  
export default connect(mapStateToProps, mapDispatchToProps)(Main);