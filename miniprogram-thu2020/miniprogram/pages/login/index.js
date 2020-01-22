const app = getApp()
const db = wx.cloud.database()
Page({
  onShareAppMessage: function () {
    return {
      title: '实验选课界面',
      path: '/pages/login/index'
    }
  },

  data:{
    input1:'',
    input2:'',
    input3:'',
    wxId:'',
    wxlogin:false,
    name:''
  },
  //输入框函数
  input1:function(e){
    this.setData({input1:e.detail.value})
  },
  input2: function (e) {
    this.setData({input2: e.detail.value })
  },
  input3: function (e) {
    this.setData({ input3: e.detail.value })
  },
  //先确认微信登录
  onLoad:function(){
    wx.showToast({
      title: '查询中',
      icon:'loading',
      duration:500
    })
    var that=this;//回调中不能使用this
    wx.cloud.callFunction({
      name:'directLogin',
      success: function (res) {
        console.log(res);
        if(res.result.data.length!=0){
          app.globalData.userIdentity = 'student';
          app.globalData.userInfo=res.result.data[0];
          that.setData({
            wxlogin:true,
            name: res.result.data[0].studentName
          })
        }
        else {
          wx.cloud.callFunction({
            name: 'directLogin2',
            success: function (ret) {
              console.log(ret);
              if (ret.result.data.length != 0) {
                app.globalData.userIdentity = 'teacher';
                app.globalData.userInfo = ret.result.data[0]
                that.setData({
                  wxlogin: true,
                  name: ret.result.data[0].teacherName
                })
              }
            }
          })
        }
      }
    })
  },

  login:function(){
    wx.showToast({
      title: '查询中',
      icon: 'loading',
      duration: 800
    })
    var that = this;
    wx.cloud.callFunction({
      name:'checkpassword',
      data:{
        input1: this.data.input1,
        input2: this.data.input2,
        input3: this.data.input3
      },
      success:function(res){
        console.log(res);
        if (res.result.data.length == 0) {
          wx.showToast({
            title: '请重新输入',
            icon:'loading',
            duration:800
          })
        }
        else{
          var detail=res.result.data[0];
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          })
          if(detail.identity=='student'){
            app.globalData.userIdentity = 'student';
            db.collection('student').where({
              studentId:detail.idNumber
            }).get().then(resdata=>{
              app.globalData.userInfo = resdata.data[0];
              console.log(resdata.data[0]);
              console.log('start register');
              wx.cloud.callFunction({
                name: 'registerOpenId',
                data: {
                  studentId: detail.idNumber
                },
                success: function () {
                  console.log("jump");
                  wx.switchTab({
                    url: '/pages/student/info/index',
                  })
                },
                fail: console.error
              })
            })
          }
          else if (detail.identity == 'teacher') {
            app.globalData.userInfo=detail
            app.globalData.userIdentity = 'teacher';
            wx.cloud.callFunction({
              name: 'registerOpenId2',
              data: {
                teacherId: detail.idNumber
              },
              success: function () {
                console.log("jump");
                wx.redirectTo({
                  url: '/pages/teacher/info/index',
                })
              },
              fail: console.error
            })
          }
        }
      }
    })
  },

  wxlogin:function(){
    if(app.globalData.userIdentity=='student'){
      wx.switchTab({
        url: '/pages/student/info/index',
      })
    }
    if (app.globalData.userIdentity == 'teacher'){
      wx.redirectTo({
        url: '/pages/teacher/info/index',
      })
    }
  },

  debind:function(){
    var that=this;
    if(app.globalData.userIdentity =='student'){
      console.log('studentDebind')
      var studentIdTemp = app.globalData.userInfo.studentId;
      wx.cloud.callFunction({
        name:'debindOpenId',
        data:{
          studentId: studentIdTemp
        },
        success:function(){
          app.globalData.userInfo = {};
          app.globalData.userIdentity = '';
          that.setData({
            wxlogin: false
          })
        }
      })
    }
    else if (app.globalData.userIdentity == 'teacher') {
      console.log('teacherDebind')
      var teacherIdTemp = app.globalData.userInfo.teacherId;
      wx.cloud.callFunction({
        name: 'debindOpenId2',
        data: {
          teacherId: teacherIdTemp
        },
        success: function () {
          app.globalData.userInfo = {};
          app.globalData.userIdentity = '';
          that.setData({
            wxlogin: false
          })
        }
      })
    }
  }

})
