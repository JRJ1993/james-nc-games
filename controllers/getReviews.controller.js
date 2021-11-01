const {
    fetchReviews

} = require('../models/reviews.model');


exports.getReviews = (req, res) => {
    let id = (req.params.review_id);
    fetchReviews(id)
    .then((reviews) => {
        res.status(200).send({reviews});
    })
    
}