import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import RestaurantEdit from './pages/restaurant/edit';
import Restaurants from './pages/restaurant/index';
import Sync from './pages/sync/index';
import Votes from './pages/public/votes';

import Layout from './Layout';

class AppRouter extends React.Component{
  
  render() {
    return (
      <Route onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
          <Route path='/public' component={Votes}/>
          <Layout>
            <Route path='/footer' component={<div/>}/>
            <Route path='/restaurant/index' component={Restaurants}/>
            <Route path='/restaurant/edit/:id' component={RestaurantEdit}/>
            <Route path='/sync/index' component={Sync}/>
          </Layout>
        </Switch>
      </Route>
    )
  }
  
}

export default AppRouter;