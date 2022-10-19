import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import TradingView from "./tradingview";
import { mouseLeave,mouseEnter } from "../utils";
export default class Overview extends Component {
  schema = { ltp: 0, cng: 0, nc: 0 };
  state = {
    loading: true,
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
      { index: "Nikkei", ...this.schema },
      { index: "SSEC", ...this.schema },
    ],
    euMarkets: [
      { index: "FTSE", ...this.schema },
      { index: "DAX", ...this.schema },
    ]
  };
  constructor() {
    super();
    this.updateTick = this.updateTick.bind(this);
  }
  async componentDidMount() {
     await this.updateTick().then(()=>{     this.setState({loading:false});    });

    setInterval(this.updateTick, 2500);
   
    // const sc3 = document.createElement("script");
    // sc3.src =
    //   "//pl16541438.highperformancecpm.com/241bff7935109559cc7e1f44f383460f/invoke.js";
    // sc3.async = "true";
    // document.body.appendChild(sc3);
    // const div = document.createElement("div");
    // div.id = "container-241bff7935109559cc7e1f44f383460f";
    // document.body.appendChild(div);
  }
  
updateTick() {
    // return  axios.get("https://marketstoday.herokuapp.com/indices").then((data) => {
      return  axios.get("http://localhost:3001/indices").then((data) => {
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
          { index: "Dow Jones", ...dj },
          { index: "NASDAQ", ...nas },
          { index: "Dow Futures", ...djf },
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
          { index: "DAX", ...dx },
        ],
      });
    });
  }

  render() {
    return (
      this.state.loading?<div style={{position: "fixed",top:'50%',left:'50%'}}><Loader
      type="Puff"
      color="#374f6e"
      height={100}
      width={100}
      
    /></div>:
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
                      mouseLeave(element);
                    }}
                    onMouseEnter={(element) => {
                      mouseEnter(element);
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
                      mouseLeave(element);
                    }}
                    onMouseEnter={(element) => {
                      mouseEnter(element);
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
            <TradingView/>
          </span>
          <br />
          <br />
          
        </div>
      </React.Fragment>
    );
  }

  
}
