var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// 异步请求方法封装

// var baseUrl = 'http://www.sunsur.cn/TMFac-dev/public/index.php/zb02tmnews_usufe/'; // 服务器接口地址前缀
// var baseUrl = 'http://192.168.0.113/TMFac-dev/Public/index.php/zb02tmnews_usufe/'; // 本地接口地址前缀
//var baseUrl = 'http://www.sunsur.cn/thinkphp5/public/index.php/zb02tmnews_usufe/'; // 测试服务器地址
var baseUrl = 'http://review.360tianma.com/lza01xwmk_vbfyu/'; // 测试服务器地址

function $ajax_post(url, data, callback) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


  console.log(baseUrl + url);
  console.log(JSON.stringify(data));
  console.log(config.hideLoading);

  !config.hideLoading && api.showProgress({
    title: '',
    text: '努力加载中...',
    modal: true
  });

  api.ajax({
    url: '' + baseUrl + url,
    method: 'post',
    /* headers: {
      'sobeytm-http-site': 'news',
      'sobeytm-http-component': 'zb02tmnews_usufe',
      'sobeytm-http-token': 'ABC123456'
    }, */
    data: {
      values: _extends({}, data)
    }
  }, function (ret, err) {
    api.hideProgress();
    if (ret) {
      console.log(JSON.stringify(ret));
      if (ret.code === 200) {
        callback(ret.data);
      } else {
        api.toast({
          msg: ret.msg,
          duration: 2000,
          location: 'bottom'
        });
      }
    } else {
      alert('错误码：' + err.code + '；网络状态码：' + err.statusCode);
      console.log(JSON.stringify(err));
      // api.alert({
      //   msg: '错误码：' + err.code + '；网络状态码：' + err.statusCode
      // });
    };
  });
}

function $ajax_get(url, data, callback) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


  var _str = '';
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      _str += key + '=' + data[key] + '&';
    }
  }
  var values = _str.substring(0, _str.length - 1);

  console.log('' + base + url + '?' + values);

  !config.hideLoading && api.showProgress({
    title: '',
    text: '努力加载中...',
    modal: true
  });

  api.ajax({
    url: '' + base + url + '?' + values,
    method: 'get'
  }, function (ret, err) {
    api.hideProgress();
    if (ret) {
      console.log(JSON.stringify(ret));
      // if (ret.result === 0) {
      //   callback(ret.data);
      // } else {
      //   api.toast({
      //     msg: ret.message,
      //     // msg: ret.msg,
      //     duration: 2000,
      //     location: 'bottom'
      //   });
      // }
    } else {
      api.alert({
        msg: '错误码：' + err.code + '；网络状态码：' + err.statusCode
        // msg: ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
      });
    };
  });
}
