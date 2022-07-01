const { Post } = require('../models');

const postData = [
    {
        title: "Javascript is great!",
        content: "By far the best program out there",
        user_id: 1
    },
    {
        title: "CSS",
        content: "This program is so difficult!",
        user_id: 2
    },
    {
        title: "Handlebars",
        content: "Was so confused by these at first, but starting to get the hang of them!",
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;