const { igdl } = require('../lib/scrape')

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
  if (!args[0]) throw '```Give me Instagram Url.```'
  if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw '```Give a insta Url Only Tv/Reel/Post.```'

  igdl(args[0]).then(async res => {
    let igdl = JSON.stringify(res)
    let json = JSON.parse(igdl)
    await m.reply('```Downloading...```')
    for (let { downloadUrl, type } of json) {
      conn.sendFile(m.chat, downloadUrl, 'ig' + (type == 'image' ? '.jpg' : '.mp4'), '*Self-Bot*', m)
    }
  })
} catch (e) {
	m.reply('```' + e + '```') 
}
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|instagram|insta)?$/i

//handler.limit = false

module.exports = handler