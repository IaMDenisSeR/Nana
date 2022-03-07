const FormData = require('form-data')
const axios = require('axios')

const handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime)) throw `Reply To Audio/Video *${usedPrefix + command}*`
 m.reply('```Searching..```')
				const bodyForm = new FormData()
			        bodyForm.append('audio', await q.download(), 'music.mp3')
           			bodyForm.append('apikey', 'caliph_71')
           			 axios('https://api.zeks.me/api/searchmusic', {
                	 	method: 'POST',
                	  	headers: {
				            "Content-Type": "multipart/form-data",
        			          ...bodyForm.getHeaders()
                	   	},
                	  	data: bodyForm
            		  	})
                		.then(({data}) =>{
    
				  m.reply('```' + `Title : ${data.data.title}  Artist : ${data.data.artists}  Genre : ${data.data.genre}  Album : ${data.data.album}  Release : ${data.data.release_date}` + '```')
				}).catch(() => {
				m.reply('*Not Found!*')
				})
				
}
handler.help = ['find']
handler.tags = ['download']

handler.command = /^(whatmusic|find)?$/i

module.exports = handler