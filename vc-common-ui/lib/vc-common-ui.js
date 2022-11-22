import { openBlock as a, createElementBlock as s, renderSlot as p, Fragment as h, renderList as f, createElementVNode as b, toDisplayString as g, createCommentVNode as v, normalizeStyle as k, ref as m, computed as S, watch as V, onMounted as $ } from "vue";
const w = (l, o) => {
  const c = l.__vccOpts || l;
  for (const [e, n] of o)
    c[e] = n;
  return c;
}, L = { class: "table-wrap" }, O = {
  key: 0,
  class: "row-wrap"
}, B = { key: 1 }, C = {
  name: "VcTable"
}, N = /* @__PURE__ */ Object.assign(C, {
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
  setup(l) {
    return (o, c) => (a(), s("div", L, [
      p(o.$slots, "title", {}, void 0, !0),
      l.tableHead.length > 0 ? (a(), s("div", O, [
        (a(!0), s(h, null, f(l.tableHead, (e, n) => (a(), s("div", {
          key: n,
          class: "column-wrap"
        }, [
          b("span", null, g(e), 1)
        ]))), 128))
      ])) : v("", !0),
      (a(!0), s(h, null, f(l.list, (e, n) => (a(), s("div", {
        key: n,
        class: "row-wrap"
      }, [
        (a(!0), s(h, null, f(l.columnProp, (u, i) => (a(), s("div", {
          key: i,
          class: "column-wrap",
          style: k([
            u.width ? { width: u.width, "min-width": u.width, flex: "unset" } : "",
            l.columnStyle
          ])
        }, [
          o.$slots.column ? p(o.$slots, "column", {
            key: 0,
            row: e,
            colIndex: i
          }, void 0, !0) : (a(), s("span", B, g(e[u.prop]), 1))
        ], 4))), 128))
      ]))), 128))
    ]));
  }
}), T = /* @__PURE__ */ w(N, [["__scopeId", "data-v-ade815cb"]]);
const x = { class: "waterfall" }, A = {
  key: 0,
  id: "left-column",
  class: "column"
}, j = {
  key: 1,
  id: "right-column",
  class: "column"
}, D = {
  name: "VcWaterfall"
}, E = /* @__PURE__ */ Object.assign(D, {
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    addTime: {
      type: [Number, String],
      default: 200
    },
    idKey: {
      type: String,
      default: "id"
    },
    needPush: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(l, { emit: o }) {
    const c = l, e = m([]), n = m([]), u = m([]);
    m([]);
    const i = S(() => y(c.modelValue)), _ = () => {
      if (!u.value.length)
        return;
      const t = document.querySelector("#left-column").getBoundingClientRect(), r = document.querySelector("#right-column").getBoundingClientRect(), d = u.value[0];
      !d || ((t == null ? void 0 : t.height) < (r == null ? void 0 : r.height) ? e.value.push(d) : (t == null ? void 0 : t.height) > (r == null ? void 0 : r.height) ? n.value.push(d) : e.value.length <= n.value.length ? e.value.push(d) : n.value.push(d), u.value.splice(0, 1), u.value.length && setTimeout(() => {
        _();
      }, c.addTime));
    }, y = (t) => JSON.parse(JSON.stringify(t));
    return V(
      () => i.value,
      (t) => {
        e.value = [], n.value = [], u.value = [...t], _();
      }
    ), $(() => {
      u.value = y(i.value), _();
    }), (t, r) => (a(), s("div", x, [
      e.value.length > 0 ? (a(), s("div", A, [
        p(t.$slots, "left", { leftList: e.value }, void 0, !0)
      ])) : v("", !0),
      n.value.length > 0 ? (a(), s("div", j, [
        p(t.$slots, "right", { rightList: n.value }, void 0, !0)
      ])) : v("", !0)
    ]));
  }
}), H = /* @__PURE__ */ w(E, [["__scopeId", "data-v-a32bd480"]]), P = [
  T,
  H
], F = {
  install(l) {
    P.forEach((o) => {
      l.component(o.name, o);
    });
  }
};
export {
  F as default
};
