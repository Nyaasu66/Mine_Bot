// 依赖引入
const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const repl = require("repl");

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

// 输入模块
const r = repl.start({ prompt: '> ', preview: false});
r.context.bot = bot;
r.context.c = bot.chat; // 聊天快捷指令一：c("内容")
r.on("exit", () => {
  bot.end();
});
// 聊天快捷指令二：.t 内容
r.defineCommand('t', {
  help: '输入聊天内容',
  action(msg) {
    this.clearBufferedCommand();
    bot.chat(`${msg}`);
    this.displayPrompt();
  }
});

bot.once('spawn', () => {

  // 本地开启浏览器预览模块
  // 访问 http://localhost:3007/ 预览第一视角
  mineflayerViewer(bot, { port: 3007, firstPerson: true })

  // 解除下面第一行注释，会在登录后3秒钟会自动切换至生存服，其余命令同理
  // setTimeout(() =>bot.chat('/server Survival'), 3000)
  // setTimeout(() =>bot.chat('/server Test'), 3000)
  // setTimeout(() =>bot.chat('/gamemode spectator'), 6000)
  // setTimeout(() =>bot.chat('/tp 624 9999 204'), 12000)

  // 解除下面第二行注释，可开启开机语音包
  const turing = ["早","好耶","开冲", "早啊","awa", "早上好，夜之城", "铛铛铛，懒狗起床啦"];
  // setTimeout(() =>bot.chat(turing[Math.floor((Math.random()*turing.length))]),5000)
})


// 控制台输出模块
bot.on('message', (message) => {
  r.displayPrompt(true)
  console.log('\r'+message.toAnsi()) // 研究了1整天，找到了不打扰输入的灵魂:'\r'
  r.displayPrompt(true)
})

// hello模块
bot.chatAddPattern(
  /^.+<(.+)>.+[Hh]ello.*$/,
  'hello',
  'Someone says hello'
)
const hi =  (username) => {
  bot.chat(`Hi~ ${username}`)
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

// tpa 模块，可以把下面第二行的 cmny 改成你的自定义指令, 其他内容不要动
bot.chatAddPattern(
  /^.+<(.+)>.+cmny$/,
  'tpa_to',
  'Bot will tpa to the user'
)
const tpa_to = (username) => {
    console.log(`Sent a tpa_request to ${username}`)
    const tpmsgs = [
      `${username}大哥哥, 人家来了啦`,
      `${username}你叫我? 大臭猪来咯`,
      `Sent a tpa_request to ${username}`,
      `来了来了`,
      `${username}别催了在路上了`,
      `主人${username}, 是你在召唤我吗`,
      `当前任务已更新：讨伐${username}`,
      `saber·nybot 遵从召唤而来，${username}你就是我的master吗`,
      `${username}你把我召唤过来了 你要实现我100个愿望`,
      `${username}你把我召唤过来了, pay100岛币给我`,
      `啊～妾身乃司掌混沌之龙，汝召唤吾所为何事？`,
      `咱是魅魔desu！既然把咱召唤了出来就要负责！${username}快付给我一千岛币，不然就把你榨干`,
      `不要靠近若叶，若叶已经没有钱了！`,
    ]
    bot.chat(tpmsgs[Math.floor((Math.random()*tpmsgs.length))])
    bot.chat(`/tpa ${username}`)
}
bot.on('tpa_to', tpa_to)

// roll模块
bot.chatAddPattern(
  /(ro)/,
  'roll',
  'Bot will go roll a number from 1-6'
)
const roll =  () => {
  bot.chat(Math.floor((Math.random()*6+1)))
}
bot.on('roll', roll)

// rnd模块
bot.chatAddPattern(
  /^.+r([1-9])d$/,
  'rnd',
  'Bot will go roll n numbers from 1-100'
)
const rnd = (n) => {
  let rxd = []
  let postmsg = ``
  for (let i=0; i<n; i++) {
    rxd[i] = Math.floor(Math.random()*100+1)
    i === 0 ? postmsg = `${rxd[i]}` : postmsg += `+${rxd[i]}`
  }
  bot.chat(`（扔骰子）嗯，结果是${n}D100=${postmsg}=${eval(rxd.join("+"))}`)
}
bot.on('rnd', rnd)

// roll 100模块
bot.chatAddPattern(
  /(rd)/,
  'rolld',
  'Bot will go roll a number from 1-100'
)
const rolld =  () => {
  bot.chat(Math.floor((Math.random()*100+1)))
}
bot.on('rolld', rolld)

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