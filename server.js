const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const bodyParser = require('body-parser');
const assert = require('assert');

const app = express();

app.use(bodyParser.json())

const mongo_url = 'mongodb://localhost:27017'
const dataBase = "first-api"

MongoClient.connect(mongo_url, (err, client)=>{
    assert.equal(err, null, 'dataBase connexion failed')
    const db= client.db(dataBase)

app.post("/new_contact", (req,res)=>{
    let newContact = req.body
    db.collection("contacts").insertOne(newContact, (err, data)=>{
        if(err) res.send("can't add contact")
        else res.send("contact aded")
    })
})

app.get('/contacts', (req,res)=>{
    db.collection('contacts').find().toArray((err, data)=>{
        if(err) res.send("cant fetch contacts")
        else res.send(data)
    })
})

app.get('/contact/:id', (req,res)=>{
    let serchedContactId = ObjectID(req.params.id)
    db.collection('contacts').findOne({_id: serchedContactId},(err, data)=>{
        if(err) res.send('cant fetch contact')
        else res.send(data)
    })
})

app.put('/modify_contact/:id', (req,res)=>{
    let id = ObjectID(req.params.id)
    let modifiedContact = req.body
    db.collection('contacts').findOneAndUpdate({_id: id}, {...modifiedContact}, (err,data)=>{
        if (err) res.send('cant modify contact')
        else res.send(data)
    })
})

app.delete('/delete_contact/:id', (req,res)=>{
    let contactToRemove = ObjectID(req.params.id)
    db.collection('contacts').findOneAndDelete({_id: contactToRemove}, (err,data)=>{
        if(err) res.send('cant delete the contact')
        else res.send('contact was deleted')
    })
})




})

















// var tab = [{
//     name: "contact1",
//     phone_number: 21145265,
//     email: "seifGuirat@gmail.com"
// },
// {
//     name: "contact2",
//     phone_number: 24145265,
//     email: "sabrineGuirat@gmail.com"
// },
// {
//     name: "contact3",
//     phone_number: 22145265,
//     email: "mahaGuirat@gmail.com"
// }
// ]

// console.log("initial tab value", tab)

//add new contact in tab using post
// app.post('/add_contact', (req, res) => {
//     let newContact = req.body
//     tab.push(newContact)
//     res.send(tab)
//     console.log("new tab value", tab)

// })
// // modify contact in tab with put
// app.put('/modify_Contact', (req, res) => {
//     let modifyContact = req.body
//     tab = tab.map(e => e.name === modifyContact.name ? e = modifyContact : e)
//     res.send(tab)
// })

// // delete contact
// app.delete('/delete_contact/:name', (req, res) => {
//     let deleteContact = req.params.name
//     tab = tab.filter(e => e.name !== deleteContact)
//     res.send(tab)
// })




// app.get('/contacts', (req, res) => {
//     res.send(tab)
// })

// app.get('/contacts', (req, res) => {
//     res.send(tab)
// })

// app.get('/contacts/:name', (req, res) => {
//     let contactName = req.params.name
//     let contactToFetch = tab.filter(e => e.name === contactName)
//     res.send(contactToFetch)
// })






app.listen(3000, (err) => {
    if (err) console.log('server err')
    else console.log('server is running on port 3000')
})