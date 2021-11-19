import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import reducers from "./reducers";

const store = applyMiddleware(thunk)(createStore);

const w = window as any;
ReactDOM.render(<Provider
    store={store(reducers, w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__()
    )}
>
    <App />
</Provider>, document.getElementById('root'));


