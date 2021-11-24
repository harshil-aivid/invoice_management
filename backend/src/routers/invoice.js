const express = require("express");
const Invoice = require("../models/invoice");
// const auth = require('../middleware/auth')
const path = require("path");
const router = new express.Router();
const multer = require("multer");
const { extractContent } = require("../helper/pdf2text");

const pdfStorage = multer.diskStorage({
  // Destination to store image
  destination: "public/pdfs",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "_" +
        file.originalname +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const pdfUpload = multer({
  storage: pdfStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Pdf"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/uploadBills",
  pdfUpload.array("pdfs", 10),
  async function (req, res) {
    const pdfFiles = req.files;

    const textExtracted = [];
    for (let i = 0; i < pdfFiles.length; i++) {
      const pathToPDF = pdfFiles[i].path;
      const items = await extractContent(pathToPDF).catch((e) => []);
      textExtracted.push(items);
    }
    res.json({ extracted: textExtracted });
  }
);

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get("/db", async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tu_hai_k_nhi", async (req, res) => {
  res.send({ status: "Up and runnning like a makkhan" });
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
