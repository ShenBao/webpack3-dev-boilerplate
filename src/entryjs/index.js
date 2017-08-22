import React from 'react';
import ReactDOM from 'react-dom';

import App from '../containers/App';

// import registerServiceWorker from '../registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// registerServiceWorker();

if(process.env.NODE_ENV){
    console.log("现在是开发环境");
}else{
    console.log("现在是生产环境");
}
