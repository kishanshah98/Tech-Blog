const { User } = require('../models')

const userdata = [
    {
        username: "nick",
        password: "password99"
    },
    {
        username: "chris",
        password: "password99"
    },
    {
        username: "john",
        password: "password99"
    },
    {
        username: "bruce",
        password: "password99"
    },
    {
        username: "george",
        password: "password99"
    },
    {
        username: "logan",
        password: "password99"
    },
    {
        username: "jake",
        password: "password99"
    }
];

const seedUsers = () => User.bulkCreate(userdata, {
    individualHooks: true });

module.exports = seedUsers;