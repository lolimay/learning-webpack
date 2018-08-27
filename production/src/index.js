import './style.css'
import { cube } from './math'

function component() {
    const element = document.createElement('pre')

    element.innerHTML = `
Hello webpack!
5 cubed is equal to ${cube(5)}
Created by lolimay
    `.trim()

    return element
}

if(process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!')
}
  
document.body.appendChild(component())