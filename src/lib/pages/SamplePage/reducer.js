import React from 'react';
const defaultState = {
  data:0
}
const reducer = (state=defaultState, action)=>{
  switch(action.type){
    case 'SAMPLE_ACTION': {
        return {
            ...state,
            data:++action.data
        };
    }
    default:
      return state;
  }
};

export {reducer};
