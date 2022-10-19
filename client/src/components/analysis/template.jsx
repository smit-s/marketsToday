import React, { Component } from "react";

export default class Template extends Component {
  state = {
    tagList: [],
  };
   
   constructor(){
       super();
       this.toggle.bind(this);
   }
  
  componentDidMount() {
    this.setState({
      tagList: [`${this.props.id}1`]//, `${this.props.id}2`]
    //   `${this.props.id}3`]
    });
    let tag = document.getElementById(`${this.props.id}1`);
    let para = document.createElement("p");
    para.className = "sc-embed";
    para.setAttribute("data-width", "500px");
    para.setAttribute(
      "data-orders",
      `%5B%7B%22quantity%22%3A10%2C%22ticker%22%3A%22${this.props.id}%22%7D%5D`
    );
    para.setAttribute("data-cardsize", "true");
    para.setAttribute("data-withtt", "big");
    para.setAttribute("data-withsearch", "true");
    para.style =
      "width:100%;min-height:300px;display:flex;align-items:center;justify-content:center";
    tag.appendChild(para);
    let scrp = document.createElement("script");
    scrp.src = "https://www.gateway-tt.in/assets/embed.js";
    tag.appendChild(scrp);
    
  }
 
   toggle(tag) {
  let x = document.getElementById(tag);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    this.state.tagList.forEach((ele) => {
      let tg = document.getElementById(ele);
      if (ele !== tag) tg.style.display = "none";
    });
    
    }

  render() {
    // let nx= this.props.data;
    return (
      <React.Fragment>
        <div className="card" data-toggle=".collapse">
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p className="card-text"></p>
            <button
              href="#"
              onClick={() => {
                this.toggle(`${this.props.id}1`);
              }}
              className="card-link"
              style={{ textDecoration: "none" }}
            >
              Buy/Sell
            </button>
            <button
              // href={`https://in.tradingview.com/symbols/BSE-${this.props.id}/`}
              target="_blank"
              onClick={() => {
                  this.props.handleGraph(
              `${this.props.id}`)
              }}
              className="card-link"
              style={{ textDecoration: "none" }}
            >
              Chart
            </button>
            <br />
            <div className='container' id={`${this.props.id}1`} style={{ display: "none" }}></div>
            {/* <div className='container' id={`${this.props.id}2`} style={{ display: "none" }}>
              <TradingViewWidget symbol={`BSE:${this.props.id}`}  height={this.getViewport()[1]-300} width={this.getViewport()[0]-400}/>
              <div className="tradingview-widget-copyright"><a href={`https://in.tradingview.com/symbols/BSE-${this.props.id}/`} rel="noopener" target="_blank"><span className="blue-text">{`${this.props.id}`} Chart</span></a> by TradingView</div>            
            </div> */}
          </div>
        </div>
        <br />
      </React.Fragment>
    );
  }
}


