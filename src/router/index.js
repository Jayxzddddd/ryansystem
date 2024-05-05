import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Test from "@/views/Test";
import MangerLogin from "@/views/MangerLogin";
import ManagerVue from "@/views/ManagerVue";
import ManagerRegister from "@/views/ManagerRegister";
import YLGYGaming from "@/views/YLGYGaming";
import GamingList from "@/views/GamingList";
import GamingHome from "@/views/GamingHome";
import UserManager from "@/views/UserManager";
import UserShowMessage from "@/views/UserShowMessage";
import GoldenGaming from "@/views/GoldenGaming";
import Reservationtest from "@/views/Reservationtest";
import BoardManager from "@/views/BoardManager";
import TCSGaming from "@/views/TCSGaming";
import UserPersonCenter from "@/views/UserPersonCenter";
import Prize from "@/views/Prize";




Vue.use(VueRouter)

const routes = [
  {path: "/",redirect:"/test"},
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/mangerLogin',
    name: 'MangerLogin',
    component: MangerLogin
  },
  {
    path: '/managerVue',
    name:'ManagerVue',
    component: ManagerVue,
    children:[
      {
        path: '/userManager',
        name: 'UserManager',
        component: UserManager
      },
      {
        path: '/userShowMessage',
        name: 'UserShowMessage',
        component: UserShowMessage
      },
      {
        path: '/boardManager',
        name: 'BoardManager',
        component: BoardManager
      }
      ]
  },
  {
    path: '/managerRegister',
    name: 'ManagerRegister',
    component: ManagerRegister
  },
  {
    path: '/gamingList',
    name: 'GamingList',
    component: GamingList,
    children:[
      {
        path: '/YLGYGaming',
        name: 'YLGYGaming',
        component: YLGYGaming
      },
      {
        path: '/gamingHome',
        name: 'GamingHome',
        component: GamingHome
      },
      {
        path: '/goldenGaming',
        name: 'GoldenGaming',
        component: GoldenGaming
      },
      {
        path: '/reservationtest',
        name: 'Reservationtest',
        component: Reservationtest
      },
      {
        path: '/tCSGaming',
        name: 'TCSGaming',
        component: TCSGaming
      },
      {
        path: '/userPersonCenter',
        name: 'UserPersonCenter',
        component: UserPersonCenter
      },
      {
        path:'/prize',
        name:'Prize',
        component: Prize
      }
      ]
  }


]

const router = new VueRouter({
  routes
})

export default router
