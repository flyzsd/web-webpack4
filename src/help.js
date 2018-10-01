import bar from './bar'
import _ from 'lodash';

console.log(`hello, world`)
console.log(`hello, world`)

bar();

function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());