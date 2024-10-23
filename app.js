const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const sampleListings = require('./init/data.js');

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(() => {
    console.log("conneted to DB")
})
.catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
    
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req , res) =>{
    res.send("Hi I am root");
});

// Route to render the listings

// Indexn Route
app.get("/listings", async (req , res) =>{
const allListings = await Listing.find({});
res.render("listings/index.ejs",{allListings});
});
// new Route
app.get("/listings/new",(req, res) =>{
    res.render("listings/new");
});

// Show Route
app.get("/listings/:id", async(req,res) =>{
    let {id} = req.params;
    const listing = await  Listing.findById(id);
    res.render("listings/show.ejs", {listing});
    
})
// create Route
app.post("/listings", async(req, res) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// edit route
app.get("/listings/:id/edit",async (req, res) =>{
    let {id} = req.params;
    const listing = await  Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
// update rote
app.put("/listing/:id", async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})
// delete Route
app.delete("/listings/:id",async (req , res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})



// app.get("/testListing",async (req , res) =>{
//    let sampleListing = new Listing({
//     title: "My new Villa",
//     description: "by beach",
//     price:1200,
//     location:"calangute ,Goa",
//     country:"India",
//    });
    
//    await sampleListing.save();
//    console.log("Sample was Saved");
//    res.send("sucesfull testing");
// });


app.listen(8080, () =>{
    console.log("Server is listning to port 8080");
});