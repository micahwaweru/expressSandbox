const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/test',(req,res)=>{
    console.log(req.body)
    const formData = req.body;
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData = JSON.parse(data);
        dbData.push(formData);
        stringData = JSON.stringify(dbData);
        fs.writeFile('db.json',stringData,(err,data)=>{
            if(err)throw err;
        });
    });



    res.send("Success!")
});

app.get('/read',(req,res)=>{
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData = JSON.parse(data);
        stringData = JSON.stringify(dbData);
        res.send(stringData)
    })
})

app.listen(PORT, ()=>{
    console.log(`Example app listen at http://localhost:${PORT}`)
})