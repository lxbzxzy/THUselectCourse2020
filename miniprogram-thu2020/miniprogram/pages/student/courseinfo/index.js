const app = getApp()
const db = wx.cloud.database()
Page({
  data:{
    week:0,
    day:0,
    dayShow:'',
    basicInfo: {},
    lectureBasic:[]
  },

  transferNum:function(num){
    if (num == 0) return 'lecture1';
    if (num == 1) return 'lecture2';
    if (num == 2) return 'lecture3';
    if (num == 3) return 'lecture4';
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

  onShow:function(){
    this.setData({
      week: app.globalData.week,
      day: app.globalData.day,
      basicInfo: app.globalData.userInfo,
    })
    this.setData({dayShow:this.transferDay(this.data.day)})
    app.globalData.lectureBasic[0].done = (this.data.basicInfo.lecture1 == null ? false : true);
    app.globalData.lectureBasic[1].done = (this.data.basicInfo.lecture2 == null ? false : true);
    app.globalData.lectureBasic[2].done = (this.data.basicInfo.lecture3 == null ? false : true);
    app.globalData.lectureBasic[3].done = (this.data.basicInfo.lecture4 == null ? false : true);
    this.setData({ lectureBasic: app.globalData.lectureBasic})
  },

  dropCourse:function(e){
    var num = e.currentTarget.dataset.index;
    var lectureId=0;
    switch(num){
      case 0: lectureId = this.data.basicInfo.lecture1;break;
      case 1: lectureId = this.data.basicInfo.lecture2; break;
      case 2: lectureId = this.data.basicInfo.lecture3; break;
      case 3: lectureId = this.data.basicInfo.lecture4; break;
    };
    var lectureCode=this.transferNum(num);
    console.log(lectureId);
    var lecWeek=parseInt((lectureId%10000)/100);
    console.log(lecWeek);
    var lecDay = this.transferDay(parseInt((lectureId % 100) / 10));
    console.log(lecDay);
    var lecTime = this.transferTime(lectureId %10);
    console.log(lecTime);
    var that=this;
    wx.showModal({
      title: '退课提示',
      content: '您确定要退掉您在\n第' + lecWeek + '周周' + lecDay + lecTime +'所上的\n“'+this.data.lectureBasic[num].name+'”课吗？',
      confirmText:'确认退课',
      success:function(res){
        if(res.confirm){
        if(that.data.week>=lecWeek){
          wx.showModal({
            title: '提示',
            content: '已超过退课时间，不能退课',
            showCancel:false
          })
          return;
        }
        console.log('开始退课');
        wx.cloud.callFunction({
          name:'quitLecture',
          data:{
            lecture:lectureCode,
            studentId:that.data.basicInfo.studentId
          },
          success:function(){
            switch(lectureCode){
              case 'lecture1':app.globalData.userInfo.lecture1=null;break;
              case 'lecture2': app.globalData.userInfo.lecture2 = null; break;
              case 'lecture3': app.globalData.userInfo.lecture3 = null; break;
              case 'lecture4': app.globalData.userInfo.lecture4 = null; break;
            }
            wx.showModal({
              title: '提示',
              content: '退课成功',
              showCancel: false
            })
            console.log('reload')
            that.onShow();
          } 
        })
      }
      }
    })
  },

  selectPage:function(e){
    var num = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/student/selectcourse/index?lectureNum='+num,
    })
  }
  
})
