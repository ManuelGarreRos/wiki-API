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

//refactor to app.route
//Request to all articles
app.route('/articles')
    .get((req, res) => {
        Article.find(function (err, foundArticles) {
            if (err) {
                console.log(err);
            } else {
                res.send(foundArticles);
            }
        });
    })
    .post((req, res) => {
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
    })
    .delete((req, res) => {
        Article.deleteMany((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted all articles");
            }
        });
    });


//Requests targeting a specific article
app.route('/articles/:articleTitle')
    .get((req,res)=>{
        Article.findOne({title: req.params.articleTitle}, (err, foundArticle)=>{
            if(foundArticle){
                res.send(foundArticle)
            }else{
                res.send(`No article with the name: ${req.params.articleTitle} found`)
            }
            if(err){
                console.log(err)
            }
        })
    });
    

//LISTEN
app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
});