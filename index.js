const Wechat = require('wechat4u')
let bot = new Wechat()
bot.start()

bot.on('uuid', uuid => {
  console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid)
})

function handleEle(msg) {
  const urls = msg.Url.split('#hardware_id')
  const url = `${urls[0]}?from=singlemessage&amp;isappinstalled=0#hardware_id${urls[1]}`
  const hongbaoUrl = `https://hrbust.smackgg.cn/test-ele?url=${encodeURIComponent(url.replace(/&amp;/g, '&'))}`
  bot.sendMsg(hongbaoUrl, msg.FromUserName)
  .catch(err => {
    console.log(err)
  })
}

bot.on('message', msg => {
  switch (msg.MsgType) {
    case 37:
      const { UserName, Ticket, Content } = msg.RecommendInfo;
      // return
      if (Content == '测试测试' || Content == '岩哥牛逼') {
        bot.verifyUser(UserName, Ticket)
      }
      break
    case bot.CONF.MSGTYPE_STATUSNOTIFY:
      break
    case bot.CONF.MSGTYPE_TEXT:
      bot.sendMsg(msg.Content, msg.FromUserName)
      .catch(err => {
        console.log(err)
      })
      break
    case 49:
      handleEle(msg)
      break
  }
})
