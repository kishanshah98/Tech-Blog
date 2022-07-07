const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
            ]
        })

        if (!userData) {
            res.status(404).json({ message: 'There is no user with this id' });
            return;
        }

        res.json(userData)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username
            req.session.logged_in = true;

            res.json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/signout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update({
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
