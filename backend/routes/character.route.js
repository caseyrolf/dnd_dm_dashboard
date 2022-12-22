let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

// Character Model
let characterSchema = require("../models/Character");

// CREATE Character
router.post("/create-character", (req, res, next) => {
characterSchema.create(req.body, (error, data) => {
	if (error) {
	return next(error);
	} else {
	console.log(data);
	res.json(data);
	}
});
});

// READ Characters
router.get("/", (req, res) => {
characterSchema.find((error, data) => {
	if (error) {
	res.send(error);
	} else {
	res.json(data);
	}
});
});

// UPDATE Character
router
.route("/update-character/:id")
// Get Single Character
.get((req, res) => {
	characterSchema.findById(
		req.params.id, (error, data) => {
	if (error) {
		res.send(error);
	} else {
		res.json(data);
	}
	});
})

// Update Character Data
.put((req, res, next) => {
	characterSchema.findByIdAndUpdate(
	req.params.id,
	{
		$set: req.body,
	},
	(error, data) => {
		if (error) {
		return next(error);
		} else {
		res.json(data);
		console.log("Character updated successfully !");
		}
	}
	);
});

// Delete Character
router.delete("/delete-character/:id",
(req, res, next) => {
characterSchema.findByIdAndRemove(
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
