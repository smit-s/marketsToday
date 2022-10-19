import React , {Component}  from 'react';

export default class TradingView extends Component{
    state={
    

    }
        constructor(){
            super();

            this.tradingViewRef=React.createRef();
        }
     componentDidMount(){
        this.setCalendarScript();
     }
     setCalendarScript() {
        const scrp = document.createElement("script");
        scrp.text =
          '{"width": "100%","height": "500","colorTheme": "light","isTransparent": false,"locale": "in","importanceFilter": "0,1","currencyFilter": "INR,SGD,USD,CNY" }';
        scrp.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        scrp.async = true;
        scrp.script = "text/javascript";
        if(this.tradingViewRef.current!=null) this.tradingViewRef.current.appendChild(scrp);  
             
      }
    render(){
       
       return  <div
            className="tradingview-widget-container"
            ref={this.tradingViewRef}  
          >
            <div className="tradingview-widget-container__widget"  ></div>
            <div className="tradingview-widget-copyright">
              <a
                href="https://in.tradingview.com/markets/currencies/economic-calendar/"
                rel="noreferrer"
                target="_blank"
              >
                <span className="blue-text">Economic Calendar</span>
              </a>{" "}
              by TradingView
            </div>
          </div>


    }

}