let handler = async (m, { command, usedPrefix, text }) => {
    let which = command.replace(/get/i, '')
    if (!text) return conn.sendButton(m.chat, `Type msg name\n\nEx:\n${usedPrefix + command} Den?`, '𝑆 𝑒 𝑙 𝑓 - 𝐵 𝑜 𝑡', 'Message List', `${usedPrefix}list${which}`)
    let msgs = global.db.data.msgs
    if (!text in msgs) return conn.sendButton(m.chat, `'${text}' not listed!`, '𝑆 𝑒 𝑙 𝑓 - 𝐵 𝑜 𝑡', 'Message List', `${usedPrefix}list${which}`)
    delete msgs[text]
    m.reply(`*Successfully deleted message with name* '${text}'`)
}
handler.help = [ 'msg'].map(v => 'del' + v + ' <text>')
handler.tags = ['database']
handler.command = /^(-|del)(msg)$/i

module.exports = handler