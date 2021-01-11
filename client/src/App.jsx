import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={() => <div>home</div>} />
        <Route path="/blog" exact component={() => <div>blog</div>} />
        <Route path="/chat" exact component={() => <div>chat</div>} />
        <Route path="/login" exact component={() => <div>login</div>} />
        <Route path="/register" exact component={() => <div>register</div>} />
      </Switch>
    </div>
  );
}

export default App;
