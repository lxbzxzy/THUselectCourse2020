const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    mode:'add',
    identityarray: ['添加','删除'],
    identityarray2: ['lecture1', 'lecture2', 'lecture3', 'lecture4'],
    idindex:0,//必须渲染一下这个要不渲染不出来
    identity:'lecture1',
    input1: '学号',
    input2:'',
    input3:'',
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex: e.detail.value
    })
  },

  deleteStudent:function(){
    var that=this;
    wx.showModal({
      title: '提醒',
      content: '确定要删除学生吗',
      success:function(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name:'deleteStudent',
            data:{
              studentId:that.data.input1
            },
            success:function(){
              wx.cloud.callFunction({
                name:'deletePassword',
                data:{
                  studentId: that.data.input1
                },
                success:function(){
                  wx.showModal({
                    title: '提示',
                    content: '删除学生成功',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({})
                      }
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  add: function () {
    var that = this;
    wx.showModal({
      title: '提醒',
      content: '确定要添加学生吗',
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'addStudent',
            data: {
              studentId: that.data.input1,
              studentName:that.data.input2,
              className: that.data.input3,
            },
            success: function () {
              wx.cloud.callFunction({
                name: 'addPassword',
                data: {
                  studentId: that.data.input1,
                  studentName: that.data.input2,
                },
                success: function () {
                  wx.showModal({
                    title: '提示',
                    content: '添加学生成功',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({})
                      }
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },

})
