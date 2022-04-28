const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')


const { MONGODB } = require('./config.js')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) =>({ req })
})

const PORT = process.env.PORT || 5000

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(`mongoDB conected`)
        return server.listen({port:PORT})
    })
    .then(res => {
        console.log(`serever running at ${res.url}`)
    })
    .catch(err =>{
        console.error(err)
    })

    