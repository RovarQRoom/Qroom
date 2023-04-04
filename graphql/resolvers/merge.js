const Event = require("../../models/EventsSchema");
const User = require("../../models/UsersSchema");
const {dateToString} = require("../../helpers/date");


const transformBooking = booking =>{
    return {
        ...booking._doc,
        _id:booking.id,
        user:  userData.bind(this,booking._doc.user),
        event: singleEvent.bind(this,booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}

const transformEvent = event =>{
    return {
        ...event._doc , 
        _id:event.id,
        checkInDate: dateToString(event._doc.checkInDate),
        checkOutDate: dateToString(event._doc.checkOutDate), 
        creator: userData.bind(this,event._doc.creator)
    };
}

const userData = async UserID=>{
    try{
        const user = await User.UserSignUp.findById(UserID)
        return { 
            ...user.doc, 
            _id:user.id,
            email:user.email,
            password:user.password,
            createdEvent: eventsData.bind(this,user._doc.createdEvent)
        }
    }catch(err){
        throw err;
    }
}

const eventsData =  async eventIds =>{
    try{
        const events = await Event.find({_id:{$in:eventIds}})
        return events.map(event =>{
            return transformEvent(event);
        });
    }catch(err) {
        throw err;
    }
}

const singleEvent = async eventId=>{
    try{
        const event = await Event.findById(eventId);
        return transformEvent(event);
    }catch(err){
        throw err;
    }
}

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;