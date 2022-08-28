/*
    作者: isYangs
    版本: 1.0.0
    博客: https://xuewuzhibu.cn
    Github: https://github.com/isyangs
    信息: 开发不易，请勿删除此片段，版权所有
    提示: 本文件请不要随意删除，否则会导致无法运行
*/
// 初始化时间函数
function initTime() {
  // 创建获取当前时间函数
  function getTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const week = date.getDay();
    const weekArr = ["日", "一", "二", "三", "四", "五", "六"];
    // 防止时分秒只有一位数
    const hourStr = hour < 10 ? "0" + hour : hour;
    const minuteStr = minute < 10 ? "0" + minute : minute;
    const secondStr = second < 10 ? "0" + second : second;
    const nowDate = `${year}年${month}月${day}日 星期${weekArr[week]}`;
    const nowTime = `${hourStr}:${minuteStr}:${secondStr}`;
    return {
      nowDate,
      nowTime,
      year,
    };
  }
  getTime();
  // 将nowDate、nowWeek、nowTime添加到页面中
  const toDay = document.querySelector("#now-day");
  const toTime = document.querySelector("#now-time");
  const toYear = document.querySelector("#present");
  setInterval(() => {
    toDay.innerHTML = getTime().nowDate;
    toTime.innerHTML = getTime().nowTime;
  }, 500);
  toYear.innerHTML = `${getTime().year} &nbsp;`;
}
