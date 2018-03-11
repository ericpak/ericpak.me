import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/pages/home';
import Projects from './components/pages/projects';
import Contact from './components/pages/contact';
import Game from './components/pages/game';

// include minified css
import './Assets/css/default.min.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/Projects' component={Projects} />
          <Route exact path='/Contact' component={Contact} />
          <Route exact path='/Game' component={Game} />
          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;
