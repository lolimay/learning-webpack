import _ from 'lodash'

function component() {
    const element = document.createElement('div')

    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.classList.add('hello')

    return element
}

document.body.appendChild(component())

console.log(process.env.NODE_ENV)