
const { Client, LocalAuth } = require("whatsapp-web.js");
require ('dotenv').config()
const express = require("express")
const app=express()
const mongoose=require('mongoose')
const database = require('./readDatabase')

console.log("Connection to Whatsapp Web Client");

const country_code = "521";
const number = "7774483560" ;
const msg = "feliz cumpleaños! "

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db= mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))

app.use(express.json())

const friendsRouter = require('./routes/friends');
const readDatabase = require("./readDatabase");
app.use('/friends', friendsRouter)


app.listen(3200,()=> console.log('Server Started 3200'))

const client = new Client({
    puppeteer: {
        executablePath: '/usr/bin/brave-browser-stable',
    },
    authStrategy: new LocalAuth({
        clientId: "client-one"
    }),
    puppeteer: {
        headless: false,
    }
});

client.initialize();

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
    console.log('WHATSAPP WEB => Authenticated');
});

client.on("ready", async () => {
    console.log("WHATSAPP WEB => Ready");
    //let chatId = country_code + number + "@c.us";

   /* client.sendMessage(chatId, msg)
                            .then(response =>{
                                if(response.id.formMe){
                               console.log('El mensaje fue enviado ')
                               } 
                                                     })*/
});


database.catch(console.error).then(value => {
	client.on('ready', () => {
    console.log('Client is ready!');
		value.forEach(birthFriend => {
			console.log(birthFriend.name + " " + birthFriend.phone);
			const number = "521" + birthFriend.phone;
			//console.log(number)
			const chatId = number + "@c.us";
			client.sendMessage(chatId, 'Feliz cumpleaños ' + birthFriend.name + '!');
		});
	});
});



