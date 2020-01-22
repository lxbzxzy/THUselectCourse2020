const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    input1: '',
    input2: '',
    input3: '',
    name: ''
  },
  onLoad:function(){
  },

  input1: function (e) {
    this.setData({ input1: e.detail.value })
  },
  input2: function (e) {
    this.setData({ input2: e.detail.value })
  },
  input3: function (e) {
    this.setData({ input3: e.detail.value })
  },

  changePassword:function(){
    var that=this;
    if(this.data.input2!=this.data.input3){
      wx.showModal({
        title: '错误提示',
        content: '两次密码不一致，请重新输入',
        showCancel:false
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认修改密码?',
      success: function () {
        var id;
        if(app.globalData.userIdentity!='student'){
          id = app.globalData.userInfo.teacherId;
        }
        else{
          id=app.globalData.userInfo.studentId;
        }
        var oldPassword=that.data.input1;
        var newPassword = that.data.input2;
        wx.cloud.callFunction({
          name:'updatePassword',
          data:{
            id:id,
            oldPassword:oldPassword,
            newPassword:newPassword
          },
          success:function(result){
            var successCode=result.result.stats.updated;
            if(successCode==0){
              wx.showModal({
                title: '错误提示',
                content: '初始密码错误，请重新输入',
                showCancel: false
              })
              return;
            }
            else{
              wx.showModal({
                title: '提示',
                content: '密码修改成功',
                showCancel: false,
                success:function(){
                  wx.navigateBack({})
                }
              })
            }
          }
        })
      }
    })
  },

  quit:function(){
    wx.navigateBack({
      
    })
  }
  
})
