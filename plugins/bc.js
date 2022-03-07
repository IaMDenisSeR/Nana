
const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
const axios = require("axios");
let fetch = require('node-fetch')
let handler  = async (m, { conn, text }) => {
let [ dura, title, body, url ] = text.split(",")
let groups = conn.chats.all().filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message && !v.announce).map(v => v.jid)
let q = m.quoted ? m.quoted : m
let media = await q.download()
let thum = fs.readFileSync('./584fcc0a0e4ff59c0e5ed54d4f6a86cd.jpg')
for (let id of groups) await conn.sendMessage(id, media, MessageType.audio, { mimetype: 'audio/mp4', duration: dura, ptt: true, contextInfo: { externalAdReply: { title: title, body: body, mediaType: "2", thumbnail: await getBuffer(url), mediaUrl: `https://instagram.com/`}}})
}
handler.help = ['tobc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^tobc$/i
handler.owner = true


module.exports = handler
    
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}




