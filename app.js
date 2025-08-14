if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
// app.use(methodOverride("_method"));
const ejsMate=require("ejs-mate");
const Note = require('./models/notes');
const Subject=require('./models/subjects');
const Unit=require('./models/units');
const Book = require('./models/books');
const Practical = require('./models/practicals');
const Pyq = require('./models/pyqs');
const Review = require('./models/reviews');
const session=require('express-session');
const multer  = require('multer');
const cloudinary=require('cloudinary');
const { env } = require('process');
const {storage}=require('./cloudconfig');
const upload = multer({storage})
const flash=require('connect-flash');
const Contributor = require('./models/contributor');
const dbUrl=process.env.ATLASDB_URL;
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

app.use(session({
    secret: 'studyadda-secret',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
main().then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dbUrl);
}

app.get("/",(req,res)=>{
    res.render("home.ejs");
})
app.get("/home",async(req,res)=>{
    res.render("home.ejs");
})

app.post("/home",upload.single('file'),async(req,res)=>{
    if (req.file && req.file.path) {
        req.flash('success', 'File uploaded successfully!');
    } else {
        req.flash('error', 'File upload failed!');
    }
    const newContributor=new Contributor(req.body.contributor);
    newContributor.file=req.file.path;
    await newContributor.save();
    res.redirect("/home");
})

app.get("/notes",async(req,res)=>{
    const notes=await Note.find().populate({path:"subjects",populate:{path:"units"}});
    res.render("notes.ejs",{notes});
})
app.get("/books",async(req,res)=>{
    const books=await Book.find().populate({path:"subjects"});
    res.render("books.ejs",{books});
})
app.get("/practicals",async(req,res)=>{
    const practicals=await Practical.find().populate({path:"subjects"});
    res.render("practicals.ejs",{practicals})
})
app.get("/pyqs",async(req,res)=>{
    const pyqs=await Pyq.find().populate({path:"subjects"});
    res.render("pyqs.ejs",{pyqs});
})
app.get("/reviews",async(req,res)=>{
    const reviews=await Review.find();
    res.render("reviews.ejs",{reviews});
})
app.post("/reviews",async(req,res)=>{
    let newReview=new Review(req.body.review);
    Review.insertOne(newReview); 
    console.log("new review saved");
    req.flash('success','Review posted successfully');
    res.redirect("/reviews");
})
app.get("/notes/subjects/:id",async(req,res)=>{
    const id=req.params.id;
    const subject=await Subject.findById(id).populate({path:"units"});
    res.render("subjects.ejs",{subject});
})
app.listen(8080,()=>{
    console.log("listing  to port 8080");
});