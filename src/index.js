require('dotenv').config()
const db = require('./db')
const express = require('express')
const {ApolloServer ,gql} = require('apollo-server-express')
const {ApolloServerPluginDrainHttpServer} = require('apollo-server-core')
const http = require('http')
const port = process.env.PORT || 5000
// const DB_HOST = process.env.DB_HOST


//mock dataset


//graphql schema
const typeDefs = gql`
    type Query {
        hello: String!
    }
`

//resolvers
const resolvers = {
    Query: {
        hello: () => 'Hello, World!'
    }
}

async function  startApolloServer (typeDefs, resolvers) {
    const app = express()
    // db.connect(DB_HOST)
    const httpServer = http.createServer(app)
    const server = new ApolloServer({typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({httpServer})]})
    await server.start()
    server.applyMiddleware({app, path: '/api'})
    await new Promise(resolve => httpServer.listen({port}, resolve));
    console.log(`🚌 Server listening at http://localhost:${port}${server.graphqlPath}`);

}


startApolloServer(typeDefs, resolvers)
