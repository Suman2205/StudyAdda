const mongoose=require('mongoose');
const Unit=require('../models/units');
const Subject = require('../models/subjects');
const Note = require('../models/notes');
const unitData=require('./unitData');
const Book = require('../models/books');
const Practical = require('../models/practicals');
const Pyq = require('../models/pyqs');
main().then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/studyadda");
}

const initUnit=async()=>{
    const existing = await Unit.findOne();   // Check if any unit already exists
    if (!existing) {
        await Unit.insertMany(unitData.unitData);  // Only insert if none exist
        console.log("Units seeded successfully");
    } else {
        console.log("Units already exist. Skipping...");
    }
}

const initScpSubject=async()=>{
    const SCP=new Subject({
        name:"Semiconductor Physics",
        parent:"SEM1",
    })
    const units=await Unit.find({parent:"SCP"});
    await Subject.insertOne(SCP);
    SCP.units=units;
    SCP.save();
}

const initBeeSubject=async()=>{
    const BEE=new Subject({
        name:"Basic Electrical Engineering",
        parent:"SEM1",
    })
    const units=await Unit.find({parent:"BEE"});
    await Subject.insertOne(BEE);
    BEE.units=units;
    BEE.save();
}


const initUhvSubject=async()=>{
    const UHV=new Subject({
        name:"Universal Human Values and Ethics",
        parent:"SEM1",
    })
    const units=await Unit.find({parent:"UHV"});
    await Subject.insertOne(UHV);
    UHV.units=units;
    UHV.save();
}




const initPpsSubject=async()=>{
    const PPS=new Subject({
        name:"Programming for Problem Solving",
        parent:"SEM2",
    })
    const units=await Unit.find({parent:"PPS"});
    await Subject.insertOne(PPS);
    PPS.units=units;
    PPS.save();
}


const initChemSubject=async()=>{
    const CHEM=new Subject({
        name:"Chemistry",
        parent:"SEM2",
    })
    const units=await Unit.find({parent:"CHEM"});
    await Subject.insertOne(CHEM);
    CHEM.units=units;
    CHEM.save();
}

const initBioSubject=async()=>{
    const BIO=new Subject({
        name:"Biology",
        parent:"SEM2",
    })
    const units=await Unit.find({parent:"BIO"});
    await Subject.insertOne(BIO);
    BIO.units=units;
    BIO.save();
}

const initEngSubject=async()=>{
    const ENG=new Subject({
        name:"Technical Writing for English",
        parent:"SEM2",
    })
    const units=await Unit.find({parent:"ENG"});
    await Subject.insertOne(ENG);
    ENG.units=units;
    ENG.save();
}

const initMathSubject=async()=>{
    const MATH=new Subject({
        name:"Mathematics-II",
        parent:"SEM2",
    })
    const units=await Unit.find({parent:"MATH"});
    await Subject.insertOne(MATH);
    MATH.units=units;
    MATH.save();
}

const initOopsSubject=async()=>{
    const OOPS=new Subject({
        name:"Object Oriented Programming",
        parent:"SEM3",
    })
    const units=await Unit.find({parent:"OOPS"});
    await Subject.insertOne(OOPS);
    OOPS.units=units;
    OOPS.save();
}

const initDsaSubject=async()=>{
    const DSA=new Subject({
        name:"Data Structures and Algorithms",
        parent:"SEM3",
    })
    const units=await Unit.find({parent:"DSA"});
    await Subject.insertOne(DSA);
    DSA.units=units;
    DSA.save();
}

const initCoaSubject=async()=>{
    const COA=new Subject({
        name:"Computer Organization and Architecture",
        parent:"SEM3",
    })
    const units=await Unit.find({parent:"COA"});
    await Subject.insertOne(COA);
    COA.units=units;
    COA.save();
}

const initItSubject=async()=>{
    const IT=new Subject({
        name:"IT(Python)",
        parent:"SEM3",
    })
    const units=await Unit.find({parent:"IT"});
    await Subject.insertOne(IT);
    IT.units=units;
    IT.save();
}

const initPsSubject=async()=>{
    const PS=new Subject({
        name:"Probability and Statistics",
        parent:"SEM3",
    })
    const units=await Unit.find({parent:"PS"});
    await Subject.insertOne(PS);
    PS.units=units;
    PS.save();
}

const initObSubject=async()=>{
    const OB=new Subject({
        name:"Organizational Behavior",
        parent:"SEM3",
    })
    const units=await Unit.find({parent:"OB"});
    await Subject.insertOne(OB);
    OB.units=units;
    OB.save();
}



const initDaaSubject=async()=>{
    const DAA=new Subject({
        name:"Design and Analysis of Algorithms",
        parent:"SEM4",
    })
    const units=await Unit.find({parent:"DAA"});
    await Subject.insertOne(DAA);
    DAA.units=units;
    DAA.save();
}


const initApSubject=async()=>{
    const AP=new Subject({
        name:"Advance Programming(Java)",
        parent:"SEM4",
    })
    const units=await Unit.find({parent:"AP"});
    await Subject.insertOne(AP);
    AP.units=units;
    AP.save();
}

const initDeSubject=async()=>{
    const DE=new Subject({
        name:"Digital Electronics",
        parent:"SEM4",
    })
    const units=await Unit.find({parent:"DE"});
    await Subject.insertOne(DE);
    DE.units=units;
    DE.save();
}

const initIprSubject=async()=>{
    const IPR=new Subject({
        name:"Intellectual Property Rights & Regulatory",
        parent:"SEM4",
    })
    const units=await Unit.find({parent:"IPR"});
    await Subject.insertOne(IPR);
    IPR.units=units;
    IPR.save();
}

const initPplSubject=async()=>{
    const PPL=new Subject({
        name:"Principle of Programming Languages",
        parent:"SEM4",
    })
    const units=await Unit.find({parent:"PPL"});
    await Subject.insertOne(PPL);
    PPL.units=units;
    PPL.save();
}

const initEvsSubject=async()=>{
    const EVS=new Subject({
        name:"Environmental Studies",
        parent:"SEM4",
    })
    const units=await Unit.find({parent:"EVS"});
    await Subject.insertOne(EVS);
    EVS.units=units;
    EVS.save();
}

const initSEM1=async()=>{
    const SEM1=new Note({
        semester:"SEM-1",
    });
    const subjects=await Subject.find({parent:"SEM1"});
    await Note.insertOne(SEM1);
    SEM1.subjects=subjects;
    SEM1.save();
}


const initSEM2=async()=>{
    const SEM2=new Note({
        semester:"SEM-2",
    });
    const subjects=await Subject.find({parent:"SEM2"});
    await Note.insertOne(SEM2);
    SEM2.subjects=subjects;
    SEM2.save();
}

const initSEM3=async()=>{
    const SEM3=new Note({
        semester:"SEM-3",
    });
    const subjects=await Subject.find({parent:"SEM3"});
    await Note.insertOne(SEM3);
    SEM3.subjects=subjects;
    SEM3.save();
}

const initSEM4=async()=>{
    const SEM4=new Note({
        semester:"SEM-4",
    });
    const subjects=await Subject.find({parent:"SEM4"});
    await Note.insertOne(SEM4);
    SEM4.subjects=subjects;
    SEM4.save();
}


const initSem1Book=async()=>{
    const Sem1Book=new Book({
        semester:"SEM-1",
    });
    const subjects=await Unit.find({parent:"SEM1"});
    await Book.insertOne(Sem1Book);
    Sem1Book.subjects=subjects;
    Sem1Book.save();
}
const initSem2Book=async()=>{
    const Sem2Book=new Book({
        semester:"SEM-2",
    });
    const subjects=await Unit.find({parent:"SEM2"});
    await Book.insertOne(Sem2Book);
    Sem2Book.subjects=subjects;
    Sem2Book.save();
}
const initSem3Book=async()=>{
    const Sem3Book=new Book({
        semester:"SEM-3",
    });
    const subjects=await Unit.find({parent:"SEM3"});
    await Book.insertOne(Sem3Book);
    Sem3Book.subjects=subjects;
    Sem3Book.save();
}
const initSem4Book=async()=>{
    const Sem4Book=new Book({
        semester:"SEM-4",
    });
    const subjects=await Unit.find({parent:"SEM4"});
    await Book.insertOne(Sem4Book);
    Sem4Book.subjects=subjects;
    Sem4Book.save();
}


const initSem2Practical=async()=>{
    const Sem2Practical=new Practical({
        semester:"SEM-2",
    });
    const subjects=await Unit.find({parent:"SEM2P"});
    await Practical.insertOne(Sem2Practical);
    Sem2Practical.subjects=subjects;
    Sem2Practical.save();
}
const initSem3Practical=async()=>{
    const Sem3Practical=new Practical({
        semester:"SEM-3",
    });
    const subjects=await Unit.find({parent:"SEM3P"});
    await Practical.insertOne(Sem3Practical);
    Sem3Practical.subjects=subjects;
    Sem3Practical.save();
}
const initSem4Practical=async()=>{
    const Sem4Practical=new Practical({
        semester:"SEM-4",
    });
    const subjects=await Unit.find({parent:"SEM4P"});
    await Practical.insertOne(Sem4Practical);
    Sem4Practical.subjects=subjects;
    Sem4Practical.save();
}


const initSem1Pyq=async()=>{
    const Sem1Pyq=new Pyq({
        semester:"SEM-1",
    });
    const subjects=await Unit.find({parent:"SEM1Q"});
    await Pyq.insertOne(Sem1Pyq);
    Sem1Pyq.subjects=subjects;
    Sem1Pyq.save();
}

const initSem2Pyq=async()=>{
    const Sem2Pyq=new Pyq({
        semester:"SEM-2",
    });
    const subjects=await Unit.find({parent:"SEM2Q"});
    await Pyq.insertOne(Sem2Pyq);
    Sem2Pyq.subjects=subjects;
    Sem2Pyq.save();
}

const initSem3Pyq=async()=>{
    const Sem3Pyq=new Pyq({
        semester:"SEM-3",
    });
    const subjects=await Unit.find({parent:"SEM3Q"});
    await Pyq.insertOne(Sem3Pyq);
    Sem3Pyq.subjects=subjects;
    Sem3Pyq.save();
}

const initSem4Pyq=async()=>{
    const Sem4Pyq=new Pyq({
        semester:"SEM-4",
    });
    const subjects=await Unit.find({parent:"SEM4Q"});
    await Pyq.insertOne(Sem4Pyq);
    Sem4Pyq.subjects=subjects;
    Sem4Pyq.save();
}


initUnit()
    .then(()=>initScpSubject())
    .then(()=>initBeeSubject())
    .then(()=>initUhvSubject())
    .then(()=>initPpsSubject())
    .then(()=>initChemSubject())
    .then(()=>initBioSubject())
    .then(()=>initEngSubject())
    .then(()=>initMathSubject())
    .then(()=>initOopsSubject())
    .then(()=>initDsaSubject())
    .then(()=>initCoaSubject())
    .then(()=>initItSubject())
    .then(()=>initObSubject())
    .then(()=>initPsSubject())
    .then(()=>initDaaSubject())
    .then(()=>initApSubject())
    .then(()=>initDeSubject())
    .then(()=>initIprSubject())
    .then(()=>initPplSubject())
    .then(()=>initEvsSubject())
    .then(()=>initSEM1())
    .then(()=>initSEM2())
    .then(()=>initSEM3())
    .then(()=>initSEM4())
    .then(()=>initSem1Book())
    .then(()=>initSem2Book())
    .then(()=>initSem3Book())
    .then(()=>initSem4Book())
    .then(()=>initSem2Practical())
    .then(()=>initSem3Practical())
    .then(()=>initSem4Practical())
    .then(()=>initSem1Pyq())
    .then(()=>initSem2Pyq())
    .then(()=>initSem3Pyq())
    .then(()=>initSem4Pyq())
    .then(()=>console.log("successful"));