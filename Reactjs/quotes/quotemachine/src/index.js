import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
      mquote:[], 
      randomNumber:null,
            
    }
    this.giveQuote=this.giveQuote.bind(this);
    this.giveAuthor=this.giveAuthor.bind(this);
    this.generateNumber=this.generateNumber.bind(this);
    this.clicked=this.clicked.bind(this);
    this.colorPicker=this.colorPicker.bind(this)
  }
  
  
  componentDidMount(){
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then((res)=> res.json()).then((myjson) =>{
      this.setState({
        isLoaded:true,
        mquote:myjson.quotes,
        randomNumber: this.generateNumber(),
        
      });
      
    });
    
  }
//   componentDidMount ended here
 // componentDidUpdate(prevProps,prevState) {
 //    if(prevState.isLoaded!==this.state.isLoaded){
 //      this.setState({
 //        randomNumber: this.generateNumber()
 //      })
 //    }
 // }
 giveQuote(myarr,numb){
    if(this.state.mquote.length > 0){
      // console.log(this.state.mquote.length)
      let myQuote= myarr[numb]
      return myQuote.quote
      } 
}
giveAuthor(myarr,numb){
    if(this.state.mquote.length > 0){
      // console.log(this.state.mquote.length)
      let myAuthor= myarr[numb]
      return myAuthor.author
      } 
} 
generateNumber(){
  
  return  Math.floor(Math.random()*102)  
  // console.log("randomNumber",this.state.randomNumber)
}
clicked(){
  this.setState({
    randomNumber:this.generateNumber()
  })
} 
colorPicker(){
  let colors= ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  return colors[Math.floor(Math.random()*colors.length)]
}
 
  render(){
    
    const myquote=this.giveQuote(this.state.mquote,this.state.randomNumber)
    const myauthor=this.giveAuthor(this.state.mquote,this.state.randomNumber)
    const choosencolor=this.colorPicker();
    console.log(this.state.randomNumber);
    document.body.style.backgroundColor=choosencolor;
    
    return(
      <div>
          
          <div id='quote-box' >
              <div id='text' style={{color:choosencolor}}>
                <i className="fa fa-quote-left" style={{paddingRight : 10}}>
                </i> 
                {myquote} 
              </div>
              <div id='author' style={{color:choosencolor}}>-{myauthor}
              </div>              
          	  <p> <a  id= 'tweet-quote' href="twitter.com/intent/tweet" style={{color:choosencolor}}>
	          	  	<i id= '#tweet-quote1'className="fab fa-twitter-square" >
	          	  	</i>
          	  	  </a>
            
              <button id='new-quote' style={{backgroundColor:choosencolor}} onClick={this.clicked} >New quote</button></p>
                        
          </div>  
          
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById("wrapper"));
registerServiceWorker();
