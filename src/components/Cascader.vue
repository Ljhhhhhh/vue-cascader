<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">
      {{result}}
    </div>
    <div v-if="isVisible">
      <CascaderItem :options="options" :level="level" @change="change" :value="value" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import clickOutside from '../directives/clickOutside';
import CascaderItem from './CascaderItem';

export interface cascaderOptionsItem {
    pid: string;
    id: string;
    label: string;
    email: string;
    count: string;
    children ? : cascaderOptionsItem
  }

  @Component({
    directives: {
      clickOutside,
    },
    components: {
      CascaderItem,
    },
  })
export default class Cascader extends Vue {
    @Prop() options!: cascaderOptionsItem[];

    @Prop() value!: cascaderOptionsItem[];

    @Prop() level!: number;

    isVisible: boolean = false

    get result() {
      return this.value.map((item: cascaderOptionsItem) => item.label).join('/');
    }

    close() {
      this.isVisible = false;
    }

    toggle() {
      this.isVisible = !this.isVisible;
    }

    change(value: any[]) {
      this.$emit('input', value);
    }
}

</script>
<style lang="less" scoped>
  .cascader {
    display: inline-block;
  }

  .title {
    width: 150px;
    height: 30px;
    border: 1px solid #333;
    line-height: 30px;
  }

</style>
