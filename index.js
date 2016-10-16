const linebot = require('linebot');
const express = require('express');
const bodyParser = require('body-parser');

const bot = linebot({
    channelId: "1484524579",
    channelSecret: "d37936b83102309d5a7dcc6dc46db5a7",
    channelAccessToken: "hr2r8ePdDroHXqjqoVvbT8MSP0umxs1obr9vik9tTs9KYGIaK8xvbEZ53m52JdX73MSqjryJBiblK9CGNUDOP2kozlg/Cksx3dGoX94oMmrxvoLM+CTwlhSKO6bdcrZMSopXLFkqroQKcjs/DdWHGAdB04t89/1O/w1cDnyilFU=", verify: false // default=true
});

const app = express();

const parser = bodyParser.json({
	verify: function (req, res, buf, encoding) {
		req.rawBody = buf.toString(encoding);
	}
});

app.post('/linewebhook', parser, function (req, res) {
	if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
		return res.sendStatus(400);
	}
	bot.parse(req.body);
	return res.json({});
});

app.get('/', parser, function (req, res) {
	return res.json({boss:'Boss'});
});

bot.on('message', function (event) {
  console.log('Boss');
	event.reply(event.message.text).then(function (data) {
		console.log('Success', data);
	}).catch(function (error) {
		console.log('Error', error);
	});
});

app.listen(4000 || 80, function () {
	console.log('LineBot is running on port 4000');
});