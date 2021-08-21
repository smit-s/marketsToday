import React, { Component } from "react";
import axios from "axios";
export default class Overview extends Component {
    state = {
        indMarkets: [
            { index: "Nifty", iv: 0 },
            { index: "Nifty Bank", iv: 0 },
        ],
        usMarkets: [
            "Dow Jones",
            "NASDAQ",
            "Dow Futures",
            "US Dollar Index",
            "US 10yr bond-yields",
        ],
        asianMarkets: ["SGX Nifty Futures", "Hang Seng", "Nikkei", "SSE"],
        euMarkets: ["FTSE", "DAX"],
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
        setInterval(this.updateTick, 3000);
    }
    updateTick() {
        axios.get("http://localhost:3001/indices").then((data) => {
            const parsed = data.data;
            const nf = parsed.filter((d) => d.index_name === "nifty");
            const bnf = parsed.filter((d) => d.index_name === "bank nifty");
            this.setState({
                indMarkets: [
                    { index: "Nifty", iv: nf[0].iv },
                    { index: "Nifty Bank", iv: bnf[0].iv },
                ]
            });
        });
    }

    render() {
        console.log(this.state.indMarkets)
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
                                    <span className={`fw-bold ${item.cng<0?"text-danger":"text-success"}`} >{item.iv}</span>
                                </div>
                            );
                        })}
                    </div>
                    <br />
                    <br />
                    <span className="fw-bold px-2">US markets</span>
                    <div className="row px-3">
                        {this.state.usMarkets.map((item) => {
                            return <div className="col">{item}</div>;
                        })}
                    </div>
                    <br />
                    <br />
                    <span className="fw-bold px-2">Asian markets</span>
                    <div className="row px-3">
                        {this.state.asianMarkets.map((item) => {
                            return <div className="col">{item}</div>;
                        })}
                    </div>
                    <br />
                    <br />
                    <span className="fw-bold px-2">European markets</span>
                    <div className="row px-3">
                        {this.state.euMarkets.map((item) => {
                            return <div className="col">{item}</div>;
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
