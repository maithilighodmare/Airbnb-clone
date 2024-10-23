const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String, 
    set: (v) => 
      v === "" 
    ? "https://www.istockphoto.com/photo/hawaiian-sunset-with-sailboat-and-mountains-gm1359349136-432722863"
     : v,

  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
