<template>
  <div class="components-container">
    <el-button type="primary" @click="dialogIsVisibleFun"> 打开弹框 </el-button>
    <el-button type="primary" @click="clickThis">点击</el-button>

    <mis-dialog ref="tableDialog" @close="closeDialog">
      <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button v-waves @click="closeDig">取 消</el-button>
        <el-button v-waves type="primary" @click="dialogOK">确定</el-button>
      </span>
    </mis-dialog>
  </div>
</template>

<script>
import openWindow from '@/utils/open-window'

export default {
  name: 'DragDialogDemo',
  data() {
    return {
      gridData: [
        {
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }
      ]
    }
  },
  methods: {
    dialogIsVisibleFun() { // 打开弹框
      this.$refs['tableDialog'].show()
    },
    closeDialog() { // 右上角关闭弹框
      this.closeDig()
    },
    dialogOK() { // 点击确定
      this.closeDig()
    },
    closeDig() {
      this.$refs['tableDialog'].hide()
    },

    clickThis() {
      openWindow('https://element.eleme.cn/#/zh-CN/component/button', 'mischieff', 600, 400)
    }
  }
}
</script>
