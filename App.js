import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { RootNavigation } from './src/navigation/RootNavigation';

export default function App() {

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
