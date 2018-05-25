<template>
  <div id="app" :class="getTheme">
    <n-header @tools="changePages"></n-header>
    <section class="container" :class="{'hide': table}">
      <n-add></n-add>
      <n-list></n-list>
      <n-sidebar :is-show="tools"
                 @clearDialog="clearData"
                 @uploadData="uploadData"
                 @openTable="table = true; tools = false"
                 @openTheme="theme = true; tools = false"
      ></n-sidebar>
    </section>
    <transition name="dialog">
      <n-dialog v-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog>
    </transition>
    <n-table @deldialog="delData" :is-show="table" @close="table = false"></n-table>
    <n-theme :is-show="theme" @close="theme = false"></n-theme>
  </div>
</template>

<script>
import nHeader from './components/header.vue'
import nTheme from './components/theme.vue'
import nSidebar from './components/sidebar.vue'
import nDialog from './components/dialog.vue'
import nAdd from './components/add.vue'
import nList from './components/list.vue'
import nTable from './components/table.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    'n-header': nHeader,
    'n-theme': nTheme,
    'n-sidebar': nSidebar,
    'n-dialog': nDialog,
    nAdd,
    nList,
    nTable
  },
  data () {
    return {
      theme: false,
      table: false,
      tools: false,
      dialog: false,
      dialog_type: '',
      tips: '',
      del_info: {
        index: 0,
        id: 0
      }
    }
  },
  computed: mapGetters([
    'getTheme'
  ]),
  methods: {
    changePages () {
      if (this.table) {
        this.table = !this.table
      } else if (this.theme) {
        this.theme = !this.theme
      } else {
        this.tools = !this.tools
      }
    },
    clearData () {
      this.tools = false
      this.dialog = true
      this.dialog_type = 'clear'
      this.tips = '清空后无法恢复，确认清空吗？'
    },
    delData (index, id) {
      this.dialog = true
      this.dialog_type = 'del'
      this.tips = '删除后无法恢复，确认删除吗？'
      this.del_info = {
        index: index,
        id: id
      }
    },
    uploadData () {
      this.tools = false
      this.dialog = true
      this.dialog_type = 'upload'
      this.tips = 'upload'
    },
    sureDialog () {
      const self = this
      switch (self.dialog_type) {
        case 'clear':
          self.$store.dispatch('clear_event')
          self.$toast('清空数据成功')
          break
        case 'del':
          self.$store.dispatch('del_event', self.del_info)
          self.$toast('删除成功')
          break
      }
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" ref="stylesheet/scss">
  html, body, ul, li, input, p{
    margin:0;
    padding:0;
  }
  body{
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
  }
  input, button{
    -webkit-tap-highlight-color: transparent;
  }
  input[type=text]{
    -webkit-appearance: none;
  }
  button{
    padding:7px 0;
    outline: none;
    text-align: center;
    border-radius: 4px;
    box-sizing: border-box;
    font: {
      size:inherit;
      family: inherit;
    }
    cursor: pointer;
  }
  html,body{
    height: 100%;
  }
  ::-webkit-scrollbar{
    width: 0;
  }
  body,#app{
    width:100%;
    overflow-x: hidden;
  }
  #app{
    height: 100%;
    padding-bottom: 60px;
    box-sizing: border-box;
  }
  ul{
    list-style: none;
  }
  .container{
    width:100%;
    padding: 0 10px;
    max-width:800px;
    margin:auto;
    box-sizing: border-box;
    &.hide{
      display: none;
    }
  }
  .dialog-enter-active, .dialog-leave-active {
    transition: opacity .3s;
  }
  .dialog-enter, .dialog-leave-to{
    opacity: 0;
  }
</style>
