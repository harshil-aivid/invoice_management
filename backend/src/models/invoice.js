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
    }

});


const invoiceSchema = new mongoose.Schema({
    invoiceNo: {
        type: String,
        required: true,
        trim: true,

    },
    invoiceDate: {
        type: Date,
        required: true,
        trim: true
    },
    shipDate: {
        type: Date,
        trim: true
    },

    totalAmount: {
        type: Number,
        required: true,
        trim: true
    },
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
    fullText: {
        type: String,
        required: true,
    },
    soldTo: {
        type: String,
        trim: true
    },
    shipTo: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    shipVia: {
        type: String,
        trim: true
    },
    billNo: {
        type: Number,
        trim: true
    }
}, {
    timestamps: true
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice