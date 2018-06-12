import React from 'react';
import {connect} from 'react-redux';
import GreyBox from './../../containers/GreyBox';

class Stats extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        const self = this;
    }
    render(){
        
        return  <GreyBox fullScreen={true} backUrl={window.location.href.replace('/stats','')}>
                    STATS
                </GreyBox>
        };
}

export  default connect(null,null)(Stats);