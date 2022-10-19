// var xm = require("xml-js");

// let axios= require('axios')
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// function htmlDecode(input) {
//     let dom=new JSDOM()
//     var e = dom.window.document.createElement("textarea");
//     e.innerHTML = input;
//     // handle case of empty input
//     return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
//   }
//   axios.get("https://www.moneycontrol.com/rss/economy.xml", { sanitize: false }).then((res) => {
//     let parsed = xm.xml2json(htmlDecode(String(res.data)), {
//       compact: false,
//       spaces: 4,
//     });
//     parsed = JSON.parse(parsed);
//    let cc= parsed.elements[1].elements[0].elements.filter(
//       (ele) => ele.name === "item"
//     );
//     cc.forEach(element => {
//        let bb= element.elements.filter(
//             (ele) => ele.name === "description"
//           ).length>0 
//           && element.elements.filter(
//             (ele) => ele.name === "description"
//           )[0].elements
//           .filter((type)=>type.type==='text').length===1 &&
//           element.elements.filter(
//             (ele) => ele.name === "description"
//           )[0].elements.filter((type)=>type.type==='text')[0].text
//           console.log(bb)

//     });
//   }
//   )


x=[
  {'a':'v'},
  {
    'b':'s'
  }
]
d={'a':'s'}
console.log(Object.values(x[0]))