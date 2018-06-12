import React from 'react';
import '../../../scss/components/Fields/_material.scss'
const FloatingInput = ({labelName, value, onChange=()=>{} , onFocus, onBlur, onEnter, type = "text", error, debounce, hidden = false, index, id,symbol,maxLength, max,capitalize,className='',countryCode = '+91',integer=false})=>{
    let node = null;
    let inputSymbol = '';
    let isPhone = false;
    if(capitalize){
      capitalize = {textTransform:'capitalize'};
    }
    if(type == 'phone'){
      isPhone = true;
      type = 'number';
    }
    if(symbol){
      inputSymbol = <div style={{width:20,position:'absolute',top:1}}><span style={{verticalAlign:'middle'}}>{symbol}</span></div>;
    }
    let maxLengthProp = {};
    if(maxLength && type!='number'){
      maxLengthProp = {
        maxLength:maxLength
      }
    }
    let extraProps = {};
    if(type == 'number'){
      extraProps = {
        min:-9999999999,
        max:max || 9999999999,
        step:0.00000000001,
        onKeyUp: (e)=>{
          if(type=='number' && e.target.validity){
            console.log('value',e.target.value);
            if(!e.target.validity.valid || (integer && e.target.value.indexOf('.') != -1)){
              e.target.value = '';
            }
          }
        }
      };
    }
    return  ((!hidden)?<div className={`group ${className}`}>
                {inputSymbol}
                <input className={error ? "inputMaterial invalid" : "inputMaterial"}
                  style={symbol?{paddingLeft:20,...capitalize}:{...capitalize}}
                  ref={(c)=>{node=c;}}
                  onChange={debounce?window.debounce(()=>{
                    if(node)
                      {
                        if(!node.value)
                          node.value = '';
                        onChange(node.value, index);
                      }
                    }):()=>{
                    if(node) {
                      if(!node.value)
                        node.value = '';
                      onChange(node.value, index);}
                    }
                  }
                  onBlur={onBlur}
                  onFocus={onFocus}
                  type={type}
                  {...extraProps}
                  {...maxLengthProp}
                  defaultValue={value}
                  id={id}
                  required
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  onKeyUp={(e)=>{
                    if(e.keyCode == 13 && onEnter){
                      onEnter();
                    }
                    if(maxLength && type=="number"){
                      if(node.value.length>maxLength){
                        node.value=node.value.slice(0,10);
                      }
                    }
                  }}
                  />
                <span className={error ? "highlight invalid" : "highlight"}></span>
                <span className={error ? "bar invalid" :"bar"}></span>
                {isPhone?<span className="countryCode">{countryCode}</span>:null}
                <label style={symbol?{paddingLeft:20}:{}} className={error ? "invalid" : "normal"}>{labelName}</label>
                {error ? <span className="error">{error} </span> : null}
            </div>:<div></div>);
};

export default FloatingInput;