import { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StartPage from '../components/Start';
import { ROUTE_NAME } from './routeNames';

const Navigator: FC = () => {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTE_NAME.START} component={StartPage} exact={true} />
      </Switch>
    </BrowserRouter>
  );
};

export default Navigator;
