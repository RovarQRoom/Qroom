import {Hotels} from "../models/HotelsSchema";
import {Events} from "../models/EventsSchema";
const UsersModel = require("../models/UsersSchema");
const BookingModels = require("../models/BookingSchema");
const RoomModels = require("../models/room_models");

const mongoose = require("mongoose");
const HotelsDB = mongoose.createConnection("mongodb+srv://QRoom:900mylife@qroom.zlbunot.mongodb.net/Hotels");


// async function getAvailablesRooms() {
//     return RoomsData.find({ Availability: true }).count();
// }

//User Data
let user = {};

async function getEvents(req, res) {
    user = Object.assign({}, res.locals.user);
    if (res.locals.user) {
        let Events = await EventsModels.find({ creator: { _id: user._doc._id } })
        return Events;
    } else {
        let Events;
        return Events;
    }
}

async function countingNotification(req, res) {
    let count = 0;
    let Events = await getEvents(req, res);
    if (Events) {
        Events.forEach(event => {
            count++;
        });
        return count;
    } else {
        return 0;
    }
}

async function getImages(req, res) {
    user = Object.assign({}, res.locals.user);
    let Image;
    if (res.locals.user) {
        Image = await ProfileModels.ProfileImage.findOne({ email: user._doc.email }).sort({ $natural: -1 }).limit(1);
    }
    return Image;
}

//Post Purchasing
const HighCrestPurchase = async(req, res) => {

        let user = Object.assign({}, res.locals.user._doc);
        let eventId = req.body.id;
        console.log(eventId);
        const event = await EventsModels.findById({ _id: eventId })
            .then(data => {
                if (data) {
                    console.log("Data Added");
                }
                return data;
            }).catch(err => {
                console.log(err);
            });
        console.log(event.price);
        try {
            if (user.balance < event.price) {
                console.log("Insufficient Funds");
                res.redirect("/HighCrest/Home");
            } else {
                await UsersModel.UserSignUp.findOneAndUpdate({ _id: user._id }, { $set: { balance: user.balance - event.price } })
                    .then(data => {
                        if (data) {
                            console.log("User Balance Updated");
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                const Booking = await BookingModels.create({
                    event: eventId,
                    user: user._id
                });
                if (event.roomType == "VIP") {
                    await RoomsData.findOneAndUpdate({ Availability: true, Room_Service: "VIP" }, { $set: { Availability: false } })
                        .then(data => {
                            if (data) {
                                console.log("Availability Updated" + data);
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                } else {
                    await RoomsData.findOneAndUpdate({ Availability: true, Room_Service: "Basic" }, { $set: { Availability: false } })
                        .then(data => {
                            if (data) {
                                console.log("Availability Updated" + data);
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                }
                const deleteEvent = await EventsModels.deleteOne({ _id: eventId })
                    .then(data => {
                        console.log("Event Removed");
                    }).catch(err => {
                        console.log(err);
                    });
                res.status(201);
                res.redirect("/HighCrest/Home");
            }

        } catch (error) {
            console.log(error);
        }
    }
    //End Post Purchasing

const RemoveEvent = async(req, res) => {
    const eventId = req.params.id;
    const deleteEvent = await EventsModels.deleteOne({ _id: eventId })
        .then(data => {
            console.log("Event Removed");
        }).catch(err => {
            console.log(err);
        });
    res.status(201);
    res.redirect("/HighCrest/Home");
}

const HighCrestHome = async(req, res) => {
    let Image = await getImages(req, res);
    let Events = await getEvents(req, res);
    res.render("QRoom_Home/HighCrest/Home.ejs", { Image, Events, Count: await countingNotification(req, res) });
}

const HighCrestAllRooms = async(req, res) => {
    let Image = await getImages(req, res);
    let Events = await getEvents(req, res);
    res.render("QRoom_Home/HighCrest/AllRooms/AllRooms.ejs", { Image, Events, Count: await countingNotification(req, res) });
}

const HighCrestRoom = async(req, res) => {
    let Image = await getImages(req, res);
    let Events = await getEvents(req, res);
    let HotelFind = await HotelModels.Hotels.findOne({ Name: "HighCrest" });

    let Rooms = await getAvailablesRooms();
    res.render("QRoom_Home/HighCrest/Rooms/Rooms.ejs", { Image, Hotel: HotelFind.Name, Events, Count: await countingNotification(req, res), Availability: Rooms });
}


const HighCrestBlog = async(req, res) => {
    let Image = await getImages(req, res);
    let Events = await getEvents(req, res);
    res.render("QRoom_Home/HighCrest/Blog/Blog.ejs", { Image, Events, Count: await countingNotification(req, res) });
}

const HighCrestContacts = async(req, res) => {
    let Image = await getImages(req, res);
    let Events = await getEvents(req, res);
    res.render("QRoom_Home/HighCrest/Contacts/Contact.ejs", { Image, Events, Count: await countingNotification(req, res) });
}

const HighCrestEvents = async(req, res) => {
    let Image = await getImages(req, res);
    let Events = await getEvents(req, res);
    res.render("QRoom_Home/HighCrest/Events/Events.ejs", { Image, Events, Count: await countingNotification(req, res) });
}

const HighCrestAbout = async(req, res) => {
    let Image = await getImages(req, res);
    let Events = await getEvents(req, res);
    res.render("QRoom_Home/HighCrest/About/About.ejs", { Image, Events, Count: await countingNotification(req, res) });
}

const HighCrestRestaurants = async(req, res) => {
    let Image = await getImages(req, res);
    let Events = await getEvents(req, res);
    res.render("QRoom_Home/HighCrest/Resturant/Resturant.ejs", { Image, Events, Count: await countingNotification(req, res) });
}

const HighCrestChefsProfiles = async(req, res) => {
    res.render("QRoom_Home/HighCrest/Portfolio/Portfolio.ejs");
}

module.exports = {
    HighCrestHome,
    HighCrestAllRooms,
    HighCrestRoom,
    HighCrestBlog,
    HighCrestContacts,
    HighCrestEvents,
    HighCrestAbout,
    HighCrestRestaurants,
    HighCrestChefsProfiles,
    HighCrestPurchase,
    RemoveEvent
};