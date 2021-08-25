import React, { Component } from 'react'

export default class News extends Component {
    componentDidMount(){
        // const script = document.createElement("script");
        // script.type="text/javascript";
        // script.src = "//inpage-push.com/400/4472039";
        // script.async = true;
        // document.body.appendChild(script);
      
// const sc1 = document.createElement("script");
//         sc1.src = "//pl16541367.highperformancecpm.com/d3/b7/0a/d3b70a8a1215b685203423d8a421d35c.js";
//         sc1.type = 'text/javascript';
//         document.body.appendChild(sc1);
      
const sc1 = document.createElement("script");
        sc1.src = "//pl16541438.highperformancecpm.com/241bff7935109559cc7e1f44f383460f/invoke.js";
        sc1.async = 'true';
        document.body.appendChild(sc1);
        const div = document.createElement("div");
        div.id = "container-241bff7935109559cc7e1f44f383460f";
        document.body.appendChild(div);
    }
    render() {
        return (
            <React.Fragment><div>
            Coming soon
        </div>
    </React.Fragment>
            

        )
    }
}
