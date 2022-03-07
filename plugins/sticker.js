const { isUrl } = require('../lib/myfunc')
const { sticker } = require('../lib/sticker')
const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')
const { webp2png } = require('../lib/webp2mp4')

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false

  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (/webp/.test(mime)) {
      let img = await q.download()
      let out = await webp2png(img)
      if (!img) return m.reply('````' + `Reply To a Sticker ${usedPrefix + command}` + '```')
      stiker = await sticker(0, out, global.packname, global.author)
      
    } else if (/image/.test(mime)) {
      let img = await q.download()
      let link = await uploadImage(img)
      if (!img) return m.reply('````' + `Reply To a Image ${usedPrefix + command}` + '```')
      stiker = await sticker(0, link, global.packname, global.author)
      
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) throw '```Maximum 10 seconds.```'
      let img = await q.download()
      let link = await uploadFile(img)
      if (!img) return m.reply('```' + `Give me 10 Seconds Video Then Type ${usedPrefix + command}` + '```')
      stiker = await sticker(0, link, global.packname, global.author)
      
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
      else throw '```Invalid Url!```'
    }
  } finally {
    if (stiker) await conn.sendFile(m.chat, stiker, '', '', m)
    else throw '```Reply To Image/Video/Url!```'
  }
}
handler.help = ['stiker ', 'sticker <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?$/i

module.exports = handler

