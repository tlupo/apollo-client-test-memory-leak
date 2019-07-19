// React
import React from 'react'
import {View,Text} from 'react-native'

import {withApollo} from 'react-apollo';
import {gql} from "apollo-boost";

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            queryCallsCount: 0
        }
    }

    componentDidMount() { 
        this.fetch()    
    }

    componentWillUnmount() {
        this.cleanPolling()
    }

    cleanPolling() {
        if(this.query != null) {
            this.query.stopPolling()
            this.query = null
        }

        if(this.querySubscription != null) {
            this.querySubscription.unsubscribe()
            this.querySubscription = null
        }
    }

    fetch() {

        const query = gql `
            query {
                queryArtists(byName:"Red Hot Chili Peppers") {
                    name
                }
            }
        `

        this.query = this.props.client.watchQuery({
            query: query,
            fetchPolicy: 'cache-and-network',
            pollInterval: 5000
        })

        this.querySubscription = this.query.subscribe({
            next: ({data,loading}) => {
                if(!loading) {
                    this.setState({
                        queryCallsCount: this.state.queryCallsCount + 1 
                    })
                }
            },
            error: (error) => {
            }
        })
    }

    render() {

        const styles = {
            root: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
        return (
            <View style={styles.root}>
                <Text>Apollo Client - Memory Leak Test</Text>
                <Text>Query calls count: {this.state.queryCallsCount}</Text>
            </View>
        )
    }
}

export default withApollo(Home)