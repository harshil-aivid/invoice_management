const pdfjs = require("pdfjs-dist/es5/build/pdf");
const _ = require("lodash");

async function getContent(src) {
  const doc = await pdfjs.getDocument(src).promise;
  const page = await doc.getPage(1); // if doc has many pages use doc.numPages to iterate and pass index to doc.getPage
  return await page.getTextContent();
}

async function extractContent(src) {
  // Perform pre-processing
  const content = await getContent(src);
  // console.log(content.items);

  return content.items
    .filter((item) => item.str.trim().length)
    .map((item) => item.str);
}

function processItems(items) {
  console.log("GOt : ", items);
  const records = _.chunk(items, 6).reduce(
    (
      records,
      [id, date, amount, description, reconciled, transaction_type]
    ) => {
      records.push({
        id,
        date,
        amount,
        description,
        reconciled,
        transaction_type,
      });
      return records;
    },
    []
  );

  // save json or save csv or write to db
  console.log(records);
}

function handleErrors(error) {
  // handle errors
  console.log(error);
}

module.exports = { extractContent };

// extractContent("./bank-statement.pdf").then(processItems).catch(handleErrors);
