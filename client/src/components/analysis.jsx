import React, { Component } from 'react'
import axios from "axios";
import Loader from "react-loader-spinner";
import Template from './analysis/template';
import SplitPane from 'react-split-pane'
import '../css/pane.css'
import TradingViewWidget from "react-tradingview-widget";
import { getViewport } from '../utils';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
export default class Analysis extends Component {
    state={
        list:[],
        loading:false,
        activeGraph:null
    }
    updateData() {
        // return  axios.get("https://marketstoday.herokuapp.com/analysis").then((data) => {
          return  axios.get("http://localhost:3001/analysis").then((data) => {
          const parsed = data.data;
         let lst= parsed.map((element)=>element.replace('-EQ',''));
          this.setState({
            list: lst
          });
        });
      }
      constructor(){
        super();
        this.handleGraph.bind(this);
      }
    handleGraph(ref){
      this.setState({activeGraph:ref});
    }
       componentDidMount() {
        //  this.updateData().then(()=>{     this.setState({loading:false});    });
   this.updateData().then(()=>{
     if(this.state.list.length!=0)

     this.handleGraph(this.state.list[0]);
   })
       setInterval(this.updateData, 80000000);
      }
    
    render() {
        return (
                this.state.loading?<div><Loader
                type="Puff"
                color="#374f6e"
                height={100}
                width={100}
                
              /></div>:
            <React.Fragment>
                              <div style={{float:"right"}}>Start investing with <a href="https://www.5paisa.com/open-demat-account/?referralcode=56105291" target='_blank'> 5Paisa</a> <a href="https://tinyurl.com/yf89h46n" target='_blank'> AngelOne</a></div>
                              <br />
                              <h3 style={{fontWeight:"bold",paddingLeft:"50%"}}>Stock Picks</h3><br/><br/>
              <SplitPane split="horizontal" primary='first' minSize={100} defaultSize={400} style={{position:"relative"}}>
            <div className='container' style={{overflowY:"scroll",position:"relative"}}>
                {this.state.list.map((res)=>{return (
                    <Template key={res} title={res} id={res} handleGraph={this.handleGraph.bind(this)}></Template>
                )})}
            </div>
            <div className='container' id="graph" style={{overflowY:'scroll'}}>
            <TradingViewWidget symbol={`BSE:${this.state.activeGraph}`}  height={getViewport()[1]-300} width={getViewport()[0]-400}/>
              <div className="tradingview-widget-copyright"><a href={`https://in.tradingview.com/symbols/BSE-${this.state.activeGraph}/`} rel="noopener" target="_blank"><span className="blue-text">{`${this.state.activeGraph}`} Chart</span></a> by TradingView</div>            
           </div>
            </SplitPane>
            </React.Fragment>
        )
    }
}
