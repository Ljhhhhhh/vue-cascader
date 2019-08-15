<template>
  <div>
    <Cascader :options="options" :value="value" :level="0" v-model="value" />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import Cascader, {
  cascaderOptionsItem,
} from './components/Cascader';


  @Component({
    components: {
      Cascader,
    },

  })
export default class App extends Vue {
    value: string[] = []

    options: cascaderOptionsItem[] = [{
      label: '肉类',
      children: [{
        label: '猪肉',
        children: [{
          label: '五花肉',
        },
        {
          label: '里脊肉',
        },
        ],
      },
      {
        label: '鸡肉',
        children: [{
          label: '鸡翅',
        },
        {
          label: '鸡尖',
        },
        ],
      },
      ],
    }, {
      label: '蔬菜',
      children: [{
        label: '叶菜类',
        children: [{
          label: '大白菜',
        },
        {
          label: '包心菜',
        },
        ],
      },
      {
        label: '根茎类',
        children: [{
          label: '萝卜',
        },
        {
          label: '土豆',
        },
        ],
      },
      ],
    }]
}

</script>

<style lang="less">

</style>
