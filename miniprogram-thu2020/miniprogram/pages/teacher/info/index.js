const app = getApp()
const db = wx.cloud.database()
Page({
  data:{
    basicInfo:{}
  },
  onLoad:function(){
    this.setData({basicInfo:app.globalData.userInfo})
  },

  updatePassword: function () {
    wx.navigateTo({
      url: '/pages/function/password/index',
    })
  },

  quit:function(){
    wx.redirectTo({
      url: '/pages/login/index',
    })
  },

  time:function(){
    wx.navigateTo({
      url: '/pages/teacher/time/time',
    })
  },

  studentBasic: function () {
    wx.navigateTo({
      url: '/pages/teacher/student/index',
    })
  },

  specialSelect: function (e) {
    wx.navigateTo({
      url: '/pages/teacher/specialselect/index?mode=select',
    })
  },

  specialQuit: function (e) {
    wx.navigateTo({
      url: '/pages/teacher/specialselect/index?mode=quit',
    })
  },

  studentEdit: function (e) {
    wx.navigateTo({
      url: '/pages/teacher/studentedit/index',
    })
  },
  
})
