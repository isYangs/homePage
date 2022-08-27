/*
    作者: isYangs
    版本: 1.0.0
    主页: https://xuewuzhibu.cn
    Github: https://github.com/isyangs
    信息: 开发不易，请勿删除此片段，版权所有
    提示: 本文件请不要随意删除，否则会导致无法运行
*/
let socialLink = {
  github: {
    title: "github",
    link: "",
  },
  qq: {
    title: "qq",
    link: "https://wpa.qq.com/msgrd?v=3&uin=",
    link_1: "&site=qq&menu=yes",
  },
  wechat: {
    title: "wechat",
    link: "./img/wechat.png",
  },
  email: {
    title: "email",
    link: "mailto:",
  },
  telegram: {
    title: "telegram",
    link: "https://t.me/",
  },
  weibo: {
    title: "weibo",
    link: "https://weibo.com/u/",
  },
  twitter: {
    title: "twitter",
    link: "https://twitter.com/",
  },
  facebook: {
    title: "facebook",
    link: "https://facebook.com/",
  },
};
let newsocialLink = [];
let socialLinkData = [];
let socialInfo = [];
let socialData = [];
let linkDateInfo1 = [];
let linkDateInfo2 = [];
let icpInfo = [];
let newIcpInfo = [];

function getSet() {
  axios
    .get("./setting.json")
    .then((res) => {
      // 页面头部信息
      document.querySelector("title").innerHTML = res.data.title;
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", res.data.description);
      document
        .querySelector('meta[name="keywords"]')
        .setAttribute("content", res.data.keywords);
      document
        .querySelector('link[rel="icon"]')
        .setAttribute("href", res.data.logo_img);
      // 页面内容信息
      //document.querySelector('#loading-title').innerHTML = res.data.author + '&nbsp;个人主页';
      document
        .querySelector(".logo")
        .firstElementChild.setAttribute("src", res.data.logo_img);
      document.querySelector(".title").firstElementChild.innerHTML =
        res.data.title_text_1;
      if (
        document.querySelector(".title").firstElementChild.innerHTML.length > 7
      )
        document.querySelector(".title").firstElementChild.style.fontSize =
          "3.5rem";
      document.querySelector(".title").lastElementChild.innerHTML =
        res.data.title_text_2;
      document.querySelector(".message-text").firstElementChild.innerHTML =
        res.data.dec_text_title;
      document.querySelector(".message-text").lastElementChild.innerHTML =
        res.data.dec_text_content;
      const social = res.data.social_icon;
      const linkDate1 = res.data.link_1;
      const linkDate2 = res.data.link_2;
      const icpData = res.data.icp;
      getTraverseData(social, linkDate1, linkDate2, icpData);
      createElement();
      setSocialContact(); // 调用设置社交联系函数
      document.querySelector("#power-text").innerHTML = res.data.copyright_text;
      document.querySelector("#social-item");
    })
    .catch((err) => {
      console.error(err);
    });
}

// 创建元素渲染函数
function createElement() {
  const social_item = document.querySelector("#social-item");
  social_item.innerHTML = "";
  for (let i = 0; i < socialData.length; i++) {
    const socialItem = document.createElement("a");
    if (socialData[i].title === "qq") {
      socialItem.setAttribute(
        "href",
        socialLinkData[i].link + socialData[i].link + socialLinkData[i].link_1
      );
    } else if (socialData[i].title !== "wechat") {
      socialItem.setAttribute(
        "href",
        socialLinkData[i].link + socialData[i].link
      );
      socialItem.setAttribute("target", "_blank");
    }
    socialItem.className = `${socialLinkData[i].title}-btn`;
    socialItem.id = socialLinkData[i].title;
    if (socialData[i].title === "email") {
      socialItem.innerHTML = `<i class="fas fa-envelope"></i>`;
    } else if (socialData[i].title !== "wechat") {
      socialItem.innerHTML = `<i class="fab fa-${socialLinkData[i].title}"></i>`;
    } else {
      socialItem.innerHTML = `<i class="fab fa-weixin"></i>
                  <div class="wechat-img" id="wechat-img" style="transform: scale(0)">
                      <img src="${socialLinkData[i].link}" />
                  </div>`;
    }
    social_item.appendChild(socialItem);
  }
  const link_1 = document.querySelector("#link-1");
  link_1.innerHTML = "";
  for (let i = 0; i < linkDateInfo1.length; i++) {
    const webItem = document.createElement("a");
    webItem.setAttribute("href", linkDateInfo1[i].link);
    webItem.setAttribute("target", "_blank");
    webItem.className = `link-url link-url-${i}`;
    webItem.innerHTML = `<i class="${linkDateInfo1[i].icon}"></i>
            <span>${linkDateInfo1[i].text}</span>`;
    link_1.appendChild(webItem);
  }
  const link_2 = document.querySelector("#link-2");
  link_2.innerHTML = "";
  for (let i = 0; i < linkDateInfo2.length; i++) {
    const webItem = document.createElement("a");
    webItem.setAttribute("href", linkDateInfo2[i].link);
    webItem.setAttribute("target", "_blank");
    webItem.className = `link-url link-url-${i}`;
    webItem.innerHTML = `<i class="${linkDateInfo2[i].icon}"></i>
            <span>${linkDateInfo2[i].text}</span>`;
    link_2.appendChild(webItem);
  }
  const icpItem = document.querySelector("#icp-item");
  const icpItemText = document.createElement("a");
  const icpStr = newIcpInfo[0].text;
  // 提取icp字符串中的数字
  const icpNum = icpStr.match(/\d+/g);
  if (newIcpInfo[0].title === "ICP") {
    icpItemText.setAttribute("href", "https://beian.miit.gov.cn/");
  }
  icpItemText.setAttribute("href", `https://icp.gov.moe/?keyword=${icpNum[0]}`);
  icpItemText.setAttribute("target", "_blank");
  icpItemText.id = "permit";
  icpItemText.innerHTML = `${newIcpInfo[0].text}`;
  icpItem.appendChild(icpItemText);
}
