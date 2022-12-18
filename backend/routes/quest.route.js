let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

// Quest Model
let QuestSchema = require("../models/quest");

// CREATE Quest
router.post("/create-quest", (req, res, next) => {
	QuestSchema.create(req.body, (error, data) => {
		if (error) {
			return next(error);
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

// READ Quest
router.get("/", (req, res) => {
	QuestSchema.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// UPDATE Quest
router
.route("/update-quest/:id")
// Get Single Quest
.get((req, res) => {
	QuestSchema.findById(
		req.params.id, (error, data) => {
	if (error) {
		return next(error);
	} else {
		res.json(data);
	}
	});
})

// Update Quest Data
.put((req, res, next) => {
	QuestSchema.findByIdAndUpdate(
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

// Delete NPC
router.delete("/delete-quest/:id",
(req, res, next) => {
	QuestSchema.findByIdAndRemove(
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
