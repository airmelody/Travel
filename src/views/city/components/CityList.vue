<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onActivated,
  onUpdated,
  getCurrentInstance
} from 'vue'

import BScroll from 'better-scroll'
import { useCityStore } from '@/stores/city'
// import { useRouter } from 'vue-router'

const props = defineProps({
  hot: Array,
  cities: Object,
  letter: String
})

const { proxy } = getCurrentInstance()
const $router = proxy.$router

// const router = useRouter()

const currentCity = useCityStore()

const handleCityClick= city => {
  currentCity.changeCity(city)
  $router.push('/')
  // router.push('/')
}

const refArr = []
const setItemRef = el => {
  if (el) {
    refArr.push(el)
  }
}

const letters = computed(() => {
  // return Object.keys(props.cities)
  const letters = []
  for (let i in props.cities) {
    letters.push(i)
  }
  return letters
})

const findIndex = letter => {
  return letters.value.findIndex(item => item === letter)
}

watch(() => props.letter, (newX) => {
  if (newX) {
    const element = refArr[findIndex(newX)]
    scroll.scrollToElement(element)
  }
})

const wrapper = ref(null)
let scroll = null

onMounted(() => {
  scroll = new BScroll(wrapper.value, {
    mouseWheel: true,
    click: true
  })
})

onActivated(() => {
  scroll.refresh()
})

onUpdated(() => {
  scroll.refresh()
})
</script>

<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{currentCity.name}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item of props.hot"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div
        class="area"
        v-for="(item, key) of props.cities"
        :key="key"
        :ref="setItemRef"
      >
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div
            class="item border-bottom"
            v-for="innerItem of item"
            :key="innerItem.id"
            @click="handleCityClick(innerItem.name)"
          >
            {{innerItem.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .border-topbottom
    &:before
      border-color: #ccc
    &:after
      border-color: #ccc
  .border-bottom
    &:before
      border-color: #ccc
  .list
    overflow: hidden
    position: absolute
    top: 1.58rem
    left: 0
    right: 0
    bottom: 0
    .title
      line-height: .54rem
      background: #eee
      padding-left: .2rem
      color: #666
      font-size: .26rem
    .button-list
      overflow: hidden
      padding: .1rem .6rem .1rem .1rem
      .button-wrapper
        float: left
        width: 33.33%
        .button
          margin: .1rem
          padding: .1rem 0
          text-align: center
          border: .02rem solid #ccc
          border-radius: .06rem
    .item-list
      .item
        line-height: .76rem
        padding-left: .2rem
</style>
