let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

// Enemy Model
let enemySchema = require("../models/Enemy");

// CREATE Enemy
router.post("/create-enemy", (req, res, next) => {
enemySchema.create(req.body, (error, data) => {
	if (error) {
	return next(error);
	} else {
	console.log(data);
	res.json(data);
	}
});
});

// READ Enemy
router.get("/", (req, res) => {
enemySchema.find((error, data) => {
	if (error) {
	return next(error);
	} else {
	res.json(data);
	}
});
});

// UPDATE Enemy
router
.route("/update-enemy/:id")
// Get Single Enemy
.get((req, res) => {
	enemySchema.findById(
		req.params.id, (error, data) => {
	if (error) {
		return next(error);
	} else {
		res.json(data);
	}
	});
})

// Update Enemy Data
.put((req, res, next) => {
	enemySchema.findByIdAndUpdate(
	req.params.id,
	{
		$set: req.body,
	},
	(error, data) => {
		if (error) {
		return next(error);
		} else {
		res.json(data);
		}
	}
	);
});

// Delete Enemy
router.delete("/delete-enemy/:id",
(req, res, next) => {
enemySchema.findByIdAndRemove(
	req.params.id, (error, data) => {
	if (error) {
	return next(error);
	} else {
	res.status(200).json({
		msg: data,
	});
	}
});
});

module.exports = router;
