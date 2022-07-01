const router = require('express').Router();
const { Post, User, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
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
                    attributes: ['id', 'comment_content', 'user_id', 'created_at'],
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

        // res.render('homepage', {
        //     posts,
        //     // logged_in: req.session.logged_in
        // });
        res.json(postData)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;
