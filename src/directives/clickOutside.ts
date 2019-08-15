import { DirectiveOptions } from "vue/types/options";

// let listener = (e: any) => {
//   if (e.target === el || el.contains(e.target)) {
//     return;
//   }
//   bindings.value();
// };

const clickOutside: DirectiveOptions = {
  inserted(el, bindings, vnode) {
    document.addEventListener("click", (e: any) => {
      if (e.target === el || el.contains(e.target)) {
        return;
      }
      bindings.value();
    });
  },
  unbind() {
    // 解绑
  }
};
export default clickOutside;
