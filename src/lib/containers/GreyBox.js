import React from 'react';

const onClose = (props) => {
    const {backUrl} = props;
    if(backUrl && !window.location.state){
        window.location.href = backUrl;
    }else{
        window.history.back();
    }
}

export default (props) =>{
    const fullScreen = props.fullScreen || false;
    if(fullScreen){
        return <div className="greyBox black" style={{backgroundColor:'white'}}>
            <div className="backWrapper">
                <button className="button-reset backButton" onClick={()=>{
                    onClose(props);
                }}><span>&#8592;</span> <span>{props.backText || 'BACK'}</span></button>
            </div>
            {props.children}
        </div>;
    }
    return <div className="greyBox black">
        <div className="greyBoxContent greyBoxAnimate">
            <div className="card">
                {props.children}
                <div style={{textAlign:'right',marginRight:15,fontWeight:'bold'}}>
                    <button className="button-reset" onClick={()=>{
                        onClose(props);
                    }}>CLOSE</button>
                </div>
            </div>
        </div>
    </div>;
};