let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

// NPC Model
let NPCSchema = require("../models/NPC");

// CREATE NPC
router.post("/create-npc", (req, res, next) => {
	NPCSchema.create(req.body, (error, data) => {
		if (error) {
			return next(error);
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

// READ NPC
router.get("/", (req, res) => {
	NPCSchema.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// UPDATE NPC
router
.route("/update-npc/:id")
// Get Single NPC
.get((req, res) => {
	NPCSchema.findById(
		req.params.id, (error, data) => {
	if (error) {
		return next(error);
	} else {
		res.json(data);
	}
	});
})

// Update NPC Data
.put((req, res, next) => {
	NPCSchema.findByIdAndUpdate(
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
router.delete("/delete-npc/:id",
(req, res, next) => {
	NPCSchema.findByIdAndRemove(
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
