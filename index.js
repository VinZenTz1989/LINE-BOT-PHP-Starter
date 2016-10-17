const linebot = require('linebot');
const express = require('express');
const bodyParser = require('body-parser');

const bot = linebot({
    channelId: "1484524579",
    channelSecret: "d37936b83102309d5a7dcc6dc46db5a7",
    channelAccessToken: "hr2r8ePdDroHXqjqoVvbT8MSP0umxs1obr9vik9tTs9KYGIaK8xvbEZ53m52JdX73MSqjryJBiblK9CGNUDOP2kozlg/Cksx3dGoX94oMmrxvoLM+CTwlhSKO6bdcrZMSopXLFkqroQKcjs/DdWHGAdB04t89/1O/w1cDnyilFU=", 
	verify: true // default=true
});

bot.on('message', function (event) {
    event.reply(event.message.text).then(function (data) {
        // success
    }).catch(function (error) {
        // error
    });
});

bot.listen('/linewebhook', process.env.port || 3000);