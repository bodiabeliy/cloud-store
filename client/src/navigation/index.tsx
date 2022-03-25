import { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavigationLayout from '../components/Navbar/Navbar';
import RegitryPopup from '../components/Popup/RegistryPopup';
import { ROUTE_NAME } from './routeNames';

const Navigator: FC = () => {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTE_NAME.HOME} component={NavigationLayout} exact={true} />
      </Switch>
      <Switch>
        <Route path={ROUTE_NAME.REGISTRATION} component={RegitryPopup} exact={true} />
      </Switch>{' '}
      <Switch>
        <Route path={ROUTE_NAME.LOGIN} component={NavigationLayout} exact={true} />
      </Switch>
    </BrowserRouter>
  );
};

export default Navigator;
