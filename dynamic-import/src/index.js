async function getComponent() {
    const element = document.createElement('div')
    const _ = await import(/* webpackChunkName: "lodash" */ 'lodash')

    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    return element
}

getComponent().then(component => {
    document.body.appendChild(component)
})

console.log(process.env.NODE_ENV)