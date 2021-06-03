<template>
  <div class="components-container">
    <aside>
      拖拽列表请参看
      <a
        href="https://github.com/SortableJS/Vue.Draggable"
        target="_blank"
      >Vue.Draggable</a>
    </aside>
    <div class="editor-container">
      <dnd-list
        :list1="list1"
        :list2="list2"
        list1-title="清单"
        list2-title="清单池"
      />
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'DndListDemo',
  data() {
    return {
      list1: [],
      list2: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list1 = response.data.items.splice(0, 5)
        this.list2 = response.data.items
      })
    }
  }
}
</script>

