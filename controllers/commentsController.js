const { Comment } = require("../models");

const commentsController = {};

commentsController.createComment = async (req, res) => {
try {
    //REcuperamos info a guardar
    const message = req.body.message;
    const productId = req.body.product_id;

    const newComment = await Comment.create({
        product_id: productId,
        message: message
    })

    return res.json(newComment);
} catch (error) {
    return res.send(error.message);
}
}

module.exports = commentsController;