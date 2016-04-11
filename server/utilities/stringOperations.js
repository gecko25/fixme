module.exports = {
  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  generateRandomString: function(length) {
    //TODO: make sure args are defined

    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
  /**
   * Removes special chars and makes string lowercase.
   *
   * @param  {array} the array to search
   * @return {array} array of duplicate
   */
   removeSpecialCharsAndMakeLowerCase: function removeSpecialCharsAndMakeLowerCase(str){
     //TODO: make sure args are defined
    return str.replace(/[^\w\s]/,'').toLowerCase().trim();
  }


}
