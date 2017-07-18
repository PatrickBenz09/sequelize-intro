module.exports = function() {
  let salt = "";
  let rand = "";

  for (let i = 0; i < 8; i++) {
    if (Math.floor((Math.random() * 2)) === 0)
      rand = String.fromCharCode(97 +  Math.floor((Math.random() * 25)) );
    else
      rand = Math.floor((Math.random() * 10)).toString();
    salt += rand;
  }
  return salt;
};
