import React, { Component } from "react";
import Template from "./news/template";
import { mouseLeave, mouseEnter } from "../utils";
import axios from "axios";
var xm = require("xml-js");

const GENERAL = "General";
export default class News extends Component {
  state = {
    topics: [
      GENERAL,
      "Economy",
      "Companies",
      "Markets",
      "Stocks",
      "Brokerage Recommendation",
      "IPO",
      "Mutual Funds",
      "Currency",
      "Technicals",
    ],
    news: [],
    promise: [],
    loading: true,
  };
  componentDidMount() {
    // const script = document.createElement("script");
    // script.type="text/javascript";
    // script.src = "//inpage-push.com/400/4478494";
    // script.async = true;
    // document.body.appendChild(script);
    // const sc1 = document.createElement("script");
    //         sc1.src = "//pl16541367.highperformancecpm.com/d3/b7/0a/d3b70a8a1215b685203423d8a421d35c.js";
    //         sc1.type = 'text/javascript';
    //         document.body.appendChild(sc1);
    // const sc1 = document.createElement("script");
    //         sc1.src = "//pl16541438.highperformancecpm.com/241bff7935109559cc7e1f44f383460f/invoke.js";
    //         sc1.async = 'true';
    //         document.body.appendChild(sc1);
    //         const div = document.createElement("div");
    //         div.id = "container-241bff7935109559cc7e1f44f383460f";
    //         document.body.appendChild(div);
    this.processMoneyControlNews(GENERAL);
  }
  render() {
    return (
      <React.Fragment>
        
        <nav
        className="navbar navbar-expand-lg navbar-light px-2"
      >

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
              <span >Menu</span>
            </button>
            <div className="collapse navbar-collapse" id="navbarContent">
              <br/>
              <ul className="navbar-nav ">
                {this.state.topics.map((tag) => {
                  return (
                    <li className="nav-item">
                      <a
                        className="nav-link fw-normal fs-6"
                        style={{ color: "#374f6e",fontWeight:'bold' }}
                        id={tag}
                        onMouseLeave={(element) => {
                          mouseLeave(element);
                        }}
                        onMouseEnter={(element) => {
                          mouseEnter(element);
                        }}
                        onClick={() => {
                          this.processMoneyControlNews(tag);
                        }}
                      >
                      {tag}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
        </nav>
        <br />
        <div className="container-fluid"      style={{  columnCount:'2' }}>
            {!this.state.loading &&
              this.state.news.map((prop) => (
                <div  style={{ breakInside:'avoid-column'} }>
                  <Template
                    title={
                      prop.elements.filter((ele) => ele.name === "title")[0]
                        .elements[0].text
                    }
                    link={
                      prop.elements.filter((ele) => ele.name === "link")[0]
                        .elements[0].text
                    }
                    date={
                      prop.elements.filter((ele) => ele.name === "pubDate")[0]
                        .elements[0].text
                    }
                    desc={
                      prop.elements.filter(
                        (ele) => ele.name === "description"
                      )[0].elements.length>0 && prop.elements.filter(
                        (ele) => ele.name === "description"
                      )[0].elements.filter((type)=>type.type==='text').length===1 &&
                      prop.elements.filter(
                        (ele) => ele.name === "description"
                      )[0].elements.filter((type)=>type.type==='text')[0].text
                    }
                    img={
                      prop.elements.filter(
                        (ele) => ele.name === "description"
                      )[0].elements.length>0 && prop.elements.filter(
                        (ele) => ele.name === "description"
                      )[0].elements.filter((type)=>type.type==='element').length===1 &&
                      prop.elements.filter(
                        (ele) => ele.name === "description"
                      )[0].elements.filter((type)=>type.type==='element')[0].attributes.src
                    }
                    alt={
                      prop.elements.filter(
                        (ele) => ele.name === "description"
                      )[0].elements.length>0 && prop.elements.filter(
                        (ele) => ele.name === "description"
                      )[0].elements.filter((type)=>type.type==='element').length===1 &&
                      prop.elements.filter(
                        (ele) => ele.name === "description"
                      )[0].elements.filter((type)=>type.type==='element')[0].attributes.alt
                    }
                    newsSrc="Moneycontrol"
                  />
                </div>
              ))}
          </div>
      </React.Fragment>
    );
  }
  processMoneyControlNews(element) {
    let moneyControlLnk = "";
    if (element === "General") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/latestnews.xml";
    }
    if (element === "Economy") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/economy.xml";
    }
    if (element === "Companies") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/results.xml";
    }
    if (element === "Markets") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/marketreports.xml";
    }
    if (element === "Stocks") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/buzzingstocks.xml";
    }
    if (element === "Brokerage Recommendation") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/brokeragerecos.xml";
    }
    if (element === "Mutual Funds") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/economy.xml";
    }
    if (element === "IPO") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/iponews.xml";
    }
    if (element === "Currency") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/currency.xml";
    }
    if (element === "Technicals") {
      moneyControlLnk = "https://www.moneycontrol.com/rss/technicals.xml";
    }

    this.setState({
      promise: axios.get(moneyControlLnk, { sanitize: false }).then((res) => {
        let parsed = xm.xml2json(this.htmlDecode(String(res.data)), {
          compact: false,
          spaces: 4,
        });
        parsed = JSON.parse(parsed);
        parsed.elements[1].elements[0].elements.filter(
          (ele) => ele.name === "item"
        );
        console.log(parsed);
        this.setState({
          news: parsed.elements[1].elements[0].elements.filter(
            (ele) => ele.name === "item"
          ),
          loading: false,
        });
      }),
    });
  }

  htmlDecode(input) {
    var e = document.createElement("textarea");
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
}
