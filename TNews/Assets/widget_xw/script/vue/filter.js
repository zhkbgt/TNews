Vue.filter('time', function (value) {
  var date = new Date(value * 1000);

  var y = date.getFullYear();
  var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
});

Vue.filter('interval-time', function (value) {
  var date = new Date(value * 1000),
    now = new Date().getTime(),
    res = '';
  var timestamp = date.getTime();

  var y = date.getFullYear();
  var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  var timestap = Math.floor((now - timestamp) / 1000); // 时间差, 单位s
  // console.log(timestap)

  if (timestap < 3600) {
    // 1小时内
    res += Math.floor(timestap / 60) > 0 ? Math.floor(timestap / 60) + '分钟前' : '刚刚';
  } else if (timestap >= 3600 && timestap < 86400) {
    // 1天内
    var h = Math.floor(timestap / 3600);
    // console.log(h)
    res += h + '小时前';
  } else if (timestap >= 86400) {
    // 大于等于1天
    var day = Math.floor(timestap / 86400);

    if (day === 1) {
      res += '昨天';
    } else if (day < 4) {
      res += day + '天前';
    } else if (day >= 4 && day < 365) {
      // 超过4天，按格式 MM-DD 返回日期
      res += m + '-' + d;
    } else if (day >= 365) {
      // 超过1年，按格式 YYYY-MM-DD 返回日期
      res += y + '-' + m + '-' + d;
    }
  }

  return res;
});

Vue.filter('interval-time2', function (value) {
  var date = new Date(value * 1000).getTime();
  var now = new Date().getTime();
  var res = '';

  var timestap = Math.floor((now - date) / 1000); // 时间差, 单位s
  // console.log(timestap)

  if (timestap < 3600) {
    // 1小时内
    res += Math.floor(timestap / 60) > 0 ? Math.floor(timestap / 60) + '分钟前' : '刚刚';
  } else if (timestap >= 3600 && timestap < 86400) {
    // 1天内
    var h = Math.floor(timestap / 3600);
    // console.log(h)
    res += h + '小时前';
  } else if (timestap >= 86400) {
    // 大于等于1天
    var day = Math.floor(timestap / 86400);

    if (day === 1) {
      res += '昨天';
    } else if (day < 30) {
      res += day + '天前';
    } else if (day >= 30 && day < 365) {
      res += Math.floor(day / 30) + '个月前';
    } else if (day >= 365) {
      res += Math.floor(day / 365) + '年前';
    }
  }

  return res;
});

Vue.filter('duration-time', function (value) {
  var time = Number(value),
    _re1;

  var h = Math.floor(time / 3600);
  _re1 = time % 3600;
  var m = Math.floor(_re1 / 60);
  var s = _re1 % 60;

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  if (h === '00') {
    return m + ':' + s;
  } else {
    return h + ':' + m + ':' + s;
  }
});

Vue.filter('M/D-time', function (value) {
  // 按格式 MM/DD 返回时间
  var date = new Date(value * 1000);

  var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return m + '/' + d;
});

Vue.filter('Y/M/D-time', function (value) {
  // 按格式 YYYY/MM/DD 返回时间
  var date = new Date(value * 1000);

  var y = date.getFullYear();
  var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return y + '/' + m + '/' + d;
});

Vue.filter('M/D/h/m-time', function (value) {
  // 按格式 MM/DD hh:mm 返回时间
  var date = new Date(value * 1000);

  var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

  return m + '/' + d + ' ' + h + ':' + min;
});

Vue.filter('deadline', function (value) {
  // 传入时间戳，与当前时间比较，判断是否已到
  var now = new Date().getTime(),
    timestamp = now - value * 1000;

  if (timestamp >= 0) {
    return '已结束';
  } else {
    timestamp = Math.abs(timestamp);
    var day = Math.ceil(timestamp / (1000 * 60 * 60 * 24));
    // console.log(day)

    return day;
  }
});

Vue.filter('views', function (value) {
  // 浏览量，播放量，评论数等数量的简化
  var num = Number(value);
  var res = '';

  if (num < 1000) {
    res += num;
  } else if (num >= 1000 && num < 10000) {
    res += (num / 1000).toFixed(1) + 'k';
  } else if (num >= 10000) {
    res += (num / 10000).toFixed(1) + 'w';
  }

  return res;
});