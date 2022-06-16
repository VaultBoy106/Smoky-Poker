import React, {Component} from "react";
import './card.css'
class Card extends Component {
    constructor(props){
        super(props)
        this.randomAng = Math.floor(Math.random() * 90) - 45;
        this.xPos = Math.floor(Math.random() * 40) - 20;
        this.yPos = Math.floor(Math.random() * 40) - 20;
    }
    render(){
          
        return (
            <div>
                <img className="card" src = {this.props.imgUrl} alt = {this.props.altTag} style = {{
                    zIndex: this.props.zIdx,
                    transform: `translate(${this.xPos}px, ${this.yPos}px) rotate(${this.randomAng}deg)`
                }}>
              </img>
            </div>
            
        )
    }
}
export default Card; 