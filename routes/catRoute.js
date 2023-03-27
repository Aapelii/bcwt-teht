'use strict';

const multer = require('multer')
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController')
const {body} = require('express-validator')

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png']
    if(allowedTypes.includes(file.mimetype)){
        // accept file
        cb(null, true);
    }else{
        // reject file
        cb(null, false);
    }
};

const upload = multer({dest: 'uploads/', fileFilter: fileFilter()})

// root of cat endpoint (e.g. https://localhost:3000/cat)
router.route('/')
    .get(catController.getCatList)
    .post(upload.single('cat'),
        body('name').isAlphanumeric().isLength({min: 1, max: 200}),
        body('birthdate').isDate(),
        body('weight').isFloat({min: 0.1, max: 50}),
        body('owner').isInt({min: 1}),
        catController.postCat)
    .put(catController.putCat)
// all /cat/:id endpoints
router.route('/:id')
    .get(catController.getCat)
    .delete(catController.deleteCat);

module.exports = router;