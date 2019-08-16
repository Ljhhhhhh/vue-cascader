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
import _ from 'loadsh';
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

    @Prop() lazyload!: (id: number, callback: (children: cascaderOptionsItem[]) => any) => any;

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

    handle(id: number, children: cascaderOptionsItem[]) {
      const cloneOptions = _.cloneDeep(this.options);
      let stack = [...cloneOptions];
      let current;
      let index = 0;
      while (current = stack[index++]) {
        if (current.id !== id) {
          if (current.children) {
            stack = stack.concat(current.children);
          }
        } else {
          break;
        }
      }
      if (current) {
        current.children = children;
        this.$emit('update:options', cloneOptions);
      }
    }

    change(value: any[]) {
      const lastItem = value[value.length - 1];
      const {
        id,
      } = lastItem;
      if (this.lazyload) {
        this.lazyload(id, (children: cascaderOptionsItem[]) => {
          this.handle(id, children);
        });
      }
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
