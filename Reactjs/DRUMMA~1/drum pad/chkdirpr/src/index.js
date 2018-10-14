import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const myarr=[{id:"bubbles" ,tabindex:"0",text:"q",src:localStorage.getItem('q')},
			 {id:"corona" ,tabindex:"1",text:"w",src:localStorage.getItem('w')},
			 {id:"squiggle" ,tabindex:"2",text:"e",src:localStorage.getItem('e')},
			 {id:"clay" ,tabindex:"3",text:"a",src:localStorage.getItem('a')},
			 {id:"veil" ,tabindex:"4",text:"s",src:localStorage.getItem('s')},
			 {id:"splits" ,tabindex:"5",text:"d",src:localStorage.getItem('d')},
			 {id:"zig-zag" ,tabindex:"6",text:"z",src:localStorage.getItem('z')},
			 {id:"glimmer" ,tabindex:"7",text:"x",src:localStorage.getItem('x')},
			 {id:"dotted-spiral" ,tabindex:"8",text:"c",src:localStorage.getItem('c')}]


localStorage.setItem("q", require('./sounds/' + myarr[0].id + '.mp3') );
localStorage.setItem("w", require('./sounds/' + myarr[1].id + '.mp3') );
localStorage.setItem("e", require('./sounds/' + myarr[2].id + '.mp3') );
localStorage.setItem("a", require('./sounds/' + myarr[3].id + '.mp3') );
localStorage.setItem("s", require('./sounds/' + myarr[4].id + '.mp3') );
localStorage.setItem("d", require('./sounds/' + myarr[5].id + '.mp3') );
localStorage.setItem("z", require('./sounds/' + myarr[6].id + '.mp3') );
localStorage.setItem("x", require('./sounds/' + myarr[7].id + '.mp3') );
localStorage.setItem("c", require('./sounds/' + myarr[8].id + '.mp3') );


function DrumPad(props){
	const mapitems=props.myarr.map((item,id)=>
		
			<div key={id} style={{boxSizing:"border-box",margin:"5px 5px 10px 5px",padding:"none"  }}>
				
				<div  id ={item.id} className="drum-pad grid-keys "tabIndex={item.tabindex} onKeyDown={props.onKeyDown} onClick={props.onClick}>{item.text.toUpperCase()} 
					<audio  id={item.text} className="clip " >
		        		<source src={item.src} type='audio/mp3' />		        					       
		 			</audio>
				</div>
			</div>
			);	
		return (
				<div className="grid-container">{mapitems}</div>
			)	

}

class App extends React.Component{
	constructor(props){		
		super(props);
		this.state={
			power:false,
			pvalue:"0"
			
		};
		this.clicked=this.clicked.bind(this);
		this.onkeydown=this.onkeydown.bind(this);
		this.playAud=this.playAud.bind(this);
		this.displayed= this.displayed.bind(this);
		this.volCont= this.volCont.bind(this);
		this.powerCont=this.powerCont.bind(this);

	}

	
		
	onkeydown=(e)=>{
		
		if(this.state.power===true){
				let x= e.keyCode;
				// console.log(e);
				if (x===81) {
				    				
					 
					 let aud=document.getElementById("q");
					 this.displayed(aud);
					 this.volCont(aud);
					 this.playAud(aud);
					}
				if(x===87){
					
					 
					 let aud=document.getElementById("w");
					 this.displayed(aud);
					 this.volCont(aud);					 	
					 this.playAud(aud);
					}	
					
				if(x===69){
					
					 
					 let aud=document.getElementById("e");
					 this.displayed(aud);
					 this.volCont(aud);					 	
					 this.playAud(aud);
					}
				if(x===65){
					
					 
					 let aud=document.getElementById("a");
					 this.displayed(aud);
					 this.volCont(aud);					 	
					 this.playAud(aud);
					}
				if(x===83){
					
					 
					 let aud=document.getElementById("s");
					 this.displayed(aud);
					 this.volCont(aud);					 	
					 this.playAud(aud);
					}	
				if(x===68){
					
					 
					 let aud=document.getElementById("d");
					 this.displayed(aud);
					 this.volCont(aud);					 
					 this.playAud(aud);
					}
				if(x===90){
					
					 
					 let aud=document.getElementById("z");
					 this.displayed(aud);
					 this.volCont(aud);					 	
					 this.playAud(aud);
					}
				if(x===88){					
					 
					 let aud=document.getElementById("x");
					 this.displayed(aud);
					 this.volCont(aud);					 	
					 this.playAud(aud);
					}
				if(x===67){					
					 
					 let aud=document.getElementById("c");
					 this.displayed(aud);
					 this.volCont(aud); 
					 this.playAud(aud);
					 
					}	
			}						
			
		}
	clicked=(e)=>{
		if(this.state.power===true){
			let z=e.target.childNodes[1];		
			this.displayed(z);	
			this.volCont(z);
			z.play();
		}
	}	
	
    playAud =(v)=>{
		v.play();
			}

	displayed=(par)=>{
		let inp=par.parentNode.id;
		// console.log(par)
		document.getElementById('display').innerHTML=inp;			
	}
	volCont=(par)=>{
		let volinp=document.getElementById("myRange");
		par.volume=volinp.value/10;
		// console.log(volinp.value/10)
	}
	powerCont=()=>{
		let powinp=document.getElementById("powerC")
		console.log(powinp.value);
		// powinp.value=this.state.pvalue;
		if(powinp.value==="1"){
			this.setState({
				power:true,
				pvalue:"1"
				
			})
		}	
		else{
			this.setState({
				power:false,
				pvalue:"0"
			})
		}
		console.log(this.state.power)	
		
	}
	render(){
		
		return(
		<div id="drum-machine">	
								
			<DrumPad myarr={myarr}  onKeyDown={this.onkeydown} onClick={this.clicked}/> 
			<div className= "grid-container2">

				<div id="brand">DRUMPAD  <i className="fas fa-drum"></i></div>
				<div id="display" className="right-grid" >None</div>
				<br/>
				<label htmlFor ="myRange">Volume</label> 
				<input type="range" min="1" max="10"  className="slider right-grid" id="myRange" onChange={this.volCont}/>
				<br/>
				<br/>

				<label htmlFor ="powerC">Power</label>
				<input type="range" min="0" max="1" value={this.state.pvalue} className="slider right-grid" id="powerC" onChange={this.powerCont}/>

			</div>
		</div>
		)

	}

}

ReactDOM.render(<App/>,document.getElementById("root"))
serviceWorker.unregister();
