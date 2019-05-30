import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StreamCreate from './StreamCreate';
import StreamList from './StreamList';
import StreamEdit from './StreamEdit';
import StreamShow from './StreamShow';

const Router = () => (
  <Switch>
    <Route path="/" exact component={StreamList} />
    <Route path="/streams/new" component={() => <StreamCreate />} />
    <Route path="/streams/edit/:id" component={StreamEdit} />
    <Route path="/streams/:id" component={StreamShow} />
  </Switch>
);

export default Router;
