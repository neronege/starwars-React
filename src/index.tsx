import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import ApolloClientProvider from './ApolloClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

ReactDOM.render(
    <React.StrictMode>
      <ApolloClientProvider>
        <App />
      </ApolloClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );

// reportWebVitals();
