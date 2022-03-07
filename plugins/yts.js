let yts = require('yt-search')
let handler = async (m, { text, usedPrefix }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if (!teks) throw '```Enter any music!!```'
  let datai = [];
				try{
				let ysearch = await yts(teks)
				let hdata = ysearch.all
				for(let i=11; i<hdata.length; i++){
				   datai.push({
					"rows": [
					{
					"title": `${hdata[i].title}`,
					description: ``,
					"rowId": `${usedPrefix}yta ${hdata[i].url}`
				  }
				], title: `Duration ${hdata[i].timestamp} ( ${hdata[i].ago} )`})
				   }
				let jo = conn.prepareMessageFromContent(m.chat, {
				"listMessage":{
				"title": `Hi @${m.sender.split("@")[0]}`,
				"description": `*Matched songs*\n\n`,
				"buttonText": "Download",
				"listType": "SINGLE_SELECT",
				"sections": datai}}, {contextInfo: { mentionedJid: [m.sender] }}, {}) 
				await conn.relayWAMessage(jo, {waitForAck: true})
				  } catch(e) {
				 m.reply('```' + e + '```')
				}
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <music name>')
handler.tags = ['download']
handler.command = /^yts(earch)?$/i

module.exports = handler
