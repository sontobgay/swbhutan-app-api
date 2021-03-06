var router = require('express').Router()
var RegistrationPitching = require('../models/registration-pitching-model')

router.get('/registered-participants-rtc/:page', function(req, res, next) {
    var perPage = 45
    var page = req.params.page || 1

    RegistrationPitching
        .find({"pitch_area": 7})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, registrationPitchings) {
            RegistrationPitching.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('pages/registered-participants-rtc', {
                    registrationPitchings: registrationPitchings,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })

                console.log(registrationPitchings);
            })
        })
})

module.exports = router