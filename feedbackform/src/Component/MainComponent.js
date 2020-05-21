import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import Header from './HeaderComponent';
import Formtab from './FormComponent';
import Tabletab from './TableComponent';
class Main extends Component {
    render() {
        return (
            <div className="container my-5 border">
                <Header/>
                <Switch>
                    <Route exact path='/' component={Formtab}/>
                    <Route path='/table' component={Tabletab}/>
                </Switch>
            </div>            
        )
    }
}

export default Main;
