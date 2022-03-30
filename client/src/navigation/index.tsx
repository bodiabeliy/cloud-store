import { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavigationLayout from '../components/Dashboard/Dashboard';
import RegitryPopup from '../components/Popup/RegistryPopup/RegistryPopup';
import AuthPopup from '../components/Popup/AuthPopup/AuthPopup';

import DiskArea from '../components/DiskArea/DiskArea';
import CurrentFile from '../components/DiskArea/CurrentFile/CurrentFile';

import { ROUTE_NAME } from './routeNames';
import { useSelector } from 'react-redux';
import { isAuthUserSelector } from '../redux-slices/UserSlice';

const Navigator: FC = () => {
  const isAuthorization = useSelector(isAuthUserSelector);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTE_NAME.HOME} component={NavigationLayout} exact={true} />
      </Switch>
      <Switch>
        <Route path={ROUTE_NAME.REGISTRATION} component={RegitryPopup} exact={true} />
      </Switch>
      <Switch>
        <Route path={ROUTE_NAME.LOGIN} component={AuthPopup} exact={true} />
      </Switch>
      <Switch>
        <Route path={ROUTE_NAME.DISK_AREA} component={DiskArea} exact={true} />
      </Switch>
      <Switch>
        <Route path={ROUTE_NAME.CURRENT_FOLDER} component={CurrentFile} exact={true} />
      </Switch>
      <Redirect to={'/'}></Redirect>
    </BrowserRouter>
  );
};

export default Navigator;
