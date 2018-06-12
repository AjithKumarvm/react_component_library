import React from 'react';
import {NavLink,Route} from 'react-router-dom';
import Stats from './Stats';
import './../../../scss/components/_header.scss';

class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        const {match} = this.props;
        return <div className="header">
            HEADER
            &nbsp;&nbsp;<NavLink to={`${match.url}/stats`} className={`statsLink`}>
                stats <img src="https://media.goodbox.in/webappassets/bar-chart_2.png" height="15" />
            </NavLink>
            <Route path={`${match.url}/stats`} component={Stats} />
        </div>;
    }
}

export default Header;