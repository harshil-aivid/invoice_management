const response = [
  [
    "     FLETCHER OIL CO., INC.                                     Page: 1",
    "     PO BOX 2428",
    "     520 SIXTH AVE                               Invoice No:    1075379",
    "     COLUMBUS, GA 31902                          Invoice Date:  09/01/21",
    "                                                 Ship    Date:  09/01/21",
    "                                                 Profit Center: 6",
    "Sold MEEKAJAY INC                           Ship MEEKAJAY INC",
    " To: 1499 LAFAYETTE PKWY                     To: 1499 LAFAYETTE PKWY",
    "     LAGRANGE, GA  30240                         LAGRANGE, GA  30240",
    "Account No:12290185     PO No:                   Terms: EFT NET 5 DAYS",
    "Ship Via:FLETCHER OIL CO          Sales ID:      BOL/Ship.Order:",
    ">----------------------------------------------------------------------------",
    "Product Code/                                Quantity    Price",
    "Description                                  Shipped     Each      Extension",
    "-----------------------------------------------------------------------------",
    "  B/L Number--  176068592",
    "0121",
    "10% ETHANOL REGULAR                         6,577.0     2.302401    15,142.89",
    "0123",
    "10% ETHANOL SUPER                           1,085.0     2.876406     3,120.90",
    "0211",
    "ON RD DIESEL 15 PPM                           990.0     2.273202     2,250.47",
    "     GA EXCISE GAS                          7,662.0      .287000     2,199.00",
    "     TROUP LOCAL GAS TAX                    7,662.0      .072750       557.41",
    "     ETHANOL FED ENVIR RECOV FEE            7,662.0      .001930        14.78",
    "     FEDERAL GAS TAX .184                   7,662.0      .184000     1,409.81",
    "     GA ENVIRONMENTAL FEE                   8,652.0      .007500        64.90",
    "     GA EXCISE DIESEL                         990.0      .322000       318.78",
    "     TROUP LOCAL DSL TAX                      990.0      .077400        76.63",
    "     FEDERAL DIESEL TAX .244                  990.0      .244000       241.56",
    "     FEDERAL ENVIRONMENTAL FEE REC            990.0      .002140         2.12",
    "             COMBUSTIBLE LIQUID NA 1993",
    "   3% SERVICE CHARGE ADDED TO ACCOUNTS PAID BY CREDIT CARD",
    "                                                            -----------------",
    "                                              Total Amount:         25,399.25",
  ],
  [
    "     FLETCHER OIL CO., INC.                                     Page: 1",
    "     PO BOX 2428",
    "     520 SIXTH AVE                               Invoice No:    1075574",
    "     COLUMBUS, GA 31902                          Invoice Date:  09/02/21",
    "                                                 Ship    Date:  09/02/21",
    "                                                 Profit Center: 6",
    "Sold MEEKAJAY INC                           Ship MEEKAJAY INC",
    " To: 1499 LAFAYETTE PKWY                     To: 1499 LAFAYETTE PKWY",
    "     LAGRANGE, GA  30240                         LAGRANGE, GA  30240",
    "Account No:12290185     PO No:                   Terms: EFT NET 5 DAYS",
    "Ship Via:FLETCHER OIL CO          Sales ID:      BOL/Ship.Order:",
    ">----------------------------------------------------------------------------",
    "Product Code/                                Quantity    Price",
    "Description                                  Shipped     Each      Extension",
    "-----------------------------------------------------------------------------",
    "  B/L Number--  1211149",
    "0121",
    "10% ETHANOL REGULAR                         5,428.0     2.281000    12,381.27",
    "     GA EXCISE GAS                          5,428.0      .287000     1,557.84",
    "     TROUP LOCAL GAS TAX                    5,428.0      .072750       394.89",
    "     ETHANOL FED ENVIR RECOV FEE            5,428.0      .001930        10.48",
    "     FEDERAL GAS TAX .184                   5,428.0      .184000       998.75",
    "     GA ENVIRONMENTAL FEE                   5,428.0      .007500        40.71",
    "   3% SERVICE CHARGE ADDED TO ACCOUNTS PAID BY CREDIT CARD",
    "                                                            -----------------",
    "                                              Total Amount:         15,383.94",
  ],
  [
    "     FLETCHER OIL CO., INC.                                     Page: 1",
    "     PO BOX 2428",
    "     520 SIXTH AVE                               Invoice No:    1075371",
    "     COLUMBUS, GA 31902                          Invoice Date:  09/02/21",
    "                                                 Ship    Date:  09/02/21",
    "                                                 Profit Center: 6",
    "Sold HARSHVADAN PATEL, SADHIMA INC          Ship HARSHVADAN PATEL, SADHIMA IN",
    " To: 3874 ST MARY'S RD                       To: 3874 ST MARY'S RD",
    "     COLUMBUS, GA  31906                         COLUMBUS, GA  31906",
    "Account No:66040191     PO No:                   Terms: EFT NET 5 DAYS",
    "Ship Via:FLETCHER OIL CO          Sales ID:      BOL/Ship.Order:",
    ">----------------------------------------------------------------------------",
    "Product Code/                                Quantity    Price",
    "Description                                  Shipped     Each      Extension",
    "-----------------------------------------------------------------------------",
    "  B/L Number--  156024958",
    "0121",
    "10% ETHANOL REGULAR                         7,119.0     2.248500    16,007.07",
    "0123",
    "10% ETHANOL SUPER                             791.0     2.804096     2,218.04",
    "     GA EXCISE GAS                          7,910.0      .287000     2,270.17",
    "     MUSCOGEE LOCAL GAS TAX                 7,910.0      .072750       575.46",
    "     ETHANOL FED ENVIR RECOV FEE            7,910.0      .001930        15.27",
    "     FEDERAL GAS TAX .184                   7,910.0      .184000     1,455.44",
    "     GA ENVIRONMENTAL FEE                   7,910.0      .007500        59.32",
    "   3% SERVICE CHARGE ADDED TO ACCOUNTS PAID BY CREDIT CARD",
    "                                                            -----------------",
    "                                              Total Amount:         22,600.77",
  ],
];
const extractProductInfo = [
  {
    textToMatch: "10% ETHANOL REGULAR",
    fieldName: "REGULAR",
    productCode: 121,
  },
  {
    textToMatch: "10% ETHANOL SUPER",
    fieldName: "SUPER",
    productCode: 123,
  },
  {
    textToMatch: "ON RD DIESEL 15 PPM",
    fieldName: "DIESEL",
    productCode: 211,
  },
  {
    textToMatch: "SOMETHING ETHANOL REGULAR",
    fieldName: "REGULAR",
  },
];
/*
try :
        invoice_no = re.search(r'Invoice No:\s*(.*?)\n', content).group(1)
    except Exception as e:
        print("[ERROR] : Invoice Number Not Found")
    
    try :
        invoice_date = re.search(r'Invoice Date:\s*(.*?)\n', content).group(1)
    except Exception as e:
        print("[ERROR] : Invoice Date Not Found")
    try :
        REG =  list(map(lambda s: float(s.replace(",","")) , re.search(r'10% ETHANOL REGULAR\s*(.*?)\n', content).group(1).split()))
#         REG = list(map(str_to_float,re.search(r'10% ETHANOL REGULAR\s*(.*?)\n', content).group(1).split()))
    except Exception as e:
        print("[WARNING] : Regular Not Found")
    try :
        SUPER = list(map(lambda s: float(s.replace(",","")) , re.search(r'10% ETHANOL SUPER\s*(.*?)\n', content).group(1).split()))
    except Exception as e:
        print("[WARNING] : Super Not Found")
    try :
        DIESEL = list(map(lambda s: float(s.replace(",","")) , re.search(r'ON RD DIESEL 15 PPM\s*(.*?)\n', content).group(1).split()))
    except Exception as e:
        print("[WARNING] : Diesel Not Found")
    try :
        PLUS = list(map(lambda s: float(s.replace(",","")) , re.search(r'SOMESTRING\s*(.*?)\n', content).group(1).split()))
    except Exception as e:
        print("[WARNING] : PLUS Not Found")
    try :
        total_amount = re.search(r'Total Amount:\s*(.*?)\n', content).group(1)
        total_amount = float(total_amount.replace(",",""))
    except Exception as e:
        print("[ERROR] : Total Amount Not Found")
    return {"invoice_no":invoice_no,"invoice_date":invoice_date,"REG":REG,"SUPER":SUPER,"PLUS":PLUS,"DIESEL":DIESEL,"total_amount":total_amount}
*/
function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
const extractJson = (str) => {
  // const regex2 = /(?:\s\s+)((?!\s{2}).*):\s*(.*)(?:\s\s+|$)/;
  const regexForKeyValuePairs = /(\S+((?!\s{2}).)+):\s*(\S+((?!\s{2}).)*)/;
  const regexForSold = /Sold (\S+((?!\s{2}).)+)/;
  const regexForBLNumber = /B\/L Number--\s+(.*)/;

  let m;
  let obj = {};
  str = "  " + str;
  if ((m = regexForKeyValuePairs.exec(str)) !== null) {
    obj[camelize(m[1])] = m[3];
  }

  if ((m = regexForSold.exec(str)) !== null) {
    obj["soldTo"] = m[1];
  }

  if ((m = regexForSold.exec(str)) !== null) {
    obj["soldTo"] = m[1];
  }
  if ((m = regexForBLNumber.exec(str)) !== null) {
    obj["billNumber"] = m[1];
  }
  extractProductInfo.forEach((productData) => {
    const regexOfProduct = new RegExp(productData.textToMatch + "(s*(.*))+");
    if ((m = regexOfProduct.exec(str)) !== null) {
      const [quantity, price, total] = m[1]
        .replace(/\s+/g, " ")
        .trim()
        .split(" ");
      obj[productData.fieldName] = { price, quantity, total };
    }
  });
  return obj;
};

const extractJSONFromPdfTextArray = (textArray)=>{
  const overallExtractedJSON = textArray.reduce((obj ,cur) => {
    const curExtractedObj = extractJson(cur);
    return { ...obj, ...curExtractedObj };
  },{});
  return overallExtractedJSON;
}


// response.forEach((text) => {
//   const demoJSON = extractJSONFromPdfTextArray(text)
//   console.log(demoJSON)
// });
