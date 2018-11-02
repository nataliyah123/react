import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

let func={
	negrep:function(arr){
		let ind
		function myArr(currV){
			if(currV==="\-"){				
				return true			
			}
		}
		while(arr.some(myArr)){
			ind=arr.findIndex(myArr);

			// if - sign is at the 0 index than we have to splice off the first index
			if(ind===0){
				arr.splice(0,1)
			}
			console.log("type of index",typeof(ind));
			
			if(pat1.test(arr[ind])!==pat1.test(arr[ind+1]))
			{
				arr[ind]="+"
				arr[ind+1]="-"+arr[ind+1]
			}
			// typeof(ind)===typeof(ind+1)?"":arr[ind]="+" arr[ind+1]="-"+arr[ind+1]
			console.log("replacing neg",arr)
			
		}

	},
	divi: function(arr,stripL){
		stripL(arr);
		let ind;				
		function myArr(currV){
			if(currV==="/"){				
				return true			
				}
			}	
		
		// const isMatch= h.some(myArr) ;
		while(arr.some(myArr)){
			ind=arr.findIndex(myArr);
			console.log(ind);
			// arr[ind-1]=(parseFloat(arr[ind-1])/parseFloat(arr[ind+1])).toPrecision(4);
			arr[ind-1]=(parseFloat(arr[ind-1])/parseFloat(arr[ind+1]));			
			arr.splice(ind,2)
		}
	},	
	mul: function(arr,stripL){		
		let ind;				
		function myArr(currV){
			if(currV==="*"){				
				return true			}
		}
		// const isMatch= h.some(myArr) ;
		while(arr.some(myArr)){
			ind=arr.findIndex(myArr);
			console.log(ind);
			// arr[ind-1]=(parseFloat(arr[ind-1])*parseFloat(arr[ind+1])).toPrecision(4);
			arr[ind-1]=(parseFloat(arr[ind-1])*parseFloat(arr[ind+1]));
			arr.splice(ind,2)
		}
		stripL(arr);

	}	,
	sub1: function(arr,stripL){
		stripL(arr);
		let ind;				
		function myArr(currV){
			if(currV==="\-"){				
				return true			
			}
		}
		// const isMatch= h.some(myArr) ;
		while(arr.some(myArr)){
			ind=arr.findIndex(myArr);
			console.log(ind);
			// arr[ind-1]=(parseFloat(arr[ind-1])-parseFloat(arr[ind+1])).toPrecision(4);
			arr[ind-1]=parseFloat(arr[ind-1])-parseFloat(arr[ind+1]);
			arr.splice(ind,2)
		}
	},	
			

	add1: function(arr,stripL){
		stripL(arr);
		let ind;
		//parametric function for javascript some()				
		function myArr(currV){
			if(currV==="+"){				
				return true			}
		}
		// const isMatch= h.some(myArr) ;
		while(arr.some(myArr)){
			ind=arr.findIndex(myArr);
			console.log(ind);
			// arr[ind-1]=(parseFloat(arr[ind-1])+parseFloat(arr[ind+1])).toPrecision(4);
			arr[ind-1]=(parseFloat(arr[ind-1])+parseFloat(arr[ind+1]));
			arr.splice(ind,2)
		}

		
		},
	sub1: function(arr,stripL){
		stripL(arr);
		let ind;				
		function myArr(currV){
			if(currV==="\-"){				
				return true			
			}
		}
		// const isMatch= h.some(myArr) ;
		while(arr.some(myArr)){
			ind=arr.findIndex(myArr);
			console.log(ind);
			// arr[ind-1]=(parseFloat(arr[ind-1])-parseFloat(arr[ind+1])).toPrecision(4);
			arr[ind-1]=parseFloat(arr[ind-1])-parseFloat(arr[ind+1]);
			arr.splice(ind,2)
		}
	}	
		
}
let concatInp='';
const pat1=/[/*+\-]/;
let myarnew=[];
let decinpchk='';
let jsKeys=[{id:"one",text:"1",key:"a"},{id:"two",text:"2",key:"b"},{id:"three",text:"3",key:"c"},{id:"four",text:"4",key:"d"},
			{id:"five",text:"5",key:"e"},{id:"six",text:"6",key:"f"},{id:"seven",text:"7",key:"g"},{id:"eight",text:"8",key:"h"},
			{id:"nine",text:"9",key:"i"},{id:"divide",text:"/",key:"k"},{id:"zero",text:"0",key:"j"},{id:"multiply",text:"*",key:"l"},
			{id:"add",text:"+",key:"m"},{id:"subtract",text:"-",key:"n"},{id:"decimal",text:".",key:"o"}];
const CalcKeys=(props)=>{
    const gridkeys=jsKeys.map((items)=>

    	 	<div key={items.key} className="grid-keys">
    			<div id={items.id} onClick={props.onClick} >{items.text}</div>
    		</div>
    )
    return (
    		<div className="grid-container">{gridkeys}</div>
    		)
} 

class Calc extends React.Component{
		

	render(){
		return(
		<div>		 
			<div  id="display" >0</div>
		</div>

		)
	}
}

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
			input:'',
			corrinp:false,
			zeroPress:false,
			resetPress:false,
			submitPress:false

		}
		this.inputchange=this.inputchange.bind(this)
		this.inputSubmit=this.inputSubmit.bind(this)
		this.inputProcessing= this.inputProcessing.bind(this)
		this.resetted=this.resetted.bind(this)
		this.mathFunc=this.mathFunc.bind(this)
		this.clicked=this.clicked.bind(this)
		this.addspace=this.addspace.bind(this)
		this.zerocheck=this.zerocheck.bind(this)
		this.decimalcheck=this.decimalcheck.bind(this)
	}
	
	inputProcessing(k){		
				
		console.log("i am called")
		for(let i=0; i<k.length;i++){
			
			let x=k.substring(i,i+1);
			console.log("x check:",x)
			if(pat1.test(x)){
				myarnew.push(concatInp)
				console.log("myarnew inputProcessing:",myarnew)
				myarnew.push(x)
				concatInp=concatInp.substring(concatInp.length)
				console.log("concatInp:",concatInp)
				
			}
			else{
				concatInp+=x
			}

		}
		
		return myarnew
	}
	inputchange(){
		
		// const pat=/((0(\.\d+)|[1-9]{1,}(\d*\.\d*)|[1-9]{1,}(\d*))\s(([*+\-/]){1,}(?!\7))\s)+((0(\.\d+)|[1-9]{1,}(\d*\.\d*)|[1-9]{1,}(\d*))\s(;){1})$/
		const uinput=document.getElementById("display").innerHTML
		// converting a string into an array	
		
		this.inputProcessing(uinput)
				
		
	}
	
	inputSubmit(e){
		e.preventDefault();		
		this.inputchange()		
		
		if(myarnew[myarnew.length-1]!==concatInp){
			myarnew.push(concatInp)
			concatInp=concatInp.substring(concatInp.length)
		}
		//remove the last space if it is there
		if(myarnew[myarnew.length-1]===""){
				myarnew=myarnew.slice(0,myarnew.length-1)
				
			}
		// remove the operator sign if it is present at the end of the array	
		if(pat1.test(myarnew[myarnew.length-1])){
			myarnew=myarnew.slice(0,myarnew.length-1)
			}	
				
		this.mathFunc(myarnew);
		this.setState({
			submitPress:true
		})
	}
	zerocheck(param){
			
			const zero=document.getElementById("display").innerHTML;
			if(document.getElementById("display").innerHTML==="0"){
				document.getElementById("display").innerHTML=""
				concatInp="0"
			}
			// once a zero is clicked check whether the array is empty or the last input has an operator 
			if(pat1.test(zero[zero.length-1])|| !zero.length){// zero.length should be removed
				// document.getElementById("display").innerHTML="0";
				document.getElementById("display").innerHTML=document.getElementById("display").innerHTML
				this.setState({
					zeroPress:true
				})
				
			}
			else{

				document.getElementById("display").innerHTML+=param
					
				}
			
			
	}
	clicked(e){	
		// console.log("parentNode:clicked:",e.target.parentNode.textContent) 		
		let check=  e.target.parentNode.textContent
		// decinpchk is to look for decimal patterns
		decinpchk+= check

		if(check==="."){
			check=this.decimalcheck(decinpchk)
		}
		// the if statement below is to check whether the input is an operator or not if operator decinpchk is emptied
		if(pat1.test(check)){

			decinpchk=""
		}
		
		
		// check whether reset is pressed or not if pressed. check whether zero is pressed or not .if pressed call zerocheck
		if(this.state.resetPress)
		{
			if(check==="0"){
				this.zerocheck(check)
			}

			this.setState({
				resetPress:false,
				
			})
		}
		// if zero is clicked. check whether it is the first element in the array or first element after an operator
		if(check==="0"){
			this.zerocheck(check)
		}
		else{
			if(document.getElementById("display").innerHTML==="0"){
				document.getElementById("display").innerHTML=""
			}
			document.getElementById("display").innerHTML+=check;
		}
		if(this.state.submitPress){
			myarnew=myarnew.slice(myarnew.length)
			// console.log("submitp:",myarnew)
			this.setState({
				submitPress:false
			})
		}
			
		e.preventDefault();		
	}
	mathFunc(h){
		let i=0
		function stripL(h){
			
			if(h[h.length-1]===";")
			{
				 h.splice(-1,1);				
			}
			
		  }	;
		 h = h.filter(entry => /\S/.test(entry)); 
		 console.log("before splice:",h)
		// for loop to check the array for multiple simultaneous occurrence and removal of operators
		for( i=0;i<h.length;i++){
			console.log("i:",h[i])
			if(pat1.test(h[i])&&pat1.test(h[i+1])){				
				h.splice(i,1)
				i=0
			}

		}  
		func.negrep(h)  
		func.divi(h,stripL)
		func.mul(h,stripL)
		func.add1(h,stripL)
		func.sub1(h,stripL)
		document.getElementById("display").innerHTML=h
		
		
	}
	// function to check whether there is only one decimal in the number or not
	decimalcheck(){		
		let count = (decinpchk.match(/\./g) || []).length;
		let j=""
		let k=document.getElementById("display").innerHTML		
		if(count===1){
			
			if(k==="0"||pat1.test(k[k.length-1])){
				j="0."
			}
			else{			
				j="."
			}
			return j
		}
		else{
			j=""
			return j
		}
	}
	addspace(){		
		document.getElementById("display").innerHTML+=" ";
	}
	resetted(){
		
		document.getElementById("display").innerHTML="0";
		this.setState({
			resetPress:true,
			submitPress:false
		})
		myarnew=myarnew.slice(myarnew.length)
		decinpchk=""
		if(this.state.corrinp){
			document.getElementById("display").style.backgroundColor="white"
			}
	}
	deleteone(){
		let y=document.getElementById("display").innerHTML.length;	
		let z=document.getElementById("display").innerHTML;
		z=z.substr(0,y-1);	
		document.getElementById("display").innerHTML=z
				
	}
	render(){
		return(
		<div>
			<form> 
				<Calc  changed={this.inputchange} />			
				<CalcKeys onClick={this.clicked}/>
				<div className="grid-container2">
					<button id="equals"type ="submit" onClick={this.inputSubmit} className="extras1" >=</button>
					<div onClick={this.addspace} className="extras">spacebar</div>
					<div id="clear"onClick={this.resetted} className="extras">reset</div>
					<div id="scoln" onClick={this.clicked} className="extras" >;</div>
					<div onClick={this.deleteone} className="extras">delete</div>
				</div>
			</form>		
		</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
