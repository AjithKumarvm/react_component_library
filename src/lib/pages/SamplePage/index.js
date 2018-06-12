import React from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {reducer} from './reducer';
import {sampleAction} from './actions';
import Header from './Header';
import FloatingInput from './../../components/Fields/Input';

const sampleStore = createStore(reducer);
window.sampleStore = sampleStore;

class SampleComponent extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.componentDidMount();
  }
  render(){
    const data = this.props.data;
    return <article className="container">
      <Header {...this.props} />
      <section>
        Floating Input
        <FloatingInput labelName="Floating Input" />

      </section>
      <button onClick={()=>this.props.onButtonClick(data)}>click</button>
      Data: {data}
    </article>;
  }
}

const VisibleSampleComponent = connect(({data})=>{
  return {
    data
  };
},(dispatch)=>{
  return {
    componentDidMount:()=>{
      //async tasks
    },
    onButtonClick:(data)=>{
      dispatch(sampleAction(data));
    }
  }
})(SampleComponent);

export default ({match}) => (<Provider store={sampleStore}>
  <VisibleSampleComponent match={match} />
</Provider>);
