import React from 'react';
const FloatingInput = ({labelName, value, onChange , onFocus, onBlur, onEnter, type = "text", error, debounce, hidden = false, index, id,symbol,maxLength, max,capitalize,className='',countryCode = '+91',integer=false})=>{
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

const FloatingCheckBox = ({labelName, defaultValue, onChange , style,className=''})=>{
    return  (<div className={`group ${className}`}>
                {
                  (defaultValue)?
                    <div className="row press" onClick={()=>{onChange(false);}}>
                      <input type="checkbox" id="checked" className="cbx hidden" onChange={()=>{}} checked={defaultValue} />
                      <label htmlFor="checked" className="lbl"></label>
                    </div>
                  :
                    <div className="row press" onClick={()=>{onChange(true);}}>
                      <input type="checkbox" id="unchecked" className="cbx hidden" onChange={()=>{}} checked={defaultValue} />
                      <label htmlFor="unchecked" className="lbl"></label>
                    </div>
                }
                {labelName}
            </div>);
};

const CheckBox = ({labelName, defaultValue, onSwitchChange , style, className='', elemId})=>{
    return  (<div className={`CheckBox ${className}`}>
                {
                  (defaultValue)?
                    <div id={`check-${elemId}`} key={elemId} className="press" onClick={()=>{
                        onSwitchChange(false,elemId);
                      }}>
                      <input id={`checked ${elemId}`} type="checkbox" className="cbx hidden" onChange={()=>{}} checked={defaultValue} />
                      <label htmlFor="checked" className="lbl"></label>
                    </div>
                  :
                    <div id={`unCheck-${elemId}`} key={elemId}  className="press" onClick={()=>{
                        onSwitchChange(true,elemId);
                      }}>
                      <input id={`unchecked ${elemId}`} type="checkbox" className="cbx hidden" onChange={()=>{}} checked={defaultValue} />
                      <label htmlFor="unchecked" className="lbl"></label>
                    </div>
                }
                {labelName}
            </div>);
};

const NormalCheckBox = ({labelName, defaultValue, onChange , style, className='', elemId, readOnly=false,mandatory})=>{
  let readOnlyClass = readOnly?'readOnly':'';
  let active = defaultValue?`active`:``;
  return  (<div className={`gb_checkbox_area ${readOnlyClass}`} onClick={()=>{
            if(!readOnly)
              onChange(!defaultValue);
          }}><div className={`${className} gb_checkbox ${active}`}>
              <div className={`gb_check`} />
          </div>{labelName?<div className="gb_label">{labelName} {mandatory?'*':null}</div>:null}</div>);
};

const FloatingDropDown = ({id, labelName, defaultValue, options, onChange, error, debounce, hidden=false,className='',mandatory})=>{
    let node = null;
    return ((!hidden)?<div id={id} className={`textGroup ${className}`} style={{textAlign:'left'}}>
        <label className={error ? "invalid" : "normal"}>{labelName} {mandatory?'*':null}</label>
        <br />
        <select className={error ? "textInput locationSelect invalid" : "textInput locationSelect"}
          defaultValue={defaultValue} onChange={(e)=>{onChange(e);}}
          ref={(c)=>{node=c;}}
          onChange={debounce?window.debounce(()=>{
            if(node)
              onChange(node.value);
            }):()=>{
              if(node)
                onChange(node.value);
            }
          }
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off" style={{height:44,backgroundColor:'transparent',fontSize:15,marginTop:7,minWidth:190,border:'1px solid #BDCCD5'}}>
          {
            options.map((option)=>{
              return (<option key={option.value} value={option.value}>{option.text}</option>);
            })
          }
        </select>
        <span className={error ? "highlight invalid" : "highlight"}></span>
        <span className={error ? "bar invalid" :"bar"}></span>
        {error ? <span className="error">{error} </span> : null}
    </div>:<div></div>);
};

const TextInput = ({labelName,placeholder, value, onChange , onFocus, onBlur, onEnter,onKeyUp,val, type = "text", error, debounce, hidden = false, index, id,symbol,maxLength, max,capitalize,className='',countryCode = '+91',integer=false,readOnly,mandatory})=>{
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
      inputSymbol = <div style={{width:40,position:'absolute',top:20,opacity:0.5}}><span style={{verticalAlign:'middle'}}>{symbol}</span></div>;
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
    if(readOnly){
      extraProps.readOnly = true;
    }
    return  ((!hidden)?<div className={`textGroup ${className} ${readOnly?'readOnly':''}`}>
                {labelName?<div><label>{labelName} {mandatory?'*':null}</label><br /></div>:null}
                <div className="wrapper">
                  {inputSymbol}
                <input className={error ? "textInput invalid" : "textInput"}
                  style={symbol || isPhone?{paddingLeft:40,...capitalize}:{...capitalize}}
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
                  value={val}
                  id={id}
                  required
                  placeholder = {placeholder || labelName}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  onKeyUp={(e)=>{
                    if(e.keyCode == 13 && onEnter){
                      onEnter();
                    }
                    onKeyUp && onKeyUp(e,node);
                    if(maxLength && type=="number"){
                      if(node.value.length>maxLength){
                        node.value=node.value.slice(0,10);
                      }
                    }
                  }}
                  />
                {isPhone?<span className="countryCode">{countryCode}</span>:null}
                </div>
                {error ? <span className="error">{error} </span> : null}
            </div>:<div></div>);
};

const SearchInput = ({labelName,placeholder, value, onChange , onFocus, onBlur, onEnter, type = "text", error, debounce, hidden = false, index, id,symbol,maxLength, max,capitalize,className='',countryCode = '+91',integer=false, showClose, onClose})=>{
    let node = null;
    let isPhone = false;
    if(capitalize){
      capitalize = {textTransform:'capitalize'};
    }
    if(symbol){
      inputSymbol = <div style={{width:44, height:44, position:'absolute',top:0,opacity:0.5}}><span style={{verticalAlign:'middle'}}>{symbol}</span></div>;
    }
    let maxLengthProp = {};
    if(maxLength && type!='number'){
      maxLengthProp = {
        maxLength:maxLength
      }
    }
    let extraProps = {};
    return  ((!hidden)?<div className={`textGroup ${className}`}>
                {labelName?<div><label>{labelName}</label><br /></div>:null}
                <div className="wrapper">
                <div className="view center" style={{ width: 32, height:44,  position: 'absolute', top: 4}}>
                  <img src="/mini_site_assets/assets/menu/menu-search.svg" style={{ width: 20, height: 20}}></img>
                </div>
                <input className={error ? "textInput invalid" : "textInput"}
                  style={{paddingLeft:32,...capitalize}}
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
                  value={value}
                  id={id}
                  required
                  placeholder = {placeholder || labelName}
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
                {showClose?<div onClick={onClose} className="view center" style={{ width: 30, height: 40, position: 'absolute', top: 6, right:2,}}>
                  <img src="/mini_site_assets/assets/menu/menu-clear-search.svg" style={{ width: 18, height: 18}}></img>
                </div>:<div />}
                </div>
                {error ? <span className="error">{error} </span> : null}
            </div>:<div></div>);
};

export { FloatingInput, FloatingCheckBox, FloatingDropDown, TextInput, SearchInput, CheckBox, NormalCheckBox};
