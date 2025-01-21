const bcrypt = require("bcryptjs");
exports.hashPass = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

exports.comparePass = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
