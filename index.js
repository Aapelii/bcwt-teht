'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log(req)
    const username = 'Aku Ankka';
    const description = 'Ankkalinnan asukas.'
    const content = {title: username, description};
    res.render('index', content);
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/kukkuu', (req, res) => {
    res.send('kukkuu moro!');
});

app.get('/', (req, res) => {
    const responce = {message: 'Moro!'};
    res.json(responce);
});

app.get("/catinfo", (req, res) => {
    const cat = {
        name: "Frank",
        birthdate: "2010-12-25",
        weight: 5,
    };
    res.json(cat);
});

app.get("/esim-sivu", (req, res) => {
    const username = 'käyttäjän nimi';
    const response = `<html><head><title>${username}</title></head></html>`;
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
