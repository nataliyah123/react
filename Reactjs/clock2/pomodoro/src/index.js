import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';



const ClickableItems =(props)=>{

	
		return(
				<div>
					<div id="break-label">Break-length</div>
					<div id="break-decrement"onClick={props.breakdecclick}><i className="glyphicon glyphicon-arrow-down"></i></div>
					<div id="break-length">5</div>
					<div id="break-increment" onClick={props.breakincclick}><i className="glyphicon glyphicon-arrow-up"></i></div>

					<div id="session-label">Session-length</div>
					<div id="session-decrement"onClick={props.sessiondec}><i className="glyphicon glyphicon-arrow-down"></i></div>
					<div id="session-length">25</div>
					<div id="session-increment"onClick={props.sessioninc}><i className="glyphicon glyphicon-arrow-up"></i></div>
					<div id="timer">
						<div id="timer-label">{props.mylb}</div>
						<div id="time-left">25:00</div>
					</div>	

					<div id="start_stop"onClick={props.playtoggle}><i className="glyphicon glyphicon-play"></i><i className="glyphicon glyphicon-pause"></i></div>
					<div id="reset"onClick={props.replayclick}><i className="glyphicon glyphicon-repeat"></i></div>

				</div>

			)
	
}
let x= undefined;
let counter=0
const alarm=require("./prism-2.mp3")
const accurateInterval = require('accurate-interval');
class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			label:"Session",
			breaklen:5,
			sessionlen:25,
			playpress:true,
			pausepressfirst:false,
			leftstarttime:0,
			breakstarted:true
			
		}
		
		this.breakinc= this.breakinc.bind(this)
		this.breakdec= this.breakdec.bind(this)
		this.sessioninc=this.sessioninc.bind(this)
		this.sessiondec=this.sessiondec.bind(this)
		this.play=this.play.bind(this)		
		this.replay=this.replay.bind(this)
		this.innersessioninc=this.innersessioninc.bind(this)
		// this.togglecheck=this.togglecheck.bind(this)
	}
	// In the functions below update function is passed to setState instead of an object because this.state and this.props
	// shows rendered values(values on screen) .so in order to calculate values based on the current values we
	// are passing update function to avoid any conflict
	 breakinc(){
	 	
		if(this.state.breaklen<=59){
			this.setState((state) => {
				return {breaklen: state.breaklen + 1}
				
			},()=>{document.getElementById("break-length").innerHTML=this.state.breaklen});
			
		}
		
	}
	 breakdec(){
	 	
	 	if(this.state.breaklen>=2){
	 		this.setState((state) => {
	 			return {breaklen:state.breaklen-1}
	 		},()=>{document.getElementById("break-length").innerHTML=this.state.breaklen})
		 		
		 }	
		 
	}
	 innersessioninc(state){
	 			// document.getElementById("session-length").innerHTML=this.state.sessionlen
				return {...state,sessionlen: state.sessionlen + 1}
				
				
			
	 }
	 sessioninc=()=>{
	 	if(this.state.sessionlen<=59){
			// this.innersessioninc();
			this.setState(this.innersessioninc,()=>{document.getElementById("session-length").innerHTML=this.state.sessionlen;
			document.getElementById("time-left").innerHTML=this.state.sessionlen+":"+"00"})
			
		}

	}
	 sessiondec(){
	 	if(this.state.sessionlen>=2){
			this.setState((state) => {
				return {sessionlen: state.sessionlen - 1}
				
			},()=>{document.getElementById("session-length").innerHTML=this.state.sessionlen;
					document.getElementById("time-left").innerHTML=this.state.sessionlen+":"+"00"});
			
			
		}

	}
	
	
	 play(){

	 	 	
		let starttime=parseInt(this.state.sessionlen*60)
		let self=this
		let minutes=parseInt(0)
		let seconds=parseInt(0)
		let myfoo=function(){
			if(self.state.pausepressfirst===true && self.state.leftstarttime>=0)
			    		{
			    			starttime=parseInt(self.state.leftstarttime)
			    			console.log("leftstarttime:",self.state.leftstarttime)
			    			self.setState({pausepresstrue:false})			    						    		
							minutes=parseInt(starttime /60,10)
							seconds=parseInt(starttime %60 ,10)
							// seconds=parseInt(seconds-1)							
							console.log("min:sec",minutes,seconds)
						}
					else{	
							minutes=parseInt(starttime /60,10)
							seconds=parseInt(starttime %60 ,10)
							// self.setState({pausepressfirst:false})
							// seconds=parseInt(seconds-1)
						}		
						minutes = minutes < 10 ? "0" + minutes : minutes;
					    seconds = seconds < 10 ? "0" + seconds : seconds;
					    
					    document.getElementById("time-left").innerHTML=minutes + ":" + seconds;
					    starttime=starttime-1		    
					    
					    self.setState({leftstarttime:parseInt(starttime)})

					    // console.log("leftstarttimeoutside",self.state.leftstarttime)
					    if (starttime<0) 
					    	{
					    		
						    		let aud=document.getElementById("beep")
						    		
						    		if(self.state.breakstarted){
						    			
						    			starttime = parseInt(document.getElementById("break-length").innerHTML*60);
						    			document.getElementById("timer-label").innerHTML="Break"					    		
						            	

						    			self.setState({breakstarted:false})
						    								    			
						    			aud.play()
						    		}
						    		else{
						    			starttime=parseInt(document.getElementById("session-length").innerHTML*60)						    			
						    			
						    			document.getElementById("timer-label").innerHTML="Session";						    			
						    									    			
						            	self.setState({breakstarted:false})
						            	aud.play()
						            	// console.log(starttime)
						        	}
						        
					        }
		}
		if(this.state.playpress){
				
			self.setState({playpress:false},()=>{
				setTimeout(myfoo,10)	
			    x=	setInterval(myfoo, 1000);
			})

		}
		else{
				this.setState({playpress:true},()=>{
					// console.log("i am else and i am running")
					self.setState({pausepressfirst:true})					
					clearInterval(x)
					minutes=parseInt(0)
					seconds=parseInt(0)
				})	
		    }

			// })	

	}
	 
	 replay(){
	 	document.getElementById("timer-label").innerHTML="Session"
	 	document.getElementById("session-length").innerHTML=parseInt(25)
	 	document.getElementById("break-length").innerHTML=parseInt(5)
	 	document.getElementById("time-left").innerHTML="25:00"
	 	let aud=document.getElementById("beep")
	 	aud.currentTime=0
	 	aud.pause()
	 	clearInterval(x)
	 	this.setState({
	 		breaklen:5,
			sessionlen:25,			
	 		playpress:true,
			pausepressfirst:false,
			leftstarttime:0,
			breakstarted:true
	 	})

	}
	render(){
		return(
			<div id="container1">
				
				<section>
				<ClickableItems breakincclick={this.breakinc} breakdecclick={this.breakdec} mylb={this.state.label} 
				sessioninc={this.sessioninc} sessiondec={this.sessiondec} playtoggle={this.play} 
				replayclick={this.replay} />
				<audio id="beep" src={alarm} type="audio/mp3"></audio>
				</section>
			</div>	

			)
		}
	}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
