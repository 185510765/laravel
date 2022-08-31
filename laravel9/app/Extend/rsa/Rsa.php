<?php
/**
 * RSA算法类
 * 签名及密文编码：base64字符串/十六进制字符串/二进制字符串流
 * 填充方式: PKCS1Padding（加解密）/NOPadding（解密）
 *
 * Notice:Only accepts a single block. Block size is equal to the RSA key size!
 * 如密钥长度为1024 bit，则加密时数据需小于128字节，加上PKCS1Padding本身的11字节信息，所以明文需小于117字节
 */

namespace Rsa;

class Rsa
{
    const CHAR_SET               = "UTF-8";
    const BASE_64_FORMAT         = "UrlSafeNoPadding";
    const RSA_ALGORITHM_KEY_TYPE = OPENSSL_KEYTYPE_RSA;
    const RSA_ALGORITHM_SIGN     = OPENSSL_ALGO_SHA256;

    protected $public_key;
    protected $private_key;
    protected $key_len;

    public function __construct($pub_key, $pri_key = null)
    {
        $this->public_key  = $pub_key;
        $this->private_key = $pri_key;

        $pub_id        = openssl_get_publickey($this->public_key);
        $this->key_len = openssl_pkey_get_details($pub_id)['bits'];
    }

    /*
     * 创建密钥对
     */
    public static function new_rsa_key($key_size = 2048)
    {
        $config = array(
            "private_key_bits" => $key_size,
            "private_key_type" => self::RSA_ALGORITHM_KEY_TYPE,
        );
        $res = openssl_pkey_new($config);
        openssl_pkey_export($res, $private_key);
        $public_key_detail = openssl_pkey_get_details($res);
        $public_key        = $public_key_detail["key"];

        return [
            "public_key"  => $public_key,
            "private_key" => $private_key,
        ];
    }

    /*
     * 公钥加密
     */
    public function pub_encode($data)
    {
        $encrypted = '';
        $part_len  = $this->key_len / 8 - 11;
        $parts     = str_split($data, $part_len);

        foreach ($parts as $part) {
            $encrypted_temp = '';
            openssl_public_encrypt($part, $encrypted_temp, $this->public_key);
            $encrypted .= $encrypted_temp;
        }

        return url_safe_base64_encode($encrypted);
    }

    /*
     * 私钥解密
     */
    public function priv_decode($encrypted)
    {
        $decrypted      = "";
        $part_len       = $this->key_len / 8;
        $base64_decoded = url_safe_base64_decode($encrypted);
        $parts          = str_split($base64_decoded, $part_len);

        foreach ($parts as $part) {
            $decrypted_temp = '';
            openssl_private_decrypt($part, $decrypted_temp, $this->private_key);
            $decrypted .= $decrypted_temp;
        }

        return $decrypted;

        // return remove_quote($decrypted); // Rsa解密出来的数据 带两个双引号
    }

    /*
     * 私钥加密
     */
    public function priv_encode($data)
    {
        $encrypted = '';
        $part_len  = $this->key_len / 8 - 11;
        $parts     = str_split($data, $part_len);

        foreach ($parts as $part) {
            $encrypted_temp = '';
            openssl_private_encrypt($part, $encrypted_temp, $this->private_key);
            $encrypted .= $encrypted_temp;
        }

        return url_safe_base64_encode($encrypted);
    }

    /*
     * 公钥解密
     */
    public function pub_decode($encrypted)
    {
        $decrypted      = "";
        $part_len       = $this->key_len / 8;
        $base64_decoded = url_safe_base64_decode($encrypted);
        $parts          = str_split($base64_decoded, $part_len);

        foreach ($parts as $part) {
            $decrypted_temp = '';
            openssl_public_decrypt($part, $decrypted_temp, $this->public_key);
            $decrypted .= $decrypted_temp;
        }
        return $decrypted;
    }

    /*
     * 数据加签
     */
    public function sign($data)
    {
        openssl_sign($data, $sign, $this->private_key, self::RSA_ALGORITHM_SIGN);

        return url_safe_base64_encode($sign);
    }

    /*
     * 数据签名验证
     */
    public function verify($data, $sign)
    {
        $pub_id = openssl_get_publickey($this->public_key);
        $res    = openssl_verify($data, url_safe_base64_decode($sign), $pub_id, self::RSA_ALGORITHM_SIGN);

        return $res;
    }
}

function url_safe_base64_encode($data)
{
    return str_replace(array('+', '/', '='), array('-', '_', ''), base64_encode($data));
}

function url_safe_base64_decode($data)
{
    $base_64 = str_replace(array('-', '_'), array('+', '/'), $data);
    return base64_decode($base_64);
}
