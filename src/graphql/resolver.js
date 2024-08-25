export const resolvers = {
    Query: {
        hello: () => 'Hello, World!',
        randomNubmer: () => Math.round(Math.random() * 10),
        message:  ()=>  'V2'
    }
}