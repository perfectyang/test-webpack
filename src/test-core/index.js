import {reactive, effect} from './reactivity'


const state = reactive({
  name: 'aaa',
  list: [
    'bbb'
  ]
})
effect(() => {
  console.log(state.name)

})



console.log(state.name)
state.name = 'zf'