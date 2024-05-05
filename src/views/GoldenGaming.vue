<template>
  <div style="width: 100%;height: 600px"  class="bg">
    <div id="goldarea" style="width: 100%;height:500px;position: relative">
      <!--      ui部分-->
      <div style="float: left;top: 10px;left: 10px;font-size: 40px;color: darkorange;">
        总得分:{{this.score}}<br>
        连击数:{{this.combo}}<br>
        <!--        通关所用点击次数:{{this.count}}-->
      </div>
      <!--      金币部分-->
      <div class="gold" v-for="(item,index) in goldenList" :key="index" :style="{left:item.x+'px',top:item.y+'px'}">
        <i class="el-icon-aim"></i>
      </div>
    </div>
    <!--    玩家部分-->
    <div id="playerarea" style="position: relative">
      <el-button :style='{width: 60+"px", background:selectbutton[0]?selectedstyle:unselectedstyle,left:400+"px",position: "absolute"}' @click="changePosition(-1)"  icon="el-icon-coin"></el-button>
      <el-button :style='{width: 60+"px", background:selectbutton[1]?selectedstyle:unselectedstyle,left:490+"px",position: "absolute"}' @click="changePosition(0)"  icon="el-icon-coin"></el-button>
      <el-button :style='{width: 60+"px", background:selectbutton[2]?selectedstyle:unselectedstyle,left:590+"px",position: "absolute"}' @click="changePosition(1)"  icon="el-icon-coin"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoldenGaming",
  data(){
    return{
      nowPosition:0,
      playerPositions:[
        {index:-1,x:-500},
        {index:0,x:0},
        {index:1,x:500}
      ],
      goldenList:[],
      score:0,
      combo:0,
      // count:0,
      currInterval:0,
      timer:'',
      selectedstyle:'gold',
      unselectedstyle:'lightgoldenrodyellow',
      selectbutton:[
        false,true,false
      ]
    }

  },
  methods:{
    //初始化游戏
    initgame(){
      this.score=0;
      this.combo=0;
      // this.count=0;
      this.nowPosition=0;
      this.goldenList=[];
      this.timer=setInterval(()=>{this.step()},41);//设置帧数
      this.currInterval=0;
      this.select=[false,true,false]
    },
    //不断下落并判定检测得分，重新生成金币
    step(){
      this.currInterval++;
      //金币生成
      if(this.goldenList.length<6&&this.currInterval>20){
        this.goldCreate();
        this.currInterval=0;
      }

      //移动&判断触底金币
      let deleteItem = false;
      this.goldenList.forEach(item=>{
        item.y+=15;//降落速度
        if(item.y>=500){

          if(item.index==this.nowPosition){
            this.combo++;
            this.score+=(1+0.2*this.combo)*30;
            // if(this.score >= 5000 || this.combo==15){
            //   this.$alert("恭喜您挑战成功,您仅仅用"+String(this.count)+"次点击就完成了关卡", '挑战成功！')
            //   this.score=0
            //   this.combo=0
            //   this.count=0
            // }
          }else {
            this.combo=0;
          }
          deleteItem=true;
          console.log(this.goldenList);
        }
      })
      //在遍历外执行保证遍历不会出错
      if(deleteItem){
        this.goldenList.splice(0,1);
        deleteItem=false;
      }

    },
    //金币生成
    goldCreate(){
      // this.goldenList.push({index:Math.floor(Math.random()*3)-1,x:index*(-500),y:0});
      let index1=Math.floor(Math.random()*3)-1;
      let x1=500+eval(index1)*100;
      let y1=0;
      this.goldenList.push({index:index1,x:x1,y:y1});
    },
    changePosition(index){
      this.nowPosition=index;
      for(var i=0;i<3;i++){
        if(i==index+1)this.selectbutton[i]=true;
        else this.selectbutton[i]=false;
      }
      this.selectbutton[index+1]=true
      // this.count = this.count+1
      this.step();
    },
  },
  created(){
    this.initgame();
  },
  mounted() {
    if(this.timer){
      this.step();
    }
  }
}
</script>

<style scoped>
.gold{
  width: 25px;
  height: 25px;
  transform: translateX(-20px);
  position: absolute;
}
.bg{
  background:url("../image/goldenbg.jpg");
}
.el-icon-aim {
  background:url("../image/goldicon.png")  center no-repeat;;

}
.el-icon-aim:before {
  content: "\8d3a";
  font-size: 100px;
  visibility: hidden;
}
</style>