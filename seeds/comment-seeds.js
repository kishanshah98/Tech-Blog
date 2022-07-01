const { Comment } = require('../models');

const commentData = [
    {
        comment_content: "Agreed!",
        user_id: 3,
        post_id: 1
    },
    {
        comment_content: "I disagree with this!",
        user_id: 1,
        post_id: 2
    },
    {
        comment_content: "Hmmmmmmmmm interesting",
        user_id: 2,
        post_id: 3
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;