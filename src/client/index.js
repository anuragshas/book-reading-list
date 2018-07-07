import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import './styles/styles.css';

const client = new ApolloClient({
  uri: '/graphql',
});

const jsx = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(jsx, document.getElementById('root'));
