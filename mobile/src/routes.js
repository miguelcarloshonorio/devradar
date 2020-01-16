import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './Pages/Main';
import Profile from './Pages/Profile';

const routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: 'DevRadar',
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Perfil no Github',
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#7d40e7',
        },
      },
    }
  )
);

export default routes;
