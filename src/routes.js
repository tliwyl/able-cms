import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Reset from './views/Reset.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import SubmitInfo from './views/inline_pages/SubmitInfo.vue'
import SubmitInfoList from './views/inline_pages/SubmitInfoList.vue'
import SubmitedInfoReview from './components/SubmitedInfoReview.vue'
//新增店铺/学校 
import AddMerchantInfo from './views/inline_pages/AddMerchantInfo.vue'
//新增物料
import AddPartsNew from './views/inline_pages/AddParts_new.vue'
//新增物料列表
import AddPartsList from './views/inline_pages/AddPartsList.vue'

import MerchantJoin from './views/inline_pages/MerchantJoin.vue'
import MerchantJoinInputInfo from './views/inline_pages/MerchantJoinInputInfo.vue'
import AddParts from './views/inline_pages/AddParts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/reset',
        component: Reset,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Login,
        name: '',
        hidden: true,
        redirect:'/login'
    },
    {
        path: '/mec',
        component: Home,
        name: '商户操作',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/MerchantJoin', component: MerchantJoin, name: '商户入驻申请',redirect:'/merchantJoinInputInfo',children:[
                {
                    path:'/submitedInfoReview',
                    component:SubmitedInfoReview,
                    name:'查看提交信息',
                    hidden:true
                },
                {
                    path:'/merchantJoinInputInfo',
                    component:MerchantJoinInputInfo,
                    name:'信息录入',
                    hidden:true
                }
            ]
            },
            {
                path: '/submitInfo', component: SubmitInfo, name: '信息提交',redirect:'/submitInfoList',
                children: [
                    {
                        path: '/submitInfoList',
                        component: SubmitInfoList,
                        name: '信息列表',
                    },
                    {
                        path: '/addMerchantInfo',
                        component: AddMerchantInfo,
                        name: '添加店铺信息',
                        hidden: true
                    }
                ]
            },
            {
                path: '/AddParts', component: AddParts, name: '物料提交',redirect:'/addPartsList',
                children: [
                    {
                        path: '/addPartsNew',
                        component: AddPartsNew,
                        name: '新增物料',
                        hidden: true
                    },
                    {
                        path: '/addPartsList',
                        component: AddPartsList,
                        name: '物料列表',
                        hidden: true
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;