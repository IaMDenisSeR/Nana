const { isUrl, getBuffer } = require('../lib/myfunc');
const { MessageType } = require("@adiwajshing/baileys")
const { servers, yta } = require('../lib/y2mate');
const handler = async (m, { conn, args, text }) => {
    	try {
    	if (!text) return m.reply('```Give me YouTube Url!!```')
        
        let result = await yta(isUrl(text[0]))
        let { dl_link, thumb, title, filesizeF, filesize } = result
        if (Number(filesize) >= 40000) return m.reply('```File size Greater then:```' + filesizeF)
        let res = await getBuffer(dl_link)
        let th = await getBuffer(thumb)
        await conn.sendMessage(m.chat, res, MessageType.document, { mimetype: 'audio/mp3', thumbnail: th, filename:`${title}.mp3`, quoted: m, contextInfo: { externalAdReply: { title: `${title}`.trim(), body: '𝐵𝑦 𝐷𝑒𝑛𝑖𝑠 - 𝑆𝑒𝑙𝑓 𝐵𝑜𝑡'.trim(), mediaType: "2", thumbnail: await getBuffer(thumb), mediaUrl: `${args[0]}`}}})
     } catch (e) {
     	m.reply('```' + e + '```')
     }
}

handler.help = ['yta <url>']
handler.tags = ['download']

handler.command = /^yt(audio|a?|mp3)?/i

module.exports = handler