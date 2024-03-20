import CryptoJS  from "crypto-js";
import dev from "../config/dev.config.json";


/*
 * Created on Feb 13 2023
 * @author Test
 */
export const decryptPass = (dPassword) => {
    let bytes = CryptoJS.AES.decrypt(dPassword, dev.PASSWORD_SECRET_KEY);
    let password = bytes.toString(CryptoJS.enc.Utf8);
    return password
}

export const encryptPass = (ePassword) => {
    let password = CryptoJS.AES.encrypt(ePassword, dev.PASSWORD_SECRET_KEY).toString();
    return password
}

