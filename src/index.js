import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/index'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(<BrowserRouter><Index /></BrowserRouter>, document.getElementById('root'));