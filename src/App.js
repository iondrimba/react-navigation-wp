import React from 'react';
import './App.css';
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home';
import About from './About';

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="about" component={About} />
        <Route path="*" component={Home} />
      </Router>
    );
  }
}

export default App;
