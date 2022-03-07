let handler = async (m, { conn, text }) => {
    if (!m.quoted) return conn.sendMessage(m.chat, 'where\'s message?', 'conversation')
    if (m.quoted.mtype !== 'viewOnceMessage') throw 'Thats not a person view Once'
    await conn.copyNForward(m.chat, await conn.loadMessage(m.chat, m.quoted.id), false, { readViewOnce: true }).catch(_ => m.reply('```Maybe its been opened by a bot.```'))
}

handler.help = ['viewonce <reply viewonce msg>']
handler.tags = ['image']

handler.command = /^(viewonce|once)/i

module.exports = handler