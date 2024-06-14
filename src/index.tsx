import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import ApolloClientProvider from './ApolloClient.tsx';
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

reportWebVitals();
