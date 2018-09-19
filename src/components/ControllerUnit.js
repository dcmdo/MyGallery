import React from 'react';

export default class ControllerUnit extends React.Component{

    //点击处理函数
    handleClick(e){
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    }
    render(){

        let controllerClassName='controller-unit';
        if(this.props.arrange.isCenter){
            controllerClassName+='is-center';
            controllerClassName+=this.props.arrange.isInverse?' is-inverse':'';
        }

        return (
            <span className={controllerClassName} onClick={this.handleClick.bind(this)}>

            </span>
        );
    }

}
