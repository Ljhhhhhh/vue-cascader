<template>
  <div class="content">
    <div class="content-left">
      <div v-for="(item, index) in options" :key="index">
        <div class="label" @click="selectItem(item)">{{item.label}}</div>
      </div>
    </div>
    <div class="content-right" v-if="lists && lists.length">
      <CascaderItem :options="lists" :level="level + 1" :value="value" @change="change" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import _ from 'loadsh';
import {
  cascaderOptionsItem,
} from './Cascader';

  @Component({
    name: 'CascaderItem',
  })
export default class CascaderItem extends Vue {
    @Prop() options!: cascaderOptionsItem[];

    @Prop() value!: cascaderOptionsItem[];

    @Prop() level!: number;

    currentSelected: cascaderOptionsItem | null = null

    // computed
    get lists() {
      return this.value[this.level] && this.value[this.level].children;
    }

    change(item: cascaderOptionsItem) {
      this.$emit('change', item);
    }

    selectItem(item: cascaderOptionsItem): void {
      this.currentSelected = item;
      const cloneValue = _.cloneDeep(this.value);
      cloneValue[this.level] = item;
      cloneValue.splice(this.level + 1);
      this.$emit('change', cloneValue);
    }
}

</script>
<style lang="less" scoped>
  .content {
    display: flex;
  }

  .content-left {
    border: 1px solid #ddd;
    min-height: 150px;
    max-height: 150px;
    overflow: auto;
  }

  .label {
    width: 80px;
    padding-left: 5px;

    &:hover {
      background: #999;
      cursor: pointer;
    }
  }

</style>
