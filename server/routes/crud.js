const express = require('express');
const router = express.Router();
const isAuthenticated = require('../utils/is_authenticated');
const User = require('../models/User');
const Hardware = require('../models/Hardware');



router.get('/', function (req, res, next) {

    Hardware.find().exec(function (err, products) {
        console.log(products)
        res.status(200).send(products)
    })
})

router.get('/user/:user_id', function (req, res, next) {

    Hardware.find({
        author: req.params.user_id
    }).exec(function (err, hardwares) {
        if (err) return next(err);
        User.findById(req.params.user_id).exec(function (err, user) {
            if (err) return next(err);
            res.status(200).send({
                hardwares: hardwares,
                author: user
            });
        });

    })
})
router.post('/', isAuthenticated, function (req, res, next) {

    console.log(req.body);
    new Hardware({
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        category: req.body.category,
        userDBT: req.body.userDBT,
        state: req.body.state,
        comment: req.body.comment,
        invNumber: req.body.invNumber,
        author:req.user,

        

    }).save(function (err, product) {

        res.status (200).send(product);

    })

})

router.put('/', isAuthenticated,  function (req, res, next) {


    Hardware.findById(req.body._id).exec(function (err, product) {

        if (err) {
            return res.status(400).send({
                msg: 'Hardware not found'
            });
        }
        product.name = req.body.name;
        product.serialNumber = req.body.serialNumber;
        product.category = req.body.category;
        product.invNumber = req.body.invNumber;
        product.userDBT = req.body.userDBT;
        product.state = req.body.state;
        product.comment = req.body.comment;
        product.save(function (err, product) {
           
           res.status(200).send(product);

        })
    })
})

router.delete('/:id', isAuthenticated, function (req, res, next) { //route hello

    Hardware.deleteOne({
            _id: req.params.id
        })
        .exec(function (err, Dbs) {
            console.log(Dbs)
            if (err) {
                return res.status(400).send({
                    msg: 'not deleted'
                })
            }
            res.status(200).end()
        })

})


router.get('/:id', function (req, res, next) {

    Hardware.findById(req.params.id).exec(function (err, products) {
        if (err) {
            return res.status(400).send({
                msg: 'Hardware not found'
            })
        }
        console.log(products)
        res.status(200).send(products)
    })
})



module.exports = router; 

