/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import {ApolloProvider} from "react-apollo"
import {ApolloClient} from "apollo-boost";
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http'

import Home from './Home'


const httpLink = createHttpLink({ uri: 'https://spotify-graphql-server.herokuapp.com/graphql'})

const link = ApolloLink.from([httpLink])

const cache = new InMemoryCache();

let client = new ApolloClient({
  cache,
  link: link
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Home/>
      </ApolloProvider>
    )
  }
}

export default App