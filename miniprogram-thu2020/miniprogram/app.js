//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'selectcourse-1zg2v',
        traceUser: true,
      })
    }
    const db = wx.cloud.database();
    var that=this;
    db.collection('basicSet').get().then(res=>{
      var termBegin=res.data[0].termBegin;
      //获取当前日期对应校历的周次和星期
      var endTime = -new Date(termBegin).getTime() / 1000 + parseInt(new Date().getTime() / 1000);
      //第一个设置参数是该学期开学时间，如2019-9-9 0:0:0
      if (endTime > 0) {
        var nowTime = parseInt(endTime / 86400);
        var nowWeek = parseInt(nowTime / 7) + 1;
        console.log(nowWeek);
        var nowDay = nowTime % 7 + 1;
        console.log(nowDay);
      }
      else {
        var nowTime = parseInt(endTime / 86400);
        var nowWeek = parseInt(nowTime / 7);
        console.log(nowWeek);
        var nowDay = 7 + nowTime % 7;
        console.log(nowDay);
      }
      that.globalData.week = nowWeek;
      that.globalData.day = nowDay;
    })
  },

  globalData: {
    week:0,
    day:0,
    userIdentity:'',
    userInfo:{},
    lectureBasic:[{
      name:'实验一',
      intro:'',
      locate:'工物馆',
      done:false
    },
    {
      name: '实验二',
      intro: '',
      locate: '工物馆',
      done: false
    },
    {
      name: '实验三',
      intro: '',
      locate: '工物馆',
      done: false
    },
    {
      name: '实验四',
      intro: '',
      locate: '工物馆',
      done: false
    },
    ],
    studentInfo:[],
    lectureInfo:[]
  }

})
