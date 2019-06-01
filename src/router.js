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
      path: '/cc',
      component: ChooseCity
    },
    {
      path: '/evaluate',
      component: EvaluateIndex,
      children: [
         {
          path: '/',
          component: EvaluateAll
        },
        {
          path: '/evaluateall',
          component: EvaluateAll
        },
        {
          path: '/evaluates',
          component: EvaluateSatisfied
        },
        {
          path: '/evaluateus',
          component: EvaluateUnSatisfied
        },
        {
          path: '/evaluatehimg',
          component: EvaluateHasImg
        }
      ]
    },
    {
      path: '/business',
      component: Business
    },
    {
      path: '/p_detail',
      component: ProductDetail
    },
    {
      path: '/license',
      component: License
    }
  ]
})
