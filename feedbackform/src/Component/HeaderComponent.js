import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import '../App.css';

class Header extends Component {
    render(){
        return (
            <div class="row border">              
                <NavLink exact activeClassName='tabactive' to='/' style={{padding:10, paddingLeft:32,paddingRight:32,fontSize:12}} >
                    <div class="col-12">Form</div>
                 </NavLink>

                <NavLink activeClassName='tabactive' to='/table' style={{padding:10, paddingLeft:32,paddingRight:32,fontSize:12}}>
                    <div class="col-12">Table</div>
                </NavLink>                
            </div>
        )
    }
}

export default Header;