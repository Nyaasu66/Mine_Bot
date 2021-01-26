## MC挂机Bot - 基于mineflayer


### 使用方法

0. 前提要求: 电脑安装了 node.js: http://nodejs.cn/download/
   从这里下载14.xx版本的 Windows msi安装包即可
   
1. 如果是使用压缩包，包内已经打包好依赖，不需要执行 npm install等安装指令.
   如果是从github下载的源码，请在双击bat前运行 npm install

2. 用文本编辑器打开 <双击我运行bot.bat>，更改里面的 邮箱 和 密码 即完成基本准备
   即把bat文件第三行改为：node index.js game.i2s.io 25565 xxxxx@gmail.com xxxxx 1.16.4

3. 双击 <双击我运行bot.bat>

4. 输入 http://localhost:3007 可以在本地浏览器预览bot第一视角，
   如果不需要想节约内存，可以把index.js的第26-28行注释掉
   
5. 常用指令：
```
helo / hello / Hello - Hi!
sleepny / zzz        - 睡觉
gosny                - 切换到生存服
cmny                 - tpa到玩家
gotny                - 切换到test服
```

5. 要修改指令内容详见 index.js 文件内注释
