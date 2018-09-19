import React from 'react';

export default class ImageFigure extends React.Component{

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
      let styleObj={};
      if(this.props.arrange.pos){
          styleObj=Object.assign({},this.props.arrange.pos);
      }
      if(this.props.arrange.rotate){
          (['MozTransform','msTransform','WebkitTransform','transform']).forEach(value => {
              styleObj[value]='rotate('+this.props.arrange.rotate+'deg)';
          });
      }
      if(this.props.arrange.isCenter){
          styleObj.zIndex=11;
      }
      let imgFigureClassName='img-figure';
      imgFigureClassName+=this.props.arrange.isInverse?' is-inverse':'';
    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className='img-title'>{this.props.data.title}</h2>
            <div className="img-back" onClick={this.handleClick.bind(this)}>
                <p>
                    {this.props.data.desc}
                </p>
            </div>
        </figcaption>
      </figure>
    );
  }

}
