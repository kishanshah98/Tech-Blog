const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'user_id', 'post_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        })

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', 
            posts)
            
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;
