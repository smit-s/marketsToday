
      
const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/index', {useUnifiedTopology: true , useNewUrlParser: true })
    .then(() => { console.log('connected') }).catch(() => { return new Error("Coonection failed: ") });

const indexSchema = new mongoose.Schema({
}, { collection: 'nifty' });
const nfty = mongoose.model('nifty', indexSchema);

async function x(){
    let bb=await nfty.find({name:"ss"});
    
    const ob=JSON.parse(bb[0]);
     console.log(ob)
        
    j["index_name"]="aa";
     console.log(j);
     }
x()
