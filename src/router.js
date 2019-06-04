import Vue from 'vue'
import Router from 'vue-router'
//choosecity
import ChooseCity from './components/ChooseCity'
//evaluate
import EvaluateIndex from './components/EvaluateIndex'
import EvaluateAll from './components/evaluate/All'
import EvaluateSatisfied from './components/evaluate/Satisfied'
import EvaluateUnSatisfied from './components/evaluate/Unsatisfied'
import EvaluateHasImg from './components/evaluate/HasImg'

//Business
import Business from './components/Business'
//product_detail
import ProductDetail from './components/ProductDetail'
//license
import License from './components/License'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ChooseCity
    },
    {
      path: '/cc/:city',
      component: ChooseCity
    },
    {
      path: '/evaluate/:store_id',
      component: EvaluateIndex,
      children: [
         {
          path: '/evaluate/:store_id',
          component: EvaluateAll,
        },
        {
          path: '/evaluate/:store_id/evaluateall',
          component: EvaluateAll,
        },
        {
          path: '/evaluate/:store_id/evaluates',
          component: EvaluateSatisfied
        },
        {
          path: '/evaluate/:store_id/evaluateus',
          component: EvaluateUnSatisfied
        },
        {
          path: '/evaluate/:store_id/evaluatehimg',
          component: EvaluateHasImg
        }
      ]
    },
    {
      path: '/business/:store_id',
      component: Business
    },
    {
      path: '/p_detail/:store_id/:goods_id/:member_id?',
      component: ProductDetail
    },
    {
      path: '/license',
      component: License
    }
  ]
})
