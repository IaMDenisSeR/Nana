console.log('Bot Running...')
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const package = require('./package.json')
const { color, pluginLoader } = require('./lib/myfunc');
const CFonts  = require('cfonts')
let commands = pluginLoader('../plugins');
global.plugins = Object.assign(commands)
CFonts.say(`${package.name}`, {
        font: 'shade',
        align: 'center',
        gradient: ['#12c2e9', '#c471ed'],
        transitionGradient: true,
        letterSpacing: 3,
    });
 CFonts.say(`'${package.name}' Coded By ${package.author.name}`, {
        font: 'console',
        align: 'center',
        gradient: ['#DCE35B', '#45B649'],
        transitionGradient: true,
    });

console.log(color('[SYS]', 'cyan'), `Package Version`, color(`${package.version}`, '#009FF0'));
//console.log(color('[SYS]', 'cyan'), `WA Version`, color((await checkWAVersion()).join('.'), '#38ef7d'));
console.log(color('[SYS]', 'cyan'), `Loaded Plugins`, color(Object.keys(plugins).length, '#38ef7d'));

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [path.join(__dirname, file), ...process.argv.slice(2)]
  CFonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  })
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', code => {
    isRunning = false
    console.error('Exited with code:', code)
    if (code === 0) return
    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0])
      start(file)
    })
  })
  // console.log(p)
}

start('main.js')
