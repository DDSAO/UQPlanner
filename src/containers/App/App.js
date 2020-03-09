import React, {Component} from 'react';
import './App.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import Feedback from '../../components/Feedback/Feedback';
import StudyPlan from '../../containers/StudyPlan/StudyPlan';



class App extends Component {
  
  render() {   
      return (
        <Aux>
          <BrowserRouter>
            <Link
              to='/'
              exact>
            </Link>

            <Switch>
              <Route path="/feedback" component={Feedback} />
              <Route path="/" component={StudyPlan} />
            </Switch>
          </BrowserRouter>
        </Aux>
      );
  };
}

export default App;
