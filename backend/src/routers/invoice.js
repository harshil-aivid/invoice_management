const express = require("express");
const Invoice = require("../models/invoice");
// const auth = require('../middleware/auth')
const path = require("path");
const router = new express.Router();
const multer = require("multer");
let fs = require("fs");
let pdfParser = require("pdf-parse");
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

const PDFParser = require("pdf2json");

router.post(
  "/uploadBills",
  pdfUpload.array("pdfs", 10),
  async function (req, res) {
    const pdfFiles = req.files;
    const pdf2jsonParser = new PDFParser(this, true);
    pdf2jsonParser.on("pdfParser_dataError", (errData) =>
      console.error(errData.parserError)
    );
    pdf2jsonParser.on("pdfParser_dataReady", (pdfData) => {
      console.log(pdf2jsonParser.getRawTextContent());
      res.json({ extracted: pdf2jsonParser.getRawTextContent() });
      let convertedText = "";
      pdfData.Pages.forEach(({ Texts }) => {
        Texts.forEach(({ R }) =>
          R.forEach(({ T }) => {
            convertedText += T;
          })
        );
      });
      // console.log("Fetched : ", decodeURI(convertedText));
      console.log("\n**********************************************\n");
    });
    const textExtracted = [];
    for (let i = 0; i < pdfFiles.length; i++) {
      const pathToPDF = pdfFiles[i].path;
      const items = await extractContent(pathToPDF);
      // let toText = Pdf2TextObj();
      // let onPageDone = function () {}; // don't want to do anything between pages
      // let onFinish = function (fullText) {
      //   console.log(fullText);
      // };
      // toText.pdfToText(pathToPDF, onPageDone, onFinish);

      // const pdffile = fs.readFileSync(pathToPDF);
      // const data = await pdfParser(pdffile).catch((err) => console.log(err));
      textExtracted.push(items);
      // pdf2jsonParser.loadPDF(pathToPDF);
    }
    res.json({ extracted: textExtracted });
    //

    // let pdfParser = new PDFParser();
    // pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    // pdfParser.on("pdfParser_dataReady", pdfData => {
    //     console.log("PDF DATA : ", pdfData.formImage.Pages[0].Texts[0].R[0])
    //     console.log("EXTRACTED Fields ", pdfParser.getAllFieldsTypes());
    //     console.log("EXTRACTED Raw Text Data", pdfParser.getRawTextContent(pdfData));
    //     res.status(201).send(pdfParser.getRawTextContent())
    // });

    // pdfParser.loadPDF(path.join(__dirname, "pdfFiles_1633285471397.pdf"));

    // const task = new Task(
    //     ...req.body,
    //     owner: req.user._id
    // })

    try {
      //   await task.save()
      // res.status(201).send("WOrk");
    } catch (e) {
      res.status(400).send(e);
    }
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

router.get("/test", async (req, res) => {
  return "Hello";
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
