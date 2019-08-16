<template>
  <div>
    <Cascader :options.sync="options" :value="value" :level="0" v-model="value"
      :lazyload="lazyload" />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import cityList from '@/assets/data.json';
import Cascader, {
  cascaderOptionsItem,
} from './components/Cascader';

const fetchData = ((pid: number) => new Promise < cascaderOptionsItem[] >((resolve, reject) => {
  setTimeout(() => {
    const currentList = cityList.filter((item: cascaderOptionsItem) => +item.pid === +pid);
    resolve(currentList);
  }, 200);
}));

  @Component({
    components: {
      Cascader,
    },

  })
export default class App extends Vue {
    value: string[] = []

    options: cascaderOptionsItem[] = []

    async lazyload(id: number, callback: (list: any[]) => void) {
      const children = await fetchData(id);
      callback(children);
    }

    async mounted() {
      this.options = await fetchData(0);
    }
}

</script>

<style lang="less">

</style>
