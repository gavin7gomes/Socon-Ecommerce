import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import AppRouter from './components/AppRouter/AppRouter';
import Splash from './screens/SplashPage/SplashScreen';

function App() {
  return (
    <Provider store={store}>
      <Splash />
      <AppRouter />
    </Provider>
  );
}

export default App;
