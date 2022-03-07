const handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Syntax error\n${usedPrefix + command} <text>\n\nEx:\n${usedPrefix + command} plugins/Den.js`
    if (!m.quoted.text) throw '*Reply to the message!*'
    let path = `${text}`
    await require('fs').writeFileSync(path, m.quoted.text)
    m.reply('```' + `Plugin Added ${path}` + '```')
}
handler.help = ['plugin'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^plugin$/i

handler.owner = true
handler.rowner = true

module.exports = handler