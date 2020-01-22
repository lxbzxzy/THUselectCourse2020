const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    identityarray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    idindex:0,//必须渲染一下这个要不渲染不出来
    identity1:1,
    identityarray2: ['一', '二', '三', '四', '五', '六', '日'],
    identityarray20: [1, 2, 3, 4, 5, 6, 7],
    idindex2: 0,//必须渲染一下这个要不渲染不出来
    identity2: 1,
    identityarray3: ['上午', '下午', '晚上'],
    identityarray30: [1, 2, 3],
    idindex3: 0,//必须渲染一下这个要不渲染不出来
    identity3: 1,
    
  },

  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex: e.detail.value,
      identity1: this.data.identityarray[e.detail.value]
    })
  },
  
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex2: e.detail.value,
      identity2: this.data.identityarray20[e.detail.value]
    })
  },

  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.identityarray[e.detail.value])
    this.setData({
      idindex3: e.detail.value,
      identity3: this.data.identityarray30[e.detail.value]
    })
  },

  submit:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认要添加课程吗？',
      success:function(re){
        if(re.confirm){
          wx.cloud.callFunction({
            name: 'addLecture',
            data: {
              lectureId: parseInt(that.data.identity1 * 100 + that.data.identity2 * 10 + that.data.identity3),
              volume1: 4,
              volume2: 4,
              volume3: 4,
              volume4: 4
            },
            success: function (res) {
              wx.showModal({
                title: '提示',
                content: '添加课程成功',
                showCancel: false,
                success: function (ret) {
                  if (ret.confirm) {
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
