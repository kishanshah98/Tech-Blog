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

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/signin', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signin')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('posts/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
                mode: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }]
        })

        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id' });
            return;
        }

        const post = postData.map((posts) => posts.get({ plain: true }));

        res.render('singlePost', {
            post,
            loggedIn: req.session.loggedIn
        })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router;
