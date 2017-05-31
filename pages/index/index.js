var RSA = require('../../utils/wxapp_rsa.js')

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')

    var privateKey_pkcs1 = '-----BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQCk7WKdggwBOtteLL5sPom8RYCjuw0hy6R1jH39tCaep1Dns02bi4CYHk2dSR / t0ABgF5pHYeMxHa74Dp6Z6SjfAKMUu53BbTR615ehK + 03BjtzJzviTF1 / NtLmGaR3aawrDp7oQgq33dfIYbWLuAMkHNiWaoXaGyHh3a8jS2vxfQIDAQABAoGAIKRnLzts + tVWU5ZRfgUGp7 + tzToZSEYQ378VtJ / yQNZmueUQCCgdJH5i6C1v51aSrHIfc99Y4wC3/ 5qNI3M1RlRpIakmcaiEv1m6huDPLKFq6Y1e+ AZ0Cb0xo3bny + VTOvfGgcAdSa6++K47bGaxyKzwGeNZQkltm5sgbVcKvkECQQDVjWbSU8P8nDb+TP5Aqr + DaMVA425wv2ra2jhxd6KqKxgHHB7yYWlODiYNrtALOEG9zfSpHVQWhZpiKq8XcWwRAkEAxbWzPAqZxaZ / XTs65uCL0 + iqif0qCSDUNis61wYm2UwOh4LqBZIFop94B3ybEXbCvUl0v26H0fgXjFUErvlKrQJBAKjbAe5U5accLi + t2WxwlrXlZfME4hKsiGU8H10455n+ MSWOCrpEY + ugLF6tVztH5FOcQlRmKFMWmRf + ACxdNsECQDBjkEKZtZkSbwm6fWgUfSSYRWUQeUFSr52yZuxJrShx3Px9phlG6 + opbY8niCx2DKOXXuObgdJ6DglipYrNqOECQQCndP + zU / jwlvjQzEabKdP05uFc5JV6ySFBQwuoENbEvW3uz + Yz31xDYbrwIzrysVDovlj0ExL6LC + JRvpJmHcN-----END RSA PRIVATE KEY-----'
    var publicKey_pkcs1 = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCk7WKdggwBOtteLL5sPom8RYCjuw0hy6R1jH39tCaep1Dns02bi4CYHk2dSR / t0ABgF5pHYeMxHa74Dp6Z6SjfAKMUu53BbTR615ehK + 03BjtzJzviTF1/ NtLmGaR3aawrDp7oQgq33dfIYbWLuAMkHNiWaoXaGyHh3a8jS2vxfQIDAQAB-----END PUBLIC KEY-----'


    // 加签
    var sign_rsa = new RSA.RSAKey(); 
    sign_rsa = RSA.KEYUTIL.getKey(privateKey_pkcs1); 
    console.log('签名RSA:')
    console.log(sign_rsa)
    var hashAlg = 'sha1';
    var hSig = sign_rsa.signString("signData", hashAlg); 
    hSig = RSA.hex2b64(hSig); // hex 转 b64
    console.log("签名结果：" + hSig)

    // 验签
    var verify_rsa = new RSA.RSAKey();
    verify_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
    console.log('验签RSA:')
    console.log(verify_rsa)
    hSig = RSA.b64tohex(hSig)
    var ver = verify_rsa.verifyString("signData", hSig) 
    console.log('验签结果：' + ver)

    // 加密
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
    console.log('加密RSA:')
    console.log(encrypt_rsa)
    var encStr = encrypt_rsa.encrypt('123456')
    encStr = RSA.hex2b64(encStr);
    console.log("加密结果：" + encStr)

    // 解密
    var decrypt_rsa = new RSA.RSAKey();
    decrypt_rsa = RSA.KEYUTIL.getKey(privateKey_pkcs1);
    console.log('解密RSA:')
    console.log(decrypt_rsa)
    encStr = RSA.b64tohex(encStr)
    var decStr = decrypt_rsa.decrypt(encStr)
    console.log("解密结果：" + decStr)

    





    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
