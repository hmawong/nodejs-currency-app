import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Layout from './layout';
//import ExchangeRate from './ExchangeRate';
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact render={() => <h1>Hello world</h1>}/>
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}
export default App;
