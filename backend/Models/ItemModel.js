const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ItemSchema = mongoose.Schema(
    {
        Material: {
            type: String,
            required: true
        },
        Quantity: {
            type: Number,
            required: false
        },
        DeliveryID: {
            type: String,
            required: false
        },
        DocumentID: {
            type: String,
            required: false
        },
        TrackingNumber: {
            type: String,
            required: false
        },
        HWB: {
            type: String,
            required: false
        },
        ContractNumber: {
            type: String,
            required: false
        },
        PONR_LINE: {
            type: String,
            required: false
        },
        SONR: {
            type: String,
            required: false
        },
        InvoiceNr: {
            type: String,
            required: false
        },
        DespatchDate: {
            type: String,
            required: false
        },
        ArrivalDate: {
            type: String,
            required: false
        },
        IncoTerm: {
            type: String,
            required: false
        },
        DAPackages: {
            type: String,
            required: false
        },
        PackListNR: {
            type: String,
            required: false
        },
        TransportMode: {
            type: String,
            required: false
        },
        Carrier: {
            type: String,
            required: false
        },
        VanID: {
            type: String,
            required: false
        },
        ICR: {
            type: String,
            required: false
        },
        MessageDate: {
            type: String,
            required: false
        },
        LIG1: {
            type: String,
            required: false
        },
        CTR1: {
            type: String,
            required: false
        },
        FV1: {
            type: String,
            required: false
        },
        LIG2: {
            type: String,
            required: false
        },
        CTR2: {
            type: String,
            required: false
        },
        FV2: {
            type: String,
            required: false
        },
        LIG3: {
            type: String,
            required: false
        },
        CTR3: {
            type: String,
            required: false
        },
        FV3: {
            type: String,
            required: false
        },
        SupplierMaterial: {
            type: String,
            required: false
        },
        Weight: {
            type: String,
            required: false
        },
        KEY: {
            type: String,
            required: false
        },
        Line: {
            type: String,
            required: false
        },
        FileName: {
            type: String,
            required: false
        },
        Supplier: {
            type: String,
            required: false
        }
    }
) 

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item;