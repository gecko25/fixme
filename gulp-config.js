/*
 * This module will return a configuration object *
 * @param alljsfiles - returns all javascript files in our root and source file
 *
 */
module.exports = function(){
    var config = {
        /*
         * Paths
         */
        public:			'./public',
        app: 				'./public/app',
        dist: 				'./dist',
        sass:   			'public/css/scss/**/*.scss',
        css: 				'public/css/**/*',
        assets: 			'/assets/**/*',
        img: 				'/img/**/*',
        home: 				'/home/**/*',
        html:					'*.html',
        root:				'.',
        supportedBrowsers:	{browsers: ['last 2 version', '> 5%']},
        index:				'/index.html',
        server: 'server.js',
        /*
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'), //we need to require OUR bower.json bower knows what libs we use
            directory: './vendor',
            allbower: './vendor/**/*'
        }

    };

    config.getWiredepDefaultOptions = function() {
        return {
            bowerJson: 	config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
    };

    return config;
};





/* REFERENCES
 *
 * supportedbrowsers -- https://github.com/ai/browserslist#queries
 *
 */
