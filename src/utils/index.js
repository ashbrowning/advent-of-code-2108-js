const replaceChar = (str, index, char = "-") =>
  str.substring(0, index) + char + str.substring(index + 1);

  module.exports = {
    replaceChar
  }
