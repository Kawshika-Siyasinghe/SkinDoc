const express = require('express');
const router = express.Router();
require('dotenv/config');
const Clinic = require('../models/clinicRate');
const Rate = require('../models/rate');
const updateRating = require('../middleware/rating_updater');


//TO RATE A CLINIC
router.post('/postReview', async (req, res) => {


        const rate = new Rate({
            clinicId: req.body.clinic_email,
            rate_given: req.body.rate_given,
            comment: req.body.comment,
            author: req.body.author
        });

        rate.save().then((result) => {
            res.status(200).json({
                message:"The review has been added",
            })
        },(err) => {
            res.status(200).json({
                error: err
            })
        }).catch(err=> {
            error:er
        });

        // try {
        //     const savedRates = await rate.save();
        //     res.json(savedRates);
        //     console.log('Clinic has been rated.');
        // } catch (err) {
        //     res.json({message: err});
        // }

});

//TO SHOW ALL THE RATINGS OF A PARTICULAR CLINIC
router.post('/', async (req, res) => {
    const clinic_email = req.body.clinic_email;
    Rate.find({clinicId:clinic_email}).exec().then(result => {
        res.status(200).send(result);
    }, err =>{
        res.status(404).send({message:err})
    })

    // try {
    //     // console.log(req.params._id);
    //     const specificClinicId = await Clinic.findById(req.params._id);
    //     // console.log(specificClinicId);
    //     const clinicId = specificClinicId.clinic_email;
    //     // console.log(clinicId);
    //     const query = await Rate.find({clinicId: clinicId});
    //     // console.log(query);
    //     // const specificClinicEmail = await Rate.find({''});
    //     // // console.log(specificClinicEmail);
    //     // const allRatings = await Rate.findById(specificClinicId._Id);
    //     // console.log(allRatings);
    //     res.json(query);

    // } catch (err) {
    //     res.json(err);
    // }


});


//
// router.get('/ratingUpdater/:_id', async (req, res) => {
//
//     try {
//         console.log(req.params._id);
//         const specificClinicId = await Clinic.findById(req.params._id);
//         console.log(specificClinicId);
//         const currentRating = specificClinicId.current_rating;
//         console.log(currentRating);
//
//
//         const newCurrentRating = currentRating + 10;
//         console.log(newCurrentRating);
//
//
//
//
//
//         const query = await Rate.find({rate_given: re});
//         // console.log(query);
//         // const specificClinicEmail = await Rate.find({''});
//         // // console.log(specificClinicEmail);
//         // const allRatings = await Rate.findById(specificClinicId._Id);
//         // console.log(allRatings);
//         res.json(query);
//
//     } catch (err) {
//         res.json(err);
//     }


// });


module.exports = router;
