import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked'
import './index.css';
import registerServiceWorker from './registerServiceWorker';


let placeholder= ' # This is an h1 tag \n\n _ _ _ _ _ _  \n ## This is h2 tag \n _ _ _ _  \n http://google.com - automatic! \n[Google](http://google.com)\n\n This is an inline code `<div></div>` \n\n           function(){\n             alert("a coded  block") \n             	} \n *  Item 1 \n *  item 2 \n\n > A Blockquote \n\n ![Alt Some Image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRbXJ9iWDvwakuQO-BwE78Hzp9hfXp4TYXg4DrJRUTBt1-j33)\n\n    This is an example of **bold** ';
// the code below is to open the link in tab and it is from AndrewRayCode https://github.com/markedjs/marked/issues/655.Thanks for the code
const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
};
// AndrewRayCode end's here
const MarkedText=(props)=>{
  return <div  id="preview" dangerouslySetInnerHTML={props.text} ></div>
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      mytext:placeholder,
      didClick:false
    }
    this.onTextChange=this.onTextChange.bind(this);
    this.markedText=this.markedText.bind(this);
    this.editorClicked=this.editorClicked.bind(this);
    this.previewClicked=this.previewClicked.bind(this);
    
  }
  
  onTextChange(e){
    this.setState({
      mytext:e.target.value
    })
  }
  
  markedText(){
    let mark=marked(this.state.mytext,{ renderer:renderer,gmf:true, breaks:true });
    return {__html:mark}
  }
  editorClicked(){
    this.setState({
      didClick:true
    });
    
    console.log("clicked");
    if(this.state.didClick && document.getElementById("edit1").style.width!=='80vw'){
      document.getElementById("edit1").style.width='80vw';
      document.getElementById("editor").rows='150';       
       var w= document.getElementById("previewWrapper");
       w.style.display="none";
       var x=document.getElementsByClassName("fa-expand-arrows-alt");
       x[0].style.display="none";
       var y= document.getElementsByClassName("fa-window-minimize");
       y[0].style.display="inline-block";
         
    }
    else{
      var w= document.getElementById("previewWrapper");
       w.style.display="inline-block";
      document.getElementById("edit1").style.width='40vw'; 
      document.getElementById("editor").rows='20'
      var x=document.getElementsByClassName("fa-expand-arrows-alt");
       x[0].style.display="inline-block";
       var y= document.getElementsByClassName("fa-window-minimize");
       y[0].style.display="none";
    }
  }
  previewClicked(){
      this.setState({
      didClick:true
    });
       console.log("preview clicked") ;
       if(this.state.didClick && document.getElementById("previewWrapper").style.width!=='80vw'){
      document.getElementById("previewWrapper").style.width='80vw';             
       var w= document.getElementById("edit1");
       w.style.display="none";
       var x=document.getElementsByClassName("fa-expand-arrows-alt");
       x[1].style.display="none";
       var y= document.getElementsByClassName("fa-window-minimize");
       y[1].style.display="inline-block";
         
    }
    else{
      var w= document.getElementById("edit1");
       w.style.display="block";
      document.getElementById("previewWrapper").style.width='60vw';      
      var x=document.getElementsByClassName("fa-expand-arrows-alt");
       x[1].style.display="inline-block";
       var y= document.getElementsByClassName("fa-window-minimize");
       y[1].style.display="none";

      }
    }
  render(){  
    
    return(
      <div>
      <div id="edit1"className="max-min" >
        <div id="editorBar" className="topBar">
          <i className="fab fa-free-code-camp"></i> Editor 
              <div onClick={this.editorClicked} style={{display:'inline-block' , float:'right' , width:'inherit' }}>
                <i className ="fas fa-expand-arrows-alt" ></i>
                <i className="fas fa-window-minimize"></i>
              </div> 
        </div>      
         <textarea id="editor" value={this.state.mytext}  onChange={this.onTextChange} rows="20" cols="70"></textarea>
        </div>

          <div id="previewWrapper" className="max-min">
            <div className="topBar">
              <i className="fab fa-free-code-camp"></i>  Preview 
                <div onClick={this.previewClicked} style={{display:'inline-block' , float:'right'  }}>
                  <i className="fas fa-expand-arrows-alt" ></i>
                  <i className="fas fa-window-minimize"></i>
                </div>  
            </div>
            <MarkedText  text={this.markedText()}>
            </MarkedText>
          </div>
      </div>
    )
  }
}
ReactDOM.render(<App/>,document.getElementById("wrapper"))
registerServiceWorker();
