const app = getApp()
const db = wx.cloud.database()
Page({
  data:{
    week:0,
    day:0,
    dayShow:'',
    time1:'',time2:'',time3:'',time4:'',
    basicInfo:{}
  },

  transferDay: function (num) {
    if (num == 1) return '一'; if (num == 2) return '二';
    if (num == 3) return '三'; if (num == 4) return '四';
    if (num == 5) return '五'; if (num == 6) return '六';
    if (num == 7) return '日';
  },

  transferTime: function (num) {
    if (num == 1) return '上午';
    if (num == 2) return '下午';
    if (num == 3) return '晚上';
  },

  translateTime:function(lectureId){
    var lecWeek = parseInt((lectureId % 10000) / 100);
    var lecDay = this.transferDay(parseInt((lectureId % 100) / 10));
    var lecTime = this.transferTime(lectureId % 10);
    return lecWeek + '周周' + lecDay + lecTime
  },

  onShow:function(){
    this.setData({
      basicInfo:app.globalData.userInfo,
      week:app.globalData.week,
      day:app.globalData.day
    })
    this.setData({dayShow:this.transferDay(this.data.day)})
    this.setData({
      time1: this.data.basicInfo.lecture1 == null ? false : this.translateTime(this.data.basicInfo.lecture1),
      time2: this.data.basicInfo.lecture2 == null ? false : this.translateTime(this.data.basicInfo.lecture2),
      time3: this.data.basicInfo.lecture3 == null ? false : this.translateTime(this.data.basicInfo.lecture3),
      time4: this.data.basicInfo.lecture4== null ? false : this.translateTime(this.data.basicInfo.lecture4),
    })
    console.log(this.data.basicInfo)
  },

  updatePassword:function(){
    wx.navigateTo({
      url: '/pages/function/password/index',
    })
  },

  quit:function(){
    wx.redirectTo({
      url: '/pages/login/index',
    })
  },

  selectLecture1: function (e) {
    wx.navigateTo({url: '/pages/student/selectcourse/index?lectureNum=' + 0,})
  },
  selectLecture2: function (e) {
    wx.navigateTo({ url: '/pages/student/selectcourse/index?lectureNum=' + 1, })
  },
  selectLecture3: function (e) {
    wx.navigateTo({ url: '/pages/student/selectcourse/index?lectureNum=' + 2, })
  },
  selectLecture4: function (e) {
    wx.navigateTo({ url: '/pages/student/selectcourse/index?lectureNum=' + 3, })
  },
  gradeLecture1:function(){
    wx.showModal({
      title: '提示',
      content: '成绩尚未公布',
      showCancel:false
    })
  },
  gradeLecture2: function () {
    wx.showModal({
      title: '提示',
      content: '成绩尚未公布',
      showCancel: false
    })
  },
  gradeLecture3: function () {
    wx.showModal({
      title: '提示',
      content: '成绩尚未公布',
      showCancel: false
    })
  },
  gradeLecture4: function () {
    wx.showModal({
      title: '提示',
      content: '成绩尚未公布',
      showCancel: false
    })
  }
  
})
