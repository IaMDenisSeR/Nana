let handler = async (m, { usedPrefix, command }) => {
    let which = command.replace(/(daftar|list)/i, '')
    let msgs = db.data.msgs
    let split = Object.entries(msgs).map(([nama, isi]) => { return { nama, ...isi } })
    let fltr
    if (/all/i.test(command)) fltr = split
    if (/audio/i.test(command)) fltr = split
        .filter(v => v.message.audioMessage)
        .filter(m => m.message.audioMessage.ptt == false)
    if (/doc/i.test(command)) fltr = split.filter(v => v.message.documentMessage)
    if (/vn/i.test(command)) fltr = split
        .filter(v => v.message.audioMessage)
        .filter(m => m.message.audioMessage.ptt == true)
    if (/video/i.test(command)) fltr = split
        .filter(v => v.message.videoMessage && !v.message.videoMessage.gifPlayback)
    if (/gif/i.test(command)) fltr = split
        .filter(v => v.message.videoMessage)
        .filter(m => m.message.videoMessage.gifPlayback)
    if (/stic?ker/i.test(command)) fltr = split.filter(v => v.message.stickerMessage)
    if (/msg/i.test(command)) fltr = split.filter(v => v.message.conversation)
    if (/img/i.test(command)) fltr = split.filter(v => v.message.imageMessage)
    let list = fltr.map(v => `├ ${v.nama} ${v.locked ? '(🔒)' : ''}`).join('\n')
    if (db.data.chats[m.chat].getmsg) return m.reply(`
┌「 *Message List* 」
${list}
└────

Access by typing name
`.trim())
    else return conn.sendButton(m.chat, `
┌「 *Message List* 」
${list}
└────

Access by:
*${usedPrefix}get${which}* <name>

If Getmsg is enabled then there is no need to type anymore *${usedPrefix}get${which}*
`.trim(), '𝑆 𝑒 𝑙 𝑓 - 𝐵 𝑜 𝑡', 'Activate', '.1 getmsg', m)
}
handler.help = [ 'msg'].map(v => 'list' + v)
handler.tags = ['database']
handler.command = /^(list|list)(vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler
