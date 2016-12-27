const linebot = require('./linebot');
const express = require('express');
const bodyParser = require('body-parser');

const bot = linebot({
	channelId: "1494059819",
	channelSecret: "4c9c4c576bfefea4a5ec28040ddb3f4c",
	channelAccessToken: "6E20YFvobv2T7Svuy0S4EmgjzTimRaMUolzCTtXJnZKr1cwhx7VOnYXq2WVE1o/aJU/1rLXHc8If1LveZUxa9T4nFCjwWAbFztOUloNcMEkzh2nsnucS9Hn0lrlJJ8+G8hYX3TTUlCsPzO5dAS78UAdB04t89/1O/w1cDnyilFU=",
});

const app = express();

const parser = bodyParser.json({
	verify: function (req, res, buf, encoding) {
		req.rawBody = buf.toString(encoding);
	}
});

app.post('/linewebhook', parser, function (req, res) {
	console.log('Log', req.get('X-Line-Signature'));
	console.log('Body', req.rawBody);
	if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
		return res.sendStatus(400);
	}
	bot.parse(req.body);
	return res.json({
		status: 'Working'
	});
});

app.get('/', function (req, res) {
	return res.json({
		status: 'Working'
	});
});

var count = 7;
var message = 
`สรุป ตอนนี้มีสองเรื่อง  
 1. นัดรับประทานอาหาร (ขอคอนเฟิมด้วย) https://www.surveymonkey.com/r/DJGGHX2 : น้าม เล็ก ก้อย บูม บอส  
 2. ไปเวียดนามมมมมม (น้าม ก้อย กอล์ฟ บูม บอส เล็ก : ใครไปเพิ่มแจ้งด้วยยย)
 3. ช่วงนี้รู้สึกอ้วนจุง ไขมันส่วนเกินก็เยอะ ทำไงดีๆๆ`;

bot.on('message', function (event) {
	
	count++;
	if (count === 16) {

		event.reply(message).then(function (data) {

		count = 0;

		}).catch(function (error) {
			console.log('Error', error);
		});
	}
	
});


app.listen(process.env.PORT || 3000, function () {
	console.log('LineBot is running.');
});