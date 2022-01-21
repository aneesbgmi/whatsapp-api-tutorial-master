const { Client, MessageMedia } = require('whatsapp-web.js');
const express = require('express');
const { body, validationResult } = require('express-validator');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const fs = require('fs');
const { phoneNumberFormatter } = require('./helpers/formatter');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const mime = require('mime-types');
const { Buttons, List } = require('whatsapp-web.js');
const { getgroups } = require('process');


const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(fileUpload({
  debug: true
}));

const SESSION_FILE_PATH = './whatsapp-session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname
  });
});

const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ],
  },
  session: sessionCfg
});
///--------------------------------------------------------------------------------------------///


client.on('message', message => {
	if(message.body === 'Hi'|| message.body === 'hi'|| message.body === 'hlo'|| message.body === 'Hlo'|| message.body === 'hai'|| message.body === 'Hai') {
		client.sendMessage(message.from, '🤖Bot is currently in Beta stage some note will not be available right now we will be adding soon Feel free to Report Bug using *!Bug* Thanks❤️');

     client.sendMessage(message.from, new List('Select option From the List', 'View Menu', [{title: 'Main Menu', rows: [{id: 'studymaterials', title: 'Study Material'}, {id: 'Request Materials', title: 'Request Study Materials'},{id: 'tt', title: 'Time Table'},{id: 'sbte update', title: 'Subscribe For SBTE Notification'},{id: 'whoiami', title: 'About me'}]}] ,'Hi There👋 \n Iam a programmed For Assist you For Finding Study Materials', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  
      }
      switch(message.body){
        
        case 'Study Material'://client.sendMessage(message.from,'Study Material 📚');
        client.sendMessage(message.from, new List('Select option From the List', 'View Department',[{title: 'Select Deaprtment', rows: [{id: 's1', title: 'S1'},{id: 's2', title: 'S2'},{id: 'mech', title: 'Mechanical'},{id: 'auto', title: 'Automobile'},{id: 'Electric', title: 'Electrical'},{id: 'Electronic', title: 'Electronics'},{id: 'civil', title: 'Civil'},{id: 'Computer', title: 'Computer'}]}] ,'Select Your Department', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
        
          break;
        
        case 'Subscribe For SBTE Notification':client.sendMessage(message.from,'```soon !```');
        
        break;

        case 'About me':client.sendMessage(message.from,'```Hi👋  ``` \n```iam a Programmed Bot Developed Anees Muhammad \nhttps://wa.me/qr/56W3SFH6URSYC1 ```');
        
        break;  
        case 'Time Table':client.sendMessage(message.from,'```You Can Directly📥Download TimeTable From This Link🔗```\n\n https://bit.ly/34XZAp6');
      
      }
    
  
    

//====================subject name and semester=================================//

   

      if(message.body=='S1'){
      client.sendMessage(message.from, new List('Select Subject', 'S1 Subjects',[{title: 'Select Subject', rows: [{id: 'English', title: 'English-1'},{id: 'Physics', title: 'Physics-1'},{id: 'Chemistry', title: 'Chemistry-1'},{id: 'maths', title: 'Maths-1'}]}] ,'S1 Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
      }




      if(message.body=='S2'){
 client.sendMessage(message.from, new List('Select Subject', 'S2 Subjects',[{title: 'Select Subject', rows: [{id: 'English', title: 'English-2'},{id: 'Physics', title: 'Physics-2'},{id: 'Chemistry', title: 'Chemistry-2'},{id: 'maths', title: 'Maths-2'}]}] ,'S2 Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  }
 


 

if (message.body=='Mechanical'){

  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'ME-S2'},{id: 's3', title: 'ME-S3'},{id: 's4', title: 'ME-S4'},{id: 's5', title: 'ME-S5 '},{id: 's5', title: 'ME-S6'}]}] ,'Mechanical Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
      
}
else if(message.body=='Automobile')
{
  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'AU-S2'},{id: 's3', title: 'AU-S3'},{id: 's4', title: 'AU-S4'},{id: 's5', title: 'AU-S5'},{id: 's6', title: 'AU-S6'}]}] ,' 	Automobile Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  } 
  else if(message.body=='Electrical')
{
  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'EEE-S2'},{id: 's3', title: 'EEE-S3'},{id: 's4', title: 'EEE-S4'},{id: 's5', title: 'EEE-S5'},{id: 's5', title: 'EEE-S6'}]}] ,'Electrical & Electronics Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  } 
  else if(message.body=='Electronics')
{
  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'EC-S2'},{id: 's3', title: 'EC-S3'},{id: 's4', title: 'EC-S4'},{id: 's5', title: 'EC-S5'},{id: 's5', title: 'EC-S6'}]}] ,'Electronics and Communication', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  } 
  else if(message.body=='Civil')
{
  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'CE-S2'},{id: 'CE-S3', title: 'CE-S3'},{id: 'CE-S4', title: 'CE-S4'},{id: '5', title: 'CE-S5'},{id: 's5', title: 'CE-S6'}]}] ,' 	Civil Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  } 
  else if(message.body=='Computer')
  {
    client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'CT-S2'},{id: 's3', title: 'CT-S3'},{id: 's4', title: 'CT-S4'},{id: 's5', title: 'CT-S5'},{id: 's6', title: 'CT-S6'}]}] ,'SemComputer Computer Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    }




//--------------------request section------------------------



  if(message.body=='Request Study Materials'){
    message.reply('You Can Request any File In Following Following Formate👇\n*#request Department Sem Subject Name(description)* \n\n ```Eg: #request Mech S4 Thermal(shortnote)```' )

  }
else if(message.body.startsWith("!Bug")){
        message.reply('Bug Report Sucesss') 
        client.sendMessage("447418329123@c.us",message.body);
      }


      if(message.body.startsWith("#request")){
        message.reply('request has been Forwarded to admin')
        
        client.sendMessage("447418329123@c.us",message.body);
      }
	    
    });
//------------------------s1--------------------------------


client.on('message', async (msg)  => {
  if (msg.body == 'English-1') {

    const media = MessageMedia.fromFilePath('note/s1/s1 english/ENGLISH TEXT BOOK.pdf');
    msg.reply(media,'')
  
  }

  if (msg.body == 'Physics-1') {

    const media1 = MessageMedia.fromFilePath('note/s1/s1 physics/Physics note 1st sem.pdf');
    const media2 = MessageMedia.fromFilePath('note/s1/s1 physics/UNIT 2 .pdf');
    const media3 = MessageMedia.fromFilePath('note/s1/s1 physics/UNIT 3.pdf');
    const media4 = MessageMedia.fromFilePath('note/s1/s1 physics/UNIT 4.pdf');
    const media5 = MessageMedia.fromFilePath('note/s1/s1 physics/UNIT 5.pdf');
    const media6 = MessageMedia.fromFilePath('note/s1/s1 physics/UNIT 6.pdf');
    const media7 = MessageMedia.fromFilePath('note/s1/s1 physics/UNIT 7.pdf');
    msg.reply(media1,'');msg.reply(media2,'');msg.reply(media3,'');
    msg.reply(media4,'');msg.reply(media5,'');msg.reply(media6,'');
    msg.reply(media7,'');
  
  }

  if (msg.body == 'Chemistry-1') {

    const media1 = MessageMedia.fromFilePath('note/s1/s1 chemi/CHEMISTRY TEXT BOOK.pdf');
    const media2 = MessageMedia.fromFilePath('note/s1/s1 chemi/FIRST SEM CHEMISTRY NOTE-1.pdf');
    const media3 = MessageMedia.fromFilePath('note/s1/s1 chemi/first semester chemistry.pdf');
    msg.reply(media1,'');msg.reply(media2,'');msg.reply(media3,'');
   
  }

  if (msg.body == 'Maths-1') {

    const media1 = MessageMedia.fromFilePath('note/s1/s1 maths/Differentiation.pdf');
    const media2 = MessageMedia.fromFilePath('note/s1/s1 maths/Limits.pdf');
    const media3 = MessageMedia.fromFilePath('note/s1/s1 maths/MATHS TEXT BOOK-1.pdf');
    const media4 = MessageMedia.fromFilePath('note/s1/s1 maths/Trigonometry 2.pdf');
    msg.reply(media1,'');msg.reply(media2,'');msg.reply(media3,'');msg.reply(media4,'');
   
  }

//------------------------s2--------------------------------

if (msg.body == 'Physics-2') {

  const media1 = MessageMedia.fromFilePath('note/s2/physics/CIRCULAR MOTION.pdf');
    const media2 = MessageMedia.fromFilePath('note/s2/physics/Physics 2 full note.pdf');
    const media3 = MessageMedia.fromFilePath('note/s2/physics/PHYSICS NOTES.pdf');
    const media4 = MessageMedia.fromFilePath('note/s2/physics/ROTATIONAL DYNAMICS.pdf');
    
    msg.reply(media1,'');msg.reply(media2,'');msg.reply(media3,'');
    msg.reply(media4,'');

}


if (msg.body == 'Chemistry-1') {

  const media1 = MessageMedia.fromFilePath('note/s2/chemistry/ATOMIC STRUCTURE & CHEMICAL BONDING.pdf');
  const media2 = MessageMedia.fromFilePath('note/s2/chemistry/CHEMISTRY - Some important Questions & Answers-1.pdf');
  msg.reply(media1,'');msg.reply(media2,'');
 
}

if (msg.body == 'Maths-2') {

  const media1 = MessageMedia.fromFilePath('note/s2/maths/MATHS2 Note1.pdf');
  const media2 = MessageMedia.fromFilePath('note/s2/maths/MATHS2 Note2.pdf');
  
  msg.reply(media1,'');msg.reply(media2,'');
 
}

//------------------------ct s2 --------------------------------



    
    })





    

    
































///--------------------------------------------------------------------------------------------///
client.initialize();

// Socket IO
io.on('connection', function(socket) {
  socket.emit('message', 'Connecting...');

  client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url);
      socket.emit('message', 'QR Code received, scan please!');
    });
  });

  client.on('ready', () => {
    socket.emit('ready', 'Whatsapp is ready!');
    socket.emit('message', 'Whatsapp is ready!');
  });

  client.on('authenticated', (session) => {
    socket.emit('authenticated', 'Whatsapp is authenticated!');
    socket.emit('message', 'Whatsapp is authenticated!');
    console.log('AUTHENTICATED', session);
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
      if (err) {
        console.error(err);
      }
    });
  });

  client.on('auth_failure', function(session) {
    socket.emit('message', 'Auth failure, restarting...');
  });

  client.on('disconnected', (reason) => {
    socket.emit('message', 'Whatsapp is disconnected!');
    fs.unlinkSync(SESSION_FILE_PATH, function(err) {
        if(err) return console.log(err);
        console.log('Session file deleted!');
    });
    client.destroy();
    client.initialize();
  });
});


const checkRegisteredNumber = async function(number) {
  const isRegistered = await client.isRegisteredUser(number);
  return isRegistered;
}

// Send message
app.post('/send-message', [
  body('number').notEmpty(),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = phoneNumberFormatter(req.body.number);
  const message = req.body.message;

  const isRegisteredNumber = await checkRegisteredNumber(number);

  if (!isRegisteredNumber) {
    return res.status(422).json({
      status: false,
      message: 'The number is not registered'
    });
  }

  client.sendMessage(number, message).then(response => {
    res.status(200).json({
      status: true,
      response: response
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  });
});




const findGroupByName = async function(name) {
  const group = await client.getChats().then(chats => {
    return chats.find(chat => 
      chat.isGroup && chat.name.toLowerCase() == name.toLowerCase()
    );
  });
  return group;
}

// Send message to group
// You can use chatID or group name, yea!
app.post('/send-group-message', [
  body('id').custom((value, { req }) => {
    if (!value && !req.body.name) {
      throw new Error('Invalid value, you can use `id` or `name`');
    }
    return true;
  }),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  let chatId = req.body.id;
  const groupName = req.body.name;
  const message = req.body.message;

  // Find the group by name
  if (!chatId) {
    const group = await findGroupByName(groupName);
    if (!group) {
      return res.status(422).json({
        status: false,
        message: 'No group found with name: ' + groupName
      });
    }
    chatId = group.id._serialized;
  }

  client.sendMessage(chatId, message).then(response => {
    res.status(200).json({
      status: true,
      response: response
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  });
});

// Clearing message on spesific chat
app.post('/clear-message', [
  body('number').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = phoneNumberFormatter(req.body.number);

  const isRegisteredNumber = await checkRegisteredNumber(number);

  if (!isRegisteredNumber) {
    return res.status(422).json({
      status: false,
      message: 'The number is not registered'
    });
  }

  const chat = await client.getChatById(number);
  
  chat.clearMessages().then(status => {
    res.status(200).json({
      status: true,
      response: status
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  })
});

server.listen(port, function() {
  console.log('App running on *: ' + port);
});
