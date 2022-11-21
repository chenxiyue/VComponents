import { openBlock as t, createElementBlock as n, renderSlot as i, Fragment as c, renderList as d, createElementVNode as p, toDisplayString as m, createCommentVNode as y, normalizeStyle as _ } from "vue";
const f = (e, l) => {
  const s = e.__vccOpts || e;
  for (const [a, o] of l)
    s[a] = o;
  return s;
}, w = { class: "table-wrap" }, h = {
  key: 0,
  class: "row-wrap"
}, b = { key: 1 }, v = {
  name: "VcTable"
}, k = /* @__PURE__ */ Object.assign(v, {
  props: {
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
      default: () => {
      }
    }
  },
  setup(e) {
    return (l, s) => (t(), n("div", w, [
      i(l.$slots, "title", {}, void 0, !0),
      e.tableHead.length > 0 ? (t(), n("div", h, [
        (t(!0), n(c, null, d(e.tableHead, (a, o) => (t(), n("div", {
          key: o,
          class: "column-wrap"
        }, [
          p("span", null, m(a), 1)
        ]))), 128))
      ])) : y("", !0),
      (t(!0), n(c, null, d(e.list, (a, o) => (t(), n("div", {
        key: o,
        class: "row-wrap"
      }, [
        (t(!0), n(c, null, d(e.columnProp, (r, u) => (t(), n("div", {
          key: u,
          class: "column-wrap",
          style: _([
            r.width ? { width: r.width, "min-width": r.width, flex: "unset" } : "",
            e.columnStyle
          ])
        }, [
          l.$slots.column ? i(l.$slots, "column", {
            key: 0,
            row: a,
            colIndex: u
          }, void 0, !0) : (t(), n("span", b, m(a[r.prop]), 1))
        ], 4))), 128))
      ]))), 128))
    ]));
  }
}), g = /* @__PURE__ */ f(k, [["__scopeId", "data-v-ade815cb"]]), S = [
  g
], x = {
  install(e) {
    S.forEach((l) => {
      e.component(l.name, l);
    });
  }
};
export {
  x as default
};
