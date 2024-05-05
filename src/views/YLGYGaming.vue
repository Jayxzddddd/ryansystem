<template>
  <div class="BG">
    <!--    上-->
    <!--    先是上半部分大位置 然后中间放卡片 然后卡片中放方块-->
    <div class="top-box">
      <div class="card-box">
        <!--        把自己设置的left和top绑定进去-->
        <div class="card" @click="selectedCard(item,index,$event)" v-for="(item,index) in allCardList" :key="index" :style="{left:item.left,top:item.top}">
          <i :class="item.icon"></i>
        </div>
      </div>
    </div>

    <!--    下-->
    <div class="selected-card-box">
      <!--        把自己设置的left和top绑定进去-->
      <div class="selected-card" v-for="(item,index) in selectedCardList" :key="index">
        <i :class="item.icon"></i>
      </div>
    </div>

    <div class="btn">
      <el-button @click="initData()" type="primary">重新开始</el-button>
      <el-button @click="backCard()" type="primary">撤回</el-button>
    </div>


  </div>
</template>

<script>
import Prize from "@/views/Prize";

export default {
  name: "YLGYGaming",
  data(){
    return{
      // 所有待选择的卡片
      // allCardList:[
      //   {id:1,picIndex:1,icon:'el-icon-platform-eleme',left:'0px',top:'0px'},
      //   {id:2,picIndex:1,icon:'el-icon-platform-eleme',left:'50px',top:'0px'},
      // ]
      allCardList:[],
      positionList:[],//用于定位的数组
      //被选中的卡片
      selectedCardList:[],
      currentSelectedCard:{},//当前所有选中的卡片
      iconList:[
        {picIndex: 0, icon: 'el-icon-s-flag'},
        {picIndex: 1, icon: 'el-icon-platform-eleme'},
        {picIndex: 2, icon: 'el-icon-delete-solid'},
        {picIndex: 3, icon: 'el-icon-s-tools'},
        {picIndex: 4, icon: 'el-icon-user-solid'},
        {picIndex: 5, icon: 'el-icon-warning'},
        {picIndex: 6, icon: 'el-icon-picture'},
        {picIndex: 7, icon: 'el-icon-upload'},
        {picIndex: 8, icon: 'el-icon-message-solid'},
        {picIndex: 9, icon: 'el-icon-video-camera-solid'},
        {picIndex: 10, icon: 'el-icon-s-platform'}
      ],//图标设置类数组
      selectHistory:[]//记录已选择的卡片list，方便撤回操作
    }
  },
  created() {
    this.initData();
  },
  methods:{
    //初始化数据 生成所有小方块数据
    initData(){
      //清空原来的数据重新生成
      this.positionList = []
      this.allCardList = []
      this.selectedCardList = []
      this.currentSelectedCard = {}
      this.selectHistory=[]
      let left=0
      let top=0
      let initid = 0
      // 生成底部小方块（第一层）
      for(let i=0;i<7;i++){
        for(let j=0;j<7;j++){
          this.positionList.push({id:initid++,left:left+'px',top:top+'px'})
          left +=50
        }
        left=0
        top+=50
      }
      left=25
      top=25
      //第二层小方块
      for(let i=0;i<6;i++){
        for(let j=0;j<6;j++){
          this.positionList.push({id:initid++,left:left+'px',top:top+'px'})
          left +=50
        }
        left=25
        top+=50
      }

      this.createIcon()//生成随机图标
    },

    //点击卡片点击响应方法 只要点击卡片的地方就找这个方法
    selectedCard(item,index,event){
      console.log(item,index,event);
      let isHover = this.hasOverLayer(event.srcElement)
      // 如果被覆盖isHover为true
      console.log(isHover);
      if (!isHover) {
        //在选择的时候给不同的数组加值
        this.currentSelectedCard = item
        this.allCardList.splice(index, 1)
        this.selectedCardList.push(item)
        this.selectHistory.push(item)
        //让点到想同的icon时候能在底下连在一起
        this.selectedCardList.sort((a,b)=>{
          return a.picIndex -b.picIndex
        })

        //让排序和消除的动效延迟一下
        setTimeout(()=>{
          this.checkRemove()
          if (this.allCardList.length == 0) {
            alert('你赢了！现在进入奖励页面');
            this.$router.push("/prize");
          }
          if (this.selectedCardList.length >= 7) {
            alert('你输了！')
            //修复输了底边未清空的情况
            this.initData()
          }
        },200)

      }


    },
    //判断是否可以三个一样的然后消除方法
    checkRemove(){
      let num=0
      this.selectedCardList.forEach(item=>{
        if(this.currentSelectedCard.icon==item.icon){
          num++
        }
      })
      if(num==3){
        this.selectedCardList=this.selectedCardList.filter(item=>{
          return item.icon != this.currentSelectedCard.icon
        })
        this.selectHistory=this.selectHistory.filter(item=>{
          return item.icon != this.currentSelectedCard.icon
        })
      }
    },
    // 监测元素是否被覆盖(后面的不能点击)
    hasOverLayer(element) {
      let document = element.ownerDocument,
          rect = element.getBoundingClientRect(), // 获取目标的矩形信息
          x = rect.x,
          y = rect.y,
          width = rect.width,
          height = rect.height;
      x |= 0;
      y |= 0;
      width |= 0;
      height |= 0;
      // 四顶点取样
      let elements = [
        document.elementFromPoint(x+1, y+1),
        document.elementFromPoint(x + width-1, y+1),
        document.elementFromPoint(x+1, y + height-1),
        document.elementFromPoint(x + width-1, y + height-1)
      ];
      // 判断非本身及非子孙元素
      return elements.filter((el)=> el !== null).some((el)=> el !== element && !element.contains(el));
    },
    //生成随机图标
    createIcon(){
      this.allCardList = []
      let index =0
      let random = 0
      // i为生成几个 然后三个一组排
      for (let i = 0; i < 3; i++) {
        if (i%3==0) {
          random = Math.floor(Math.random()*11)
        }
        this.allCardList.push({
          id:index++,
          icon:this.iconList[random].icon,
          picIndex:this.iconList[random].picIndex
        })
      }
      this.allCardList.sort(()=>{
        // 大于5返回1反则为-1
        return Math.random() >0.5? 1:-1
      })
      //防止点撤回id乱序导致重新排序
      this.allCardList.forEach((item, index)=>{
        item.id = index
      })


      // 本来一堆随机生成的图标堆在一起 然后改一下left和top值就可以 随机位置方法
      let pos = 0
      this.allCardList.forEach(item=>{
        pos = Math.floor(Math.random()*85)
        item['left'] = this.positionList[pos].left
        item['top'] = this.positionList[pos].top
        if (pos > 84) {
          pos = 0
        }
      })

      // // 循环堆叠
      // let pos = 0
      // this.allCardList.forEach(item=>{
      //   item['left'] = this.positionList[pos].left
      //   item['top'] = this.positionList[pos].top
      //   pos++
      //   if (pos > 84) {
      //     pos = 0
      //   }
      // })

      console.log(this.allCardList);
    },
    //撤回功能
    backCard(){
      console.log(this.selectHistory);
      if(this.selectHistory.length==0){
        alert("没有可以撤回的卡片啦！")
      }
      else if(this.selectHistory.length>=0){
        let backItem = this.selectHistory[this.selectHistory.length - 1]
        this.allCardList.push(backItem)
        this.allCardList.sort((a,b)=>{
          return a.id-b.id
        })
        this.selectHistory = this.selectHistory.filter(item=>{
          return item.id != backItem.id
        })
        this.selectedCardList = this.selectedCardList.filter(item=>{
          return item.id != backItem.id
        })
      }
    }

  }
}
</script>

<style scoped>
.BG{
  background:url("../image/YLGYBG.jpg");
  height: 961px;
}
.top-box{
  width: 100%;
  height: 700px;
}
.card-box{
  width: 350px;
  height: 100%;
  background:url("../image/羊了个羊card背景图.jpg");
  background-size: 100% 100%;
  border-radius: 10px;
  /*实现居中*/
  margin: 0 auto;
  position: relative;
}
/*上半部分的图标*/
.card{
  width: 48px;
  height: 48px;
  line-height: 48px;
  border: 1px solid #666;
  text-align: center;
  position: absolute;
  background-color: white;
  /*给图标加个阴影*/
  box-shadow: 0px 0px 6px 0px #545454;
  font-size: 36px;
}
/*下面放置卡片的框框*/
.selected-card-box{
  width: 350px;
  height: 50px;
  background:url("../image/羊了个羊底部选中栏图片.jpg");
  background-size: 100% 100%;
  margin: 0 auto;
}
/*所选择的图标*/
.selected-card{
  width: 48px;
  height: 48px;
  line-height: 48px;
  border: 1px solid #666;
  text-align: center;
  background-color: white;
  /*一行展示*/
  display: inline-block;
  font-size: 36px;
}
.btn{
  margin: 0 auto;
  width: 350px;
  text-align: center;
  margin-top:24px;
}
/*//给图标做颜色*/
.el-icon-s-flag {
  color: #aa0000;
}
.el-icon-platform-eleme {
  color: #005500;
}
.el-icon-delete-solid {
  color: #aa5500;
}
.el-icon-s-tools {
  color: #aaaa00;
}
.el-icon-user-solid {
  color: #000000;
}
.el-icon-warning {
  color: #316394;
}
.el-icon-picture {
  color: #00007f;
}
.el-icon-upload {
  color: #760000;
}
.el-icon-message-solid {
  color: #9a004d;
}
.el-icon-video-camera-solid {
  color: #ffaa7f;
}
.el-icon-s-platform {
  color: #848441;
}
</style>