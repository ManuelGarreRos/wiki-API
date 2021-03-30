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

app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
})