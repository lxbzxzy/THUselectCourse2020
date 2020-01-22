const app = getApp()
const db = wx.cloud.database()
Page({
  data:{
    nowState:null,
    lectureCode:'',
    lectureNum: '',
    lectureInfo:[],
    studentInfo:[],
    basicInfo:{},
    week:0,
    day:0,
    dealtData:[],

    identityarray: ['全周', '第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周'],
    identityarray2: ['all', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    idindex: 0,//必须渲染一下这个要不渲染不出来
    identity1: 'all',
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex: e.detail.value,
      identity1: this.data.identityarray2[e.detail.value]
    })
  },

  transferNum: function (num) {
    if (num == 0) return 'lecture1';
    if (num == 1) return 'lecture2';
    if (num == 2) return 'lecture3';
    if (num == 3) return 'lecture4';
  },

  transferDay:function(num) {
    if (num == 1) return '一';if (num == 2) return '二';
    if (num == 3) return '三'; if (num == 4) return '四';
    if (num == 5) return '五'; if (num == 6) return '六';
    if (num == 7) return '日';
  },

  transferTime:function(num){
    if (num == 1) return '上午';
    if (num == 2) return '下午';
    if (num == 3) return '晚上';
  },

  transferCode: function (num) {
    if (num == 0) return '实验一';
    if (num == 1) return '实验二';
    if (num == 2) return '实验三';
    if (num == 3) return '实验四';
  },

  dealWithData:function(){
    var lectureInfo=this.data.lectureInfo;
    var studentInfo=this.data.studentInfo;
    var lectureNum=this.data.lectureNum;
    var dealingData=[];
    var id=0;
    for (let i in lectureInfo){
      var dealingItem = {
        id: 2011, time: '第20周周一上午',
        pastTime: false, timeUnavailable: false,
        volume:4,selected:0,week:6
      }
      id=lectureInfo[i].lectureId;
      switch (lectureNum) {
        case 'lecture1': {
          dealingItem.volume = lectureInfo[i].volume1;
          for(let j in studentInfo){
            if(studentInfo[j].lecture1==id){
              dealingItem.selected++
            }
          }
          break;
        }
        case 'lecture2': {
          dealingItem.volume = lectureInfo[i].volume2;
          for (let j in studentInfo) {
            if (studentInfo[j].lecture2 == id) {
              dealingItem.selected++
            }
          }
          break;
        }
        case 'lecture3': {
          dealingItem.volume = lectureInfo[i].volume3;
          for (let j in studentInfo) {
            if (studentInfo[j].lecture3 == id) {
              dealingItem.selected++
            }
          }
          break;
        }
        case 'lecture4': {
          dealingItem.volume = lectureInfo[i].volume4;
          for (let j in studentInfo) {
            if (studentInfo[j].lecture4 == id) {
              dealingItem.selected++
            }
          }
          break;
        }
      }
      dealingItem.id=id;
      dealingItem.week = parseInt(id / 100);
      dealingItem.time='第'+parseInt(id/100)+'周周'+this.transferDay(parseInt((id%100)/10))+this.transferTime(id%10);
      if (id / 100 < (this.data.week + 1)) { dealingItem.pastTime=true }
      else { dealingItem.pastTime = false}
      if (id == this.data.basicInfo.lecture1 || id == this.data.basicInfo.lecture2 || id == this.data.basicInfo.lecture3 || id == this.data.basicInfo.lecture4) { dealingItem.timeUnavailable = true}
      else { dealingItem.timeUnavailable = false}
      console.log(dealingItem);
      dealingData.push(dealingItem);
    }
    this.setData({dealtData:dealingData})
  },

  onLoad:function(options){
    wx.showToast({
      title: '加载中',
      duration:1500,
      icon:'loading'
    })
    this.setData({
      basicInfo: app.globalData.userInfo,
      week: app.globalData.week,
      day: app.globalData.day
    })
    var that = this;
    var num=this.transferNum(options.lectureNum);
    var code = this.transferCode(options.lectureNum);
    if (num == 'lecture1') { this.setData({ nowState: app.globalData.userInfo.lecture1})}
    else if (num == 'lecture2') { this.setData({ nowState: app.globalData.userInfo.lecture2 }) }
    else if (num == 'lecture3') { this.setData({ nowState: app.globalData.userInfo.lecture3 }) }
    else if (num == 'lecture4') { this.setData({ nowState: app.globalData.userInfo.lecture4 }) }
    this.setData({
      lectureNum:num,
      lectureCode:code
    })
    wx.cloud.callFunction({
      name:'lectureAll',
      success:function(res){
        that.setData({ lectureInfo: res.result.data })
        wx.cloud.callFunction({
          name:'studentAll',
          success:function(ret){
            that.setData({ studentInfo: ret.result.data })
            that.dealWithData();
          }
        })
      }
    })
  },
  
  dropLecture: function (e) {
    var num = e.currentTarget.dataset.index;
    var lectureId = this.data.dealtData[num].id;
    var lectureCode = this.data.lectureCode;
    var lectureNum = this.data.lectureNum;
    var that = this;
    wx.showModal({
      title: '退课提示',
      content: '您确定要退掉您在\n' + that.data.dealtData[num].time + '所上的\n“' + lectureCode + '”课吗？',
      confirmText: '确认退课',
      success: function (res) {
        if (res.confirm) {
          if (that.data.week >= parseInt(lectureId/100)) {
            wx.showModal({
              title: '提示',
              content: '已超过退课时间，不能退课',
              showCancel: false
            })
            return;
          }
          console.log('开始退课');
          wx.cloud.callFunction({
            name: 'quitLecture',
            data: {
              lecture: that.data.lectureNum,
              studentId: that.data.basicInfo.studentId
            },
            success: function () {
              switch (lectureNum) {
                case 'lecture1': app.globalData.userInfo.lecture1 = null; break;
                case 'lecture2': app.globalData.userInfo.lecture2 = null; break;
                case 'lecture3': app.globalData.userInfo.lecture3 = null; break;
                case 'lecture4': app.globalData.userInfo.lecture4 = null; break;
              }
              wx.showModal({
                title: '提示',
                content: '退课成功',
                showCancel: false,
                success:function(suc){
                  if(suc.confirm){
                    wx.switchTab({
                      url: '/pages/student/info/index',
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  
  selectLecture: function (e) {
    var num = e.currentTarget.dataset.index;
    var lectureId = this.data.dealtData[num].id;
    var lectureCode = this.data.lectureCode;
    var lectureNum = this.data.lectureNum;
    var that = this;
    wx.showModal({
      title: '选课提示',
      content: '您确定要选择\n' + that.data.dealtData[num].time + '所上的\n“' + lectureCode + '”课吗？',
      confirmText: '确认选课',
      success: function (res) {
        if (res.confirm) {
          if (that.data.week >= parseInt(lectureId / 100)) {
            wx.showModal({
              title: '提示',
              content: '本周及以前课程无法选择，请选取其他课程',
              showCancel: false
            })
            return;
          }
          console.log('开始选课');
          wx.cloud.callFunction({
            name: 'selectLecture',
            data: {
              lecture: lectureNum,
              studentId: that.data.basicInfo.studentId,
              lectureId: lectureId
            },
            success: function () {
              //再次确认提交该选课时是否存在冲突
              that.excess(lectureId);
            }
          })
        }
      }
    })
  },

  excessFalse:function(lectureId){
    console.log('确实没超');
    var lectureNum = this.data.lectureNum;
    switch (lectureNum) {
      case 'lecture1': app.globalData.userInfo.lecture1 = lectureId; break;
      case 'lecture2': app.globalData.userInfo.lecture2 = lectureId; break;
      case 'lecture3': app.globalData.userInfo.lecture3 = lectureId; break;
      case 'lecture4': app.globalData.userInfo.lecture4 = lectureId; break;
    }
    wx.showModal({
      title: '提示',
      content: '选课成功',
      showCancel: false,
      success: function (suc) {
        if (suc.confirm) {
          wx.switchTab({
            url: '/pages/student/info/index',
          })
        }
      }
    })
  },

  excessTrue:function(){
    var that=this;
    console.log('确实超了');
    var lectureNum = this.data.lectureNum;
    wx.cloud.callFunction({
      name:'quitLecture',
      data: {
        lecture: this.data.lectureNum,
        studentId: this.data.basicInfo.studentId
      },
      success:function(){
        wx.showModal({
          title: '提示',
          content: '课容量已满，请选取其他课程',
          showCancel:false,
          success:function(res){
            if(res.confirm){
              db.collection('student').orderBy('studentId', 'asc')
              .get().then(ret => {
                that.setData({ studentInfo: ret.data })
                that.dealWithData();
              })
            }
          }
        })
      }
    })
  },

  excess:function(lectureId){
    var lectureNum=this.data.lectureNum;
    if(lectureNum=='lecture1'){
      console.log('开始判断')
      db.collection('student').where({
        lecture1: lectureId
      }).count().then(res => {
        if (res.total > 4) { this.excessTrue(); return; }
        else { this.excessFalse(lectureId); return }
      })
    }
    else if (lectureNum == 'lecture2') {
      console.log('开始判断')
      db.collection('student').where({
        lecture2: lectureId
      }).count().then(res => {
        if (res.total > 4) { this.excessTrue(); return; }
        else { this.excessFalse(lectureId); return }
      })
    }
    else if (lectureNum == 'lecture3') {
      console.log('开始判断')
      db.collection('student').where({
        lecture3: lectureId
      }).count().then(res => {
        if (res.total > 4) { this.excessTrue(); return; }
        else { this.excessFalse(lectureId); return }
      })
    }
    else if (lectureNum == 'lecture4') {
      console.log('开始判断')
      db.collection('student').where({
        lecture4: lectureId
      }).count().then(res => {
        if (res.total > 4) { this.excessTrue(); return; }
        else { this.excessFalse(lectureId); return }
      })
    }

  }

  /*chooselecture:function(e){
    var index = e.currentTarget.dataset.index;
    app.globalData.lecture=this.data.lectureinfo[index].lectureId
    wx:wx.navigateTo({
      url: '/pages/student/courseinfo/index',
    })
  }*/
  
})
