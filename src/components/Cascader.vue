<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">22</div>
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
    label: string
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

    @Prop() value!: string[];

    @Prop() level!: number;

    isVisible: boolean = false

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
  }

</style>
