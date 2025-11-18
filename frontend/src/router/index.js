import { createRouter, createWebHistory } from 'vue-router'
import CustomerList from '../views/CustomerList.vue'
import AddCustomer from '../views/AddCustomer.vue'
import EditCustomer from '../views/EditCustomer.vue'
import ViewCustomer from '../views/ViewCustomer.vue'

const routes = [
  {
    path: '/',
    name: 'CustomerList',
    component: CustomerList
  },
  {
    path: '/add',
    name: 'AddCustomer',
    component: AddCustomer
  },
  {
    path: '/edit/:id',
    name: 'EditCustomer',
    component: EditCustomer
  },
  {
    path: '/view/:id',
    name: 'ViewCustomer',
    component: ViewCustomer
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
