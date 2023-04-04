const eventsResolver = require("./events");
const bookingResolver = require("./booking");

const rootResolver = {
    ...eventsResolver,
    ...bookingResolver
}
module.exports = rootResolver