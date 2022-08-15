const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create
app.post('/test',(req,res)=>{
    console.log(req.body)
    const formData = req.body;
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData = JSON.parse(data);
        dbData.push(formData);
        let number = 1;
            dbData.forEach((note,index)=>{
                note.id = number;
                number++;
                return dbData;
            });
        stringData = JSON.stringify(dbData);
        fs.writeFile('db.json',stringData,(err,data)=>{
            if(err)throw err;
        });
    });



    res.send("Success!")
});
//read
app.get('/read',(req,res)=>{
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData = JSON.parse(data);
        stringData = JSON.stringify(dbData);
        res.send(stringData)
    })
})

//update
app.put('/update/:id',(req,res)=>{
    var id = req.params.id - 1;
    console.log(id)
    
    
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData = JSON.parse(data);
        var dataId = dbData[id]
        dataId.firstName=req.body.firstName
        dataId.lastName=req.body.lastName
        stringData = JSON.stringify(dbData)
        fs.writeFile('db.json',stringData,(err)=>{
            if(err)throw err
        })

    })
    res.send('Note Updated successfully')
})

//delete
app.delete('/delete/:id',(req,res)=>{
    var id = req.params.id - 1;

    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData = JSON.parse(data);
        var dataId = dbData[id];
        for(let i=0;i<dbData.length;i++){
            if(dbData[i].id===Number(dataId)){
                dbData.splice([i],1);
            }
        }
        stringData = JSON.stringify(dbData);
        fs.writeFile('db.json',stringData,(err)=>{
            if(err)throw err
        })
    })
    res.send(`Data ${id} successfully deleted`)
})

app.listen(PORT, ()=>{
    console.log(`Example app listen at http://localhost:${PORT}`)
})

