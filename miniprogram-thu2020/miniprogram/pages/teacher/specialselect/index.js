const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    mode:'select',
    identityarray: ['实验一', '实验二', '实验三', '实验四'],
    identityarray2: ['lecture1', 'lecture2', 'lecture3', 'lecture4'],
    idindex:0,//必须渲染一下这个要不渲染不出来
    identity:'lecture1',
    input1: '学号',
    input2: 0,
    showpicmode:'展示',
    showpic:false,
  },

  input1: function (e) {
    this.setData({ input1: e.detail.value })
  },

  input2: function (e) {
    this.setData({ input2: e.detail.value })
  },

  onLoad:function(option){
    this.setData({
      mode:option.mode
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex: e.detail.value,
      identity: this.data.identityarray2[e.detail.value]
    })
  },

  quit:function(){
    var that=this;
    wx.showModal({
      title: '提醒',
      content: '确定要手动退课吗',
      success:function(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name:'quitLecture',
            data:{
              lecture:that.data.identity,
              studentId:that.data.input1
            },
            success:function(){
              wx.showModal({
                title: '提示',
                content: '手动退课成功',
                showCancel:false,
                success:function(res){
                  if(res.confirm){
                    wx.navigateBack({})
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  select: function () {
    var that = this;
    wx.showModal({
      title: '提醒',
      content: '确定要手动选课吗，提示：为满足特殊需求，手动选课没有设置时间和课容量限制，请选择后检查一下时间和课容量',
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'selectLecture',
            data: {
              lecture: that.data.identity,
              studentId: that.data.input1,
              lectureId:parseInt(that.data.input2)
            },
            success: function () {
              wx.showModal({
                title: '提示',
                content: '手动选课成功',
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
      }
    })
  }

})
