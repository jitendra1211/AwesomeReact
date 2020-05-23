import React, { Component } from 'react';
import {Row,Col, Button, Form, FormGroup,Label,Input} from 'reactstrap';
import  '../index.css';



class Formtab extends Component{
        constructor(props){
            super(props);
            this.state={
                textField:'',
                email:'',
                radio:'',
                name:'',
                contact:''
            }
        }
    
    render(){
        return(
            <div className="row p-3 bg-light">
                <div className='col-12 '>
                    <h6 className="text-primary mb-1" style={{fontSize:14}}> Aromatic Bar</h6>
                    <p className="text-secondary " style={{fontSize:12}} >We are committed to providing you with the best dining experience possible, so we welcome your comments. Please fill out this questionnaire. Thank you. </p>
                </div>
                <div className="col-12 bg-white">
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <FormGroup >
                                    <Label className='label' for='text'>Text Field</Label>
                                    <Input  className='input' type='text' name='formfield' id='text' valid={false}  invalid={false}/>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup >
                                    <Label className="label" for='email'>Email</Label>
                                    <Input className='input'  type='email' name='email' id='email' valid={true}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup >
                                    <Label className='label' for='text'>Text Field</Label>
                                    <Input  className='input' type='text' name='formfield' id='text' valid={false}  invalid={false}/>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup >
                                    <Label className="label" for='email'>Email</Label>
                                    <Input className='input'  type='email' name='email' id='email'   />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Formtab;