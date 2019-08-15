<template>
  <div class="content">
    <div class="content-left">
      <div v-for="(item, index) in options" :key="index">
        <div class="label" @click="selectItem(item)">{{item.label}}</div>
      </div>
    </div>
    <div class="content-right" v-if="lists && lists.length">
      <CascaderItem :options="lists" :level="level + 1" :value="value" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import cloneDeep from 'loadsh/cloneDeep';
import {
  cascaderOptionsItem,
} from './Cascader';

  @Component({
    name: 'CascaderItem',
  })
export default class CascaderItem extends Vue {
    @Prop() options!: cascaderOptionsItem[];

    @Prop() value!: string[];

    @Prop() level!: number;

    currentSelected: cascaderOptionsItem | null = null

    // computed
    get lists() {
      return this.currentSelected && this.currentSelected.children;
    }

    selectItem(item: cascaderOptionsItem): void {
      const cloneValue = cloneDeep(this.value);
      cloneValue[this.level] = item;
      this.$emit('change', cloneValue);
      console.log(cloneValue);
      this.currentSelected = item;
    }
}

</script>
<style lang="less" scoped>
  .content {
    display: flex;
  }

</style>
