import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Image.scss';
import ImageDatas from './data/imageDatas';
import ImageFigure from './components/ImageFigure';
import ControllerUnit from './components/ControllerUnit';

let imgDatas=ImageDatas;
imgDatas=(function getImageURL(imageDataArr){
  for (let i=0;i<imageDataArr.length;i++){
    let data=imageDataArr[i];
    data.imageURL=require('./images/'+imageDataArr[i].fileName);
    imageDataArr[i]=data;
  }
  return imageDataArr;
})(imgDatas);

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            constant:this.Constant,
            imgsArrangeArr: [
                /*{
                    pos:{
                        left:0,
                        top:0,
                    },
                    rotate:0,//旋转角度
                    isInverse:false,//是否翻转
                    isCenter:false,//是否居中
                }*/
            ],
        }
    }
    componentDidMount(){
        this.stageDOM=ReactDOM.findDOMNode(this.refs.stage);
        this.stageW=this.stageDOM.scrollWidth;
        this.stageH=this.stageDOM.scrollHeight;
        this.halfStageW=Math.ceil(this.stageW/2);
        this.halfStageH=Math.ceil(this.stageH/2);
        this.imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFigure0);
        this.imgW=this.imgFigureDOM.scrollWidth;
        this.imgH=this.imgFigureDOM.scrollHeight;
        this.halfImgW=Math.ceil(this.imgW/2);
        this.halfImgH=Math.ceil(this.imgH/2);
        this.Constant={
            centerPos:{
                left:this.halfStageW-this.halfImgW,
                top:this.halfStageH-this.halfImgH,
            },
            hPosRange:{
                leftSecX:[-this.halfImgW,this.halfStageW-this.halfImgW*3],
                rightSecX:[this.halfStageW+this.halfImgW,this.stageW-this.halfImgW],
                y:[-this.halfImgH,this.stageH-this.halfImgH],
            },
            vPosRange:{
                topY:[-this.halfImgH,this.halfStageH-this.halfImgH*3],
                x:[this.halfStageW-this.imgW,this.halfStageW],
            }
        };
        this.currentIndex=0;
        this.rearrange();

    }


    rearrange(){
        let centerIndex=this.currentIndex;
        let imgsArrangeArr=this.state.imgsArrangeArr;
        let l_constant=this.Constant;
        let centerPos=l_constant.centerPos;
        let hPosRange=l_constant.hPosRange;
        let vPosRange=l_constant.vPosRange;
        let hPosRangeLeftSecX=hPosRange.leftSecX;
        let hPosRangRightSecX=hPosRange.rightSecX;
        let hPosRangeY=hPosRange.y;
        let vPosRangTopY=vPosRange.topY;
        let vPosRangeX=vPosRange.x;

        //center
        let imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);
        imgsArrangeCenterArr[0].pos=centerPos;
        imgsArrangeCenterArr[0].rotate=0;
        imgsArrangeCenterArr[0].isCenter=true;
        //top
        let imgsArrangeTopArr=[];
        let topImgNum= Math.random() > 0.5 ? 0 : 1;
        let topImgSpliceIndex=0;
        topImgSpliceIndex=Math.ceil(Math.random()*(imgsArrangeArr.length-topImgNum));
        imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
        imgsArrangeTopArr.forEach((value,index)=>{
           value.pos={
               top:this.getRangeRandom(vPosRangTopY[0],vPosRangTopY[1]),
               left:this.getRangeRandom(vPosRangeX[0],vPosRangeX[1]),
           };
           value.rotate=this.getDegRandom(30);
           value.isCenter=false;
           value.isInverse=false;
        });
        //left and right
        for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i ++) {
            let hPosRangeLORX=null;
            if(i<k){
                hPosRangeLORX=hPosRangeLeftSecX;
            }else{
                hPosRangeLORX=hPosRangRightSecX;
            }
            imgsArrangeArr[i].pos={
                top:this.getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                left:this.getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1]),
            };
            imgsArrangeArr[i].rotate=this.getDegRandom(30);
            imgsArrangeArr[i].isCenter=false;
            imgsArrangeArr[i].isInverse=false;
        }
        if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr:imgsArrangeArr
        });
    }
    //获取区间随机数
    getRangeRandom(low,high){
        return Math.ceil(Math.random()*(high-low)+low);
    }
    //获取区间随机角度的正负值
    getDegRandom(deg){
        return (Math.random()>0.5?1:-1)*Math.ceil(Math.random()*deg);
    }
    //翻转图片
    inverse(index){
        return ()=>{
            let imgsArrangeArr=this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr:imgsArrangeArr,
            })
        }
    }
    //居中对应index的图片
    centerImg(index){
        return ()=>{
            this.currentIndex=index;
            this.rearrange();
        };
    }

    render() {
        let controllerUnits=[];
        let imgFigures=[];
        imgDatas.forEach((value,index)=>{
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index]={
                    pos:{
                        left:0,
                        top:0,
                    },
                    rotate:0,
                    isInverse:false,
                    isCenter:false,
                }
            }
            imgFigures.push(<ImageFigure
                key={index.toString()}
                data={value}
                ref={'imgFigure'+index}
                arrange={this.state.imgsArrangeArr[index]}
                inverse={this.inverse(index)}
                center={this.centerImg(index)}
            />);
            controllerUnits.push(<ControllerUnit
                key={index.toString()}
                arrange={this.state.imgsArrangeArr[index]}
                inverse={this.inverse(index)}
                center={this.centerImg(index)}
            />)
        });
        let l_style={
          height:window.innerHeight+'px',
        };
        return (
            <section className="stage" style={l_style} ref='stage'>
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }


}

