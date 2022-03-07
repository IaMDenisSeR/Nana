let { WAMessageProto } = require('@adiwajshing/baileys')

let handler = async (m, { conn, command, usedPrefix, text }) => {
    let M = WAMessageProto.WebMessageInfo
    let which = command.replace(/\+|add/i, '')
    if (!m.quoted) throw '```Reply message!```'
    if (!text) return conn.sendButton(m.chat, `Uhm.. teksnya mana?\n\nContoh:\n${usedPrefix + command} tes`, '© wabot-aq', 'Message List', `${usedPrefix}list${which}`, m)
    let msgs = db.data.msgs
    if (text in msgs) return conn.sendButton(m.chat, `'${text}' already registered, use another name!`, '𝑆𝑒𝑙𝑓 𝑏𝑜𝑡', 'Message List', `${usedPrefix}list${which}`, m)
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
    if (db.data.chats[m.chat].getmsg) return m.reply(`Berhasil menambahkan pesan dengan nama '${text}'
    
Access by typing '${text}'`)
    else return conn.sendButton(m.chat, `*Successfully added message with name '${text}'*

Access with ${usedPrefix}get${which} ${text}

If Getmsg is enabled then there is no need to type anymore *${usedPrefix}get${which}*`, '𝑆𝑒𝑙𝑓 𝑏𝑜𝑡', 'Activate', '.1 getmsg', m)
}
handler.help = ['msg'].map(v => 'add' + v + ' <text>')
handler.tags = ['database']
handler.command = /^(\+|add)(msg)$/

module.exports = handler