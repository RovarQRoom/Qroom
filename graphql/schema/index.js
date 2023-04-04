const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking{
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    checkInDate: String!
    checkOutDate: String!
    creator: User!
}

type User{
    _id:ID!
    email:String!
    password:String
    createdEvent: [Event!]
}

input EventInput {
    title: String!
    roomType: String!
    description: String!
    price: Int!
    checkInDate: String!
    checkOutDate: String!
}

type RootQuery{
    events: [Event!]!
    bookings: [Booking!]!
}
type RootMutation{
    createEvent(eventInput: EventInput): Event
    bookEvent(eventId:ID!):Booking!
    cancelBooking(bookingId:ID!): Event!
}
schema{
    query: RootQuery       
    mutation: RootMutation
}
`)