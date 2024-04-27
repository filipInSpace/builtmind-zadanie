import './App.css';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <AddItemForm />
          <ItemList />
      </Provider>
    </div>
  );
}

export default App;