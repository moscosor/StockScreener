import React, { Component } from 'react';
import Landing from './Components/Landing';
import Stock from './Components/Stock';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
require('dotenv').config()

class App extends Component{
  render() {
    return(
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/stocks/:ticker" component={Stock} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
