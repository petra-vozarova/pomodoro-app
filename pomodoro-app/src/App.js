import React from 'react';
import './App.css';

class Animations extends React.Component{
  constructor(props){
  super(props)
  }

  render(){
    console.log(this.props.status)
    var play ="paused";
     if(this.props.status === 'on'){
        play = "running";
    }else{
      document.body.style.animationPlayState="paused";
      //document.getElementsByClassName('sun')[0].style.animationPlayState = "paused"
    }
    const length = this.props.lenId;
   // console.log(length + 'length of animation');
    const duration = 60;
    document.querySelector('body').style.animationDuration = length +"s";
    document.querySelector('body').style.animationPlayState = play;
    return(
      <div class='sun' id='Sun' style={{"animation-name": "sunRising", "animation-duration": length+"s", "animation-iteration-count": "1", "animation-play-state": play }}></div> 
    )
  }
}


console.log(new Date().getSeconds() + new Date().getMinutes()*60);
var timeAfterPause;
var curTime;
var timeToPass;
var setTime;
class TimerType extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div id={this.props.id}>
        <h2 id={this.props.title}>{this.props.id}</h2>
        <span>
          <button id={this.props.minId} onClick={this.props.onClick} value='subtract'>
              <i class='fa fa-arrow-down fa-3x'/>
          </button>
          <div id={this.props.lenId}>{this.props.number}</div>
          <button id={this.props.addId} value='add' onClick={this.props.onClick}>
            <i class='fa fa-arrow-up fa-3x'/>
          </button>
        </span>
        
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      break: 5,
      session: 25,
      timer: 1500,
      status: 'off',
      type: 'session',
      id:'',
      animationDuration: 1500
    }
    
    this.changeBreakTime= this.changeBreakTime.bind(this)
    this.changeSessionTime= this.changeSessionTime.bind(this)
    this.timer = this.timer.bind(this)
    this.changeTime =this.changeTime.bind(this)
    this.countDown = this.countDown.bind(this)
    this.checks = this.checks.bind(this)
    this.timerOnClick = this.timerOnClick.bind(this)
    this.calculatingTime= this.calculatingTime.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    //this.play = this.play.bind(this)
    this.timerType = this.timerType.bind(this)
  }

  timerOnClick(){
  let a = this.state.status === 'off' ?
      (timeToPass= 
        this.setState({
        status: 'on',
        animationDuration: this.state.timer
        }),
        //document.body.style.animationDuration = this.state.animationDuration+'s',
        //document.body.style.animationPlayState='running',
      console.log('it works'),
      this.timer()
      ):
      (this.setState({
        status: 'off',
        }),
      document.body.style.animationPlayState='paused',
      document.getElementsByClassName('sun')[0].style.animationPlayState = "paused"
      );
  }

  timer(){
    curTime = new Date().getSeconds() + new Date().getMinutes()*60;
    timeToPass = curTime + this.state.timer
    var a =  setInterval(()=>{
              if(this.state.status ==='on'){
                this.countDown();
                this.checks()
              }
            }, 
            1000)
    }

  countDown(){
    setTime = timeToPass - (new Date().getSeconds() + new Date().getMinutes()*60);
    //console.log(setTime + ' time set on a timer')
    this.setState({
      timer: setTime
    })  
  }

  checks(){
    if(setTime < 0){
      if (this.state.type === 'session') {
        //document.getElementById('beep').play();
        this.timerType('break', this.state.break*60);
        this.timer();
      } else{
        //document.getElementById('break-clip').play();
        this.timerType('session', this.state.session*60);
        this.timer();
      }
    }
  }
  
  timerType(type, value){
    this.setState({
      type: type,
      timer: value,
      animationDuration: value
    })
  }

  changeBreakTime(e){
    let currentTime= this.state.break;
    this.changeTime('break', e.currentTarget.value, currentTime)
  }

  changeSessionTime(e){
    let currentTime = this.state.session;
    this.changeTime('session', e.currentTarget.value, currentTime)
  }

  changeTime(state, value, currentTime){
    if (this.state.status === 'off') {
      if(value === 'add'){
        if (currentTime < 60){
          this.setState({
            [state]: currentTime +1,
          });
          if(state ==='session'){
            this.setState({
              timer: this.state.timer + 60
            })
          }
        }
      }
      if(value ==='subtract'){
        if (currentTime >= 2){
          this.setState({
            [state]: currentTime -1
          })
          if (state ==='session'){
            this.setState({
              timer: this.state.timer - 60
            })
          }
        }
      }
    }
  }

  calculatingTime(){
    let minutes = Math.floor(this.state.timer/60);
    let seconds = Math.floor(this.state.timer%60);
    // if(minutes == 0 && seconds == 0){
    //  // this.play();
    // }
    if(minutes < 10) {
      minutes = '0' + minutes};
    if (seconds < 10) {
      seconds = '0'+ seconds
    } 

    return minutes + ':' + seconds
  }

  // play(){
  //   // var audio = document.getElementById('beep');
  //   // audio.play()
  // }

  resetTimer(){
    //clearInterval(this.state.id)
    this.setState({
      timer: 1500,
      session: 25,
      break: 5,
      type: 'session',
      status: 'off',
      id:'',
      animationDuration: 1500
    });
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    document.getElementById('break-clip').pause();
    document.getElementById('break-clip').currentTime = 0;
  }

  render(){
    return(
      <div id ='container'>
          <Animations title={this.state.type} lenId={this.state.animationDuration} status={this.state.status}/>
          <div class='cloud'/>
            <div id='cloud1'></div>
            <div id='cloud2'></div>
          <h1>Pomodoro Clock</h1>
          <div id='display'>
            <div id='setter'>
              <TimerType id='break' title='break-label' minId='break-decrement' addId='break-increment' lenId='break-length' number={this.state.break} onClick={this.changeBreakTime}/>

              <TimerType id='session' title='session-label' minId='session-decrement' addId='session-increment' lenId='session-length' number={this.state.session} onClick={this.changeSessionTime}/>
            </div>
            <div id='timer'>

              <h2 id='timer-label'>{this.state.type}</h2>
              <p id='time-left'>{this.calculatingTime()}
                <audio id='break-clip' src='https://sampleswap.org/samples-ghost/VOCALS%20and%20SPOKEN%20WORD/FEMALE%20SINGING/159[kb]get_up_and_dance.aif.mp3'/>
                <audio id='beep' src='https://sampleswap.org/samples-ghost/MELODIC%20SAMPLES/SAMPLED%20MUSIC/1722[kb]bonanza-western-horse-whinny.wav.mp3'/> 
              </p>
              <div id='buttons'>

                <button id ='start_stop' onClick={this.timerOnClick}>
                  <i class='fa fa-play fa-3x'/>
                  <i class='fa fa-stop fa-3x'/>
                </button>

                <button id='reset' onClick={this.resetTimer}>
                  <i class= 'fa fa-refresh fa-2x'/>
                </button>
              </div>
            </div>

          </div>
      </div>
    )
  }
}

export default App;
