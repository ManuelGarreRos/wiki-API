const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view-engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const articleSchema = new mongoose.Schema({
    title: "String",
    content: "String"
});
const Article = mongoose.model('Article', articleSchema);

//TO DO

app.get('/articles', (req, res) => {
    Article.find(function (err, foundArticles) {
        if (err) {
            console.log(err);
        } else {
            res.send(foundArticles);
        }
    });
});

app.post('/articles', (req, res) => {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.connect
    });

    newArticle.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send(`Article: ${newArticle} succesfully added`);
        }
    });
});

app.delete('/articles', (req, res)=>{
    Article.deleteMany((err)=>{
        if(err){
            res.send(err);
        }else{
            res.send("Successfully deleted all articles");
        }
    });
});

//LISTEN
app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
});