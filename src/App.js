import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super()
    this.state={
      snake:[[0,0],[2,0]],
      length:2,
      food:{
        left:Math.floor((Math.random()*99)/2)*2,
        top:Math.floor((Math.random()*99)/2)*2},
      direction:'RIGHT',
      level:0,
      value:true,
      over:false
    }
  } 
  componentDidMount(){
    var a=prompt('Enter level: (1-10)');
    console.log(a)
    if(a>=1 && a<=10){
      this.setState({
        level:a
      })
      a=200-(a-1)*20;
      setInterval(this.moveSnake,a);
      document.onkeydown=this.onKeyDown;
    }     
    else{
      this.setState({
        value:false
      })      
    }
  }
  componentDidUpdate(){
    this.checkifoutofborders();
    this.checkifhit();
    this.checkifeat();
  }
  onKeyDown=(e)=>{
    e=e||window.event;
    switch(this.state.direction){
      case 'RIGHT':
        switch(e.keyCode){
          case 38:
            this.setState({
              direction:'UP'
            });
            break;
          case 40:
            this.setState({
              direction:'DOWN'
            });
            break;
        }
        break;
        case 'LEFT':
          switch(e.keyCode){
            case 38:
              this.setState({
                direction:'UP'
              });
              break;
            case 40:
              this.setState({
                direction:'DOWN'
              });
              break;
          }
          break;
        case 'UP':
          switch(e.keyCode){
            case 37:
              this.setState({
                direction:'LEFT'
              });
              break;
            case 39:
              this.setState({
                direction:'RIGHT'
              });
              break;
          }
          break;
        case 'DOWN':
          switch(e.keyCode){
            case 37:
              this.setState({
                direction:'LEFT'
              });
              break;
            case 39:
              this.setState({
                direction:'RIGHT'
              });
              break;
          }
          break;
    }    
    
  }
  moveSnake=()=>{
    let dots=[...this.state.snake];
    let head=dots[dots.length-1];
    switch(this.state.direction){
      case 'RIGHT':     
        head=[head[0]+2,head[1]];
        break;
      case 'LEFT':
        head=[head[0]-2,head[1]];
        break;
      case 'UP':
        head=[head[0],head[1]-2];
        break;
      case 'DOWN':
        head=[head[0],head[1]+2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
          snake:dots
      }
    )
  }
  checkifoutofborders=()=>{
    const head=this.state.snake[this.state.snake.length-1];
    if(head[0]>=100 || head[0]<0 ||head[1]>=100 || head[1]<0)
      this.onGameOver()
  }
  checkifhit=()=>{
    const snak=[...this.state.snake];
    const head=snak[snak.length-1];
    snak.pop();
    snak.forEach((body)=>{
      if(head[0]===body[0] && head[1]===body[1])
        this.onGameOver();
    })
  }
  checkifeat=()=>{
    const snak=[...this.state.snake];
    const head=snak[snak.length-1];
    if(head[0]===this.state.food.left && head[1]===this.state.food.top){
      this.setState({
        food:{
          left:Math.floor((Math.random()*99)/2)*2,
          top:Math.floor((Math.random()*99)/2)*2
        }
      })
      snak.unshift([])
      this.setState({
        snake:snak,
        length:snak.length
      })
    }
  }
  reset=()=>{
    this.setState({
      snake:[[0,0],[2,0]]
    })
  }
  resetall=()=>{
    this.setState({
      direction:'RIGHT',
      snake:[[0,0],[2,0]],
      length:2,
      over:false,
      food:{
        left:Math.floor((Math.random()*99)/2)*2,
        top:Math.floor((Math.random()*99)/2)*2}
    })
  }
  onGameOver=()=>{
    this.setState({
      over:true
    })
    this.reset();
  }
  render(){
    if(this.state.value){
      if(this.state.over){
        return(
          <>
          <h1 style={{color:'red',textAlign:'center'}}>Welcome to Snake Xenia</h1>
          <div style={{backgroundColor:'black'}}>
          <div className="area">
            <h1 style={{textAlign:'center',padding:'15% 15% 2% 15%'}}>Game Over. Your Score is <span style={{color:'green'}}>{this.state.length-2}</span></h1>
            <h4 style={{textAlign:'center',paddingBottom:'15%'}}>Note: To change level refresh page</h4>
            <button style={{margin:'0 40%',backgroundColor:'green',textAlign:'center',color:'white', width:'20%',height:'10%'}} onClick={this.resetall}>Replay</button>
          </div>
          </div>
          </>
        )      
      }
      else{
        return(
          <>
          <h1 style={{color:'red',textAlign:'center'}}>Welcome to Snake Xenia</h1>
          <h2 style={{color:'green',textAlign:'center'}}>Score: <span style={{color:'red'}}>{this.state.length-2}</span> Level: <span style={{color:'red'}}>{this.state.level}</span></h2>
          <div style={{backgroundColor:'black'}}>
          <div className="area">
            <div className="snake">
              {this.state.snake.map((dots,i)=>{
                const style={
                  left:`${dots[0]}%`,
                  top:`${dots[1]}%`
                }
                return(
                  <div className="dot" key={i} style={style}></div>
                )
              })}
            </div>
            <div className="food" style={{left:`${this.state.food.left}%`,top:`${this.state.food.top}%`}}></div>
          </div>
          </div>
          </>
        )
      }     
    }
    else{
      return(
        <div style={{backgroundColor:'black'}}>
        <div className="area">
          <h1 style={{color:'red',textAlign:'center'}}>Enter the level correctly. Refresh the page to re-enter level</h1>
        </div>
        </div>
      )
    }
  }
}

export default App;
