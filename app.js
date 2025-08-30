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
const { populate } = require('dotenv');
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

app.post("/home",upload.single('file'),async(req,res,next)=>{
    try{
        let fileUrl=null;
        if (req.file && req.file.path) {
            let title = req.body.contributor.title || "file";
            title = title.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, ""); 
            const ext = path.extname(req.file.originalname);
            const publicId = `${title}_${Date.now()}${ext}`;
            console.log(publicId);
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "raw", 
                folder: "contributors",
                public_id:publicId,
                overwrite:true,
            });
            fileUrl=result.secure_url;
            req.flash('success', 'Thanks for your contribution 😊!! File uploaded successfully 🎉!!');
        } else {
            req.flash('error', 'File upload failed!');
        }
        const newContributor=new Contributor(req.body.contributor);
        newContributor.file=fileUrl;
        console.log(newContributor);
        if(newContributor.type==="Book"){
            console.log("Book");
            let oldBook=await Book.findOne({semester:newContributor.semester});
            if(oldBook===null){
                oldBook=new Book({
                    semester:newContributor.semester,
                });
            }
            const newUnit=new Unit({
                title:newContributor.title,
                file:newContributor.file,
                contributor:newContributor,
            });
            console.log(oldBook);
            oldBook.subjects.push(newUnit);
            newUnit.save();
            oldBook.save();
            console.log(oldBook);
            console.log(newUnit);
        }
        if(newContributor.type==="Practical"){
            console.log("Practical");
            let oldPractical=await Practical.findOne({semester:newContributor.semester});
            console.log(oldPractical);
            if(oldPractical===null){
                oldPractical=new Practical({
                    semester:newContributor.semester,
                });
            }
            const newUnit=new Unit({
                title:newContributor.title,
                file:newContributor.file,
                contributor:newContributor,
            });
            
            oldPractical.subjects.push(newUnit);
            newUnit.save();
            oldPractical.save();
            console.log(oldPractical);
            console.log(newUnit);
        }
        if(newContributor.type==="PYQ"){
            console.log("PYQ");
            let oldPyq=await Pyq.findOne({semester:newContributor.semester});
            if(oldPyq===null){
                oldPyq=new Pyq({
                    semester:newContributor.semester,
                });
            }
            const newUnit=new Unit({
                title:newContributor.title,
                file:newContributor.file,
                contributor:newContributor,
            });
            console.log(oldPyq);
            oldPyq.subjects.push(newUnit);
            newUnit.save();
            oldPyq.save();
            console.log(oldPyq);
            console.log(newUnit);
        }
        if(newContributor.type==="Note"){
            console.log("Note");
            let oldNote=await Note.findOne({semester:newContributor.semester});
            if(oldNote===null){
                oldNote=new Note({
                    semester:newContributor.semester,
                });
            }
            const newUnit=new Unit({
                title:newContributor.title,
                file:newContributor.file,
                contributor:newContributor,
            });
            console.log(oldNote);
            let semester;
            if(newContributor.semester==="SEM-1"){
                semester="SEM1";
            }
            if(newContributor.semester==="SEM-2"){
                semester="SEM2";
            }
            if(newContributor.semester==="SEM-3"){
                semester="SEM3";
            }
            if(newContributor.semester==="SEM-4"){
                semester="SEM4";
            }
            let oldSubject=await Subject.findOne({title:newContributor.subject});
            console.log("SUvject"+oldSubject);
            if(oldSubject===null){
                oldSubject=new Subject({
                    name:newContributor.subject,
                    title:newContributor.title,
                })
            }
            console.log(oldSubject);
            oldSubject.units.push(newUnit);
            newUnit.save();
            oldSubject.save();
            oldNote.subjects.push(oldSubject);
            oldNote.save();
            console.log(oldSubject);
            console.log(newUnit);
            console.log(oldNote);
        }
        await newContributor.save();
        res.redirect("/home");
    }
    catch (err) {
      return next(err);
    }
});



app.get("/notes",async(req,res)=>{
    const notes=await Note.find().populate({path:"subjects",populate:{path:"units",populate:{path:"contributor"}}});
    res.render("notes.ejs",{notes});
})
app.get("/books",async(req,res)=>{
    const books=await Book.find().populate({path:"subjects",populate:{path:"contributor"}});
    res.render("books.ejs",{books});
})
app.get("/practicals",async(req,res)=>{
    const practicals=await Practical.find().populate({path:"subjects",populate:{path:"contributor"}});
    res.render("practicals.ejs",{practicals})
})
app.get("/pyqs",async(req,res)=>{
    const pyqs=await Pyq.find().populate({path:"subjects",populate:{path:"contributor"}});
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
    req.flash('success','Review posted successfully 👍');
    res.redirect("/reviews");
})
app.get("/notes/subjects/:id",async(req,res)=>{
    const id=req.params.id;
    const subject=await Subject.findById(id).populate({path:"units",populate:{path:"contributor"}});
    res.render("subjects.ejs",{subject});
})
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE"||err.status===413) {
    req.flash("error", "❌ File too large! Maximum allowed size is 100MB.");
    return res.redirect("/home");
  }
  if (err.http_code === 413 || err.name === "UnexpectedResponse") {
    req.flash("error", "❌ File too large! Maximum allowed size is 100MB.");
    return res.redirect("/home");
  }

  if (err) {
    console.error("Multer error:", err);
    req.flash("error", `❌ Upload failed: ${err.message}`);
    return res.redirect("/home");
  }

  next();
});

app.listen(8080,()=>{
    console.log("listing  to port 8080");
});