import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Layout from './layout';
import ExchangeRate from './ExchangeRate';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={ExchangeRate}/>
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}
export default App;
