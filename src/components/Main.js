import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import Table from './Table';


const Main = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/project-syntax" component={Home} />
        <Route path="/Table" component={Table} />
      </Switch>
    </div>
  );
};

export default Main;










