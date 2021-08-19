import React, { Component } from 'react';
import Navbar from './nav';
import { Route } from 'react-router-dom';
import Overview from './overview';
import News from './news';
import Analysis from './analysis';
import About from './about';

class Index extends Component {
    state = {}

    render() {
        return <React.Fragment>
            <Navbar />
            <br />
            <div className="content container-fluid">
                <Route path="/overview" component={Overview} />
                <Route path="/analysis" component={Analysis} />
                <Route path="/news" component={News} />
                <Route path="/about" component={About} />
                <Route exact path="/" component={Overview} />
            </div>

        </React.Fragment>
    }

}

export default Index;