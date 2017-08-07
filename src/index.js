import './style.css';
import './style1.less';
import './style1.scss';

import Icon from './xiaobaobao.png';

import Data from './data.xml';

import printMe from './print.js';

function component() {
    var element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now imported by this script
    element.innerHTML = 
    `Hello,webpack
    <i class="iconfont">&#xe7f6;</i>
    <i class="iconfont">&#xe7fa;</i>
    `
    ;
    
    element.classList.add('hello');

    var myIcon = new Image();
    myIcon.src = Icon;
    myIcon.width = 60;
    element.appendChild(myIcon);

    console.log(Data);

    var btn = document.createElement('button');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    
    return element;
}

document.body.appendChild(component());