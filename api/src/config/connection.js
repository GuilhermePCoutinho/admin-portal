const mongoose = require('mongoose');

class Database {
    constructor(){
        this.mongoDataBase();
    }

    mongoDataBase(){
        this.mongoDBConnection = mongoose.connect('mongodb+srv://admin-portal:140414kaio@cluster0.caeiu.mongodb.net/admin-portal?retryWrites=true&w=majority', {
        // this.conection = mongoose.connect('mongodb://localhost/teste1', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conexão realizada com sucesso");
        }).catch((error)=>{
            console.log(`Error: ${error}`);
        })
    }

}

module.exports = new Database();