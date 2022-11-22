<template>
  <div class="waterfall">
    <div v-if="leftList.length > 0" id="left-column" class="column">
      <slot name="left" :leftList="leftList" />
    </div>
    <div v-if="rightList.length > 0" id="right-column" class="column">
      <slot name="right" :rightList="rightList" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    // 瀑布流数据
    type: Array,
    default: () => []
  },
  // 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好 单位ms
  addTime: {
    type: [Number, String],
    default: 200
  },
  // id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{idx: 22, name: 'lisa'}
  // 那么该把idKey设置为idx
  idKey: {
    type: String,
    default: 'id'
  },
  // 获取新列表后是否需要加到原列表后
  needPush: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['update:modelValue']);

const leftList = ref([]);
const rightList = ref([]);
const tempList = ref([]);
const children = ref([]);

const copyFlowList = computed(() => {
  return cloneData(props.modelValue);
});

const splitData = () => {
  if (!tempList.value.length) return;
  const leftRect = document.querySelector('#left-column').getBoundingClientRect();
  const rightRect = document.querySelector('#right-column').getBoundingClientRect();
  // 如果左边小于或等于右边，就添加到左边，否则添加到右边
  const item = tempList.value[0];
  // 数组可能变成[]，导致此item值可能为undefined
  if (!item) return;
  if (leftRect?.height < rightRect?.height) {
    leftList.value.push(item);
  } else if (leftRect?.height > rightRect?.height) {
    rightList.value.push(item);
  } else {
    // 这里是为了保证第一和第二张添加时，左右都能有内容
    // 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
    if (leftList.value.length <= rightList.value.length) {
      leftList.value.push(item);
    } else {
      rightList.value.push(item);
    }
  }
  // 移除临时列表的第一项
  tempList.value.splice(0, 1);
  // 如果临时数组还有数据，继续循环
  if (tempList.value.length) {
    setTimeout(() => {
      splitData();
    }, props.addTime);
  }
};

// 复制而不是引用对象和数组
const cloneData = (data) => {
  return JSON.parse(JSON.stringify(data));
};

// 清空数据列表
const clear = () => {
  leftList.value = [];
  rightList.value = [];
  // 同时清除父组件列表中的数据
  emits('update:modelValue', []);
  tempList.value = [];
};

// 清除某一条指定的数据，根据id实现
const remove = (id) => {
  // 如果findIndex找不到合适的条件，就会返回-1
  let index = -1;
  index = leftList.value.findIndex(val => val[props.idKey] === id);
  if (index !== -1) {
    // 如果index不等于-1，说明已经找到了要找的id，根据index索引删除这一条数据
    leftList.value.splice(index, 1);
  } else {
    // 同理于上方面的方法
    index = rightList.value.findIndex(val => val[props.idKey] === id);
    if (index !== -1) rightList.value.splice(index, 1);
  }
  // 同时清除父组件的数据中的对应id的条目
  index = props.modelValue.findIndex(val => val[props.idKey] === id);
  if (index !== -1) {
    // 首先复制一份value的数据
    const data = cloneData(props.modelValue);
    data.splice(index, 1);
    emits('update:modelValue', data);
  }
};

// 修改某条数据的某个属性
const modify = (id, key, value) => {
  // 如果findIndex找不到合适的条件，就会返回-1
  let index = -1;
  index = leftList.value.findIndex(val => val[props.idKey] === id);
  if (index !== -1) {
    // 如果index不等于-1，说明已经找到了要找的id，修改对应key的值
    leftList.value[index][key] = value;
  } else {
    // 同理于上方面的方法
    index = rightList.value.findIndex(val => val[props.idKey] === id);
    if (index !== -1) rightList.value[index][key] = value;
  }
  // 修改父组件的数据中的对应id的条目
  index = props.modelValue.findIndex(val => val[props.idKey] === id);
  if (index !== -1) {
    // 首先复制一份value的数据
    const data = cloneData(props.modelValue);
    // 修改对应索引的key属性的值为value
    data[index][key] = value;
    // 修改父组件通过v-model绑定的变量的值
    emits('update:modelValue', data);
  }
};

watch(
  () => copyFlowList.value,
  (nval) => {
    // 每次数据更新重置左右瀑布流列表
    leftList.value = [];
    rightList.value = [];
    tempList.value = [...nval];
    splitData();
  }
);

onMounted(() => {
  tempList.value = cloneData(copyFlowList.value);
  splitData();
});

</script>
<script>
export default {
  name: 'VcWaterfall'
}
</script>

<style lang="scss" scoped>
.waterfall {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .column {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: auto;
  }
}
</style>
