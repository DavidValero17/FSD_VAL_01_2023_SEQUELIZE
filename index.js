const express = require('express');
const { Product, Comment } = require('./models/index')
const db = require('./db.js');
// const productController = require('./controllers/productController');
const commentsController = require('./controllers/commentsController');
require('dotenv').config()

const app = express();
const productRoutes = require('./views/productRoutes');
const authRoutes = require('./views/authRoutes');
const userRoutes = require('./views/userRoutes');

app.use(express.json());

app.use(productRoutes);
app.use(authRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 4000;

app.get('/welcome', (req, res) => {
    return res.send("Bienvenido a mi app")
})

app.delete('/products/:id', async(req, res) => {
    const productId = req.params.id;
    
    const deleteProduct = await Product.destroy({where: { id: productId}})

    return res.json(deleteProduct);
})

app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;

    const name = req.body.name;

    const updateProduct = await Product.update({name: name}, {where: {id: productId}})

    return res.json(updateProduct);

})

app.post('/comments', commentsController.createComment)

app.get('/comments/:id', async (req, res) => {
    const commentId = req.params.id;

    const comment = await Comment.findByPk(commentId, {
        include: {all: true}
    });

    return res.json(comment);
})



db.then(() => {
    //Starting server
    app.listen(PORT, () => console.log("Server on port " + PORT));
})
    .catch((err) => console.log(err.message));   
