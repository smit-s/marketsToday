import React, { Component } from 'react';
import Navbar from './nav';
import { Route, Switch } from 'react-router-dom';
import Overview from './overview';
import News from './news';
import Analysis from './analysis';
import About from './about';
import NotFound from './NotFound';
class Index extends Component {
    state = {}

    render() {
        return <React.Fragment>
            <div style={{backgroundColor:"#f0f0f0"}}>
            <Navbar />
            <div className="content container-fluid" >
                <Switch>
                <Route exact path="/overview" component={Overview} />
                <Route exact path="/analysis" component={Analysis} />
                <Route exact path="/news" component={News} />
                {/* <Route exact path="/about" component={About} /> */}
                <Route exact path="/" component={Overview} />
                <Route component={NotFound}  />
                </Switch>
                <br/>
               <div className="container" style={{textAlign:'right',backgroundColor:"#f0f0f0"}}> <a  href="/disc.html">Disclaimer</a><span>&nbsp;&nbsp;</span><a href="/tc.html">Terms & Conditions</a></div>
                <div className="container" style={{textAlign:'left',backgroundColor:"#f0f0f0"}}>Created By: <a href="https://in.linkedin.com/in/smit-sanghavi-214ab714a">Smit</a></div>

            </div>
            </div>
        </React.Fragment>
    }

}

export default Index;