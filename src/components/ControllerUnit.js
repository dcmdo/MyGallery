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

        let controllerUnitClassName='controller-unit';
        if(this.props.arrange.isCenter){
            controllerUnitClassName+=' is-center';
            controllerUnitClassName+=this.props.arrange.isInverse?' is-inverse':'';
        }

        return (
            <span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}>

            </span>
        );
    }

}
