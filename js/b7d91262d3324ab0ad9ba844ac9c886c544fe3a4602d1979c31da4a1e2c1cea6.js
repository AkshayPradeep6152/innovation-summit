!(function () {
  "use strict";
  function t(t, e) {
    let n;
    return (...i) => {
      clearTimeout(n),
        (n = setTimeout(() => {
          t(...i);
        }, e));
    };
  }
  class e {
    constructor() {
      (this.callbacks = []),
        window.addEventListener("DOMContentLoaded", () =>
          this.onDOMContentLoaded()
        );
    }
    onDOMContentLoaded() {
      this.callbacks
        .sort((t, e) => t.priority - e.priority)
        .forEach(({ callback: t }) => t());
    }
    runOnLoad(t) {
      "loading" === document.readyState ? this.callbacks.push(t) : t.callback();
    }
  }
  class n {
    constructor(t) {
      (this.items = []),
        (this.previousWidth = document.documentElement.clientWidth),
        (this.previousHeight = window.innerHeight);
      const e = t(() => this.onWindowResize(), 100);
      window.addEventListener("resize", e);
    }
    onWindowResize() {
      const t = document.documentElement.clientWidth,
        e = window.innerHeight,
        n = this.previousWidth !== t,
        i = this.previousHeight !== e;
      this.items.forEach((t) => {
        const e = () => {
          t.callback(), (t.executed = !0);
        };
        (!t.executed ||
          (n && t.options.runOnWidthChange) ||
          (i && t.options.runOnHeightChange)) &&
          e();
      }),
        (this.previousWidth = t),
        (this.previousHeight = e);
    }
    runOnResize(t, n) {
      this.items.push({ callback: t, options: n, executed: n.runOnLoad }),
        this.items.sort((t, e) => t.options.priority - e.options.priority),
        n.runOnLoad &&
          (function (t, n = Number.MAX_VALUE) {
            var i;
            (window.canva_scriptExecutor =
              null !== (i = window.canva_scriptExecutor) && void 0 !== i
                ? i
                : new e()).runOnLoad({ callback: t, priority: n });
          })(t, n.priority);
    }
  }
  let i;
  function o(t) {
    const e = Number.parseFloat(t.dataset.contentWidth || "0"),
      n = Number.parseFloat(t.dataset.contentHeight || "0");
    if (e && n) {
      const i = t.querySelector("iframe"),
        o = t.clientHeight / n;
      (i.style.position = "absolute"),
        (i.style.width = `${e}px`),
        (i.style.height = `${n}px`),
        (i.style.transform = `scale(${o}) translate(-50%, -50%)`),
        (t.style.aspectRatio = "");
    }
  }
  !(function (e, i, o = t) {
    var r;
    (window.canva_debounceResize =
      null !== (r = window.canva_debounceResize) && void 0 !== r
        ? r
        : new n(o)).runOnResize(e, {
      runOnLoad: !1,
      runOnWidthChange: !0,
      runOnHeightChange: !1,
      priority: Number.MAX_VALUE,
      ...i,
    });
  })(
    () =>
      (() => {
        if (i) return i;
        const t = document.querySelectorAll('[id^="embed-"]');
        return (
          t.forEach((t) =>
            (function (t) {
              const e = t.querySelector("iframe");
              t.replaceChildren(e),
                (t.style.position = "relative"),
                (t.style.overflow = "hidden"),
                (e.style.transformOrigin = "0 0"),
                (e.style.top = "50%"),
                (e.style.left = "50%");
            })(t)
          ),
          (i = [...t]),
          i
        );
      })().forEach(o),
    { runOnLoad: !0 }
  );
})();
