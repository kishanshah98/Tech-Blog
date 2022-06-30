const { User } = require('../models')

const userdata = [
    {
        username: "nick",
        email: "nick@gmail.com",
        password: "password99"
    },
    {
        username: "chris",
        email: "chris@gmail.com",
        password: "password99"
    },
    {
        username: "john",
        email: "john@gmail.com",
        password: "password99"
    },
    {
        username: "bruce",
        email: "bruce@gmail.com",
        password: "password99"
    },
    {
        username: "george",
        email: "george@gmail.com",
        password: "password99"
    },
    {
        username: "logan",
        email: "logan@gmail.com",
        password: "password99"
    },
    {
        username: "jake",
        email: "jake@gmail.com",
        password: "password99"
    }
];

const seedUsers = () => User.bulkCreate(userdata, {
    individualHooks: true });

module.exports = seedUsers;