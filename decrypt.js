const CryptoJS = require("crypto-js");

const decrypt = (enobj) => {
  let { username, password, email, semoption } = enobj;

  // Secret key used for encryption
  const secretKey = "JaiSiyaRam";

  // Decrypt the data

  const bytesUsername = CryptoJS.AES.decrypt(username, secretKey);
  const decryptedUsername = bytesUsername.toString(CryptoJS.enc.Utf8);
 
  const bytesPassword = CryptoJS.AES.decrypt(password, secretKey);
  const decryptedPassword = bytesPassword.toString(CryptoJS.enc.Utf8);
 
  const bytesEmail = CryptoJS.AES.decrypt(email, secretKey);
  const decryptedEmail= bytesEmail.toString(CryptoJS.enc.Utf8);
 
  const bytesOption = CryptoJS.AES.decrypt(semoption, secretKey);
  const decryptedOption = bytesOption.toString(CryptoJS.enc.Utf8);
  

  return {
    "username" :  decryptedUsername,
    "password": decryptedPassword,
    "email": decryptedEmail,
    "semoption": decryptedOption
  };
};

module.exports = decrypt;
