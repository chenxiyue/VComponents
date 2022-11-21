<template>
  <div class="table-wrap">
    <!--表格标题-->
    <slot name="title" />
    <!--表头-->
    <div v-if="tableHead.length > 0" class="row-wrap">
      <div v-for="(head, hIndex) in tableHead" :key="hIndex" class="column-wrap">
        <span>{{ head }}</span>
      </div>
    </div>
    <div v-for="(row, rowIndex) in list" :key="rowIndex" class="row-wrap">
      <template v-for="(col, colIndex) in columnProp" :key="colIndex">
        <div
          class="column-wrap"
          :style="[
            col.width ? { width: col.width, 'min-width': col.width, flex: 'unset' } : '',
            columnStyle
          ]"
        >
          <slot v-if="$slots.column" name="column" :row="row" :colIndex="colIndex" />
          <span v-else>{{ row[col.prop] }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  tableHead: {
    type: Array,
    default: () => []
  },
  columnProp: {
    type: Array,
    default: () => []
  },
  columnStyle: {
    type: Object,
    default: () => {}
  }
});
</script>

<script>
export default {
  name: 'VcTable'
}
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  border: 1px solid #c0c0c0;
  .row-wrap {
    border-top: 1px solid #c0c0c0;
    display: flex;
    &:first-child {
      border-top: none;
    }
    .column-wrap {
      padding: 6px;
      border-right: 1px solid #c0c0c0;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333333;
      font-size: 12px;
      text-align: center;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
