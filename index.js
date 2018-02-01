const Wechat = require('wechat4u')
let bot = new Wechat()
bot.start()

bot.on('uuid', uuid => {
  console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid)
})

bot.on('message', msg => {
  switch (msg.MsgType) {
    case 37:
      const { UserName, Ticket, Content } = msg.RecommendInfo;
      // return
      if (Content == '爸爸') {
        bot.verifyUser(UserName, Ticket)
      }
      break
    case bot.CONF.MSGTYPE_STATUSNOTIFY:
      console.log(1);
      break
    case bot.CONF.MSGTYPE_TEXT:
      bot.sendMsg(msg.Content, msg.FromUserName)
      .catch(err => {
        console.log(err)
      })
      break
    case 49:
      bot.sendMsg(msg.Url || msg.Content, msg.FromUserName)
      .catch(err => {
        console.log(err)
      })
      break
  }
})
