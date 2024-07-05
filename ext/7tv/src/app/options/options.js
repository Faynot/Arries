import {
  n as Mt,
  g as xt,
  i as K,
  w as gn,
  a as fe,
  o as vn,
  b as Me,
  c as Xe,
  v as Lt,
  d as Y,
  e as q,
  h as It,
  p as de,
  r as et,
  f as E,
  j as m,
  k as H,
  F as ee,
  l as b,
  T as bn,
  t as yn,
  _ as V,
  m as ne,
  q as x,
  s as oe,
  u as z,
  x as ce,
  y as Ce,
  z as Oe,
  A as ie,
  B as A,
  C as tt,
  D as jt,
  E as kn,
  G as wn,
  H as $n,
  I as En,
  J as nt,
  K as Cn,
  L as On,
  M as Sn,
  N as An,
  O as Pn,
  S as Rn,
  P as Tn,
} from "../../../assets/seventv.index.3.0.9.js";
import {
  r as W,
  u as w,
  s as Hn,
  a as ae,
  n as Bt,
  b as ze,
  t as D,
  _ as B,
  c as Mn,
  m as ke,
} from "../../../assets/seventv.useUserAgent.3.0.9.js";
import {
  L as Dt,
  C as xn,
  U as Vt,
  G as Ln,
  S as In,
  a as jn,
} from "../../../assets/seventv.StarIcon.3.0.9.js";
import { U } from "../../../assets/seventv.UiButton.3.0.9.js";
import { C as Nt } from "../../../assets/seventv.ChevronIcon.3.0.9.js";
import "../../../assets/seventv.main.3.0.9.js";
const Bn = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      get default() {
        return pn;
      },
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) o(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === "childList")
        for (const i of r.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && o(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function o(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = n(s);
    fetch(s.href, r);
  }
})();
function Ke(e, t = {}, n) {
  for (const o in e) {
    const s = e[o],
      r = n ? `${n}:${o}` : o;
    typeof s == "object" && s !== null
      ? Ke(s, t, r)
      : typeof s == "function" && (t[r] = s);
  }
  return t;
}
const Dn = { run: (e) => e() },
  Vn = () => Dn,
  Ut = typeof console.createTask < "u" ? console.createTask : Vn;
function Nn(e, t) {
  const n = t.shift(),
    o = Ut(n);
  return e.reduce(
    (s, r) => s.then(() => o.run(() => r(...t))),
    Promise.resolve(),
  );
}
function Un(e, t) {
  const n = t.shift(),
    o = Ut(n);
  return Promise.all(e.map((s) => o.run(() => s(...t))));
}
function Ne(e, t) {
  for (const n of [...e]) n(t);
}
class Gn {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, n, o = {}) {
    if (!t || typeof n != "function") return () => {};
    const s = t;
    let r;
    for (; this._deprecatedHooks[t]; )
      (r = this._deprecatedHooks[t]), (t = r.to);
    if (r && !o.allowDeprecated) {
      let i = r.message;
      i ||
        (i =
          `${s} hook has been deprecated` +
          (r.to ? `, please use ${r.to}` : "")),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(i) ||
          (console.warn(i), this._deprecatedMessages.add(i));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, "name", {
          get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
          configurable: !0,
        });
      } catch {}
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(n),
      () => {
        n && (this.removeHook(t, n), (n = void 0));
      }
    );
  }
  hookOnce(t, n) {
    let o,
      s = (...r) => (
        typeof o == "function" && o(), (o = void 0), (s = void 0), n(...r)
      );
    return (o = this.hook(t, s)), o;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const o = this._hooks[t].indexOf(n);
      o !== -1 && this._hooks[t].splice(o, 1),
        this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == "string" ? { to: n } : n;
    const o = this._hooks[t] || [];
    delete this._hooks[t];
    for (const s of o) this.hook(t, s);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t) this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = Ke(t),
      o = Object.keys(n).map((s) => this.hook(s, n[s]));
    return () => {
      for (const s of o.splice(0, o.length)) s();
    };
  }
  removeHooks(t) {
    const n = Ke(t);
    for (const o in n) this.removeHook(o, n[o]);
  }
  removeAllHooks() {
    for (const t in this._hooks) delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(Nn, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(Un, t, ...n);
  }
  callHookWith(t, n, ...o) {
    const s =
      this._before || this._after ? { name: n, args: o, context: {} } : void 0;
    this._before && Ne(this._before, s);
    const r = t(n in this._hooks ? [...this._hooks[n]] : [], o);
    return r instanceof Promise
      ? r.finally(() => {
          this._after && s && Ne(this._after, s);
        })
      : (this._after && s && Ne(this._after, s), r);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        if (this._before !== void 0) {
          const n = this._before.indexOf(t);
          n !== -1 && this._before.splice(n, 1);
        }
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        if (this._after !== void 0) {
          const n = this._after.indexOf(t);
          n !== -1 && this._after.splice(n, 1);
        }
      }
    );
  }
}
function Wn() {
  return new Gn();
}
function qn(e) {
  return Array.isArray(e) ? e : [e];
}
const Gt = ["title", "script", "style", "noscript"],
  Wt = ["base", "meta", "link", "style", "script", "noscript"],
  zn = [
    "title",
    "titleTemplate",
    "templateParams",
    "base",
    "htmlAttrs",
    "bodyAttrs",
    "meta",
    "link",
    "style",
    "script",
    "noscript",
  ],
  Kn = [
    "base",
    "title",
    "titleTemplate",
    "bodyAttrs",
    "htmlAttrs",
    "templateParams",
  ],
  Fn = [
    "tagPosition",
    "tagPriority",
    "tagDuplicateStrategy",
    "innerHTML",
    "textContent",
  ];
function qt(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function Fe(e) {
  return qt(
    `${e.tag}:${e.textContent || e.innerHTML || ""}:${Object.entries(e.props)
      .map(([t, n]) => `${t}:${String(n)}`)
      .join(",")}`,
  );
}
function Zn(e) {
  let t = 9;
  for (const n of e)
    for (let o = 0; o < n.length; )
      t = Math.imul(t ^ n.charCodeAt(o++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function zt(e, t) {
  const { props: n, tag: o } = e;
  if (Kn.includes(o)) return o;
  if (o === "link" && n.rel === "canonical") return "canonical";
  if (n.charset) return "charset";
  const s = ["id"];
  o === "meta" && s.push("name", "property", "http-equiv");
  for (const r of s)
    if (typeof n[r] < "u") {
      const i = String(n[r]);
      return t && !t(i) ? !1 : `${o}:${r}:${i}`;
    }
  return !1;
}
function ht(e, t) {
  return e == null ? t || null : typeof e == "function" ? e(t) : e;
}
function Pe(e, t = !1, n) {
  const { tag: o, $el: s } = e;
  s &&
    (Object.entries(o.props).forEach(([r, i]) => {
      i = String(i);
      const d = `attr:${r}`;
      if (r === "class") {
        if (!i) return;
        for (const a of i.split(" ")) {
          const u = `${d}:${a}`;
          n && n(e, u, () => s.classList.remove(a)),
            s.classList.contains(a) || s.classList.add(a);
        }
        return;
      }
      n && !r.startsWith("data-h-") && n(e, d, () => s.removeAttribute(r)),
        (t || s.getAttribute(r) !== i) && s.setAttribute(r, i);
    }),
    Gt.includes(o.tag) &&
      (o.textContent && o.textContent !== s.textContent
        ? (s.textContent = o.textContent)
        : o.innerHTML &&
          o.innerHTML !== s.innerHTML &&
          (s.innerHTML = o.innerHTML)));
}
let be = !1;
async function Kt(e, t = {}) {
  var c, h;
  const n = { shouldRender: !0 };
  if ((await e.hooks.callHook("dom:beforeRender", n), !n.shouldRender)) return;
  const o = t.document || e.resolvedOptions.document || window.document,
    s = (await e.resolveTags()).map(d);
  if (
    e.resolvedOptions.experimentalHashHydration &&
    ((be = be || e._hash || !1), be)
  ) {
    const p = Zn(s.map((g) => g.tag._h));
    if (be === p) return;
    be = p;
  }
  const r = e._popSideEffectQueue();
  e.headEntries()
    .map((p) => p._sde)
    .forEach((p) => {
      Object.entries(p).forEach(([g, O]) => {
        r[g] = O;
      });
    });
  const i = (p, g, O) => {
    (g = `${p.renderId}:${g}`), p.entry && (p.entry._sde[g] = O), delete r[g];
  };
  function d(p) {
    const g = e.headEntries().find(($) => $._i === p._e),
      O = {
        renderId: p._d || Fe(p),
        $el: null,
        shouldRender: !0,
        tag: p,
        entry: g,
        markSideEffect: ($, k) => i(O, $, k),
      };
    return O;
  }
  const a = [],
    u = { body: [], head: [] },
    l = (p) => {
      (e._elMap[p.renderId] = p.$el),
        a.push(p),
        i(p, "el", () => {
          var g;
          (g = p.$el) == null || g.remove(), delete e._elMap[p.renderId];
        });
    };
  for (const p of s) {
    if ((await e.hooks.callHook("dom:beforeRenderTag", p), !p.shouldRender))
      continue;
    const { tag: g } = p;
    if (g.tag === "title") {
      (o.title = g.textContent || ""), a.push(p);
      continue;
    }
    if (g.tag === "htmlAttrs" || g.tag === "bodyAttrs") {
      (p.$el = o[g.tag === "htmlAttrs" ? "documentElement" : "body"]),
        Pe(p, !1, i),
        a.push(p);
      continue;
    }
    if (
      ((p.$el = e._elMap[p.renderId]),
      !p.$el &&
        g.key &&
        (p.$el = o.querySelector(
          `${(c = g.tagPosition) != null && c.startsWith("body") ? "body" : "head"} > ${g.tag}[data-h-${g._h}]`,
        )),
      p.$el)
    ) {
      p.tag._d && Pe(p), l(p);
      continue;
    }
    u[
      (h = g.tagPosition) != null && h.startsWith("body") ? "body" : "head"
    ].push(p);
  }
  const f = { bodyClose: void 0, bodyOpen: void 0, head: void 0 };
  Object.entries(u).forEach(([p, g]) => {
    var $;
    if (!g.length) return;
    const O = ($ = o == null ? void 0 : o[p]) == null ? void 0 : $.children;
    if (O) {
      for (const k of [...O].reverse()) {
        const R = k.tagName.toLowerCase();
        if (!Wt.includes(R)) continue;
        const j = k
            .getAttributeNames()
            .reduce((G, X) => ({ ...G, [X]: k.getAttribute(X) }), {}),
          F = { tag: R, props: j };
        k.innerHTML && (F.innerHTML = k.innerHTML);
        const Z = Fe(F);
        let Q = g.findIndex((G) => (G == null ? void 0 : G.renderId) === Z);
        if (Q === -1) {
          const G = zt(F);
          Q = g.findIndex(
            (X) => (X == null ? void 0 : X.tag._d) && X.tag._d === G,
          );
        }
        if (Q !== -1) {
          const G = g[Q];
          (G.$el = k), Pe(G), l(G), delete g[Q];
        }
      }
      g.forEach((k) => {
        const R = k.tag.tagPosition || "head";
        (f[R] = f[R] || o.createDocumentFragment()),
          k.$el || ((k.$el = o.createElement(k.tag.tag)), Pe(k, !0)),
          f[R].appendChild(k.$el),
          l(k);
      });
    }
  }),
    f.head && o.head.appendChild(f.head),
    f.bodyOpen && o.body.insertBefore(f.bodyOpen, o.body.firstChild),
    f.bodyClose && o.body.appendChild(f.bodyClose);
  for (const p of a) await e.hooks.callHook("dom:renderTag", p);
  Object.values(r).forEach((p) => p());
}
let Ue = null;
async function Ft(e, t = {}) {
  function n() {
    return (Ue = null), Kt(e, t);
  }
  const o = t.delayFn || ((s) => setTimeout(s, 10));
  return (Ue = Ue || new Promise((s) => o(() => s(n()))));
}
function Qn(e) {
  return {
    hooks: {
      "entries:updated": function (t) {
        if (
          typeof (e == null ? void 0 : e.document) > "u" &&
          typeof window > "u"
        )
          return;
        let n = e == null ? void 0 : e.delayFn;
        !n && typeof requestAnimationFrame < "u" && (n = requestAnimationFrame),
          Ft(t, {
            document: (e == null ? void 0 : e.document) || window.document,
            delayFn: n,
          });
      },
    },
  };
}
function Yn(e) {
  var t;
  return (
    ((t =
      e == null ? void 0 : e.head.querySelector('meta[name="unhead:ssr"]')) ==
    null
      ? void 0
      : t.getAttribute("content")) || !1
  );
}
const pt = { critical: 2, high: 9, low: 12, base: -1, title: 1, meta: 10 };
function _t(e) {
  if (typeof e.tagPriority == "number") return e.tagPriority;
  if (e.tag === "meta") {
    if (e.props.charset) return -2;
    if (e.props["http-equiv"] === "content-security-policy") return 0;
  }
  const t = e.tagPriority || e.tag;
  return t in pt ? pt[t] : 10;
}
const Jn = [
  { prefix: "before:", offset: -1 },
  { prefix: "after:", offset: 1 },
];
function Xn() {
  return {
    hooks: {
      "tags:resolve": (e) => {
        const t = (n) => {
          var o;
          return (o = e.tags.find((s) => s._d === n)) == null ? void 0 : o._p;
        };
        for (const { prefix: n, offset: o } of Jn)
          for (const s of e.tags.filter(
            (r) =>
              typeof r.tagPriority == "string" && r.tagPriority.startsWith(n),
          )) {
            const r = t(s.tagPriority.replace(n, ""));
            typeof r < "u" && (s._p = r + o);
          }
        e.tags.sort((n, o) => n._p - o._p).sort((n, o) => _t(n) - _t(o));
      },
    },
  };
}
function eo() {
  return {
    hooks: {
      "tags:resolve": (e) => {
        const { tags: t } = e;
        let n = t.findIndex((s) => s.tag === "titleTemplate");
        const o = t.findIndex((s) => s.tag === "title");
        if (o !== -1 && n !== -1) {
          const s = ht(t[n].textContent, t[o].textContent);
          s !== null ? (t[o].textContent = s || t[o].textContent) : delete t[o];
        } else if (n !== -1) {
          const s = ht(t[n].textContent);
          s !== null &&
            ((t[n].textContent = s), (t[n].tag = "title"), (n = -1));
        }
        n !== -1 && delete t[n], (e.tags = t.filter(Boolean));
      },
    },
  };
}
function to() {
  return {
    hooks: {
      "tag:normalise": function ({ tag: e }) {
        typeof e.props.body < "u" &&
          ((e.tagPosition = "bodyClose"), delete e.props.body);
      },
    },
  };
}
const no = ["link", "style", "script", "noscript"];
function oo() {
  return {
    hooks: {
      "tag:normalise": ({ tag: e, resolvedOptions: t }) => {
        t.experimentalHashHydration === !0 && (e._h = Fe(e)),
          e.key &&
            no.includes(e.tag) &&
            ((e._h = qt(e.key)), (e.props[`data-h-${e._h}`] = ""));
      },
    },
  };
}
const mt = ["script", "link", "bodyAttrs"];
function so() {
  const e = (t, n) => {
    const o = {},
      s = {};
    Object.entries(n.props).forEach(([i, d]) => {
      i.startsWith("on") && typeof d == "function" ? (s[i] = d) : (o[i] = d);
    });
    let r;
    return (
      t === "dom" &&
        n.tag === "script" &&
        typeof o.src == "string" &&
        typeof s.onload < "u" &&
        ((r = o.src), delete o.src),
      { props: o, eventHandlers: s, delayedSrc: r }
    );
  };
  return {
    hooks: {
      "ssr:render": function (t) {
        t.tags = t.tags.map(
          (n) => (
            !mt.includes(n.tag) ||
              !Object.entries(n.props).find(
                ([o, s]) => o.startsWith("on") && typeof s == "function",
              ) ||
              (n.props = e("ssr", n).props),
            n
          ),
        );
      },
      "dom:beforeRenderTag": function (t) {
        if (
          !mt.includes(t.tag.tag) ||
          !Object.entries(t.tag.props).find(
            ([r, i]) => r.startsWith("on") && typeof i == "function",
          )
        )
          return;
        const { props: n, eventHandlers: o, delayedSrc: s } = e("dom", t.tag);
        Object.keys(o).length &&
          ((t.tag.props = n),
          (t.tag._eventHandlers = o),
          (t.tag._delayedSrc = s));
      },
      "dom:renderTag": function (t) {
        const n = t.$el;
        if (!t.tag._eventHandlers || !n) return;
        const o = t.tag.tag === "bodyAttrs" && typeof window < "u" ? window : n;
        Object.entries(t.tag._eventHandlers).forEach(([s, r]) => {
          const i = `${t.tag._d || t.tag._p}:${s}`,
            d = s.slice(2).toLowerCase(),
            a = `data-h-${d}`;
          if ((t.markSideEffect(i, () => {}), n.hasAttribute(a))) return;
          const u = r;
          n.setAttribute(a, ""),
            o.addEventListener(d, u),
            t.entry &&
              (t.entry._sde[i] = () => {
                o.removeEventListener(d, u), n.removeAttribute(a);
              });
        }),
          t.tag._delayedSrc && n.setAttribute("src", t.tag._delayedSrc);
      },
    },
  };
}
const ro = ["templateParams", "htmlAttrs", "bodyAttrs"];
function io() {
  return {
    hooks: {
      "tag:normalise": function ({ tag: e }) {
        ["hid", "vmid", "key"].forEach((o) => {
          e.props[o] && ((e.key = e.props[o]), delete e.props[o]);
        });
        const n = zt(e) || (e.key ? `${e.tag}:${e.key}` : !1);
        n && (e._d = n);
      },
      "tags:resolve": function (e) {
        const t = {};
        e.tags.forEach((o) => {
          const s = (o.key ? `${o.tag}:${o.key}` : o._d) || o._p,
            r = t[s];
          if (r) {
            let d = o == null ? void 0 : o.tagDuplicateStrategy;
            if ((!d && ro.includes(o.tag) && (d = "merge"), d === "merge")) {
              const a = r.props;
              ["class", "style"].forEach((u) => {
                o.props[u] &&
                  a[u] &&
                  (u === "style" && !a[u].endsWith(";") && (a[u] += ";"),
                  (o.props[u] = `${a[u]} ${o.props[u]}`));
              }),
                (t[s].props = { ...a, ...o.props });
              return;
            } else if (o._e === r._e) {
              (r._duped = r._duped || []),
                (o._d = `${r._d}:${r._duped.length + 1}`),
                r._duped.push(o);
              return;
            }
          }
          const i =
            Object.keys(o.props).length +
            (o.innerHTML ? 1 : 0) +
            (o.textContent ? 1 : 0);
          if (Wt.includes(o.tag) && i === 0) {
            delete t[s];
            return;
          }
          t[s] = o;
        });
        const n = [];
        Object.values(t).forEach((o) => {
          const s = o._duped;
          delete o._duped, n.push(o), s && n.push(...s);
        }),
          (e.tags = n);
      },
    },
  };
}
function Re(e, t) {
  function n(r) {
    if (["s", "pageTitle"].includes(r)) return t.pageTitle;
    let i;
    return (
      r.includes(".")
        ? (i = r.split(".").reduce((d, a) => (d && d[a]) || void 0, t))
        : (i = t[r]),
      typeof i < "u" ? i || "" : !1
    );
  }
  let o = e;
  try {
    o = decodeURI(e);
  } catch {}
  return (
    (o.match(/%(\w+\.+\w+)|%(\w+)/g) || [])
      .sort()
      .reverse()
      .forEach((r) => {
        const i = n(r.slice(1));
        typeof i == "string" &&
          (e = e.replaceAll(new RegExp(`\\${r}(\\W|$)`, "g"), `${i}$1`).trim());
      }),
    t.separator &&
      (e.endsWith(t.separator) && (e = e.slice(0, -t.separator.length).trim()),
      e.startsWith(t.separator) && (e = e.slice(t.separator.length).trim()),
      (e = e.replace(
        new RegExp(`\\${t.separator}\\s*\\${t.separator}`, "g"),
        t.separator,
      ))),
    e
  );
}
function ao() {
  return {
    hooks: {
      "tags:resolve": (e) => {
        var r;
        const { tags: t } = e,
          n =
            (r = t.find((i) => i.tag === "title")) == null
              ? void 0
              : r.textContent,
          o = t.findIndex((i) => i.tag === "templateParams"),
          s = o !== -1 ? t[o].props : {};
        s.pageTitle = s.pageTitle || n || "";
        for (const i of t)
          if (
            ["titleTemplate", "title"].includes(i.tag) &&
            typeof i.textContent == "string"
          )
            i.textContent = Re(i.textContent, s);
          else if (i.tag === "meta" && typeof i.props.content == "string")
            i.props.content = Re(i.props.content, s);
          else if (i.tag === "link" && typeof i.props.href == "string")
            i.props.href = Re(i.props.href, s);
          else if (
            i.tag === "script" &&
            ["application/json", "application/ld+json"].includes(
              i.props.type,
            ) &&
            typeof i.innerHTML == "string"
          )
            try {
              i.innerHTML = JSON.stringify(JSON.parse(i.innerHTML), (d, a) =>
                typeof a == "string" ? Re(a, s) : a,
              );
            } catch {}
        e.tags = t.filter((i) => i.tag !== "templateParams");
      },
    },
  };
}
const co = typeof window < "u";
let Zt;
function lo(e) {
  return (Zt = e);
}
function uo() {
  return Zt;
}
async function fo(e, t) {
  const n = { tag: e, props: {} };
  return e === "templateParams"
    ? ((n.props = t), n)
    : ["title", "titleTemplate"].includes(e)
      ? ((n.textContent = t instanceof Promise ? await t : t), n)
      : typeof t == "string"
        ? ["script", "noscript", "style"].includes(e)
          ? (e === "script" && (/^(https?:)?\/\//.test(t) || t.startsWith("/"))
              ? (n.props.src = t)
              : (n.innerHTML = t),
            n)
          : !1
        : ((n.props = await po(e, { ...t })),
          n.props.children && (n.props.innerHTML = n.props.children),
          delete n.props.children,
          Object.keys(n.props)
            .filter((o) => Fn.includes(o))
            .forEach((o) => {
              (!["innerHTML", "textContent"].includes(o) ||
                Gt.includes(n.tag)) &&
                (n[o] = n.props[o]),
                delete n.props[o];
            }),
          ["innerHTML", "textContent"].forEach((o) => {
            if (
              n.tag === "script" &&
              typeof n[o] == "string" &&
              ["application/ld+json", "application/json"].includes(n.props.type)
            )
              try {
                n[o] = JSON.parse(n[o]);
              } catch {
                n[o] = "";
              }
            typeof n[o] == "object" && (n[o] = JSON.stringify(n[o]));
          }),
          n.props.class && (n.props.class = ho(n.props.class)),
          n.props.content && Array.isArray(n.props.content)
            ? n.props.content.map((o) => ({
                ...n,
                props: { ...n.props, content: o },
              }))
            : n);
}
function ho(e) {
  return (
    typeof e == "object" &&
      !Array.isArray(e) &&
      (e = Object.keys(e).filter((t) => e[t])),
    (Array.isArray(e) ? e.join(" ") : e)
      .split(" ")
      .filter((t) => t.trim())
      .filter(Boolean)
      .join(" ")
  );
}
async function po(e, t) {
  for (const n of Object.keys(t)) {
    const o = n.startsWith("data-");
    t[n] instanceof Promise && (t[n] = await t[n]),
      String(t[n]) === "true"
        ? (t[n] = o ? "true" : "")
        : String(t[n]) === "false" && (o ? (t[n] = "false") : delete t[n]);
  }
  return t;
}
const _o = 10;
async function mo(e) {
  const t = [];
  return (
    Object.entries(e.resolvedInput)
      .filter(([n, o]) => typeof o < "u" && zn.includes(n))
      .forEach(([n, o]) => {
        const s = qn(o);
        t.push(...s.map((r) => fo(n, r)).flat());
      }),
    (await Promise.all(t))
      .flat()
      .filter(Boolean)
      .map((n, o) => ((n._e = e._i), (n._p = (e._i << _o) + o), n))
  );
}
function go() {
  return [io(), Xn(), ao(), eo(), oo(), so(), to()];
}
function vo(e = {}) {
  return [
    Qn({
      document: e == null ? void 0 : e.document,
      delayFn: e == null ? void 0 : e.domDelayFn,
    }),
  ];
}
function bo(e = {}) {
  const t = yo({
    ...e,
    plugins: [...vo(e), ...((e == null ? void 0 : e.plugins) || [])],
  });
  return (
    e.experimentalHashHydration &&
      t.resolvedOptions.document &&
      (t._hash = Yn(t.resolvedOptions.document)),
    lo(t),
    t
  );
}
function yo(e = {}) {
  let t = [],
    n = {},
    o = 0;
  const s = Wn();
  e != null && e.hooks && s.addHooks(e.hooks),
    (e.plugins = [...go(), ...((e == null ? void 0 : e.plugins) || [])]),
    e.plugins.forEach((d) => d.hooks && s.addHooks(d.hooks)),
    (e.document = e.document || (co ? document : void 0));
  const r = () => s.callHook("entries:updated", i),
    i = {
      resolvedOptions: e,
      headEntries() {
        return t;
      },
      get hooks() {
        return s;
      },
      use(d) {
        d.hooks && s.addHooks(d.hooks);
      },
      push(d, a) {
        const u = { _i: o++, input: d, _sde: {} };
        return (
          a != null && a.mode && (u._m = a == null ? void 0 : a.mode),
          a != null && a.transform && (u._t = a == null ? void 0 : a.transform),
          t.push(u),
          r(),
          {
            dispose() {
              t = t.filter((l) =>
                l._i !== u._i
                  ? !0
                  : ((n = { ...n, ...(l._sde || {}) }), (l._sde = {}), r(), !1),
              );
            },
            patch(l) {
              t = t.map(
                (f) => (f._i === u._i && ((u.input = f.input = l), r()), f),
              );
            },
          }
        );
      },
      async resolveTags() {
        const d = { tags: [], entries: [...t] };
        await s.callHook("entries:resolve", d);
        for (const a of d.entries) {
          const u = a._t || ((l) => l);
          if (
            ((a.resolvedInput = u(a.resolvedInput || a.input)), a.resolvedInput)
          )
            for (const l of await mo(a)) {
              const f = {
                tag: l,
                entry: a,
                resolvedOptions: i.resolvedOptions,
              };
              await s.callHook("tag:normalise", f), d.tags.push(f.tag);
            }
        }
        return await s.callHook("tags:resolve", d), d.tags;
      },
      _popSideEffectQueue() {
        const d = { ...n };
        return (n = {}), d;
      },
      _elMap: {},
    };
  return i.hooks.callHook("init", i), i;
}
function ko(e) {
  return typeof e == "function" ? e() : w(e);
}
function Te(e, t = "") {
  if (e instanceof Promise) return e;
  const n = ko(e);
  return !e || !n
    ? n
    : Array.isArray(n)
      ? n.map((o) => Te(o, t))
      : typeof n == "object"
        ? Object.fromEntries(
            Object.entries(n).map(([o, s]) =>
              o === "titleTemplate" || o.startsWith("on")
                ? [o, w(s)]
                : [o, Te(s, o)],
            ),
          )
        : n;
}
const wo = Lt.startsWith("3"),
  $o = typeof window < "u",
  Qt = "usehead";
function ot() {
  return (xt() && K(Qt)) || uo();
}
function Eo(e) {
  return {
    install(n) {
      wo &&
        ((n.config.globalProperties.$unhead = e),
        (n.config.globalProperties.$head = e),
        n.provide(Qt, e));
    },
  }.install;
}
function Co(e = {}) {
  const t = bo({
    ...e,
    domDelayFn: (n) => setTimeout(() => Mt(() => n()), 10),
    plugins: [Oo(), ...((e == null ? void 0 : e.plugins) || [])],
  });
  return (t.install = Eo(t)), t;
}
function Oo() {
  return {
    hooks: {
      "entries:resolve": function (e) {
        for (const t of e.entries) t.resolvedInput = Te(t.input);
      },
    },
  };
}
function So(e, t = {}) {
  const n = ot(),
    o = W(!1),
    s = W({});
  gn(() => {
    s.value = o.value ? {} : Te(e);
  });
  const r = n.push(s.value, t);
  return (
    fe(s, (d) => {
      r.patch(d);
    }),
    xt() &&
      (vn(() => {
        r.dispose();
      }),
      Me(() => {
        o.value = !0;
      }),
      Xe(() => {
        o.value = !1;
      })),
    r
  );
}
function Ao(e, t = {}) {
  return ot().push(e, t);
}
function Yt(e, t = {}) {
  var o;
  const n = ot();
  if (n) {
    const s = $o || !!((o = n.resolvedOptions) != null && o.document);
    return (t.mode === "server" && s) || (t.mode === "client" && !s)
      ? void 0
      : s
        ? So(e, t)
        : Ao(e, t);
  }
}
function Po(e, t) {
  const n = Co(t || {}),
    o = {
      unhead: n,
      install(s) {
        Lt.startsWith("3") &&
          ((s.config.globalProperties.$head = n), s.provide("usehead", n));
      },
      use(s) {
        n.use(s);
      },
      resolveTags() {
        return n.resolveTags();
      },
      headEntries() {
        return n.headEntries();
      },
      headTags() {
        return n.resolveTags();
      },
      push(s, r) {
        return n.push(s, r);
      },
      addEntry(s, r) {
        return n.push(s, r);
      },
      addHeadObjs(s, r) {
        return n.push(s, r);
      },
      addReactiveEntry(s, r) {
        const i = Yt(s, r);
        return typeof i < "u" ? i.dispose : () => {};
      },
      removeHeadObjs() {},
      updateDOM(s, r) {
        r
          ? Kt(n, { document: s })
          : Ft(n, { delayFn: (i) => setTimeout(() => i(), 50), document: s });
      },
      internalHooks: n.hooks,
      hooks: { "before:dom": [], "resolved:tags": [], "resolved:entries": [] },
    };
  return (
    (n.addHeadObjs = o.addHeadObjs),
    (n.updateDOM = o.updateDOM),
    n.hooks.hook("dom:beforeRender", (s) => {
      for (const r of o.hooks["before:dom"])
        r() === !1 && (s.shouldRender = !1);
    }),
    e && o.addHeadObjs(e),
    o
  );
}
/*!
 * vue-router v4.2.1
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const ue = typeof window < "u";
function Ro(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const T = Object.assign;
function Ge(e, t) {
  const n = {};
  for (const o in t) {
    const s = t[o];
    n[o] = J(s) ? s.map(e) : e(s);
  }
  return n;
}
const we = () => {},
  J = Array.isArray,
  To = /\/$/,
  Ho = (e) => e.replace(To, "");
function We(e, t, n = "/") {
  let o,
    s = {},
    r = "",
    i = "";
  const d = t.indexOf("#");
  let a = t.indexOf("?");
  return (
    d < a && d >= 0 && (a = -1),
    a > -1 &&
      ((o = t.slice(0, a)),
      (r = t.slice(a + 1, d > -1 ? d : t.length)),
      (s = e(r))),
    d > -1 && ((o = o || t.slice(0, d)), (i = t.slice(d, t.length))),
    (o = Io(o ?? t, n)),
    { fullPath: o + (r && "?") + r + i, path: o, query: s, hash: i }
  );
}
function Mo(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function gt(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function xo(e, t, n) {
  const o = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    o > -1 &&
    o === s &&
    he(t.matched[o], n.matched[s]) &&
    Jt(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function he(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Jt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Lo(e[n], t[n])) return !1;
  return !0;
}
function Lo(e, t) {
  return J(e) ? vt(e, t) : J(t) ? vt(t, e) : e === t;
}
function vt(e, t) {
  return J(t)
    ? e.length === t.length && e.every((n, o) => n === t[o])
    : e.length === 1 && e[0] === t;
}
function Io(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    o = e.split("/"),
    s = o[o.length - 1];
  (s === ".." || s === ".") && o.push("");
  let r = n.length - 1,
    i,
    d;
  for (i = 0; i < o.length; i++)
    if (((d = o[i]), d !== "."))
      if (d === "..") r > 1 && r--;
      else break;
  return (
    n.slice(0, r).join("/") +
    "/" +
    o.slice(i - (i === o.length ? 1 : 0)).join("/")
  );
}
var Ee;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Ee || (Ee = {}));
var $e;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})($e || ($e = {}));
function jo(e) {
  if (!e)
    if (ue) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Ho(e);
}
const Bo = /^[^#]+#/;
function Do(e, t) {
  return e.replace(Bo, "#") + t;
}
function Vo(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0),
  };
}
const xe = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function No(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      o = typeof n == "string" && n.startsWith("#"),
      s =
        typeof n == "string"
          ? o
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = Vo(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset,
      );
}
function bt(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ze = new Map();
function Uo(e, t) {
  Ze.set(e, t);
}
function Go(e) {
  const t = Ze.get(e);
  return Ze.delete(e), t;
}
let Wo = () => location.protocol + "//" + location.host;
function Xt(e, t) {
  const { pathname: n, search: o, hash: s } = t,
    r = e.indexOf("#");
  if (r > -1) {
    let d = s.includes(e.slice(r)) ? e.slice(r).length : 1,
      a = s.slice(d);
    return a[0] !== "/" && (a = "/" + a), gt(a, "");
  }
  return gt(n, e) + o + s;
}
function qo(e, t, n, o) {
  let s = [],
    r = [],
    i = null;
  const d = ({ state: c }) => {
    const h = Xt(e, location),
      p = n.value,
      g = t.value;
    let O = 0;
    if (c) {
      if (((n.value = h), (t.value = c), i && i === p)) {
        i = null;
        return;
      }
      O = g ? c.position - g.position : 0;
    } else o(h);
    s.forEach(($) => {
      $(n.value, p, {
        delta: O,
        type: Ee.pop,
        direction: O ? (O > 0 ? $e.forward : $e.back) : $e.unknown,
      });
    });
  };
  function a() {
    i = n.value;
  }
  function u(c) {
    s.push(c);
    const h = () => {
      const p = s.indexOf(c);
      p > -1 && s.splice(p, 1);
    };
    return r.push(h), h;
  }
  function l() {
    const { history: c } = window;
    c.state && c.replaceState(T({}, c.state, { scroll: xe() }), "");
  }
  function f() {
    for (const c of r) c();
    (r = []),
      window.removeEventListener("popstate", d),
      window.removeEventListener("beforeunload", l);
  }
  return (
    window.addEventListener("popstate", d),
    window.addEventListener("beforeunload", l, { passive: !0 }),
    { pauseListeners: a, listen: u, destroy: f }
  );
}
function yt(e, t, n, o = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: s ? xe() : null,
  };
}
function zo(e) {
  const { history: t, location: n } = window,
    o = { value: Xt(e, n) },
    s = { value: t.state };
  s.value ||
    r(
      o.value,
      {
        back: null,
        current: o.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function r(a, u, l) {
    const f = e.indexOf("#"),
      c =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + a
          : Wo() + e + a;
    try {
      t[l ? "replaceState" : "pushState"](u, "", c), (s.value = u);
    } catch (h) {
      console.error(h), n[l ? "replace" : "assign"](c);
    }
  }
  function i(a, u) {
    const l = T({}, t.state, yt(s.value.back, a, s.value.forward, !0), u, {
      position: s.value.position,
    });
    r(a, l, !0), (o.value = a);
  }
  function d(a, u) {
    const l = T({}, s.value, t.state, { forward: a, scroll: xe() });
    r(l.current, l, !0);
    const f = T({}, yt(o.value, a, null), { position: l.position + 1 }, u);
    r(a, f, !1), (o.value = a);
  }
  return { location: o, state: s, push: d, replace: i };
}
function Ko(e) {
  e = jo(e);
  const t = zo(e),
    n = qo(e, t.state, t.location, t.replace);
  function o(r, i = !0) {
    i || n.pauseListeners(), history.go(r);
  }
  const s = T(
    { location: "", base: e, go: o, createHref: Do.bind(null, e) },
    t,
    n,
  );
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function Fo(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    Ko(e)
  );
}
function Zo(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function en(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const se = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  tn = Symbol("");
var kt;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(kt || (kt = {}));
function pe(e, t) {
  return T(new Error(), { type: e, [tn]: !0 }, t);
}
function te(e, t) {
  return e instanceof Error && tn in e && (t == null || !!(e.type & t));
}
const wt = "[^/]+?",
  Qo = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Yo = /[.+*?^${}()[\]/\\]/g;
function Jo(e, t) {
  const n = T({}, Qo, t),
    o = [];
  let s = n.start ? "^" : "";
  const r = [];
  for (const u of e) {
    const l = u.length ? [] : [90];
    n.strict && !u.length && (s += "/");
    for (let f = 0; f < u.length; f++) {
      const c = u[f];
      let h = 40 + (n.sensitive ? 0.25 : 0);
      if (c.type === 0)
        f || (s += "/"), (s += c.value.replace(Yo, "\\$&")), (h += 40);
      else if (c.type === 1) {
        const { value: p, repeatable: g, optional: O, regexp: $ } = c;
        r.push({ name: p, repeatable: g, optional: O });
        const k = $ || wt;
        if (k !== wt) {
          h += 10;
          try {
            new RegExp(`(${k})`);
          } catch (j) {
            throw new Error(
              `Invalid custom RegExp for param "${p}" (${k}): ` + j.message,
            );
          }
        }
        let R = g ? `((?:${k})(?:/(?:${k}))*)` : `(${k})`;
        f || (R = O && u.length < 2 ? `(?:/${R})` : "/" + R),
          O && (R += "?"),
          (s += R),
          (h += 20),
          O && (h += -8),
          g && (h += -20),
          k === ".*" && (h += -50);
      }
      l.push(h);
    }
    o.push(l);
  }
  if (n.strict && n.end) {
    const u = o.length - 1;
    o[u][o[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? (s += "$") : n.strict && (s += "(?:/|$)");
  const i = new RegExp(s, n.sensitive ? "" : "i");
  function d(u) {
    const l = u.match(i),
      f = {};
    if (!l) return null;
    for (let c = 1; c < l.length; c++) {
      const h = l[c] || "",
        p = r[c - 1];
      f[p.name] = h && p.repeatable ? h.split("/") : h;
    }
    return f;
  }
  function a(u) {
    let l = "",
      f = !1;
    for (const c of e) {
      (!f || !l.endsWith("/")) && (l += "/"), (f = !1);
      for (const h of c)
        if (h.type === 0) l += h.value;
        else if (h.type === 1) {
          const { value: p, repeatable: g, optional: O } = h,
            $ = p in u ? u[p] : "";
          if (J($) && !g)
            throw new Error(
              `Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const k = J($) ? $.join("/") : $;
          if (!k)
            if (O)
              c.length < 2 &&
                (l.endsWith("/") ? (l = l.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${p}"`);
          l += k;
        }
    }
    return l || "/";
  }
  return { re: i, score: o, keys: r, parse: d, stringify: a };
}
function Xo(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o) return o;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 40 + 40
        ? 1
        : -1
      : 0;
}
function es(e, t) {
  let n = 0;
  const o = e.score,
    s = t.score;
  for (; n < o.length && n < s.length; ) {
    const r = Xo(o[n], s[n]);
    if (r) return r;
    n++;
  }
  if (Math.abs(s.length - o.length) === 1) {
    if ($t(o)) return 1;
    if ($t(s)) return -1;
  }
  return s.length - o.length;
}
function $t(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const ts = { type: 0, value: "" },
  ns = /[a-zA-Z0-9_]/;
function os(e) {
  if (!e) return [[]];
  if (e === "/") return [[ts]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(h) {
    throw new Error(`ERR (${n})/"${u}": ${h}`);
  }
  let n = 0,
    o = n;
  const s = [];
  let r;
  function i() {
    r && s.push(r), (r = []);
  }
  let d = 0,
    a,
    u = "",
    l = "";
  function f() {
    u &&
      (n === 0
        ? r.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
          ? (r.length > 1 &&
              (a === "*" || a === "+") &&
              t(
                `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`,
              ),
            r.push({
              type: 1,
              value: u,
              regexp: l,
              repeatable: a === "*" || a === "+",
              optional: a === "*" || a === "?",
            }))
          : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function c() {
    u += a;
  }
  for (; d < e.length; ) {
    if (((a = e[d++]), a === "\\" && n !== 2)) {
      (o = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        a === "/" ? (u && f(), i()) : a === ":" ? (f(), (n = 1)) : c();
        break;
      case 4:
        c(), (n = o);
        break;
      case 1:
        a === "("
          ? (n = 2)
          : ns.test(a)
            ? c()
            : (f(), (n = 0), a !== "*" && a !== "?" && a !== "+" && d--);
        break;
      case 2:
        a === ")"
          ? l[l.length - 1] == "\\"
            ? (l = l.slice(0, -1) + a)
            : (n = 3)
          : (l += a);
        break;
      case 3:
        f(), (n = 0), a !== "*" && a !== "?" && a !== "+" && d--, (l = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), s;
}
function ss(e, t, n) {
  const o = Jo(os(e.path), n),
    s = T(o, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function rs(e, t) {
  const n = [],
    o = new Map();
  t = Ot({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(l) {
    return o.get(l);
  }
  function r(l, f, c) {
    const h = !c,
      p = is(l);
    p.aliasOf = c && c.record;
    const g = Ot(t, l),
      O = [p];
    if ("alias" in l) {
      const R = typeof l.alias == "string" ? [l.alias] : l.alias;
      for (const j of R)
        O.push(
          T({}, p, {
            components: c ? c.record.components : p.components,
            path: j,
            aliasOf: c ? c.record : p,
          }),
        );
    }
    let $, k;
    for (const R of O) {
      const { path: j } = R;
      if (f && j[0] !== "/") {
        const F = f.record.path,
          Z = F[F.length - 1] === "/" ? "" : "/";
        R.path = f.record.path + (j && Z + j);
      }
      if (
        (($ = ss(R, f, g)),
        c
          ? c.alias.push($)
          : ((k = k || $),
            k !== $ && k.alias.push($),
            h && l.name && !Ct($) && i(l.name)),
        p.children)
      ) {
        const F = p.children;
        for (let Z = 0; Z < F.length; Z++) r(F[Z], $, c && c.children[Z]);
      }
      (c = c || $),
        (($.record.components && Object.keys($.record.components).length) ||
          $.record.name ||
          $.record.redirect) &&
          a($);
    }
    return k
      ? () => {
          i(k);
        }
      : we;
  }
  function i(l) {
    if (en(l)) {
      const f = o.get(l);
      f &&
        (o.delete(l),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(i),
        f.alias.forEach(i));
    } else {
      const f = n.indexOf(l);
      f > -1 &&
        (n.splice(f, 1),
        l.record.name && o.delete(l.record.name),
        l.children.forEach(i),
        l.alias.forEach(i));
    }
  }
  function d() {
    return n;
  }
  function a(l) {
    let f = 0;
    for (
      ;
      f < n.length &&
      es(l, n[f]) >= 0 &&
      (l.record.path !== n[f].record.path || !nn(l, n[f]));

    )
      f++;
    n.splice(f, 0, l), l.record.name && !Ct(l) && o.set(l.record.name, l);
  }
  function u(l, f) {
    let c,
      h = {},
      p,
      g;
    if ("name" in l && l.name) {
      if (((c = o.get(l.name)), !c)) throw pe(1, { location: l });
      (g = c.record.name),
        (h = T(
          Et(
            f.params,
            c.keys.filter((k) => !k.optional).map((k) => k.name),
          ),
          l.params &&
            Et(
              l.params,
              c.keys.map((k) => k.name),
            ),
        )),
        (p = c.stringify(h));
    } else if ("path" in l)
      (p = l.path),
        (c = n.find((k) => k.re.test(p))),
        c && ((h = c.parse(p)), (g = c.record.name));
    else {
      if (((c = f.name ? o.get(f.name) : n.find((k) => k.re.test(f.path))), !c))
        throw pe(1, { location: l, currentLocation: f });
      (g = c.record.name),
        (h = T({}, f.params, l.params)),
        (p = c.stringify(h));
    }
    const O = [];
    let $ = c;
    for (; $; ) O.unshift($.record), ($ = $.parent);
    return { name: g, path: p, params: h, matched: O, meta: cs(O) };
  }
  return (
    e.forEach((l) => r(l)),
    {
      addRoute: r,
      resolve: u,
      removeRoute: i,
      getRoutes: d,
      getRecordMatcher: s,
    }
  );
}
function Et(e, t) {
  const n = {};
  for (const o of t) o in e && (n[o] = e[o]);
  return n;
}
function is(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: as(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function as(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const o in e.components) t[o] = typeof n == "boolean" ? n : n[o];
  return t;
}
function Ct(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function cs(e) {
  return e.reduce((t, n) => T(t, n.meta), {});
}
function Ot(e, t) {
  const n = {};
  for (const o in e) n[o] = o in t ? t[o] : e[o];
  return n;
}
function nn(e, t) {
  return t.children.some((n) => n === e || nn(e, n));
}
const on = /#/g,
  ls = /&/g,
  us = /\//g,
  ds = /=/g,
  fs = /\?/g,
  sn = /\+/g,
  hs = /%5B/g,
  ps = /%5D/g,
  rn = /%5E/g,
  _s = /%60/g,
  an = /%7B/g,
  ms = /%7C/g,
  cn = /%7D/g,
  gs = /%20/g;
function st(e) {
  return encodeURI("" + e)
    .replace(ms, "|")
    .replace(hs, "[")
    .replace(ps, "]");
}
function vs(e) {
  return st(e).replace(an, "{").replace(cn, "}").replace(rn, "^");
}
function Qe(e) {
  return st(e)
    .replace(sn, "%2B")
    .replace(gs, "+")
    .replace(on, "%23")
    .replace(ls, "%26")
    .replace(_s, "`")
    .replace(an, "{")
    .replace(cn, "}")
    .replace(rn, "^");
}
function bs(e) {
  return Qe(e).replace(ds, "%3D");
}
function ys(e) {
  return st(e).replace(on, "%23").replace(fs, "%3F");
}
function ks(e) {
  return e == null ? "" : ys(e).replace(us, "%2F");
}
function He(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function ws(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < o.length; ++s) {
    const r = o[s].replace(sn, " "),
      i = r.indexOf("="),
      d = He(i < 0 ? r : r.slice(0, i)),
      a = i < 0 ? null : He(r.slice(i + 1));
    if (d in t) {
      let u = t[d];
      J(u) || (u = t[d] = [u]), u.push(a);
    } else t[d] = a;
  }
  return t;
}
function St(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (((n = bs(n)), o == null)) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (J(o) ? o.map((r) => r && Qe(r)) : [o && Qe(o)]).forEach((r) => {
      r !== void 0 &&
        ((t += (t.length ? "&" : "") + n), r != null && (t += "=" + r));
    });
  }
  return t;
}
function $s(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 &&
      (t[n] = J(o)
        ? o.map((s) => (s == null ? null : "" + s))
        : o == null
          ? o
          : "" + o);
  }
  return t;
}
const Es = Symbol(""),
  At = Symbol(""),
  Le = Symbol(""),
  rt = Symbol(""),
  Ye = Symbol("");
function ye() {
  let e = [];
  function t(o) {
    return (
      e.push(o),
      () => {
        const s = e.indexOf(o);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function re(e, t, n, o, s) {
  const r = o && (o.enterCallbacks[s] = o.enterCallbacks[s] || []);
  return () =>
    new Promise((i, d) => {
      const a = (f) => {
          f === !1
            ? d(pe(4, { from: n, to: t }))
            : f instanceof Error
              ? d(f)
              : Zo(f)
                ? d(pe(2, { from: t, to: f }))
                : (r &&
                    o.enterCallbacks[s] === r &&
                    typeof f == "function" &&
                    r.push(f),
                  i());
        },
        u = e.call(o && o.instances[s], t, n, a);
      let l = Promise.resolve(u);
      e.length < 3 && (l = l.then(a)), l.catch((f) => d(f));
    });
}
function qe(e, t, n, o) {
  const s = [];
  for (const r of e)
    for (const i in r.components) {
      let d = r.components[i];
      if (!(t !== "beforeRouteEnter" && !r.instances[i]))
        if (Cs(d)) {
          const u = (d.__vccOpts || d)[t];
          u && s.push(re(u, n, o, r, i));
        } else {
          let a = d();
          s.push(() =>
            a.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${r.path}"`),
                );
              const l = Ro(u) ? u.default : u;
              r.components[i] = l;
              const c = (l.__vccOpts || l)[t];
              return c && re(c, n, o, r, i)();
            }),
          );
        }
    }
  return s;
}
function Cs(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Pt(e) {
  const t = K(Le),
    n = K(rt),
    o = Y(() => t.resolve(w(e.to))),
    s = Y(() => {
      const { matched: a } = o.value,
        { length: u } = a,
        l = a[u - 1],
        f = n.matched;
      if (!l || !f.length) return -1;
      const c = f.findIndex(he.bind(null, l));
      if (c > -1) return c;
      const h = Rt(a[u - 2]);
      return u > 1 && Rt(l) === h && f[f.length - 1].path !== h
        ? f.findIndex(he.bind(null, a[u - 2]))
        : c;
    }),
    r = Y(() => s.value > -1 && Ps(n.params, o.value.params)),
    i = Y(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        Jt(n.params, o.value.params),
    );
  function d(a = {}) {
    return As(a)
      ? t[w(e.replace) ? "replace" : "push"](w(e.to)).catch(we)
      : Promise.resolve();
  }
  return {
    route: o,
    href: Y(() => o.value.href),
    isActive: r,
    isExactActive: i,
    navigate: d,
  };
}
const Os = q({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Pt,
    setup(e, { slots: t }) {
      const n = ae(Pt(e)),
        { options: o } = K(Le),
        s = Y(() => ({
          [Tt(e.activeClass, o.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Tt(
            e.exactActiveClass,
            o.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }));
      return () => {
        const r = t.default && t.default(n);
        return e.custom
          ? r
          : It(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              r,
            );
      };
    },
  }),
  Ss = Os;
function As(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Ps(e, t) {
  for (const n in t) {
    const o = t[n],
      s = e[n];
    if (typeof o == "string") {
      if (o !== s) return !1;
    } else if (!J(s) || s.length !== o.length || o.some((r, i) => r !== s[i]))
      return !1;
  }
  return !0;
}
function Rt(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Tt = (e, t, n) => e ?? t ?? n,
  Rs = q({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const o = K(Ye),
        s = Y(() => e.route || o.value),
        r = K(At, 0),
        i = Y(() => {
          let u = w(r);
          const { matched: l } = s.value;
          let f;
          for (; (f = l[u]) && !f.components; ) u++;
          return u;
        }),
        d = Y(() => s.value.matched[i.value]);
      de(
        At,
        Y(() => i.value + 1),
      ),
        de(Es, d),
        de(Ye, s);
      const a = W();
      return (
        fe(
          () => [a.value, d.value, e.name],
          ([u, l, f], [c, h, p]) => {
            l &&
              ((l.instances[f] = u),
              h &&
                h !== l &&
                u &&
                u === c &&
                (l.leaveGuards.size || (l.leaveGuards = h.leaveGuards),
                l.updateGuards.size || (l.updateGuards = h.updateGuards))),
              u &&
                l &&
                (!h || !he(l, h) || !c) &&
                (l.enterCallbacks[f] || []).forEach((g) => g(u));
          },
          { flush: "post" },
        ),
        () => {
          const u = s.value,
            l = e.name,
            f = d.value,
            c = f && f.components[l];
          if (!c) return Ht(n.default, { Component: c, route: u });
          const h = f.props[l],
            p = h
              ? h === !0
                ? u.params
                : typeof h == "function"
                  ? h(u)
                  : h
              : null,
            O = It(
              c,
              T({}, p, t, {
                onVnodeUnmounted: ($) => {
                  $.component.isUnmounted && (f.instances[l] = null);
                },
                ref: a,
              }),
            );
          return Ht(n.default, { Component: O, route: u }) || O;
        }
      );
    },
  });
function Ht(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Ts = Rs;
function Hs(e) {
  const t = rs(e.routes, e),
    n = e.parseQuery || ws,
    o = e.stringifyQuery || St,
    s = e.history,
    r = ye(),
    i = ye(),
    d = ye(),
    a = Hn(se);
  let u = se;
  ue &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const l = Ge.bind(null, (_) => "" + _),
    f = Ge.bind(null, ks),
    c = Ge.bind(null, He);
  function h(_, y) {
    let v, C;
    return (
      en(_) ? ((v = t.getRecordMatcher(_)), (C = y)) : (C = _), t.addRoute(C, v)
    );
  }
  function p(_) {
    const y = t.getRecordMatcher(_);
    y && t.removeRoute(y);
  }
  function g() {
    return t.getRoutes().map((_) => _.record);
  }
  function O(_) {
    return !!t.getRecordMatcher(_);
  }
  function $(_, y) {
    if (((y = T({}, y || a.value)), typeof _ == "string")) {
      const S = We(n, _, y.path),
        I = t.resolve({ path: S.path }, y),
        ve = s.createHref(S.fullPath);
      return T(S, I, {
        params: c(I.params),
        hash: He(S.hash),
        redirectedFrom: void 0,
        href: ve,
      });
    }
    let v;
    if ("path" in _) v = T({}, _, { path: We(n, _.path, y.path).path });
    else {
      const S = T({}, _.params);
      for (const I in S) S[I] == null && delete S[I];
      (v = T({}, _, { params: f(S) })), (y.params = f(y.params));
    }
    const C = t.resolve(v, y),
      M = _.hash || "";
    C.params = l(c(C.params));
    const L = Mo(o, T({}, _, { hash: vs(M), path: C.path })),
      P = s.createHref(L);
    return T(
      { fullPath: L, hash: M, query: o === St ? $s(_.query) : _.query || {} },
      C,
      { redirectedFrom: void 0, href: P },
    );
  }
  function k(_) {
    return typeof _ == "string" ? We(n, _, a.value.path) : T({}, _);
  }
  function R(_, y) {
    if (u !== _) return pe(8, { from: y, to: _ });
  }
  function j(_) {
    return Q(_);
  }
  function F(_) {
    return j(T(k(_), { replace: !0 }));
  }
  function Z(_) {
    const y = _.matched[_.matched.length - 1];
    if (y && y.redirect) {
      const { redirect: v } = y;
      let C = typeof v == "function" ? v(_) : v;
      return (
        typeof C == "string" &&
          ((C = C.includes("?") || C.includes("#") ? (C = k(C)) : { path: C }),
          (C.params = {})),
        T(
          { query: _.query, hash: _.hash, params: "path" in C ? {} : _.params },
          C,
        )
      );
    }
  }
  function Q(_, y) {
    const v = (u = $(_)),
      C = a.value,
      M = _.state,
      L = _.force,
      P = _.replace === !0,
      S = Z(v);
    if (S)
      return Q(
        T(k(S), {
          state: typeof S == "object" ? T({}, M, S.state) : M,
          force: L,
          replace: P,
        }),
        y || v,
      );
    const I = v;
    I.redirectedFrom = y;
    let ve;
    return (
      !L &&
        xo(o, C, v) &&
        ((ve = pe(16, { to: I, from: C })), dt(C, C, !0, !1)),
      (ve ? Promise.resolve(ve) : at(I, C))
        .catch((N) => (te(N) ? (te(N, 2) ? N : Be(N)) : je(N, I, C)))
        .then((N) => {
          if (N) {
            if (te(N, 2))
              return Q(
                T({ replace: P }, k(N.to), {
                  state: typeof N.to == "object" ? T({}, M, N.to.state) : M,
                  force: L,
                }),
                y || I,
              );
          } else N = lt(I, C, !0, P, M);
          return ct(I, C, N), N;
        })
    );
  }
  function G(_, y) {
    const v = R(_, y);
    return v ? Promise.reject(v) : Promise.resolve();
  }
  function X(_) {
    const y = Ae.values().next().value;
    return y && typeof y.runWithContext == "function"
      ? y.runWithContext(_)
      : _();
  }
  function at(_, y) {
    let v;
    const [C, M, L] = Ms(_, y);
    v = qe(C.reverse(), "beforeRouteLeave", _, y);
    for (const S of C)
      S.leaveGuards.forEach((I) => {
        v.push(re(I, _, y));
      });
    const P = G.bind(null, _, y);
    return (
      v.push(P),
      le(v)
        .then(() => {
          v = [];
          for (const S of r.list()) v.push(re(S, _, y));
          return v.push(P), le(v);
        })
        .then(() => {
          v = qe(M, "beforeRouteUpdate", _, y);
          for (const S of M)
            S.updateGuards.forEach((I) => {
              v.push(re(I, _, y));
            });
          return v.push(P), le(v);
        })
        .then(() => {
          v = [];
          for (const S of _.matched)
            if (S.beforeEnter && !y.matched.includes(S))
              if (J(S.beforeEnter))
                for (const I of S.beforeEnter) v.push(re(I, _, y));
              else v.push(re(S.beforeEnter, _, y));
          return v.push(P), le(v);
        })
        .then(
          () => (
            _.matched.forEach((S) => (S.enterCallbacks = {})),
            (v = qe(L, "beforeRouteEnter", _, y)),
            v.push(P),
            le(v)
          ),
        )
        .then(() => {
          v = [];
          for (const S of i.list()) v.push(re(S, _, y));
          return v.push(P), le(v);
        })
        .catch((S) => (te(S, 8) ? S : Promise.reject(S)))
    );
  }
  function ct(_, y, v) {
    for (const C of d.list()) X(() => C(_, y, v));
  }
  function lt(_, y, v, C, M) {
    const L = R(_, y);
    if (L) return L;
    const P = y === se,
      S = ue ? history.state : {};
    v &&
      (C || P
        ? s.replace(_.fullPath, T({ scroll: P && S && S.scroll }, M))
        : s.push(_.fullPath, M)),
      (a.value = _),
      dt(_, y, v, P),
      Be();
  }
  let ge;
  function _n() {
    ge ||
      (ge = s.listen((_, y, v) => {
        if (!ft.listening) return;
        const C = $(_),
          M = Z(C);
        if (M) {
          Q(T(M, { replace: !0 }), C).catch(we);
          return;
        }
        u = C;
        const L = a.value;
        ue && Uo(bt(L.fullPath, v.delta), xe()),
          at(C, L)
            .catch((P) =>
              te(P, 12)
                ? P
                : te(P, 2)
                  ? (Q(P.to, C)
                      .then((S) => {
                        te(S, 20) &&
                          !v.delta &&
                          v.type === Ee.pop &&
                          s.go(-1, !1);
                      })
                      .catch(we),
                    Promise.reject())
                  : (v.delta && s.go(-v.delta, !1), je(P, C, L)),
            )
            .then((P) => {
              (P = P || lt(C, L, !1)),
                P &&
                  (v.delta && !te(P, 8)
                    ? s.go(-v.delta, !1)
                    : v.type === Ee.pop && te(P, 20) && s.go(-1, !1)),
                ct(C, L, P);
            })
            .catch(we);
      }));
  }
  let Ie = ye(),
    ut = ye(),
    Se;
  function je(_, y, v) {
    Be(_);
    const C = ut.list();
    return (
      C.length ? C.forEach((M) => M(_, y, v)) : console.error(_),
      Promise.reject(_)
    );
  }
  function mn() {
    return Se && a.value !== se
      ? Promise.resolve()
      : new Promise((_, y) => {
          Ie.add([_, y]);
        });
  }
  function Be(_) {
    return (
      Se ||
        ((Se = !_),
        _n(),
        Ie.list().forEach(([y, v]) => (_ ? v(_) : y())),
        Ie.reset()),
      _
    );
  }
  function dt(_, y, v, C) {
    const { scrollBehavior: M } = e;
    if (!ue || !M) return Promise.resolve();
    const L =
      (!v && Go(bt(_.fullPath, 0))) ||
      ((C || !v) && history.state && history.state.scroll) ||
      null;
    return Mt()
      .then(() => M(_, y, L))
      .then((P) => P && No(P))
      .catch((P) => je(P, _, y));
  }
  const De = (_) => s.go(_);
  let Ve;
  const Ae = new Set(),
    ft = {
      currentRoute: a,
      listening: !0,
      addRoute: h,
      removeRoute: p,
      hasRoute: O,
      getRoutes: g,
      resolve: $,
      options: e,
      push: j,
      replace: F,
      go: De,
      back: () => De(-1),
      forward: () => De(1),
      beforeEach: r.add,
      beforeResolve: i.add,
      afterEach: d.add,
      onError: ut.add,
      isReady: mn,
      install(_) {
        const y = this;
        _.component("RouterLink", Ss),
          _.component("RouterView", Ts),
          (_.config.globalProperties.$router = y),
          Object.defineProperty(_.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => w(a),
          }),
          ue &&
            !Ve &&
            a.value === se &&
            ((Ve = !0), j(s.location).catch((M) => {}));
        const v = {};
        for (const M in se) v[M] = Y(() => a.value[M]);
        _.provide(Le, y), _.provide(rt, ae(v)), _.provide(Ye, a);
        const C = _.unmount;
        Ae.add(_),
          (_.unmount = function () {
            Ae.delete(_),
              Ae.size < 1 &&
                ((u = se),
                ge && ge(),
                (ge = null),
                (a.value = se),
                (Ve = !1),
                (Se = !1)),
              C();
          });
      },
    };
  function le(_) {
    return _.reduce((y, v) => y.then(() => X(v)), Promise.resolve());
  }
  return ft;
}
function Ms(e, t) {
  const n = [],
    o = [],
    s = [],
    r = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < r; i++) {
    const d = t.matched[i];
    d && (e.matched.find((u) => he(u, d)) ? o.push(d) : n.push(d));
    const a = e.matched[i];
    a && (t.matched.find((u) => he(u, a)) || s.push(a));
  }
  return [n, o, s];
}
function ln() {
  return K(Le);
}
function un() {
  return K(rt);
}
const dn = Symbol(),
  xs = { class: "general-heading" },
  Ls = { class: "app-title" },
  Is = q({
    __name: "Options",
    setup(e) {
      de(dn, !0);
      const t = un(),
        n = W(!1);
      return (
        fe(
          t,
          () => {
            n.value = t.query.noheader === "1";
          },
          { immediate: !0 },
        ),
        document.body.setAttribute("theme", "dark"),
        (o, s) => {
          const r = et("RouterView");
          return (
            b(),
            E(
              ee,
              null,
              [
                m(
                  "main",
                  { class: Bt(["seventv-options", { "no-header": n.value }]) },
                  [m("div", xs, [m("div", Ls, [H(Dt)])]), H(r)],
                  2,
                ),
                H(bn),
              ],
              64,
            )
          );
        }
      );
    },
  });
const Je = Symbol(),
  fn = Symbol();
function js() {
  let e = K(Je, null);
  return (
    e ||
      ((e = ae({ activeStep: null, steps: new Map(), sortedSteps: [] })),
      de(Je, e)),
    e
  );
}
function _e(e) {
  const t = K(Je);
  if (!t) throw new Error("Onboarding not in context");
  const n = t.steps.get(e);
  if (!n) throw new Error("Unknown Step");
  n.active = !0;
  function o(r) {
    n && (n.completed = r);
  }
  function s(r, i) {
    !t ||
      !n ||
      ((n.locked = r),
      (t.onMove = i),
      i &&
        yn(() => {
          t.onMove = void 0;
        }));
  }
  return { setCompleted: o, setLock: s };
}
const Bs = { class: "onboarding-changelog" },
  Ds = { name: "changelog", order: 0.5 },
  Vs = q({
    __name: "OnboardingChangelog",
    setup(e) {
      const { setCompleted: t } = _e("changelog");
      return (
        Me(() => {
          t(!0);
        }),
        (n, o) => (b(), E("main", Bs, [H(xn, { "no-header": !0 })]))
      );
    },
  });
const Ns = V(Vs, [["__scopeId", "data-v-a66d21e0"]]),
  Us = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Ns, step: Ds },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Gs = (e) => (Ce("data-v-1c0eaa7d"), (e = e()), Oe(), e),
  Ws = { class: "seventv-compat" },
  qs = { class: "seventv-compat-heading" },
  zs = { key: 0, class: "seventv-compat-list" },
  Ks = ["has-issues", "is-disabled"],
  Fs = { class: "ext-heading" },
  Zs = ["src"],
  Qs = { key: 0 },
  Ys = { key: 0, class: "ext-compat-concern-list" },
  Js = { key: 0, class: "ext-compat-interact" },
  Xs = ["onClick"],
  er = { key: 1, class: "seventv-compat-permission-request" },
  tr = Gs(() => m("span", null, "Check Compatibility", -1)),
  nr = q({
    __name: "Compat",
    props: { internal: { type: Boolean } },
    emits: ["skip"],
    setup(e, { emit: t }) {
      const n = W(null),
        o = W([]),
        s = ae(new Map()),
        r = W(!1),
        i = K(dn, !1),
        d = {
          WARNING: "#ff5722",
          CLASHING: "#f44336",
          DUPLICATE_FUNCTIONALITY: "#ffc107",
          NOTE: "#2196f3",
          BAD_PERFORMANCE: "#c9427b",
        };
      fetch("https://7tv.io/v3/config/extension")
        .then((h) => h.json())
        .then((h) => (n.value = h));
      function u() {
        chrome.permissions.request({ permissions: ["management"] }, (h) => {
          r.value = h;
        });
      }
      function l() {
        chrome.management.getAll((h) => {
          var g, O;
          (o.value.length = 0),
            s.clear(),
            (o.value = h.filter(($) => $.type === "extension"));
          const p = [];
          for (const $ of o.value) {
            const k =
              (O = (g = n.value) == null ? void 0 : g.compatibility) == null
                ? void 0
                : O.find((R) => R.id.includes($.id));
            p.push([$, k ?? { id: [], issues: [] }]);
          }
          p.sort(([, $], [, k]) =>
            $.issues.length > k.issues.length ? -1 : 1,
          );
          for (const [$, k] of p) s.set($, k);
        });
      }
      function f(h) {
        chrome.management.setEnabled(h.id, !1, () => {
          h.enabled = !1;
        });
      }
      function c(h) {
        return h.issues
          .map((p) => `drop-shadow(0 0 0.1rem ${d[p.severity]})`)
          .join(" ");
      }
      return (
        i &&
          chrome &&
          chrome.permissions &&
          chrome.permissions.contains(
            { permissions: ["management"] },
            (h) => (r.value = h),
          ),
        fe(
          [r, n],
          ([h]) => {
            h && l();
          },
          { immediate: !0 },
        ),
        (h, p) => (
          b(),
          E("main", Ws, [
            m("div", qs, [
              r.value
                ? (b(),
                  E("div", zs, [
                    (b(!0),
                    E(
                      ee,
                      null,
                      ne(s, ([g, O]) => {
                        var $, k;
                        return (
                          b(),
                          E(
                            "div",
                            {
                              key: g.id,
                              class: "seventv-compat-extension-item",
                              "has-issues": !!O.issues.length,
                              "is-disabled": !g.enabled,
                              style: ze({ filter: c(O) }),
                            },
                            [
                              m("div", Fs, [
                                m(
                                  "img",
                                  {
                                    src:
                                      ((k =
                                        ($ = g.icons) == null
                                          ? void 0
                                          : $.at(-1)) == null
                                        ? void 0
                                        : k.url) ?? "",
                                  },
                                  null,
                                  8,
                                  Zs,
                                ),
                                m("h3", null, [
                                  ce(D(g.name) + " ", 1),
                                  g.shortName && g.name !== g.shortName
                                    ? (b(),
                                      E(
                                        "span",
                                        Qs,
                                        "(" + D(g.shortName) + ")",
                                        1,
                                      ))
                                    : z("", !0),
                                  m(
                                    "span",
                                    null,
                                    D(g.versionName ?? g.version),
                                    1,
                                  ),
                                ]),
                              ]),
                              H(
                                Vt,
                                null,
                                {
                                  default: x(() => [
                                    O.issues.length
                                      ? (b(),
                                        E("div", Ys, [
                                          (b(!0),
                                          E(
                                            ee,
                                            null,
                                            ne(
                                              O.issues,
                                              (R, j) => (
                                                b(),
                                                E(
                                                  "div",
                                                  {
                                                    key: j,
                                                    class: "ext-compat-concern",
                                                  },
                                                  [
                                                    m(
                                                      "h4",
                                                      {
                                                        style: ze({
                                                          color: d[R.severity],
                                                        }),
                                                      },
                                                      D(
                                                        R.severity.replace(
                                                          "_",
                                                          " ",
                                                        ),
                                                      ),
                                                      5,
                                                    ),
                                                    m(
                                                      "p",
                                                      null,
                                                      D(R.message),
                                                      1,
                                                    ),
                                                  ],
                                                )
                                              ),
                                            ),
                                            128,
                                          )),
                                        ]))
                                      : z("", !0),
                                  ]),
                                  _: 2,
                                },
                                1024,
                              ),
                              O.issues.length && g.enabled
                                ? (b(),
                                  E("div", Js, [
                                    m(
                                      "button",
                                      { onClick: (R) => f(g) },
                                      "DISABLE",
                                      8,
                                      Xs,
                                    ),
                                  ]))
                                : z("", !0),
                            ],
                            12,
                            Ks,
                          )
                        );
                      }),
                      128,
                    )),
                  ]))
                : (b(),
                  E("div", er, [
                    H(
                      U,
                      { class: "ui-button-important", onClick: u },
                      { default: x(() => [tr]), _: 1 },
                    ),
                    h.internal
                      ? (b(),
                        oe(
                          U,
                          {
                            key: 0,
                            class: "ui-button-hollow",
                            onClick: p[0] || (p[0] = (g) => t("skip")),
                          },
                          { default: x(() => [ce(" No thanks ")]), _: 1 },
                        ))
                      : z("", !0),
                  ])),
            ]),
          ])
        )
      );
    },
  });
const hn = V(nr, [["__scopeId", "data-v-1c0eaa7d"]]),
  or = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: hn },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  sr = { class: "onboarding-compat" },
  rr = { class: "header" },
  ir = { class: "compat" },
  ar = { name: "compatibility", order: 4 },
  cr = q({
    __name: "OnboardingCompat",
    emits: ["completed"],
    setup(e, { emit: t }) {
      const n = _e("compatibility");
      return (
        Me(() => {
          n.setCompleted(!0);
        }),
        (o, s) => {
          const r = ie("t");
          return (
            b(),
            E("main", sr, [
              m("div", rr, [
                A(m("h1", null, null, 512), [[r, "onboarding.compat_title"]]),
                A(m("p", null, null, 512), [[r, "onboarding.compat_subtitle"]]),
              ]),
              m("div", ir, [
                H(hn, {
                  internal: !0,
                  onSkip: s[0] || (s[0] = (i) => t("completed")),
                }),
              ]),
            ])
          );
        }
      );
    },
  });
const lr = V(cr, [["__scopeId", "data-v-7d174d05"]]),
  ur = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: lr, step: ar },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  dr = (e) => (Ce("data-v-34acda05"), (e = e()), Oe(), e),
  fr = { class: "onboarding-config" },
  hr = { class: "header" },
  pr = { class: "settings" },
  _r = { key: 0, class: "new-chat-advisory" },
  mr = { class: "emphasize-bad-compat" },
  gr = { href: "https://discord.gg/7tv", target: "_blank" },
  vr = dr(() => m("span", null, null, -1)),
  br = { key: 0, class: "questions" },
  yr = { class: "question" },
  kr = { key: 0, class: "options" },
  wr = { key: 1, class: "config" },
  $r = { name: "config", order: 2 },
  Er = q({
    __name: "OnboardingConfig",
    emits: ["completed"],
    setup(e, { emit: t }) {
      const { t: n } = tt(),
        { setCompleted: o, setLock: s } = _e("config"),
        r = kn(),
        i = ae(new Map()),
        d = ae(new Set([])),
        a = W([
          {
            id: "active-chatter",
            kind: "either",
            title: n("onboarding.config_question.chatter"),
            immediateConfigEffect: [
              ["highlights.basic.mention_sound", !0],
              ["highlights.basic.mention_title_flash", !0],
            ],
          },
          {
            id: "chatter-config-autocompletion",
            kind: "config",
            configEffect: [
              "chat_input.autocomplete.colon",
              "chat_input.autocomplete.colon.emoji",
              "chat_input.autocomplete.carousel",
              "chat_input.autocomplete.carousel_arrow_keys",
              "chat_input.autocomplete.chatters",
            ],
            title: n("onboarding.config_question.chatter_autocompletion"),
            if: ["active-chatter"],
          },
          {
            id: "chatter-config-look",
            kind: "config",
            configEffect: [
              "chat.message_batch_duration",
              "chat.smooth_scroll_duration",
              "chat.line_limit",
              "chat.alternating_background",
              "chat.padding",
              "chat.colored_mentions",
            ],
            title: n("onboarding.config_question.chatter_look"),
            if: ["active-chatter"],
          },
          {
            id: "chatter-config-ping",
            kind: "config",
            configEffect: [
              "highlights.basic.mention_title_flash",
              "highlights.basic.mention_sound",
            ],
            title: n("onboarding.config_question.chatter_ping"),
            if: ["active-chatter"],
          },
          {
            id: "chatter-config-spam",
            kind: "config",
            configEffect: [
              "general.autoclaim.channel_points",
              "chat_input.spam.bypass_duplicate",
              "chat_input.spam.rapid_fire_send",
            ],
            title: n("onboarding.config_question.chatter_spam"),
            if: ["active-chatter"],
          },
          {
            id: "moderator",
            kind: "either",
            title: n("onboarding.config_question.moderator"),
          },
          {
            id: "moderator-config",
            kind: "config",
            title: n("onboarding.config_question.moderator_utility"),
            if: ["moderator"],
            configEffect: ["chat.mod_slider"],
          },
          {
            id: "streamer",
            kind: "either",
            title: n("onboarding.config_question.streamer"),
            immediateConfigEffect: [
              ["general.blur_unlisted_emotes", !0],
              ["chat.message_batch_duration", 350],
              ["highlights.basic.mention_title_flash", !1],
              ["highlights.basic.mention_sound", !1],
            ],
          },
          {
            id: "streamer-config",
            kind: "config",
            title: n("onboarding.config_question.streamer_utility"),
            if: ["streamer"],
            configEffect: [
              "general.blur_unlisted_emotes",
              "chat.message_batch_duration",
              "chat.smooth_scroll_duration",
              "highlights.basic.mention_title_flash",
              "highlights.basic.mention_sound",
            ],
          },
        ]),
        u = W(a.value[0]);
      function l(c, h) {
        var p;
        if (
          (c && (c.answer = h),
          (u.value = null),
          h && (p = c.immediateConfigEffect) != null && p.length)
        )
          for (const [g, O] of c.immediateConfigEffect) {
            const $ = wn(g);
            $ && ($.value = O);
          }
        $n(() => {
          let g,
            O = -1;
          for (; O++, (g = a.value[a.value.indexOf(c) + (O + 1)]), !!g; ) {
            let $ = !1;
            for (const k of g.if ?? []) {
              const R = a.value.find((j) => j.id === k);
              R && R.answer === !1 && ($ = !0);
            }
            if (!$) break;
          }
          g || (t("completed"), s(!1), o(!0)), (u.value = g);
        }, 500);
      }
      const f = Object.assign({
        "/src/site/kick.com/modules/auth/AuthModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.AuthModule.3.0.9.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.AuthModule.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useRouter.3.0.9.js",
              "../../../assets/seventv.index.3.0.93.js",
              "../../../assets/seventv.main.3.0.9.js",
              "../../../assets/seventv.StarIcon.3.0.9.js",
              "../../../assets/seventv.UiButton.3.0.9.js",
              "../../../assets/seventv.UiFloating.3.0.9.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/kick.com/modules/chat/ChatModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.ChatModule.3.0.9.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.ChatModule.3.0.9.js",
              "../../../assets/seventv.index.3.0.93.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
              "../../../assets/seventv.useRouter.3.0.9.js",
              "../../../assets/seventv.ReactHooks.3.0.9.js",
              "../../../assets/seventv.useChannelContext.3.0.9.js",
              "../../../assets/seventv.main.3.0.9.js",
              "../../../assets/seventv.useChatEmotes.3.0.9.js",
              "../../../assets/seventv.useCosmetics.3.0.9.js",
              "../../../assets/seventv.StarIcon.3.0.9.js",
              "../../../assets/seventv.EmoteMenu.3.0.9.js",
              "../../../assets/seventv.Settings.3.0.9.js",
              "../../../assets/seventv.seventv.user.gql.3.0.9.js",
              "../../../assets/seventv.index.3.0.92.js",
              "../../../assets/seventv.useUpdater.3.0.9.js",
              "../../../assets/seventv.Transform.3.0.9.js",
              "../../../assets/seventv.ChatMessage.3.0.9.js",
              "../../../assets/seventv.Emote.3.0.9.js",
              "../../../assets/seventv.UiFloating.3.0.9.js",
              "../../../assets/seventv.UserTag.3.0.9.js",
              "../../../assets/seventv.UiConfirmPrompt.3.0.9.js",
              "../../../assets/seventv.CloseIcon.3.0.9.js",
              "../../../assets/seventv.v4.3.0.9.js",
              "../../../assets/seventv.useFloatContext.3.0.9.js",
              "../../../assets/seventv.UiDraggable.3.0.9.js",
              "../../../assets/seventv.TextPaintDirective.3.0.9.js",
              "../../../assets/seventv.ChatData.vue_vue_type_script_setup_true_lang.3.0.9.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/twitch.tv/modules/autoclaim/AutoclaimModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.AutoclaimModule.3.0.9.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.AutoclaimModule.3.0.9.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.ReactHooks.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/twitch.tv/modules/avatars/AvatarsModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.AvatarsModule.3.0.9.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.AvatarsModule.3.0.9.js",
              "../../../assets/seventv.ReactHooks.3.0.9.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/twitch.tv/modules/chat-input-controller/ChatInputControllerModule.vue":
          () =>
            B(
              () =>
                import(
                  "../../../assets/seventv.ChatInputControllerModule.3.0.9.js"
                ).then((c) => c._),
              [
                "../../../assets/seventv.ChatInputControllerModule.3.0.9.js",
                "../../../assets/seventv.index.3.0.9.js",
                "../../../assets/seventv.useUserAgent.3.0.9.js",
                "../../../assets/seventv.ReactHooks.3.0.9.js",
                "../../../assets/seventv.useModule.3.0.9.js",
              ],
              import.meta.url,
            ).then((c) => c.config),
        "/src/site/twitch.tv/modules/chat-input/ChatInputModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.ChatInputModule.3.0.9.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.ChatInputModule.3.0.9.js",
              "../../../assets/seventv.ReactHooks.3.0.9.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
              "../../../assets/seventv.index.3.0.93.js",
              "../../../assets/seventv.main.3.0.9.js",
              "../../../assets/seventv.Transform.3.0.9.js",
              "../../../assets/seventv.ChatMessage.3.0.9.js",
              "../../../assets/seventv.useChannelContext.3.0.9.js",
              "../../../assets/seventv.useChatEmotes.3.0.9.js",
              "../../../assets/seventv.UiConfirmPrompt.3.0.9.js",
              "../../../assets/seventv.CloseIcon.3.0.9.js",
              "../../../assets/seventv.useCosmetics.3.0.9.js",
              "../../../assets/seventv.Emote.3.0.9.js",
              "../../../assets/seventv.seventv.user.gql.3.0.9.js",
              "../../../assets/seventv.index.3.0.92.js",
              "../../../assets/seventv.StarIcon.3.0.9.js",
              "../../../assets/seventv.UiFloating.3.0.9.js",
              "../../../assets/seventv.useFloatContext.3.0.9.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/twitch.tv/modules/chat-vod/ChatVodModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.ChatVodModule.3.0.9.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.ChatVodModule.3.0.9.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.ReactHooks.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
              "../../../assets/seventv.Transform.3.0.9.js",
              "../../../assets/seventv.ChatMessage.3.0.9.js",
              "../../../assets/seventv.useChannelContext.3.0.9.js",
              "../../../assets/seventv.main.3.0.9.js",
              "../../../assets/seventv.useChatEmotes.3.0.9.js",
              "../../../assets/seventv.UserTag.3.0.9.js",
              "../../../assets/seventv.useCosmetics.3.0.9.js",
              "../../../assets/seventv.UiConfirmPrompt.3.0.9.js",
              "../../../assets/seventv.index.3.0.93.js",
              "../../../assets/seventv.CloseIcon.3.0.9.js",
              "../../../assets/seventv.Emote.3.0.9.js",
              "../../../assets/seventv.seventv.user.gql.3.0.9.js",
              "../../../assets/seventv.index.3.0.92.js",
              "../../../assets/seventv.StarIcon.3.0.9.js",
              "../../../assets/seventv.UiFloating.3.0.9.js",
              "../../../assets/seventv.v4.3.0.9.js",
              "../../../assets/seventv.useFloatContext.3.0.9.js",
              "../../../assets/seventv.UiDraggable.3.0.9.js",
              "../../../assets/seventv.ChatData.vue_vue_type_script_setup_true_lang.3.0.9.js",
              "../../../assets/seventv.index.3.0.94.js",
              "../../../assets/seventv.index.3.0.95.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/twitch.tv/modules/chat/ChatModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.ChatModule.3.0.92.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.ChatModule.3.0.92.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.ReactHooks.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
              "../../../assets/seventv.ChatMessage.3.0.9.js",
              "../../../assets/seventv.useChannelContext.3.0.9.js",
              "../../../assets/seventv.main.3.0.9.js",
              "../../../assets/seventv.useChatEmotes.3.0.9.js",
              "../../../assets/seventv.UiConfirmPrompt.3.0.9.js",
              "../../../assets/seventv.index.3.0.93.js",
              "../../../assets/seventv.CloseIcon.3.0.9.js",
              "../../../assets/seventv.UserTag.3.0.9.js",
              "../../../assets/seventv.useCosmetics.3.0.9.js",
              "../../../assets/seventv.Transform.3.0.9.js",
              "../../../assets/seventv.Emote.3.0.9.js",
              "../../../assets/seventv.seventv.user.gql.3.0.9.js",
              "../../../assets/seventv.index.3.0.92.js",
              "../../../assets/seventv.StarIcon.3.0.9.js",
              "../../../assets/seventv.UiFloating.3.0.9.js",
              "../../../assets/seventv.v4.3.0.9.js",
              "../../../assets/seventv.useFloatContext.3.0.9.js",
              "../../../assets/seventv.UiDraggable.3.0.9.js",
              "../../../assets/seventv.ChatData.vue_vue_type_script_setup_true_lang.3.0.9.js",
              "../../../assets/seventv.index.3.0.94.js",
              "../../../assets/seventv.index.3.0.95.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/twitch.tv/modules/emote-menu/EmoteMenuModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.EmoteMenuModule.3.0.9.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.EmoteMenuModule.3.0.9.js",
              "../../../assets/seventv.ReactHooks.3.0.9.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
              "../../../assets/seventv.index.3.0.93.js",
              "../../../assets/seventv.useChannelContext.3.0.9.js",
              "../../../assets/seventv.main.3.0.9.js",
              "../../../assets/seventv.useChatEmotes.3.0.9.js",
              "../../../assets/seventv.StarIcon.3.0.9.js",
              "../../../assets/seventv.useUpdater.3.0.9.js",
              "../../../assets/seventv.Transform.3.0.9.js",
              "../../../assets/seventv.ChatMessage.3.0.9.js",
              "../../../assets/seventv.EmoteMenu.3.0.9.js",
              "../../../assets/seventv.Settings.3.0.9.js",
              "../../../assets/seventv.seventv.user.gql.3.0.9.js",
              "../../../assets/seventv.index.3.0.92.js",
              "../../../assets/seventv.useCosmetics.3.0.9.js",
              "../../../assets/seventv.Emote.3.0.9.js",
              "../../../assets/seventv.UiFloating.3.0.9.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/twitch.tv/modules/hidden-elements/HiddenElementsModule.vue":
          () =>
            B(
              () =>
                import(
                  "../../../assets/seventv.HiddenElementsModule.3.0.9.js"
                ).then((c) => c._),
              [
                "../../../assets/seventv.HiddenElementsModule.3.0.9.js",
                "../../../assets/seventv.useModule.3.0.9.js",
                "../../../assets/seventv.useUserAgent.3.0.9.js",
                "../../../assets/seventv.index.3.0.9.js",
              ],
              import.meta.url,
            ).then((c) => c.config),
        "/src/site/twitch.tv/modules/mod-logs/ModLogsModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.ModLogsModule.3.0.9.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.ModLogsModule.3.0.9.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
              "../../../assets/seventv.useChannelContext.3.0.9.js",
              "../../../assets/seventv.main.3.0.9.js",
              "../../../assets/seventv.UiConfirmPrompt.3.0.9.js",
              "../../../assets/seventv.index.3.0.93.js",
              "../../../assets/seventv.CloseIcon.3.0.9.js",
              "../../../assets/seventv.UiDraggable.3.0.9.js",
              "../../../assets/seventv.useChatEmotes.3.0.9.js",
              "../../../assets/seventv.UserTag.3.0.9.js",
              "../../../assets/seventv.useCosmetics.3.0.9.js",
              "../../../assets/seventv.Transform.3.0.9.js",
              "../../../assets/seventv.ChatMessage.3.0.9.js",
              "../../../assets/seventv.Emote.3.0.9.js",
              "../../../assets/seventv.seventv.user.gql.3.0.9.js",
              "../../../assets/seventv.index.3.0.92.js",
              "../../../assets/seventv.StarIcon.3.0.9.js",
              "../../../assets/seventv.UiFloating.3.0.9.js",
              "../../../assets/seventv.v4.3.0.9.js",
              "../../../assets/seventv.useFloatContext.3.0.9.js",
              "../../../assets/seventv.ReactHooks.3.0.9.js",
              "../../../assets/seventv.index.3.0.95.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/twitch.tv/modules/settings/SettingsModule.vue": () =>
          B(
            () =>
              import("../../../assets/seventv.SettingsModule.3.0.9.js").then(
                (c) => c._,
              ),
            [
              "../../../assets/seventv.SettingsModule.3.0.9.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
              "../../../assets/seventv.Settings.3.0.9.js",
              "../../../assets/seventv.main.3.0.9.js",
              "../../../assets/seventv.StarIcon.3.0.9.js",
              "../../../assets/seventv.seventv.user.gql.3.0.9.js",
              "../../../assets/seventv.index.3.0.92.js",
              "../../../assets/seventv.index.3.0.93.js",
              "../../../assets/seventv.useUpdater.3.0.9.js",
              "../../../assets/seventv.Transform.3.0.9.js",
              "../../../assets/seventv.ChatMessage.3.0.9.js",
              "../../../assets/seventv.UiDraggable.3.0.9.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
        "/src/site/twitch.tv/modules/sidebar-previews/SidebarPreviewsModule.vue":
          () =>
            B(
              () =>
                import(
                  "../../../assets/seventv.SidebarPreviewsModule.3.0.9.js"
                ).then((c) => c._),
              [
                "../../../assets/seventv.SidebarPreviewsModule.3.0.9.js",
                "../../../assets/seventv.useModule.3.0.9.js",
                "../../../assets/seventv.useUserAgent.3.0.9.js",
                "../../../assets/seventv.index.3.0.9.js",
                "../../../assets/seventv.ReactHooks.3.0.9.js",
              ],
              import.meta.url,
            ).then((c) => c.config),
        "/src/site/youtube.com/modules/chat/ChatModule.vue": () =>
          B(
            () => import("../../../assets/seventv.ChatModule.3.0.93.js"),
            [
              "../../../assets/seventv.ChatModule.3.0.93.js",
              "../../../assets/seventv.ChatModule.vue_vue_type_script_setup_true_lang.3.0.9.js",
              "../../../assets/seventv.useModule.3.0.9.js",
              "../../../assets/seventv.useUserAgent.3.0.9.js",
              "../../../assets/seventv.index.3.0.9.js",
              "../../../assets/seventv.ChatMessage.3.0.9.js",
              "../../../assets/seventv.useChannelContext.3.0.9.js",
              "../../../assets/seventv.main.3.0.9.js",
              "../../../assets/seventv.useChatEmotes.3.0.9.js",
            ],
            import.meta.url,
          ).then((c) => c.config),
      });
      for (const c of Object.values(f))
        c().then((h) => {
          if (Array.isArray(h)) {
            r.register(h);
            for (const p of h) i.set(p.key, p);
          }
        });
      return (c, h) => {
        const p = ie("t");
        return (
          b(),
          E("main", fr, [
            m("div", hr, [
              A(m("h1", null, null, 512), [[p, "onboarding.config_title"]]),
              A(m("p", null, null, 512), [[p, "onboarding.config_subtitle"]]),
            ]),
            m("div", pr, [
              d.has("new-chat")
                ? (b(),
                  oe(
                    jt,
                    { key: 1, name: "question", appear: "" },
                    {
                      default: x(() => [
                        u.value
                          ? (b(),
                            E("div", br, [
                              m("div", yr, [
                                m("h2", null, D(u.value.title), 1),
                                u.value.kind === "either"
                                  ? (b(),
                                    E("div", kr, [
                                      H(
                                        U,
                                        {
                                          onClick:
                                            h[1] ||
                                            (h[1] = (g) => l(u.value, !0)),
                                        },
                                        {
                                          default: x(() => [
                                            A(m("span", null, null, 512), [
                                              [
                                                p,
                                                "onboarding.config_answer_button_yes",
                                              ],
                                            ]),
                                          ]),
                                          _: 1,
                                        },
                                      ),
                                      H(
                                        U,
                                        {
                                          onClick:
                                            h[2] ||
                                            (h[2] = (g) => l(u.value, !1)),
                                        },
                                        {
                                          default: x(() => [
                                            A(m("span", null, null, 512), [
                                              [
                                                p,
                                                "onboarding.config_answer_button_no",
                                              ],
                                            ]),
                                          ]),
                                          _: 1,
                                        },
                                      ),
                                    ]))
                                  : u.value.kind === "config" &&
                                      u.value.configEffect
                                    ? (b(),
                                      E("div", wr, [
                                        H(Vt, null, {
                                          default: x(() => [
                                            (b(!0),
                                            E(
                                              ee,
                                              null,
                                              ne(
                                                u.value.configEffect.map((g) =>
                                                  i.get(g),
                                                ),
                                                (g) => (
                                                  b(),
                                                  oe(
                                                    In,
                                                    { key: g.key, node: g },
                                                    null,
                                                    8,
                                                    ["node"],
                                                  )
                                                ),
                                              ),
                                              128,
                                            )),
                                          ]),
                                          _: 1,
                                        }),
                                        H(
                                          U,
                                          {
                                            onClick:
                                              h[3] ||
                                              (h[3] = (g) => l(u.value, !0)),
                                          },
                                          {
                                            default: x(() => [
                                              A(m("span", null, null, 512), [
                                                [
                                                  p,
                                                  "onboarding.button_confirm",
                                                ],
                                              ]),
                                            ]),
                                            _: 1,
                                          },
                                        ),
                                      ]))
                                    : z("", !0),
                              ]),
                            ]))
                          : z("", !0),
                      ]),
                      _: 1,
                    },
                  ))
                : (b(),
                  E("div", _r, [
                    A(m("strong", null, null, 512), [
                      [p, "onboarding.config_new_chat_advisory"],
                    ]),
                    A(m("span", mr, null, 512), [
                      [p, "onboarding.config_emphasize-bad-compat"],
                    ]),
                    m("div", null, [
                      A(m("p", null, null, 512), [
                        [p, "onboarding.config_bear_with_us1"],
                      ]),
                      A(m("a", gr, null, 512), [
                        [p, "onboarding.config_bear_with_us2"],
                      ]),
                    ]),
                    vr,
                    H(
                      U,
                      {
                        class: "ui-button-important",
                        onClick:
                          h[0] || (h[0] = (g) => [d.add("new-chat"), w(s)(!1)]),
                      },
                      {
                        icon: x(() => [H(Ln)]),
                        default: x(() => [
                          A(m("span", null, null, 512), [
                            [p, "onboarding.config_action_button"],
                          ]),
                        ]),
                        _: 1,
                      },
                    ),
                  ])),
            ]),
          ])
        );
      };
    },
  });
const Cr = V(Er, [["__scopeId", "data-v-34acda05"]]),
  Or = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Cr, step: $r },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Sr = {},
  Ar = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 512",
    width: "1em",
    height: "1em",
    fill: "currentColor",
  },
  Pr = m(
    "path",
    {
      d: "M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z",
    },
    null,
    -1,
  ),
  Rr = [Pr];
function Tr(e, t) {
  return b(), E("svg", Ar, Rr);
}
const Hr = V(Sr, [["render", Tr]]),
  Mr = {},
  xr = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: "1em",
    height: "1em",
    fill: "currentColor",
  },
  Lr = m(
    "path",
    {
      d: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z",
    },
    null,
    -1,
  ),
  Ir = [Lr];
function jr(e, t) {
  return b(), E("svg", xr, Ir);
}
const Br = V(Mr, [["render", jr]]),
  Dr = (e) => (Ce("data-v-13b0747d"), (e = e()), Oe(), e),
  Vr = { class: "onboarding-end" },
  Nr = { class: "header" },
  Ur = { class: "discord" },
  Gr = Dr(() => m("div", null, null, -1)),
  Wr = { class: "rate" },
  qr = { class: "social" },
  zr = { name: "end", order: 100, color: "var(--seventv-primary)" },
  Kr = q({
    __name: "OnboardingEnd",
    setup(e) {
      const { t } = tt();
      _e("platforms");
      const n = Mn(),
        o = ae({ loaded: !1, name: "", invite: "", online_members: 0 });
      fetch(
        "https://discord.com/api/guilds/817075418054000661/widget.json",
      ).then(async (d) => {
        const a = await d.json();
        (o.name = a.name),
          (o.invite = a.instant_invite),
          (o.online_members = a.presence_count),
          (o.loaded = !0);
      });
      function s() {
        chrome.tabs.create({ url: o.invite });
      }
      function r() {
        switch (n.browser.name) {
          case "Firefox":
            chrome.tabs.create({
              url: "https://addons.mozilla.org/en-US/firefox/addon/7tv/",
            });
            break;
          default:
            chrome.tabs.create({
              url: "https://chrome.google.com/webstore/detail/7tv/ammjkodgmmoknidbanneddgankgfejfh",
            });
            break;
        }
      }
      function i() {
        chrome.tabs.create({ url: "https://twitter.com/Official_7TV" });
      }
      return (
        Xe(() => {
          !chrome || !chrome.storage || chrome.storage.local.remove("upgraded");
        }),
        (d, a) => {
          const u = ie("t");
          return (
            b(),
            E("main", Vr, [
              m("div", Nr, [
                A(m("h1", null, null, 512), [[u, "onboarding.end_title"]]),
                A(m("p", null, null, 512), [[u, "onboarding.end_subtitle"]]),
              ]),
              A(
                m(
                  "div",
                  Ur,
                  [
                    m("h2", null, [
                      ce(D(o.name) + " on Discord ", 1),
                      m(
                        "sub",
                        null,
                        D(o.online_members) + " members online",
                        1,
                      ),
                    ]),
                    Gr,
                    H(
                      U,
                      { onClick: s },
                      {
                        icon: x(() => [H(Hr)]),
                        default: x(() => [
                          A(m("span", null, null, 512), [
                            [u, "onboarding.button_join"],
                          ]),
                        ]),
                        _: 1,
                      },
                    ),
                  ],
                  512,
                ),
                [[En, o.loaded]],
              ),
              m("div", Wr, [
                m("h2", null, [
                  ce(D(w(t)("onboarding.end_review1")) + " ", 1),
                  A(m("sub", null, null, 512), [[u, "onboarding.end_review2"]]),
                ]),
                m("div", { class: "stars", onClick: r }, [
                  (b(!0),
                  E(
                    ee,
                    null,
                    ne(Array(5), (l) => (b(), oe(jn, { key: l }))),
                    128,
                  )),
                ]),
                H(
                  U,
                  { onClick: r },
                  {
                    default: x(() => [
                      A(m("span", null, null, 512), [
                        [u, "onboarding.button_review"],
                      ]),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              m("div", qr, [
                m("h2", null, [
                  ce(D(w(t)("onboarding.end_social_media1")) + " ", 1),
                  A(m("sub", null, null, 512), [
                    [u, "onboarding.end_social_media2"],
                  ]),
                ]),
                m("div", null, [H(Br, { onClick: i })]),
              ]),
            ])
          );
        }
      );
    },
  });
const Fr = V(Kr, [["__scopeId", "data-v-13b0747d"]]),
  Zr = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Fr, step: zr },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Qr = {},
  Yr = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1539.02 1539.02" },
  Jr = m("rect", { width: "1539.02", height: "1539.02" }, null, -1),
  Xr = m(
    "polygon",
    {
      fill: "#53fc19",
      "fill-rule": "evenodd",
      points:
        "278.26 216.86 646.7 216.86 646.7 462.48 769.51 462.48 769.51 339.67 892.32 339.67 892.32 216.86 1260.75 216.86 1260.75 585.29 1137.94 585.29 1137.94 708.1 1015.13 708.1 1015.13 830.91 1137.94 830.91 1137.94 953.72 1260.75 953.72 1260.75 1322.16 892.32 1322.16 892.32 1199.35 769.51 1199.35 769.51 1076.54 646.7 1076.54 646.7 1322.16 278.26 1322.16 278.26 216.86",
    },
    null,
    -1,
  ),
  ei = [Jr, Xr];
function ti(e, t) {
  return b(), E("svg", Yr, ei);
}
const ni = V(Qr, [["render", ti]]),
  oi = {},
  si = {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 2400 2800",
    width: "1em",
    height: "1em",
  },
  ri = m(
    "polygon",
    {
      fill: "#ffffff",
      points:
        "2200,1300 1800,1700 1400,1700 1050,2050 1050,1700 600,1700 600,200 2200,200",
    },
    null,
    -1,
  ),
  ii = m(
    "path",
    {
      fill: "#9146ff",
      d: `M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600
					V1300z`,
    },
    null,
    -1,
  ),
  ai = m(
    "rect",
    { x: "1700", y: "550", fill: "#9146ff", width: "200", height: "600" },
    null,
    -1,
  ),
  ci = m(
    "rect",
    { x: "1150", y: "550", fill: "#9146ff", width: "200", height: "600" },
    null,
    -1,
  ),
  li = [ri, ii, ai, ci];
function ui(e, t) {
  return b(), E("svg", si, li);
}
const di = V(oi, [["render", ui]]),
  fi = {},
  hi = {
    xmlns: "http://www.w3.org/2000/svg",
    height: "1em",
    width: "1em",
    viewBox: "-35.20005 -41.33325 305.0671 247.9995",
  },
  pi = m(
    "path",
    {
      d: "M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85",
      fill: "red",
    },
    null,
    -1,
  ),
  _i = m(
    "path",
    { d: "M93.333 117.559l61.333-34.89-61.333-34.894z", fill: "#fff" },
    null,
    -1,
  ),
  mi = [pi, _i];
function gi(e, t) {
  return b(), E("svg", hi, mi);
}
const vi = V(fi, [["render", gi]]),
  bi = { class: "onboarding-platforms" },
  yi = { class: "header" },
  ki = { class: "sites" },
  wi = ["selected", "onClick"],
  $i = { class: "data" },
  Ei = { name: "platforms", order: 1 },
  Ci = q({
    __name: "OnboardingPlatforms",
    setup(e) {
      const t = _e("platforms");
      Xe(() => {
        t.setLock(!0, () => {
          const s = n.value.filter((i) => i.selected);
          if (s.length === 0) return !1;
          const r = s.flatMap((i) => i.hosts ?? []);
          chrome.permissions.request({ origins: r }, (i) => {
            i && t.setLock(!1);
          });
        });
      }),
        Me(() => {
          t.setCompleted(!0);
        });
      const n = W([
        { name: "Twitch", icon: ke(di), selected: !0 },
        {
          name: "YouTube",
          icon: ke(vi),
          hosts: ["*://*.youtube.com/*"],
          selected: !0,
        },
        {
          name: "Kick",
          icon: ke(ni),
          hosts: ["*://*.kick.com/*"],
          selected: !0,
        },
      ]);
      function o(s) {
        s.selected = !s.selected;
      }
      return (s, r) => {
        const i = ie("t");
        return (
          b(),
          E("main", bi, [
            m("div", yi, [
              A(m("h1", null, null, 512), [[i, "onboarding.platforms_title"]]),
              A(m("p", null, null, 512), [
                [i, "onboarding.platforms_subtitle"],
              ]),
            ]),
            m("div", ki, [
              (b(!0),
              E(
                ee,
                null,
                ne(
                  n.value,
                  (d) => (
                    b(),
                    E(
                      "div",
                      {
                        key: d.name,
                        class: "supported-site",
                        selected: d.selected,
                        onClick: (a) => o(d),
                      },
                      [(b(), oe(nt(d.icon)))],
                      8,
                      wi,
                    )
                  ),
                ),
                128,
              )),
            ]),
            A(m("div", $i, null, 512), [
              [i, "onboarding.platforms_mutable_note"],
            ]),
          ])
        );
      };
    },
  });
const Oi = V(Ci, [["__scopeId", "data-v-6c248fde"]]),
  Si = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Oi, step: Ei },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Ai = {},
  Pi = {
    id: "Badge",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 300 300",
  },
  Ri = Cn(
    '<path fill="#7314ef" d="M300,33.22V266.78A33.22,33.22,0,0,1,266.78,300H33.22A33.22,33.22,0,0,1,0,266.78V33.22A33.22,33.22,0,0,1,33.22,0H266.78a33.13,33.13,0,0,1,17.43,4.93,33.61,33.61,0,0,1,7.44,6.26A33.11,33.11,0,0,1,300,33.22Z"></path><path fill="#f730d0" d="M148.33,300H33.22A33.22,33.22,0,0,1,0,266.78V147.71A279,279,0,0,1,148.33,300Z"></path><circle fill="#490ca2" cx="24.39" cy="240.67" r="16.78"></circle><path fill="#490ca2" d="M83.83,300H50.66a16.78,16.78,0,0,1,33.17,0Z"></path><path fill="#e9b346" d="M300,33.22V134.11A165.85,165.85,0,0,1,249.16,142,166.38,166.38,0,0,1,84.59,0H266.78a33.13,33.13,0,0,1,17.43,4.93,33.61,33.61,0,0,1,7.44,6.26A33.11,33.11,0,0,1,300,33.22Z"></path><path fill="#7314ef" d="M300,33.22v91.61a156.8,156.8,0,0,1-51.29,8.57A157.3,157.3,0,0,1,93.27,0H266.78a33.13,33.13,0,0,1,17.43,4.93,33.61,33.61,0,0,1,7.44,6.26A33.11,33.11,0,0,1,300,33.22Z"></path><path fill="#e9b346" d="M300,33.22V91.58a125.89,125.89,0,0,1-51.29,10.86A126.33,126.33,0,0,1,124.68,0h142.1a33.13,33.13,0,0,1,17.43,4.93,33.61,33.61,0,0,1,7.44,6.26A33.11,33.11,0,0,1,300,33.22Z"></path><path fill="#7314ef" d="M300,33.22V81.53a116.82,116.82,0,0,1-50.84,11.55A117.41,117.41,0,0,1,134.3,0H266.78a33.13,33.13,0,0,1,17.43,4.93,33.61,33.61,0,0,1,7.44,6.26A33.11,33.11,0,0,1,300,33.22Z"></path><path fill="#e9b346" d="M300,33.22V52.43a91.59,91.59,0,0,1-50.84,15.28A92.06,92.06,0,0,1,160.42,0H266.78a33.13,33.13,0,0,1,17.43,4.93,33.61,33.61,0,0,1,7.44,6.26A33.11,33.11,0,0,1,300,33.22Z"></path><path fill="#7314ef" d="M300,33.22v7.87a82.43,82.43,0,0,1-50.84,17.44A82.85,82.85,0,0,1,170,0h96.82a33.13,33.13,0,0,1,17.43,4.93,33.61,33.61,0,0,1,7.44,6.26A33.11,33.11,0,0,1,300,33.22Z"></path><path fill="#e9b346" d="M291.65,11.19a55.56,55.56,0,0,1-42.94,20.26A55.63,55.63,0,0,1,198.6,0h68.18a33.13,33.13,0,0,1,17.43,4.93A33.61,33.61,0,0,1,291.65,11.19Z"></path><path fill="#7314ef" d="M284.21,4.93a45.52,45.52,0,0,1-35,16.4A45.58,45.58,0,0,1,210.53,0h56.25A33.13,33.13,0,0,1,284.21,4.93Z"></path>',
    12,
  ),
  Ti = [Ri];
function Hi(e, t) {
  return b(), E("svg", Pi, Ti);
}
const Mi = V(Ai, [["render", Hi]]),
  xi = {
    id: "Badge",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 300 300",
    width: "1em",
  },
  Li = { key: 0 },
  Ii = ["id", "gradientTransform"],
  ji = ["offset", "stop-color"],
  Bi = { key: 1 },
  Di = ["id", "gradientTransform"],
  Vi = ["offset", "stop-color", "stop-opacity"],
  Ni = { key: 2 },
  Ui = ["id", "gradientTransform"],
  Gi = ["offset", "stop-color"],
  Wi = { key: 3, id: "Background" },
  qi = ["fill"],
  zi = ["fill"],
  Ki = { id: "Border" },
  Fi = ["fill"],
  Zi = ["fill"],
  Qi = { key: 6, id: "Logo" },
  Yi = ["fill"],
  Ji = ["fill"],
  Xi = ["fill"],
  ea = q({
    __name: "VectorBadge",
    props: { logo: {}, border: {}, background: {} },
    setup(e) {
      const t = e,
        n = Math.random().toString(36).substring(7),
        o = t.background ?? {},
        s = t.border ?? { color: "transparent" },
        r = t.logo ?? { color: "#ffffff" },
        i = o.gradient,
        d = s.gradient,
        a = r.gradient;
      return (u, l) => {
        var f;
        return (
          b(),
          E("svg", xi, [
            w(i) && Array.isArray(w(i).stops) && w(i).stops.length
              ? (b(),
                E("defs", Li, [
                  m(
                    "linearGradient",
                    {
                      id: `BadgeGradient1-${w(n)}`,
                      gradientTransform: "rotate(" + w(i).angle + ")",
                    },
                    [
                      (b(!0),
                      E(
                        ee,
                        null,
                        ne(
                          w(i).stops,
                          (c, h) => (
                            b(),
                            E(
                              "stop",
                              {
                                key: h,
                                offset: (c.offset * 100).toString(10) + "%",
                                "stop-color": c.color,
                              },
                              null,
                              8,
                              ji,
                            )
                          ),
                        ),
                        128,
                      )),
                    ],
                    8,
                    Ii,
                  ),
                ]))
              : z("", !0),
            w(d) && Array.isArray(w(d).stops) && w(d).stops.length
              ? (b(),
                E("defs", Bi, [
                  m(
                    "linearGradient",
                    {
                      id: `BadgeGradient2-${w(n)}`,
                      gradientTransform: "rotate(" + w(d).angle + ")",
                    },
                    [
                      (b(!0),
                      E(
                        ee,
                        null,
                        ne(
                          w(d).stops,
                          (c, h) => (
                            b(),
                            E(
                              "stop",
                              {
                                key: h,
                                offset: (c.offset * 100).toString(10) + "%",
                                "stop-color": c.color,
                                "stop-opacity": c.opacity ?? 1,
                              },
                              null,
                              8,
                              Vi,
                            )
                          ),
                        ),
                        128,
                      )),
                    ],
                    8,
                    Di,
                  ),
                ]))
              : z("", !0),
            w(a) && Array.isArray(w(a).stops) && w(a).stops.length
              ? (b(),
                E("defs", Ni, [
                  m(
                    "linearGradient",
                    {
                      id: `BadgeGradient3-${w(n)}`,
                      x1: "0%",
                      y1: "0%",
                      x2: "100%",
                      y2: "100%",
                      gradientTransform: "rotate(" + w(a).angle + ")",
                      gradientUnits: "userSpaceOnUse",
                    },
                    [
                      (b(!0),
                      E(
                        ee,
                        null,
                        ne(
                          w(a).stops,
                          (c, h) => (
                            b(),
                            E(
                              "stop",
                              {
                                key: h,
                                offset: (c.offset * 100).toString(10) + "%",
                                "stop-color": c.color,
                              },
                              null,
                              8,
                              Gi,
                            )
                          ),
                        ),
                        128,
                      )),
                    ],
                    8,
                    Ui,
                  ),
                ]))
              : z("", !0),
            (f = u.background) != null && f.component
              ? (b(), oe(nt(ke(u.background.component)), { key: 4 }))
              : (b(),
                E("g", Wi, [
                  w(i)
                    ? (b(),
                      E(
                        "rect",
                        {
                          key: 0,
                          fill: `url(#BadgeGradient1-${w(n)})`,
                          width: "300",
                          height: "300",
                          rx: "33.22",
                        },
                        null,
                        8,
                        qi,
                      ))
                    : (b(),
                      E(
                        "rect",
                        {
                          key: 1,
                          fill: w(o).color,
                          width: "300",
                          height: "300",
                          rx: "33.22",
                        },
                        null,
                        8,
                        zi,
                      )),
                ])),
            m("g", Ki, [
              m(
                "path",
                {
                  fill: w(d) ? `url(#BadgeGradient2-${w(n)})` : w(s).color,
                  d: "M266.78,17A16.24,16.24,0,0,1,283,33.22V266.78A16.24,16.24,0,0,1,266.78,283H33.22A16.24,16.24,0,0,1,17,266.78V33.22A16.24,16.24,0,0,1,33.22,17H266.78m0-17H33.22A33.22,33.22,0,0,0,0,33.22V266.78A33.22,33.22,0,0,0,33.22,300H266.78A33.22,33.22,0,0,0,300,266.78V33.22A33.22,33.22,0,0,0,266.78,0Z",
                },
                null,
                8,
                Fi,
              ),
            ]),
            w(a)
              ? (b(),
                E(
                  "path",
                  {
                    key: 5,
                    fill: w(a) ? `url(#BadgeGradient3-${w(n)})` : void 0,
                    d: "M211.19,113.56l10.36-18L227.14,86,216.78,68v-.41H161.45l10.36,18,10.36,18,5.81,10h23.21M97,234.58l10.36-18,10.36-18,10.36-18,10.37-18,10.36-18,10.36-18,7.67-13.26-10.37-18-10.36-18L140.31,68H52.85L42.49,86,36.9,95.32l10.36,18v.41h66.32l-10.37,18-10.36,18-10.36,18-10.36,18-10.36,18-7.26,12.85,10.36,18V235H97m86.62-.42h31.71l10.36-18,10.37-18,10.36-18,10.36-18L264,150l-10.36-18v-.41H221.76l-10.37,18-10.36,18-1.45,2.69-10.36-18-10.36-18-1.45-2.69-10.37,18-10.36,18-5.8,9.94,10.36,18,10.36,18,10.37,18,1.65,2.9M266.78,17A16.24,16.24,0,0,1,283,33.22V266.78A16.24,16.24,0,0,1,266.78,283H33.22A16.24,16.24,0,0,1,17,266.78V33.22A16.24,16.24,0,0,1,33.22,17H266.78m0-17H33.22A33.22,33.22,0,0,0,0,33.22V266.78A33.22,33.22,0,0,0,33.22,300H266.78A33.22,33.22,0,0,0,300,266.78V33.22A33.22,33.22,0,0,0,266.78,0Z",
                  },
                  null,
                  8,
                  Zi,
                ))
              : (b(),
                E("g", Qi, [
                  m(
                    "path",
                    {
                      fill: w(r).color,
                      d: "M211.19,113.56l10.36-18L227.14,86,216.78,68v-.41H161.45l10.36,18,10.36,18,5.81,10h23.21",
                    },
                    null,
                    8,
                    Yi,
                  ),
                  m(
                    "path",
                    {
                      fill: w(r).color,
                      d: "M97,234.58l10.36-18,10.36-18,10.36-18,10.37-18,10.36-18,10.36-18,7.67-13.26-10.37-18-10.36-18-5.8-9.32H52.85l-10.36,18L36.9,95.32l10.36,18v.41h66.32l-10.37,18-10.36,18-10.36,18-10.36,18-10.36,18-7.26,12.85,10.36,18v.42H97",
                    },
                    null,
                    8,
                    Ji,
                  ),
                  m(
                    "path",
                    {
                      fill: w(r).color,
                      d: "M183.62,234.58h31.71l10.36-18,10.37-18,10.36-18,10.36-18L264,150l-10.36-18v-.41H221.76l-10.37,18-10.36,18-1.45,2.69-10.36-18-10.36-18-1.45-2.69-10.37,18-10.36,18-5.8,9.94,10.36,18,10.36,18,10.37,18,1.65,2.9",
                    },
                    null,
                    8,
                    Xi,
                  ),
                ])),
          ])
        );
      };
    },
  }),
  me = (e) => (Ce("data-v-402bfb8e"), (e = e()), Oe(), e),
  ta = { class: "onboarding-promo" },
  na = { class: "header" },
  oa = { class: "cards" },
  sa = { class: "card-box", name: "paints" },
  ra = me(() =>
    m(
      "span",
      { class: "seventv-painted-content", "data-seventv-painted-text": !0 },
      "CoolChatter777",
      -1,
    ),
  ),
  ia = [ra],
  aa = { class: "card-box", name: "personal-emotes" },
  ca = me(() =>
    m(
      "div",
      null,
      [
        m("img", {
          src: "https://cdn.7tv.app/emote/6042089e77137b000de9e669/2x.webp",
        }),
      ],
      -1,
    ),
  ),
  la = me(() =>
    m(
      "div",
      null,
      [
        m("img", {
          src: "https://cdn.7tv.app/emote/60aee9d5361b0164e60d02c2/2x.webp",
        }),
      ],
      -1,
    ),
  ),
  ua = me(() =>
    m(
      "div",
      null,
      [
        m("img", {
          src: "https://cdn.7tv.app/emote/60ae7316f7c927fad14e6ca2/2x.webp",
        }),
      ],
      -1,
    ),
  ),
  da = [ca, la, ua],
  fa = { class: "card-box", name: "badges" },
  ha = { class: "card-box", name: "animated-avatars" },
  pa = me(() =>
    m(
      "div",
      null,
      [
        m("img", {
          src: "https://cdn.7tv.app/emote/630393c6dd2e5e55608ef9f6/2x.webp",
        }),
      ],
      -1,
    ),
  ),
  _a = [pa],
  ma = { class: "card-explain" },
  ga = { class: "asterisk-note" },
  va = { class: "card-explain" },
  ba = { class: "card-explain" },
  ya = { class: "card-explain" },
  ka = { class: "interact" },
  wa = me(() => m("div", { class: "footer" }, null, -1)),
  $a = {
    name: "promotion",
    order: 77,
    color: "var(--seventv-subscriber-color)",
  },
  Ea = q({
    __name: "OnboardingPromo",
    emits: ["completed"],
    setup(e, { emit: t }) {
      const { t: n } = tt();
      function o() {
        window.open("https://7tv.app/store", "_blank");
      }
      function s() {
        t("completed");
      }
      return (r, i) => {
        const d = ie("t"),
          a = ie("tooltip");
        return (
          b(),
          E("main", ta, [
            m("div", na, [
              A(m("h1", null, null, 512), [[d, "onboarding.promo_cta"]]),
              A(m("sub", null, null, 512), [[d, "onboarding.promo_plead"]]),
            ]),
            m("div", oa, [
              A((b(), E("div", sa, ia)), [
                [a, w(n)("onboarding.promo_nametag_paints_tooltip")],
              ]),
              A((b(), E("div", aa, da)), [
                [a, w(n)("onboarding.promo_personal_emotes_tooltip")],
              ]),
              A(
                (b(),
                E("div", fa, [
                  H(
                    ea,
                    { background: { component: Mi }, logo: { color: "white" } },
                    null,
                    8,
                    ["background"],
                  ),
                ])),
                [[a, w(n)("onboarding.promo_badges_tooltip")]],
              ),
              A((b(), E("div", ha, _a)), [
                [a, w(n)("onboarding.promo_animated_avatars_tooltip")],
              ]),
              m("div", ma, [
                m("p", null, [
                  ce(D(w(n)("onboarding.promo_nametag_paints")) + " ", 1),
                  A((b(), E("span", ga, [ce(" * ")])), [
                    [a, w(n)("onboarding.promo_nametag_paints_caveat")],
                  ]),
                ]),
              ]),
              m("div", va, D(w(n)("onboarding.promo_personal_emotes")), 1),
              m("div", ba, D(w(n)("onboarding.promo_badges")), 1),
              m("div", ya, D(w(n)("onboarding.promo_animated_avatars")), 1),
            ]),
            m("div", ka, [
              H(
                U,
                { class: "interact-subscribe", onClick: o },
                {
                  default: x(() => [
                    A(m("span", null, null, 512), [
                      [d, "onboarding.promo_subscribe"],
                    ]),
                  ]),
                  _: 1,
                },
              ),
              H(
                U,
                { class: "ui-button-hollow interact-skip", onClick: s },
                {
                  default: x(() => [
                    A(m("span", null, null, 512), [
                      [d, "onboarding.promo_reject"],
                    ]),
                  ]),
                  _: 1,
                },
              ),
            ]),
            wa,
          ])
        );
      };
    },
  });
const Ca = V(Ea, [["__scopeId", "data-v-402bfb8e"]]),
  Oa = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Ca, step: $a },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Sa = { class: "onboarding-start" },
  Aa = { class: "feature-logo" },
  Pa = { class: "feature-text" },
  Ra = { key: 0, style: { marginLeft: "0.5rem", fontSize: "0.75rem" } },
  Ta = { class: "feature-buttons" },
  Ha = { name: "start", order: 0 },
  Ma = q({
    __name: "OnboardingStart",
    setup(e) {
      Yt({ title: "Onboarding" }), _e("start");
      const t = K(fn, W(!1)),
        n = ln();
      function o() {
        n.push({ name: "Onboarding", params: { step: "promotion" } });
      }
      return (s, r) => {
        const i = et("RouterLink"),
          d = ie("t");
        return (
          b(),
          E("main", Sa, [
            m("div", Aa, [H(Dt)]),
            m("div", Pa, [
              A(m("h1", null, null, 512), [
                [
                  d,
                  w(t)
                    ? "onboarding.start_title_upgraded"
                    : "onboarding.start_title",
                ],
              ]),
              A(m("p", null, null, 512), [
                [
                  d,
                  w(t)
                    ? "onboarding.start_subtitle_upgraded"
                    : "onboarding.start_subtitle",
                ],
              ]),
              m("span", null, [
                A(m("span", null, null, 512), [
                  [
                    d,
                    w(t)
                      ? "onboarding.start_skip_note_upgraded"
                      : "onboarding.start_skip_note",
                  ],
                ]),
                w(t)
                  ? A((b(), E("span", Ra, null, 512)), [
                      [d, "onboarding.start_skip_note_upgraded_quirky"],
                    ])
                  : z("", !0),
              ]),
            ]),
            m("div", Ta, [
              H(
                U,
                { class: "ui-button-hollow", onClick: o },
                {
                  default: x(() => [
                    A(m("span", null, null, 512), [
                      [d, "onboarding.button_skip"],
                    ]),
                  ]),
                  _: 1,
                },
              ),
              H(
                i,
                {
                  to: {
                    name: "Onboarding",
                    params: { step: w(t) ? "changelog" : "platforms" },
                  },
                },
                {
                  default: x(() => [
                    H(
                      U,
                      { class: "ui-button-important" },
                      {
                        icon: x(() => [H(Nt, { direction: "right" })]),
                        default: x(() => [
                          A(m("span", null, null, 512), [
                            [
                              d,
                              w(t)
                                ? "onboarding.button_changelog"
                                : "onboarding.button_platforms",
                            ],
                          ]),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["to"],
              ),
            ]),
          ])
        );
      };
    },
  });
const xa = V(Ma, [["__scopeId", "data-v-203026d9"]]),
  La = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: xa, step: Ha },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Ia = (e) => (Ce("data-v-fd738665"), (e = e()), Oe(), e),
  ja = { class: "onboarding" },
  Ba = { key: 0, class: "active-content" },
  Da = Ia(() => m("span", null, "Back", -1)),
  Va = q({
    __name: "Onboarding",
    setup(e) {
      const t = js(),
        n = un(),
        o = ln(),
        s = W(!1),
        r = W(!1);
      de(fn, r),
        chrome &&
          chrome.storage &&
          chrome.storage.local.get(({ upgraded: u }) => {
            r.value = u;
          });
      const i = Object.assign({
        "./Onboarding.vue": Bn,
        "./OnboardingChangelog.vue": Us,
        "./OnboardingCompat.vue": ur,
        "./OnboardingConfig.vue": Or,
        "./OnboardingEnd.vue": Zr,
        "./OnboardingPlatforms.vue": Si,
        "./OnboardingPromo.vue": Oa,
        "./OnboardingStart.vue": La,
      });
      for (const u of Object.values(i)) {
        const l = u.step,
          f = u.default;
        !l ||
          !(l.name && typeof l.order == "number") ||
          !f ||
          t.steps.set(
            l.name,
            ae({
              name: l.name,
              order: l.order,
              component: ke(f),
              locked: !1,
              completed: !1,
              active: !1,
              color: l.color,
            }),
          );
      }
      function d(u) {
        var h;
        if (!t) return;
        const l = t.activeStep;
        if (!l) return;
        const f = t.sortedSteps.indexOf(l);
        if (f === -1) return;
        const c = t.sortedSteps[f + u];
        c &&
          (u < 0 ? (l.locked = !1) : (h = t.onMove) == null || h.call(t),
          On(() => l.locked)
            .not.toBeTruthy()
            .then(() => {
              o.push({ name: "Onboarding", params: { step: c.name } });
            }));
      }
      function a() {
        chrome.tabs.getCurrent((u) => {
          !u || typeof u.id != "number" || chrome.tabs.remove(u.id);
        });
      }
      return (
        fe(
          () => n.params.step,
          (u) => {
            var l;
            (t.activeStep = t.steps.get(u) ?? null),
              (s.value =
                ((l = t.activeStep) == null ? void 0 : l.name) === "end" || !1);
          },
          { immediate: !0 },
        ),
        fe(
          t.steps,
          (u) => {
            t.sortedSteps = [...u.values()].sort((l, f) => l.order - f.order);
          },
          { immediate: !0 },
        ),
        (u, l) => {
          const f = et("RouterLink"),
            c = ie("tooltip");
          return (
            b(),
            E("main", ja, [
              w(t).activeStep
                ? (b(),
                  E("div", Ba, [
                    H(
                      jt,
                      { name: "step-animation", mode: "out-in" },
                      {
                        default: x(() => [
                          (b(),
                          oe(
                            Sn,
                            null,
                            [
                              (b(),
                              oe(
                                nt(w(t).activeStep.component),
                                { onCompleted: l[0] || (l[0] = (h) => d(1)) },
                                null,
                                32,
                              )),
                            ],
                            1024,
                          )),
                        ]),
                        _: 1,
                      },
                    ),
                  ]))
                : z("", !0),
              w(t).activeStep
                ? (b(),
                  E(
                    "div",
                    {
                      key: 1,
                      class: Bt([
                        "onboarding-stepper",
                        { "at-start": w(t).activeStep.order === 0 },
                      ]),
                    },
                    [
                      H(
                        U,
                        {
                          class: "ui-button-hollow",
                          onClick: l[1] || (l[1] = (h) => d(-1)),
                        },
                        { default: x(() => [Da]), _: 1 },
                      ),
                      m("div", null, [
                        (b(!0),
                        E(
                          ee,
                          null,
                          ne(w(t).sortedSteps, (h) =>
                            A(
                              (b(),
                              oe(
                                f,
                                {
                                  key: h.name,
                                  to: {
                                    name: "Onboarding",
                                    params: { step: h.name },
                                  },
                                  "active-class": "active",
                                  completed: h.completed,
                                  style: ze({ backgroundColor: h.color }),
                                },
                                null,
                                8,
                                ["to", "completed", "style"],
                              )),
                              [
                                [
                                  c,
                                  h.name.charAt(0).toUpperCase() +
                                    h.name.slice(1),
                                ],
                              ],
                            ),
                          ),
                          128,
                        )),
                      ]),
                      H(
                        U,
                        {
                          class: "ui-button-important",
                          onClick:
                            l[2] || (l[2] = (h) => (s.value ? a() : d(1))),
                        },
                        {
                          icon: x(() => [H(Nt, { direction: "right" })]),
                          default: x(() => [
                            m("span", null, D(s.value ? "Done" : "Next"), 1),
                          ]),
                          _: 1,
                        },
                      ),
                    ],
                    2,
                  ))
                : z("", !0),
            ])
          );
        }
      );
    },
  });
const pn = V(Va, [["__scopeId", "data-v-fd738665"]]),
  Na = [
    {
      path: "",
      redirect: "/onboarding/start",
      children: [
        { path: "onboarding/:step?", name: "Onboarding", component: pn },
      ],
    },
    {
      path: "/popup",
      name: "Popup",
      component: () =>
        B(
          () => import("../../../assets/seventv.Popup.3.0.9.js"),
          [
            "../../../assets/seventv.Popup.3.0.9.js",
            "../../../assets/seventv.index.3.0.9.js",
            "../../../assets/seventv.useUserAgent.3.0.9.js",
            "../../../assets/seventv.ChevronIcon.3.0.9.js",
            "../../../assets/seventv.UiButton.3.0.9.js",
          ],
          import.meta.url,
        ),
    },
    {
      path: "/compat",
      name: "Compat",
      component: () =>
        B(() => Promise.resolve().then(() => or), void 0, import.meta.url),
    },
  ],
  Ua = Hs({ history: Fo(), strict: !0, routes: Na }),
  it = An(Is),
  Ga = Po({
    titleTemplate(e) {
      return e ? `${e} — 7TV` : "7TV";
    },
  });
it.directive("tooltip", Pn);
it.provide(Rn, chrome.runtime.getURL("/assets"));
it.use(Ua).use(Ga).use(Tn()).mount("#app");