import { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavigationLayout from '../pages/Dashboard/Dashboard';

import RegitryPopup from '../components/Popup/RegistryPopup/RegistryPopup';
import AuthPopup from '../components/Popup/AuthPopup/AuthPopup';
import CreateFolderPopup from '../components/Popup/CreateFolderPopup/CreateFolderPopup';

import DiskArea from '../components/DiskArea/DiskArea';
import CurrentMesh from '../components/DiskArea/CurrentMesh/CurrentMesh';
import MeshDetailze from '../components/DiskArea/MeshDetailaze/MeshDetailaze';

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
        <Route path={ROUTE_NAME.CURRENT_FOLDER} component={MeshDetailze} exact={true} />
      </Switch>
      <Switch>
        <Route path={ROUTE_NAME.CREATE_FOLDER} component={CreateFolderPopup} exact={true} />
      </Switch>
      <Redirect to={'/'}></Redirect>
    </BrowserRouter>
  );
};

export default Navigator;
