let limit = 30
const { MessageType } = require("@adiwajshing/baileys")
let fetch = require('node-fetch')
const { servers, ytv } = require('../lib/y2mate')
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw '```Give me a youtube url!!```'
  let chat = global.db.data.chats[m.chat]
  let result = await ytv(isUrl(args[0]))
                let { dl_link, thumb, title, filesizeF, filesize } = result
                if (Number(filesize) >= 40000) return m.reply('```File Over Limit: ```' + filesizeF)
                let res = await getBuffer(dl_link)
                let th = await getBuffer(thumb)
                await conn.sendMessage(m.chat, res, MessageType.video, { mimetype: 'video/mp4', thumbnail: th, filename: `${title}.mp4`, caption: `\nTitle: ${title}\n Size: ${filesizeF}`, quoted: m, contextInfo: { externalAdReply: { title: `${title}`.trim(), body: '𝐵𝑦 𝐷𝑒𝑛𝑖𝑠 - 𝑆𝑒𝑙𝑓 𝐵𝑜𝑡'.trim(), previewType: "VIDEO", thumbnail: await getBuffer(thumb), sourceUrl: `${args[0]}`}}})
}
handler.help = ['mp4','v',''].map(v => 'yt' + v + ` <url> `)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = false

module.exports = handler

async function getBuffer(url) {
ff = await fetch(url)
fff = await ff.buffer()
return fff
}
const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
