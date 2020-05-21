import React, { Component } from 'react';
import { Card, CardImg,CardBody,CardText,CardTitle,Breadcrumb,BreadcrumbItem, Button, Row, Label,Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
// import {ListGroup,ListGroupItem,ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function RenderDish({dish}){
        
    return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
                
            </div>
    );
    }
    function RenderComments({comments,postComment,dishId}){
            
            const commentlist=comments.map((comment)=>{

                var options = { year: 'numeric', month: 'short', day: 'numeric' };
                var date=new Date(Date.parse(comment.date));
                console.log();

                return(
                    <Fade in>
                    <li key={comment.id.toString()}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', options).format(date)}</p>
                    </li>
                    </Fade>
                )
            }); 

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                    {commentlist}
                    </Stagger>
                    
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
                
        );
    }

const DishDetailed = (props) =>{
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
   else if(props.dish!=null){
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {props.dish.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>    
            </div>
            <div className="row">
            <RenderDish dish={props.dish}/>
            <RenderComments comments={props.comments}
             postComment={props.postComment}
             dishId={props.dish.id}
            />
            </div>    
        </div>
    );}
    else 
        return(
            <div></div>
        );
    
}


export default DishDetailed;
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen:false
        };

      }
    toggleModal=()=>{
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
      }
      handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
      render() {
        return (
            <React.Fragment>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm className="container" onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="Rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                            </Row>
                    <Row className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                            />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="Comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                            </Row>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </React.Fragment>
        )
      }
    }