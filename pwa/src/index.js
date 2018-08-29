import _ from 'lodash'
import Print from './print'
import './style.css'

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration)
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError)
        })
    })
}

function component() {
    var element = document.createElement('div')
  
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.onclick = Print.bind(null, 'Hello webpack')
  
    return element
}
  
document.body.appendChild(component())