<template>
  <div class="game">
    <div class="game-div">
      <div class="game-min">
        <div v-for="(e, i) in frame" :key="i" class="row">
          <p v-for="(b, j) in e" :key="j" class="element" :style="{ background: b.bg }">
          </p>
        </div>
      </div>
      <div class="right-div">
        <div>
          <p>得分</p>
          <p>{{                  score                  }}</p>
        </div>
        <div>
          <p>等级</p>
          <p>{{                  level                  }}</p>
        </div>
        <div>
          <p>吃</p>
          <p>{{                  times                  }}</p>
        </div>
        <div class="ztks" @click="autMove()">
          暂停/开始
        </div>
      </div>
    </div>
    <div class="control">
      <p @click="moveTop()">向上</p>
      <div class="lr">
        <p @click="moveLeft()">向左</p>
        <p @click="moveRight()">向右</p>
      </div>
      <p @click="moveBottom()">向下</p>
    </div>
  </div>
</template>

<script>
import { color } from "@/utils/ykdata"
export default {
  name: "TCSGaming",
  data() {
    return {
      row: 20,
      col: 20,//列
      frame: [],//界面
      bg: "#eee",//默认背景色
      snake: {},//蛇
      food: {},//食物
      color: color[0],
      over: false,
      timer: '',
      speed: 600,//速度
      fx: 0,//方向：0左，1右，2上，3下
      times: 0,//吃
      level: 1,//等级
      score: 0,//得分
      site:0,//食物位置

    }
  },
  methods: {
    //游戏框架
    gameFrame() {
      for (let i = 0; i < this.row; i++) {
        let a = [];
        for (let j = 0; j < this.col; j++) {
          let b = {
            bg: this.bg,
          };
          a.push(b);
        }
        this.frame.push(a);
      }
    },

    //初始化蛇
    initSnake() {
      this.snake = {
        site: [9, 8, 9, 9, 9, 10],
        color: this.color[6],
      }
      this.renderBlock(this.snake, this.frame, 1);
    },

    //方块渲染
    //a:方块，b:渲染的位置,n类型：0清除，1渲染
    renderBlock(a, b, n) {
      let c = a.site;
      if (n == 1) {
        //渲染
        for (let i = 0; i < c.length; i += 2) {
          b[c[i]][c[i + 1]].bg = a.color;
        }
      } else if (n == 0) {
        for (let i = 0; i < c.length; i += 2) {
          b[c[i]][c[i + 1]].bg = this.bg;
        }
      }
    },

    //食物
    initFood() {
      this.sfood();
      let site = this.site;
      let color = this.color[Math.floor(Math.random() * 7)]
      this.food = { site, color };
      this.renderBlock(this.food, this.frame, 1);
    },
    //食物点
    sfood(){
      this.site = [Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
      for(let i=0;i<this.snake.site.length;i+=2){
        if(this.snake.site[i]== this.site[0] && this.snake.site[i+1]== this.site[1]){
          this.sfood();
        }
      }
    },

    //蛇身运动
    move() {
      //当地一个移动后，后面的依次转化为前面坐标
      for (let i = this.snake.site.length - 1; i > 1; i -= 2) {
        this.snake.site[i] = this.snake.site[i - 2];
        this.snake.site[i - 1] = this.snake.site[i - 3];
      }
    },
    //向左
    moveLeft() {
      if (!this.over && this.fx != 1) {
        this.fx = 0;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.renderBlock(this.snake, this.frame, 0);
          this.eat(this.snake.site[0], this.snake.site[1] - 1);
          this.move();
          this.snake.site[1]--;
          if (this.snake.site[1] < 0) {
            this.over = true;
            console.log('撞墙了')
            this.snake.site[1]++;
            this.oneself();
            clearInterval(this.timer);
          }
          this.renderBlock(this.snake, this.frame, 1);
        }, this.speed)

      }
    },
    //向右
    moveRight() {
      if (!this.over && this.fx != 0) {
        this.fx = 1;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.renderBlock(this.snake, this.frame, 0);
          this.eat(this.snake.site[0], this.snake.site[1] + 1);
          this.move();
          this.snake.site[1]++;
          if (this.snake.site[1] >= this.col) {
            this.over = true;
            console.log('撞墙了')
            this.snake.site[1]--;
            this.oneself();
            clearInterval(this.timer);
          }
          this.renderBlock(this.snake, this.frame, 1);
        }, this.speed)
      }
    },
    //向上
    moveTop() {
      if (!this.over && this.fx != 3) {
        this.fx = 2;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.renderBlock(this.snake, this.frame, 0);
          this.eat(this.snake.site[0] - 1, this.snake.site[1]);
          this.move();
          this.snake.site[0]--
          if (this.snake.site[0] < 0) {
            this.over = true;
            console.log('撞墙了')
            this.snake.site[0]++;
            this.oneself();
            clearInterval(this.timer);
          }
          this.renderBlock(this.snake, this.frame, 1);
        }, this.speed)
      }
    },
    //向下
    moveBottom() {
      if (!this.over && this.fx != 2) {
        this.fx = 3;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.renderBlock(this.snake, this.frame, 0);
          this.eat(this.snake.site[0] + 1, this.snake.site[1]);
          this.move();
          this.snake.site[0]++
          this.oneself();
          if (this.snake.site[0] >= this.row) {
            this.over = true;
            console.log('撞墙了')
            this.snake.site[0]--;
            clearInterval(this.timer);
          }
          this.renderBlock(this.snake, this.frame, 1);
        }, this.speed)
      }
    },
    //碰到自己
    oneself() {
      //拿当前头部来与身体对比
      let t = [this.snake.site[0], this.snake.site[1]];
      for (let i = this.snake.site.length - 1; i > 1; i -= 2) {
        if (this.snake.site[i] == t[1] && this.snake.site[i - 1] == t[0]) {
          clearInterval(this.timer);
          this.over = true;
          console.log('碰到自己了')
        }
      }
    },
    //吃
    eat(i, j) {
      if (i == this.food.site[0] && j == this.food.site[1]) {
        //从蛇头部插入该点
        this.snake.site.unshift(this.food.site[0], this.food.site[1]);
        //重新生成下一个食物
        this.initFood();

        //吃次数 
        this.times++;

        let lev = Math.floor(this.times / 10) + 1;

        if (lev > this.level) {
          this.level = lev;
          //计算速度
          if (this.level < 15) {
            //20级内用简单的减法
            this.speed = 600 - (this.level - 1) * 40;
          } else {
            //当大于该等级速度不变
            this.speed = 30;
          }
          clearInterval(this.timer);
          this.autMove();
        }
        //计算分数
        this.score += this.level * 100;

      }

    },
    //自动移动
    autMove() {
      if (this.timer) {
        //暂停
        clearInterval(this.timer);
        this.timer = '';
      } else {
        //移动
        if (this.fx == 0) {
          this.moveLeft();
        } else if (this.fx == 2) {
          this.moveTop();
        } else if (this.fx == 1) {
          this.moveRight();
        } else {
          this.moveBottom();
        }
      }
    }
  },
  mounted() {
    this.gameFrame();
    this.initSnake();
    this.initFood();
    this.autMove();
  }

}
</script>

<style lang="less" scoped>
.game {
  background:url("../image/TCSBG.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
  p {
    padding: 0;
    margin: 0;
  }

  .game-div {
    display: flex;

    .game-min {
      transform: translateX(700px) translateY(50px);
      .row {
        display: flex;
        padding-bottom: 1px;

        .element {
          height: 12px;
          width: 12px;
          margin-right: 1px;
        }
      }
    }

    .right-div {
      padding-left: 12px;
      transform: translateX(700px) translateY(50px);

      .ztks {
        margin-top: 20px;
        line-height: 40px;
        padding: 0 8px;
        background: #eee;
        cursor: pointer;
      }
    }
  }

  .control {
    width: 260px;
    padding-top: 20px;

    p {
      transform: translateX(700px) translateY(50px);
      margin: 10px;
      padding: 8px;
      background: #eee;
      cursor: pointer;
      text-align: center;
      min-width: 90px;
    }

    .lr {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>