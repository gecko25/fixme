This is a node project using Angular Material that allows users to type in their symptoms, be diagnosed, and recommended doctors near them.

The project is hosted [here](http://fixmelathe.herokuapp.com/)

### Getting started ###
`npm install`   //installs all server-side dependencies from package.json 

`bower install`  //installs all client-side dependencies from bower.json 

`gulp serve`

*Note you must have node.js, gulp, and bower installed to run these commands*

- To download node & npm (node package manager) go to: [nodejs.org](https://nodejs.org/en/)
- To download bower, go to project root dir: `npm install -g bower` (you made need to throw `sudo` in front of that)
- To download gulp, go to project root dir: `npm install -g gulp`(you made need to throw `sudo` in front of that)

### APIS ###
* https://developer.infermedica.com/docs/api
* https://developer.betterdoctor.com
* http://www.programmableweb.com/category/medical

### Frameworks & Features ###
- node.js
- angular
- angular material
- express
- browser-sync
- ES6 features (transpiled thru babel)
- google login


## Infermedia key ## 
If you try to clone this project, you'll need a `credentials` file with the infermedica app id and key.

The file is located in `server/config/credenitals.js` and has the following structure:

```javascript
module.exports = {
    cookie_secret: '',
    infermedica: {
      app_id : '',
      app_key : ''
    },
    betterDoctor: {
      user_key: ''
    }
}
```

You would need to sign up for a infermedica API key to deploy locally.
