<script src="http://192.168.42.139:8097"></script>
import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView, StyleSheet,Button, Modal, Alert, PanResponder, Share} from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
})



function RenderDish(props){
    

    const dish = props.dish;
    handleViewRef = ref => this.view = ref;
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx >200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            else if(recognizeComment(gestureState)){
                return props.toggleModal()
            }
                
            return true;
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

    if (dish != null) {
        
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={this.handleViewRef}
            {...panResponder.panHandlers}>

                        <Card
                            featuredTitle={dish.name}
                            image={{uri: baseUrl + dish.image}}>
                                <Text style={{margin: 10}}>
                                    {dish.description}
                                </Text>
                                <View style={{ flex:1, justifyContent: 'center', alignItems :'center', flexDirection: 'row' }}>
                                    <Icon
                                    raised
                                    reverse
                                    name={props.favourite ? 'heart' : 'heart-o'}
                                    type='font-awesome'
                                    color='#f50'
                                    onPress={props.favourite ? console.log('Already Selected') : props.onPress  }
                                    />
                                    <CommentForm isModalOpen={props.isModalOpen} 
                                        toggleModal={props.toggleModal} 
                                        handleSubmit={props.handleSubmit}
                                        rating={props.rating}
                                        author={props.author}
                                        comment={props.comment}
                                        />
                                    
                                    <Icon
                                        raised
                                        reverse
                                        name='share'
                                        type='font-awesome'
                                        color='#51D2A8'
                                        style={styles.cardItem}
                                        onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} 
                                            />
                                </View>
                        </Card>  
                    </Animatable.View>      
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentsItem = ({item, index}) =>{
        return (
            <View key={index} style={{margin:10}} >
                <Text style={{fontSize : 14 }} > {item.comment} </Text>
                <View style={{flex :1, alignItems:'flex-start'}}>
                    <Rating
                        startingValue={item.rating}
                        imageSize={14}
                        isDisabled= {true}
                        style={{ paddingVertical: 10 }}
                        />
                </View>
                <Text style={{ fontSize : 12 }} > {'---' + item.author +','+ item.date } </Text>
            </View>
        );
    }

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>   
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentsItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );

}
function CommentForm(props){
       
    return (
        <View>
                <Icon
                    raised
                    reverse
                    name={'pencil'}
                    type='font-awesome'
                    color='#512DA8'
                    onPress={props.toggleModal}
                    />
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={props.isModalOpen}
                    onDismiss={props.toggleModal}
                    onRequestClose ={props.toggleModal}
                    >
                    <View style={styles.modal}>
                        <Rating
                            startingValue={5}
                            ratingCount={5}
                            imageSize={50}
                            showRating
                            onFinishRating={props.rating}
                            />
                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={props.author}
                            />
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={props.comment}
                            />

                        <View style={styles.btn} >
                            <Button 
                                onPress = {props.handleSubmit}
                                color="#512DA8"
                                title="Submit"
                                />
                        </View>
                        
                        <View style={styles.btn} >
                            <Button
                                onPress = {() => this.toggleModal()}
                                title="Close"
                                color="#aaa"
                            />
                        </View>
                    </View>        
                </Modal> 
        </View>

    );
}



class Dishdetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            rating : 5,
            author : '',
            comment :'',
            isModalOpen : false
        };
    }
    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }
    handleSubmit() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(this.props.route.params.dishId,this.state.rating,this.state.author,this.state.comment);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };


    markFavourite(dishId) {
        this.props.postFavorite(dishId);
    }
    

    render() {
        
        const dishId = this.props.route.params.dishId;

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                favourite ={this.props.favorites.some(el => el===dishId) }
                onPress={() => this.markFavourite(dishId)}
                isModalOpen={this.state.isModalOpen}
                toggleModal={() => this.toggleModal()}
                handleSubmit={() => this.handleSubmit()}
                rating={(rating) => this.setState({rating : rating})}
                author={(author) => this.setState({author : author})}
                comment={(comment) => this.setState({comment : comment})}
                 />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}



styles = StyleSheet.create ({
    modal: {
        justifyContent: 'center'
    },
    btn : {
        margin :10 
        
    }
});

            

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);