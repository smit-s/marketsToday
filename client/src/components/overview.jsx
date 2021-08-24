import React, { Component } from "react";
import axios from "axios";
export default class Overview extends Component {
  schema={ltp: 0, cng: 0, nc: 0};
  state = {
    indMarkets: [
      { index: "Nifty", ...this.schema },
      { index: "Nifty Bank", ...this.schema },
    ],
    usMarkets: [
      { index: "Dow Jones", ...this.schema },
      { index: "NASDAQ", ...this.schema },
      { index: "Dow Futures", ...this.schema },
      { index: "US Dollar Index", ...this.schema },
    ],
    asianMarkets: [
      { index: "SGX Nifty Futures", ...this.schema },
      { index: "Hang Seng", ...this.schema },
      { index: "Nikkei",...this.schema},
      { index: "SSEC", ...this.schema },
    ],
    euMarkets: [
      { index: "FTSE", ...this.schema },
      { index: "DAX", ...this.schema },
    ],
  };
  constructor() {
    super();
    this.updateTick = this.updateTick.bind(this);
  }
  componentDidMount() {
    const scrp = document.createElement("script");
    scrp.text =
      '{"width": "100%","height": "500","colorTheme": "light","isTransparent": false,"locale": "in","importanceFilter": "0,1","currencyFilter": "INR,SGD,USD,CNY" }';
    scrp.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    scrp.async = true;
    scrp.script = "text/javascript";
    this.div.appendChild(scrp);
    this.updateTick();
    setInterval(this.updateTick, 2500);
  }
  updateTick() {
    axios.get("https://marketstoday.herokuapp.com/indices").then((data) => {
      const parsed = data.data;
      const nf = parsed.find((d) => d.index_name === "nifty");
      const bnf = parsed.find((d) => d.index_name === "bank nifty");
      const dx = parsed.find((d) => d.index_name === "germany-30");
      const ft = parsed.find((d) => d.index_name === "uk-100");
      const dj = parsed.find((d) => d.index_name === "us-30");
      const djf = parsed.find((d) => d.index_name === "us-30-futures");
      const sg = parsed.find((d) => d.index_name === "india-50-futures");
      const se = parsed.find((d) => d.index_name === "shanghai-composite");
      const ni = parsed.find((d) => d.index_name === "japan-ni225");
      const hen = parsed.find((d) => d.index_name === "hang-sen-40");
      const nas = parsed.find((d) => d.index_name === "nasdaq-composite");
      const dli = parsed.find((d) => d.index_name === "us-dollar-index");
      this.setState({
        indMarkets: [
          { index: "Nifty", ...nf },
          { index: "Nifty Bank", ...bnf },
        ],
        usMarkets: [
          { index: "Dow Jones", ...dx },
          { index: "NASDAQ", ...nas },
          { index: "Dow Futures", ...dj },
          { index: "US Dollar Index", ...dli },
        ],
        asianMarkets: [
          { index: "SGX Nifty Futures", ...sg },
          { index: "Hang Seng", ...hen },
          { index: "Nikkei", ...ni },
          { index: "SSEC", ...se },
        ],
        euMarkets: [
          { index: "FTSE", ...ft },
          { index: "DAX", ...djf },
        ],
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar-left navbar-expand d-flex">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto navbar-nav-scroll">
                <li className="nav-item">
                  <a
                    className="nav-link fw-normal fs-6"
                    style={{ color: "#374f6e" }}
                    href="#overview"
                    onMouseLeave={(element) => {
                      element.target.style.color = "#374f6e";
                      element.target.style.background = "#ffffff";
                    }}
                    onMouseEnter={(element) => {
                      element.target.style.color = "#ffffff";
                      element.target.style.background = "#374f6e";
                    }}
                  >
                    Market Overview
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link fw-normal fs-6"
                    style={{ color: "#374f6e" }}
                    href="#calendar"
                    onMouseLeave={(element) => {
                      element.target.style.color = "#374f6e";
                      element.target.style.background = "#ffffff";
                    }}
                    onMouseEnter={(element) => {
                      element.target.style.color = "#ffffff";
                      element.target.style.background = "#374f6e";
                    }}
                  >
                    Event Calendar
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <br />
        <br />
        <div className="container-fluid px-4" style={{ whiteSpace: "nowrap" }}>
          <span id="overview" className="fw-bolder fs-5">
            Markets overview
          </span>
          <br />
          <br />
          <span className="fw-bold px-2">Indian markets</span>
          <div className="row px-3">
            {this.state.indMarkets.map((item) => {
              return (
                <div className="col">
                  {item.index}
                  <br />
                  <span
                    className={`fw-bold ${
                      item.cng < 0 ? "text-danger" : "text-success"
                    }`}
                  >
                    {item.ltp}
                  </span>
                  <br />
                  <span
                    className={`${
                      item.cng < 0 ? "text-danger" : "text-success"
                    }`}
                    style={{ fontSize: "12px" }}
                  >
                    {item.cng} ({parseFloat(item.nc).toFixed(2)}%)
                  </span>
                </div>
              );
            })}
          </div>
          <br />
          <br />
          <span className="fw-bold px-2">US markets</span>
          <div className="row px-3">
            {this.state.usMarkets.map((item) => {
              return (
                <div className="col">
                  {item.index}
                  <br />
                  <span
                    className={`fw-bold ${
                      item.cng < 0 ? "text-danger" : "text-success"
                    }`}
                  >
                    {item.ltp}
                  </span>
                  <br />
                  <span
                    className={`${
                      item.cng < 0 ? "text-danger" : "text-success"
                    }`}
                    style={{ fontSize: "12px" }}
                  >
                    {item.cng} {item.nc}
                  </span>
                </div>
              );
            })}
          </div>
          <br />
          <br />
          <span className="fw-bold px-2">Asian markets</span>
          <div className="row px-3">
            {this.state.asianMarkets.map((item) => {
              return (
                <div className="col">
                  {item.index}
                  <br />
                  <span
                    className={`fw-bold ${
                      item.cng < 0 ? "text-danger" : "text-success"
                    }`}
                  >
                    {item.ltp}
                  </span>
                  <br />
                  <span
                    className={`${
                      item.cng < 0 ? "text-danger" : "text-success"
                    }`}
                    style={{ fontSize: "12px" }}
                  >
                    {item.cng} {item.nc}
                  </span>
                </div>
              );
            })}
          </div>
          <br />
          <br />
          <span className="fw-bold px-2">European markets</span>
          <div className="row px-3">
            {this.state.euMarkets.map((item) => {
              return (
                <div className="col">
                  {item.index}
                  <br />
                  <span
                    className={`fw-bold ${
                      item.cng < 0 ? "text-danger" : "text-success"
                    }`}
                  >
                    {item.ltp}
                  </span>
                  <br />
                  <span
                    className={`${
                      item.cng < 0 ? "text-danger" : "text-success"
                    }`}
                    style={{ fontSize: "12px" }}
                  >
                    {item.cng} {item.nc}
                  </span>
                </div>
              );
            })}
          </div>
          <br />
          <br />
          <br />
          <span id="calendar" className="fw-bold fs-5 mx-2">
            Event Calendar
          </span>
          <br />
          <br />
          <div
            className="tradingview-widget-container"
            ref={(x) => {
              this.div = x;
            }}
          >
            <div className="tradingview-widget-container__widget"></div>
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
        </div>
      </React.Fragment>
    );
  }
}
