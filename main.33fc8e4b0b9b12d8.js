"use strict";
(self.webpackChunkburgers = self.webpackChunkburgers || []).push([[179], {
    497: ()=>{
        function oe(e) {
            return "function" == typeof e
        }
        function $o(e) {
            const n = e(r=>{
                Error.call(r),
                r.stack = (new Error).stack
            }
            );
            return n.prototype = Object.create(Error.prototype),
            n.prototype.constructor = n,
            n
        }
        const Uo = $o(e=>function(n) {
            e(this),
            this.message = n ? `${n.length} errors occurred during unsubscription:\n ${n.map((r,o)=>`${o + 1}) ${r.toString()}`).join("\n  ")}` : "",
            this.name = "UnsubscriptionError",
            this.errors = n
        }
        );
        function Nr(e, t) {
            if (e) {
                const n = e.indexOf(t);
                0 <= n && e.splice(n, 1)
            }
        }
        class _t {
            constructor(t) {
                this.initialTeardown = t,
                this.closed = !1,
                this._parentage = null,
                this._finalizers = null
            }
            unsubscribe() {
                let t;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage: n} = this;
                    if (n)
                        if (this._parentage = null,
                        Array.isArray(n))
                            for (const i of n)
                                i.remove(this);
                        else
                            n.remove(this);
                    const {initialTeardown: r} = this;
                    if (oe(r))
                        try {
                            r()
                        } catch (i) {
                            t = i instanceof Uo ? i.errors : [i]
                        }
                    const {_finalizers: o} = this;
                    if (o) {
                        this._finalizers = null;
                        for (const i of o)
                            try {
                                ed(i)
                            } catch (s) {
                                t = t ?? [],
                                s instanceof Uo ? t = [...t, ...s.errors] : t.push(s)
                            }
                    }
                    if (t)
                        throw new Uo(t)
                }
            }
            add(t) {
                var n;
                if (t && t !== this)
                    if (this.closed)
                        ed(t);
                    else {
                        if (t instanceof _t) {
                            if (t.closed || t._hasParent(this))
                                return;
                            t._addParent(this)
                        }
                        (this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
                    }
            }
            _hasParent(t) {
                const {_parentage: n} = this;
                return n === t || Array.isArray(n) && n.includes(t)
            }
            _addParent(t) {
                const {_parentage: n} = this;
                this._parentage = Array.isArray(n) ? (n.push(t),
                n) : n ? [n, t] : t
            }
            _removeParent(t) {
                const {_parentage: n} = this;
                n === t ? this._parentage = null : Array.isArray(n) && Nr(n, t)
            }
            remove(t) {
                const {_finalizers: n} = this;
                n && Nr(n, t),
                t instanceof _t && t._removeParent(this)
            }
        }
        _t.EMPTY = (()=>{
            const e = new _t;
            return e.closed = !0,
            e
        }
        )();
        const Qc = _t.EMPTY;
        function Jc(e) {
            return e instanceof _t || e && "closed"in e && oe(e.remove) && oe(e.add) && oe(e.unsubscribe)
        }
        function ed(e) {
            oe(e) ? e() : e.unsubscribe()
        }
        const Dn = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }
          , Go = {
            setTimeout(e, t, ...n) {
                const {delegate: r} = Go;
                return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
            },
            clearTimeout(e) {
                const {delegate: t} = Go;
                return (t?.clearTimeout || clearTimeout)(e)
            },
            delegate: void 0
        };
        function td(e) {
            Go.setTimeout(()=>{
                const {onUnhandledError: t} = Dn;
                if (!t)
                    throw e;
                t(e)
            }
            )
        }
        function nd() {}
        const p0 = ea("C", void 0, void 0);
        function ea(e, t, n) {
            return {
                kind: e,
                value: t,
                error: n
            }
        }
        let vn = null;
        function zo(e) {
            if (Dn.useDeprecatedSynchronousErrorHandling) {
                const t = !vn;
                if (t && (vn = {
                    errorThrown: !1,
                    error: null
                }),
                e(),
                t) {
                    const {errorThrown: n, error: r} = vn;
                    if (vn = null,
                    n)
                        throw r
                }
            } else
                e()
        }
        class ta extends _t {
            constructor(t) {
                super(),
                this.isStopped = !1,
                t ? (this.destination = t,
                Jc(t) && t.add(this)) : this.destination = C0
            }
            static create(t, n, r) {
                return new xr(t,n,r)
            }
            next(t) {
                this.isStopped ? ra(function m0(e) {
                    return ea("N", e, void 0)
                }(t), this) : this._next(t)
            }
            error(t) {
                this.isStopped ? ra(function g0(e) {
                    return ea("E", void 0, e)
                }(t), this) : (this.isStopped = !0,
                this._error(t))
            }
            complete() {
                this.isStopped ? ra(p0, this) : (this.isStopped = !0,
                this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                super.unsubscribe(),
                this.destination = null)
            }
            _next(t) {
                this.destination.next(t)
            }
            _error(t) {
                try {
                    this.destination.error(t)
                } finally {
                    this.unsubscribe()
                }
            }
            _complete() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
        }
        const D0 = Function.prototype.bind;
        function na(e, t) {
            return D0.call(e, t)
        }
        class v0 {
            constructor(t) {
                this.partialObserver = t
            }
            next(t) {
                const {partialObserver: n} = this;
                if (n.next)
                    try {
                        n.next(t)
                    } catch (r) {
                        Wo(r)
                    }
            }
            error(t) {
                const {partialObserver: n} = this;
                if (n.error)
                    try {
                        n.error(t)
                    } catch (r) {
                        Wo(r)
                    }
                else
                    Wo(t)
            }
            complete() {
                const {partialObserver: t} = this;
                if (t.complete)
                    try {
                        t.complete()
                    } catch (n) {
                        Wo(n)
                    }
            }
        }
        class xr extends ta {
            constructor(t, n, r) {
                let o;
                if (super(),
                oe(t) || !t)
                    o = {
                        next: t ?? void 0,
                        error: n ?? void 0,
                        complete: r ?? void 0
                    };
                else {
                    let i;
                    this && Dn.useDeprecatedNextContext ? (i = Object.create(t),
                    i.unsubscribe = ()=>this.unsubscribe(),
                    o = {
                        next: t.next && na(t.next, i),
                        error: t.error && na(t.error, i),
                        complete: t.complete && na(t.complete, i)
                    }) : o = t
                }
                this.destination = new v0(o)
            }
        }
        function Wo(e) {
            Dn.useDeprecatedSynchronousErrorHandling ? function y0(e) {
                Dn.useDeprecatedSynchronousErrorHandling && vn && (vn.errorThrown = !0,
                vn.error = e)
            }(e) : td(e)
        }
        function ra(e, t) {
            const {onStoppedNotification: n} = Dn;
            n && Go.setTimeout(()=>n(e, t))
        }
        const C0 = {
            closed: !0,
            next: nd,
            error: function _0(e) {
                throw e
            },
            complete: nd
        }
          , oa = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function ia(e) {
            return e
        }
        let Te = (()=>{
            class e {
                constructor(n) {
                    n && (this._subscribe = n)
                }
                lift(n) {
                    const r = new e;
                    return r.source = this,
                    r.operator = n,
                    r
                }
                subscribe(n, r, o) {
                    const i = function w0(e) {
                        return e && e instanceof ta || function E0(e) {
                            return e && oe(e.next) && oe(e.error) && oe(e.complete)
                        }(e) && Jc(e)
                    }(n) ? n : new xr(n,r,o);
                    return zo(()=>{
                        const {operator: s, source: a} = this;
                        i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
                    }
                    ),
                    i
                }
                _trySubscribe(n) {
                    try {
                        return this._subscribe(n)
                    } catch (r) {
                        n.error(r)
                    }
                }
                forEach(n, r) {
                    return new (r = od(r))((o,i)=>{
                        const s = new xr({
                            next: a=>{
                                try {
                                    n(a)
                                } catch (u) {
                                    i(u),
                                    s.unsubscribe()
                                }
                            }
                            ,
                            error: i,
                            complete: o
                        });
                        this.subscribe(s)
                    }
                    )
                }
                _subscribe(n) {
                    var r;
                    return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n)
                }
                [oa]() {
                    return this
                }
                pipe(...n) {
                    return function rd(e) {
                        return 0 === e.length ? ia : 1 === e.length ? e[0] : function(n) {
                            return e.reduce((r,o)=>o(r), n)
                        }
                    }(n)(this)
                }
                toPromise(n) {
                    return new (n = od(n))((r,o)=>{
                        let i;
                        this.subscribe(s=>i = s, s=>o(s), ()=>r(i))
                    }
                    )
                }
            }
            return e.create = t=>new e(t),
            e
        }
        )();
        function od(e) {
            var t;
            return null !== (t = e ?? Dn.Promise) && void 0 !== t ? t : Promise
        }
        const b0 = $o(e=>function() {
            e(this),
            this.name = "ObjectUnsubscribedError",
            this.message = "object unsubscribed"
        }
        );
        let qo = (()=>{
            class e extends Te {
                constructor() {
                    super(),
                    this.closed = !1,
                    this.currentObservers = null,
                    this.observers = [],
                    this.isStopped = !1,
                    this.hasError = !1,
                    this.thrownError = null
                }
                lift(n) {
                    const r = new id(this,this);
                    return r.operator = n,
                    r
                }
                _throwIfClosed() {
                    if (this.closed)
                        throw new b0
                }
                next(n) {
                    zo(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const r of this.currentObservers)
                                r.next(n)
                        }
                    }
                    )
                }
                error(n) {
                    zo(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.hasError = this.isStopped = !0,
                            this.thrownError = n;
                            const {observers: r} = this;
                            for (; r.length; )
                                r.shift().error(n)
                        }
                    }
                    )
                }
                complete() {
                    zo(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.isStopped = !0;
                            const {observers: n} = this;
                            for (; n.length; )
                                n.shift().complete()
                        }
                    }
                    )
                }
                unsubscribe() {
                    this.isStopped = this.closed = !0,
                    this.observers = this.currentObservers = null
                }
                get observed() {
                    var n;
                    return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0
                }
                _trySubscribe(n) {
                    return this._throwIfClosed(),
                    super._trySubscribe(n)
                }
                _subscribe(n) {
                    return this._throwIfClosed(),
                    this._checkFinalizedStatuses(n),
                    this._innerSubscribe(n)
                }
                _innerSubscribe(n) {
                    const {hasError: r, isStopped: o, observers: i} = this;
                    return r || o ? Qc : (this.currentObservers = null,
                    i.push(n),
                    new _t(()=>{
                        this.currentObservers = null,
                        Nr(i, n)
                    }
                    ))
                }
                _checkFinalizedStatuses(n) {
                    const {hasError: r, thrownError: o, isStopped: i} = this;
                    r ? n.error(o) : i && n.complete()
                }
                asObservable() {
                    const n = new Te;
                    return n.source = this,
                    n
                }
            }
            return e.create = (t,n)=>new id(t,n),
            e
        }
        )();
        class id extends qo {
            constructor(t, n) {
                super(),
                this.destination = t,
                this.source = n
            }
            next(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) || void 0 === r || r.call(n, t)
            }
            error(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) || void 0 === r || r.call(n, t)
            }
            complete() {
                var t, n;
                null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) || void 0 === n || n.call(t)
            }
            _subscribe(t) {
                var n, r;
                return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) && void 0 !== r ? r : Qc
            }
        }
        class M0 extends qo {
            constructor(t) {
                super(),
                this._value = t
            }
            get value() {
                return this.getValue()
            }
            _subscribe(t) {
                const n = super._subscribe(t);
                return !n.closed && t.next(this._value),
                n
            }
            getValue() {
                const {hasError: t, thrownError: n, _value: r} = this;
                if (t)
                    throw n;
                return this._throwIfClosed(),
                r
            }
            next(t) {
                super.next(this._value = t)
            }
        }
        function Vt(e) {
            return t=>{
                if (function I0(e) {
                    return oe(e?.lift)
                }(t))
                    return t.lift(function(n) {
                        try {
                            return e(n, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }
        function Ht(e, t, n, r, o) {
            return new S0(e,t,n,r,o)
        }
        class S0 extends ta {
            constructor(t, n, r, o, i, s) {
                super(t),
                this.onFinalize = i,
                this.shouldUnsubscribe = s,
                this._next = n ? function(a) {
                    try {
                        n(a)
                    } catch (u) {
                        t.error(u)
                    }
                }
                : super._next,
                this._error = o ? function(a) {
                    try {
                        o(a)
                    } catch (u) {
                        t.error(u)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._error,
                this._complete = r ? function() {
                    try {
                        r()
                    } catch (a) {
                        t.error(a)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._complete
            }
            unsubscribe() {
                var t;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed: n} = this;
                    super.unsubscribe(),
                    !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
                }
            }
        }
        function _n(e, t) {
            return Vt((n,r)=>{
                let o = 0;
                n.subscribe(Ht(r, i=>{
                    r.next(e.call(t, i, o++))
                }
                ))
            }
            )
        }
        function en(e) {
            return this instanceof en ? (this.v = e,
            this) : new en(e)
        }
        function ld(e) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var n, t = e[Symbol.asyncIterator];
            return t ? t.call(e) : (e = function la(e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                  , n = t && e[t]
                  , r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0),
                            {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }(e),
            n = {},
            r("next"),
            r("throw"),
            r("return"),
            n[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            n);
            function r(i) {
                n[i] = e[i] && function(s) {
                    return new Promise(function(a, u) {
                        !function o(i, s, a, u) {
                            Promise.resolve(u).then(function(l) {
                                i({
                                    value: l,
                                    done: a
                                })
                            }, s)
                        }(a, u, (s = e[i](s)).done, s.value)
                    }
                    )
                }
            }
        }
        const cd = e=>e && "number" == typeof e.length && "function" != typeof e;
        function dd(e) {
            return oe(e?.then)
        }
        function fd(e) {
            return oe(e[oa])
        }
        function hd(e) {
            return Symbol.asyncIterator && oe(e?.[Symbol.asyncIterator])
        }
        function pd(e) {
            return new TypeError(`You provided ${null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
        }
        const gd = function W0() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }();
        function md(e) {
            return oe(e?.[gd])
        }
        function yd(e) {
            return function ud(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var o, r = n.apply(e, t || []), i = [];
                return o = {},
                s("next"),
                s("throw"),
                s("return"),
                o[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                o;
                function s(f) {
                    r[f] && (o[f] = function(h) {
                        return new Promise(function(p, g) {
                            i.push([f, h, p, g]) > 1 || a(f, h)
                        }
                        )
                    }
                    )
                }
                function a(f, h) {
                    try {
                        !function u(f) {
                            f.value instanceof en ? Promise.resolve(f.value.v).then(l, c) : d(i[0][2], f)
                        }(r[f](h))
                    } catch (p) {
                        d(i[0][3], p)
                    }
                }
                function l(f) {
                    a("next", f)
                }
                function c(f) {
                    a("throw", f)
                }
                function d(f, h) {
                    f(h),
                    i.shift(),
                    i.length && a(i[0][0], i[0][1])
                }
            }(this, arguments, function*() {
                const n = e.getReader();
                try {
                    for (; ; ) {
                        const {value: r, done: o} = yield en(n.read());
                        if (o)
                            return yield en(void 0);
                        yield yield en(r)
                    }
                } finally {
                    n.releaseLock()
                }
            })
        }
        function Dd(e) {
            return oe(e?.getReader)
        }
        function Ct(e) {
            if (e instanceof Te)
                return e;
            if (null != e) {
                if (fd(e))
                    return function q0(e) {
                        return new Te(t=>{
                            const n = e[oa]();
                            if (oe(n.subscribe))
                                return n.subscribe(t);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        }
                        )
                    }(e);
                if (cd(e))
                    return function Z0(e) {
                        return new Te(t=>{
                            for (let n = 0; n < e.length && !t.closed; n++)
                                t.next(e[n]);
                            t.complete()
                        }
                        )
                    }(e);
                if (dd(e))
                    return function Y0(e) {
                        return new Te(t=>{
                            e.then(n=>{
                                t.closed || (t.next(n),
                                t.complete())
                            }
                            , n=>t.error(n)).then(null, td)
                        }
                        )
                    }(e);
                if (hd(e))
                    return vd(e);
                if (md(e))
                    return function X0(e) {
                        return new Te(t=>{
                            for (const n of e)
                                if (t.next(n),
                                t.closed)
                                    return;
                            t.complete()
                        }
                        )
                    }(e);
                if (Dd(e))
                    return function K0(e) {
                        return vd(yd(e))
                    }(e)
            }
            throw pd(e)
        }
        function vd(e) {
            return new Te(t=>{
                (function Q0(e, t) {
                    var n, r, o, i;
                    return function sd(e, t, n, r) {
                        return new (n || (n = Promise))(function(i, s) {
                            function a(c) {
                                try {
                                    l(r.next(c))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function u(c) {
                                try {
                                    l(r.throw(c))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function l(c) {
                                c.done ? i(c.value) : function o(i) {
                                    return i instanceof n ? i : new n(function(s) {
                                        s(i)
                                    }
                                    )
                                }(c.value).then(a, u)
                            }
                            l((r = r.apply(e, t || [])).next())
                        }
                        )
                    }(this, void 0, void 0, function*() {
                        try {
                            for (n = ld(e); !(r = yield n.next()).done; )
                                if (t.next(r.value),
                                t.closed)
                                    return
                        } catch (s) {
                            o = {
                                error: s
                            }
                        } finally {
                            try {
                                r && !r.done && (i = n.return) && (yield i.call(n))
                            } finally {
                                if (o)
                                    throw o.error
                            }
                        }
                        t.complete()
                    })
                }
                )(e, t).catch(n=>t.error(n))
            }
            )
        }
        function tn(e, t, n, r=0, o=!1) {
            const i = t.schedule(function() {
                n(),
                o ? e.add(this.schedule(null, r)) : this.unsubscribe()
            }, r);
            if (e.add(i),
            !o)
                return i
        }
        function Zo(e, t, n=1 / 0) {
            return oe(t) ? Zo((r,o)=>_n((i,s)=>t(r, i, o, s))(Ct(e(r, o))), n) : ("number" == typeof t && (n = t),
            Vt((r,o)=>function J0(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0
                  , c = 0
                  , d = !1;
                const f = ()=>{
                    d && !u.length && !l && t.complete()
                }
                  , h = g=>l < r ? p(g) : u.push(g)
                  , p = g=>{
                    i && t.next(g),
                    l++;
                    let y = !1;
                    Ct(n(g, c++)).subscribe(Ht(t, v=>{
                        o?.(v),
                        i ? h(v) : t.next(v)
                    }
                    , ()=>{
                        y = !0
                    }
                    , void 0, ()=>{
                        if (y)
                            try {
                                for (l--; u.length && l < r; ) {
                                    const v = u.shift();
                                    s ? tn(t, s, ()=>p(v)) : p(v)
                                }
                                f()
                            } catch (v) {
                                t.error(v)
                            }
                    }
                    ))
                }
                ;
                return e.subscribe(Ht(t, h, ()=>{
                    d = !0,
                    f()
                }
                )),
                ()=>{
                    a?.()
                }
            }(r, o, e, n)))
        }
        const _d = new Te(e=>e.complete());
        function ca(e) {
            return e[e.length - 1]
        }
        function Cd(e) {
            return function n_(e) {
                return e && oe(e.schedule)
            }(ca(e)) ? e.pop() : void 0
        }
        function Ed(e, t=0) {
            return Vt((n,r)=>{
                n.subscribe(Ht(r, o=>tn(r, e, ()=>r.next(o), t), ()=>tn(r, e, ()=>r.complete(), t), o=>tn(r, e, ()=>r.error(o), t)))
            }
            )
        }
        function wd(e, t=0) {
            return Vt((n,r)=>{
                r.add(e.schedule(()=>n.subscribe(r), t))
            }
            )
        }
        function bd(e, t) {
            if (!e)
                throw new Error("Iterable cannot be null");
            return new Te(n=>{
                tn(n, t, ()=>{
                    const r = e[Symbol.asyncIterator]();
                    tn(n, t, ()=>{
                        r.next().then(o=>{
                            o.done ? n.complete() : n.next(o.value)
                        }
                        )
                    }
                    , 0, !0)
                }
                )
            }
            )
        }
        function Yo(e, t) {
            return t ? function c_(e, t) {
                if (null != e) {
                    if (fd(e))
                        return function i_(e, t) {
                            return Ct(e).pipe(wd(t), Ed(t))
                        }(e, t);
                    if (cd(e))
                        return function a_(e, t) {
                            return new Te(n=>{
                                let r = 0;
                                return t.schedule(function() {
                                    r === e.length ? n.complete() : (n.next(e[r++]),
                                    n.closed || this.schedule())
                                })
                            }
                            )
                        }(e, t);
                    if (dd(e))
                        return function s_(e, t) {
                            return Ct(e).pipe(wd(t), Ed(t))
                        }(e, t);
                    if (hd(e))
                        return bd(e, t);
                    if (md(e))
                        return function u_(e, t) {
                            return new Te(n=>{
                                let r;
                                return tn(n, t, ()=>{
                                    r = e[gd](),
                                    tn(n, t, ()=>{
                                        let o, i;
                                        try {
                                            ({value: o, done: i} = r.next())
                                        } catch (s) {
                                            return void n.error(s)
                                        }
                                        i ? n.complete() : n.next(o)
                                    }
                                    , 0, !0)
                                }
                                ),
                                ()=>oe(r?.return) && r.return()
                            }
                            )
                        }(e, t);
                    if (Dd(e))
                        return function l_(e, t) {
                            return bd(yd(e), t)
                        }(e, t)
                }
                throw pd(e)
            }(e, t) : Ct(e)
        }
        function da(...e) {
            return Yo(e, Cd(e))
        }
        function Md(e={}) {
            const {connector: t=(()=>new qo), resetOnError: n=!0, resetOnComplete: r=!0, resetOnRefCountZero: o=!0} = e;
            return i=>{
                let s, a, u, l = 0, c = !1, d = !1;
                const f = ()=>{
                    a?.unsubscribe(),
                    a = void 0
                }
                  , h = ()=>{
                    f(),
                    s = u = void 0,
                    c = d = !1
                }
                  , p = ()=>{
                    const g = s;
                    h(),
                    g?.unsubscribe()
                }
                ;
                return Vt((g,y)=>{
                    l++,
                    !d && !c && f();
                    const v = u = u ?? t();
                    y.add(()=>{
                        l--,
                        0 === l && !d && !c && (a = fa(p, o))
                    }
                    ),
                    v.subscribe(y),
                    !s && l > 0 && (s = new xr({
                        next: m=>v.next(m),
                        error: m=>{
                            d = !0,
                            f(),
                            a = fa(h, n, m),
                            v.error(m)
                        }
                        ,
                        complete: ()=>{
                            c = !0,
                            f(),
                            a = fa(h, r),
                            v.complete()
                        }
                    }),
                    Ct(g).subscribe(s))
                }
                )(i)
            }
        }
        function fa(e, t, ...n) {
            if (!0 === t)
                return void e();
            if (!1 === t)
                return;
            const r = new xr({
                next: ()=>{
                    r.unsubscribe(),
                    e()
                }
            });
            return Ct(t(...n)).subscribe(r)
        }
        function Id(e, t) {
            return Vt((n,r)=>{
                let o = null
                  , i = 0
                  , s = !1;
                const a = ()=>s && !o && r.complete();
                n.subscribe(Ht(r, u=>{
                    o?.unsubscribe();
                    let l = 0;
                    const c = i++;
                    Ct(e(u, c)).subscribe(o = Ht(r, d=>r.next(t ? t(u, d, c, l++) : d), ()=>{
                        o = null,
                        a()
                    }
                    ))
                }
                , ()=>{
                    s = !0,
                    a()
                }
                ))
            }
            )
        }
        function h_(e, t) {
            return e === t
        }
        function K(e) {
            for (let t in e)
                if (e[t] === K)
                    return t;
            throw Error("Could not find renamed property on target object.")
        }
        function Xo(e, t) {
            for (const n in t)
                t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n])
        }
        function ve(e) {
            if ("string" == typeof e)
                return e;
            if (Array.isArray(e))
                return "[" + e.map(ve).join(", ") + "]";
            if (null == e)
                return "" + e;
            if (e.overriddenName)
                return `${e.overriddenName}`;
            if (e.name)
                return `${e.name}`;
            const t = e.toString();
            if (null == t)
                return "" + t;
            const n = t.indexOf("\n");
            return -1 === n ? t : t.substring(0, n)
        }
        function ha(e, t) {
            return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t
        }
        const p_ = K({
            __forward_ref__: K
        });
        function J(e) {
            return e.__forward_ref__ = J,
            e.toString = function() {
                return ve(this())
            }
            ,
            e
        }
        function x(e) {
            return pa(e) ? e() : e
        }
        function pa(e) {
            return "function" == typeof e && e.hasOwnProperty(p_) && e.__forward_ref__ === J
        }
        function ga(e) {
            return e && !!e.\u0275providers
        }
        const Sd = "https://g.co/ng/security#xss";
        class C extends Error {
            constructor(t, n) {
                super(function Ko(e, t) {
                    return `NG0 ${Math.abs(e)}${t ? ": " + t : ""}`
                }(t, n)),
                this.code = t
            }
        }
        function O(e) {
            return "string" == typeof e ? e : null == e ? "" : String(e)
        }
        function Qo(e, t) {
            throw new C(-201,!1)
        }
        function st(e, t) {
            null == e && function X(e, t, n, r) {
                throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
            }(t, e, null, "!=")
        }
        function z(e) {
            return {
                token: e.token,
                providedIn: e.providedIn || null,
                factory: e.factory,
                value: void 0
            }
        }
        function Et(e) {
            return {
                providers: e.providers || [],
                imports: e.imports || []
            }
        }
        function Jo(e) {
            return Ad(e, ei) || Ad(e, Nd)
        }
        function Ad(e, t) {
            return e.hasOwnProperty(t) ? e[t] : null
        }
        function Td(e) {
            return e && (e.hasOwnProperty(ma) || e.hasOwnProperty(C_)) ? e[ma] : null
        }
        const ei = K({
            \u0275prov: K
        })
          , ma = K({
            \u0275inj: K
        })
          , Nd = K({
            ngInjectableDef: K
        })
          , C_ = K({
            ngInjectorDef: K
        });
        var N = (()=>((N = N || {})[N.Default = 0] = "Default",
        N[N.Host = 1] = "Host",
        N[N.Self = 2] = "Self",
        N[N.SkipSelf = 4] = "SkipSelf",
        N[N.Optional = 8] = "Optional",
        N))();
        let ya;
        function Ue(e) {
            const t = ya;
            return ya = e,
            t
        }
        function Fd(e, t, n) {
            const r = Jo(e);
            return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & N.Optional ? null : void 0 !== t ? t : void Qo(ve(e))
        }
        const ee = (()=>typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)()
          , Fr = {}
          , Da = "__NG_DI_FLAG__"
          , ti = "ngTempTokenPath"
          , w_ = /\n/gm
          , Od = "__source";
        let Hn;
        function rn(e) {
            const t = Hn;
            return Hn = e,
            t
        }
        function I_(e, t=N.Default) {
            if (void 0 === Hn)
                throw new C(-203,!1);
            return null === Hn ? Fd(e, void 0, t) : Hn.get(e, t & N.Optional ? null : void 0, t)
        }
        function V(e, t=N.Default) {
            return (function xd() {
                return ya
            }() || I_)(x(e), t)
        }
        function q(e, t=N.Default) {
            return V(e, ni(t))
        }
        function ni(e) {
            return typeof e > "u" || "number" == typeof e ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
        }
        function va(e) {
            const t = [];
            for (let n = 0; n < e.length; n++) {
                const r = x(e[n]);
                if (Array.isArray(r)) {
                    if (0 === r.length)
                        throw new C(900,!1);
                    let o, i = N.Default;
                    for (let s = 0; s < r.length; s++) {
                        const a = r[s]
                          , u = S_(a);
                        "number" == typeof u ? -1 === u ? o = a.token : i |= u : o = a
                    }
                    t.push(V(o, i))
                } else
                    t.push(V(r))
            }
            return t
        }
        function Or(e, t) {
            return e[Da] = t,
            e.prototype[Da] = t,
            e
        }
        function S_(e) {
            return e[Da]
        }
        function Bt(e) {
            return {
                toString: e
            }.toString()
        }
        var wt = (()=>((wt = wt || {})[wt.OnPush = 0] = "OnPush",
        wt[wt.Default = 1] = "Default",
        wt))()
          , Je = (()=>{
            return (e = Je || (Je = {}))[e.Emulated = 0] = "Emulated",
            e[e.None = 2] = "None",
            e[e.ShadowDom = 3] = "ShadowDom",
            Je;
            var e
        }
        )();
        const bt = {}
          , W = []
          , ri = K({
            \u0275cmp: K
        })
          , _a = K({
            \u0275dir: K
        })
          , Ca = K({
            \u0275pipe: K
        })
          , Rd = K({
            \u0275mod: K
        })
          , jt = K({
            \u0275fac: K
        })
          , Pr = K({
            __NG_ELEMENT_ID__: K
        })
          , kd = K({
            __NG_ENV_ID__: K
        });
        function Ld(e, t, n) {
            let r = e.length;
            for (; ; ) {
                const o = e.indexOf(t, n);
                if (-1 === o)
                    return o;
                if (0 === o || e.charCodeAt(o - 1) <= 32) {
                    const i = t.length;
                    if (o + i === r || e.charCodeAt(o + i) <= 32)
                        return o
                }
                n = o + 1
            }
        }
        function Ea(e, t, n) {
            let r = 0;
            for (; r < n.length; ) {
                const o = n[r];
                if ("number" == typeof o) {
                    if (0 !== o)
                        break;
                    r++;
                    const i = n[r++]
                      , s = n[r++]
                      , a = n[r++];
                    e.setAttribute(t, s, a, i)
                } else {
                    const i = o
                      , s = n[++r];
                    Hd(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s),
                    r++
                }
            }
            return r
        }
        function Vd(e) {
            return 3 === e || 4 === e || 6 === e
        }
        function Hd(e) {
            return 64 === e.charCodeAt(0)
        }
        function Rr(e, t) {
            if (null !== t && 0 !== t.length)
                if (null === e || 0 === e.length)
                    e = t.slice();
                else {
                    let n = -1;
                    for (let r = 0; r < t.length; r++) {
                        const o = t[r];
                        "number" == typeof o ? n = o : 0 === n || Bd(e, n, o, null, -1 === n || 2 === n ? t[++r] : null)
                    }
                }
            return e
        }
        function Bd(e, t, n, r, o) {
            let i = 0
              , s = e.length;
            if (-1 === t)
                s = -1;
            else
                for (; i < e.length; ) {
                    const a = e[i++];
                    if ("number" == typeof a) {
                        if (a === t) {
                            s = -1;
                            break
                        }
                        if (a > t) {
                            s = i - 1;
                            break
                        }
                    }
                }
            for (; i < e.length; ) {
                const a = e[i];
                if ("number" == typeof a)
                    break;
                if (a === n) {
                    if (null === r)
                        return void (null !== o && (e[i + 1] = o));
                    if (r === e[i + 1])
                        return void (e[i + 2] = o)
                }
                i++,
                null !== r && i++,
                null !== o && i++
            }
            -1 !== s && (e.splice(s, 0, t),
            i = s + 1),
            e.splice(i++, 0, n),
            null !== r && e.splice(i++, 0, r),
            null !== o && e.splice(i++, 0, o)
        }
        const jd = "ng-template";
        function N_(e, t, n) {
            let r = 0
              , o = !0;
            for (; r < e.length; ) {
                let i = e[r++];
                if ("string" == typeof i && o) {
                    const s = e[r++];
                    if (n && "class" === i && -1 !== Ld(s.toLowerCase(), t, 0))
                        return !0
                } else {
                    if (1 === i) {
                        for (; r < e.length && "string" == typeof (i = e[r++]); )
                            if (i.toLowerCase() === t)
                                return !0;
                        return !1
                    }
                    "number" == typeof i && (o = !1)
                }
            }
            return !1
        }
        function $d(e) {
            return 4 === e.type && e.value !== jd
        }
        function x_(e, t, n) {
            return t === (4 !== e.type || n ? e.value : jd)
        }
        function F_(e, t, n) {
            let r = 4;
            const o = e.attrs || []
              , i = function R_(e) {
                for (let t = 0; t < e.length; t++)
                    if (Vd(e[t]))
                        return t;
                return e.length
            }(o);
            let s = !1;
            for (let a = 0; a < t.length; a++) {
                const u = t[a];
                if ("number" != typeof u) {
                    if (!s)
                        if (4 & r) {
                            if (r = 2 | 1 & r,
                            "" !== u && !x_(e, u, n) || "" === u && 1 === t.length) {
                                if (dt(r))
                                    return !1;
                                s = !0
                            }
                        } else {
                            const l = 8 & r ? u : t[++a];
                            if (8 & r && null !== e.attrs) {
                                if (!N_(e.attrs, l, n)) {
                                    if (dt(r))
                                        return !1;
                                    s = !0
                                }
                                continue
                            }
                            const d = O_(8 & r ? "class" : u, o, $d(e), n);
                            if (-1 === d) {
                                if (dt(r))
                                    return !1;
                                s = !0;
                                continue
                            }
                            if ("" !== l) {
                                let f;
                                f = d > i ? "" : o[d + 1].toLowerCase();
                                const h = 8 & r ? f : null;
                                if (h && -1 !== Ld(h, l, 0) || 2 & r && l !== f) {
                                    if (dt(r))
                                        return !1;
                                    s = !0
                                }
                            }
                        }
                } else {
                    if (!s && !dt(r) && !dt(u))
                        return !1;
                    if (s && dt(u))
                        continue;
                    s = !1,
                    r = u | 1 & r
                }
            }
            return dt(r) || s
        }
        function dt(e) {
            return 0 == (1 & e)
        }
        function O_(e, t, n, r) {
            if (null === t)
                return -1;
            let o = 0;
            if (r || !n) {
                let i = !1;
                for (; o < t.length; ) {
                    const s = t[o];
                    if (s === e)
                        return o;
                    if (3 === s || 6 === s)
                        i = !0;
                    else {
                        if (1 === s || 2 === s) {
                            let a = t[++o];
                            for (; "string" == typeof a; )
                                a = t[++o];
                            continue
                        }
                        if (4 === s)
                            break;
                        if (0 === s) {
                            o += 4;
                            continue
                        }
                    }
                    o += i ? 1 : 2
                }
                return -1
            }
            return function k_(e, t) {
                let n = e.indexOf(4);
                if (n > -1)
                    for (n++; n < e.length; ) {
                        const r = e[n];
                        if ("number" == typeof r)
                            return -1;
                        if (r === t)
                            return n;
                        n++
                    }
                return -1
            }(t, e)
        }
        function Ud(e, t, n=!1) {
            for (let r = 0; r < t.length; r++)
                if (F_(e, t[r], n))
                    return !0;
            return !1
        }
        function Gd(e, t) {
            return e ? ":not(" + t.trim() + ")" : t
        }
        function V_(e) {
            let t = e[0]
              , n = 1
              , r = 2
              , o = ""
              , i = !1;
            for (; n < e.length; ) {
                let s = e[n];
                if ("string" == typeof s)
                    if (2 & r) {
                        const a = e[++n];
                        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                    } else
                        8 & r ? o += "." + s : 4 & r && (o += " " + s);
                else
                    "" !== o && !dt(s) && (t += Gd(i, o),
                    o = ""),
                    r = s,
                    i = i || !dt(r);
                n++
            }
            return "" !== o && (t += Gd(i, o)),
            t
        }
        function zd(e) {
            return Bt(()=>{
                const t = qd(e)
                  , n = {
                    ...t,
                    decls: e.decls,
                    vars: e.vars,
                    template: e.template,
                    consts: e.consts || null,
                    ngContentSelectors: e.ngContentSelectors,
                    onPush: e.changeDetection === wt.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    dependencies: t.standalone && e.dependencies || null,
                    getStandaloneInjector: null,
                    signals: e.signals ?? !1,
                    data: e.data || {},
                    encapsulation: e.encapsulation || Je.Emulated,
                    styles: e.styles || W,
                    _: null,
                    schemas: e.schemas || null,
                    tView: null,
                    id: ""
                };
                Zd(n);
                const r = e.dependencies;
                return n.directiveDefs = oi(r, !1),
                n.pipeDefs = oi(r, !0),
                n.id = function W_(e) {
                    let t = 0;
                    const n = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, e.consts, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery].join("|");
                    for (const o of n)
                        t = Math.imul(31, t) + o.charCodeAt(0) << 0;
                    return t += 2147483648,
                    "c" + t
                }(n),
                n
            }
            )
        }
        function $_(e) {
            return Z(e) || Ne(e)
        }
        function U_(e) {
            return null !== e
        }
        function $t(e) {
            return Bt(()=>({
                type: e.type,
                bootstrap: e.bootstrap || W,
                declarations: e.declarations || W,
                imports: e.imports || W,
                exports: e.exports || W,
                transitiveCompileScopes: null,
                schemas: e.schemas || null,
                id: e.id || null
            }))
        }
        function Wd(e, t) {
            if (null == e)
                return bt;
            const n = {};
            for (const r in e)
                if (e.hasOwnProperty(r)) {
                    let o = e[r]
                      , i = o;
                    Array.isArray(o) && (i = o[1],
                    o = o[0]),
                    n[o] = r,
                    t && (t[o] = i)
                }
            return n
        }
        function P(e) {
            return Bt(()=>{
                const t = qd(e);
                return Zd(t),
                t
            }
            )
        }
        function Z(e) {
            return e[ri] || null
        }
        function Ne(e) {
            return e[_a] || null
        }
        function ze(e) {
            return e[Ca] || null
        }
        function qd(e) {
            const t = {};
            return {
                type: e.type,
                providersResolver: null,
                factory: null,
                hostBindings: e.hostBindings || null,
                hostVars: e.hostVars || 0,
                hostAttrs: e.hostAttrs || null,
                contentQueries: e.contentQueries || null,
                declaredInputs: t,
                inputTransforms: null,
                inputConfig: e.inputs || bt,
                exportAs: e.exportAs || null,
                standalone: !0 === e.standalone,
                signals: !0 === e.signals,
                selectors: e.selectors || W,
                viewQuery: e.viewQuery || null,
                features: e.features || null,
                setInput: null,
                findHostDirectiveDefs: null,
                hostDirectives: null,
                inputs: Wd(e.inputs, t),
                outputs: Wd(e.outputs)
            }
        }
        function Zd(e) {
            e.features?.forEach(t=>t(e))
        }
        function oi(e, t) {
            if (!e)
                return null;
            const n = t ? ze : $_;
            return ()=>("function" == typeof e ? e() : e).map(r=>n(r)).filter(U_)
        }
        const _e = 0
          , w = 1
          , R = 2
          , ae = 3
          , ft = 4
          , Lr = 5
          , xe = 6
          , Bn = 7
          , he = 8
          , jn = 9
          , Cn = 10
          , k = 11
          , Vr = 12
          , Yd = 13
          , $n = 14
          , pe = 15
          , Hr = 16
          , Un = 17
          , Mt = 18
          , Br = 19
          , Xd = 20
          , on = 21
          , Ut = 22
          , ii = 23
          , si = 24
          , $ = 25
          , wa = 1
          , Kd = 2
          , It = 7
          , Gn = 9
          , Fe = 11;
        function tt(e) {
            return Array.isArray(e) && "object" == typeof e[wa]
        }
        function We(e) {
            return Array.isArray(e) && !0 === e[wa]
        }
        function ba(e) {
            return 0 != (4 & e.flags)
        }
        function En(e) {
            return e.componentOffset > -1
        }
        function ui(e) {
            return 1 == (1 & e.flags)
        }
        function ht(e) {
            return !!e.template
        }
        function Ma(e) {
            return 0 != (512 & e[R])
        }
        function wn(e, t) {
            return e.hasOwnProperty(jt) ? e[jt] : null
        }
        let Q_ = ee.WeakRef ?? class K_ {
            constructor(t) {
                this.ref = t
            }
            deref() {
                return this.ref
            }
        }
          , eC = 0
          , St = null
          , li = !1;
        function Ie(e) {
            const t = St;
            return St = e,
            t
        }
        class nf {
            constructor() {
                this.id = eC++,
                this.ref = function J_(e) {
                    return new Q_(e)
                }(this),
                this.producers = new Map,
                this.consumers = new Map,
                this.trackingVersion = 0,
                this.valueVersion = 0
            }
            consumerPollProducersForChange() {
                for (const [t,n] of this.producers) {
                    const r = n.producerNode.deref();
                    if (void 0 !== r && n.atTrackingVersion === this.trackingVersion) {
                        if (r.producerPollStatus(n.seenValueVersion))
                            return !0
                    } else
                        this.producers.delete(t),
                        r?.consumers.delete(this.id)
                }
                return !1
            }
            producerMayHaveChanged() {
                const t = li;
                li = !0;
                try {
                    for (const [n,r] of this.consumers) {
                        const o = r.consumerNode.deref();
                        void 0 !== o && o.trackingVersion === r.atTrackingVersion ? o.onConsumerDependencyMayHaveChanged() : (this.consumers.delete(n),
                        o?.producers.delete(this.id))
                    }
                } finally {
                    li = t
                }
            }
            producerAccessed() {
                if (li)
                    throw new Error("");
                if (null === St)
                    return;
                let t = St.producers.get(this.id);
                void 0 === t ? (t = {
                    consumerNode: St.ref,
                    producerNode: this.ref,
                    seenValueVersion: this.valueVersion,
                    atTrackingVersion: St.trackingVersion
                },
                St.producers.set(this.id, t),
                this.consumers.set(St.id, t)) : (t.seenValueVersion = this.valueVersion,
                t.atTrackingVersion = St.trackingVersion)
            }
            get hasProducers() {
                return this.producers.size > 0
            }
            get producerUpdatesAllowed() {
                return !1 !== St?.consumerAllowSignalWrites
            }
            producerPollStatus(t) {
                return this.valueVersion !== t || (this.onProducerUpdateValueVersion(),
                this.valueVersion !== t)
            }
        }
        let rf = null;
        const af = ()=>{}
        ;
        class oC extends nf {
            constructor(t, n, r) {
                super(),
                this.watch = t,
                this.schedule = n,
                this.dirty = !1,
                this.cleanupFn = af,
                this.registerOnCleanup = o=>{
                    this.cleanupFn = o
                }
                ,
                this.consumerAllowSignalWrites = r
            }
            notify() {
                this.dirty || this.schedule(this),
                this.dirty = !0
            }
            onConsumerDependencyMayHaveChanged() {
                this.notify()
            }
            onProducerUpdateValueVersion() {}
            run() {
                if (this.dirty = !1,
                0 !== this.trackingVersion && !this.consumerPollProducersForChange())
                    return;
                const t = Ie(this);
                this.trackingVersion++;
                try {
                    this.cleanupFn(),
                    this.cleanupFn = af,
                    this.watch(this.registerOnCleanup)
                } finally {
                    Ie(t)
                }
            }
            cleanup() {
                this.cleanupFn()
            }
        }
        class iC {
            constructor(t, n, r) {
                this.previousValue = t,
                this.currentValue = n,
                this.firstChange = r
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        function Gt() {
            return uf
        }
        function uf(e) {
            return e.type.prototype.ngOnChanges && (e.setInput = aC),
            sC
        }
        function sC() {
            const e = cf(this)
              , t = e?.current;
            if (t) {
                const n = e.previous;
                if (n === bt)
                    e.previous = t;
                else
                    for (let r in t)
                        n[r] = t[r];
                e.current = null,
                this.ngOnChanges(t)
            }
        }
        function aC(e, t, n, r) {
            const o = this.declaredInputs[n]
              , i = cf(e) || function uC(e, t) {
                return e[lf] = t
            }(e, {
                previous: bt,
                current: null
            })
              , s = i.current || (i.current = {})
              , a = i.previous
              , u = a[o];
            s[o] = new iC(u && u.currentValue,t,a === bt),
            e[r] = t
        }
        Gt.ngInherit = !0;
        const lf = "__ngSimpleChanges__";
        function cf(e) {
            return e[lf] || null
        }
        const At = function(e, t, n) {}
          , df = "svg";
        function re(e) {
            for (; Array.isArray(e); )
                e = e[_e];
            return e
        }
        function fi(e, t) {
            return re(t[e])
        }
        function qe(e, t) {
            return re(t[e.index])
        }
        function hf(e, t) {
            return e.data[t]
        }
        function nt(e, t) {
            const n = t[e];
            return tt(n) ? n : n[_e]
        }
        function sn(e, t) {
            return null == t ? null : e[t]
        }
        function pf(e) {
            e[Un] = 0
        }
        function gC(e) {
            1024 & e[R] || (e[R] |= 1024,
            mf(e, 1))
        }
        function gf(e) {
            1024 & e[R] && (e[R] &= -1025,
            mf(e, -1))
        }
        function mf(e, t) {
            let n = e[ae];
            if (null === n)
                return;
            n[Lr] += t;
            let r = n;
            for (n = n[ae]; null !== n && (1 === t && 1 === r[Lr] || -1 === t && 0 === r[Lr]); )
                n[Lr] += t,
                r = n,
                n = n[ae]
        }
        const T = {
            lFrame: Sf(null),
            bindingsEnabled: !0,
            skipHydrationRootTNode: null
        };
        function vf() {
            return T.bindingsEnabled
        }
        function D() {
            return T.lFrame.lView
        }
        function G() {
            return T.lFrame.tView
        }
        function qn(e) {
            return T.lFrame.contextLView = e,
            e[he]
        }
        function Zn(e) {
            return T.lFrame.contextLView = null,
            e
        }
        function Ae() {
            let e = _f();
            for (; null !== e && 64 === e.type; )
                e = e.parent;
            return e
        }
        function _f() {
            return T.lFrame.currentTNode
        }
        function Tt(e, t) {
            const n = T.lFrame;
            n.currentTNode = e,
            n.isParent = t
        }
        function xa() {
            return T.lFrame.isParent
        }
        function Yn() {
            return T.lFrame.bindingIndex++
        }
        function Wt(e) {
            const t = T.lFrame
              , n = t.bindingIndex;
            return t.bindingIndex = t.bindingIndex + e,
            n
        }
        function SC(e, t) {
            const n = T.lFrame;
            n.bindingIndex = n.bindingRootIndex = e,
            Oa(t)
        }
        function Oa(e) {
            T.lFrame.currentDirectiveIndex = e
        }
        function Ra(e) {
            T.lFrame.currentQueryIndex = e
        }
        function TC(e) {
            const t = e[w];
            return 2 === t.type ? t.declTNode : 1 === t.type ? e[xe] : null
        }
        function Mf(e, t, n) {
            if (n & N.SkipSelf) {
                let o = t
                  , i = e;
                for (; !(o = o.parent,
                null !== o || n & N.Host || (o = TC(i),
                null === o || (i = i[$n],
                10 & o.type))); )
                    ;
                if (null === o)
                    return !1;
                t = o,
                e = i
            }
            const r = T.lFrame = If();
            return r.currentTNode = t,
            r.lView = e,
            !0
        }
        function ka(e) {
            const t = If()
              , n = e[w];
            T.lFrame = t,
            t.currentTNode = n.firstChild,
            t.lView = e,
            t.tView = n,
            t.contextLView = e,
            t.bindingIndex = n.bindingStartIndex,
            t.inI18n = !1
        }
        function If() {
            const e = T.lFrame
              , t = null === e ? null : e.child;
            return null === t ? Sf(e) : t
        }
        function Sf(e) {
            const t = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: e,
                child: null,
                inI18n: !1
            };
            return null !== e && (e.child = t),
            t
        }
        function Af() {
            const e = T.lFrame;
            return T.lFrame = e.parent,
            e.currentTNode = null,
            e.lView = null,
            e
        }
        const Tf = Af;
        function La() {
            const e = Af();
            e.isParent = !0,
            e.tView = null,
            e.selectedIndex = -1,
            e.contextLView = null,
            e.elementDepthCount = 0,
            e.currentDirectiveIndex = -1,
            e.currentNamespace = null,
            e.bindingRootIndex = -1,
            e.bindingIndex = -1,
            e.currentQueryIndex = 0
        }
        function He() {
            return T.lFrame.selectedIndex
        }
        function bn(e) {
            T.lFrame.selectedIndex = e
        }
        function ue() {
            const e = T.lFrame;
            return hf(e.tView, e.selectedIndex)
        }
        let Ff = !0;
        function hi() {
            return Ff
        }
        function an(e) {
            Ff = e
        }
        function pi(e, t) {
            for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
                const i = e.data[n].type.prototype
                  , {ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: u, ngAfterViewChecked: l, ngOnDestroy: c} = i;
                s && (e.contentHooks ??= []).push(-n, s),
                a && ((e.contentHooks ??= []).push(n, a),
                (e.contentCheckHooks ??= []).push(n, a)),
                u && (e.viewHooks ??= []).push(-n, u),
                l && ((e.viewHooks ??= []).push(n, l),
                (e.viewCheckHooks ??= []).push(n, l)),
                null != c && (e.destroyHooks ??= []).push(n, c)
            }
        }
        function gi(e, t, n) {
            Of(e, t, 3, n)
        }
        function mi(e, t, n, r) {
            (3 & e[R]) === n && Of(e, t, n, r)
        }
        function Va(e, t) {
            let n = e[R];
            (3 & n) === t && (n &= 8191,
            n += 1,
            e[R] = n)
        }
        function Of(e, t, n, r) {
            const i = r ?? -1
              , s = t.length - 1;
            let a = 0;
            for (let u = void 0 !== r ? 65535 & e[Un] : 0; u < s; u++)
                if ("number" == typeof t[u + 1]) {
                    if (a = t[u],
                    null != r && a >= r)
                        break
                } else
                    t[u] < 0 && (e[Un] += 65536),
                    (a < i || -1 == i) && (kC(e, n, t, u),
                    e[Un] = (4294901760 & e[Un]) + u + 2),
                    u++
        }
        function Pf(e, t) {
            At(4, e, t);
            const n = Ie(null);
            try {
                t.call(e)
            } finally {
                Ie(n),
                At(5, e, t)
            }
        }
        function kC(e, t, n, r) {
            const o = n[r] < 0
              , i = n[r + 1]
              , a = e[o ? -n[r] : n[r]];
            o ? e[R] >> 13 < e[Un] >> 16 && (3 & e[R]) === t && (e[R] += 8192,
            Pf(a, i)) : Pf(a, i)
        }
        const Xn = -1;
        class Ur {
            constructor(t, n, r) {
                this.factory = t,
                this.resolving = !1,
                this.canSeeViewProviders = n,
                this.injectImpl = r
            }
        }
        function Rf(e) {
            return e !== Xn
        }
        function yi(e) {
            return 32767 & e
        }
        function Di(e, t) {
            let n = function BC(e) {
                return e >> 16
            }(e)
              , r = t;
            for (; n > 0; )
                r = r[$n],
                n--;
            return r
        }
        let Ba = !0;
        function vi(e) {
            const t = Ba;
            return Ba = e,
            t
        }
        const kf = 255
          , Lf = 5;
        let jC = 0;
        const Nt = {};
        function _i(e, t) {
            const n = Vf(e, t);
            if (-1 !== n)
                return n;
            const r = t[w];
            r.firstCreatePass && (e.injectorIndex = t.length,
            ja(r.data, e),
            ja(t, null),
            ja(r.blueprint, null));
            const o = $a(e, t)
              , i = e.injectorIndex;
            if (Rf(o)) {
                const s = yi(o)
                  , a = Di(o, t)
                  , u = a[w].data;
                for (let l = 0; l < 8; l++)
                    t[i + l] = a[s + l] | u[s + l]
            }
            return t[i + 8] = o,
            i
        }
        function ja(e, t) {
            e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
        }
        function Vf(e, t) {
            return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === t[e.injectorIndex + 8] ? -1 : e.injectorIndex
        }
        function $a(e, t) {
            if (e.parent && -1 !== e.parent.injectorIndex)
                return e.parent.injectorIndex;
            let n = 0
              , r = null
              , o = t;
            for (; null !== o; ) {
                if (r = zf(o),
                null === r)
                    return Xn;
                if (n++,
                o = o[$n],
                -1 !== r.injectorIndex)
                    return r.injectorIndex | n << 16
            }
            return Xn
        }
        function Ua(e, t, n) {
            !function $C(e, t, n) {
                let r;
                "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(Pr) && (r = n[Pr]),
                null == r && (r = n[Pr] = jC++);
                const o = r & kf;
                t.data[e + (o >> Lf)] |= 1 << o
            }(e, t, n)
        }
        function Hf(e, t, n) {
            if (n & N.Optional || void 0 !== e)
                return e;
            Qo()
        }
        function Bf(e, t, n, r) {
            if (n & N.Optional && void 0 === r && (r = null),
            !(n & (N.Self | N.Host))) {
                const o = e[jn]
                  , i = Ue(void 0);
                try {
                    return o ? o.get(t, r, n & N.Optional) : Fd(t, r, n & N.Optional)
                } finally {
                    Ue(i)
                }
            }
            return Hf(r, 0, n)
        }
        function jf(e, t, n, r=N.Default, o) {
            if (null !== e) {
                if (2048 & t[R] && !(r & N.Self)) {
                    const s = function qC(e, t, n, r, o) {
                        let i = e
                          , s = t;
                        for (; null !== i && null !== s && 2048 & s[R] && !(512 & s[R]); ) {
                            const a = $f(i, s, n, r | N.Self, Nt);
                            if (a !== Nt)
                                return a;
                            let u = i.parent;
                            if (!u) {
                                const l = s[Xd];
                                if (l) {
                                    const c = l.get(n, Nt, r);
                                    if (c !== Nt)
                                        return c
                                }
                                u = zf(s),
                                s = s[$n]
                            }
                            i = u
                        }
                        return o
                    }(e, t, n, r, Nt);
                    if (s !== Nt)
                        return s
                }
                const i = $f(e, t, n, r, Nt);
                if (i !== Nt)
                    return i
            }
            return Bf(t, n, r, o)
        }
        function $f(e, t, n, r, o) {
            const i = function zC(e) {
                if ("string" == typeof e)
                    return e.charCodeAt(0) || 0;
                const t = e.hasOwnProperty(Pr) ? e[Pr] : void 0;
                return "number" == typeof t ? t >= 0 ? t & kf : WC : t
            }(n);
            if ("function" == typeof i) {
                if (!Mf(t, e, r))
                    return r & N.Host ? Hf(o, 0, r) : Bf(t, n, r, o);
                try {
                    const s = i(r);
                    if (null != s || r & N.Optional)
                        return s;
                    Qo()
                } finally {
                    Tf()
                }
            } else if ("number" == typeof i) {
                let s = null
                  , a = Vf(e, t)
                  , u = Xn
                  , l = r & N.Host ? t[pe][xe] : null;
                for ((-1 === a || r & N.SkipSelf) && (u = -1 === a ? $a(e, t) : t[a + 8],
                u !== Xn && Gf(r, !1) ? (s = t[w],
                a = yi(u),
                t = Di(u, t)) : a = -1); -1 !== a; ) {
                    const c = t[w];
                    if (Uf(i, a, c.data)) {
                        const d = GC(a, t, n, s, r, l);
                        if (d !== Nt)
                            return d
                    }
                    u = t[a + 8],
                    u !== Xn && Gf(r, t[w].data[a + 8] === l) && Uf(i, a, t) ? (s = c,
                    a = yi(u),
                    t = Di(u, t)) : a = -1
                }
            }
            return o
        }
        function GC(e, t, n, r, o, i) {
            const s = t[w]
              , a = s.data[e + 8]
              , c = function Ci(e, t, n, r, o) {
                const i = e.providerIndexes
                  , s = t.data
                  , a = 1048575 & i
                  , u = e.directiveStart
                  , c = i >> 20
                  , f = o ? a + c : e.directiveEnd;
                for (let h = r ? a : a + c; h < f; h++) {
                    const p = s[h];
                    if (h < u && n === p || h >= u && p.type === n)
                        return h
                }
                if (o) {
                    const h = s[u];
                    if (h && ht(h) && h.type === n)
                        return u
                }
                return null
            }(a, s, n, null == r ? En(a) && Ba : r != s && 0 != (3 & a.type), o & N.Host && i === a);
            return null !== c ? Mn(t, s, c, a) : Nt
        }
        function Mn(e, t, n, r) {
            let o = e[n];
            const i = t.data;
            if (function LC(e) {
                return e instanceof Ur
            }(o)) {
                const s = o;
                s.resolving && function g_(e, t) {
                    const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
                    throw new C(-200,`Circular dependency in DI detected for ${e}${n}`)
                }(function Y(e) {
                    return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : O(e)
                }(i[n]));
                const a = vi(s.canSeeViewProviders);
                s.resolving = !0;
                const u = s.injectImpl ? Ue(s.injectImpl) : null;
                Mf(e, r, N.Default);
                try {
                    o = e[n] = s.factory(void 0, i, e, r),
                    t.firstCreatePass && n >= r.directiveStart && function RC(e, t, n) {
                        const {ngOnChanges: r, ngOnInit: o, ngDoCheck: i} = t.type.prototype;
                        if (r) {
                            const s = uf(t);
                            (n.preOrderHooks ??= []).push(e, s),
                            (n.preOrderCheckHooks ??= []).push(e, s)
                        }
                        o && (n.preOrderHooks ??= []).push(0 - e, o),
                        i && ((n.preOrderHooks ??= []).push(e, i),
                        (n.preOrderCheckHooks ??= []).push(e, i))
                    }(n, i[n], t)
                } finally {
                    null !== u && Ue(u),
                    vi(a),
                    s.resolving = !1,
                    Tf()
                }
            }
            return o
        }
        function Uf(e, t, n) {
            return !!(n[t + (e >> Lf)] & 1 << e)
        }
        function Gf(e, t) {
            return !(e & N.Self || e & N.Host && t)
        }
        class Kn {
            constructor(t, n) {
                this._tNode = t,
                this._lView = n
            }
            get(t, n, r) {
                return jf(this._tNode, this._lView, t, ni(r), n)
            }
        }
        function WC() {
            return new Kn(Ae(),D())
        }
        function Ga(e) {
            return pa(e) ? ()=>{
                const t = Ga(x(e));
                return t && t()
            }
            : wn(e)
        }
        function zf(e) {
            const t = e[w]
              , n = t.type;
            return 2 === n ? t.declTNode : 1 === n ? e[xe] : null
        }
        const Jn = "__parameters__";
        function tr(e, t, n) {
            return Bt(()=>{
                const r = function Wa(e) {
                    return function(...n) {
                        if (e) {
                            const r = e(...n);
                            for (const o in r)
                                this[o] = r[o]
                        }
                    }
                }(t);
                function o(...i) {
                    if (this instanceof o)
                        return r.apply(this, i),
                        this;
                    const s = new o(...i);
                    return a.annotation = s,
                    a;
                    function a(u, l, c) {
                        const d = u.hasOwnProperty(Jn) ? u[Jn] : Object.defineProperty(u, Jn, {
                            value: []
                        })[Jn];
                        for (; d.length <= c; )
                            d.push(null);
                        return (d[c] = d[c] || []).push(s),
                        u
                    }
                }
                return n && (o.prototype = Object.create(n.prototype)),
                o.prototype.ngMetadataName = e,
                o.annotationCls = o,
                o
            }
            )
        }
        function Wr(e, t) {
            e.forEach(n=>Array.isArray(n) ? Wr(n, t) : t(n))
        }
        function qf(e, t, n) {
            t >= e.length ? e.push(n) : e.splice(t, 0, n)
        }
        function Ei(e, t) {
            return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
        }
        function rt(e, t, n) {
            let r = nr(e, t);
            return r >= 0 ? e[1 | r] = n : (r = ~r,
            function QC(e, t, n, r) {
                let o = e.length;
                if (o == t)
                    e.push(n, r);
                else if (1 === o)
                    e.push(r, e[0]),
                    e[0] = n;
                else {
                    for (o--,
                    e.push(e[o - 1], e[o]); o > t; )
                        e[o] = e[o - 2],
                        o--;
                    e[t] = n,
                    e[t + 1] = r
                }
            }(e, r, t, n)),
            r
        }
        function qa(e, t) {
            const n = nr(e, t);
            if (n >= 0)
                return e[1 | n]
        }
        function nr(e, t) {
            return function Zf(e, t, n) {
                let r = 0
                  , o = e.length >> n;
                for (; o !== r; ) {
                    const i = r + (o - r >> 1)
                      , s = e[i << n];
                    if (t === s)
                        return i << n;
                    s > t ? o = i : r = i + 1
                }
                return ~(o << n)
            }(e, t, 1)
        }
        const Ya = Or(tr("Optional"), 8)
          , Xa = Or(tr("SkipSelf"), 4);
        function Si(e) {
            return 128 == (128 & e.flags)
        }
        var Ze = (()=>((Ze = Ze || {})[Ze.Important = 1] = "Important",
        Ze[Ze.DashCase = 2] = "DashCase",
        Ze))();
        const tu = new Map;
        let EE = 0;
        const ru = "__ngContext__";
        function Pe(e, t) {
            tt(t) ? (e[ru] = t[Br],
            function bE(e) {
                tu.set(e[Br], e)
            }(t)) : e[ru] = t
        }
        let ou;
        function iu(e, t) {
            return ou(e, t)
        }
        function Xr(e) {
            const t = e[ae];
            return We(t) ? t[ae] : t
        }
        function ph(e) {
            return mh(e[Vr])
        }
        function gh(e) {
            return mh(e[ft])
        }
        function mh(e) {
            for (; null !== e && !We(e); )
                e = e[ft];
            return e
        }
        function ir(e, t, n, r, o) {
            if (null != r) {
                let i, s = !1;
                We(r) ? i = r : tt(r) && (s = !0,
                r = r[_e]);
                const a = re(r);
                0 === e && null !== n ? null == o ? Ch(t, n, a) : In(t, n, a, o || null, !0) : 1 === e && null !== n ? In(t, n, a, o || null, !0) : 2 === e ? function Oi(e, t, n) {
                    const r = xi(e, t);
                    r && function UE(e, t, n, r) {
                        e.removeChild(t, n, r)
                    }(e, r, t, n)
                }(t, a, s) : 3 === e && t.destroyNode(a),
                null != i && function WE(e, t, n, r, o) {
                    const i = n[It];
                    i !== re(n) && ir(t, e, r, i, o);
                    for (let a = Fe; a < n.length; a++) {
                        const u = n[a];
                        Qr(u[w], u, e, t, r, i)
                    }
                }(t, e, i, n, o)
            }
        }
        function Ni(e, t, n) {
            return e.createElement(t, n)
        }
        function Dh(e, t) {
            const n = e[Gn]
              , r = n.indexOf(t);
            gf(t),
            n.splice(r, 1)
        }
        function au(e, t) {
            if (e.length <= Fe)
                return;
            const n = Fe + t
              , r = e[n];
            if (r) {
                const o = r[Hr];
                null !== o && o !== e && Dh(o, r),
                t > 0 && (e[n - 1][ft] = r[ft]);
                const i = Ei(e, Fe + t);
                !function RE(e, t) {
                    Qr(e, t, t[k], 2, null, null),
                    t[_e] = null,
                    t[xe] = null
                }(r[w], r);
                const s = i[Mt];
                null !== s && s.detachView(i[w]),
                r[ae] = null,
                r[ft] = null,
                r[R] &= -129
            }
            return r
        }
        function vh(e, t) {
            if (!(256 & t[R])) {
                const n = t[k];
                t[ii]?.destroy(),
                t[si]?.destroy(),
                n.destroyNode && Qr(e, t, n, 3, null, null),
                function VE(e) {
                    let t = e[Vr];
                    if (!t)
                        return uu(e[w], e);
                    for (; t; ) {
                        let n = null;
                        if (tt(t))
                            n = t[Vr];
                        else {
                            const r = t[Fe];
                            r && (n = r)
                        }
                        if (!n) {
                            for (; t && !t[ft] && t !== e; )
                                tt(t) && uu(t[w], t),
                                t = t[ae];
                            null === t && (t = e),
                            tt(t) && uu(t[w], t),
                            n = t && t[ft]
                        }
                        t = n
                    }
                }(t)
            }
        }
        function uu(e, t) {
            if (!(256 & t[R])) {
                t[R] &= -129,
                t[R] |= 256,
                function $E(e, t) {
                    let n;
                    if (null != e && null != (n = e.destroyHooks))
                        for (let r = 0; r < n.length; r += 2) {
                            const o = t[n[r]];
                            if (!(o instanceof Ur)) {
                                const i = n[r + 1];
                                if (Array.isArray(i))
                                    for (let s = 0; s < i.length; s += 2) {
                                        const a = o[i[s]]
                                          , u = i[s + 1];
                                        At(4, a, u);
                                        try {
                                            u.call(a)
                                        } finally {
                                            At(5, a, u)
                                        }
                                    }
                                else {
                                    At(4, o, i);
                                    try {
                                        i.call(o)
                                    } finally {
                                        At(5, o, i)
                                    }
                                }
                            }
                        }
                }(e, t),
                function jE(e, t) {
                    const n = e.cleanup
                      , r = t[Bn];
                    if (null !== n)
                        for (let i = 0; i < n.length - 1; i += 2)
                            if ("string" == typeof n[i]) {
                                const s = n[i + 3];
                                s >= 0 ? r[s]() : r[-s].unsubscribe(),
                                i += 2
                            } else
                                n[i].call(r[n[i + 1]]);
                    null !== r && (t[Bn] = null);
                    const o = t[on];
                    if (null !== o) {
                        t[on] = null;
                        for (let i = 0; i < o.length; i++)
                            (0,
                            o[i])()
                    }
                }(e, t),
                1 === t[w].type && t[k].destroy();
                const n = t[Hr];
                if (null !== n && We(t[ae])) {
                    n !== t[ae] && Dh(n, t);
                    const r = t[Mt];
                    null !== r && r.detachView(e)
                }
                !function ME(e) {
                    tu.delete(e[Br])
                }(t)
            }
        }
        function lu(e, t, n) {
            return function _h(e, t, n) {
                let r = t;
                for (; null !== r && 40 & r.type; )
                    r = (t = r).parent;
                if (null === r)
                    return n[_e];
                {
                    const {componentOffset: o} = r;
                    if (o > -1) {
                        const {encapsulation: i} = e.data[r.directiveStart + o];
                        if (i === Je.None || i === Je.Emulated)
                            return null
                    }
                    return qe(r, n)
                }
            }(e, t.parent, n)
        }
        function In(e, t, n, r, o) {
            e.insertBefore(t, n, r, o)
        }
        function Ch(e, t, n) {
            e.appendChild(t, n)
        }
        function Eh(e, t, n, r, o) {
            null !== r ? In(e, t, n, r, o) : Ch(e, t, n)
        }
        function xi(e, t) {
            return e.parentNode(t)
        }
        let cu, pu, Mh = function bh(e, t, n) {
            return 40 & e.type ? qe(e, n) : null
        };
        function Fi(e, t, n, r) {
            const o = lu(e, r, t)
              , i = t[k]
              , a = function wh(e, t, n) {
                return Mh(e, t, n)
            }(r.parent || t[xe], r, t);
            if (null != o)
                if (Array.isArray(n))
                    for (let u = 0; u < n.length; u++)
                        Eh(i, o, n[u], a, !1);
                else
                    Eh(i, o, n, a, !1);
            void 0 !== cu && cu(i, r, t, n, o)
        }
        function Kr(e, t) {
            if (null !== t) {
                const n = t.type;
                if (3 & n)
                    return qe(t, e);
                if (4 & n)
                    return du(-1, e[t.index]);
                if (8 & n) {
                    const r = t.child;
                    if (null !== r)
                        return Kr(e, r);
                    {
                        const o = e[t.index];
                        return We(o) ? du(-1, o) : re(o)
                    }
                }
                if (32 & n)
                    return iu(t, e)() || re(e[t.index]);
                {
                    const r = Sh(e, t);
                    return null !== r ? Array.isArray(r) ? r[0] : Kr(Xr(e[pe]), r) : Kr(e, t.next)
                }
            }
            return null
        }
        function Sh(e, t) {
            return null !== t ? e[pe][xe].projection[t.projection] : null
        }
        function du(e, t) {
            const n = Fe + e + 1;
            if (n < t.length) {
                const r = t[n]
                  , o = r[w].firstChild;
                if (null !== o)
                    return Kr(r, o)
            }
            return t[It]
        }
        function fu(e, t, n, r, o, i, s) {
            for (; null != n; ) {
                const a = r[n.index]
                  , u = n.type;
                if (s && 0 === t && (a && Pe(re(a), r),
                n.flags |= 2),
                32 != (32 & n.flags))
                    if (8 & u)
                        fu(e, t, n.child, r, o, i, !1),
                        ir(t, e, o, a, i);
                    else if (32 & u) {
                        const l = iu(n, r);
                        let c;
                        for (; c = l(); )
                            ir(t, e, o, c, i);
                        ir(t, e, o, a, i)
                    } else
                        16 & u ? Th(e, t, r, n, o, i) : ir(t, e, o, a, i);
                n = s ? n.projectionNext : n.next
            }
        }
        function Qr(e, t, n, r, o, i) {
            fu(n, r, e.firstChild, t, o, i, !1)
        }
        function Th(e, t, n, r, o, i) {
            const s = n[pe]
              , u = s[xe].projection[r.projection];
            if (Array.isArray(u))
                for (let l = 0; l < u.length; l++)
                    ir(t, e, o, u[l], i);
            else {
                let l = u;
                const c = s[ae];
                Si(r) && (l.flags |= 128),
                fu(e, t, l, c, o, i, !0)
            }
        }
        function Nh(e, t, n) {
            "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
        }
        function xh(e, t, n) {
            const {mergedAttrs: r, classes: o, styles: i} = n;
            null !== r && Ea(e, t, r),
            null !== o && Nh(e, t, o),
            null !== i && function ZE(e, t, n) {
                e.setAttribute(t, "style", n)
            }(e, t, i)
        }
        class Rh {
            constructor(t) {
                this.changingThisBreaksApplicationSecurity = t
            }
            toString() {
                return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Sd})`
            }
        }
        function un(e) {
            return e instanceof Rh ? e.changingThisBreaksApplicationSecurity : e
        }
        const uw = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
        var ge = (()=>((ge = ge || {})[ge.NONE = 0] = "NONE",
        ge[ge.HTML = 1] = "HTML",
        ge[ge.STYLE = 2] = "STYLE",
        ge[ge.SCRIPT = 3] = "SCRIPT",
        ge[ge.URL = 4] = "URL",
        ge[ge.RESOURCE_URL = 5] = "RESOURCE_URL",
        ge))();
        function _u(e) {
            const t = function no() {
                const e = D();
                return e && e[Cn].sanitizer
            }();
            return t ? t.sanitize(ge.URL, e) || "" : function eo(e, t) {
                const n = function ow(e) {
                    return e instanceof Rh && e.getTypeName() || null
                }(e);
                if (null != n && n !== t) {
                    if ("ResourceURL" === n && "URL" === t)
                        return !0;
                    throw new Error(`Required a safe ${t}, got a ${n} (see ${Sd})`)
                }
                return n === t
            }(e, "URL") ? un(e) : function mu(e) {
                return (e = String(e)).match(uw) ? e : "unsafe:" + e
            }(O(e))
        }
        class M {
            constructor(t, n) {
                this._desc = t,
                this.ngMetadataName = "InjectionToken",
                this.\u0275prov = void 0,
                "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.\u0275prov = z({
                    token: this,
                    providedIn: n.providedIn || "root",
                    factory: n.factory
                }))
            }
            get multi() {
                return this
            }
            toString() {
                return `InjectionToken ${this._desc}`
            }
        }
        const Li = new M("ENVIRONMENT_INITIALIZER")
          , Uh = new M("INJECTOR",-1)
          , Gh = new M("INJECTOR_DEF_TYPES");
        class zh {
            get(t, n=Fr) {
                if (n === Fr) {
                    const r = new Error(`NullInjectorError: No provider for ${ve(t)}!`);
                    throw r.name = "NullInjectorError",
                    r
                }
                return n
            }
        }
        function Ew(...e) {
            return {
                \u0275providers: Wh(0, e),
                \u0275fromNgModule: !0
            }
        }
        function Wh(e, ...t) {
            const n = []
              , r = new Set;
            let o;
            return Wr(t, i=>{
                const s = i;
                Eu(s, n, [], r) && (o ||= [],
                o.push(s))
            }
            ),
            void 0 !== o && qh(o, n),
            n
        }
        function qh(e, t) {
            for (let n = 0; n < e.length; n++) {
                const {providers: o} = e[n];
                wu(o, i=>{
                    t.push(i)
                }
                )
            }
        }
        function Eu(e, t, n, r) {
            if (!(e = x(e)))
                return !1;
            let o = null
              , i = Td(e);
            const s = !i && Z(e);
            if (i || s) {
                if (s && !s.standalone)
                    return !1;
                o = e
            } else {
                const u = e.ngModule;
                if (i = Td(u),
                !i)
                    return !1;
                o = u
            }
            const a = r.has(o);
            if (s) {
                if (a)
                    return !1;
                if (r.add(o),
                s.dependencies) {
                    const u = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                    for (const l of u)
                        Eu(l, t, n, r)
                }
            } else {
                if (!i)
                    return !1;
                {
                    if (null != i.imports && !a) {
                        let l;
                        r.add(o);
                        try {
                            Wr(i.imports, c=>{
                                Eu(c, t, n, r) && (l ||= [],
                                l.push(c))
                            }
                            )
                        } finally {}
                        void 0 !== l && qh(l, t)
                    }
                    if (!a) {
                        const l = wn(o) || (()=>new o);
                        t.push({
                            provide: o,
                            useFactory: l,
                            deps: W
                        }, {
                            provide: Gh,
                            useValue: o,
                            multi: !0
                        }, {
                            provide: Li,
                            useValue: ()=>V(o),
                            multi: !0
                        })
                    }
                    const u = i.providers;
                    null == u || a || wu(u, c=>{
                        t.push(c)
                    }
                    )
                }
            }
            return o !== e && void 0 !== e.providers
        }
        function wu(e, t) {
            for (let n of e)
                ga(n) && (n = n.\u0275providers),
                Array.isArray(n) ? wu(n, t) : t(n)
        }
        const ww = K({
            provide: String,
            useValue: K
        });
        function bu(e) {
            return null !== e && "object" == typeof e && ww in e
        }
        function Sn(e) {
            return "function" == typeof e
        }
        const Mu = new M("Set Injector scope.")
          , Vi = {}
          , Mw = {};
        let Iu;
        function Hi() {
            return void 0 === Iu && (Iu = new zh),
            Iu
        }
        class An {
        }
        class Su extends An {
            get destroyed() {
                return this._destroyed
            }
            constructor(t, n, r, o) {
                super(),
                this.parent = n,
                this.source = r,
                this.scopes = o,
                this.records = new Map,
                this._ngOnDestroyHooks = new Set,
                this._onDestroyHooks = [],
                this._destroyed = !1,
                Tu(t, s=>this.processProvider(s)),
                this.records.set(Uh, ar(void 0, this)),
                o.has("environment") && this.records.set(An, ar(void 0, this));
                const i = this.records.get(Mu);
                null != i && "string" == typeof i.value && this.scopes.add(i.value),
                this.injectorDefTypes = new Set(this.get(Gh.multi, W, N.Self))
            }
            destroy() {
                this.assertNotDestroyed(),
                this._destroyed = !0;
                try {
                    for (const n of this._ngOnDestroyHooks)
                        n.ngOnDestroy();
                    const t = this._onDestroyHooks;
                    this._onDestroyHooks = [];
                    for (const n of t)
                        n()
                } finally {
                    this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear()
                }
            }
            onDestroy(t) {
                return this.assertNotDestroyed(),
                this._onDestroyHooks.push(t),
                ()=>this.removeOnDestroy(t)
            }
            runInContext(t) {
                this.assertNotDestroyed();
                const n = rn(this)
                  , r = Ue(void 0);
                try {
                    return t()
                } finally {
                    rn(n),
                    Ue(r)
                }
            }
            get(t, n=Fr, r=N.Default) {
                if (this.assertNotDestroyed(),
                t.hasOwnProperty(kd))
                    return t[kd](this);
                r = ni(r);
                const o = rn(this)
                  , i = Ue(void 0);
                try {
                    if (!(r & N.SkipSelf)) {
                        let a = this.records.get(t);
                        if (void 0 === a) {
                            const u = function Nw(e) {
                                return "function" == typeof e || "object" == typeof e && e instanceof M
                            }(t) && Jo(t);
                            a = u && this.injectableDefInScope(u) ? ar(Au(t), Vi) : null,
                            this.records.set(t, a)
                        }
                        if (null != a)
                            return this.hydrate(t, a)
                    }
                    return (r & N.Self ? Hi() : this.parent).get(t, n = r & N.Optional && n === Fr ? null : n)
                } catch (s) {
                    if ("NullInjectorError" === s.name) {
                        if ((s[ti] = s[ti] || []).unshift(ve(t)),
                        o)
                            throw s;
                        return function A_(e, t, n, r) {
                            const o = e[ti];
                            throw t[Od] && o.unshift(t[Od]),
                            e.message = function T_(e, t, n, r=null) {
                                e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                                let o = ve(t);
                                if (Array.isArray(t))
                                    o = t.map(ve).join(" -> ");
                                else if ("object" == typeof t) {
                                    let i = [];
                                    for (let s in t)
                                        if (t.hasOwnProperty(s)) {
                                            let a = t[s];
                                            i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : ve(a)))
                                        }
                                    o = `{${i.join(", ")}}`
                                }
                                return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(w_, "\n  ")}`
                            }("\n" + e.message, o, n, r),
                            e.ngTokenPath = o,
                            e[ti] = null,
                            e
                        }(s, t, "R3InjectorError", this.source)
                    }
                    throw s
                } finally {
                    Ue(i),
                    rn(o)
                }
            }
            resolveInjectorInitializers() {
                const t = rn(this)
                  , n = Ue(void 0);
                try {
                    const r = this.get(Li.multi, W, N.Self);
                    for (const o of r)
                        o()
                } finally {
                    rn(t),
                    Ue(n)
                }
            }
            toString() {
                const t = []
                  , n = this.records;
                for (const r of n.keys())
                    t.push(ve(r));
                return `R3Injector[${t.join(", ")}]`
            }
            assertNotDestroyed() {
                if (this._destroyed)
                    throw new C(205,!1)
            }
            processProvider(t) {
                let n = Sn(t = x(t)) ? t : x(t && t.provide);
                const r = function Sw(e) {
                    return bu(e) ? ar(void 0, e.useValue) : ar(Xh(e), Vi)
                }(t);
                if (Sn(t) || !0 !== t.multi)
                    this.records.get(n);
                else {
                    let o = this.records.get(n);
                    o || (o = ar(void 0, Vi, !0),
                    o.factory = ()=>va(o.multi),
                    this.records.set(n, o)),
                    n = t,
                    o.multi.push(t)
                }
                this.records.set(n, r)
            }
            hydrate(t, n) {
                return n.value === Vi && (n.value = Mw,
                n.value = n.factory()),
                "object" == typeof n.value && n.value && function Tw(e) {
                    return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                }(n.value) && this._ngOnDestroyHooks.add(n.value),
                n.value
            }
            injectableDefInScope(t) {
                if (!t.providedIn)
                    return !1;
                const n = x(t.providedIn);
                return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
            }
            removeOnDestroy(t) {
                const n = this._onDestroyHooks.indexOf(t);
                -1 !== n && this._onDestroyHooks.splice(n, 1)
            }
        }
        function Au(e) {
            const t = Jo(e)
              , n = null !== t ? t.factory : wn(e);
            if (null !== n)
                return n;
            if (e instanceof M)
                throw new C(204,!1);
            if (e instanceof Function)
                return function Iw(e) {
                    const t = e.length;
                    if (t > 0)
                        throw function qr(e, t) {
                            const n = [];
                            for (let r = 0; r < e; r++)
                                n.push(t);
                            return n
                        }(t, "?"),
                        new C(204,!1);
                    const n = function __(e) {
                        return e && (e[ei] || e[Nd]) || null
                    }(e);
                    return null !== n ? ()=>n.factory(e) : ()=>new e
                }(e);
            throw new C(204,!1)
        }
        function Xh(e, t, n) {
            let r;
            if (Sn(e)) {
                const o = x(e);
                return wn(o) || Au(o)
            }
            if (bu(e))
                r = ()=>x(e.useValue);
            else if (function Yh(e) {
                return !(!e || !e.useFactory)
            }(e))
                r = ()=>e.useFactory(...va(e.deps || []));
            else if (function Zh(e) {
                return !(!e || !e.useExisting)
            }(e))
                r = ()=>V(x(e.useExisting));
            else {
                const o = x(e && (e.useClass || e.provide));
                if (!function Aw(e) {
                    return !!e.deps
                }(e))
                    return wn(o) || Au(o);
                r = ()=>new o(...va(e.deps))
            }
            return r
        }
        function ar(e, t, n=!1) {
            return {
                factory: e,
                value: t,
                multi: n ? [] : void 0
            }
        }
        function Tu(e, t) {
            for (const n of e)
                Array.isArray(n) ? Tu(n, t) : n && ga(n) ? Tu(n.\u0275providers, t) : t(n)
        }
        const Bi = new M("AppId",{
            providedIn: "root",
            factory: ()=>xw
        })
          , xw = "ng"
          , Kh = new M("Platform Initializer")
          , Tn = new M("Platform ID",{
            providedIn: "platform",
            factory: ()=>"unknown"
        })
          , Qh = new M("CSP nonce",{
            providedIn: "root",
            factory: ()=>function Jr() {
                if (void 0 !== pu)
                    return pu;
                if (typeof document < "u")
                    return document;
                throw new C(210,!1)
            }().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null
        });
        let ep = (e,t)=>null;
        function tp(e, t) {
            return ep(e, t)
        }
        class Bw {
        }
        class op {
        }
        class $w {
            resolveComponentFactory(t) {
                throw function jw(e) {
                    const t = Error(`No component factory found for ${ve(e)}.`);
                    return t.ngComponent = e,
                    t
                }(t)
            }
        }
        let zi = (()=>{
            class e {
            }
            return e.NULL = new $w,
            e
        }
        )();
        function Uw() {
            return ur(Ae(), D())
        }
        function ur(e, t) {
            return new pt(qe(e, t))
        }
        let pt = (()=>{
            class e {
                constructor(n) {
                    this.nativeElement = n
                }
            }
            return e.__NG_ELEMENT_ID__ = Uw,
            e
        }
        )();
        class sp {
        }
        let Nn = (()=>{
            class e {
                constructor() {
                    this.destroyNode = null
                }
            }
            return e.__NG_ELEMENT_ID__ = ()=>function zw() {
                const e = D()
                  , n = nt(Ae().index, e);
                return (tt(n) ? n : e)[k]
            }(),
            e
        }
        )()
          , Ww = (()=>{
            class e {
            }
            return e.\u0275prov = z({
                token: e,
                providedIn: "root",
                factory: ()=>null
            }),
            e
        }
        )();
        class Wi {
            constructor(t) {
                this.full = t,
                this.major = t.split(".")[0],
                this.minor = t.split(".")[1],
                this.patch = t.split(".").slice(2).join(".")
            }
        }
        const qw = new Wi("16.1.1")
          , Bu = {};
        function so(e) {
            for (; e; ) {
                e[R] |= 64;
                const t = Xr(e);
                if (Ma(e) && !t)
                    return e;
                e = t
            }
            return null
        }
        function ju(e) {
            return e.ngOriginalError
        }
        class xn {
            constructor() {
                this._console = console
            }
            handleError(t) {
                const n = this._findOriginalError(t);
                this._console.error("ERROR", t),
                n && this._console.error("ORIGINAL ERROR", n)
            }
            _findOriginalError(t) {
                let n = t && ju(t);
                for (; n && ju(n); )
                    n = ju(n);
                return n || null
            }
        }
        const lp = new M("",{
            providedIn: "root",
            factory: ()=>!1
        });
        class pp extends nf {
            constructor() {
                super(...arguments),
                this.consumerAllowSignalWrites = !1,
                this._lView = null
            }
            set lView(t) {
                this._lView = t
            }
            onConsumerDependencyMayHaveChanged() {
                so(this._lView)
            }
            onProducerUpdateValueVersion() {}
            get hasReadASignal() {
                return this.hasProducers
            }
            runInContext(t, n, r) {
                const o = Ie(this);
                this.trackingVersion++;
                try {
                    t(n, r)
                } finally {
                    Ie(o)
                }
            }
            destroy() {
                this.trackingVersion++
            }
        }
        let Zi = null;
        function gp() {
            return Zi ??= new pp,
            Zi
        }
        function mp(e, t) {
            return e[t] ?? gp()
        }
        function yp(e, t) {
            const n = gp();
            n.hasReadASignal && (e[t] = Zi,
            n.lView = e,
            Zi = new pp)
        }
        const L = {};
        function ot(e) {
            Dp(G(), D(), He() + e, !1)
        }
        function Dp(e, t, n, r) {
            if (!r)
                if (3 == (3 & t[R])) {
                    const i = e.preOrderCheckHooks;
                    null !== i && gi(t, i, n)
                } else {
                    const i = e.preOrderHooks;
                    null !== i && mi(t, i, 0, n)
                }
            bn(n)
        }
        function Ep(e, t=null, n=null, r) {
            const o = wp(e, t, n, r);
            return o.resolveInjectorInitializers(),
            o
        }
        function wp(e, t=null, n=null, r, o=new Set) {
            const i = [n || W, Ew(e)];
            return r = r || ("object" == typeof e ? void 0 : ve(e)),
            new Su(i,t || Hi(),r || null,o)
        }
        let ln = (()=>{
            class e {
                static create(n, r) {
                    if (Array.isArray(n))
                        return Ep({
                            name: ""
                        }, r, n, "");
                    {
                        const o = n.name ?? "";
                        return Ep({
                            name: o
                        }, n.parent, n.providers, o)
                    }
                }
            }
            return e.THROW_IF_NOT_FOUND = Fr,
            e.NULL = new zh,
            e.\u0275prov = z({
                token: e,
                providedIn: "any",
                factory: ()=>V(Uh)
            }),
            e.__NG_ELEMENT_ID__ = -1,
            e
        }
        )();
        function _(e, t=N.Default) {
            const n = D();
            return null === n ? V(e, t) : jf(Ae(), n, x(e), t)
        }
        function Yi(e, t, n, r, o, i, s, a, u, l, c) {
            const d = t.blueprint.slice();
            return d[_e] = o,
            d[R] = 140 | r,
            (null !== l || e && 2048 & e[R]) && (d[R] |= 2048),
            pf(d),
            d[ae] = d[$n] = e,
            d[he] = n,
            d[Cn] = s || e && e[Cn],
            d[k] = a || e && e[k],
            d[jn] = u || e && e[jn] || null,
            d[xe] = i,
            d[Br] = function wE() {
                return EE++
            }(),
            d[Ut] = c,
            d[Xd] = l,
            d[pe] = 2 == t.type ? e[pe] : d,
            d
        }
        function cr(e, t, n, r, o) {
            let i = e.data[t];
            if (null === i)
                i = function $u(e, t, n, r, o) {
                    const i = _f()
                      , s = xa()
                      , u = e.data[t] = function gb(e, t, n, r, o, i) {
                        let s = t ? t.injectorIndex : -1
                          , a = 0;
                        return function Wn() {
                            return null !== T.skipHydrationRootTNode
                        }() && (a |= 128),
                        {
                            type: n,
                            index: r,
                            insertBeforeIndex: null,
                            injectorIndex: s,
                            directiveStart: -1,
                            directiveEnd: -1,
                            directiveStylingLast: -1,
                            componentOffset: -1,
                            propertyBindings: null,
                            flags: a,
                            providerIndexes: 0,
                            value: o,
                            attrs: i,
                            mergedAttrs: null,
                            localNames: null,
                            initialInputs: void 0,
                            inputs: null,
                            outputs: null,
                            tView: null,
                            next: null,
                            prev: null,
                            projectionNext: null,
                            child: null,
                            parent: t,
                            projection: null,
                            styles: null,
                            stylesWithoutHost: null,
                            residualStyles: void 0,
                            classes: null,
                            classesWithoutHost: null,
                            residualClasses: void 0,
                            classBindings: 0,
                            styleBindings: 0
                        }
                    }(0, s ? i : i && i.parent, n, t, r, o);
                    return null === e.firstChild && (e.firstChild = u),
                    null !== i && (s ? null == i.child && null !== u.parent && (i.child = u) : null === i.next && (i.next = u,
                    u.prev = i)),
                    u
                }(e, t, n, r, o),
                function IC() {
                    return T.lFrame.inI18n
                }() && (i.flags |= 32);
            else if (64 & i.type) {
                i.type = n,
                i.value = r,
                i.attrs = o;
                const s = function $r() {
                    const e = T.lFrame
                      , t = e.currentTNode;
                    return e.isParent ? t : t.parent
                }();
                i.injectorIndex = null === s ? -1 : s.injectorIndex
            }
            return Tt(i, !0),
            i
        }
        function ao(e, t, n, r) {
            if (0 === n)
                return -1;
            const o = t.length;
            for (let i = 0; i < n; i++)
                t.push(r),
                e.blueprint.push(r),
                e.data.push(null);
            return o
        }
        function bp(e, t, n, r, o) {
            const i = mp(t, ii)
              , s = He()
              , a = 2 & r;
            try {
                if (bn(-1),
                a && t.length > $ && Dp(e, t, $, !1),
                At(a ? 2 : 0, o),
                a)
                    i.runInContext(n, r, o);
                else {
                    const l = Ie(null);
                    try {
                        n(r, o)
                    } finally {
                        Ie(l)
                    }
                }
            } finally {
                a && null === t[ii] && yp(t, ii),
                bn(s),
                At(a ? 3 : 1, o)
            }
        }
        function Uu(e, t, n) {
            if (ba(t)) {
                const r = Ie(null);
                try {
                    const i = t.directiveEnd;
                    for (let s = t.directiveStart; s < i; s++) {
                        const a = e.data[s];
                        a.contentQueries && a.contentQueries(1, n[s], s)
                    }
                } finally {
                    Ie(r)
                }
            }
        }
        function Gu(e, t, n) {
            vf() && (function Eb(e, t, n, r) {
                const o = n.directiveStart
                  , i = n.directiveEnd;
                En(n) && function Tb(e, t, n) {
                    const r = qe(t, e)
                      , o = Mp(n);
                    let s = 16;
                    n.signals ? s = 4096 : n.onPush && (s = 64);
                    const a = Xi(e, Yi(e, o, null, s, r, t, null, e[Cn].rendererFactory.createRenderer(r, n), null, null, null));
                    e[t.index] = a
                }(t, n, e.data[o + n.componentOffset]),
                e.firstCreatePass || _i(n, t),
                Pe(r, t);
                const s = n.initialInputs;
                for (let a = o; a < i; a++) {
                    const u = e.data[a]
                      , l = Mn(t, e, a, n);
                    Pe(l, t),
                    null !== s && Nb(0, a - o, l, u, 0, s),
                    ht(u) && (nt(n.index, t)[he] = Mn(t, e, a, n))
                }
            }(e, t, n, qe(n, t)),
            64 == (64 & n.flags) && Np(e, t, n))
        }
        function zu(e, t, n=qe) {
            const r = t.localNames;
            if (null !== r) {
                let o = t.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                    const s = r[i + 1]
                      , a = -1 === s ? n(t, e) : e[s];
                    e[o++] = a
                }
            }
        }
        function Mp(e) {
            const t = e.tView;
            return null === t || t.incompleteFirstPass ? e.tView = Wu(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t
        }
        function Wu(e, t, n, r, o, i, s, a, u, l, c) {
            const d = $ + r
              , f = d + o
              , h = function lb(e, t) {
                const n = [];
                for (let r = 0; r < t; r++)
                    n.push(r < e ? null : L);
                return n
            }(d, f)
              , p = "function" == typeof l ? l() : l;
            return h[w] = {
                type: e,
                blueprint: h,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: t,
                data: h.slice().fill(null, d),
                bindingStartIndex: d,
                expandoStartIndex: f,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof i ? i() : i,
                pipeRegistry: "function" == typeof s ? s() : s,
                firstChild: null,
                schemas: u,
                consts: p,
                incompleteFirstPass: !1,
                ssrId: c
            }
        }
        let Ip = e=>null;
        function Sp(e, t, n, r) {
            for (let o in e)
                if (e.hasOwnProperty(o)) {
                    n = null === n ? {} : n;
                    const i = e[o];
                    null === r ? Ap(n, t, o, i) : r.hasOwnProperty(o) && Ap(n, t, r[o], i)
                }
            return n
        }
        function Ap(e, t, n, r) {
            e.hasOwnProperty(n) ? e[n].push(t, r) : e[n] = [t, r]
        }
        function it(e, t, n, r, o, i, s, a) {
            const u = qe(t, n);
            let c, l = t.inputs;
            !a && null != l && (c = l[r]) ? (Ku(e, n, c, r, o),
            En(t) && function Db(e, t) {
                const n = nt(t, e);
                16 & n[R] || (n[R] |= 64)
            }(n, t.index)) : 3 & t.type && (r = function yb(e) {
                return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
            }(r),
            o = null != s ? s(o, t.value || "", r) : o,
            i.setProperty(u, r, o))
        }
        function qu(e, t, n, r) {
            if (vf()) {
                const o = null === r ? null : {
                    "": -1
                }
                  , i = function bb(e, t) {
                    const n = e.directiveRegistry;
                    let r = null
                      , o = null;
                    if (n)
                        for (let i = 0; i < n.length; i++) {
                            const s = n[i];
                            if (Ud(t, s.selectors, !1))
                                if (r || (r = []),
                                ht(s))
                                    if (null !== s.findHostDirectiveDefs) {
                                        const a = [];
                                        o = o || new Map,
                                        s.findHostDirectiveDefs(s, a, o),
                                        r.unshift(...a, s),
                                        Zu(e, t, a.length)
                                    } else
                                        r.unshift(s),
                                        Zu(e, t, 0);
                                else
                                    o = o || new Map,
                                    s.findHostDirectiveDefs?.(s, r, o),
                                    r.push(s)
                        }
                    return null === r ? null : [r, o]
                }(e, n);
                let s, a;
                null === i ? s = a = null : [s,a] = i,
                null !== s && Tp(e, t, n, s, o, a),
                o && function Mb(e, t, n) {
                    if (t) {
                        const r = e.localNames = [];
                        for (let o = 0; o < t.length; o += 2) {
                            const i = n[t[o + 1]];
                            if (null == i)
                                throw new C(-301,!1);
                            r.push(t[o], i)
                        }
                    }
                }(n, r, o)
            }
            n.mergedAttrs = Rr(n.mergedAttrs, n.attrs)
        }
        function Tp(e, t, n, r, o, i) {
            for (let l = 0; l < r.length; l++)
                Ua(_i(n, t), e, r[l].type);
            !function Sb(e, t, n) {
                e.flags |= 1,
                e.directiveStart = t,
                e.directiveEnd = t + n,
                e.providerIndexes = t
            }(n, e.data.length, r.length);
            for (let l = 0; l < r.length; l++) {
                const c = r[l];
                c.providersResolver && c.providersResolver(c)
            }
            let s = !1
              , a = !1
              , u = ao(e, t, r.length, null);
            for (let l = 0; l < r.length; l++) {
                const c = r[l];
                n.mergedAttrs = Rr(n.mergedAttrs, c.hostAttrs),
                Ab(e, n, t, u, c),
                Ib(u, c, o),
                null !== c.contentQueries && (n.flags |= 4),
                (null !== c.hostBindings || null !== c.hostAttrs || 0 !== c.hostVars) && (n.flags |= 64);
                const d = c.type.prototype;
                !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index),
                s = !0),
                !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index),
                a = !0),
                u++
            }
            !function mb(e, t, n) {
                const o = t.directiveEnd
                  , i = e.data
                  , s = t.attrs
                  , a = [];
                let u = null
                  , l = null;
                for (let c = t.directiveStart; c < o; c++) {
                    const d = i[c]
                      , f = n ? n.get(d) : null
                      , p = f ? f.outputs : null;
                    u = Sp(d.inputs, c, u, f ? f.inputs : null),
                    l = Sp(d.outputs, c, l, p);
                    const g = null === u || null === s || $d(t) ? null : xb(u, c, s);
                    a.push(g)
                }
                null !== u && (u.hasOwnProperty("class") && (t.flags |= 8),
                u.hasOwnProperty("style") && (t.flags |= 16)),
                t.initialInputs = a,
                t.inputs = u,
                t.outputs = l
            }(e, n, i)
        }
        function Np(e, t, n) {
            const r = n.directiveStart
              , o = n.directiveEnd
              , i = n.index
              , s = function AC() {
                return T.lFrame.currentDirectiveIndex
            }();
            try {
                bn(i);
                for (let a = r; a < o; a++) {
                    const u = e.data[a]
                      , l = t[a];
                    Oa(a),
                    (null !== u.hostBindings || 0 !== u.hostVars || null !== u.hostAttrs) && wb(u, l)
                }
            } finally {
                bn(-1),
                Oa(s)
            }
        }
        function wb(e, t) {
            null !== e.hostBindings && e.hostBindings(1, t)
        }
        function Zu(e, t, n) {
            t.componentOffset = n,
            (e.components ??= []).push(t.index)
        }
        function Ib(e, t, n) {
            if (n) {
                if (t.exportAs)
                    for (let r = 0; r < t.exportAs.length; r++)
                        n[t.exportAs[r]] = e;
                ht(t) && (n[""] = e)
            }
        }
        function Ab(e, t, n, r, o) {
            e.data[r] = o;
            const i = o.factory || (o.factory = wn(o.type))
              , s = new Ur(i,ht(o),_);
            e.blueprint[r] = s,
            n[r] = s,
            function _b(e, t, n, r, o) {
                const i = o.hostBindings;
                if (i) {
                    let s = e.hostBindingOpCodes;
                    null === s && (s = e.hostBindingOpCodes = []);
                    const a = ~t.index;
                    (function Cb(e) {
                        let t = e.length;
                        for (; t > 0; ) {
                            const n = e[--t];
                            if ("number" == typeof n && n < 0)
                                return n
                        }
                        return 0
                    }
                    )(s) != a && s.push(a),
                    s.push(n, r, i)
                }
            }(e, t, r, ao(e, n, o.hostVars, L), o)
        }
        function Nb(e, t, n, r, o, i) {
            const s = i[t];
            if (null !== s)
                for (let a = 0; a < s.length; )
                    xp(r, n, s[a++], s[a++], s[a++])
        }
        function xp(e, t, n, r, o) {
            const i = Ie(null);
            try {
                const s = e.inputTransforms;
                null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
                null !== e.setInput ? e.setInput(t, o, n, r) : t[r] = o
            } finally {
                Ie(i)
            }
        }
        function xb(e, t, n) {
            let r = null
              , o = 0;
            for (; o < n.length; ) {
                const i = n[o];
                if (0 !== i)
                    if (5 !== i) {
                        if ("number" == typeof i)
                            break;
                        if (e.hasOwnProperty(i)) {
                            null === r && (r = []);
                            const s = e[i];
                            for (let a = 0; a < s.length; a += 2)
                                if (s[a] === t) {
                                    r.push(i, s[a + 1], n[o + 1]);
                                    break
                                }
                        }
                        o += 2
                    } else
                        o += 2;
                else
                    o += 4
            }
            return r
        }
        function Fp(e, t, n, r) {
            return [e, !0, !1, t, null, 0, r, n, null, null, null]
        }
        function Op(e, t) {
            const n = e.contentQueries;
            if (null !== n)
                for (let r = 0; r < n.length; r += 2) {
                    const i = n[r + 1];
                    if (-1 !== i) {
                        const s = e.data[i];
                        Ra(n[r]),
                        s.contentQueries(2, t[i], i)
                    }
                }
        }
        function Xi(e, t) {
            return e[Vr] ? e[Yd][ft] = t : e[Vr] = t,
            e[Yd] = t,
            t
        }
        function Xu(e, t, n) {
            Ra(0);
            const r = Ie(null);
            try {
                t(e, n)
            } finally {
                Ie(r)
            }
        }
        function Lp(e, t) {
            const n = e[jn]
              , r = n ? n.get(xn, null) : null;
            r && r.handleError(t)
        }
        function Ku(e, t, n, r, o) {
            for (let i = 0; i < n.length; ) {
                const s = n[i++]
                  , a = n[i++];
                xp(e.data[s], t[s], r, a, o)
            }
        }
        function Yt(e, t, n) {
            const r = fi(t, e);
            !function yh(e, t, n) {
                e.setValue(t, n)
            }(e[k], r, n)
        }
        function Fb(e, t) {
            const n = nt(t, e)
              , r = n[w];
            !function Ob(e, t) {
                for (let n = t.length; n < e.blueprint.length; n++)
                    t.push(e.blueprint[n])
            }(r, n);
            const o = n[_e];
            null !== o && null === n[Ut] && (n[Ut] = tp(o, n[jn])),
            Qu(r, n, n[he])
        }
        function Qu(e, t, n) {
            ka(t);
            try {
                const r = e.viewQuery;
                null !== r && Xu(1, r, n);
                const o = e.template;
                null !== o && bp(e, t, o, 1, n),
                e.firstCreatePass && (e.firstCreatePass = !1),
                e.staticContentQueries && Op(e, t),
                e.staticViewQueries && Xu(2, e.viewQuery, n);
                const i = e.components;
                null !== i && function Pb(e, t) {
                    for (let n = 0; n < t.length; n++)
                        Fb(e, t[n])
                }(t, i)
            } catch (r) {
                throw e.firstCreatePass && (e.incompleteFirstPass = !0,
                e.firstCreatePass = !1),
                r
            } finally {
                t[R] &= -5,
                La()
            }
        }
        let Vp = (()=>{
            class e {
                constructor() {
                    this.all = new Set,
                    this.queue = new Map
                }
                create(n, r, o) {
                    const i = typeof Zone > "u" ? null : Zone.current
                      , s = new oC(n,l=>{
                        this.all.has(l) && this.queue.set(l, i)
                    }
                    ,o);
                    let a;
                    this.all.add(s),
                    s.notify();
                    const u = ()=>{
                        s.cleanup(),
                        a?.(),
                        this.all.delete(s),
                        this.queue.delete(s)
                    }
                    ;
                    return a = r?.onDestroy(u),
                    {
                        destroy: u
                    }
                }
                flush() {
                    if (0 !== this.queue.size)
                        for (const [n,r] of this.queue)
                            this.queue.delete(n),
                            r ? r.run(()=>n.run()) : n.run()
                }
                get isQueueEmpty() {
                    return 0 === this.queue.size
                }
            }
            return e.\u0275prov = z({
                token: e,
                providedIn: "root",
                factory: ()=>new e
            }),
            e
        }
        )();
        function Ki(e, t, n) {
            let r = n ? e.styles : null
              , o = n ? e.classes : null
              , i = 0;
            if (null !== t)
                for (let s = 0; s < t.length; s++) {
                    const a = t[s];
                    "number" == typeof a ? i = a : 1 == i ? o = ha(o, a) : 2 == i && (r = ha(r, a + ": " + t[++s] + ";"))
                }
            n ? e.styles = r : e.stylesWithoutHost = r,
            n ? e.classes = o : e.classesWithoutHost = o
        }
        function uo(e, t, n, r, o=!1) {
            for (; null !== n; ) {
                const i = t[n.index];
                if (null !== i && r.push(re(i)),
                We(i)) {
                    for (let a = Fe; a < i.length; a++) {
                        const u = i[a]
                          , l = u[w].firstChild;
                        null !== l && uo(u[w], u, l, r)
                    }
                    i[It] !== i[_e] && r.push(i[It])
                }
                const s = n.type;
                if (8 & s)
                    uo(e, t, n.child, r);
                else if (32 & s) {
                    const a = iu(n, t);
                    let u;
                    for (; u = a(); )
                        r.push(u)
                } else if (16 & s) {
                    const a = Sh(t, n);
                    if (Array.isArray(a))
                        r.push(...a);
                    else {
                        const u = Xr(t[pe]);
                        uo(u[w], u, a, r, !0)
                    }
                }
                n = o ? n.projectionNext : n.next
            }
            return r
        }
        function Qi(e, t, n, r=!0) {
            const o = t[Cn].rendererFactory;
            o.begin && o.begin();
            try {
                Hp(e, t, e.template, n)
            } catch (s) {
                throw r && Lp(t, s),
                s
            } finally {
                o.end && o.end(),
                t[Cn].effectManager?.flush()
            }
        }
        function Hp(e, t, n, r) {
            const o = t[R];
            if (256 != (256 & o)) {
                t[Cn].effectManager?.flush(),
                ka(t);
                try {
                    pf(t),
                    function Ef(e) {
                        return T.lFrame.bindingIndex = e
                    }(e.bindingStartIndex),
                    null !== n && bp(e, t, n, 2, r);
                    const s = 3 == (3 & o);
                    if (s) {
                        const l = e.preOrderCheckHooks;
                        null !== l && gi(t, l, null)
                    } else {
                        const l = e.preOrderHooks;
                        null !== l && mi(t, l, 0, null),
                        Va(t, 0)
                    }
                    if (function Hb(e) {
                        for (let t = ph(e); null !== t; t = gh(t)) {
                            if (!t[Kd])
                                continue;
                            const n = t[Gn];
                            for (let r = 0; r < n.length; r++) {
                                gC(n[r])
                            }
                        }
                    }(t),
                    Bp(t, 2),
                    null !== e.contentQueries && Op(e, t),
                    s) {
                        const l = e.contentCheckHooks;
                        null !== l && gi(t, l)
                    } else {
                        const l = e.contentHooks;
                        null !== l && mi(t, l, 1),
                        Va(t, 1)
                    }
                    !function ub(e, t) {
                        const n = e.hostBindingOpCodes;
                        if (null === n)
                            return;
                        const r = mp(t, si);
                        try {
                            for (let o = 0; o < n.length; o++) {
                                const i = n[o];
                                if (i < 0)
                                    bn(~i);
                                else {
                                    const s = i
                                      , a = n[++o]
                                      , u = n[++o];
                                    SC(a, s),
                                    r.runInContext(u, 2, t[s])
                                }
                            }
                        } finally {
                            null === t[si] && yp(t, si),
                            bn(-1)
                        }
                    }(e, t);
                    const a = e.components;
                    null !== a && $p(t, a, 0);
                    const u = e.viewQuery;
                    if (null !== u && Xu(2, u, r),
                    s) {
                        const l = e.viewCheckHooks;
                        null !== l && gi(t, l)
                    } else {
                        const l = e.viewHooks;
                        null !== l && mi(t, l, 2),
                        Va(t, 2)
                    }
                    !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
                    t[R] &= -73,
                    gf(t)
                } finally {
                    La()
                }
            }
        }
        function Bp(e, t) {
            for (let n = ph(e); null !== n; n = gh(n))
                for (let r = Fe; r < n.length; r++)
                    jp(n[r], t)
        }
        function Bb(e, t, n) {
            jp(nt(t, e), n)
        }
        function jp(e, t) {
            if (!function hC(e) {
                return 128 == (128 & e[R])
            }(e))
                return;
            const n = e[w];
            if (80 & e[R] && 0 === t || 1024 & e[R] || 2 === t)
                Hp(n, e, n.template, e[he]);
            else if (e[Lr] > 0) {
                Bp(e, 1);
                const o = e[w].components;
                null !== o && $p(e, o, 1)
            }
        }
        function $p(e, t, n) {
            for (let r = 0; r < t.length; r++)
                Bb(e, t[r], n)
        }
        class lo {
            get rootNodes() {
                const t = this._lView
                  , n = t[w];
                return uo(n, t, n.firstChild, [])
            }
            constructor(t, n) {
                this._lView = t,
                this._cdRefInjectingView = n,
                this._appRef = null,
                this._attachedToViewContainer = !1
            }
            get context() {
                return this._lView[he]
            }
            set context(t) {
                this._lView[he] = t
            }
            get destroyed() {
                return 256 == (256 & this._lView[R])
            }
            destroy() {
                if (this._appRef)
                    this._appRef.detachView(this);
                else if (this._attachedToViewContainer) {
                    const t = this._lView[ae];
                    if (We(t)) {
                        const n = t[8]
                          , r = n ? n.indexOf(this) : -1;
                        r > -1 && (au(t, r),
                        Ei(n, r))
                    }
                    this._attachedToViewContainer = !1
                }
                vh(this._lView[w], this._lView)
            }
            onDestroy(t) {
                !function yf(e, t) {
                    if (256 == (256 & e[R]))
                        throw new C(911,!1);
                    null === e[on] && (e[on] = []),
                    e[on].push(t)
                }(this._lView, t)
            }
            markForCheck() {
                so(this._cdRefInjectingView || this._lView)
            }
            detach() {
                this._lView[R] &= -129
            }
            reattach() {
                this._lView[R] |= 128
            }
            detectChanges() {
                Qi(this._lView[w], this._lView, this.context)
            }
            checkNoChanges() {}
            attachToViewContainerRef() {
                if (this._appRef)
                    throw new C(902,!1);
                this._attachedToViewContainer = !0
            }
            detachFromAppRef() {
                this._appRef = null,
                function LE(e, t) {
                    Qr(e, t, t[k], 2, null, null)
                }(this._lView[w], this._lView)
            }
            attachToAppRef(t) {
                if (this._attachedToViewContainer)
                    throw new C(902,!1);
                this._appRef = t
            }
        }
        class jb extends lo {
            constructor(t) {
                super(t),
                this._view = t
            }
            detectChanges() {
                const t = this._view;
                Qi(t[w], t, t[he], !1)
            }
            checkNoChanges() {}
            get context() {
                return null
            }
        }
        class Up extends zi {
            constructor(t) {
                super(),
                this.ngModule = t
            }
            resolveComponentFactory(t) {
                const n = Z(t);
                return new co(n,this.ngModule)
            }
        }
        function Gp(e) {
            const t = [];
            for (let n in e)
                e.hasOwnProperty(n) && t.push({
                    propName: e[n],
                    templateName: n
                });
            return t
        }
        class Ub {
            constructor(t, n) {
                this.injector = t,
                this.parentInjector = n
            }
            get(t, n, r) {
                r = ni(r);
                const o = this.injector.get(t, Bu, r);
                return o !== Bu || n === Bu ? o : this.parentInjector.get(t, n, r)
            }
        }
        class co extends op {
            get inputs() {
                return Gp(this.componentDef.inputs)
            }
            get outputs() {
                return Gp(this.componentDef.outputs)
            }
            constructor(t, n) {
                super(),
                this.componentDef = t,
                this.ngModule = n,
                this.componentType = t.type,
                this.selector = function H_(e) {
                    return e.map(V_).join(",")
                }(t.selectors),
                this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [],
                this.isBoundToModule = !!n
            }
            create(t, n, r, o) {
                let i = (o = o || this.ngModule)instanceof An ? o : o?.injector;
                i && null !== this.componentDef.getStandaloneInjector && (i = this.componentDef.getStandaloneInjector(i) || i);
                const s = i ? new Ub(t,i) : t
                  , a = s.get(sp, null);
                if (null === a)
                    throw new C(407,!1);
                const c = {
                    rendererFactory: a,
                    sanitizer: s.get(Ww, null),
                    effectManager: s.get(Vp, null)
                }
                  , d = a.createRenderer(null, this.componentDef)
                  , f = this.componentDef.selectors[0][0] || "div"
                  , h = r ? function cb(e, t, n, r) {
                    const i = r.get(lp, !1) || n === Je.ShadowDom
                      , s = e.selectRootElement(t, i);
                    return function db(e) {
                        Ip(e)
                    }(s),
                    s
                }(d, r, this.componentDef.encapsulation, s) : Ni(d, f, function $b(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? df : "math" === t ? "math" : null
                }(f))
                  , y = this.componentDef.signals ? 4608 : this.componentDef.onPush ? 576 : 528
                  , v = Wu(0, null, null, 1, 0, null, null, null, null, null, null)
                  , m = Yi(null, v, null, y, null, null, c, d, s, null, null);
                let b, S;
                ka(m);
                try {
                    const F = this.componentDef;
                    let Me, Js = null;
                    F.findHostDirectiveDefs ? (Me = [],
                    Js = new Map,
                    F.findHostDirectiveDefs(F, Me, Js),
                    Me.push(F)) : Me = [F];
                    const XF = function zb(e, t) {
                        const n = e[w]
                          , r = $;
                        return e[r] = t,
                        cr(n, r, 2, "#host", null)
                    }(m, h)
                      , KF = function Wb(e, t, n, r, o, i, s) {
                        const a = o[w];
                        !function qb(e, t, n, r) {
                            for (const o of e)
                                t.mergedAttrs = Rr(t.mergedAttrs, o.hostAttrs);
                            null !== t.mergedAttrs && (Ki(t, t.mergedAttrs, !0),
                            null !== n && xh(r, n, t))
                        }(r, e, t, s);
                        let u = null;
                        null !== t && (u = tp(t, o[jn]));
                        const l = i.rendererFactory.createRenderer(t, n);
                        let c = 16;
                        n.signals ? c = 4096 : n.onPush && (c = 64);
                        const d = Yi(o, Mp(n), null, c, o[e.index], e, i, l, null, null, u);
                        return a.firstCreatePass && Zu(a, e, r.length - 1),
                        Xi(o, d),
                        o[e.index] = d
                    }(XF, h, F, Me, m, c, d);
                    S = hf(v, $),
                    h && function Yb(e, t, n, r) {
                        if (r)
                            Ea(e, n, ["ng-version", qw.full]);
                        else {
                            const {attrs: o, classes: i} = function B_(e) {
                                const t = []
                                  , n = [];
                                let r = 1
                                  , o = 2;
                                for (; r < e.length; ) {
                                    let i = e[r];
                                    if ("string" == typeof i)
                                        2 === o ? "" !== i && t.push(i, e[++r]) : 8 === o && n.push(i);
                                    else {
                                        if (!dt(o))
                                            break;
                                        o = i
                                    }
                                    r++
                                }
                                return {
                                    attrs: t,
                                    classes: n
                                }
                            }(t.selectors[0]);
                            o && Ea(e, n, o),
                            i && i.length > 0 && Nh(e, n, i.join(" "))
                        }
                    }(d, F, h, r),
                    void 0 !== n && function Xb(e, t, n) {
                        const r = e.projection = [];
                        for (let o = 0; o < t.length; o++) {
                            const i = n[o];
                            r.push(null != i ? Array.from(i) : null)
                        }
                    }(S, this.ngContentSelectors, n),
                    b = function Zb(e, t, n, r, o, i) {
                        const s = Ae()
                          , a = o[w]
                          , u = qe(s, o);
                        Tp(a, o, s, n, null, r);
                        for (let c = 0; c < n.length; c++)
                            Pe(Mn(o, a, s.directiveStart + c, s), o);
                        Np(a, o, s),
                        u && Pe(u, o);
                        const l = Mn(o, a, s.directiveStart + s.componentOffset, s);
                        if (e[he] = o[he] = l,
                        null !== i)
                            for (const c of i)
                                c(l, t);
                        return Uu(a, s, e),
                        l
                    }(KF, F, Me, Js, m, [Kb]),
                    Qu(v, m, null)
                } finally {
                    La()
                }
                return new Gb(this.componentType,b,ur(S, m),m,S)
            }
        }
        class Gb extends Bw {
            constructor(t, n, r, o, i) {
                super(),
                this.location = r,
                this._rootLView = o,
                this._tNode = i,
                this.previousInputValues = null,
                this.instance = n,
                this.hostView = this.changeDetectorRef = new jb(o),
                this.componentType = t
            }
            setInput(t, n) {
                const r = this._tNode.inputs;
                let o;
                if (null !== r && (o = r[t])) {
                    if (this.previousInputValues ??= new Map,
                    this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
                        return;
                    const i = this._rootLView;
                    Ku(i[w], i, o, t, n),
                    this.previousInputValues.set(t, n),
                    so(nt(this._tNode.index, i))
                }
            }
            get injector() {
                return new Kn(this._tNode,this._rootLView)
            }
            destroy() {
                this.hostView.destroy()
            }
            onDestroy(t) {
                this.hostView.onDestroy(t)
            }
        }
        function Kb() {
            const e = Ae();
            pi(D()[w], e)
        }
        function Q(e) {
            let t = function zp(e) {
                return Object.getPrototypeOf(e.prototype).constructor
            }(e.type)
              , n = !0;
            const r = [e];
            for (; t; ) {
                let o;
                if (ht(e))
                    o = t.\u0275cmp || t.\u0275dir;
                else {
                    if (t.\u0275cmp)
                        throw new C(903,!1);
                    o = t.\u0275dir
                }
                if (o) {
                    if (n) {
                        r.push(o);
                        const s = e;
                        s.inputs = Ji(e.inputs),
                        s.inputTransforms = Ji(e.inputTransforms),
                        s.declaredInputs = Ji(e.declaredInputs),
                        s.outputs = Ji(e.outputs);
                        const a = o.hostBindings;
                        a && tM(e, a);
                        const u = o.viewQuery
                          , l = o.contentQueries;
                        if (u && Jb(e, u),
                        l && eM(e, l),
                        Xo(e.inputs, o.inputs),
                        Xo(e.declaredInputs, o.declaredInputs),
                        Xo(e.outputs, o.outputs),
                        null !== o.inputTransforms && (null === s.inputTransforms && (s.inputTransforms = {}),
                        Xo(s.inputTransforms, o.inputTransforms)),
                        ht(o) && o.data.animation) {
                            const c = e.data;
                            c.animation = (c.animation || []).concat(o.data.animation)
                        }
                    }
                    const i = o.features;
                    if (i)
                        for (let s = 0; s < i.length; s++) {
                            const a = i[s];
                            a && a.ngInherit && a(e),
                            a === Q && (n = !1)
                        }
                }
                t = Object.getPrototypeOf(t)
            }
            !function Qb(e) {
                let t = 0
                  , n = null;
                for (let r = e.length - 1; r >= 0; r--) {
                    const o = e[r];
                    o.hostVars = t += o.hostVars,
                    o.hostAttrs = Rr(o.hostAttrs, n = Rr(n, o.hostAttrs))
                }
            }(r)
        }
        function Ji(e) {
            return e === bt ? {} : e === W ? [] : e
        }
        function Jb(e, t) {
            const n = e.viewQuery;
            e.viewQuery = n ? (r,o)=>{
                t(r, o),
                n(r, o)
            }
            : t
        }
        function eM(e, t) {
            const n = e.contentQueries;
            e.contentQueries = n ? (r,o,i)=>{
                t(r, o, i),
                n(r, o, i)
            }
            : t
        }
        function tM(e, t) {
            const n = e.hostBindings;
            e.hostBindings = n ? (r,o)=>{
                t(r, o),
                n(r, o)
            }
            : t
        }
        function es(e) {
            return !!function Ju(e) {
                return null !== e && ("function" == typeof e || "object" == typeof e)
            }(e) && (Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e)
        }
        function Re(e, t, n) {
            return !Object.is(e[t], n) && (e[t] = n,
            !0)
        }
        function fr(e, t, n, r) {
            return Re(e, Yn(), n) ? t + O(n) + r : L
        }
        function hr(e, t, n, r, o, i) {
            const a = function Fn(e, t, n, r) {
                const o = Re(e, t, n);
                return Re(e, t + 1, r) || o
            }(e, function zt() {
                return T.lFrame.bindingIndex
            }(), n, o);
            return Wt(2),
            a ? t + O(n) + r + O(o) + i : L
        }
        let ug = function lg(e, t, n, r) {
            return an(!0),
            t[k].createComment("")
        };
        function _r(e) {
            return function zn(e, t) {
                return e[t]
            }(function MC() {
                return T.lFrame.contextLView
            }(), $ + e)
        }
        function mo(e, t, n) {
            const r = D();
            return Re(r, Yn(), t) && it(G(), ue(), r, e, t, r[k], n, !1),
            mo
        }
        function il(e, t, n, r, o) {
            const s = o ? "class" : "style";
            Ku(e, n, t.inputs[s], s, r)
        }
        function H(e, t, n, r) {
            const o = D()
              , i = G()
              , s = $ + e
              , a = o[k]
              , u = i.firstCreatePass ? function xM(e, t, n, r, o, i) {
                const s = t.consts
                  , u = cr(t, e, 2, r, sn(s, o));
                return qu(t, n, u, sn(s, i)),
                null !== u.attrs && Ki(u, u.attrs, !1),
                null !== u.mergedAttrs && Ki(u, u.mergedAttrs, !0),
                null !== t.queries && t.queries.elementStart(t, u),
                u
            }(s, i, o, t, n, r) : i.data[s]
              , l = cg(i, o, u, a, t, e);
            o[s] = l;
            const c = ui(u);
            return Tt(u, !0),
            xh(a, l, u),
            32 != (32 & u.flags) && hi() && Fi(i, o, l, u),
            0 === function yC() {
                return T.lFrame.elementDepthCount
            }() && Pe(l, o),
            function DC() {
                T.lFrame.elementDepthCount++
            }(),
            c && (Gu(i, o, u),
            Uu(i, u, o)),
            null !== r && zu(o, u),
            H
        }
        function U() {
            let e = Ae();
            xa() ? function Fa() {
                T.lFrame.isParent = !1
            }() : (e = e.parent,
            Tt(e, !1));
            const t = e;
            (function _C(e) {
                return T.skipHydrationRootTNode === e
            }
            )(t) && function bC() {
                T.skipHydrationRootTNode = null
            }(),
            function vC() {
                T.lFrame.elementDepthCount--
            }();
            const n = G();
            return n.firstCreatePass && (pi(n, e),
            ba(e) && n.queries.elementEnd(e)),
            null != t.classesWithoutHost && function VC(e) {
                return 0 != (8 & e.flags)
            }(t) && il(n, t, D(), t.classesWithoutHost, !0),
            null != t.stylesWithoutHost && function HC(e) {
                return 0 != (16 & e.flags)
            }(t) && il(n, t, D(), t.stylesWithoutHost, !1),
            U
        }
        function Xe(e, t, n, r) {
            return H(e, t, n, r),
            U(),
            Xe
        }
        let cg = (e,t,n,r,o,i)=>(an(!0),
        Ni(r, o, function xf() {
            return T.lFrame.currentNamespace
        }()));
        function ul() {
            return D()
        }
        function is(e) {
            return !!e && "function" == typeof e.then
        }
        function hg(e) {
            return !!e && "function" == typeof e.subscribe
        }
        function Se(e, t, n, r) {
            const o = D()
              , i = G()
              , s = Ae();
            return function gg(e, t, n, r, o, i, s) {
                const a = ui(r)
                  , l = e.firstCreatePass && function Rp(e) {
                    return e.cleanup || (e.cleanup = [])
                }(e)
                  , c = t[he]
                  , d = function Pp(e) {
                    return e[Bn] || (e[Bn] = [])
                }(t);
                let f = !0;
                if (3 & r.type || s) {
                    const g = qe(r, t)
                      , y = s ? s(g) : g
                      , v = d.length
                      , m = s ? S=>s(re(S[r.index])) : r.index;
                    let b = null;
                    if (!s && a && (b = function LM(e, t, n, r) {
                        const o = e.cleanup;
                        if (null != o)
                            for (let i = 0; i < o.length - 1; i += 2) {
                                const s = o[i];
                                if (s === n && o[i + 1] === r) {
                                    const a = t[Bn]
                                      , u = o[i + 2];
                                    return a.length > u ? a[u] : null
                                }
                                "string" == typeof s && (i += 2)
                            }
                        return null
                    }(e, t, o, r.index)),
                    null !== b)
                        (b.__ngLastListenerFn__ || b).__ngNextListenerFn__ = i,
                        b.__ngLastListenerFn__ = i,
                        f = !1;
                    else {
                        i = yg(r, t, c, i, !1);
                        const S = n.listen(y, o, i);
                        d.push(i, S),
                        l && l.push(o, m, v, v + 1)
                    }
                } else
                    i = yg(r, t, c, i, !1);
                const h = r.outputs;
                let p;
                if (f && null !== h && (p = h[o])) {
                    const g = p.length;
                    if (g)
                        for (let y = 0; y < g; y += 2) {
                            const F = t[p[y]][p[y + 1]].subscribe(i)
                              , Me = d.length;
                            d.push(i, F),
                            l && l.push(o, r.index, Me, -(Me + 1))
                        }
                }
            }(i, o, o[k], s, e, t, r),
            Se
        }
        function mg(e, t, n, r) {
            try {
                return At(6, t, n),
                !1 !== n(r)
            } catch (o) {
                return Lp(e, o),
                !1
            } finally {
                At(7, t, n)
            }
        }
        function yg(e, t, n, r, o) {
            return function i(s) {
                if (s === Function)
                    return r;
                so(e.componentOffset > -1 ? nt(e.index, t) : t);
                let u = mg(t, n, r, s)
                  , l = i.__ngNextListenerFn__;
                for (; l; )
                    u = mg(t, n, l, s) && u,
                    l = l.__ngNextListenerFn__;
                return o && !1 === u && s.preventDefault(),
                u
            }
        }
        function ll(e=1) {
            return function NC(e) {
                return (T.lFrame.contextLView = function xC(e, t) {
                    for (; e > 0; )
                        t = t[$n],
                        e--;
                    return t
                }(e, T.lFrame.contextLView))[he]
            }(e)
        }
        function cl(e, t, n) {
            return dl(e, "", t, "", n),
            cl
        }
        function dl(e, t, n, r, o) {
            const i = D()
              , s = fr(i, t, n, r);
            return s !== L && it(G(), ue(), i, e, s, i[k], o, !1),
            dl
        }
        function ss(e, t) {
            return e << 17 | t << 2
        }
        function cn(e) {
            return e >> 17 & 32767
        }
        function fl(e) {
            return 2 | e
        }
        function On(e) {
            return (131068 & e) >> 2
        }
        function hl(e, t) {
            return -131069 & e | t << 2
        }
        function pl(e) {
            return 1 | e
        }
        function Ig(e, t, n, r, o) {
            const i = e[n + 1]
              , s = null === t;
            let a = r ? cn(i) : On(i)
              , u = !1;
            for (; 0 !== a && (!1 === u || s); ) {
                const c = e[a + 1];
                WM(e[a], t) && (u = !0,
                e[a + 1] = r ? pl(c) : fl(c)),
                a = r ? cn(c) : On(c)
            }
            u && (e[n + 1] = r ? fl(i) : pl(i))
        }
        function WM(e, t) {
            return null === e || null == t || (Array.isArray(e) ? e[1] : e) === t || !(!Array.isArray(e) || "string" != typeof t) && nr(e, t) >= 0
        }
        const Ee = {
            textEnd: 0,
            key: 0,
            keyEnd: 0,
            value: 0,
            valueEnd: 0
        };
        function Sg(e) {
            return e.substring(Ee.key, Ee.keyEnd)
        }
        function Ag(e, t) {
            const n = Ee.textEnd;
            return n === t ? -1 : (t = Ee.keyEnd = function XM(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; )
                    t++;
                return t
            }(e, Ee.key = t, n),
            Cr(e, t, n))
        }
        function Cr(e, t, n) {
            for (; t < n && e.charCodeAt(t) <= 32; )
                t++;
            return t
        }
        function as(e, t) {
            return function gt(e, t, n, r) {
                const o = D()
                  , i = G()
                  , s = Wt(2);
                i.firstUpdatePass && Rg(i, e, s, r),
                t !== L && Re(o, s, t) && Lg(i, i.data[He()], o, o[k], e, o[s + 1] = function aI(e, t) {
                    return null == e || "" === e || ("string" == typeof t ? e += t : "object" == typeof e && (e = ve(un(e)))),
                    e
                }(t, n), r, s)
            }(e, t, null, !0),
            as
        }
        function us(e) {
            !function mt(e, t, n, r) {
                const o = G()
                  , i = Wt(2);
                o.firstUpdatePass && Rg(o, null, i, r);
                const s = D();
                if (n !== L && Re(s, i, n)) {
                    const a = o.data[He()];
                    if (Hg(a, r) && !Pg(o, i)) {
                        let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
                        null !== u && (n = ha(u, n || "")),
                        il(o, a, s, n, r)
                    } else
                        !function sI(e, t, n, r, o, i, s, a) {
                            o === L && (o = W);
                            let u = 0
                              , l = 0
                              , c = 0 < o.length ? o[0] : null
                              , d = 0 < i.length ? i[0] : null;
                            for (; null !== c || null !== d; ) {
                                const f = u < o.length ? o[u + 1] : void 0
                                  , h = l < i.length ? i[l + 1] : void 0;
                                let g, p = null;
                                c === d ? (u += 2,
                                l += 2,
                                f !== h && (p = d,
                                g = h)) : null === d || null !== c && c < d ? (u += 2,
                                p = c) : (l += 2,
                                p = d,
                                g = h),
                                null !== p && Lg(e, t, n, r, p, g, s, a),
                                c = u < o.length ? o[u] : null,
                                d = l < i.length ? i[l] : null
                            }
                        }(o, a, s, s[k], s[i + 1], s[i + 1] = function oI(e, t, n) {
                            if (null == n || "" === n)
                                return W;
                            const r = []
                              , o = un(n);
                            if (Array.isArray(o))
                                for (let i = 0; i < o.length; i++)
                                    e(r, o[i], !0);
                            else if ("object" == typeof o)
                                for (const i in o)
                                    o.hasOwnProperty(i) && e(r, i, o[i]);
                            else
                                "string" == typeof o && t(r, o);
                            return r
                        }(e, t, n), r, i)
                }
            }(iI, Pt, e, !0)
        }
        function Pt(e, t) {
            for (let n = function ZM(e) {
                return function Ng(e) {
                    Ee.key = 0,
                    Ee.keyEnd = 0,
                    Ee.value = 0,
                    Ee.valueEnd = 0,
                    Ee.textEnd = e.length
                }(e),
                Ag(e, Cr(e, 0, Ee.textEnd))
            }(t); n >= 0; n = Ag(t, n))
                rt(e, Sg(t), !0)
        }
        function Pg(e, t) {
            return t >= e.expandoStartIndex
        }
        function Rg(e, t, n, r) {
            const o = e.data;
            if (null === o[n + 1]) {
                const i = o[He()]
                  , s = Pg(e, n);
                Hg(i, r) && null === t && !s && (t = !1),
                t = function eI(e, t, n, r) {
                    const o = function Pa(e) {
                        const t = T.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t]
                    }(e);
                    let i = r ? t.residualClasses : t.residualStyles;
                    if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) && (n = yo(n = gl(null, e, t, n, r), t.attrs, r),
                        i = null);
                    else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                            if (n = gl(o, e, t, n, r),
                            null === i) {
                                let u = function tI(e, t, n) {
                                    const r = n ? t.classBindings : t.styleBindings;
                                    if (0 !== On(r))
                                        return e[cn(r)]
                                }(e, t, r);
                                void 0 !== u && Array.isArray(u) && (u = gl(null, e, t, u[1], r),
                                u = yo(u, t.attrs, r),
                                function nI(e, t, n, r) {
                                    e[cn(n ? t.classBindings : t.styleBindings)] = r
                                }(e, t, r, u))
                            } else
                                i = function rI(e, t, n) {
                                    let r;
                                    const o = t.directiveEnd;
                                    for (let i = 1 + t.directiveStylingLast; i < o; i++)
                                        r = yo(r, e[i].hostAttrs, n);
                                    return yo(r, t.attrs, n)
                                }(e, t, r)
                    }
                    return void 0 !== i && (r ? t.residualClasses = i : t.residualStyles = i),
                    n
                }(o, i, t, r),
                function GM(e, t, n, r, o, i) {
                    let s = i ? t.classBindings : t.styleBindings
                      , a = cn(s)
                      , u = On(s);
                    e[r] = n;
                    let c, l = !1;
                    if (Array.isArray(n) ? (c = n[1],
                    (null === c || nr(n, c) > 0) && (l = !0)) : c = n,
                    o)
                        if (0 !== u) {
                            const f = cn(e[a + 1]);
                            e[r + 1] = ss(f, a),
                            0 !== f && (e[f + 1] = hl(e[f + 1], r)),
                            e[a + 1] = function $M(e, t) {
                                return 131071 & e | t << 17
                            }(e[a + 1], r)
                        } else
                            e[r + 1] = ss(a, 0),
                            0 !== a && (e[a + 1] = hl(e[a + 1], r)),
                            a = r;
                    else
                        e[r + 1] = ss(u, 0),
                        0 === a ? a = r : e[u + 1] = hl(e[u + 1], r),
                        u = r;
                    l && (e[r + 1] = fl(e[r + 1])),
                    Ig(e, c, r, !0),
                    Ig(e, c, r, !1),
                    function zM(e, t, n, r, o) {
                        const i = o ? e.residualClasses : e.residualStyles;
                        null != i && "string" == typeof t && nr(i, t) >= 0 && (n[r + 1] = pl(n[r + 1]))
                    }(t, c, e, r, i),
                    s = ss(a, u),
                    i ? t.classBindings = s : t.styleBindings = s
                }(o, i, t, n, s, r)
            }
        }
        function gl(e, t, n, r, o) {
            let i = null;
            const s = n.directiveEnd;
            let a = n.directiveStylingLast;
            for (-1 === a ? a = n.directiveStart : a++; a < s && (i = t[a],
            r = yo(r, i.hostAttrs, o),
            i !== e); )
                a++;
            return null !== e && (n.directiveStylingLast = a),
            r
        }
        function yo(e, t, n) {
            const r = n ? 1 : 2;
            let o = -1;
            if (null !== t)
                for (let i = 0; i < t.length; i++) {
                    const s = t[i];
                    "number" == typeof s ? o = s : o === r && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                    rt(e, s, !!n || t[++i]))
                }
            return void 0 === e ? null : e
        }
        function iI(e, t, n) {
            const r = String(t);
            "" !== r && !r.includes(" ") && rt(e, r, n)
        }
        function Lg(e, t, n, r, o, i, s, a) {
            if (!(3 & t.type))
                return;
            const u = e.data
              , l = u[a + 1]
              , c = function UM(e) {
                return 1 == (1 & e)
            }(l) ? Vg(u, t, n, o, On(l), s) : void 0;
            ls(c) || (ls(i) || function jM(e) {
                return 2 == (2 & e)
            }(l) && (i = Vg(u, null, n, o, a, s)),
            function qE(e, t, n, r, o) {
                if (t)
                    o ? e.addClass(n, r) : e.removeClass(n, r);
                else {
                    let i = -1 === r.indexOf("-") ? void 0 : Ze.DashCase;
                    null == o ? e.removeStyle(n, r, i) : ("string" == typeof o && o.endsWith("!important") && (o = o.slice(0, -10),
                    i |= Ze.Important),
                    e.setStyle(n, r, o, i))
                }
            }(r, s, fi(He(), n), o, i))
        }
        function Vg(e, t, n, r, o, i) {
            const s = null === t;
            let a;
            for (; o > 0; ) {
                const u = e[o]
                  , l = Array.isArray(u)
                  , c = l ? u[1] : u
                  , d = null === c;
                let f = n[o + 1];
                f === L && (f = d ? W : void 0);
                let h = d ? qa(f, r) : c === r ? f : void 0;
                if (l && !ls(h) && (h = qa(u, r)),
                ls(h) && (a = h,
                s))
                    return a;
                const p = e[o + 1];
                o = s ? cn(p) : On(p)
            }
            if (null !== t) {
                let u = i ? t.residualClasses : t.residualStyles;
                null != u && (a = qa(u, r))
            }
            return a
        }
        function ls(e) {
            return void 0 !== e
        }
        function Hg(e, t) {
            return 0 != (e.flags & (t ? 8 : 16))
        }
        function te(e, t="") {
            const n = D()
              , r = G()
              , o = e + $
              , i = r.firstCreatePass ? cr(r, o, 1, t, null) : r.data[o]
              , s = Bg(r, n, i, t, e);
            n[o] = s,
            hi() && Fi(r, n, s, i),
            Tt(i, !1)
        }
        let Bg = (e,t,n,r,o)=>(an(!0),
        function Ti(e, t) {
            return e.createText(t)
        }(t[k], r));
        function Do(e) {
            return cs("", e, ""),
            Do
        }
        function cs(e, t, n) {
            const r = D()
              , o = fr(r, e, t, n);
            return o !== L && Yt(r, He(), o),
            cs
        }
        function ml(e, t, n, r, o) {
            const i = D()
              , s = hr(i, e, t, n, r, o);
            return s !== L && Yt(i, He(), s),
            ml
        }
        const wr = "en-US";
        let am = wr;
        function vl(e, t, n, r, o) {
            if (e = x(e),
            Array.isArray(e))
                for (let i = 0; i < e.length; i++)
                    vl(e[i], t, n, r, o);
            else {
                const i = G()
                  , s = D();
                let a = Sn(e) ? e : x(e.provide)
                  , u = Xh(e);
                const l = Ae()
                  , c = 1048575 & l.providerIndexes
                  , d = l.directiveStart
                  , f = l.providerIndexes >> 20;
                if (Sn(e) || !e.multi) {
                    const h = new Ur(u,o,_)
                      , p = Cl(a, t, o ? c : c + f, d);
                    -1 === p ? (Ua(_i(l, s), i, a),
                    _l(i, e, t.length),
                    t.push(a),
                    l.directiveStart++,
                    l.directiveEnd++,
                    o && (l.providerIndexes += 1048576),
                    n.push(h),
                    s.push(h)) : (n[p] = h,
                    s[p] = h)
                } else {
                    const h = Cl(a, t, c + f, d)
                      , p = Cl(a, t, c, c + f)
                      , y = p >= 0 && n[p];
                    if (o && !y || !o && !(h >= 0 && n[h])) {
                        Ua(_i(l, s), i, a);
                        const v = function SS(e, t, n, r, o) {
                            const i = new Ur(e,n,_);
                            return i.multi = [],
                            i.index = t,
                            i.componentProviders = 0,
                            Fm(i, o, r && !n),
                            i
                        }(o ? IS : MS, n.length, o, r, u);
                        !o && y && (n[p].providerFactory = v),
                        _l(i, e, t.length, 0),
                        t.push(a),
                        l.directiveStart++,
                        l.directiveEnd++,
                        o && (l.providerIndexes += 1048576),
                        n.push(v),
                        s.push(v)
                    } else
                        _l(i, e, h > -1 ? h : p, Fm(n[o ? p : h], u, !o && r));
                    !o && r && y && n[p].componentProviders++
                }
            }
        }
        function _l(e, t, n, r) {
            const o = Sn(t)
              , i = function bw(e) {
                return !!e.useClass
            }(t);
            if (o || i) {
                const u = (i ? x(t.useClass) : t).prototype.ngOnDestroy;
                if (u) {
                    const l = e.destroyHooks || (e.destroyHooks = []);
                    if (!o && t.multi) {
                        const c = l.indexOf(n);
                        -1 === c ? l.push(n, [r, u]) : l[c + 1].push(r, u)
                    } else
                        l.push(n, u)
                }
            }
        }
        function Fm(e, t, n) {
            return n && e.componentProviders++,
            e.multi.push(t) - 1
        }
        function Cl(e, t, n, r) {
            for (let o = n; o < r; o++)
                if (t[o] === e)
                    return o;
            return -1
        }
        function MS(e, t, n, r) {
            return El(this.multi, [])
        }
        function IS(e, t, n, r) {
            const o = this.multi;
            let i;
            if (this.providerFactory) {
                const s = this.providerFactory.componentProviders
                  , a = Mn(n, n[w], this.providerFactory.index, r);
                i = a.slice(0, s),
                El(o, i);
                for (let u = s; u < a.length; u++)
                    i.push(a[u])
            } else
                i = [],
                El(o, i);
            return i
        }
        function El(e, t) {
            for (let n = 0; n < e.length; n++)
                t.push((0,
                e[n])());
            return t
        }
        function ie(e, t=[]) {
            return n=>{
                n.providersResolver = (r,o)=>function bS(e, t, n) {
                    const r = G();
                    if (r.firstCreatePass) {
                        const o = ht(e);
                        vl(n, r.data, r.blueprint, o, !0),
                        vl(t, r.data, r.blueprint, o, !1)
                    }
                }(r, o ? o(e) : e, t)
            }
        }
        class br {
        }
        class AS {
        }
        class wl extends br {
            constructor(t, n, r) {
                super(),
                this._parent = n,
                this._bootstrapComponents = [],
                this.destroyCbs = [],
                this.componentFactoryResolver = new Up(this);
                const o = function et(e, t) {
                    const n = e[Rd] || null;
                    if (!n && !0 === t)
                        throw new Error(`Type ${ve(e)} does not have '\u0275mod' property.`);
                    return n
                }(t);
                this._bootstrapComponents = function Zt(e) {
                    return e instanceof Function ? e() : e
                }(o.bootstrap),
                this._r3Injector = wp(t, n, [{
                    provide: br,
                    useValue: this
                }, {
                    provide: zi,
                    useValue: this.componentFactoryResolver
                }, ...r], ve(t), new Set(["environment"])),
                this._r3Injector.resolveInjectorInitializers(),
                this.instance = this._r3Injector.get(t)
            }
            get injector() {
                return this._r3Injector
            }
            destroy() {
                const t = this._r3Injector;
                !t.destroyed && t.destroy(),
                this.destroyCbs.forEach(n=>n()),
                this.destroyCbs = null
            }
            onDestroy(t) {
                this.destroyCbs.push(t)
            }
        }
        class bl extends AS {
            constructor(t) {
                super(),
                this.moduleType = t
            }
            create(t) {
                return new wl(this.moduleType,t,[])
            }
        }
        function gs(e, t, n, r) {
            return function Bm(e, t, n, r, o, i) {
                const s = t + n;
                return Re(e, s, o) ? function Ft(e, t, n) {
                    return e[t] = n
                }(e, s + 1, i ? r.call(i, o) : r(o)) : function bo(e, t) {
                    const n = e[t];
                    return n === L ? void 0 : n
                }(e, s + 1)
            }(D(), function Ve() {
                const e = T.lFrame;
                let t = e.bindingRootIndex;
                return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                t
            }(), e, t, n, r)
        }
        function Il(e) {
            return t=>{
                setTimeout(e, void 0, t)
            }
        }
        const ke = class oA extends qo {
            constructor(t=!1) {
                super(),
                this.__isAsync = t
            }
            emit(t) {
                super.next(t)
            }
            subscribe(t, n, r) {
                let o = t
                  , i = n || (()=>null)
                  , s = r;
                if (t && "object" == typeof t) {
                    const u = t;
                    o = u.next?.bind(u),
                    i = u.error?.bind(u),
                    s = u.complete?.bind(u)
                }
                this.__isAsync && (i = Il(i),
                o && (o = Il(o)),
                s && (s = Il(s)));
                const a = super.subscribe({
                    next: o,
                    error: i,
                    complete: s
                });
                return t instanceof _t && t.add(a),
                a
            }
        }
        ;
        let Kt = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = uA,
            e
        }
        )();
        const sA = Kt
          , aA = class extends sA {
            constructor(t, n, r) {
                super(),
                this._declarationLView = t,
                this._declarationTContainer = n,
                this.elementRef = r
            }
            get ssrId() {
                return this._declarationTContainer.tView?.ssrId || null
            }
            createEmbeddedView(t, n) {
                return this.createEmbeddedViewImpl(t, n, null)
            }
            createEmbeddedViewImpl(t, n, r) {
                const s = this._declarationTContainer.tView
                  , a = Yi(this._declarationLView, s, t, 4096 & this._declarationLView[R] ? 4096 : 16, null, s.declTNode, null, null, null, n || null, r || null);
                a[Hr] = this._declarationLView[this._declarationTContainer.index];
                const l = this._declarationLView[Mt];
                return null !== l && (a[Mt] = l.createEmbeddedView(s)),
                Qu(s, a, t),
                new lo(a)
            }
        }
        ;
        function uA() {
            return function ms(e, t) {
                return 4 & e.type ? new aA(t,e,ur(e, t)) : null
            }(Ae(), D())
        }
        let Rt = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = gA,
            e
        }
        )();
        function gA() {
            return function Xm(e, t) {
                let n;
                const r = t[e.index];
                return We(r) ? n = r : (n = Fp(r, t, null, e),
                t[e.index] = n,
                Xi(t, n)),
                Km(n, t, e, r),
                new Zm(n,e,t)
            }(Ae(), D())
        }
        const mA = Rt
          , Zm = class extends mA {
            constructor(t, n, r) {
                super(),
                this._lContainer = t,
                this._hostTNode = n,
                this._hostLView = r
            }
            get element() {
                return ur(this._hostTNode, this._hostLView)
            }
            get injector() {
                return new Kn(this._hostTNode,this._hostLView)
            }
            get parentInjector() {
                const t = $a(this._hostTNode, this._hostLView);
                if (Rf(t)) {
                    const n = Di(t, this._hostLView)
                      , r = yi(t);
                    return new Kn(n[w].data[r + 8],n)
                }
                return new Kn(null,this._hostLView)
            }
            clear() {
                for (; this.length > 0; )
                    this.remove(this.length - 1)
            }
            get(t) {
                const n = Ym(this._lContainer);
                return null !== n && n[t] || null
            }
            get length() {
                return this._lContainer.length - Fe
            }
            createEmbeddedView(t, n, r) {
                let o, i;
                "number" == typeof r ? o = r : null != r && (o = r.index,
                i = r.injector);
                const a = t.createEmbeddedViewImpl(n || {}, i, null);
                return this.insertImpl(a, o, false),
                a
            }
            createComponent(t, n, r, o, i) {
                const s = t && !function zr(e) {
                    return "function" == typeof e
                }(t);
                let a;
                if (s)
                    a = n;
                else {
                    const g = n || {};
                    a = g.index,
                    r = g.injector,
                    o = g.projectableNodes,
                    i = g.environmentInjector || g.ngModuleRef
                }
                const u = s ? t : new co(Z(t))
                  , l = r || this.parentInjector;
                if (!i && null == u.ngModule) {
                    const y = (s ? l : this.parentInjector).get(An, null);
                    y && (i = y)
                }
                Z(u.componentType ?? {});
                const h = u.create(l, o, null, i);
                return this.insertImpl(h.hostView, a, false),
                h
            }
            insert(t, n) {
                return this.insertImpl(t, n, !1)
            }
            insertImpl(t, n, r) {
                const o = t._lView
                  , i = o[w];
                if (function pC(e) {
                    return We(e[ae])
                }(o)) {
                    const u = this.indexOf(t);
                    if (-1 !== u)
                        this.detach(u);
                    else {
                        const l = o[ae]
                          , c = new Zm(l,l[xe],l[ae]);
                        c.detach(c.indexOf(t))
                    }
                }
                const s = this._adjustIndex(n)
                  , a = this._lContainer;
                if (function HE(e, t, n, r) {
                    const o = Fe + r
                      , i = n.length;
                    r > 0 && (n[o - 1][ft] = t),
                    r < i - Fe ? (t[ft] = n[o],
                    qf(n, Fe + r, t)) : (n.push(t),
                    t[ft] = null),
                    t[ae] = n;
                    const s = t[Hr];
                    null !== s && n !== s && function BE(e, t) {
                        const n = e[Gn];
                        t[pe] !== t[ae][ae][pe] && (e[Kd] = !0),
                        null === n ? e[Gn] = [t] : n.push(t)
                    }(s, t);
                    const a = t[Mt];
                    null !== a && a.insertView(e),
                    t[R] |= 128
                }(i, o, a, s),
                !r) {
                    const u = du(s, a)
                      , l = o[k]
                      , c = xi(l, a[It]);
                    null !== c && function kE(e, t, n, r, o, i) {
                        r[_e] = o,
                        r[xe] = t,
                        Qr(e, r, n, 1, o, i)
                    }(i, a[xe], l, o, c, u)
                }
                return t.attachToViewContainerRef(),
                qf(Tl(a), s, t),
                t
            }
            move(t, n) {
                return this.insert(t, n)
            }
            indexOf(t) {
                const n = Ym(this._lContainer);
                return null !== n ? n.indexOf(t) : -1
            }
            remove(t) {
                const n = this._adjustIndex(t, -1)
                  , r = au(this._lContainer, n);
                r && (Ei(Tl(this._lContainer), n),
                vh(r[w], r))
            }
            detach(t) {
                const n = this._adjustIndex(t, -1)
                  , r = au(this._lContainer, n);
                return r && null != Ei(Tl(this._lContainer), n) ? new lo(r) : null
            }
            _adjustIndex(t, n=0) {
                return t ?? this.length + n
            }
        }
        ;
        function Ym(e) {
            return e[8]
        }
        function Tl(e) {
            return e[8] || (e[8] = [])
        }
        let Km = function Qm(e, t, n, r) {
            if (e[It])
                return;
            let o;
            o = 8 & n.type ? re(r) : function yA(e, t) {
                const n = e[k]
                  , r = n.createComment("")
                  , o = qe(t, e);
                return In(n, xi(n, o), r, function GE(e, t) {
                    return e.nextSibling(t)
                }(n, o), !1),
                r
            }(t, n),
            e[It] = o
        };
        const KA = new M("Application Initializer");
        let Hl = (()=>{
            class e {
                constructor() {
                    this.initialized = !1,
                    this.done = !1,
                    this.donePromise = new Promise((n,r)=>{
                        this.resolve = n,
                        this.reject = r
                    }
                    ),
                    this.appInits = q(KA, {
                        optional: !0
                    }) ?? []
                }
                runInitializers() {
                    if (this.initialized)
                        return;
                    const n = [];
                    for (const o of this.appInits) {
                        const i = o();
                        if (is(i))
                            n.push(i);
                        else if (hg(i)) {
                            const s = new Promise((a,u)=>{
                                i.subscribe({
                                    complete: a,
                                    error: u
                                })
                            }
                            );
                            n.push(s)
                        }
                    }
                    const r = ()=>{
                        this.done = !0,
                        this.resolve()
                    }
                    ;
                    Promise.all(n).then(()=>{
                        r()
                    }
                    ).catch(o=>{
                        this.reject(o)
                    }
                    ),
                    0 === n.length && r(),
                    this.initialized = !0
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        const Qt = new M("LocaleId",{
            providedIn: "root",
            factory: ()=>q(Qt, N.Optional | N.SkipSelf) || function JA() {
                return typeof $localize < "u" && $localize.locale || wr
            }()
        });
        let Bl = (()=>{
            class e {
                constructor() {
                    this.taskId = 0,
                    this.pendingTasks = new Set,
                    this.hasPendingTasks = new M0(!1)
                }
                add() {
                    this.hasPendingTasks.next(!0);
                    const n = this.taskId++;
                    return this.pendingTasks.add(n),
                    n
                }
                remove(n) {
                    this.pendingTasks.delete(n),
                    0 === this.pendingTasks.size && this.hasPendingTasks.next(!1)
                }
                ngOnDestroy() {
                    this.pendingTasks.clear(),
                    this.hasPendingTasks.next(!1)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        const oT = (()=>Promise.resolve(0))();
        function jl(e) {
            typeof Zone > "u" ? oT.then(()=>{
                e && e.apply(null, null)
            }
            ) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
        }
        function wy(...e) {}
        class we {
            constructor({enableLongStackTrace: t=!1, shouldCoalesceEventChangeDetection: n=!1, shouldCoalesceRunChangeDetection: r=!1}) {
                if (this.hasPendingMacrotasks = !1,
                this.hasPendingMicrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new ke(!1),
                this.onMicrotaskEmpty = new ke(!1),
                this.onStable = new ke(!1),
                this.onError = new ke(!1),
                typeof Zone > "u")
                    throw new C(908,!1);
                Zone.assertZonePatched();
                const o = this;
                o._nesting = 0,
                o._outer = o._inner = Zone.current,
                Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)),
                t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
                o.shouldCoalesceEventChangeDetection = !r && n,
                o.shouldCoalesceRunChangeDetection = r,
                o.lastRequestAnimationFrameId = -1,
                o.nativeRequestAnimationFrame = function iT() {
                    let e = ee.requestAnimationFrame
                      , t = ee.cancelAnimationFrame;
                    if (typeof Zone < "u" && e && t) {
                        const n = e[Zone.__symbol__("OriginalDelegate")];
                        n && (e = n);
                        const r = t[Zone.__symbol__("OriginalDelegate")];
                        r && (t = r)
                    }
                    return {
                        nativeRequestAnimationFrame: e,
                        nativeCancelAnimationFrame: t
                    }
                }().nativeRequestAnimationFrame,
                function uT(e) {
                    const t = ()=>{
                        !function aT(e) {
                            e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(ee, ()=>{
                                e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", ()=>{
                                    e.lastRequestAnimationFrameId = -1,
                                    Ul(e),
                                    e.isCheckStableRunning = !0,
                                    $l(e),
                                    e.isCheckStableRunning = !1
                                }
                                , void 0, ()=>{}
                                , ()=>{}
                                )),
                                e.fakeTopEventTask.invoke()
                            }
                            ),
                            Ul(e))
                        }(e)
                    }
                    ;
                    e._inner = e._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (n,r,o,i,s,a)=>{
                            try {
                                return by(e),
                                n.invokeTask(o, i, s, a)
                            } finally {
                                (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && t(),
                                My(e)
                            }
                        }
                        ,
                        onInvoke: (n,r,o,i,s,a,u)=>{
                            try {
                                return by(e),
                                n.invoke(o, i, s, a, u)
                            } finally {
                                e.shouldCoalesceRunChangeDetection && t(),
                                My(e)
                            }
                        }
                        ,
                        onHasTask: (n,r,o,i)=>{
                            n.hasTask(o, i),
                            r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask,
                            Ul(e),
                            $l(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                        }
                        ,
                        onHandleError: (n,r,o,i)=>(n.handleError(o, i),
                        e.runOutsideAngular(()=>e.onError.emit(i)),
                        !1)
                    })
                }(o)
            }
            static isInAngularZone() {
                return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!we.isInAngularZone())
                    throw new C(909,!1)
            }
            static assertNotInAngularZone() {
                if (we.isInAngularZone())
                    throw new C(909,!1)
            }
            run(t, n, r) {
                return this._inner.run(t, n, r)
            }
            runTask(t, n, r, o) {
                const i = this._inner
                  , s = i.scheduleEventTask("NgZoneEvent: " + o, t, sT, wy, wy);
                try {
                    return i.runTask(s, n, r)
                } finally {
                    i.cancelTask(s)
                }
            }
            runGuarded(t, n, r) {
                return this._inner.runGuarded(t, n, r)
            }
            runOutsideAngular(t) {
                return this._outer.run(t)
            }
        }
        const sT = {};
        function $l(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
                try {
                    e._nesting++,
                    e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--,
                    !e.hasPendingMicrotasks)
                        try {
                            e.runOutsideAngular(()=>e.onStable.emit(null))
                        } finally {
                            e.isStable = !0
                        }
                }
        }
        function Ul(e) {
            e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
        }
        function by(e) {
            e._nesting++,
            e.isStable && (e.isStable = !1,
            e.onUnstable.emit(null))
        }
        function My(e) {
            e._nesting--,
            $l(e)
        }
        class lT {
            constructor() {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new ke,
                this.onMicrotaskEmpty = new ke,
                this.onStable = new ke,
                this.onError = new ke
            }
            run(t, n, r) {
                return t.apply(n, r)
            }
            runGuarded(t, n, r) {
                return t.apply(n, r)
            }
            runOutsideAngular(t) {
                return t()
            }
            runTask(t, n, r, o) {
                return t.apply(n, r)
            }
        }
        const Iy = new M("",{
            providedIn: "root",
            factory: Sy
        });
        function Sy() {
            const e = q(we);
            let t = !0;
            return function d_(...e) {
                const t = Cd(e)
                  , n = function o_(e, t) {
                    return "number" == typeof ca(e) ? e.pop() : t
                }(e, 1 / 0)
                  , r = e;
                return r.length ? 1 === r.length ? Ct(r[0]) : function e_(e=1 / 0) {
                    return Zo(ia, e)
                }(n)(Yo(r, t)) : _d
            }(new Te(o=>{
                t = e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks,
                e.runOutsideAngular(()=>{
                    o.next(t),
                    o.complete()
                }
                )
            }
            ), new Te(o=>{
                let i;
                e.runOutsideAngular(()=>{
                    i = e.onStable.subscribe(()=>{
                        we.assertNotInAngularZone(),
                        jl(()=>{
                            !t && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks && (t = !0,
                            o.next(!0))
                        }
                        )
                    }
                    )
                }
                );
                const s = e.onUnstable.subscribe(()=>{
                    we.assertInAngularZone(),
                    t && (t = !1,
                    e.runOutsideAngular(()=>{
                        o.next(!1)
                    }
                    ))
                }
                );
                return ()=>{
                    i.unsubscribe(),
                    s.unsubscribe()
                }
            }
            ).pipe(Md()))
        }
        const Ay = new M("")
          , Ds = new M("");
        let Wl, Gl = (()=>{
            class e {
                constructor(n, r, o) {
                    this._ngZone = n,
                    this.registry = r,
                    this._pendingCount = 0,
                    this._isZoneStable = !0,
                    this._didWork = !1,
                    this._callbacks = [],
                    this.taskTrackingZone = null,
                    Wl || (function cT(e) {
                        Wl = e
                    }(o),
                    o.addToWindow(r)),
                    this._watchAngularEvents(),
                    n.run(()=>{
                        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                    }
                    )
                }
                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: ()=>{
                            this._didWork = !0,
                            this._isZoneStable = !1
                        }
                    }),
                    this._ngZone.runOutsideAngular(()=>{
                        this._ngZone.onStable.subscribe({
                            next: ()=>{
                                we.assertNotInAngularZone(),
                                jl(()=>{
                                    this._isZoneStable = !0,
                                    this._runCallbacksIfReady()
                                }
                                )
                            }
                        })
                    }
                    )
                }
                increasePendingRequestCount() {
                    return this._pendingCount += 1,
                    this._didWork = !0,
                    this._pendingCount
                }
                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1,
                    this._pendingCount < 0)
                        throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(),
                    this._pendingCount
                }
                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }
                _runCallbacksIfReady() {
                    if (this.isStable())
                        jl(()=>{
                            for (; 0 !== this._callbacks.length; ) {
                                let n = this._callbacks.pop();
                                clearTimeout(n.timeoutId),
                                n.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        }
                        );
                    else {
                        let n = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(r=>!r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId),
                        !1)),
                        this._didWork = !0
                    }
                }
                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n=>({
                        source: n.source,
                        creationLocation: n.creationLocation,
                        data: n.data
                    })) : []
                }
                addCallback(n, r, o) {
                    let i = -1;
                    r && r > 0 && (i = setTimeout(()=>{
                        this._callbacks = this._callbacks.filter(s=>s.timeoutId !== i),
                        n(this._didWork, this.getPendingTasks())
                    }
                    , r)),
                    this._callbacks.push({
                        doneCb: n,
                        timeoutId: i,
                        updateCb: o
                    })
                }
                whenStable(n, r, o) {
                    if (o && !this.taskTrackingZone)
                        throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(n, r, o),
                    this._runCallbacksIfReady()
                }
                getPendingRequestCount() {
                    return this._pendingCount
                }
                registerApplication(n) {
                    this.registry.registerApplication(n, this)
                }
                unregisterApplication(n) {
                    this.registry.unregisterApplication(n)
                }
                findProviders(n, r, o) {
                    return []
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(we),V(zl),V(Ds))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )(), zl = (()=>{
            class e {
                constructor() {
                    this._applications = new Map
                }
                registerApplication(n, r) {
                    this._applications.set(n, r)
                }
                unregisterApplication(n) {
                    this._applications.delete(n)
                }
                unregisterAllApplications() {
                    this._applications.clear()
                }
                getTestability(n) {
                    return this._applications.get(n) || null
                }
                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }
                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }
                findTestabilityInTree(n, r=!0) {
                    return Wl?.findTestabilityInTree(this, n, r) ?? null
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            }),
            e
        }
        )(), dn = null;
        const Ty = new M("AllowMultipleToken")
          , ql = new M("PlatformDestroyListeners")
          , Ny = new M("appBootstrapListener");
        function Oy(e, t, n=[]) {
            const r = `Platform: ${t}`
              , o = new M(r);
            return (i=[])=>{
                let s = Zl();
                if (!s || s.injector.get(Ty, !1)) {
                    const a = [...n, ...i, {
                        provide: o,
                        useValue: !0
                    }];
                    e ? e(a) : function hT(e) {
                        if (dn && !dn.get(Ty, !1))
                            throw new C(400,!1);
                        (function xy() {
                            !function nC(e) {
                                rf = e
                            }(()=>{
                                throw new C(600,!1)
                            }
                            )
                        }
                        )(),
                        dn = e;
                        const t = e.get(Ry);
                        (function Fy(e) {
                            e.get(Kh, null)?.forEach(n=>n())
                        }
                        )(e)
                    }(function Py(e=[], t) {
                        return ln.create({
                            name: t,
                            providers: [{
                                provide: Mu,
                                useValue: "platform"
                            }, {
                                provide: ql,
                                useValue: new Set([()=>dn = null])
                            }, ...e]
                        })
                    }(a, r))
                }
                return function gT(e) {
                    const t = Zl();
                    if (!t)
                        throw new C(401,!1);
                    return t
                }()
            }
        }
        function Zl() {
            return dn?.get(Ry) ?? null
        }
        let Ry = (()=>{
            class e {
                constructor(n) {
                    this._injector = n,
                    this._modules = [],
                    this._destroyListeners = [],
                    this._destroyed = !1
                }
                bootstrapModuleFactory(n, r) {
                    const o = function mT(e="zone.js", t) {
                        return "noop" === e ? new lT : "zone.js" === e ? new we(t) : e
                    }(r?.ngZone, function ky(e) {
                        return {
                            enableLongStackTrace: !1,
                            shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                            shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
                        }
                    }({
                        eventCoalescing: r?.ngZoneEventCoalescing,
                        runCoalescing: r?.ngZoneRunCoalescing
                    }));
                    return o.run(()=>{
                        const i = function NS(e, t, n) {
                            return new wl(e,t,n)
                        }(n.moduleType, this.injector, function jy(e) {
                            return [{
                                provide: we,
                                useFactory: e
                            }, {
                                provide: Li,
                                multi: !0,
                                useFactory: ()=>{
                                    const t = q(DT, {
                                        optional: !0
                                    });
                                    return ()=>t.initialize()
                                }
                            }, {
                                provide: By,
                                useFactory: yT
                            }, {
                                provide: Iy,
                                useFactory: Sy
                            }]
                        }(()=>o))
                          , s = i.injector.get(xn, null);
                        return o.runOutsideAngular(()=>{
                            const a = o.onError.subscribe({
                                next: u=>{
                                    s.handleError(u)
                                }
                            });
                            i.onDestroy(()=>{
                                vs(this._modules, i),
                                a.unsubscribe()
                            }
                            )
                        }
                        ),
                        function Ly(e, t, n) {
                            try {
                                const r = n();
                                return is(r) ? r.catch(o=>{
                                    throw t.runOutsideAngular(()=>e.handleError(o)),
                                    o
                                }
                                ) : r
                            } catch (r) {
                                throw t.runOutsideAngular(()=>e.handleError(r)),
                                r
                            }
                        }(s, o, ()=>{
                            const a = i.injector.get(Hl);
                            return a.runInitializers(),
                            a.donePromise.then(()=>(function um(e) {
                                st(e, "Expected localeId to be defined"),
                                "string" == typeof e && (am = e.toLowerCase().replace(/_/g, "-"))
                            }(i.injector.get(Qt, wr) || wr),
                            this._moduleDoBootstrap(i),
                            i))
                        }
                        )
                    }
                    )
                }
                bootstrapModule(n, r=[]) {
                    const o = Vy({}, r);
                    return function dT(e, t, n) {
                        const r = new bl(n);
                        return Promise.resolve(r)
                    }(0, 0, n).then(i=>this.bootstrapModuleFactory(i, o))
                }
                _moduleDoBootstrap(n) {
                    const r = n.injector.get(So);
                    if (n._bootstrapComponents.length > 0)
                        n._bootstrapComponents.forEach(o=>r.bootstrap(o));
                    else {
                        if (!n.instance.ngDoBootstrap)
                            throw new C(-403,!1);
                        n.instance.ngDoBootstrap(r)
                    }
                    this._modules.push(n)
                }
                onDestroy(n) {
                    this._destroyListeners.push(n)
                }
                get injector() {
                    return this._injector
                }
                destroy() {
                    if (this._destroyed)
                        throw new C(404,!1);
                    this._modules.slice().forEach(r=>r.destroy()),
                    this._destroyListeners.forEach(r=>r());
                    const n = this._injector.get(ql, null);
                    n && (n.forEach(r=>r()),
                    n.clear()),
                    this._destroyed = !0
                }
                get destroyed() {
                    return this._destroyed
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(ln))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            }),
            e
        }
        )();
        function Vy(e, t) {
            return Array.isArray(t) ? t.reduce(Vy, e) : {
                ...e,
                ...t
            }
        }
        let So = (()=>{
            class e {
                constructor() {
                    this._bootstrapListeners = [],
                    this._runningTick = !1,
                    this._destroyed = !1,
                    this._destroyListeners = [],
                    this._views = [],
                    this.internalErrorHandler = q(By),
                    this.zoneIsStable = q(Iy),
                    this.componentTypes = [],
                    this.components = [],
                    this.isStable = q(Bl).hasPendingTasks.pipe(Id(n=>n ? da(!1) : this.zoneIsStable), function f_(e, t=ia) {
                        return e = e ?? h_,
                        Vt((n,r)=>{
                            let o, i = !0;
                            n.subscribe(Ht(r, s=>{
                                const a = t(s);
                                (i || !e(o, a)) && (i = !1,
                                o = a,
                                r.next(s))
                            }
                            ))
                        }
                        )
                    }(), Md()),
                    this._injector = q(An)
                }
                get destroyed() {
                    return this._destroyed
                }
                get injector() {
                    return this._injector
                }
                bootstrap(n, r) {
                    const o = n instanceof op;
                    if (!this._injector.get(Hl).done)
                        throw !o && function kr(e) {
                            const t = Z(e) || Ne(e) || ze(e);
                            return null !== t && t.standalone
                        }(n),
                        new C(405,!1);
                    let s;
                    s = o ? n : this._injector.get(zi).resolveComponentFactory(n),
                    this.componentTypes.push(s.componentType);
                    const a = function fT(e) {
                        return e.isBoundToModule
                    }(s) ? void 0 : this._injector.get(br)
                      , l = s.create(ln.NULL, [], r || s.selector, a)
                      , c = l.location.nativeElement
                      , d = l.injector.get(Ay, null);
                    return d?.registerApplication(c),
                    l.onDestroy(()=>{
                        this.detachView(l.hostView),
                        vs(this.components, l),
                        d?.unregisterApplication(c)
                    }
                    ),
                    this._loadComponent(l),
                    l
                }
                tick() {
                    if (this._runningTick)
                        throw new C(101,!1);
                    try {
                        this._runningTick = !0;
                        for (let n of this._views)
                            n.detectChanges()
                    } catch (n) {
                        this.internalErrorHandler(n)
                    } finally {
                        this._runningTick = !1
                    }
                }
                attachView(n) {
                    const r = n;
                    this._views.push(r),
                    r.attachToAppRef(this)
                }
                detachView(n) {
                    const r = n;
                    vs(this._views, r),
                    r.detachFromAppRef()
                }
                _loadComponent(n) {
                    this.attachView(n.hostView),
                    this.tick(),
                    this.components.push(n);
                    const r = this._injector.get(Ny, []);
                    r.push(...this._bootstrapListeners),
                    r.forEach(o=>o(n))
                }
                ngOnDestroy() {
                    if (!this._destroyed)
                        try {
                            this._destroyListeners.forEach(n=>n()),
                            this._views.slice().forEach(n=>n.destroy())
                        } finally {
                            this._destroyed = !0,
                            this._views = [],
                            this._bootstrapListeners = [],
                            this._destroyListeners = []
                        }
                }
                onDestroy(n) {
                    return this._destroyListeners.push(n),
                    ()=>vs(this._destroyListeners, n)
                }
                destroy() {
                    if (this._destroyed)
                        throw new C(406,!1);
                    const n = this._injector;
                    n.destroy && !n.destroyed && n.destroy()
                }
                get viewCount() {
                    return this._views.length
                }
                warnIfDestroyed() {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        function vs(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }
        const By = new M("",{
            providedIn: "root",
            factory: ()=>q(xn).handleError.bind(void 0)
        });
        function yT() {
            const e = q(we)
              , t = q(xn);
            return n=>e.runOutsideAngular(()=>t.handleError(n))
        }
        let DT = (()=>{
            class e {
                constructor() {
                    this.zone = q(we),
                    this.applicationRef = q(So)
                }
                initialize() {
                    this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                        next: ()=>{
                            this.zone.run(()=>{
                                this.applicationRef.tick()
                            }
                            )
                        }
                    }))
                }
                ngOnDestroy() {
                    this._onMicrotaskEmptySubscription?.unsubscribe()
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        class Wy {
            constructor() {}
            supports(t) {
                return es(t)
            }
            create(t) {
                return new ST(t)
            }
        }
        const IT = (e,t)=>t;
        class ST {
            constructor(t) {
                this.length = 0,
                this._linkedRecords = null,
                this._unlinkedRecords = null,
                this._previousItHead = null,
                this._itHead = null,
                this._itTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._movesHead = null,
                this._movesTail = null,
                this._removalsHead = null,
                this._removalsTail = null,
                this._identityChangesHead = null,
                this._identityChangesTail = null,
                this._trackByFn = t || IT
            }
            forEachItem(t) {
                let n;
                for (n = this._itHead; null !== n; n = n._next)
                    t(n)
            }
            forEachOperation(t) {
                let n = this._itHead
                  , r = this._removalsHead
                  , o = 0
                  , i = null;
                for (; n || r; ) {
                    const s = !r || n && n.currentIndex < Zy(r, o, i) ? n : r
                      , a = Zy(s, o, i)
                      , u = s.currentIndex;
                    if (s === r)
                        o--,
                        r = r._nextRemoved;
                    else if (n = n._next,
                    null == s.previousIndex)
                        o++;
                    else {
                        i || (i = []);
                        const l = a - o
                          , c = u - o;
                        if (l != c) {
                            for (let f = 0; f < l; f++) {
                                const h = f < i.length ? i[f] : i[f] = 0
                                  , p = h + f;
                                c <= p && p < l && (i[f] = h + 1)
                            }
                            i[s.previousIndex] = c - l
                        }
                    }
                    a !== u && t(s, a, u)
                }
            }
            forEachPreviousItem(t) {
                let n;
                for (n = this._previousItHead; null !== n; n = n._nextPrevious)
                    t(n)
            }
            forEachAddedItem(t) {
                let n;
                for (n = this._additionsHead; null !== n; n = n._nextAdded)
                    t(n)
            }
            forEachMovedItem(t) {
                let n;
                for (n = this._movesHead; null !== n; n = n._nextMoved)
                    t(n)
            }
            forEachRemovedItem(t) {
                let n;
                for (n = this._removalsHead; null !== n; n = n._nextRemoved)
                    t(n)
            }
            forEachIdentityChange(t) {
                let n;
                for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange)
                    t(n)
            }
            diff(t) {
                if (null == t && (t = []),
                !es(t))
                    throw new C(900,!1);
                return this.check(t) ? this : null
            }
            onDestroy() {}
            check(t) {
                this._reset();
                let o, i, s, n = this._itHead, r = !1;
                if (Array.isArray(t)) {
                    this.length = t.length;
                    for (let a = 0; a < this.length; a++)
                        i = t[a],
                        s = this._trackByFn(a, i),
                        null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                        Object.is(n.item, i) || this._addIdentityChange(n, i)) : (n = this._mismatch(n, i, s, a),
                        r = !0),
                        n = n._next
                } else
                    o = 0,
                    function lM(e, t) {
                        if (Array.isArray(e))
                            for (let n = 0; n < e.length; n++)
                                t(e[n]);
                        else {
                            const n = e[Symbol.iterator]();
                            let r;
                            for (; !(r = n.next()).done; )
                                t(r.value)
                        }
                    }(t, a=>{
                        s = this._trackByFn(o, a),
                        null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                        Object.is(n.item, a) || this._addIdentityChange(n, a)) : (n = this._mismatch(n, a, s, o),
                        r = !0),
                        n = n._next,
                        o++
                    }
                    ),
                    this.length = o;
                return this._truncate(n),
                this.collection = t,
                this.isDirty
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }
            _reset() {
                if (this.isDirty) {
                    let t;
                    for (t = this._previousItHead = this._itHead; null !== t; t = t._next)
                        t._nextPrevious = t._next;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded)
                        t.previousIndex = t.currentIndex;
                    for (this._additionsHead = this._additionsTail = null,
                    t = this._movesHead; null !== t; t = t._nextMoved)
                        t.previousIndex = t.currentIndex;
                    this._movesHead = this._movesTail = null,
                    this._removalsHead = this._removalsTail = null,
                    this._identityChangesHead = this._identityChangesTail = null
                }
            }
            _mismatch(t, n, r, o) {
                let i;
                return null === t ? i = this._itTail : (i = t._prev,
                this._remove(t)),
                null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(r, o)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o)) : t = this._addAfter(new AT(n,r), i, o),
                t
            }
            _verifyReinsertion(t, n, r, o) {
                let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
                return null !== i ? t = this._reinsertAfter(i, t._prev, o) : t.currentIndex != o && (t.currentIndex = o,
                this._addToMoves(t, o)),
                t
            }
            _truncate(t) {
                for (; null !== t; ) {
                    const n = t._next;
                    this._addToRemovals(this._unlink(t)),
                    t = n
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }
            _reinsertAfter(t, n, r) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
                const o = t._prevRemoved
                  , i = t._nextRemoved;
                return null === o ? this._removalsHead = i : o._nextRemoved = i,
                null === i ? this._removalsTail = o : i._prevRemoved = o,
                this._insertAfter(t, n, r),
                this._addToMoves(t, r),
                t
            }
            _moveAfter(t, n, r) {
                return this._unlink(t),
                this._insertAfter(t, n, r),
                this._addToMoves(t, r),
                t
            }
            _addAfter(t, n, r) {
                return this._insertAfter(t, n, r),
                this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t,
                t
            }
            _insertAfter(t, n, r) {
                const o = null === n ? this._itHead : n._next;
                return t._next = o,
                t._prev = n,
                null === o ? this._itTail = t : o._prev = t,
                null === n ? this._itHead = t : n._next = t,
                null === this._linkedRecords && (this._linkedRecords = new qy),
                this._linkedRecords.put(t),
                t.currentIndex = r,
                t
            }
            _remove(t) {
                return this._addToRemovals(this._unlink(t))
            }
            _unlink(t) {
                null !== this._linkedRecords && this._linkedRecords.remove(t);
                const n = t._prev
                  , r = t._next;
                return null === n ? this._itHead = r : n._next = r,
                null === r ? this._itTail = n : r._prev = n,
                t
            }
            _addToMoves(t, n) {
                return t.previousIndex === n || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t),
                t
            }
            _addToRemovals(t) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new qy),
                this._unlinkedRecords.put(t),
                t.currentIndex = null,
                t._nextRemoved = null,
                null === this._removalsTail ? (this._removalsTail = this._removalsHead = t,
                t._prevRemoved = null) : (t._prevRemoved = this._removalsTail,
                this._removalsTail = this._removalsTail._nextRemoved = t),
                t
            }
            _addIdentityChange(t, n) {
                return t.item = n,
                this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t,
                t
            }
        }
        class AT {
            constructor(t, n) {
                this.item = t,
                this.trackById = n,
                this.currentIndex = null,
                this.previousIndex = null,
                this._nextPrevious = null,
                this._prev = null,
                this._next = null,
                this._prevDup = null,
                this._nextDup = null,
                this._prevRemoved = null,
                this._nextRemoved = null,
                this._nextAdded = null,
                this._nextMoved = null,
                this._nextIdentityChange = null
            }
        }
        class TT {
            constructor() {
                this._head = null,
                this._tail = null
            }
            add(t) {
                null === this._head ? (this._head = this._tail = t,
                t._nextDup = null,
                t._prevDup = null) : (this._tail._nextDup = t,
                t._prevDup = this._tail,
                t._nextDup = null,
                this._tail = t)
            }
            get(t, n) {
                let r;
                for (r = this._head; null !== r; r = r._nextDup)
                    if ((null === n || n <= r.currentIndex) && Object.is(r.trackById, t))
                        return r;
                return null
            }
            remove(t) {
                const n = t._prevDup
                  , r = t._nextDup;
                return null === n ? this._head = r : n._nextDup = r,
                null === r ? this._tail = n : r._prevDup = n,
                null === this._head
            }
        }
        class qy {
            constructor() {
                this.map = new Map
            }
            put(t) {
                const n = t.trackById;
                let r = this.map.get(n);
                r || (r = new TT,
                this.map.set(n, r)),
                r.add(t)
            }
            get(t, n) {
                const o = this.map.get(t);
                return o ? o.get(t, n) : null
            }
            remove(t) {
                const n = t.trackById;
                return this.map.get(n).remove(t) && this.map.delete(n),
                t
            }
            get isEmpty() {
                return 0 === this.map.size
            }
            clear() {
                this.map.clear()
            }
        }
        function Zy(e, t, n) {
            const r = e.previousIndex;
            if (null === r)
                return r;
            let o = 0;
            return n && r < n.length && (o = n[r]),
            r + t + o
        }
        function Xy() {
            return new Es([new Wy])
        }
        let Es = (()=>{
            class e {
                constructor(n) {
                    this.factories = n
                }
                static create(n, r) {
                    if (null != r) {
                        const o = r.factories.slice();
                        n = n.concat(o)
                    }
                    return new e(n)
                }
                static extend(n) {
                    return {
                        provide: e,
                        useFactory: r=>e.create(n, r || Xy()),
                        deps: [[e, new Xa, new Ya]]
                    }
                }
                find(n) {
                    const r = this.factories.find(o=>o.supports(n));
                    if (null != r)
                        return r;
                    throw new C(901,!1)
                }
            }
            return e.\u0275prov = z({
                token: e,
                providedIn: "root",
                factory: Xy
            }),
            e
        }
        )();
        const PT = Oy(null, "core", []);
        let RT = (()=>{
            class e {
                constructor(n) {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(So))
            }
            ,
            e.\u0275mod = $t({
                type: e
            }),
            e.\u0275inj = Et({}),
            e
        }
        )()
          , nc = null;
        function To() {
            return nc
        }
        class WT {
        }
        const fn = new M("DocumentToken");
        function fD(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
                const r = n.indexOf("=")
                  , [o,i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
                if (o.trim() === t)
                    return decodeURIComponent(i)
            }
            return null
        }
        class ON {
            constructor(t, n, r, o) {
                this.$implicit = t,
                this.ngForOf = n,
                this.index = r,
                this.count = o
            }
            get first() {
                return 0 === this.index
            }
            get last() {
                return this.index === this.count - 1
            }
            get even() {
                return this.index % 2 == 0
            }
            get odd() {
                return !this.even
            }
        }
        let gD = (()=>{
            class e {
                set ngForOf(n) {
                    this._ngForOf = n,
                    this._ngForOfDirty = !0
                }
                set ngForTrackBy(n) {
                    this._trackByFn = n
                }
                get ngForTrackBy() {
                    return this._trackByFn
                }
                constructor(n, r, o) {
                    this._viewContainer = n,
                    this._template = r,
                    this._differs = o,
                    this._ngForOf = null,
                    this._ngForOfDirty = !0,
                    this._differ = null
                }
                set ngForTemplate(n) {
                    n && (this._template = n)
                }
                ngDoCheck() {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const n = this._ngForOf;
                        !this._differ && n && (this._differ = this._differs.find(n).create(this.ngForTrackBy))
                    }
                    if (this._differ) {
                        const n = this._differ.diff(this._ngForOf);
                        n && this._applyChanges(n)
                    }
                }
                _applyChanges(n) {
                    const r = this._viewContainer;
                    n.forEachOperation((o,i,s)=>{
                        if (null == o.previousIndex)
                            r.createEmbeddedView(this._template, new ON(o.item,this._ngForOf,-1,-1), null === s ? void 0 : s);
                        else if (null == s)
                            r.remove(null === i ? void 0 : i);
                        else if (null !== i) {
                            const a = r.get(i);
                            r.move(a, s),
                            mD(a, o)
                        }
                    }
                    );
                    for (let o = 0, i = r.length; o < i; o++) {
                        const a = r.get(o).context;
                        a.index = o,
                        a.count = i,
                        a.ngForOf = this._ngForOf
                    }
                    n.forEachIdentityChange(o=>{
                        mD(r.get(o.currentIndex), o)
                    }
                    )
                }
                static ngTemplateContextGuard(n, r) {
                    return !0
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(_(Rt),_(Kt),_(Es))
            }
            ,
            e.\u0275dir = P({
                type: e,
                selectors: [["", "ngFor", "", "ngForOf", ""]],
                inputs: {
                    ngForOf: "ngForOf",
                    ngForTrackBy: "ngForTrackBy",
                    ngForTemplate: "ngForTemplate"
                },
                standalone: !0
            }),
            e
        }
        )();
        function mD(e, t) {
            e.context.$implicit = t.item
        }
        let s1 = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275mod = $t({
                type: e
            }),
            e.\u0275inj = Et({}),
            e
        }
        )();
        function CD(e) {
            return "server" === e
        }
        class wD {
        }
        class O1 extends WT {
            constructor() {
                super(...arguments),
                this.supportsDOMEvents = !0
            }
        }
        class vc extends O1 {
            static makeCurrent() {
                !function zT(e) {
                    nc || (nc = e)
                }(new vc)
            }
            onAndCancel(t, n, r) {
                return t.addEventListener(n, r),
                ()=>{
                    t.removeEventListener(n, r)
                }
            }
            dispatchEvent(t, n) {
                t.dispatchEvent(n)
            }
            remove(t) {
                t.parentNode && t.parentNode.removeChild(t)
            }
            createElement(t, n) {
                return (n = n || this.getDefaultDocument()).createElement(t)
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            isElementNode(t) {
                return t.nodeType === Node.ELEMENT_NODE
            }
            isShadowRoot(t) {
                return t instanceof DocumentFragment
            }
            getGlobalEventTarget(t, n) {
                return "window" === n ? window : "document" === n ? t : "body" === n ? t.body : null
            }
            getBaseHref(t) {
                const n = function P1() {
                    return Oo = Oo || document.querySelector("base"),
                    Oo ? Oo.getAttribute("href") : null
                }();
                return null == n ? null : function R1(e) {
                    Rs = Rs || document.createElement("a"),
                    Rs.setAttribute("href", e);
                    const t = Rs.pathname;
                    return "/" === t.charAt(0) ? t : `/${t}`
                }(n)
            }
            resetBaseElement() {
                Oo = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            getCookie(t) {
                return fD(document.cookie, t)
            }
        }
        let Rs, Oo = null, L1 = (()=>{
            class e {
                build() {
                    return new XMLHttpRequest
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const _c = new M("EventManagerPlugins");
        let AD = (()=>{
            class e {
                constructor(n, r) {
                    this._zone = r,
                    this._eventNameToPlugin = new Map,
                    n.forEach(o=>{
                        o.manager = this
                    }
                    ),
                    this._plugins = n.slice().reverse()
                }
                addEventListener(n, r, o) {
                    return this._findPluginFor(r).addEventListener(n, r, o)
                }
                getZone() {
                    return this._zone
                }
                _findPluginFor(n) {
                    let r = this._eventNameToPlugin.get(n);
                    if (r)
                        return r;
                    if (r = this._plugins.find(i=>i.supports(n)),
                    !r)
                        throw new C(5101,!1);
                    return this._eventNameToPlugin.set(n, r),
                    r
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(_c),V(we))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        class TD {
            constructor(t) {
                this._doc = t
            }
        }
        const Cc = "ng-app-id";
        let ND = (()=>{
            class e {
                constructor(n, r, o, i={}) {
                    this.doc = n,
                    this.appId = r,
                    this.nonce = o,
                    this.platformId = i,
                    this.styleRef = new Map,
                    this.hostNodes = new Set,
                    this.styleNodesInDOM = this.collectServerRenderedStyles(),
                    this.platformIsServer = CD(i),
                    this.resetHostNodes()
                }
                addStyles(n) {
                    for (const r of n)
                        1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
                }
                removeStyles(n) {
                    for (const r of n)
                        this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r)
                }
                ngOnDestroy() {
                    const n = this.styleNodesInDOM;
                    n && (n.forEach(r=>r.remove()),
                    n.clear());
                    for (const r of this.getAllStyles())
                        this.onStyleRemoved(r);
                    this.resetHostNodes()
                }
                addHost(n) {
                    this.hostNodes.add(n);
                    for (const r of this.getAllStyles())
                        this.addStyleToHost(n, r)
                }
                removeHost(n) {
                    this.hostNodes.delete(n)
                }
                getAllStyles() {
                    return this.styleRef.keys()
                }
                onStyleAdded(n) {
                    for (const r of this.hostNodes)
                        this.addStyleToHost(r, n)
                }
                onStyleRemoved(n) {
                    const r = this.styleRef;
                    r.get(n)?.elements?.forEach(o=>o.remove()),
                    r.delete(n)
                }
                collectServerRenderedStyles() {
                    const n = this.doc.head?.querySelectorAll(`style[${Cc}="${this.appId}"]`);
                    if (n?.length) {
                        const r = new Map;
                        return n.forEach(o=>{
                            null != o.textContent && r.set(o.textContent, o)
                        }
                        ),
                        r
                    }
                    return null
                }
                changeUsageCount(n, r) {
                    const o = this.styleRef;
                    if (o.has(n)) {
                        const i = o.get(n);
                        return i.usage += r,
                        i.usage
                    }
                    return o.set(n, {
                        usage: r,
                        elements: []
                    }),
                    r
                }
                getStyleElement(n, r) {
                    const o = this.styleNodesInDOM
                      , i = o?.get(r);
                    if (i?.parentNode === n)
                        return o.delete(r),
                        i.removeAttribute(Cc),
                        i;
                    {
                        const s = this.doc.createElement("style");
                        return this.nonce && s.setAttribute("nonce", this.nonce),
                        s.textContent = r,
                        this.platformIsServer && s.setAttribute(Cc, this.appId),
                        s
                    }
                }
                addStyleToHost(n, r) {
                    const o = this.getStyleElement(n, r);
                    n.appendChild(o);
                    const i = this.styleRef
                      , s = i.get(r)?.elements;
                    s ? s.push(o) : i.set(r, {
                        elements: [o],
                        usage: 1
                    })
                }
                resetHostNodes() {
                    const n = this.hostNodes;
                    n.clear(),
                    n.add(this.doc.head)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(fn),V(Bi),V(Qh, 8),V(Tn))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const Ec = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/MathML/"
        }
          , wc = /%COMP%/g
          , j1 = new M("RemoveStylesOnCompDestory",{
            providedIn: "root",
            factory: ()=>!1
        });
        function FD(e, t) {
            return t.map(n=>n.replace(wc, e))
        }
        let OD = (()=>{
            class e {
                constructor(n, r, o, i, s, a, u, l=null) {
                    this.eventManager = n,
                    this.sharedStylesHost = r,
                    this.appId = o,
                    this.removeStylesOnCompDestory = i,
                    this.doc = s,
                    this.platformId = a,
                    this.ngZone = u,
                    this.nonce = l,
                    this.rendererByCompId = new Map,
                    this.platformIsServer = CD(a),
                    this.defaultRenderer = new bc(n,s,u,this.platformIsServer)
                }
                createRenderer(n, r) {
                    if (!n || !r)
                        return this.defaultRenderer;
                    this.platformIsServer && r.encapsulation === Je.ShadowDom && (r = {
                        ...r,
                        encapsulation: Je.Emulated
                    });
                    const o = this.getOrCreateRenderer(n, r);
                    return o instanceof RD ? o.applyToHost(n) : o instanceof Mc && o.applyStyles(),
                    o
                }
                getOrCreateRenderer(n, r) {
                    const o = this.rendererByCompId;
                    let i = o.get(r.id);
                    if (!i) {
                        const s = this.doc
                          , a = this.ngZone
                          , u = this.eventManager
                          , l = this.sharedStylesHost
                          , c = this.removeStylesOnCompDestory
                          , d = this.platformIsServer;
                        switch (r.encapsulation) {
                        case Je.Emulated:
                            i = new RD(u,l,r,this.appId,c,s,a,d);
                            break;
                        case Je.ShadowDom:
                            return new z1(u,l,n,r,s,a,this.nonce,d);
                        default:
                            i = new Mc(u,l,r,c,s,a,d)
                        }
                        i.onDestroy = ()=>o.delete(r.id),
                        o.set(r.id, i)
                    }
                    return i
                }
                ngOnDestroy() {
                    this.rendererByCompId.clear()
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(AD),V(ND),V(Bi),V(j1),V(fn),V(Tn),V(we),V(Qh))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        class bc {
            constructor(t, n, r, o) {
                this.eventManager = t,
                this.doc = n,
                this.ngZone = r,
                this.platformIsServer = o,
                this.data = Object.create(null),
                this.destroyNode = null
            }
            destroy() {}
            createElement(t, n) {
                return n ? this.doc.createElementNS(Ec[n] || n, t) : this.doc.createElement(t)
            }
            createComment(t) {
                return this.doc.createComment(t)
            }
            createText(t) {
                return this.doc.createTextNode(t)
            }
            appendChild(t, n) {
                (PD(t) ? t.content : t).appendChild(n)
            }
            insertBefore(t, n, r) {
                t && (PD(t) ? t.content : t).insertBefore(n, r)
            }
            removeChild(t, n) {
                t && t.removeChild(n)
            }
            selectRootElement(t, n) {
                let r = "string" == typeof t ? this.doc.querySelector(t) : t;
                if (!r)
                    throw new C(5104,!1);
                return n || (r.textContent = ""),
                r
            }
            parentNode(t) {
                return t.parentNode
            }
            nextSibling(t) {
                return t.nextSibling
            }
            setAttribute(t, n, r, o) {
                if (o) {
                    n = o + ":" + n;
                    const i = Ec[o];
                    i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
                } else
                    t.setAttribute(n, r)
            }
            removeAttribute(t, n, r) {
                if (r) {
                    const o = Ec[r];
                    o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
                } else
                    t.removeAttribute(n)
            }
            addClass(t, n) {
                t.classList.add(n)
            }
            removeClass(t, n) {
                t.classList.remove(n)
            }
            setStyle(t, n, r, o) {
                o & (Ze.DashCase | Ze.Important) ? t.style.setProperty(n, r, o & Ze.Important ? "important" : "") : t.style[n] = r
            }
            removeStyle(t, n, r) {
                r & Ze.DashCase ? t.style.removeProperty(n) : t.style[n] = ""
            }
            setProperty(t, n, r) {
                t[n] = r
            }
            setValue(t, n) {
                t.nodeValue = n
            }
            listen(t, n, r) {
                if ("string" == typeof t && !(t = To().getGlobalEventTarget(this.doc, t)))
                    throw new Error(`Unsupported event target ${t} for event ${n}`);
                return this.eventManager.addEventListener(t, n, this.decoratePreventDefault(r))
            }
            decoratePreventDefault(t) {
                return n=>{
                    if ("__ngUnwrap__" === n)
                        return t;
                    !1 === (this.platformIsServer ? this.ngZone.runGuarded(()=>t(n)) : t(n)) && n.preventDefault()
                }
            }
        }
        function PD(e) {
            return "TEMPLATE" === e.tagName && void 0 !== e.content
        }
        class z1 extends bc {
            constructor(t, n, r, o, i, s, a, u) {
                super(t, i, s, u),
                this.sharedStylesHost = n,
                this.hostEl = r,
                this.shadowRoot = r.attachShadow({
                    mode: "open"
                }),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const l = FD(o.id, o.styles);
                for (const c of l) {
                    const d = document.createElement("style");
                    a && d.setAttribute("nonce", a),
                    d.textContent = c,
                    this.shadowRoot.appendChild(d)
                }
            }
            nodeOrShadowRoot(t) {
                return t === this.hostEl ? this.shadowRoot : t
            }
            appendChild(t, n) {
                return super.appendChild(this.nodeOrShadowRoot(t), n)
            }
            insertBefore(t, n, r) {
                return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
            }
            removeChild(t, n) {
                return super.removeChild(this.nodeOrShadowRoot(t), n)
            }
            parentNode(t) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
        }
        class Mc extends bc {
            constructor(t, n, r, o, i, s, a, u) {
                super(t, i, s, a),
                this.sharedStylesHost = n,
                this.removeStylesOnCompDestory = o,
                this.rendererUsageCount = 0,
                this.styles = u ? FD(u, r.styles) : r.styles
            }
            applyStyles() {
                this.sharedStylesHost.addStyles(this.styles),
                this.rendererUsageCount++
            }
            destroy() {
                this.removeStylesOnCompDestory && (this.sharedStylesHost.removeStyles(this.styles),
                this.rendererUsageCount--,
                0 === this.rendererUsageCount && this.onDestroy?.())
            }
        }
        class RD extends Mc {
            constructor(t, n, r, o, i, s, a, u) {
                const l = o + "-" + r.id;
                super(t, n, r, i, s, a, u, l),
                this.contentAttr = function $1(e) {
                    return "_ngcontent-%COMP%".replace(wc, e)
                }(l),
                this.hostAttr = function U1(e) {
                    return "_nghost-%COMP%".replace(wc, e)
                }(l)
            }
            applyToHost(t) {
                this.applyStyles(),
                this.setAttribute(t, this.hostAttr, "")
            }
            createElement(t, n) {
                const r = super.createElement(t, n);
                return super.setAttribute(r, this.contentAttr, ""),
                r
            }
        }
        let W1 = (()=>{
            class e extends TD {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return !0
                }
                addEventListener(n, r, o) {
                    return n.addEventListener(r, o, !1),
                    ()=>this.removeEventListener(n, r, o)
                }
                removeEventListener(n, r, o) {
                    return n.removeEventListener(r, o)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(fn))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const kD = ["alt", "control", "meta", "shift"]
          , q1 = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
          , Z1 = {
            alt: e=>e.altKey,
            control: e=>e.ctrlKey,
            meta: e=>e.metaKey,
            shift: e=>e.shiftKey
        };
        let Y1 = (()=>{
            class e extends TD {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return null != e.parseEventName(n)
                }
                addEventListener(n, r, o) {
                    const i = e.parseEventName(r)
                      , s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(()=>To().onAndCancel(n, i.domEventName, s))
                }
                static parseEventName(n) {
                    const r = n.toLowerCase().split(".")
                      , o = r.shift();
                    if (0 === r.length || "keydown" !== o && "keyup" !== o)
                        return null;
                    const i = e._normalizeKey(r.pop());
                    let s = ""
                      , a = r.indexOf("code");
                    if (a > -1 && (r.splice(a, 1),
                    s = "code."),
                    kD.forEach(l=>{
                        const c = r.indexOf(l);
                        c > -1 && (r.splice(c, 1),
                        s += l + ".")
                    }
                    ),
                    s += i,
                    0 != r.length || 0 === i.length)
                        return null;
                    const u = {};
                    return u.domEventName = o,
                    u.fullKey = s,
                    u
                }
                static matchEventFullKeyCode(n, r) {
                    let o = q1[n.key] || n.key
                      , i = "";
                    return r.indexOf("code.") > -1 && (o = n.code,
                    i = "code."),
                    !(null == o || !o) && (o = o.toLowerCase(),
                    " " === o ? o = "space" : "." === o && (o = "dot"),
                    kD.forEach(s=>{
                        s !== o && (0,
                        Z1[s])(n) && (i += s + ".")
                    }
                    ),
                    i += o,
                    i === r)
                }
                static eventCallback(n, r, o) {
                    return i=>{
                        e.matchEventFullKeyCode(i, n) && o.runGuarded(()=>r(i))
                    }
                }
                static _normalizeKey(n) {
                    return "esc" === n ? "escape" : n
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(fn))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const J1 = Oy(PT, "browser", [{
            provide: Tn,
            useValue: "browser"
        }, {
            provide: Kh,
            useValue: function X1() {
                vc.makeCurrent()
            },
            multi: !0
        }, {
            provide: fn,
            useFactory: function Q1() {
                return function QE(e) {
                    pu = e
                }(document),
                document
            },
            deps: []
        }])
          , ex = new M("")
          , HD = [{
            provide: Ds,
            useClass: class k1 {
                addToWindow(t) {
                    ee.getAngularTestability = (r,o=!0)=>{
                        const i = t.findTestabilityInTree(r, o);
                        if (null == i)
                            throw new C(5103,!1);
                        return i
                    }
                    ,
                    ee.getAllAngularTestabilities = ()=>t.getAllTestabilities(),
                    ee.getAllAngularRootElements = ()=>t.getAllRootElements(),
                    ee.frameworkStabilizers || (ee.frameworkStabilizers = []),
                    ee.frameworkStabilizers.push(r=>{
                        const o = ee.getAllAngularTestabilities();
                        let i = o.length
                          , s = !1;
                        const a = function(u) {
                            s = s || u,
                            i--,
                            0 == i && r(s)
                        };
                        o.forEach(function(u) {
                            u.whenStable(a)
                        })
                    }
                    )
                }
                findTestabilityInTree(t, n, r) {
                    return null == n ? null : t.getTestability(n) ?? (r ? To().isShadowRoot(n) ? this.findTestabilityInTree(t, n.host, !0) : this.findTestabilityInTree(t, n.parentElement, !0) : null)
                }
            }
            ,
            deps: []
        }, {
            provide: Ay,
            useClass: Gl,
            deps: [we, zl, Ds]
        }, {
            provide: Gl,
            useClass: Gl,
            deps: [we, zl, Ds]
        }]
          , BD = [{
            provide: Mu,
            useValue: "root"
        }, {
            provide: xn,
            useFactory: function K1() {
                return new xn
            },
            deps: []
        }, {
            provide: _c,
            useClass: W1,
            multi: !0,
            deps: [fn, we, Tn]
        }, {
            provide: _c,
            useClass: Y1,
            multi: !0,
            deps: [fn]
        }, OD, ND, AD, {
            provide: sp,
            useExisting: OD
        }, {
            provide: wD,
            useClass: L1,
            deps: []
        }, []];
        let tx = (()=>{
            class e {
                constructor(n) {}
                static withServerTransition(n) {
                    return {
                        ngModule: e,
                        providers: [{
                            provide: Bi,
                            useValue: n.appId
                        }]
                    }
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(ex, 12))
            }
            ,
            e.\u0275mod = $t({
                type: e
            }),
            e.\u0275inj = Et({
                providers: [...BD, ...HD],
                imports: [s1, RT]
            }),
            e
        }
        )();
        typeof window < "u" && window;
        const {isArray: ux} = Array
          , {getPrototypeOf: lx, prototype: cx, keys: dx} = Object;
        const {isArray: px} = Array;
        function yx(e, t) {
            return e.reduce((n,r,o)=>(n[r] = t[o],
            n), {})
        }
        function Dx(...e) {
            const t = function r_(e) {
                return oe(ca(e)) ? e.pop() : void 0
            }(e)
              , {args: n, keys: r} = function fx(e) {
                if (1 === e.length) {
                    const t = e[0];
                    if (ux(t))
                        return {
                            args: t,
                            keys: null
                        };
                    if (function hx(e) {
                        return e && "object" == typeof e && lx(e) === cx
                    }(t)) {
                        const n = dx(t);
                        return {
                            args: n.map(r=>t[r]),
                            keys: n
                        }
                    }
                }
                return {
                    args: e,
                    keys: null
                }
            }(e)
              , o = new Te(i=>{
                const {length: s} = n;
                if (!s)
                    return void i.complete();
                const a = new Array(s);
                let u = s
                  , l = s;
                for (let c = 0; c < s; c++) {
                    let d = !1;
                    Ct(n[c]).subscribe(Ht(i, f=>{
                        d || (d = !0,
                        l--),
                        a[c] = f
                    }
                    , ()=>u--, void 0, ()=>{
                        (!u || !d) && (l || i.next(r ? yx(r, a) : a),
                        i.complete())
                    }
                    ))
                }
            }
            );
            return t ? o.pipe(function mx(e) {
                return _n(t=>function gx(e, t) {
                    return px(t) ? e(...t) : e(t)
                }(e, t))
            }(t)) : o
        }
        let GD = (()=>{
            class e {
                constructor(n, r) {
                    this._renderer = n,
                    this._elementRef = r,
                    this.onChange = o=>{}
                    ,
                    this.onTouched = ()=>{}
                }
                setProperty(n, r) {
                    this._renderer.setProperty(this._elementRef.nativeElement, n, r)
                }
                registerOnTouched(n) {
                    this.onTouched = n
                }
                registerOnChange(n) {
                    this.onChange = n
                }
                setDisabledState(n) {
                    this.setProperty("disabled", n)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(_(Nn),_(pt))
            }
            ,
            e.\u0275dir = P({
                type: e
            }),
            e
        }
        )()
          , kn = (()=>{
            class e extends GD {
            }
            return e.\u0275fac = function() {
                let t;
                return function(r) {
                    return (t || (t = function Oe(e) {
                        return Bt(()=>{
                            const t = e.prototype.constructor
                              , n = t[jt] || Ga(t)
                              , r = Object.prototype;
                            let o = Object.getPrototypeOf(e.prototype).constructor;
                            for (; o && o !== r; ) {
                                const i = o[jt] || Ga(o);
                                if (i && i !== n)
                                    return i;
                                o = Object.getPrototypeOf(o)
                            }
                            return i=>new i
                        }
                        )
                    }(e)))(r || e)
                }
            }(),
            e.\u0275dir = P({
                type: e,
                features: [Q]
            }),
            e
        }
        )();
        const kt = new M("NgValueAccessor")
          , _x = {
            provide: kt,
            useExisting: J(()=>ks),
            multi: !0
        }
          , Ex = new M("CompositionEventMode");
        let ks = (()=>{
            class e extends GD {
                constructor(n, r, o) {
                    super(n, r),
                    this._compositionMode = o,
                    this._composing = !1,
                    null == this._compositionMode && (this._compositionMode = !function Cx() {
                        const e = To() ? To().getUserAgent() : "";
                        return /android (\d+)/.test(e.toLowerCase())
                    }())
                }
                writeValue(n) {
                    this.setProperty("value", n ?? "")
                }
                _handleInput(n) {
                    (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(n)
                }
                _compositionStart() {
                    this._composing = !0
                }
                _compositionEnd(n) {
                    this._composing = !1,
                    this._compositionMode && this.onChange(n)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(_(Nn),_(pt),_(Ex, 8))
            }
            ,
            e.\u0275dir = P({
                type: e,
                selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
                hostBindings: function(n, r) {
                    1 & n && Se("input", function(i) {
                        return r._handleInput(i.target.value)
                    })("blur", function() {
                        return r.onTouched()
                    })("compositionstart", function() {
                        return r._compositionStart()
                    })("compositionend", function(i) {
                        return r._compositionEnd(i.target.value)
                    })
                },
                features: [ie([_x]), Q]
            }),
            e
        }
        )();
        function pn(e) {
            return null == e || ("string" == typeof e || Array.isArray(e)) && 0 === e.length
        }
        function WD(e) {
            return null != e && "number" == typeof e.length
        }
        const Le = new M("NgValidators")
          , gn = new M("NgAsyncValidators")
          , wx = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        class Sc {
            static min(t) {
                return function qD(e) {
                    return t=>{
                        if (pn(t.value) || pn(e))
                            return null;
                        const n = parseFloat(t.value);
                        return !isNaN(n) && n < e ? {
                            min: {
                                min: e,
                                actual: t.value
                            }
                        } : null
                    }
                }(t)
            }
            static max(t) {
                return function ZD(e) {
                    return t=>{
                        if (pn(t.value) || pn(e))
                            return null;
                        const n = parseFloat(t.value);
                        return !isNaN(n) && n > e ? {
                            max: {
                                max: e,
                                actual: t.value
                            }
                        } : null
                    }
                }(t)
            }
            static required(t) {
                return function YD(e) {
                    return pn(e.value) ? {
                        required: !0
                    } : null
                }(t)
            }
            static requiredTrue(t) {
                return function XD(e) {
                    return !0 === e.value ? null : {
                        required: !0
                    }
                }(t)
            }
            static email(t) {
                return function KD(e) {
                    return pn(e.value) || wx.test(e.value) ? null : {
                        email: !0
                    }
                }(t)
            }
            static minLength(t) {
                return function QD(e) {
                    return t=>pn(t.value) || !WD(t.value) ? null : t.value.length < e ? {
                        minlength: {
                            requiredLength: e,
                            actualLength: t.value.length
                        }
                    } : null
                }(t)
            }
            static maxLength(t) {
                return function JD(e) {
                    return t=>WD(t.value) && t.value.length > e ? {
                        maxlength: {
                            requiredLength: e,
                            actualLength: t.value.length
                        }
                    } : null
                }(t)
            }
            static pattern(t) {
                return function ev(e) {
                    if (!e)
                        return Ls;
                    let t, n;
                    return "string" == typeof e ? (n = "",
                    "^" !== e.charAt(0) && (n += "^"),
                    n += e,
                    "$" !== e.charAt(e.length - 1) && (n += "$"),
                    t = new RegExp(n)) : (n = e.toString(),
                    t = e),
                    r=>{
                        if (pn(r.value))
                            return null;
                        const o = r.value;
                        return t.test(o) ? null : {
                            pattern: {
                                requiredPattern: n,
                                actualValue: o
                            }
                        }
                    }
                }(t)
            }
            static nullValidator(t) {
                return null
            }
            static compose(t) {
                return sv(t)
            }
            static composeAsync(t) {
                return av(t)
            }
        }
        function Ls(e) {
            return null
        }
        function tv(e) {
            return null != e
        }
        function nv(e) {
            return is(e) ? Yo(e) : e
        }
        function rv(e) {
            let t = {};
            return e.forEach(n=>{
                t = null != n ? {
                    ...t,
                    ...n
                } : t
            }
            ),
            0 === Object.keys(t).length ? null : t
        }
        function ov(e, t) {
            return t.map(n=>n(e))
        }
        function iv(e) {
            return e.map(t=>function bx(e) {
                return !e.validate
            }(t) ? t : n=>t.validate(n))
        }
        function sv(e) {
            if (!e)
                return null;
            const t = e.filter(tv);
            return 0 == t.length ? null : function(n) {
                return rv(ov(n, t))
            }
        }
        function Ac(e) {
            return null != e ? sv(iv(e)) : null
        }
        function av(e) {
            if (!e)
                return null;
            const t = e.filter(tv);
            return 0 == t.length ? null : function(n) {
                return Dx(ov(n, t).map(nv)).pipe(_n(rv))
            }
        }
        function Tc(e) {
            return null != e ? av(iv(e)) : null
        }
        function uv(e, t) {
            return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t]
        }
        function lv(e) {
            return e._rawValidators
        }
        function cv(e) {
            return e._rawAsyncValidators
        }
        function Nc(e) {
            return e ? Array.isArray(e) ? e : [e] : []
        }
        function Vs(e, t) {
            return Array.isArray(e) ? e.includes(t) : e === t
        }
        function dv(e, t) {
            const n = Nc(t);
            return Nc(e).forEach(o=>{
                Vs(n, o) || n.push(o)
            }
            ),
            n
        }
        function fv(e, t) {
            return Nc(t).filter(n=>!Vs(e, n))
        }
        class hv {
            constructor() {
                this._rawValidators = [],
                this._rawAsyncValidators = [],
                this._onDestroyCallbacks = []
            }
            get value() {
                return this.control ? this.control.value : null
            }
            get valid() {
                return this.control ? this.control.valid : null
            }
            get invalid() {
                return this.control ? this.control.invalid : null
            }
            get pending() {
                return this.control ? this.control.pending : null
            }
            get disabled() {
                return this.control ? this.control.disabled : null
            }
            get enabled() {
                return this.control ? this.control.enabled : null
            }
            get errors() {
                return this.control ? this.control.errors : null
            }
            get pristine() {
                return this.control ? this.control.pristine : null
            }
            get dirty() {
                return this.control ? this.control.dirty : null
            }
            get touched() {
                return this.control ? this.control.touched : null
            }
            get status() {
                return this.control ? this.control.status : null
            }
            get untouched() {
                return this.control ? this.control.untouched : null
            }
            get statusChanges() {
                return this.control ? this.control.statusChanges : null
            }
            get valueChanges() {
                return this.control ? this.control.valueChanges : null
            }
            get path() {
                return null
            }
            _setValidators(t) {
                this._rawValidators = t || [],
                this._composedValidatorFn = Ac(this._rawValidators)
            }
            _setAsyncValidators(t) {
                this._rawAsyncValidators = t || [],
                this._composedAsyncValidatorFn = Tc(this._rawAsyncValidators)
            }
            get validator() {
                return this._composedValidatorFn || null
            }
            get asyncValidator() {
                return this._composedAsyncValidatorFn || null
            }
            _registerOnDestroy(t) {
                this._onDestroyCallbacks.push(t)
            }
            _invokeOnDestroyCallbacks() {
                this._onDestroyCallbacks.forEach(t=>t()),
                this._onDestroyCallbacks = []
            }
            reset(t=void 0) {
                this.control && this.control.reset(t)
            }
            hasError(t, n) {
                return !!this.control && this.control.hasError(t, n)
            }
            getError(t, n) {
                return this.control ? this.control.getError(t, n) : null
            }
        }
        class $e extends hv {
            get formDirective() {
                return null
            }
            get path() {
                return null
            }
        }
        class mn extends hv {
            constructor() {
                super(...arguments),
                this._parent = null,
                this.name = null,
                this.valueAccessor = null
            }
        }
        class pv {
            constructor(t) {
                this._cd = t
            }
            get isTouched() {
                return !!this._cd?.control?.touched
            }
            get isUntouched() {
                return !!this._cd?.control?.untouched
            }
            get isPristine() {
                return !!this._cd?.control?.pristine
            }
            get isDirty() {
                return !!this._cd?.control?.dirty
            }
            get isValid() {
                return !!this._cd?.control?.valid
            }
            get isInvalid() {
                return !!this._cd?.control?.invalid
            }
            get isPending() {
                return !!this._cd?.control?.pending
            }
            get isSubmitted() {
                return !!this._cd?.submitted
            }
        }
        let gv = (()=>{
            class e extends pv {
                constructor(n) {
                    super(n)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(_(mn, 2))
            }
            ,
            e.\u0275dir = P({
                type: e,
                selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
                hostVars: 14,
                hostBindings: function(n, r) {
                    2 & n && as("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)("ng-valid", r.isValid)("ng-invalid", r.isInvalid)("ng-pending", r.isPending)
                },
                features: [Q]
            }),
            e
        }
        )()
          , mv = (()=>{
            class e extends pv {
                constructor(n) {
                    super(n)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(_($e, 10))
            }
            ,
            e.\u0275dir = P({
                type: e,
                selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
                hostVars: 16,
                hostBindings: function(n, r) {
                    2 & n && as("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)("ng-valid", r.isValid)("ng-invalid", r.isInvalid)("ng-pending", r.isPending)("ng-submitted", r.isSubmitted)
                },
                features: [Q]
            }),
            e
        }
        )();
        const Po = "VALID"
          , Bs = "INVALID"
          , Sr = "PENDING"
          , Ro = "DISABLED";
        function Oc(e) {
            return (js(e) ? e.validators : e) || null
        }
        function Pc(e, t) {
            return (js(t) ? t.asyncValidators : e) || null
        }
        function js(e) {
            return null != e && !Array.isArray(e) && "object" == typeof e
        }
        function Dv(e, t, n) {
            const r = e.controls;
            if (!(t ? Object.keys(r) : r).length)
                throw new C(1e3,"");
            if (!r[n])
                throw new C(1001,"")
        }
        function vv(e, t, n) {
            e._forEachChild((r,o)=>{
                if (void 0 === n[o])
                    throw new C(1002,"")
            }
            )
        }
        class $s {
            constructor(t, n) {
                this._pendingDirty = !1,
                this._hasOwnPendingAsyncValidator = !1,
                this._pendingTouched = !1,
                this._onCollectionChange = ()=>{}
                ,
                this._parent = null,
                this.pristine = !0,
                this.touched = !1,
                this._onDisabledChange = [],
                this._assignValidators(t),
                this._assignAsyncValidators(n)
            }
            get validator() {
                return this._composedValidatorFn
            }
            set validator(t) {
                this._rawValidators = this._composedValidatorFn = t
            }
            get asyncValidator() {
                return this._composedAsyncValidatorFn
            }
            set asyncValidator(t) {
                this._rawAsyncValidators = this._composedAsyncValidatorFn = t
            }
            get parent() {
                return this._parent
            }
            get valid() {
                return this.status === Po
            }
            get invalid() {
                return this.status === Bs
            }
            get pending() {
                return this.status == Sr
            }
            get disabled() {
                return this.status === Ro
            }
            get enabled() {
                return this.status !== Ro
            }
            get dirty() {
                return !this.pristine
            }
            get untouched() {
                return !this.touched
            }
            get updateOn() {
                return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
            }
            setValidators(t) {
                this._assignValidators(t)
            }
            setAsyncValidators(t) {
                this._assignAsyncValidators(t)
            }
            addValidators(t) {
                this.setValidators(dv(t, this._rawValidators))
            }
            addAsyncValidators(t) {
                this.setAsyncValidators(dv(t, this._rawAsyncValidators))
            }
            removeValidators(t) {
                this.setValidators(fv(t, this._rawValidators))
            }
            removeAsyncValidators(t) {
                this.setAsyncValidators(fv(t, this._rawAsyncValidators))
            }
            hasValidator(t) {
                return Vs(this._rawValidators, t)
            }
            hasAsyncValidator(t) {
                return Vs(this._rawAsyncValidators, t)
            }
            clearValidators() {
                this.validator = null
            }
            clearAsyncValidators() {
                this.asyncValidator = null
            }
            markAsTouched(t={}) {
                this.touched = !0,
                this._parent && !t.onlySelf && this._parent.markAsTouched(t)
            }
            markAllAsTouched() {
                this.markAsTouched({
                    onlySelf: !0
                }),
                this._forEachChild(t=>t.markAllAsTouched())
            }
            markAsUntouched(t={}) {
                this.touched = !1,
                this._pendingTouched = !1,
                this._forEachChild(n=>{
                    n.markAsUntouched({
                        onlySelf: !0
                    })
                }
                ),
                this._parent && !t.onlySelf && this._parent._updateTouched(t)
            }
            markAsDirty(t={}) {
                this.pristine = !1,
                this._parent && !t.onlySelf && this._parent.markAsDirty(t)
            }
            markAsPristine(t={}) {
                this.pristine = !0,
                this._pendingDirty = !1,
                this._forEachChild(n=>{
                    n.markAsPristine({
                        onlySelf: !0
                    })
                }
                ),
                this._parent && !t.onlySelf && this._parent._updatePristine(t)
            }
            markAsPending(t={}) {
                this.status = Sr,
                !1 !== t.emitEvent && this.statusChanges.emit(this.status),
                this._parent && !t.onlySelf && this._parent.markAsPending(t)
            }
            disable(t={}) {
                const n = this._parentMarkedDirty(t.onlySelf);
                this.status = Ro,
                this.errors = null,
                this._forEachChild(r=>{
                    r.disable({
                        ...t,
                        onlySelf: !0
                    })
                }
                ),
                this._updateValue(),
                !1 !== t.emitEvent && (this.valueChanges.emit(this.value),
                this.statusChanges.emit(this.status)),
                this._updateAncestors({
                    ...t,
                    skipPristineCheck: n
                }),
                this._onDisabledChange.forEach(r=>r(!0))
            }
            enable(t={}) {
                const n = this._parentMarkedDirty(t.onlySelf);
                this.status = Po,
                this._forEachChild(r=>{
                    r.enable({
                        ...t,
                        onlySelf: !0
                    })
                }
                ),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: t.emitEvent
                }),
                this._updateAncestors({
                    ...t,
                    skipPristineCheck: n
                }),
                this._onDisabledChange.forEach(r=>r(!1))
            }
            _updateAncestors(t) {
                this._parent && !t.onlySelf && (this._parent.updateValueAndValidity(t),
                t.skipPristineCheck || this._parent._updatePristine(),
                this._parent._updateTouched())
            }
            setParent(t) {
                this._parent = t
            }
            getRawValue() {
                return this.value
            }
            updateValueAndValidity(t={}) {
                this._setInitialStatus(),
                this._updateValue(),
                this.enabled && (this._cancelExistingSubscription(),
                this.errors = this._runValidator(),
                this.status = this._calculateStatus(),
                (this.status === Po || this.status === Sr) && this._runAsyncValidator(t.emitEvent)),
                !1 !== t.emitEvent && (this.valueChanges.emit(this.value),
                this.statusChanges.emit(this.status)),
                this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t)
            }
            _updateTreeValidity(t={
                emitEvent: !0
            }) {
                this._forEachChild(n=>n._updateTreeValidity(t)),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: t.emitEvent
                })
            }
            _setInitialStatus() {
                this.status = this._allControlsDisabled() ? Ro : Po
            }
            _runValidator() {
                return this.validator ? this.validator(this) : null
            }
            _runAsyncValidator(t) {
                if (this.asyncValidator) {
                    this.status = Sr,
                    this._hasOwnPendingAsyncValidator = !0;
                    const n = nv(this.asyncValidator(this));
                    this._asyncValidationSubscription = n.subscribe(r=>{
                        this._hasOwnPendingAsyncValidator = !1,
                        this.setErrors(r, {
                            emitEvent: t
                        })
                    }
                    )
                }
            }
            _cancelExistingSubscription() {
                this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(),
                this._hasOwnPendingAsyncValidator = !1)
            }
            setErrors(t, n={}) {
                this.errors = t,
                this._updateControlsErrors(!1 !== n.emitEvent)
            }
            get(t) {
                let n = t;
                return null == n || (Array.isArray(n) || (n = n.split(".")),
                0 === n.length) ? null : n.reduce((r,o)=>r && r._find(o), this)
            }
            getError(t, n) {
                const r = n ? this.get(n) : this;
                return r && r.errors ? r.errors[t] : null
            }
            hasError(t, n) {
                return !!this.getError(t, n)
            }
            get root() {
                let t = this;
                for (; t._parent; )
                    t = t._parent;
                return t
            }
            _updateControlsErrors(t) {
                this.status = this._calculateStatus(),
                t && this.statusChanges.emit(this.status),
                this._parent && this._parent._updateControlsErrors(t)
            }
            _initObservables() {
                this.valueChanges = new ke,
                this.statusChanges = new ke
            }
            _calculateStatus() {
                return this._allControlsDisabled() ? Ro : this.errors ? Bs : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Sr) ? Sr : this._anyControlsHaveStatus(Bs) ? Bs : Po
            }
            _anyControlsHaveStatus(t) {
                return this._anyControls(n=>n.status === t)
            }
            _anyControlsDirty() {
                return this._anyControls(t=>t.dirty)
            }
            _anyControlsTouched() {
                return this._anyControls(t=>t.touched)
            }
            _updatePristine(t={}) {
                this.pristine = !this._anyControlsDirty(),
                this._parent && !t.onlySelf && this._parent._updatePristine(t)
            }
            _updateTouched(t={}) {
                this.touched = this._anyControlsTouched(),
                this._parent && !t.onlySelf && this._parent._updateTouched(t)
            }
            _registerOnCollectionChange(t) {
                this._onCollectionChange = t
            }
            _setUpdateStrategy(t) {
                js(t) && null != t.updateOn && (this._updateOn = t.updateOn)
            }
            _parentMarkedDirty(t) {
                return !t && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
            }
            _find(t) {
                return null
            }
            _assignValidators(t) {
                this._rawValidators = Array.isArray(t) ? t.slice() : t,
                this._composedValidatorFn = function Ax(e) {
                    return Array.isArray(e) ? Ac(e) : e || null
                }(this._rawValidators)
            }
            _assignAsyncValidators(t) {
                this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t,
                this._composedAsyncValidatorFn = function Tx(e) {
                    return Array.isArray(e) ? Tc(e) : e || null
                }(this._rawAsyncValidators)
            }
        }
        class ko extends $s {
            constructor(t, n, r) {
                super(Oc(n), Pc(r, n)),
                this.controls = t,
                this._initObservables(),
                this._setUpdateStrategy(n),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator
                })
            }
            registerControl(t, n) {
                return this.controls[t] ? this.controls[t] : (this.controls[t] = n,
                n.setParent(this),
                n._registerOnCollectionChange(this._onCollectionChange),
                n)
            }
            addControl(t, n, r={}) {
                this.registerControl(t, n),
                this.updateValueAndValidity({
                    emitEvent: r.emitEvent
                }),
                this._onCollectionChange()
            }
            removeControl(t, n={}) {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(()=>{}
                ),
                delete this.controls[t],
                this.updateValueAndValidity({
                    emitEvent: n.emitEvent
                }),
                this._onCollectionChange()
            }
            setControl(t, n, r={}) {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(()=>{}
                ),
                delete this.controls[t],
                n && this.registerControl(t, n),
                this.updateValueAndValidity({
                    emitEvent: r.emitEvent
                }),
                this._onCollectionChange()
            }
            contains(t) {
                return this.controls.hasOwnProperty(t) && this.controls[t].enabled
            }
            setValue(t, n={}) {
                vv(this, 0, t),
                Object.keys(t).forEach(r=>{
                    Dv(this, !0, r),
                    this.controls[r].setValue(t[r], {
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(n)
            }
            patchValue(t, n={}) {
                null != t && (Object.keys(t).forEach(r=>{
                    const o = this.controls[r];
                    o && o.patchValue(t[r], {
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(n))
            }
            reset(t={}, n={}) {
                this._forEachChild((r,o)=>{
                    r.reset(t[o], {
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    })
                }
                ),
                this._updatePristine(n),
                this._updateTouched(n),
                this.updateValueAndValidity(n)
            }
            getRawValue() {
                return this._reduceChildren({}, (t,n,r)=>(t[r] = n.getRawValue(),
                t))
            }
            _syncPendingControls() {
                let t = this._reduceChildren(!1, (n,r)=>!!r._syncPendingControls() || n);
                return t && this.updateValueAndValidity({
                    onlySelf: !0
                }),
                t
            }
            _forEachChild(t) {
                Object.keys(this.controls).forEach(n=>{
                    const r = this.controls[n];
                    r && t(r, n)
                }
                )
            }
            _setUpControls() {
                this._forEachChild(t=>{
                    t.setParent(this),
                    t._registerOnCollectionChange(this._onCollectionChange)
                }
                )
            }
            _updateValue() {
                this.value = this._reduceValue()
            }
            _anyControls(t) {
                for (const [n,r] of Object.entries(this.controls))
                    if (this.contains(n) && t(r))
                        return !0;
                return !1
            }
            _reduceValue() {
                return this._reduceChildren({}, (n,r,o)=>((r.enabled || this.disabled) && (n[o] = r.value),
                n))
            }
            _reduceChildren(t, n) {
                let r = t;
                return this._forEachChild((o,i)=>{
                    r = n(r, o, i)
                }
                ),
                r
            }
            _allControlsDisabled() {
                for (const t of Object.keys(this.controls))
                    if (this.controls[t].enabled)
                        return !1;
                return Object.keys(this.controls).length > 0 || this.disabled
            }
            _find(t) {
                return this.controls.hasOwnProperty(t) ? this.controls[t] : null
            }
        }
        class _v extends ko {
        }
        const Ar = new M("CallSetDisabledState",{
            providedIn: "root",
            factory: ()=>Us
        })
          , Us = "always";
        function Lo(e, t, n=Us) {
            Rc(e, t),
            t.valueAccessor.writeValue(e.value),
            (e.disabled || "always" === n) && t.valueAccessor.setDisabledState?.(e.disabled),
            function xx(e, t) {
                t.valueAccessor.registerOnChange(n=>{
                    e._pendingValue = n,
                    e._pendingChange = !0,
                    e._pendingDirty = !0,
                    "change" === e.updateOn && Cv(e, t)
                }
                )
            }(e, t),
            function Ox(e, t) {
                const n = (r,o)=>{
                    t.valueAccessor.writeValue(r),
                    o && t.viewToModelUpdate(r)
                }
                ;
                e.registerOnChange(n),
                t._registerOnDestroy(()=>{
                    e._unregisterOnChange(n)
                }
                )
            }(e, t),
            function Fx(e, t) {
                t.valueAccessor.registerOnTouched(()=>{
                    e._pendingTouched = !0,
                    "blur" === e.updateOn && e._pendingChange && Cv(e, t),
                    "submit" !== e.updateOn && e.markAsTouched()
                }
                )
            }(e, t),
            function Nx(e, t) {
                if (t.valueAccessor.setDisabledState) {
                    const n = r=>{
                        t.valueAccessor.setDisabledState(r)
                    }
                    ;
                    e.registerOnDisabledChange(n),
                    t._registerOnDestroy(()=>{
                        e._unregisterOnDisabledChange(n)
                    }
                    )
                }
            }(e, t)
        }
        function zs(e, t, n=!0) {
            const r = ()=>{}
            ;
            t.valueAccessor && (t.valueAccessor.registerOnChange(r),
            t.valueAccessor.registerOnTouched(r)),
            qs(e, t),
            e && (t._invokeOnDestroyCallbacks(),
            e._registerOnCollectionChange(()=>{}
            ))
        }
        function Ws(e, t) {
            e.forEach(n=>{
                n.registerOnValidatorChange && n.registerOnValidatorChange(t)
            }
            )
        }
        function Rc(e, t) {
            const n = lv(e);
            null !== t.validator ? e.setValidators(uv(n, t.validator)) : "function" == typeof n && e.setValidators([n]);
            const r = cv(e);
            null !== t.asyncValidator ? e.setAsyncValidators(uv(r, t.asyncValidator)) : "function" == typeof r && e.setAsyncValidators([r]);
            const o = ()=>e.updateValueAndValidity();
            Ws(t._rawValidators, o),
            Ws(t._rawAsyncValidators, o)
        }
        function qs(e, t) {
            let n = !1;
            if (null !== e) {
                if (null !== t.validator) {
                    const o = lv(e);
                    if (Array.isArray(o) && o.length > 0) {
                        const i = o.filter(s=>s !== t.validator);
                        i.length !== o.length && (n = !0,
                        e.setValidators(i))
                    }
                }
                if (null !== t.asyncValidator) {
                    const o = cv(e);
                    if (Array.isArray(o) && o.length > 0) {
                        const i = o.filter(s=>s !== t.asyncValidator);
                        i.length !== o.length && (n = !0,
                        e.setAsyncValidators(i))
                    }
                }
            }
            const r = ()=>{}
            ;
            return Ws(t._rawValidators, r),
            Ws(t._rawAsyncValidators, r),
            n
        }
        function Cv(e, t) {
            e._pendingDirty && e.markAsDirty(),
            e.setValue(e._pendingValue, {
                emitModelToViewChange: !1
            }),
            t.viewToModelUpdate(e._pendingValue),
            e._pendingChange = !1
        }
        function bv(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }
        function Mv(e) {
            return "object" == typeof e && null !== e && 2 === Object.keys(e).length && "value"in e && "disabled"in e
        }
        const Ho = class extends $s {
            constructor(t=null, n, r) {
                super(Oc(n), Pc(r, n)),
                this.defaultValue = null,
                this._onChange = [],
                this._pendingChange = !1,
                this._applyFormState(t),
                this._setUpdateStrategy(n),
                this._initObservables(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator
                }),
                js(n) && (n.nonNullable || n.initialValueIsDefault) && (this.defaultValue = Mv(t) ? t.value : t)
            }
            setValue(t, n={}) {
                this.value = this._pendingValue = t,
                this._onChange.length && !1 !== n.emitModelToViewChange && this._onChange.forEach(r=>r(this.value, !1 !== n.emitViewToModelChange)),
                this.updateValueAndValidity(n)
            }
            patchValue(t, n={}) {
                this.setValue(t, n)
            }
            reset(t=this.defaultValue, n={}) {
                this._applyFormState(t),
                this.markAsPristine(n),
                this.markAsUntouched(n),
                this.setValue(this.value, n),
                this._pendingChange = !1
            }
            _updateValue() {}
            _anyControls(t) {
                return !1
            }
            _allControlsDisabled() {
                return this.disabled
            }
            registerOnChange(t) {
                this._onChange.push(t)
            }
            _unregisterOnChange(t) {
                bv(this._onChange, t)
            }
            registerOnDisabledChange(t) {
                this._onDisabledChange.push(t)
            }
            _unregisterOnDisabledChange(t) {
                bv(this._onDisabledChange, t)
            }
            _forEachChild(t) {}
            _syncPendingControls() {
                return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(),
                this._pendingTouched && this.markAsTouched(),
                !this._pendingChange) || (this.setValue(this._pendingValue, {
                    onlySelf: !0,
                    emitModelToViewChange: !1
                }),
                0))
            }
            _applyFormState(t) {
                Mv(t) ? (this.value = this._pendingValue = t.value,
                t.disabled ? this.disable({
                    onlySelf: !0,
                    emitEvent: !1
                }) : this.enable({
                    onlySelf: !0,
                    emitEvent: !1
                })) : this.value = this._pendingValue = t
            }
        }
        ;
        let xv = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275mod = $t({
                type: e
            }),
            e.\u0275inj = Et({}),
            e
        }
        )();
        const Bc = new M("NgModelWithFormControlWarning")
          , Zx = {
            provide: $e,
            useExisting: J(()=>Zs)
        };
        let Zs = (()=>{
            class e extends $e {
                constructor(n, r, o) {
                    super(),
                    this.callSetDisabledState = o,
                    this.submitted = !1,
                    this._onCollectionChange = ()=>this._updateDomValue(),
                    this.directives = [],
                    this.form = null,
                    this.ngSubmit = new ke,
                    this._setValidators(n),
                    this._setAsyncValidators(r)
                }
                ngOnChanges(n) {
                    this._checkFormPresent(),
                    n.hasOwnProperty("form") && (this._updateValidators(),
                    this._updateDomValue(),
                    this._updateRegistrations(),
                    this._oldForm = this.form)
                }
                ngOnDestroy() {
                    this.form && (qs(this.form, this),
                    this.form._onCollectionChange === this._onCollectionChange && this.form._registerOnCollectionChange(()=>{}
                    ))
                }
                get formDirective() {
                    return this
                }
                get control() {
                    return this.form
                }
                get path() {
                    return []
                }
                addControl(n) {
                    const r = this.form.get(n.path);
                    return Lo(r, n, this.callSetDisabledState),
                    r.updateValueAndValidity({
                        emitEvent: !1
                    }),
                    this.directives.push(n),
                    r
                }
                getControl(n) {
                    return this.form.get(n.path)
                }
                removeControl(n) {
                    zs(n.control || null, n, !1),
                    function Lx(e, t) {
                        const n = e.indexOf(t);
                        n > -1 && e.splice(n, 1)
                    }(this.directives, n)
                }
                addFormGroup(n) {
                    this._setUpFormContainer(n)
                }
                removeFormGroup(n) {
                    this._cleanUpFormContainer(n)
                }
                getFormGroup(n) {
                    return this.form.get(n.path)
                }
                addFormArray(n) {
                    this._setUpFormContainer(n)
                }
                removeFormArray(n) {
                    this._cleanUpFormContainer(n)
                }
                getFormArray(n) {
                    return this.form.get(n.path)
                }
                updateModel(n, r) {
                    this.form.get(n.path).setValue(r)
                }
                onSubmit(n) {
                    return this.submitted = !0,
                    function wv(e, t) {
                        e._syncPendingControls(),
                        t.forEach(n=>{
                            const r = n.control;
                            "submit" === r.updateOn && r._pendingChange && (n.viewToModelUpdate(r._pendingValue),
                            r._pendingChange = !1)
                        }
                        )
                    }(this.form, this.directives),
                    this.ngSubmit.emit(n),
                    "dialog" === n?.target?.method
                }
                onReset() {
                    this.resetForm()
                }
                resetForm(n=void 0) {
                    this.form.reset(n),
                    this.submitted = !1
                }
                _updateDomValue() {
                    this.directives.forEach(n=>{
                        const r = n.control
                          , o = this.form.get(n.path);
                        r !== o && (zs(r || null, n),
                        (e=>e instanceof Ho)(o) && (Lo(o, n, this.callSetDisabledState),
                        n.control = o))
                    }
                    ),
                    this.form._updateTreeValidity({
                        emitEvent: !1
                    })
                }
                _setUpFormContainer(n) {
                    const r = this.form.get(n.path);
                    (function Ev(e, t) {
                        Rc(e, t)
                    }
                    )(r, n),
                    r.updateValueAndValidity({
                        emitEvent: !1
                    })
                }
                _cleanUpFormContainer(n) {
                    if (this.form) {
                        const r = this.form.get(n.path);
                        r && function Px(e, t) {
                            return qs(e, t)
                        }(r, n) && r.updateValueAndValidity({
                            emitEvent: !1
                        })
                    }
                }
                _updateRegistrations() {
                    this.form._registerOnCollectionChange(this._onCollectionChange),
                    this._oldForm && this._oldForm._registerOnCollectionChange(()=>{}
                    )
                }
                _updateValidators() {
                    Rc(this.form, this),
                    this._oldForm && qs(this._oldForm, this)
                }
                _checkFormPresent() {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(_(Le, 10),_(gn, 10),_(Ar, 8))
            }
            ,
            e.\u0275dir = P({
                type: e,
                selectors: [["", "formGroup", ""]],
                hostBindings: function(n, r) {
                    1 & n && Se("submit", function(i) {
                        return r.onSubmit(i)
                    })("reset", function() {
                        return r.onReset()
                    })
                },
                inputs: {
                    form: ["formGroup", "form"]
                },
                outputs: {
                    ngSubmit: "ngSubmit"
                },
                exportAs: ["ngForm"],
                features: [ie([Zx]), Q, Gt]
            }),
            e
        }
        )();
        const Kx = {
            provide: mn,
            useExisting: J(()=>Uc)
        };
        let Uc = (()=>{
            class e extends mn {
                set isDisabled(n) {}
                constructor(n, r, o, i, s) {
                    super(),
                    this._ngModelWarningConfig = s,
                    this._added = !1,
                    this.name = null,
                    this.update = new ke,
                    this._ngModelWarningSent = !1,
                    this._parent = n,
                    this._setValidators(r),
                    this._setAsyncValidators(o),
                    this.valueAccessor = function Vc(e, t) {
                        if (!t)
                            return null;
                        let n, r, o;
                        return Array.isArray(t),
                        t.forEach(i=>{
                            i.constructor === ks ? n = i : function kx(e) {
                                return Object.getPrototypeOf(e.constructor) === kn
                            }(i) ? r = i : o = i
                        }
                        ),
                        o || r || n || null
                    }(0, i)
                }
                ngOnChanges(n) {
                    this._added || this._setUpControl(),
                    function Lc(e, t) {
                        if (!e.hasOwnProperty("model"))
                            return !1;
                        const n = e.model;
                        return !!n.isFirstChange() || !Object.is(t, n.currentValue)
                    }(n, this.viewModel) && (this.viewModel = this.model,
                    this.formDirective.updateModel(this, this.model))
                }
                ngOnDestroy() {
                    this.formDirective && this.formDirective.removeControl(this)
                }
                viewToModelUpdate(n) {
                    this.viewModel = n,
                    this.update.emit(n)
                }
                get path() {
                    return function Gs(e, t) {
                        return [...t.path, e]
                    }(null == this.name ? this.name : this.name.toString(), this._parent)
                }
                get formDirective() {
                    return this._parent ? this._parent.formDirective : null
                }
                _checkParentType() {}
                _setUpControl() {
                    this._checkParentType(),
                    this.control = this.formDirective.addControl(this),
                    this._added = !0
                }
            }
            return e._ngModelWarningSentOnce = !1,
            e.\u0275fac = function(n) {
                return new (n || e)(_($e, 13),_(Le, 10),_(gn, 10),_(kt, 10),_(Bc, 8))
            }
            ,
            e.\u0275dir = P({
                type: e,
                selectors: [["", "formControlName", ""]],
                inputs: {
                    name: ["formControlName", "name"],
                    isDisabled: ["disabled", "isDisabled"],
                    model: ["ngModel", "model"]
                },
                outputs: {
                    update: "ngModelChange"
                },
                features: [ie([Kx]), Q, Gt]
            }),
            e
        }
        )()
          , fF = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275mod = $t({
                type: e
            }),
            e.\u0275inj = Et({
                imports: [xv]
            }),
            e
        }
        )();
        class qv extends $s {
            constructor(t, n, r) {
                super(Oc(n), Pc(r, n)),
                this.controls = t,
                this._initObservables(),
                this._setUpdateStrategy(n),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator
                })
            }
            at(t) {
                return this.controls[this._adjustIndex(t)]
            }
            push(t, n={}) {
                this.controls.push(t),
                this._registerControl(t),
                this.updateValueAndValidity({
                    emitEvent: n.emitEvent
                }),
                this._onCollectionChange()
            }
            insert(t, n, r={}) {
                this.controls.splice(t, 0, n),
                this._registerControl(n),
                this.updateValueAndValidity({
                    emitEvent: r.emitEvent
                })
            }
            removeAt(t, n={}) {
                let r = this._adjustIndex(t);
                r < 0 && (r = 0),
                this.controls[r] && this.controls[r]._registerOnCollectionChange(()=>{}
                ),
                this.controls.splice(r, 1),
                this.updateValueAndValidity({
                    emitEvent: n.emitEvent
                })
            }
            setControl(t, n, r={}) {
                let o = this._adjustIndex(t);
                o < 0 && (o = 0),
                this.controls[o] && this.controls[o]._registerOnCollectionChange(()=>{}
                ),
                this.controls.splice(o, 1),
                n && (this.controls.splice(o, 0, n),
                this._registerControl(n)),
                this.updateValueAndValidity({
                    emitEvent: r.emitEvent
                }),
                this._onCollectionChange()
            }
            get length() {
                return this.controls.length
            }
            setValue(t, n={}) {
                vv(this, 0, t),
                t.forEach((r,o)=>{
                    Dv(this, !1, o),
                    this.at(o).setValue(r, {
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(n)
            }
            patchValue(t, n={}) {
                null != t && (t.forEach((r,o)=>{
                    this.at(o) && this.at(o).patchValue(r, {
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(n))
            }
            reset(t=[], n={}) {
                this._forEachChild((r,o)=>{
                    r.reset(t[o], {
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    })
                }
                ),
                this._updatePristine(n),
                this._updateTouched(n),
                this.updateValueAndValidity(n)
            }
            getRawValue() {
                return this.controls.map(t=>t.getRawValue())
            }
            clear(t={}) {
                this.controls.length < 1 || (this._forEachChild(n=>n._registerOnCollectionChange(()=>{}
                )),
                this.controls.splice(0),
                this.updateValueAndValidity({
                    emitEvent: t.emitEvent
                }))
            }
            _adjustIndex(t) {
                return t < 0 ? t + this.length : t
            }
            _syncPendingControls() {
                let t = this.controls.reduce((n,r)=>!!r._syncPendingControls() || n, !1);
                return t && this.updateValueAndValidity({
                    onlySelf: !0
                }),
                t
            }
            _forEachChild(t) {
                this.controls.forEach((n,r)=>{
                    t(n, r)
                }
                )
            }
            _updateValue() {
                this.value = this.controls.filter(t=>t.enabled || this.disabled).map(t=>t.value)
            }
            _anyControls(t) {
                return this.controls.some(n=>n.enabled && t(n))
            }
            _setUpControls() {
                this._forEachChild(t=>this._registerControl(t))
            }
            _allControlsDisabled() {
                for (const t of this.controls)
                    if (t.enabled)
                        return !1;
                return this.controls.length > 0 || this.disabled
            }
            _registerControl(t) {
                t.setParent(this),
                t._registerOnCollectionChange(this._onCollectionChange)
            }
            _find(t) {
                return this.at(t) ?? null
            }
        }
        function Zv(e) {
            return !!e && (void 0 !== e.asyncValidators || void 0 !== e.validators || void 0 !== e.updateOn)
        }
        let hF = (()=>{
            class e {
                constructor() {
                    this.useNonNullable = !1
                }
                get nonNullable() {
                    const n = new e;
                    return n.useNonNullable = !0,
                    n
                }
                group(n, r=null) {
                    const o = this._reduceControls(n);
                    let i = {};
                    return Zv(r) ? i = r : null !== r && (i.validators = r.validator,
                    i.asyncValidators = r.asyncValidator),
                    new ko(o,i)
                }
                record(n, r=null) {
                    const o = this._reduceControls(n);
                    return new _v(o,r)
                }
                control(n, r, o) {
                    let i = {};
                    return this.useNonNullable ? (Zv(r) ? i = r : (i.validators = r,
                    i.asyncValidators = o),
                    new Ho(n,{
                        ...i,
                        nonNullable: !0
                    })) : new Ho(n,r,o)
                }
                array(n, r, o) {
                    const i = n.map(s=>this._createControl(s));
                    return new qv(i,r,o)
                }
                _reduceControls(n) {
                    const r = {};
                    return Object.keys(n).forEach(o=>{
                        r[o] = this._createControl(n[o])
                    }
                    ),
                    r
                }
                _createControl(n) {
                    return n instanceof Ho || n instanceof $s ? n : Array.isArray(n) ? this.control(n[0], n.length > 1 ? n[1] : null, n.length > 2 ? n[2] : null) : this.control(n)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )()
          , pF = (()=>{
            class e {
                static withConfig(n) {
                    return {
                        ngModule: e,
                        providers: [{
                            provide: Bc,
                            useValue: n.warnOnNgModelWithFormControl ?? "always"
                        }, {
                            provide: Ar,
                            useValue: n.callSetDisabledState ?? Us
                        }]
                    }
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275mod = $t({
                type: e
            }),
            e.\u0275inj = Et({
                imports: [fF]
            }),
            e
        }
        )();
        function Yv(e) {
            return Vt((t,n)=>{
                try {
                    t.subscribe(n)
                } finally {
                    n.add(e)
                }
            }
            )
        }
        class Ys {
        }
        class Xs {
        }
        class Lt {
            constructor(t) {
                this.normalizedNames = new Map,
                this.lazyUpdate = null,
                t ? "string" == typeof t ? this.lazyInit = ()=>{
                    this.headers = new Map,
                    t.split("\n").forEach(n=>{
                        const r = n.indexOf(":");
                        if (r > 0) {
                            const o = n.slice(0, r)
                              , i = o.toLowerCase()
                              , s = n.slice(r + 1).trim();
                            this.maybeSetNormalizedName(o, i),
                            this.headers.has(i) ? this.headers.get(i).push(s) : this.headers.set(i, [s])
                        }
                    }
                    )
                }
                : typeof Headers < "u" && t instanceof Headers ? (this.headers = new Map,
                t.forEach((n,r)=>{
                    this.setHeaderEntries(r, n)
                }
                )) : this.lazyInit = ()=>{
                    this.headers = new Map,
                    Object.entries(t).forEach(([n,r])=>{
                        this.setHeaderEntries(n, r)
                    }
                    )
                }
                : this.headers = new Map
            }
            has(t) {
                return this.init(),
                this.headers.has(t.toLowerCase())
            }
            get(t) {
                this.init();
                const n = this.headers.get(t.toLowerCase());
                return n && n.length > 0 ? n[0] : null
            }
            keys() {
                return this.init(),
                Array.from(this.normalizedNames.values())
            }
            getAll(t) {
                return this.init(),
                this.headers.get(t.toLowerCase()) || null
            }
            append(t, n) {
                return this.clone({
                    name: t,
                    value: n,
                    op: "a"
                })
            }
            set(t, n) {
                return this.clone({
                    name: t,
                    value: n,
                    op: "s"
                })
            }
            delete(t, n) {
                return this.clone({
                    name: t,
                    value: n,
                    op: "d"
                })
            }
            maybeSetNormalizedName(t, n) {
                this.normalizedNames.has(n) || this.normalizedNames.set(n, t)
            }
            init() {
                this.lazyInit && (this.lazyInit instanceof Lt ? this.copyFrom(this.lazyInit) : this.lazyInit(),
                this.lazyInit = null,
                this.lazyUpdate && (this.lazyUpdate.forEach(t=>this.applyUpdate(t)),
                this.lazyUpdate = null))
            }
            copyFrom(t) {
                t.init(),
                Array.from(t.headers.keys()).forEach(n=>{
                    this.headers.set(n, t.headers.get(n)),
                    this.normalizedNames.set(n, t.normalizedNames.get(n))
                }
                )
            }
            clone(t) {
                const n = new Lt;
                return n.lazyInit = this.lazyInit && this.lazyInit instanceof Lt ? this.lazyInit : this,
                n.lazyUpdate = (this.lazyUpdate || []).concat([t]),
                n
            }
            applyUpdate(t) {
                const n = t.name.toLowerCase();
                switch (t.op) {
                case "a":
                case "s":
                    let r = t.value;
                    if ("string" == typeof r && (r = [r]),
                    0 === r.length)
                        return;
                    this.maybeSetNormalizedName(t.name, n);
                    const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
                    o.push(...r),
                    this.headers.set(n, o);
                    break;
                case "d":
                    const i = t.value;
                    if (i) {
                        let s = this.headers.get(n);
                        if (!s)
                            return;
                        s = s.filter(a=>-1 === i.indexOf(a)),
                        0 === s.length ? (this.headers.delete(n),
                        this.normalizedNames.delete(n)) : this.headers.set(n, s)
                    } else
                        this.headers.delete(n),
                        this.normalizedNames.delete(n)
                }
            }
            setHeaderEntries(t, n) {
                const r = (Array.isArray(n) ? n : [n]).map(i=>i.toString())
                  , o = t.toLowerCase();
                this.headers.set(o, r),
                this.maybeSetNormalizedName(t, o)
            }
            forEach(t) {
                this.init(),
                Array.from(this.normalizedNames.keys()).forEach(n=>t(this.normalizedNames.get(n), this.headers.get(n)))
            }
        }
        class yF {
            encodeKey(t) {
                return Xv(t)
            }
            encodeValue(t) {
                return Xv(t)
            }
            decodeKey(t) {
                return decodeURIComponent(t)
            }
            decodeValue(t) {
                return decodeURIComponent(t)
            }
        }
        const vF = /%(\d[a-f0-9])/gi
          , _F = {
            40: "@",
            "3A": ":",
            24: "$",
            "2C": ",",
            "3B": ";",
            "3D": "=",
            "3F": "?",
            "2F": "/"
        };
        function Xv(e) {
            return encodeURIComponent(e).replace(vF, (t,n)=>_F[n] ?? t)
        }
        function Ks(e) {
            return `${e}`
        }
        class yn {
            constructor(t={}) {
                if (this.updates = null,
                this.cloneFrom = null,
                this.encoder = t.encoder || new yF,
                t.fromString) {
                    if (t.fromObject)
                        throw new Error("Cannot specify both fromString and fromObject.");
                    this.map = function DF(e, t) {
                        const n = new Map;
                        return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(o=>{
                            const i = o.indexOf("=")
                              , [s,a] = -1 == i ? [t.decodeKey(o), ""] : [t.decodeKey(o.slice(0, i)), t.decodeValue(o.slice(i + 1))]
                              , u = n.get(s) || [];
                            u.push(a),
                            n.set(s, u)
                        }
                        ),
                        n
                    }(t.fromString, this.encoder)
                } else
                    t.fromObject ? (this.map = new Map,
                    Object.keys(t.fromObject).forEach(n=>{
                        const r = t.fromObject[n]
                          , o = Array.isArray(r) ? r.map(Ks) : [Ks(r)];
                        this.map.set(n, o)
                    }
                    )) : this.map = null
            }
            has(t) {
                return this.init(),
                this.map.has(t)
            }
            get(t) {
                this.init();
                const n = this.map.get(t);
                return n ? n[0] : null
            }
            getAll(t) {
                return this.init(),
                this.map.get(t) || null
            }
            keys() {
                return this.init(),
                Array.from(this.map.keys())
            }
            append(t, n) {
                return this.clone({
                    param: t,
                    value: n,
                    op: "a"
                })
            }
            appendAll(t) {
                const n = [];
                return Object.keys(t).forEach(r=>{
                    const o = t[r];
                    Array.isArray(o) ? o.forEach(i=>{
                        n.push({
                            param: r,
                            value: i,
                            op: "a"
                        })
                    }
                    ) : n.push({
                        param: r,
                        value: o,
                        op: "a"
                    })
                }
                ),
                this.clone(n)
            }
            set(t, n) {
                return this.clone({
                    param: t,
                    value: n,
                    op: "s"
                })
            }
            delete(t, n) {
                return this.clone({
                    param: t,
                    value: n,
                    op: "d"
                })
            }
            toString() {
                return this.init(),
                this.keys().map(t=>{
                    const n = this.encoder.encodeKey(t);
                    return this.map.get(t).map(r=>n + "=" + this.encoder.encodeValue(r)).join("&")
                }
                ).filter(t=>"" !== t).join("&")
            }
            clone(t) {
                const n = new yn({
                    encoder: this.encoder
                });
                return n.cloneFrom = this.cloneFrom || this,
                n.updates = (this.updates || []).concat(t),
                n
            }
            init() {
                null === this.map && (this.map = new Map),
                null !== this.cloneFrom && (this.cloneFrom.init(),
                this.cloneFrom.keys().forEach(t=>this.map.set(t, this.cloneFrom.map.get(t))),
                this.updates.forEach(t=>{
                    switch (t.op) {
                    case "a":
                    case "s":
                        const n = ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                        n.push(Ks(t.value)),
                        this.map.set(t.param, n);
                        break;
                    case "d":
                        if (void 0 === t.value) {
                            this.map.delete(t.param);
                            break
                        }
                        {
                            let r = this.map.get(t.param) || [];
                            const o = r.indexOf(Ks(t.value));
                            -1 !== o && r.splice(o, 1),
                            r.length > 0 ? this.map.set(t.param, r) : this.map.delete(t.param)
                        }
                    }
                }
                ),
                this.cloneFrom = this.updates = null)
            }
        }
        class CF {
            constructor() {
                this.map = new Map
            }
            set(t, n) {
                return this.map.set(t, n),
                this
            }
            get(t) {
                return this.map.has(t) || this.map.set(t, t.defaultValue()),
                this.map.get(t)
            }
            delete(t) {
                return this.map.delete(t),
                this
            }
            has(t) {
                return this.map.has(t)
            }
            keys() {
                return this.map.keys()
            }
        }
        function Kv(e) {
            return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer
        }
        function Qv(e) {
            return typeof Blob < "u" && e instanceof Blob
        }
        function Jv(e) {
            return typeof FormData < "u" && e instanceof FormData
        }
        class Bo {
            constructor(t, n, r, o) {
                let i;
                if (this.url = n,
                this.body = null,
                this.reportProgress = !1,
                this.withCredentials = !1,
                this.responseType = "json",
                this.method = t.toUpperCase(),
                function EF(e) {
                    switch (e) {
                    case "DELETE":
                    case "GET":
                    case "HEAD":
                    case "OPTIONS":
                    case "JSONP":
                        return !1;
                    default:
                        return !0
                    }
                }(this.method) || o ? (this.body = void 0 !== r ? r : null,
                i = o) : i = r,
                i && (this.reportProgress = !!i.reportProgress,
                this.withCredentials = !!i.withCredentials,
                i.responseType && (this.responseType = i.responseType),
                i.headers && (this.headers = i.headers),
                i.context && (this.context = i.context),
                i.params && (this.params = i.params)),
                this.headers || (this.headers = new Lt),
                this.context || (this.context = new CF),
                this.params) {
                    const s = this.params.toString();
                    if (0 === s.length)
                        this.urlWithParams = n;
                    else {
                        const a = n.indexOf("?");
                        this.urlWithParams = n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s
                    }
                } else
                    this.params = new yn,
                    this.urlWithParams = n
            }
            serializeBody() {
                return null === this.body ? null : Kv(this.body) || Qv(this.body) || Jv(this.body) || function wF(e) {
                    return typeof URLSearchParams < "u" && e instanceof URLSearchParams
                }(this.body) || "string" == typeof this.body ? this.body : this.body instanceof yn ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
            }
            detectContentTypeHeader() {
                return null === this.body || Jv(this.body) ? null : Qv(this.body) ? this.body.type || null : Kv(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof yn ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null
            }
            clone(t={}) {
                const n = t.method || this.method
                  , r = t.url || this.url
                  , o = t.responseType || this.responseType
                  , i = void 0 !== t.body ? t.body : this.body
                  , s = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials
                  , a = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
                let u = t.headers || this.headers
                  , l = t.params || this.params;
                const c = t.context ?? this.context;
                return void 0 !== t.setHeaders && (u = Object.keys(t.setHeaders).reduce((d,f)=>d.set(f, t.setHeaders[f]), u)),
                t.setParams && (l = Object.keys(t.setParams).reduce((d,f)=>d.set(f, t.setParams[f]), l)),
                new Bo(n,r,i,{
                    params: l,
                    headers: u,
                    context: c,
                    reportProgress: a,
                    responseType: o,
                    withCredentials: s
                })
            }
        }
        var De = (()=>((De = De || {})[De.Sent = 0] = "Sent",
        De[De.UploadProgress = 1] = "UploadProgress",
        De[De.ResponseHeader = 2] = "ResponseHeader",
        De[De.DownloadProgress = 3] = "DownloadProgress",
        De[De.Response = 4] = "Response",
        De[De.User = 5] = "User",
        De))();
        class qc {
            constructor(t, n=200, r="OK") {
                this.headers = t.headers || new Lt,
                this.status = void 0 !== t.status ? t.status : n,
                this.statusText = t.statusText || r,
                this.url = t.url || null,
                this.ok = this.status >= 200 && this.status < 300
            }
        }
        class Zc extends qc {
            constructor(t={}) {
                super(t),
                this.type = De.ResponseHeader
            }
            clone(t={}) {
                return new Zc({
                    headers: t.headers || this.headers,
                    status: void 0 !== t.status ? t.status : this.status,
                    statusText: t.statusText || this.statusText,
                    url: t.url || this.url || void 0
                })
            }
        }
        class Tr extends qc {
            constructor(t={}) {
                super(t),
                this.type = De.Response,
                this.body = void 0 !== t.body ? t.body : null
            }
            clone(t={}) {
                return new Tr({
                    body: void 0 !== t.body ? t.body : this.body,
                    headers: t.headers || this.headers,
                    status: void 0 !== t.status ? t.status : this.status,
                    statusText: t.statusText || this.statusText,
                    url: t.url || this.url || void 0
                })
            }
        }
        class e0 extends qc {
            constructor(t) {
                super(t, 0, "Unknown Error"),
                this.name = "HttpErrorResponse",
                this.ok = !1,
                this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${t.url || "(unknown url)"}` : `Http failure response for ${t.url || "(unknown url)"}: ${t.status} ${t.statusText}`,
                this.error = t.error || null
            }
        }
        function Yc(e, t) {
            return {
                body: t,
                headers: e.headers,
                context: e.context,
                observe: e.observe,
                params: e.params,
                reportProgress: e.reportProgress,
                responseType: e.responseType,
                withCredentials: e.withCredentials
            }
        }
        let t0 = (()=>{
            class e {
                constructor(n) {
                    this.handler = n
                }
                request(n, r, o={}) {
                    let i;
                    if (n instanceof Bo)
                        i = n;
                    else {
                        let u, l;
                        u = o.headers instanceof Lt ? o.headers : new Lt(o.headers),
                        o.params && (l = o.params instanceof yn ? o.params : new yn({
                            fromObject: o.params
                        })),
                        i = new Bo(n,r,void 0 !== o.body ? o.body : null,{
                            headers: u,
                            context: o.context,
                            params: l,
                            reportProgress: o.reportProgress,
                            responseType: o.responseType || "json",
                            withCredentials: o.withCredentials
                        })
                    }
                    const s = da(i).pipe(function gF(e, t) {
                        return oe(t) ? Zo(e, t, 1) : Zo(e, 1)
                    }(u=>this.handler.handle(u)));
                    if (n instanceof Bo || "events" === o.observe)
                        return s;
                    const a = s.pipe(function mF(e, t) {
                        return Vt((n,r)=>{
                            let o = 0;
                            n.subscribe(Ht(r, i=>e.call(t, i, o++) && r.next(i)))
                        }
                        )
                    }(u=>u instanceof Tr));
                    switch (o.observe || "body") {
                    case "body":
                        switch (i.responseType) {
                        case "arraybuffer":
                            return a.pipe(_n(u=>{
                                if (null !== u.body && !(u.body instanceof ArrayBuffer))
                                    throw new Error("Response is not an ArrayBuffer.");
                                return u.body
                            }
                            ));
                        case "blob":
                            return a.pipe(_n(u=>{
                                if (null !== u.body && !(u.body instanceof Blob))
                                    throw new Error("Response is not a Blob.");
                                return u.body
                            }
                            ));
                        case "text":
                            return a.pipe(_n(u=>{
                                if (null !== u.body && "string" != typeof u.body)
                                    throw new Error("Response is not a string.");
                                return u.body
                            }
                            ));
                        default:
                            return a.pipe(_n(u=>u.body))
                        }
                    case "response":
                        return a;
                    default:
                        throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)
                    }
                }
                delete(n, r={}) {
                    return this.request("DELETE", n, r)
                }
                get(n, r={}) {
                    return this.request("GET", n, r)
                }
                head(n, r={}) {
                    return this.request("HEAD", n, r)
                }
                jsonp(n, r) {
                    return this.request("JSONP", n, {
                        params: (new yn).append(r, "JSONP_CALLBACK"),
                        observe: "body",
                        responseType: "json"
                    })
                }
                options(n, r={}) {
                    return this.request("OPTIONS", n, r)
                }
                patch(n, r, o={}) {
                    return this.request("PATCH", n, Yc(o, r))
                }
                post(n, r, o={}) {
                    return this.request("POST", n, Yc(o, r))
                }
                put(n, r, o={}) {
                    return this.request("PUT", n, Yc(o, r))
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(Ys))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        function o0(e, t) {
            return t(e)
        }
        function MF(e, t) {
            return (n,r)=>t.intercept(n, {
                handle: o=>e(o, r)
            })
        }
        const SF = new M("")
          , jo = new M("")
          , s0 = new M("");
        function AF() {
            let e = null;
            return (t,n)=>{
                null === e && (e = (q(SF, {
                    optional: !0
                }) ?? []).reduceRight(MF, o0));
                const r = q(Bl)
                  , o = r.add();
                return e(t, n).pipe(Yv(()=>r.remove(o)))
            }
        }
        let a0 = (()=>{
            class e extends Ys {
                constructor(n, r) {
                    super(),
                    this.backend = n,
                    this.injector = r,
                    this.chain = null,
                    this.pendingTasks = q(Bl)
                }
                handle(n) {
                    if (null === this.chain) {
                        const o = Array.from(new Set([...this.injector.get(jo), ...this.injector.get(s0, [])]));
                        this.chain = o.reduceRight((i,s)=>function IF(e, t, n) {
                            return (r,o)=>n.runInContext(()=>t(r, i=>e(i, o)))
                        }(i, s, this.injector), o0)
                    }
                    const r = this.pendingTasks.add();
                    return this.chain(n, o=>this.backend.handle(o)).pipe(Yv(()=>this.pendingTasks.remove(r)))
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(Xs),V(An))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const FF = /^\)\]\}',?\n/;
        let l0 = (()=>{
            class e {
                constructor(n) {
                    this.xhrFactory = n
                }
                handle(n) {
                    if ("JSONP" === n.method)
                        throw new C(-2800,!1);
                    const r = this.xhrFactory;
                    return (r.\u0275loadImpl ? Yo(r.\u0275loadImpl()) : da(null)).pipe(Id(()=>new Te(i=>{
                        const s = r.build();
                        if (s.open(n.method, n.urlWithParams),
                        n.withCredentials && (s.withCredentials = !0),
                        n.headers.forEach((g,y)=>s.setRequestHeader(g, y.join(","))),
                        n.headers.has("Accept") || s.setRequestHeader("Accept", "application/json, text/plain, */*"),
                        !n.headers.has("Content-Type")) {
                            const g = n.detectContentTypeHeader();
                            null !== g && s.setRequestHeader("Content-Type", g)
                        }
                        if (n.responseType) {
                            const g = n.responseType.toLowerCase();
                            s.responseType = "json" !== g ? g : "text"
                        }
                        const a = n.serializeBody();
                        let u = null;
                        const l = ()=>{
                            if (null !== u)
                                return u;
                            const g = s.statusText || "OK"
                              , y = new Lt(s.getAllResponseHeaders())
                              , v = function OF(e) {
                                return "responseURL"in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null
                            }(s) || n.url;
                            return u = new Zc({
                                headers: y,
                                status: s.status,
                                statusText: g,
                                url: v
                            }),
                            u
                        }
                          , c = ()=>{
                            let {headers: g, status: y, statusText: v, url: m} = l()
                              , b = null;
                            204 !== y && (b = typeof s.response > "u" ? s.responseText : s.response),
                            0 === y && (y = b ? 200 : 0);
                            let S = y >= 200 && y < 300;
                            if ("json" === n.responseType && "string" == typeof b) {
                                const F = b;
                                b = b.replace(FF, "");
                                try {
                                    b = "" !== b ? JSON.parse(b) : null
                                } catch (Me) {
                                    b = F,
                                    S && (S = !1,
                                    b = {
                                        error: Me,
                                        text: b
                                    })
                                }
                            }
                            S ? (i.next(new Tr({
                                body: b,
                                headers: g,
                                status: y,
                                statusText: v,
                                url: m || void 0
                            })),
                            i.complete()) : i.error(new e0({
                                error: b,
                                headers: g,
                                status: y,
                                statusText: v,
                                url: m || void 0
                            }))
                        }
                          , d = g=>{
                            const {url: y} = l()
                              , v = new e0({
                                error: g,
                                status: s.status || 0,
                                statusText: s.statusText || "Unknown Error",
                                url: y || void 0
                            });
                            i.error(v)
                        }
                        ;
                        let f = !1;
                        const h = g=>{
                            f || (i.next(l()),
                            f = !0);
                            let y = {
                                type: De.DownloadProgress,
                                loaded: g.loaded
                            };
                            g.lengthComputable && (y.total = g.total),
                            "text" === n.responseType && s.responseText && (y.partialText = s.responseText),
                            i.next(y)
                        }
                          , p = g=>{
                            let y = {
                                type: De.UploadProgress,
                                loaded: g.loaded
                            };
                            g.lengthComputable && (y.total = g.total),
                            i.next(y)
                        }
                        ;
                        return s.addEventListener("load", c),
                        s.addEventListener("error", d),
                        s.addEventListener("timeout", d),
                        s.addEventListener("abort", d),
                        n.reportProgress && (s.addEventListener("progress", h),
                        null !== a && s.upload && s.upload.addEventListener("progress", p)),
                        s.send(a),
                        i.next({
                            type: De.Sent
                        }),
                        ()=>{
                            s.removeEventListener("error", d),
                            s.removeEventListener("abort", d),
                            s.removeEventListener("load", c),
                            s.removeEventListener("timeout", d),
                            n.reportProgress && (s.removeEventListener("progress", h),
                            null !== a && s.upload && s.upload.removeEventListener("progress", p)),
                            s.readyState !== s.DONE && s.abort()
                        }
                    }
                    )))
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(wD))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const Xc = new M("XSRF_ENABLED")
          , c0 = new M("XSRF_COOKIE_NAME",{
            providedIn: "root",
            factory: ()=>"XSRF-TOKEN"
        })
          , d0 = new M("XSRF_HEADER_NAME",{
            providedIn: "root",
            factory: ()=>"X-XSRF-TOKEN"
        });
        class f0 {
        }
        let kF = (()=>{
            class e {
                constructor(n, r, o) {
                    this.doc = n,
                    this.platform = r,
                    this.cookieName = o,
                    this.lastCookieString = "",
                    this.lastToken = null,
                    this.parseCount = 0
                }
                getToken() {
                    if ("server" === this.platform)
                        return null;
                    const n = this.doc.cookie || "";
                    return n !== this.lastCookieString && (this.parseCount++,
                    this.lastToken = fD(n, this.cookieName),
                    this.lastCookieString = n),
                    this.lastToken
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(fn),V(Tn),V(c0))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        function LF(e, t) {
            const n = e.url.toLowerCase();
            if (!q(Xc) || "GET" === e.method || "HEAD" === e.method || n.startsWith("http://") || n.startsWith("https://"))
                return t(e);
            const r = q(f0).getToken()
              , o = q(d0);
            return null != r && !e.headers.has(o) && (e = e.clone({
                headers: e.headers.set(o, r)
            })),
            t(e)
        }
        var se = (()=>((se = se || {})[se.Interceptors = 0] = "Interceptors",
        se[se.LegacyInterceptors = 1] = "LegacyInterceptors",
        se[se.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration",
        se[se.NoXsrfProtection = 3] = "NoXsrfProtection",
        se[se.JsonpSupport = 4] = "JsonpSupport",
        se[se.RequestsMadeViaParent = 5] = "RequestsMadeViaParent",
        se[se.Fetch = 6] = "Fetch",
        se))();
        function Vn(e, t) {
            return {
                \u0275kind: e,
                \u0275providers: t
            }
        }
        function VF(...e) {
            const t = [t0, l0, a0, {
                provide: Ys,
                useExisting: a0
            }, {
                provide: Xs,
                useExisting: l0
            }, {
                provide: jo,
                useValue: LF,
                multi: !0
            }, {
                provide: Xc,
                useValue: !0
            }, {
                provide: f0,
                useClass: kF
            }];
            for (const n of e)
                t.push(...n.\u0275providers);
            return function Cu(e) {
                return {
                    \u0275providers: e
                }
            }(t)
        }
        const h0 = new M("LEGACY_INTERCEPTOR_FN");
        let BF = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275mod = $t({
                type: e
            }),
            e.\u0275inj = Et({
                providers: [VF(Vn(se.LegacyInterceptors, [{
                    provide: h0,
                    useFactory: AF
                }, {
                    provide: jo,
                    useExisting: h0,
                    multi: !0
                }]))]
            }),
            e
        }
        )()
          , WF = (()=>{
            class e {
                constructor(n) {
                    this.http = n
                }
                sendOrder(n) {
                    return this.http.post("https://testologia.site/burgers-order", n)
                }
                getData() {
                    return this.http.get("https://testologia.site/burgers-data?extra=black")
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(V(t0))
            }
            ,
            e.\u0275prov = z({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        function qF(e, t) {
            if (1 & e) {
                const n = ul();
                H(0, "div", 47),
                Xe(1, "img", 48),
                H(2, "div", 49),
                te(3),
                U(),
                H(4, "div", 50),
                te(5),
                U(),
                H(6, "div", 51)(7, "div", 52)(8, "div", 53),
                te(9),
                U(),
                H(10, "div", 54),
                te(11),
                U()(),
                H(12, "div", 55)(13, "button", 56),
                Se("click", function() {
                    const i = qn(n).$implicit
                      , s = ll()
                      , a = _r(63);
                    return Zn(s.scrollTo(a, i))
                }),
                H(14, "span"),
                te(15, "\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c"),
                U(),
                H(16, "span"),
                function Nf() {
                    T.lFrame.currentNamespace = df
                }(),
                H(17, "svg", 57),
                Xe(18, "path", 58),
                U()()()()()()
            }
            if (2 & e) {
                const n = t.$implicit
                  , r = ll();
                ot(1),
                cl("src", n.image, _u),
                ot(2),
                Do(n.title),
                ot(2),
                Do(n.text),
                ot(4),
                ml("", n.price, " ", r.currency, ""),
                ot(2),
                cs("", n.grams, " \u0433\u0440")
            }
        }
        const Kc = function(e) {
            return {
                error: e
            }
        };
        let ZF = (()=>{
            class e {
                constructor(n, r) {
                    this.fb = n,
                    this.appService = r,
                    this.currency = "$",
                    this.form = this.fb.group({
                        order: ["", Sc.required],
                        name: ["", Sc.required],
                        phone: ["", Sc.required]
                    })
                }
                ngOnInit() {
                    this.appService.getData().subscribe(n=>this.productsData = n)
                }
                scrollTo(n, r) {
                    n.scrollIntoView({
                        behavior: "smooth"
                    }),
                    r && this.form.patchValue({
                        order: r.title + " (" + r.price + " " + this.currency + ")"
                    })
                }
                confirmOrder() {
                    this.form.valid && this.appService.sendOrder(this.form.value).subscribe({
                        next: n=>{
                            alert(n.message),
                            this.form.reset()
                        }
                        ,
                        error: n=>{
                            alert(n.error.message)
                        }
                    })
                }
                changeCurrency() {
                    let n = "$"
                      , r = 1;
                    "$" === this.currency && (n = "\u20bd",
                    r = 80),
                    "\u20bd" === this.currency && (n = "BYN",
                    r = 3),
                    "BYN" === this.currency && (n = "\u20ac",
                    r = .9),
                    "\u20ac" === this.currency && (n = "\xa5",
                    r = 6.9),
                    this.currency = n,
                    this.productsData.forEach(o=>{
                        o.price = +(o.basePrice * r).toFixed(1)
                    }
                    )
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(_(hF),_(WF))
            }
            ,
            e.\u0275cmp = zd({
                type: e,
                selectors: [["app-root"]],
                decls: 86,
                vars: 16,
                consts: [[1, "main"], [1, "header"], [1, "container"], [1, "logo"], ["src", "./assets/images/Logo.png", "alt", "Logo"], [1, "menu"], [1, "menu-list"], [1, "menu-item"], [3, "click"], ["title", "\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0432\u0430\u043b\u044e\u0442\u0443", 1, "currency", 3, "click"], [1, "main-content"], [1, "main-info"], [1, "main-small-info"], [1, "main-title"], [1, "main-text"], [1, "main-action"], [1, "button", 3, "click"], ["src", "./assets/images/main_burger.png", "alt", "Big burger", 1, "main-image"], ["id", "why", 1, "why"], ["why", ""], [1, "why-title", "common-title"], [1, "why-items"], [1, "why-item"], ["src", "./assets/images/burger.png", "alt", "burger"], [1, "why-item-title"], [1, "why-item-text"], ["src", "./assets/images/meat.png", "alt", "meat"], ["src", "./assets/images/food truck.png", "alt", "food truck"], ["id", "products", 1, "products"], ["products", ""], [1, "products-title", "common-title"], [1, "products-items"], ["class", "products-item", 4, "ngFor", "ngForOf"], ["id", "order", 1, "order"], ["order", ""], [1, "order-title", "common-title"], ["src", "./assets/images/order_image.png", "alt", ""], [1, "order-form"], [1, "order-form-text"], [1, "order-form-inputs", 3, "formGroup"], [1, "order-form-input"], ["type", "text", "placeholder", "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u043e\u0432\u0430\u0440 \u0432 \u0441\u043f\u0438\u0441\u043a\u0435", "id", "burger", "formControlName", "order", "readonly", ""], ["type", "text", "placeholder", "\u0412\u0430\u0448\u0435 \u0438\u043c\u044f", "id", "name", "formControlName", "name"], ["type", "text", "placeholder", "\u0412\u0430\u0448 \u0442\u0435\u043b\u0435\u0444\u043e\u043d", "id", "phone", "formControlName", "phone"], [1, "button", 3, "disabled", "click"], [1, "footer"], [1, "rights"], [1, "products-item"], ["alt", "burger", 3, "src"], [1, "products-item-title"], [1, "products-item-text"], [1, "products-item-extra"], [1, "products-item-info"], [1, "products-item-price"], [1, "products-item-weight"], [1, "products-item-action"], [1, "button", "products-button", 3, "click"], ["width", "24", "height", "25", "viewBox", "0 0 24 25", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M17 18.5C17.5304 18.5 18.0391 18.7107 18.4142 19.0858C18.7893 19.4609 19 19.9696 19 20.5C19 21.0304 18.7893 21.5391 18.4142 21.9142C18.0391 22.2893 17.5304 22.5 17 22.5C16.4696 22.5 15.9609 22.2893 15.5858 21.9142C15.2107 21.5391 15 21.0304 15 20.5C15 19.39 15.89 18.5 17 18.5ZM1 2.5H4.27L5.21 4.5H20C20.2652 4.5 20.5196 4.60536 20.7071 4.79289C20.8946 4.98043 21 5.23478 21 5.5C21 5.67 20.95 5.84 20.88 6L17.3 12.47C16.96 13.08 16.3 13.5 15.55 13.5H8.1L7.2 15.13L7.17 15.25C7.17 15.3163 7.19634 15.3799 7.24322 15.4268C7.29011 15.4737 7.3537 15.5 7.42 15.5H19V17.5H7C6.46957 17.5 5.96086 17.2893 5.58579 16.9142C5.21071 16.5391 5 16.0304 5 15.5C5 15.15 5.09 14.82 5.24 14.54L6.6 12.09L3 4.5H1V2.5ZM7 18.5C7.53043 18.5 8.03914 18.7107 8.41421 19.0858C8.78929 19.4609 9 19.9696 9 20.5C9 21.0304 8.78929 21.5391 8.41421 21.9142C8.03914 22.2893 7.53043 22.5 7 22.5C6.46957 22.5 5.96086 22.2893 5.58579 21.9142C5.21071 21.5391 5 21.0304 5 20.5C5 19.39 5.89 18.5 7 18.5ZM16 11.5L18.78 6.5H6.14L8.5 11.5H16Z", "fill", "#191411"]],
                template: function(n, r) {
                    if (1 & n) {
                        const o = ul();
                        H(0, "section", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3),
                        Xe(4, "img", 4),
                        U(),
                        H(5, "nav", 5)(6, "ul", 6)(7, "li", 7)(8, "a", 8),
                        Se("click", function() {
                            qn(o);
                            const s = _r(32);
                            return Zn(r.scrollTo(s))
                        }),
                        te(9, "\u041f\u043e\u0447\u0435\u043c\u0443 \u0443 \u043d\u0430\u0441"),
                        U()(),
                        H(10, "li", 7)(11, "a", 8),
                        Se("click", function() {
                            qn(o);
                            const s = _r(56);
                            return Zn(r.scrollTo(s))
                        }),
                        te(12, "\u041c\u0435\u043d\u044e \u0431\u0443\u0440\u0433\u0435\u0440\u043e\u0432"),
                        U()(),
                        H(13, "li", 7)(14, "a", 8),
                        Se("click", function() {
                            qn(o);
                            const s = _r(63);
                            return Zn(r.scrollTo(s))
                        }),
                        te(15, "\u041e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043a\u0430\u0437\u0430"),
                        U()()()(),
                        H(16, "div", 9),
                        Se("click", function() {
                            return r.changeCurrency()
                        }),
                        te(17),
                        U()()(),
                        H(18, "section", 10)(19, "div", 2)(20, "div", 11)(21, "div", 12),
                        te(22, "\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u043d\u044e"),
                        U(),
                        H(23, "h1", 13),
                        te(24, "\u0431\u0443\u0440\u0433\u0435\u0440 \u0447\u0435\u0434\u0434\u0435\u0440"),
                        U(),
                        H(25, "p", 14),
                        te(26, " \u041c\u044b \u043e\u0431\u043d\u043e\u0432\u0438\u043b\u0438 \u043d\u0430\u0448\u0435 \u043c\u0435\u043d\u044e, \u0441\u043f\u0435\u0448\u0438\u0442\u0435 \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0441\u0435\u0437\u043e\u043d\u043d\u044b\u0435 \u043d\u043e\u0432\u0438\u043d\u043a\u0438 \u0438 \u043d\u0430\u0441\u043b\u0430\u0434\u0438\u0442\u044c\u0441\u044f \u043e\u0442\u043b\u0438\u0447\u043d\u044b\u043c \u0432\u043a\u0443\u0441\u043e\u043c \u043d\u0430\u0448\u0438\u0445 \u0431\u0443\u0440\u0433\u0435\u0440\u043e\u0432. \u0413\u043e\u0442\u043e\u0432\u0438\u043c \u0434\u043b\u044f \u0432\u0430\u0441 \u043b\u0443\u0447\u0448\u0438\u0435 \u0431\u0443\u0440\u0433\u0435\u0440\u044b \u0432 \u0433\u043e\u0440\u043e\u0434\u0435 \u0438\u0437 \u043e\u0442\u0431\u043e\u0440\u043d\u043e\u0439 \u043c\u0440\u0430\u043c\u043e\u0440\u043d\u043e\u0439 \u0433\u043e\u0432\u044f\u0434\u0438\u043d\u044b. "),
                        U(),
                        H(27, "div", 15)(28, "button", 16),
                        Se("click", function() {
                            qn(o);
                            const s = _r(56);
                            return Zn(r.scrollTo(s))
                        }),
                        te(29, "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043c\u0435\u043d\u044e"),
                        U()(),
                        Xe(30, "img", 17),
                        U()()()(),
                        H(31, "section", 18, 19)(33, "div", 2)(34, "div", 20),
                        te(35, "\u043f\u043e\u0447\u0435\u043c\u0443 \u043d\u0430\u0441 \u0432\u044b\u0431\u0438\u0440\u0430\u044e\u0442?"),
                        U(),
                        H(36, "div", 21)(37, "div", 22),
                        Xe(38, "img", 23),
                        H(39, "div", 24),
                        te(40, "\u0410\u0432\u0442\u043e\u0440\u0441\u043a\u0438\u0435 \u0440\u0435\u0446\u0435\u043f\u0442\u044b"),
                        U(),
                        H(41, "div", 25),
                        te(42, "\u041d\u0430\u0448\u0438 \u0431\u0443\u0440\u0433\u0435\u0440\u044b \u043e\u0431\u043b\u0430\u0434\u0430\u044e\u0442 \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u043c \u0441\u043e\u0447\u0435\u0442\u0430\u043d\u0438\u0435\u043c \u0432\u043a\u0443\u0441\u043e\u0432 \u0438\xa0\u043d\u0435\xa0\u043f\u043e\u0445\u043e\u0436\u0438 \u043d\u0438\xa0\u043d\u0430\xa0\u043a\u0430\u043a\u0438\u0435 \u0434\u0440\u0443\u0433\u0438\u0435. \u041c\u044b\xa0\u0442\u0449\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u043e\u0442\u0431\u0438\u0440\u0430\u0435\u043c \u043b\u0443\u0447\u0448\u0438\u0435 \u0438\u043d\u0433\u0440\u0435\u0434\u0438\u0435\u043d\u0442\u044b \u0438\xa0\u0441\u043e\u0447\u0435\u0442\u0430\u043d\u0438\u044f \u0432\u043a\u0443\u0441\u043e\u0432 \u0434\u043b\u044f \u043d\u0430\u0448\u0435\u0433\u043e \u043c\u0435\u043d\u044e."),
                        U()(),
                        H(43, "div", 22),
                        Xe(44, "img", 26),
                        H(45, "div", 24),
                        te(46, "\u041c\u0440\u0430\u043c\u043e\u0440\u043d\u0430\u044f \u0433\u043e\u0432\u044f\u0434\u0438\u043d\u0430"),
                        U(),
                        H(47, "div", 25),
                        te(48, "\u0414\u043b\u044f \u043d\u0430\u0448\u0438\u0445 \u0431\u0443\u0440\u0433\u0435\u0440\u043e\u0432 \u043c\u044b\xa0\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u043e\u0442\u0431\u043e\u0440\u043d\u0443\u044e 100% \u043c\u0440\u0430\u043c\u043e\u0440\u043d\u0443\u044e \u0433\u043e\u0432\u044f\u0434\u0438\u043d\u0443, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0437\u0430\u043a\u0443\u043f\u0430\u0435\u043c \u0438\u0441\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0443\xa0\u0444\u0435\u0440\u043c\u0435\u0440\u043e\u0432. \u041c\u044b\xa0\u0443\u0432\u0435\u0440\u0435\u043d\u044b \u0432\xa0\u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043d\u0430\u0448\u0435\u0433\u043e \u043c\u044f\u0441\u0430."),
                        U()(),
                        H(49, "div", 22),
                        Xe(50, "img", 27),
                        H(51, "div", 24),
                        te(52, "\u0411\u044b\u0441\u0442\u0440\u0430\u044f \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430"),
                        U(),
                        H(53, "div", 25),
                        te(54, "\u041c\u044b\xa0\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u043c \u0432\xa0\u043f\u0440\u0435\u0434\u0435\u043b\u0430\u0445 \u041c\u041a\u0410\u0414 \u0437\u0430\xa030\xa0\u043c\u0438\u043d\u0443\u0442, \u0430\xa0\u0435\u0441\u043b\u0438 \u043d\u0435\xa0\u0443\u0441\u043f\u0435\u0435\u043c\xa0\u2014 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e. \u041c\u044b\xa0\u0442\u0449\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0443\u043f\u0430\u043a\u043e\u0432\u044b\u0432\u0430\u0435\u043c \u043d\u0430\u0448\u0438 \u0431\u0443\u0440\u0433\u0435\u0440\u044b, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\xa0\u0434\u043e\u0440\u043e\u0433\u0435 \u043e\u043d\u0438 \u043d\u0435\xa0\u043e\u0441\u0442\u044b\u043b\u0438."),
                        U()()()()(),
                        H(55, "section", 28, 29)(57, "div", 2)(58, "div", 30),
                        te(59, "\u0432\u044b\u0431\u0435\u0440\u0438 \u0441\u0432\u043e\u0439 \u0431\u0443\u0440\u0433\u0435\u0440"),
                        U(),
                        H(60, "div", 31),
                        function ag(e, t, n, r, o, i, s, a) {
                            const u = D()
                              , l = G()
                              , c = e + $
                              , d = l.firstCreatePass ? function SM(e, t, n, r, o, i, s, a, u) {
                                const l = t.consts
                                  , c = cr(t, e, 4, s || null, sn(l, a));
                                qu(t, n, c, sn(l, u)),
                                pi(t, c);
                                const d = c.tView = Wu(2, c, r, o, i, t.directiveRegistry, t.pipeRegistry, null, t.schemas, l, null);
                                return null !== t.queries && (t.queries.template(t, c),
                                d.queries = t.queries.embeddedTView(c)),
                                c
                            }(c, l, u, t, n, r, o, i, s) : l.data[c];
                            Tt(d, !1);
                            const f = ug(l, u, d, e);
                            hi() && Fi(l, u, f, d),
                            Pe(f, u),
                            Xi(u, u[c] = Fp(f, u, f, d)),
                            ui(d) && Gu(l, u, d),
                            null != s && zu(u, d, a)
                        }(61, qF, 19, 6, "div", 32),
                        U()()(),
                        H(62, "section", 33, 34)(64, "div", 2)(65, "div", 35),
                        te(66, "\u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043a\u0430\u0437\u0430"),
                        U(),
                        Xe(67, "img", 36),
                        H(68, "div", 37)(69, "div", 38),
                        te(70, "\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0438 \u043d\u0430\u0448 \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440 \u0441\u0432\u044f\u0436\u0435\u0442\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u0434\u043b\u044f \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u0430"),
                        U(),
                        H(71, "div", 39)(72, "div", 40),
                        Xe(73, "input", 41),
                        U(),
                        H(74, "div", 40),
                        Xe(75, "input", 42),
                        U(),
                        H(76, "div", 40),
                        Xe(77, "input", 43),
                        U(),
                        H(78, "button", 44),
                        Se("click", function() {
                            return r.confirmOrder()
                        }),
                        te(79, "\u041e\u0444\u043e\u0440\u043c\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437"),
                        U()()()()(),
                        H(80, "footer", 45)(81, "div", 2)(82, "div", 3),
                        Xe(83, "img", 4),
                        U(),
                        H(84, "div", 46),
                        te(85, "\u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b"),
                        U()()()
                    }
                    if (2 & n) {
                        let o, i, s;
                        ot(17),
                        Do(r.currency),
                        ot(44),
                        mo("ngForOf", r.productsData),
                        ot(10),
                        mo("formGroup", r.form),
                        ot(1),
                        us(gs(10, Kc, (null == (o = r.form.get("order")) ? null : o.invalid) && ((null == (o = r.form.get("order")) ? null : o.dirty) || (null == (o = r.form.get("order")) ? null : o.touched)))),
                        ot(2),
                        us(gs(12, Kc, (null == (i = r.form.get("name")) ? null : i.invalid) && ((null == (i = r.form.get("order")) ? null : i.dirty) || (null == (i = r.form.get("order")) ? null : i.touched)))),
                        ot(2),
                        us(gs(14, Kc, (null == (s = r.form.get("phone")) ? null : s.invalid) && ((null == (s = r.form.get("order")) ? null : s.dirty) || (null == (s = r.form.get("order")) ? null : s.touched)))),
                        ot(2),
                        mo("disabled", !r.form.valid)
                    }
                },
                dependencies: [gD, ks, gv, mv, Zs, Uc],
                styles: [".main[_ngcontent-%COMP%]{overflow:hidden;background-image:url(main_bg.c313eef8291e55b2.png);background-position:top center;background-repeat:no-repeat}.why[_ngcontent-%COMP%]{background-image:url(whybg.6bea4b46a58430e3.png);background-position:top center;background-size:initial;padding-bottom:180px}.common-title[_ngcontent-%COMP%]{font-family:Merriweather,sans-serif;font-size:64px;line-height:80px;text-align:center;letter-spacing:.03em;text-transform:uppercase}.why-items[_ngcontent-%COMP%]{margin-top:60px;display:grid;gap:100px;grid-template-columns:repeat(3,312px);justify-content:center}.why-item[_ngcontent-%COMP%]{text-align:center}.why-item-title[_ngcontent-%COMP%]{font-size:24px;line-height:29px;padding:24px 0}.why-item-text[_ngcontent-%COMP%]{font-size:16px;line-height:140%}.products[_ngcontent-%COMP%]{background-image:url(burgers_bg.0a004c0a8419a04e.png);background-position:top center;background-repeat:no-repeat;background-size:2600px;padding-bottom:180px}.products-items[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,384px);gap:24px;margin-top:60px}.products-item[_ngcontent-%COMP%]{padding:30px;background-color:#211a16;border:1px solid #353535;border-radius:16px}.products-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;height:250px}.products-item-title[_ngcontent-%COMP%]{font-size:24px;line-height:29px;padding:24px 0}.products-item-text[_ngcontent-%COMP%]{font-size:16px;line-height:140%;margin-bottom:24px}.products-item-extra[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.products-item-price[_ngcontent-%COMP%]{font-size:32px;line-height:39px;margin-bottom:8px}.products-item-weight[_ngcontent-%COMP%]{font-size:16px;line-height:18px;color:#757575}.products-button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:182px;height:62px}.products-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{margin-right:10px}.order[_ngcontent-%COMP%]{background-image:url(order_bg.83b610206c93b25c.png);background-position:top center;background-repeat:no-repeat;padding-bottom:180px;overflow:hidden}.order[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{position:relative}.order[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;top:0;right:calc(100% - 764px);z-index:-1}.order-form[_ngcontent-%COMP%]{background-color:#211a16;border:1px solid #353535;border-radius:16px;margin-top:60px;max-width:426px;box-sizing:border-box;padding:60px 40px;margin-left:674px}.order-form-text[_ngcontent-%COMP%]{font-size:24px;line-height:29px;text-align:center}.order-form-inputs[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-top:40px}.order-form-input[_ngcontent-%COMP%]{background:linear-gradient(95.61deg,#DA8023 0%,#E2B438 100%);width:344px;height:62px;border-radius:8px;margin-bottom:20px;display:flex;align-items:center;justify-content:center}.order-form-input.error[_ngcontent-%COMP%]{background:red}.order-form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:20px 10px;background-color:#211a16;border-radius:8px;width:342px;height:60px;box-sizing:border-box;outline:none;border:1px solid transparent;color:#fff}.order-form-inputs[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{width:344px;height:62px}.footer[_ngcontent-%COMP%]{padding:60px 0}.footer[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.rights[_ngcontent-%COMP%]{font-size:16px;line-height:20px}"]
            }),
            e
        }
        )()
          , YF = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275mod = $t({
                type: e,
                bootstrap: [ZF]
            }),
            e.\u0275inj = Et({
                imports: [tx, pF, BF]
            }),
            e
        }
        )();
        J1().bootstrapModule(YF).catch(e=>console.error(e))
    }
}, oe=>{
    oe(oe.s = 497)
}
]);
