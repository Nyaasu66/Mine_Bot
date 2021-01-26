// 依赖引入
const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer

// 登录主模块
if (process.argv.length < 4 || process.argv.length > 7) {
  console.log('bat文件账号密码参数有误, 请检查空格是否正确')
  process.exit(1)
}
const bot = mineflayer.createBot({
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  username: process.argv[4],
  password: process.argv[5],
  version: process.argv[6]
})

// 复读机模块，需要用可以解除下面的注释
// bot.on('chat', function (username, message) {
//   if (username === bot.username) return
//   bot.chat(message)
// })

// 被踢出提示及错误提示模块
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))


bot.once('spawn', () => {

  // 本地开启浏览器预览模块
  // 访问 http://localhost:3007/ 预览第一视角
  mineflayerViewer(bot, { port: 3007, firstPerson: true })

  // 解除下面第一行注释，会在登录后3秒钟会自动切换至生存服，其余命令同理
  // setTimeout(() =>bot.chat('/server Survival'), 3000)

  // setTimeout(() =>bot.chat('/server Test'), 3000)
  // setTimeout(() =>bot.chat('/gamemode spectator'), 6000)
  // setTimeout(() =>bot.chat('/tp 624 9999 204'), 12000)
})


// hello模块
bot.chatAddPattern(
  /(helo|hello|Hello)/,
  'hello',
  'Someone says hello'
)
const hi =  () => {
  bot.chat('Hi!')
}
bot.on('hello', hi)

// 去生存服模块，可以把下面第二行的 gosny 改成你的自定义指令
bot.chatAddPattern(
  /(gosny)/,
  'go_survival',
  'Bot will go to the survival server'
)
const go_survival =  () => {
  bot.chat('/server Survival')
}
bot.on('go_survival', go_survival)

// 去test服模块，可以把下面第二行的 gotny 改成你的自定义指令
bot.chatAddPattern(
  /(gotny)/,
  'go_test',
  'Bot will go to the test server'
)
const go_test =  () => {
  bot.chat('/server Test')
}
bot.on('go_test', go_test)

// 控制台输出模块
bot.on('message', (message) => {
  console.log(message.toAnsi())
})


// tpa 模块，可以把下面第二行的 cmny 改成你的自定义指令, 其他内容不要动
bot.chatAddPattern(
  /^.+<(.+)>.+cmny$/,
  'tpa_to',
  'Bot will tpa to the user'
)
const tpa_to = (username) => {
    console.log(`Sent a tpa_request to ${username}`)
    bot.chat(`Sent a tpa_request to ${username}`)
    bot.chat(`/tpa ${username}`)
}
bot.on('tpa_to', tpa_to)


// sleep 模块，可以把下面第二行的 sleepny 改成你的自定义指令
bot.chatAddPattern(
  /(sleepny|zzz)/,
  'go_sleep',
  'Bot will go sleep'
)
bot.on('go_sleep', goToSleep)
async function goToSleep () {
  const bed = bot.findBlock({
    matching: block => bot.isABed(block)
  })
  if (bed) {
    try {
      await bot.sleep(bed)
      bot.chat("我z了, 快/afk")
    } catch (err) {
      bot.chat(`I can't sleep: ${err.message}, use afk instead`)
      bot.chat("/afk")
    }
  } else {
    bot.chat('No nearby bed, use afk instead')
    bot.chat("/afk")
  }
}