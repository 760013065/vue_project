import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'


import List from "@/views/employeeManagement/list";


import Plan from "@/views/trainingManagement/plan";
import Application from "@/views/trainingManagement/application";

import Profile from "@/views/profile/profile";

import proList from "@/views/projectManagement/proList";
import company from "@/views/systemManagement/company";
import empHome from "@/views/EmpHome";
import applicationSend from "@/views/emp/applicationSend";
import empProfile from "@/views/emp/empProfile";
import taskList from "@/views/emp/taskList";
import trainingList from "@/views/emp/trainingList";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/empHome',
      name: 'EmpHome',
      component: empHome,
      hidden: true
    },{
      path: '/empHome',
      name: 'Personal profile',
      component: empHome,
      hidden: true,
      children:[
        {
          path: '/empProfile',
          name: 'profile',
          component: empProfile
        }
      ]
    },{
      path: '/empHome',
      name: 'Training',
      component: empHome,
      hidden: true,
      children:[
        {
          path: '/trainingList',
          name: 'plans',
          component: trainingList
        },{
          path: '/trainingApps',
          name: 'application',
          component: applicationSend
        }
      ]
    },{
      path: '/empHome',
      name: 'Project',
      component: empHome,
      hidden: true,
      children:[
        {
          path: '/taskList',
          name: 'tasks',
          component: taskList
        }
      ]
    },

    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden:true
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      hidden:true
    },{
      path: '/home',
      name: 'employee management',
      component: Home,
      icon:"el-icon-user-solid",
      children:[{
        path: '/empList',
        name: 'employee list',
        component: List
      }

      ]
    },{
      path: '/home',
      name: 'training management',
      component: Home,
      icon: "el-icon-school",
      children:[{
        path: '/application',
        name: 'training application',
        component: Application
      },{
        path: '/plan',
        name: 'training plan',
        component: Plan
      }]
    },{
      path: '/home',
      name: 'project management',
      component: Home,
      icon: "el-icon-collection",
      children:[{
        path: '/proList',
        name: 'project list',
        component: proList
      }]
    },{
      path: '/home',
      name: 'personal profile',
      component: Home,
      icon: "el-icon-user",
      children:[{
        path: '/profile',
        name: 'profile',
        component: Profile
      }]
    },{
      path: '/home',
      name: 'System management',
      component: Home,
      icon: "el-icon-setting",
      children:[{
        path: '/company',
        name: 'company info',
        component: company
      }]
    }
    
  ]
})
