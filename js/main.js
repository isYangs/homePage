/*
    作者: isYangs
    版本: 1.0.0
    博客: https://xuewuzhibu.cn
    Github: https://github.com/isyangs
    信息: 开发不易，请勿删除此片段，版权所有
    提示: 本文件请不要随意删除，否则会导致无法运行
*/

function main() {
  // 页面加载完成后执行
  window.onload = function () {
    // 延迟2秒后将加载动画移除
    setTimeout(() => {
      clearLoading();
    }, 2000);
  };

  getSet(); // 调用自定义设置
  initTime(); // 调用初始化时间函数
  getWeather(); // 调用获取天气函数
  getHitokoto(); // 调用获取一言函数

  setTimeout(() => {
    document.querySelector("#loading-text").innerHTML =
      "加载字体和文件需要一定时间";
  }, 1000);

  const getDataState = document
    .querySelector("#loading")
    .getAttribute("data-state");
  setTimeout(() => {
    if (Boolean(getDataState)) {
      document.querySelector("#loading-text").innerHTML =
        "原因：<br />1、当前网速可能较慢<br />2、远端服务器响应较慢";
    }
  }, 10000);

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

  // 禁止页面选中
  document.onselectstart = function () {
    return false;
  };

  // 设置一言点击自动刷新
  const leftCard = document.querySelector(".left-card");
  let leftHitCount = 0;
  leftCard.addEventListener("click", () => {
    leftHitCount++;
    // 判断leftHitCount是否大于5，如果是则不刷新
    if (leftHitCount > 2) {
      getPopup("手速过快，过一会再试试吧！");
      setTimeout(() => {
        leftHitCount = 0;
      }, 10000);
    } else {
      getPopup("正在刷新一言");
      getHitokoto();
    }
  });

  // 设置天气点击刷新
  const rightCard = document.querySelector(".right-card");
  let rightHitCount = 0;
  rightCard.addEventListener("click", () => {
    rightHitCount++;
    // 判断rightHitCount是否大于1，如果是则不刷新
    if (rightHitCount > 1) {
      getPopup("手速过快，过一会再试试吧！");
      setTimeout(() => {
        rightHitCount = 0;
      }, 10000);
    } else {
      getPopup("正在刷新当前天气");
      getWeather();
    }
  });
}

let welcomeText;
axios
  .get("./setting.json")
  .then((res) => {
    welcomeText = res.data.author;
  })
  .catch((err) => {
    console.error(err);
  });

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

// 清除加载动画
function clearLoading() {
  const loading = document.querySelector("#loading");
  loading.className = "loading";
  loading.setAttribute("data-state", "false");
  document.querySelector("#bg-img").style.filter = "blur(0px)";
  loading.style.zIndex = "-999";
  welcomePopup(`欢迎访问${welcomeText}的个人主页`);
}

// 显示弹窗
function getPopup(text) {
  const popup = document.querySelector(".popup");
  const popupElemNum = popup.children.length;
  if (popupElemNum < 3) {
    const popupBox = document.createElement("div");
    popupBox.id = "popup-box-default";
    setTimeout(() => {
      popupBox.id = "popup-box-entrance";
    }, 100);
    popupBox.className = "popup-box";
    popupBox.innerHTML = `<span>${text}</span>`;
    popup.appendChild(popupBox);
    setTimeout(() => {
      popupBox.id = "popup-box-exit";
    }, 6000);
    setTimeout(() => {
      popupBox.remove();
    }, 6500);
  }
}
