const mongoose = require('mongoose')

const gasTypeSchema = mongoose.Schema({
    gasTypeName: {
        type: String,
        required: true,
        trim: true,
    },
    productCode: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },
    
    total: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },
    

});


const invoiceSchema = new mongoose.Schema({
    invoiceNo: {
        type: Number,
        required: true,
        trim: true,

    },
    invoiceDateTime: {
        type: Date,
        required: true,
        trim: true
    },
    invoiceDateObj: {
        type: Object,
        trim: true
    },
    dateTime: {
        type: Date,
        trim: true
    },
    
    dateObj: {
        type: Object,
        trim: true
    },
    profitCenter: {
        type: Number,
        
        
    },
    soldTo: {
        type: String,
        required: true,
        trim: true
    },
    shipVia: {
        type: String,
        
        trim: true
    },
    to: {
        type: String,
        
        trim: true
    },
    totalAmount: {
        type: Number,
        required: true,
        trim: true
    },
    accountNo: {
        type: Number,
        required: true,
        trim: true
    },
    billNo: {
        type: Number,
        required: true,
        trim: true
    },
  
    listOfPurchases :[gasTypeSchema],
    rawText: {
        type: String,
        
    },
   
}, {
    timestamps: true
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice


/*
  regularGas: {
        type: gasTypeSchema,
        required: true,
        default: {
            gasTypeName: "REG",
            quantity: 0,
            price: 0,
        }
    },
    superGas: {
        type: gasTypeSchema,
        required: true,
        default: {
            gasTypeName: "SUPER",
            quantity: 0,
            price: 0,
        }
    },
    plusGas: {
        type: gasTypeSchema,
        required: true,
        default: {
            gasTypeName: "PLUS",
            quantity: 0,
            price: 0,
        }
    },
    dieselGas: {
        type: gasTypeSchema,
        required: true,
        default: {
            gasTypeName: "DIESEL",
            quantity: 0,
            price: 0,
        }
    },
 */