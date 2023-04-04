const User = require("../../models/UsersSchema");
const Event = require("../../models/EventsSchema");
const { transformEvent } = require("./merge");

module.exports = {
    events: async() => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event);
            })
        } catch (err) {
            throw err;
        };
    },
    createEvent: async(args, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }
        const event = new Event({
            title: args.eventInput.title,
            roomType: args.eventInput.roomType,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            checkInDate: new Date(args.eventInput.checkInDate),
            checkOutDate: new Date(args.eventInput.checkOutDate),
            creator: req.userId
        })
        let createdEvent;
        try {
            const result = await event.save()
            createdEvent = transformEvent(result);

            const user = await User.UserSignUp.findById(req.userId)
            if (!user) {
                throw new Error("User Not Found");
            }
            user.createdEvent.push(event);
            await user.save();
            return createdEvent;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}