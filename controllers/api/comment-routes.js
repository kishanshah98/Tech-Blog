const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        // res.json(commentData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });

        // res.json(commentData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_content: req.body.comment_content,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });

        // res.json(commentData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update({
            comment_content: req.body.comment_content
        },
        {
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        // res.json(commentData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!'});
            return;
        }

        // res.json(commentData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
