const crypto = require('crypto');
module.exports = function(pass, salt){
  return crypto.createHmac('sha256', salt)
                            .update(pass)
                            .digest('hex');
}
