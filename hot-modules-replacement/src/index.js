import _ from 'lodash'
import printMe from './print.js'
import './style.css'

function component() {
    const element = document.createElement('div')
    const btn = document.createElement('button')
  
    element.innerHTML = _.join(['Hello', 'webpack', 'Created by lolima'], ' ')

    btn.innerHTML = 'Click me and check the console!'
    btn.onclick = printMe

    element.appendChild(btn)

    return element
}
  
document.body.appendChild(component())

if (module.hot) {
    console.log('HMR has happened!')
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!')
        printMe()
    })
}