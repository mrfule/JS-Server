const express =require('express');
const app=express();
const mysql =require('mysql');
const bodyParser =require('body-parser');
const Cors = require('cors');

const db =mysql.createPool({
    host:"localhost",
    user :"root",
    password :"root",
    database :"test",
});


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(Cors())


app.get("/api/get" , (req , res) =>{
    const sql="select * from pizza"
    db.query(sql, (err,result) =>{
       res.send(result);
    });
});

app.get("/api/get/address" , (req , res) =>{
    const sql="select * from address"
    db.query(sql, (err,result) =>{
       res.send(result);
    })
})

app.get("/api/total" , (req , res) =>{
    const sql="select sum(price) summ from pizza;";
    db.query(sql, (err,result) =>{
        console.log(result);
        res.send(result);
    })
})

app.delete('/api/delete/:name' , (req,res) => {
    const name=req.params.name;

    const sqlDelete = "delete from pizza where name= ?";

    db.query(sqlDelete , name ,(err,result) =>{
        console.log(err);
    })

})

app.put('/api/update' , (req,res) => {
    const name=req.body.Name;
    const price=req.body.price;
    const sqlInsert = "update pizza set price = ? where name= ?";

    db.query(sqlInsert , [price ,name] ,(err,result) =>{
        console.log(price);
    })

})

app.post("/api/insert" , (req, res) => {

    const name =req.body.Name
    const desc =req.body.Desc
    const type =req.body.Type
    const price=req.body.Price

    const sqlInsert = "INSERT INTO pizza (name , pdesc , ptype ,price) VALUES (? , ? , ? ,?);"
    db.query(sqlInsert ,[name , desc, type , price] ,(err , result) =>{
            console.log(result);
    });
});

app.post("/api/insert/Address" ,(req , res) =>{
    const name = req.body.Name;
    const address = req.body.Address;
    const number = req.body.Number;

    const sqlInsert = "INSERT INTO address (name , address, number ) VALUES (? , ? , ? );"
    db.query(sqlInsert , [name , address , number] ,(err , result) =>{
            console.log(result);
    });


})

app.get("/",(req,res) =>{
    console.log('on web');
    res.send("reading");
});


app.listen(3001 , () => {
    console.log('listning');
});



// "start": "node index.js",
// "dev start" : "nodemon index.js"