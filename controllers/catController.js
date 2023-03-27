'use strict';

const catModel = require('../models/catModel');
const {validationResult} = require("express-validator");

const getCatList = async (req, res) => {
    try{
        let cats = await catModel.getAllCats();
        // Convert ISO date to date only.
        cats.map(cat => {
            cat.birthdate = cat.birthdate.toISOString().split('T')[0];
            return cat;
        });
        res.json(cats);
    }
    catch (error){
        res.status(500).json({error: 500, message: error.message});
    }
};

const getCat = (req, res) => {
    //console.log(req.params);
    const id = req.params.catId;
    // filter matching cat(s) based on id
    const filteredCats = cats.filter(cat => id == cat.id);
    if (filteredCats.length > 0) {
        res.json(filteredCats[0]);
    } else {
        // send response 404 if id not found in array
        // res.sendStatus(404);
        res.status(404).json({message: 'Cat not found.'})
    }
};

const postCat = async (req, res) => {
    //console.log('posting a cat', req.body, req.file);
    // add cat details to cats array
    if(!req.file){
        res.status(400).json({
            status: 400,
            message: 'invalid post data'
        });
        return;
    }
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid data'
        });
        return;
    }
    const newCat = req.body;
    newCat.filename = 'http://localhost:3000/uploads/' + req.file.filename;
    try{
        const result = await catModel.insertCat(newCat)
        res.status(201).json({message: 'new cat added'});
    }
    catch(error){
        res.status(500).json({error: 500, message: 'adding new cat failed'})
    }
    cats.push(newCat);
    // send correct response if upload successful
    res.status(201).send('new cat added!');
};


const putCat = async (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid put data'
        });
        return;
    }
    const cat = req.body;
    try{
        const result = await catModel.modifyCat(cat)
        //
        res.status(200).json({message: 'cat modified'});
    }
    catch (error){
        res.status(400).json({error: 500, message: 'cat modifying failed'})
    }
};

const deleteCat = (req, res) => {
    res.send('With this endpoint you can delete a cat');
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;