const cssnano = require('cssnano');
const precss = require('precss');
const autoprefixer = require('autoprefixer');


// module.exports = {
//     plugins: [
//         precss,
//         autoprefixer
//     ]
// };

module.exports = cssnano(
    {
        autoprefixer : {
            add      : true,
            remove   : true,
            browsers : [
                'last 2 versions',
                'ios >= 8',
                'Android >= 4.1'
            ]
        },
        discardComments : {
            removeAll : true
        },
        discardUnused : false,
        mergeIdents   : false,
        reduceIdents  : false,
        safe          : true,
        sourcemap     : true
    }
);
