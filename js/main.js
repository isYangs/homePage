/*
    作者: isYangs
    版本: 1.0.0
    主页: https://xuewuzhibu.cn
    Github: https://github.com/isyangs
    信息: 开发不易，请勿删除此片段，版权所有
    提示: 本文件请不要随意删除，否则会导致无法运行
*/

function main() {
  initTime(); // 调用初始化时间函数
  getWeather(); // 调用获取天气函数
  // 获取天气
  // 请前往 https://lbs.amap.com/ 申请key
  // 请前往 https://dev.qweather.com/ 申请 key
  function getWeather() {
    axios
      .get("https://restapi.amap.com/v3/ip?", {
        params: {
          key: "71e5f908c5606e1d259ff109f9ab6347", // 获取当前地址的key
        },
      })
      .then((res) => {
        const str = res.data.city;
        const city = str.replace(/市/, "");
        const cityText = document.querySelector("#city-text");
        cityText.innerHTML = `${city}&nbsp;`;
        axios
          .get("https://geoapi.qweather.com/v2/city/lookup?", {
            params: {
              location: city,
              key: "c75017cad2364ba7baff76bbb26c1793", // 获取城市信息的key
            },
          })
          .then((res) => {
            const cityId = res.data.location[0].id;
            axios
              .get("https://devapi.qweather.com/v7/weather/now?", {
                params: {
                  key: "c75017cad2364ba7baff76bbb26c1793", // 获取天气的key
                  location: cityId,
                },
              })
              .then((res) => {
                const weather = res.data.now.text;
                const temp = res.data.now.temp;
                const windDir = res.data.now.windDir;
                const windScale = res.data.now.windScale;
                const weatherText = document.querySelector("#weather-text");
                const tempText = document.querySelector("#temp-text");
                const windText = document.querySelector("#wind-text");
                weatherText.innerHTML = `${weather}&nbsp;`;
                tempText.innerHTML = `${temp}°C&nbsp;`;
                windText.innerHTML = `${windDir}&nbsp;${windScale}级`;
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  getHitokoto(); // 调用获取一言函数
  // 获取一言
  function getHitokoto() {
    axios
      .get("https://v1.hitokoto.cn/")
      .then((res) => {
        const hitokoto = res.data.hitokoto;
        const textSource = res.data.from;
        const hitokotoText = document.querySelector("#hitokoto-text");
        const textSourceText = document.querySelector("#text-source");
        hitokotoText.innerHTML = hitokoto;
        textSourceText.innerHTML = textSource;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// 遍历数据的函数
function getTraverseData(social, linkDate1, linkDate2, icpData) {
  // 将对象转换为数组
  for (const key in social) {
    socialInfo.push(social[key]);
  }
  // 将对象转换为数组
  for (const key in socialLink) {
    newsocialLink.push(socialLink[key]);
  }
  // 将对象转换为数组
  for (const key in linkDate1) {
    linkDateInfo1.push(linkDate1[key]);
  }
  // 将对象转换为数组
  for (const key in linkDate2) {
    linkDateInfo2.push(linkDate2[key]);
  }
  // 将对象转换为数组
  for (const key in icpData) {
    icpInfo.push(icpData[key]);
  }
  // 循环遍历数组，将结果返回给新的数组
  socialInfo.forEach((item) => {
    // 判断status是否为true
    if (item.status) {
      socialData.push(item);
    }
  });
  socialData.forEach((item) => {
    newsocialLink.forEach((item2) => {
      if (item.title === item2.title) {
        socialLinkData.push(item2);
      }
    });
  });
  icpInfo.forEach((item) => {
    if (item.status) {
      newIcpInfo.push(item);
    }
  });
}

// 创建设置socialContact的函数
function setSocialContact() {
  const socialContact = document.querySelector("#social");
  const linkText = document.querySelector("#link-text");
  const github = document.querySelector("#github");
  const qq = document.querySelector("#qq");
  const wechat = document.querySelector("#wechat");
  const email = document.querySelector("#email");
  const telegram = document.querySelector("#telegram");
  const weibo = document.querySelector("#weibo");
  const twitter = document.querySelector("#twitter");
  const facebook = document.querySelector("#facebook");
  const wechatImg = document.querySelector("#wechat-img");
  let link_text = "这里可以联系我"; // 设置link-text的默认值

  socialContact.addEventListener("mouseover", function () {
    linkText.style.opacity = "1";
  });
  socialContact.addEventListener("mouseout", function () {
    linkText.style.opacity = "0";
  });
  socialContact.addEventListener("mouseout", function () {
    linkText.innerHTML = link_text;
  });
  for (let i = 0; i < socialData.length; i++) {
    if (socialData[i].title === "wechat") {
      wechat.addEventListener("mouseover", function () {
        wechatImg.style.transform = "scale(1)";
      });
      wechat.addEventListener("mouseout", function () {
        wechatImg.style.transform = "scale(0)";
      });
      wechat.addEventListener("mouseover", function () {
        linkText.innerHTML = "扫一扫加我";
      });
    }
    if (socialData[i].title === "github") {
      github.addEventListener("mouseover", function () {
        linkText.innerHTML = "去GitHub看看";
      });
    }
    if (socialData[i].title === "qq") {
      qq.addEventListener("mouseover", function () {
        linkText.innerHTML = "有啥事吗";
      });
    }
    if (socialData[i].title === "email") {
      email.addEventListener("mouseover", function () {
        linkText.innerHTML = "发邮件给我";
      });
    }
    if (socialData[i].title === "telegram") {
      telegram.addEventListener("mouseover", function () {
        linkText.innerHTML = "懂的都懂~";
      });
    }
    if (socialData[i].title === "weibo") {
      weibo.addEventListener("mouseover", function () {
        linkText.innerHTML = "来微博看看嘛~";
      });
    }
    if (socialData[i].title === "twitter") {
      twitter.addEventListener("mouseover", function () {
        linkText.innerHTML = "你懂吧！";
      });
    }
    if (socialData[i].title === "facebook") {
      facebook.addEventListener("mouseover", function () {
        linkText.innerHTML = "哔哔哔~电报";
      });
    }
  }
}
