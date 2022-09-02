import JSEncrypt from 'jsencrypt';
import { getPublicKey } from '@/api/publicKey';

// const privateKey =
//   'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMFPa+v52FkSUXvcUnrGI/XzW3EpZRI0s9BCWJ3oNQmEYA5luWW5p8h0uadTIoTyYweFPdH4hveyxlwmS7oefvbIdiP+o+QIYW/R4Wjsb4Yl8MhR4PJqUE3RCy6IT9fM8ckG4kN9ECs6Ja8fQFc6/mSl5dJczzJO3k1rWMBhKJD/AgMBAAECgYEAucMakH9dWeryhrYoRHcXo4giPVJsH9ypVt4KzmOQY/7jV7KFQK3x//27UoHfUCak51sxFw9ek7UmTPM4HjikA9LkYeE7S381b4QRvFuf3L6IbMP3ywJnJ8pPr2l5SqQ00W+oKv+w/VmEsyUHr+k4Z+4ik+FheTkVWp566WbqFsECQQDjYaMcaKw3j2Zecl8T6eUe7fdaRMIzp/gcpPMfT/9rDzIQk+7ORvm1NI9AUmFv/FAlfpuAMrdL2n7p9uznWb7RAkEA2aP934kbXg5bdV0R313MrL+7WTK/qdcYxATUbMsMuWWQBoS5irrt80WCZbG48hpocJavLNjbtrjmUX3CuJBmzwJAOJg8uP10n/+ZQzjEYXh+BszEHDuw+pp8LuT/fnOy5zrJA0dO0RjpXijO3vuiNPVgHXT9z1LQPJkNrb5ACPVVgQJBALPeb4uV0bNrJDUb5RB4ghZnIxv18CcaqNIft7vuGCcFBAIPIRTBprR+RuVq+xHDt3sNXdsvom4h49+Hky1b0ksCQBBwUtVaqH6ztCtwUF1j2c/Zcrt5P/uN7IHAd44K0gIJc1+Csr3qPG+G2yoqRM8KVqLI8Z2ZYn9c+AvEE+L9OQY=';

const publicKey =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobxSoRBaCJaLwIMEwmvZO7MTtNhH1AZZqCns72IjVI0HSvW5KtiunXYVAnmY6SJ1grbK8TSw/Fe67JoGvMR6AIzYiFtAkl531zrieDC3X89psucsOqYn0Az7Ie6dp2z+u40sam1gr9s/5hsqxUVtnIpYvxOn713wTu6YUig6Nhpeipb2rJwVmnlV94D+BtmC6ElqZ+3idLNLy4Z63sFVvCh9rTkO1XCf4k9MfPvbZjH/wVYEEm1UFKZ7XBqDe9fpM6OsSWpxekDjLHn5od2p9B9YXZm3mGD0s7/6mnMV/hsqcMfD9nkC/FkRmoqmIBq+lFkMfXgdQ1O+vlijH26+gQIDAQAB';

/**
 * RSA加密 排除某些字段不加密
 * @param {*} data
 * @param {*} exceptFieldAry
 * @return {*}
 */
export async function encryptedData(data, exceptFieldAry = []) {
  let publicKey = '';
  const res = await getPublicKey();
  publicKey = res.data.publicKey;
  if (res.data.mockServer) {
    publicKey = '';
  }
  if (publicKey == '') {
    return data;
  }
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    `-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`
  );

  // 是否有加密排除字段
  let returnObj = {};

  if (exceptFieldAry.length > 0) {
    Object.keys(data).forEach((element, index) => {
      exceptFieldAry.forEach((value, key) => {
        if (element == value) {
          returnObj[element] = data[element];
          delete data[element];
        }
      });
    });
  }

  data = encrypt.encrypt(JSON.stringify(data));
  returnObj.param = data;

  return returnObj;
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description RSA加密
 * @param data
 * @returns {Promise<{param: PromiseLike<ArrayBuffer>}|*>}
 */
export async function encryptedData_bak(data) {
  let publicKey = '';
  const res = await getPublicKey();
  publicKey = res.data.publicKey;
  if (res.data.mockServer) {
    publicKey = '';
  }
  if (publicKey == '') {
    return data;
  }
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    `-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`
  );
  data = encrypt.encrypt(JSON.stringify(data));
  return {
    param: data,
  };
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description RSA解密
 * @param data
 * @returns {PromiseLike<ArrayBuffer>}
 */
export function decryptedData(data) {
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(
    `-----BEGIN RSA PRIVATE KEY-----${privateKey}-----END RSA PRIVATE KEY-----`
  );
  data = decrypt.decrypt(JSON.stringify(data));
  return data;
}
