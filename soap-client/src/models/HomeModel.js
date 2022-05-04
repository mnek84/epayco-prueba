const {Schema, model} = require("mongoose");
import paginate from 'mongoose-paginate-v2'

var HomeSchema = new Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    type: {type: String, required: true,index:true},
    status: {type: String, required: true},
    order: {type: Number, required: true},
    available: {type: [], required: true},
    series: {type: [Map], required: true},
    advertise: {type: Map, required: true},
    master: {type: Map},
    kids: {type: String},
    featured: {type: [Map]},
    podcasts: {type: Map},
    content: {type: Map},
    launching_type: {type: String, required: true},
}, {timestamps: true});

HomeSchema.index({ available: 1, status: -1 }); //
HomeSchema.index({ status: -1 }); //

HomeSchema.plugin(paginate);

export default model("home_collection", HomeSchema,"home_collection");
