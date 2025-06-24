import anime from "animejs";
import "import-jquery";
import jquery from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.css";
import * as PIXI from "pixi.js";

window.$ = window.jQuery = jquery;

const MainLoop = (() => {
  let c = 1e3 / 60,
    d = 0,
    e = 0,
    f = 60,
    g = 0.9,
    h = 1e3,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = !1,
    n = !1,
    o = !1,
    p = typeof window === "object" ? window : globalThis,
    q =
      p.requestAnimationFrame ||
      (function () {
        let a = Date.now(),
          b,
          d;
        return function (e) {
          b = Date.now();
          d = Math.max(0, c - (b - a));
          a = b + d;
          return setTimeout(function () {
            e(b + d);
          }, d);
        };
      })(),
    r = p.cancelAnimationFrame || clearTimeout,
    s = function () {},
    t = s,
    u = s,
    v = s,
    w = s,
    x;

  function mainLoopFrame(a) {
    if (((x = q(mainLoopFrame)), !(a < e + l))) {
      d += a - e;
      e = a;
      t(a, d);

      if (a > i + h) {
        f = (g * j * 1e3) / (a - i) + (1 - g) * f;
        i = a;
        j = 0;
      }
      j++;
      k = 0;
      while (d >= c) {
        u(c);
        d -= c;
        if (++k >= 240) {
          o = !0;
          break;
        }
      }
      v(d / c);
      w(f, o);
      o = !1;
    }
  }

  return {
    getSimulationTimestep: () => c,
    setSimulationTimestep: function (a) {
      c = a;
      return this;
    },
    getFPS: () => f,
    getMaxAllowedFPS: () => 1e3 / l,
    setMaxAllowedFPS: function (a) {
      if (typeof a === "undefined") a = 1 / 0;
      if (a === 0) {
        this.stop();
      } else {
        l = 1e3 / a;
      }
      return this;
    },
    resetFrameDelta: () => {
      var a = d;
      d = 0;
      return a;
    },
    setBegin: function (a) {
      t = a || t;
      return this;
    },
    setUpdate: function (a) {
      u = a || u;
      return this;
    },
    setDraw: function (a) {
      v = a || v;
      return this;
    },
    setEnd: function (a) {
      w = a || w;
      return this;
    },
    start: function () {
      if (!n) {
        n = !0;
        x = q((a) => {
          v(1);
          m = !0;
          e = a;
          i = a;
          j = 0;
          x = q(mainLoopFrame);
        });
      }
      return this;
    },
    stop: function () {
      m = !1;
      n = !1;
      r(x);
      return this;
    },
    isRunning: () => m,
  };
})();

var z,
  V,
  opcode,
  v,
  regions,
  L,
  W,
  D,
  P,
  R,
  g,
  q,
  m,
  h,
  U,
  t,
  j,
  a,
  B,
  C,
  p,
  Y,
  o,
  Z,
  F,
  K,
  n,
  f,
  T,
  Q,
  d,
  s,
  J,
  x,
  S,
  b,
  X,
  H,
  r,
  M,
  u,
  E,
  _,
  i,
  w,
  G = "http://s.defly.io",
  k = "192.168.0.12:3000",
  websocketConnections = {},
  A = {},
  O = false,
  e = 0,
  N = false,
  zz = 1,
  Vz = 0,
  lz = 0,
  Dz = [],
  vz = 0,
  cz = 0,
  Pz = 0,
  Lz = [],
  Wz = [],
  gz = 0,
  qz = 0,
  mz = 0,
  hz = 0,
  Uz = {},
  tz = false,
  jz = 20,
  az = [],
  Bz = [],
  Cz = [],
  pz = 0,
  Yz = 0,
  oz = -1,
  Zz = 0,
  Fz = false,
  Kz = 0,
  nz = {},
  fz = {},
  Tz = {},
  $z = 1,
  Qz = -1,
  dz = true,
  sz = false,
  Jz = false,
  xz = false,
  Sz = 0,
  Rz = 0,
  yz = 0,
  bz = 0,
  Xz = 0,
  Hz = false,
  rz = 0,
  Mz = [8, 8, 8, 8, 8, 8, 8],
  uz = 0,
  Ez = 0;
function _z() {
  var z = new Date();
  return (
    (9 == z.getMonth() && 31 == z.getDate()) ||
    (10 == z.getMonth() && 1 == z.getDate())
  );
}
var iz,
  wz,
  Gz,
  kz,
  Iz,
  Az,
  Oz,
  ez,
  Nz,
  zV,
  VV,
  lV,
  DV,
  vV = false,
  cV = false,
  PV = false,
  LV = false,
  WV = false,
  gV = 2,
  qV = false,
  mV = false,
  hV = false,
  UV = false,
  tV = false,
  jV = null,
  aV = false,
  BV = false,
  CV = false,
  pV = false,
  YV = false,
  oV = false,
  ZV = 0,
  FV = false,
  KV = -1,
  nV = 2,
  fV = 9,
  TV = 48,
  $V = 24,
  QV = 0.6763066483560869,
  dV = 0.1,
  sV = 0,
  JV = 0,
  xV = 0,
  SV = false,
  RV = {},
  yV = {},
  bV = {},
  XV = {},
  HV = -1,
  rV = -1,
  MV = -1,
  uV = {},
  EV = {},
  _V = 0,
  iV = 0,
  wV = 4,
  GV = QV / 0.5036440950091954,
  kV = [
    4021759, 9587711, 16144895, 16736174, 16594229, 16747050, 9698816, 1630751,
    32823, 65468, 5625343,
  ],
  IV = [
    4021759, 16594229, 32823, 16747050, 9587711, 5625343, 1630751, 16144895,
    16252714, 16736174, 9698816, 65468,
  ],
  AV = IV.slice(),
  OV = [5066061, 4021759, 16594229],
  colorNames = [
    "Blue",
    "Red",
    "Dark Green",
    "Orange",
    "Purple",
    "Sky Blue",
    "Green",
    "Pink",
    "Yellow",
    "Rose",
    "Lime",
    "Turquoise",
  ],
  colorNamesNew = colorNames.slice(),
  zl = false,
  Vl = ["", "Blue", "Red"],
  ll = [
    "Dual Fire",
    "Speed Boost",
    "Clone",
    "Shield",
    "Flashbang",
    "Teleport",
    "Grenade",
  ],
  Dl = [10, 10, 10, 10, 10, 1, 10],
  vl = [30, 30, 30, 30, 30, 30, 30],
  cl = {};
function Pl(z) {
  if (cl[z]) return cl[z];
  if (uV[z]) return (cl[z] = AV[uV[z] - 1]), cl[z];
  if (z == HV && Qz >= 0) return (cl[z] = kV[Qz]), cl[z];
  do {
    var V = kV[Math.floor(Math.random() * kV.length)];
  } while (z != HV && cl[HV] == V);
  return (cl[z] = V), V;
}
function Ll(z) {
  return AV[z - 1];
}

var keyboardCommands = {
    MUP: "Move up",
    MDOWN: "Move down",
    MLEFT: "Move left",
    MRIGHT: "Move right",
    SHOOT: "Shoot",
    BUILD: "Build",
    SUPERPOWER: "Superpower",
    TLEFT: "Turn left",
    TRIGHT: "Turn right",
    TEAMMATES: "Show teammates",
    MOVEWMOUSE: "Move with mouse",
  },
  customKeyboardCommands = {
    MUP: [
      { code: "KeyW", keyCode: 87 },
      { code: "ArrowUp", keyCode: 38 },
    ],
    MDOWN: [
      { code: "KeyS", keyCode: 83 },
      { code: "ArrowDown", keyCode: 40 },
    ],
    MLEFT: [
      { code: "KeyA", keyCode: 65 },
      { code: "ArrowLeft", keyCode: 37 },
    ],
    MRIGHT: [
      { code: "KeyD", keyCode: 68 },
      { code: "ArrowRight", keyCode: 39 },
    ],
    SHOOT: [{ button: 0 }],
    BUILD: [{ button: 2 }, { code: "Space", keyCode: 32 }],
    SUPERPOWER: [
      { code: "KeyE", keyCode: 69 },
      { code: "ShiftRight", keyCode: 16 },
    ],
    TLEFT: [],
    TRIGHT: [],
    TEAMMATES: [{ code: "Tab", keyCode: 9 }],
    MOVEWMOUSE: [{ code: "KeyC", keyCode: 67 }],
  },
  servers = {
    EU1: "Europe",
    EU2: "Europe Central",
    USE1: "US East",
    USW1: "US West",
    TOK1: "Asia East",
    SA1: "South America",
    RU1: "Russia",
    TR: "Tournament",
    AU: "Australia",
    LOCAL: "Local",
  };
function ml(z) {
  return z;
}
var hl,
  Ul =
    ((hl = document.createElement("canvas").getContext("2d")),
    (window.devicePixelRatio || 1) /
      (hl.webkitBackingStorePixelRatio ||
        hl.mozBackingStorePixelRatio ||
        hl.msBackingStorePixelRatio ||
        hl.oBackingStorePixelRatio ||
        hl.backingStorePixelRatio ||
        1));
function tl() {
  var z = { dpi: 96, dpcm: 96 / 2.54 };
  function V() {
    return "undefined" == typeof window
      ? 0
      : +window.devicePixelRatio ||
          Math.sqrt(screen.deviceXDPI * screen.deviceYDPI) / z.dpi ||
          0;
  }
  return {
    dppx: V,
    dpi: () => V() * z.dpi,
    dpcm: () => V() * z.dpcm,
  };
}
var jl = tl().dpcm();
function al(z) {
  (zz = z),
    1 == z
      ? document
          .getElementById("button-quality-high")
          .classList.remove("unselected")
      : document
          .getElementById("button-quality-high")
          .classList.add("unselected"),
    0.8 == z
      ? document
          .getElementById("button-quality-medium")
          .classList.remove("unselected")
      : document
          .getElementById("button-quality-medium")
          .classList.add("unselected"),
    0.6 == z
      ? document
          .getElementById("button-quality-low")
          .classList.remove("unselected")
      : document
          .getElementById("button-quality-low")
          .classList.add("unselected");
  try {
    "undefined" != typeof Storage && localStorage.setItem("quality", z);
  } catch (z) {}
  h &&
    ((h.resolution = zz * Ul),
    h.rootRenderTarget && (h.rootRenderTarget.resolution = zz * Ul),
    kc());
}
function Bl(z, V) {
  var l = V < 0 ? 0 : 255,
    D = V < 0 ? -1 * V : V,
    v = z >> 16,
    c = (z >> 8) & 255,
    P = 255 & z;
  return (
    65536 * (Math.round((l - v) * D) + v) +
    256 * (Math.round((l - c) * D) + c) +
    (Math.round((l - P) * D) + P)
  );
}
function Cl(z) {
  return z
    .replace(/&/g, "&amp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
var pl = [],
  Yl = {};
function ol(z, V) {
  for (
    var l = (z = z
        .replace(
          /[â–ˆâ¸»ååï·½ð’«à¯µá€ª\u00AD\u200A\u200B\u200C\u200D\u200E\u200F\u2060\ufeffÖ¼\u05BC\u202e\u202f]/g,
          "",
        )
        .replace(/ðŸ–•/g, "")
        .replace(/\u0391/g, "A")
        .replace(/\u0392/g, "B")
        .replace(/\u0395/g, "E")
        .replace(/\u0396/g, "Z")
        .replace(/\u0397/g, "H")
        .replace(/\u039A/g, "K")
        .replace(/\u039C/g, "M")
        .replace(/\u039D/g, "N")
        .replace(/\u039F/g, "O")
        .replace(/\u03A1/g, "P")
        .replace(/\u03A4/g, "T")
        .replace(/\u03A5/g, "Y")
        .replace(/\u03A7/g, "X")
        .replace(/\u03BF/g, "o")
        .replace(/\u0415/g, "E")
        .replace(/\u0405/g, "S")
        .replace(/\u0410/g, "A")
        .replace(/\u0412/g, "B")
        .replace(/\u041A/g, "K")
        .replace(/\u041C/g, "M")
        .replace(/\u041D/g, "H")
        .replace(/\u041E/g, "O")
        .replace(/\u0420/g, "P")
        .replace(/\u0421/g, "C")
        .replace(/\u0422/g, "T")
        .replace(/\u0425/g, "X")).split(" "),
      D = 0;
    D < l.length;
    D++
  ) {
    var v = l[D].toUpperCase(),
      c = (v.match(/[a-zA-Z0-9]/) || []).pop();
    if (void 0 !== Yl[c])
      for (var P = 0; P < Yl[c].length; P++) {
        var L = Yl[c][P];
        -1 != v.indexOf(L) && (l[D] = V);
      }
  }
  z = l.join(" ");
  return z;
}
!(() => {
  for (var z = 0; z < pl.length; z++) {
    var V = pl[z].toUpperCase(),
      l = V.charAt(0);
    -1 !== V.indexOf(" ") && (l = " "),
      void 0 === Yl[l] && (Yl[l] = []),
      Yl[l].push(V);
  }
})();
var Zl = false;
var Fl =
    (() => {
      var z = navigator.userAgent || navigator.vendor || window.opera;
      return !(
        !/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          z,
        ) &&
        !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          z.substr(0, 4),
        )
      );
    })() ||
    ("MacIntel" === navigator.platform &&
      void 0 !== navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 1),
  Kl =
    -1 !== navigator.userAgent.indexOf("Safari") &&
    -1 === navigator.userAgent.indexOf("Chrome") &&
    -1 === navigator.userAgent.indexOf("Chromium"),
  nl = Fl && Kl,
  fl = -1 !== document.referrer.indexOf("kongregate.com"),
  Tl = -1 !== document.referrer.indexOf("newgrounds.com"),
  $l =
    -1 !== document.referrer.indexOf("crazygames.com") ||
    -1 !== document.referrer.indexOf("speelspelletjes.nl") ||
    -1 !== document.referrer.indexOf("gioca.re") ||
    -1 !== document.referrer.indexOf(" onlinegame.co.id") ||
    -1 !== document.referrer.indexOf("1001juegos.com") ||
    -1 !== document.referrer.indexOf("crazygames.fr") ||
    -1 !== document.referrer.indexOf("crazygames.ru") ||
    -1 !== document.referrer.indexOf("crazygames.com.br"),
  Ql =
    -1 !== document.referrer.indexOf("pacogames.com") ||
    -1 !== document.referrer.indexOf("gamearter.com");
function dl(z, V, l) {
  var D = document.createElement("div");
  D.className = `alert-popup${V ? ` ${V}` : ""}`;
  var v = document.createElement("div");
  v.className = "popup-outer";
  D.appendChild(v);
  var c = document.createElement("div");
  c.className = "wrapper";
  D.appendChild(c);
  var P = document.createElement("div");
  P.innerHTML = z;
  c.appendChild(P);
  var L = document.createElement("div");
  function W() {
    anime({
      targets: D,
      duration: 100,
      easing: "easeInQuad",
      opacity: [1, 0],
      complete: () => {
        document.body.removeChild(D);
        if ("function" == typeof l) {
          l();
        }
      },
    });
  }
  (L.className = "close-button"),
    (L.textContent = "OK"),
    c.appendChild(L),
    document.body.appendChild(D),
    anime({
      targets: D,
      duration: 100,
      easing: "easeInQuad",
      opacity: [0, 1],
    }),
    v.addEventListener("click", W),
    L.addEventListener("click", W);
}
function sl(z, V, l) {
  var D = document.createElement("div");
  D.className = "confirm-popup" + (V ? " " + V : "");
  var v = document.createElement("div");
  (v.className = "popup-outer"), D.appendChild(v);
  var c = document.createElement("div");
  (c.className = "wrapper"), D.appendChild(c);
  var P = document.createElement("div");
  (P.innerHTML = z), c.appendChild(P);
  var L = document.createElement("div");
  (L.className = "yes-button"), (L.textContent = "YES");
  var W = document.createElement("div");
  function g(z) {
    anime({
      targets: D,
      duration: 100,
      easing: "easeInQuad",
      opacity: [1, 0],
      complete: () => {
        document.body.removeChild(D), "function" == typeof l && l(z);
      },
    });
  }
  (W.className = "no-button"),
    (W.textContent = "NO"),
    c.appendChild(L),
    c.appendChild(W),
    document.body.appendChild(D),
    anime({
      targets: D,
      duration: 100,
      easing: "easeInQuad",
      opacity: [0, 1],
    }),
    L.addEventListener("click", () => g(true)),
    W.addEventListener("click", () => g(false));
}
function getWebsocketUri(z) {
  return "https:" === window.location.protocol.toLowerCase() ||
    z.includes("localhost")
    ? `ws://${z}`
    : `wss://${z.replace(":", "/")}`;
}
function checkServerPing(server) {
  websocketConnections[server] = new WebSocket(
    getWebsocketUri(regions[server].uri),
  );
  websocketConnections[server].binaryType = "arraybuffer";
  websocketConnections[server].pings = [];

  websocketConnections[server].sendPing = function () {
    this.lastPingTime = Date.now();
    this.send(Uint8Array.of(99));
  };

  websocketConnections[server].addEventListener("open", (z) => {
    z.target.sendPing();
  });

  websocketConnections[server].addEventListener("error", function (z) {
    if (!this.cancelled)
      console.log(
        `${new Date().toLocaleTimeString()} - Error reaching server in ${server} ${z.type} ${z.code}`,
        "",
      );
  });
  websocketConnections[server].addEventListener("close", () => {});
  websocketConnections[server].addEventListener("message", (l) => {
    var D = new DataView(l.data).getUint8(0);
    if (D == 99) {
      l.target.pings.push(Date.now() - l.target.lastPingTime);
      if (l.target.pings.length >= 3) {
        l.target.close();
        delete websocketConnections[server];
        A[server] = Math.min(...l.target.pings);
        console.log("Best ping for region", server, A[server]);
        (() => {
          var V = 999999,
            l = "";
          for (var D in A) {
            if (A[D] < V) {
              V = A[D];
              if (v != D) console.log("Best region", D);
              v = D;
            }
            l += `<option value="${D}" data-ping="${A[D]}">${servers[D]}</option>`;
          }
          if (!z)
            document.getElementById("server-block").style.display = "block";
          document.getElementById("server").innerHTML = l;
          document.getElementById("server").value = v;
          $("#server").selectmenu("refresh");
          if (BV && YV) Xl();
        })();
      } else {
        l.target.sendPing();
      }
    } else {
      console.log("unexpected code from server", D);
    }
  });
}

var Sl,
  Rl,
  yl = 0;
function bl() {
  if (regions) {
    for (var z in regions)
      websocketConnections[z] &&
        ((websocketConnections[z].cancelled = true),
        websocketConnections[z].close()),
        delete websocketConnections[z];
    A = [];
    document.getElementById("server").innerHTML = "<option>Loading...</option>";
    $("#server").selectmenu("refresh");
    clearTimeout(Sl);
  }

  var z = new XMLHttpRequest();
  z.onreadystatechange = () => {
    if (z.readyState == 4 && z.status == 200) {
      try {
        var V = z.responseText.split("=");
        regions = JSON.parse(V[0]);
        BV ? (regions = { TR: regions.TR }) : delete regions.TR;
        var l = false;
        for (const region in regions) {
          if (regions[region]) {
            checkServerPing(region);
          }
        }

        l = true;
        if (!l) {
          Sl = setTimeout(bl, 3000);
          xD(
            new Date().toLocaleTimeString() +
              (BV
                ? " - Please wait, tournament is opening... "
                : " - Downloaded server list was empty"),
            BV ? "" : "error",
          );
        }

        if (V.length > 1) {
          for (var v = 1; v < V.length; v++) {
            var P = V[v];
            if (P.startsWith("event=")) {
              P = P.slice(6);
              var L = JSON.parse(P);
              var W = new Date(L.ts ? parseInt(L.ts) : L.date).getTime();
              var g = Date.now();
              var q = W - g;
              var m = L.duration || 1;
              var h = document.getElementById("event-placeholder");

              if (h && q >= -864e5) {
                var U = document.createElement("div");
                U.className = "event";
                U.innerHTML =
                  "<span>" +
                  Cl(L.title) +
                  '</span> - <span class="date">' +
                  L.date +
                  "</span> - <a onclick=\"document.getElementById('event-popup').style.display='block';\">click for details</a>";
                h.parentNode.replaceChild(U, h);
                document.getElementById("event-title").innerHTML =
                  Cl(L.title) + '<span class="date">' + L.date + "</span>";
                document.getElementById("event-content").innerHTML = Cl(
                  L.details,
                );
              }

              if (h && q >= -36e5 * m) {
                var t = () => {
                  var z = Date.now(),
                    V = W - z,
                    l = Math.floor(V / 864e5),
                    D = Math.floor((V % 864e5) / 36e5),
                    v = Math.floor((V % 36e5) / 6e4),
                    c = Math.floor((V % 6e4) / 1e3);
                  document.getElementById("tourney-countdown").innerHTML =
                    '<button class="button back disabled" onclick="defly.joinTourney()">Tourney starts in ' +
                    (l > 0 ? l + "d " : "") +
                    (l > 0 || D > 0 ? D + "h " : "") +
                    (l > 0 || D > 0 || v > 0 ? v + "m " : "") +
                    c +
                    "s </button><a onclick=\"document.getElementById('event-popup').style.display='block'\"> ?</a>";
                  if (V < -36e5 * m) {
                    document.getElementById("tourney-countdown").style.display =
                      "none";
                  } else if (V < 0) {
                    clearInterval(w);
                    document.getElementById("tourney-countdown").innerHTML =
                      '<button class="orange button animated pulse" onclick="defly.joinTourney()">Join the tournament</button>';
                  }
                };
                w = setInterval(t, 1000);
                t();
              }
            }
          }
        }
      } catch (V) {
        console.error(V);
        if (++yl < 100) Sl = setTimeout(bl, 3000);
        xD(
          new Date().toLocaleTimeString() +
            " - Downloaded server list was invalid: " +
            z.responseText,
          "error",
        );
      }
    } else if (z.readyState == 4 && z.status != 200) {
      z.onerror(z.status);
    }
  };

  z.onerror = () => {
    xD(
      new Date().toLocaleTimeString() + " - Error downloading server list",
      "error",
    );
    if (++yl < 40) Sl = setTimeout(bl, 3000);
  };

  z.open("GET", "/servers/" + hz + ".json", true);
  z.send();
}
function Xl() {
  clearTimeout(Rl);
  document.getElementById("play-button").style.display = "none";
  document.getElementById("play-spinner").style.display = "block";

  if (!v) {
    Rl = setTimeout(Xl, 3000);
    return;
  }

  var D = document.getElementById("server").value || v;
  var c = document.getElementById("username").value.substring(0, 12);
  var P = new XMLHttpRequest();

  P.onreadystatechange = () => {
    if (P.readyState === 4) {
      if (P.status === 200) {
        var response = P.responseText;

        if (response.indexOf("LOGIN_ERROR") !== -1) {
          dl(
            "The session has expired, please reload the page and try again",
            "",
            () => document.location.reload(),
          );
          return;
        }

        if (response.indexOf("ERROR") !== -1) {
          if (z) {
            alert(
              "Can't connect to the specified server, it's probably not open right now",
            );
            history.replaceState(
              "",
              document.title,
              window.location.pathname + window.location.search,
            );
            GL();
            document.getElementById("play-button").style.display = "block";
            document.getElementById("play-spinner").style.display = "none";
            N = false;
          } else {
            Rl = setTimeout(Xl, 3000);
            xD(
              new Date().toLocaleTimeString() +
                " - Error selecting server: " +
                response,
              "error",
            );
          }
          return;
        }

        if (response.indexOf("RESERVED_NICKNAME") !== -1) {
          document.getElementById("play-button").style.display = "block";
          document.getElementById("play-spinner").style.display = "none";
          N = false;
          dl(
            "This nickname is reserved by a premium account, please choose another one",
            "",
            () => {
              document.getElementById("username").value = "";
            },
          );
          return;
        }

        var parts = response.split(" ");
        k = parts[0];
        opcode = parts[1];
        if (parts.length >= 3) {
          hz = parseInt(parts[2], 10);
        }

        if (typeof Storage !== "undefined") {
          try {
            localStorage.setItem("sessionId", opcode);
          } catch (err) {
            console.log(err);
          }
        }

        console.log("Server", k, "reservationKey", V);
        pingServer();
      } else {
        P.onerror(P.status);
      }
    }
  };

  P.onerror = () => {
    xD(`${new Date().toLocaleTimeString()} - Error selecting server`, "error");
    Rl = setTimeout(Xl, 3000);
  };

  if (D === "LOCAL") {
    P.open("POST", `/servers/${hz}.txt`, true);
  } else {
    var url = `${G}?r=${D || ""}&m=${hz}&u=${encodeURIComponent(c)}&fu=${encodeURIComponent(ol(c))}&s=${opcode || ""}`;

    if (sz) {
      url += "&a=1";
    }

    if (!sz && Jz) {
      url += "&a=2";
    }

    if (z) {
      url += `&p=${encodeURIComponent(z)}`;
    }

    P.open("POST", url, true);
  }

  if (sz) {
    P.send(oP);
  } else if (Jz) {
    P.send(ZP);
  } else {
    P.send(null);
  }
}

function pingServer() {
  if (q) {
    console.error("Already connected to server");
    return;
  }

  document.getElementById("play-button").style.display = "none";
  document.getElementById("play-spinner").style.display = "block";

  cl = {};
  Tz = {};

  q = new WebSocket(getWebsocketUri(k));
  q.binaryType = "arraybuffer";

  q.addEventListener("open", () => {
    console.log("socket connected");

    m = document.getElementById("username").value.substring(0, 12);
    if (m.length === 0) m = "Player";

    if (typeof Storage !== "undefined") {
      try {
        localStorage.setItem("username", m);
      } catch (err) {
        console.log(err);
      }
    }

    D = opcode || "";
    const usernameLen = 2 * m.length;
    const tokenLen = 2 * D.length;

    const buffer = new ArrayBuffer(2 + usernameLen + 1 + tokenLen + 4 + 4);
    const view = new DataView(buffer);

    view.setUint8(0, 1);
    zD(view, 1, m);
    zD(view, 1 + usernameLen + 1, D);
    view.setInt32(2 + usernameLen + 1 + tokenLen, $z);
    view.setInt32(2 + usernameLen + 1 + tokenLen + 4, qz);

    q.send(view.buffer);

    if (pV) hc(1, qc);
  });

  q.addEventListener("error", (e) => {
    console.error(e);
    xD(
      `${new Date().toLocaleTimeString()} - WebSocket error ${e.type} ${e.code}`,
      "error",
    );
  });

  q.addEventListener("close", (e) => {
    console.log("socket closed", e);

    if (O) return;

    if (e.reason === "no-session") {
      dl("Your session was not found, try again", "", () => {
        document.location.reload();
      });
    } else if (e.reason === "duplicate-session") {
      dl(
        "You have been kicked out because someone else just connected with the same account",
        "",
        () => {
          document.location.reload();
        },
      );
    } else if (e.code === 0 && xz) {
      dl("You have been kicked out for inactivity.", "", () => {
        document.location.reload();
      });
    } else if (e.code === 0) {
      dl(
        "Connection to the server failed. Please try again in a few minutes and contact us if the problem persists.",
        "",
        () => {
          document.location.reload();
        },
      );
    } else {
      if (XV[HV] && !n) {
        const retry = new DataView(new ArrayBuffer(10));
        retry.setUint8(0, 10);
        retry.setInt32(1, HV);
        retry.setUint8(5, 0);
        retry.setInt32(6, 0);
        xv(retry);
      }

      dl(
        xz
          ? "You have been kicked out for inactivity."
          : "The connection to the server has been lost.",
        "",
        () => {
          document.getElementById("internet-issue").style.display = "none";
          document.getElementById("respawn-buttons").style.display = "none";
          document.getElementById("respawn-buttons-gm2").style.display = "none";
          MainLoop.stop();

          if (hz === 4) {
            document.location.reload();
          }
        },
      );
    }

    q = null;
    O = false;
    Lz = [];
  });

  q.addEventListener("message", Ol);
}

var Ml,
  ul = false;
function El() {
  N = true;
  if (window.DEFLY_SERVER_URL) {
    k = window.DEFLY_SERVER_URL;
    pingServer();
  } else {
    Xl();
  }
}
function _l() {
  if (!N) {
    if (Fl && !nl) {
      !(() => {
        try {
          if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
          } else {
            if (document.body.mozRequestFullScreen) {
              return document.body.mozRequestFullScreen();
            } else {
              if (document.body.webkitRequestFullscreen) {
                return document.body.webkitRequestFullscreen(
                  Element.ALLOW_KEYBOARD_INPUT,
                );
              } else {
                if (document.body.msRequestFullscreen) {
                  document.body.msRequestFullscreen();
                }
              }
            }
          }
        } catch (z) {
          console.error(z);
        }
      })();
      try {
        screen.orientation.lock("landscape");
      } catch (z) {}
    }
    Ml = El;
    (2 == hz || 2 == qz || (qz > 2 && (qz - 2) % 2 == 0)) && Gl()
      ? "undefined" != typeof gtag &&
        gtag("event", "StartGame", {
          event_category: "Click",
          event_label: "VideoAd",
          playerSkin: $z,
          playerSkinColor: Qz,
        })
      : (El(),
        "undefined" != typeof gtag &&
          gtag("event", "StartGame", {
            event_category: "Click",
            event_label: "NoVideoAd",
            playerSkin: $z,
            playerSkinColor: Qz,
          }));
  }
}
function il() {
  for (var z = 0; z <= 4; z++)
    document.getElementById("gamemode-" + z) &&
      (hz == z
        ? document.getElementById("gamemode-" + z).classList.add("selected")
        : document
            .getElementById("gamemode-" + z)
            .classList.remove("selected"));
}
var wl = false;
function Gl() {
  if (_P || pV) return false;
  try {
    if (((wl = true), window.famobi))
      window.famobi.showAd(kl),
        "undefined" != typeof gtag &&
          gtag("event", "ShowFamobiVideo", { event_category: "Ads" });
    else {
      if (
        "undefined" == typeof aiptag ||
        !aiptag.cmd.player.push ||
        0 != aiptag.cmd.player.length
      )
        return (
          (wl = false),
          "undefined" != typeof gtag &&
            gtag("event", "BlockedAdInPlayVideo", { event_category: "Ads" }),
          false
        );
      aiptag.cmd.player.push(() => {
        adplayer.startPreRoll();
      }),
        "undefined" != typeof gtag &&
          gtag("event", "ShowAdInPlayVideo", { event_category: "Ads" }),
        (document.getElementById("defly-io_300x250").style.display = "none");
    }
    return true;
  } catch (z) {
    return console.error(z), (wl = false), false;
  }
}
function kl() {
  wl &&
    ((wl = false),
    (Ez = Date.now()),
    Ml(),
    (document.getElementById("defly-io_300x250").style.display = "block"));
}
function Il() {
  MainLoop.stop(),
    q && 1 == q.readyState && ((O = true), q.close()),
    (document.getElementById("fps").style.display = "none"),
    (h.view.style.display = "none"),
    (e = 0),
    "undefined" != typeof gtag &&
      gtag("event", "BackToHomepage", { event_category: "Click" }),
    history.replaceState(
      "",
      document.title,
      window.location.pathname + window.location.search,
    ),
    window.location.reload();
}
var Al = 0;
function Ol(z) {
  var view = new DataView(z.data);
  opcode = view.getUint8(0);

  switch (opcode) {
    case 1:
      console.error("received map unavailable"),
        Al++,
        (0 != hz && 1 != hz && 3 != hz) || 1 != e
          ? 1 == hz && -1 != yv
            ? setTimeout(() => {
                bv(yv);
              }, 250)
            : ((O = true), q.close(), (Rl = setTimeout(Xl, 250)))
          : setTimeout(Wc, 250),
        Al >= 20 &&
          (document.getElementById("spawn-warning").style.display = "block");
      break;
    case 2:
      !((z) => {
        try {
          var V = document.getElementById("cp-iframe");
          V.parentNode.replaceChild(V.cloneNode(), V);
        } catch (z) {}
        xL(),
          t.removeChildren(),
          j.removeChildren(),
          Y.removeChildren(),
          C.removeChildren(),
          B.removeChildren(),
          a.removeChildren(),
          p.removeChildren(),
          o.removeChildren(),
          Z.removeChildren(),
          S.removeChildren(),
          (Al = 0),
          (XV = {}),
          (RV = {}),
          (yV = {}),
          (Uz = {}),
          (bV = {}),
          (n = null),
          (JV = 0),
          (T = 0),
          (Q = 0),
          (Bz = [0, 0, 0, 0, 0, 0, 0]),
          (Cz = [0, 0, 0, 0, 0, 0, 0]),
          (jz = 0),
          (K = {
            shooting: false,
            moving: false,
            aimDirection: 0,
            moveDirection: 0,
          }),
          (Wz = []),
          (Dz = []),
          (rD = []),
          (Nc = null),
          (oz = -1),
          (Fz = false),
          (Kz = 0),
          (lz = 0),
          (Vz = 0),
          (nP = 60),
          (HV = z.getInt32(1)),
          (lz = z.getInt32(5)),
          (Oz = z.getFloat32(9)),
          (ez = z.getFloat32(13)),
          (kz = z.getFloat32(17)),
          (kz *= GV),
          (Iz = z.getFloat32(21)),
          (Az = z.getFloat32(25)),
          (QV = z.getFloat32(29)),
          (dV = z.getFloat32(33)),
          (84 * dV) / 128,
          (fV = z.getFloat32(37)),
          (TV = z.getFloat32(41)),
          ($V = z.getFloat32(45)),
          z.getFloat32(49),
          (VV = z.getFloat32(53)),
          (Nz = z.getFloat32(57)),
          (zV = z.getFloat32(61));
        var l = z.getFloat32(65),
          D = z.getFloat32(69);
        z.byteLength >= 76 && ((MV = z.getInt32(73)), (uV[HV] = MV));
        z.byteLength >= 80 && (iV = z.getInt32(77));
        z.byteLength >= 82 &&
          ((Pz = z.getUint8(81)),
          (0 == hz || 3 == hz || 4 == hz) && Pz >= 1 && (cl[1] = 5066061));
        if (z.byteLength >= 83) {
          var v = z.getUint8(82);
          (oV = (1 & v) > 0), (FV = (2 & v) > 0), (SV = 2 != hz && (4 & v) > 0);
        }
        if (z.byteLength >= 83 + Mz.length)
          for (var c = 0; c < Mz.length; c++) Mz[c] = z.getUint8(83 + c);
        var L = false;
        if (z.byteLength >= 83 + Mz.length + 1) {
          for (
            var W = 83 + Mz.length,
              g = z.getUint8(W),
              U = "<tr>",
              f = "<tr>",
              c = 0;
            c < g;
            c++
          ) {
            var $ = z.getUint8(W + 1 + c);
            (U += "<td>" + ll[$] + "</td>"),
              (f +=
                '<td><div class="icon" onclick="defly.selectSuperpower(' +
                $ +
                ');"><img src="img/sp' +
                $ +
                '.png"></div></td>');
          }
          if (
            ((U += "</tr>"),
            (f += "</tr>"),
            (document
              .getElementById("choose-superpower")
              .getElementsByTagName("table")[0].innerHTML = U + f),
            (L = true),
            (W += 1 + g),
            z.byteLength >= W + 1)
          )
            for (var s = z.getUint8(W), c = 0; c < s; c++)
              (Dl[c] = z.getFloat32(W + 1 + 8 * c + 0)),
                (vl[c] = z.getFloat32(W + 1 + 8 * c + 4));
        }
        jD(),
          0 == hz || 1 == hz || 2 == hz || 4 == hz
            ? ((E = new zP(Oz, ez, 2)), (_ = new zP(Oz, ez, 2)))
            : 3 == hz &&
              ((E = new zP(Oz, ez, 2)),
              (_ = new zP(Oz, ez, 2)),
              (i = new zP(Oz, ez, 2)));
        4 != hz && (nz[HV] = m);
        (Tz[HV] = $z), gD(HV);
        var J = cl[HV],
          x = {};
        for (var R in cl) R != HV && cl[R] == J && (x[R] = true);
        for (var R in x) delete cl[R];
        (XV[HV].x = l),
          (XV[HV].y = D),
          (iz = new PIXI.Sprite(F["wall-line"])).anchor.set(0.5),
          (iz.height = dV),
          (iz.alpha = 0.2),
          (iz.tint = Pl(HV)),
          (iz.visible = false),
          B.addChild(iz),
          (wz = new PIXI.Sprite(F.dot1)).anchor.set(0.5),
          (wz.width = 2 * Iz),
          (wz.height = 2 * Iz),
          (wz.alpha = 0.2),
          (wz.tint = Pl(HV)),
          (wz.visible = false),
          a.addChild(wz),
          (e = 1),
          kc(),
          (Dz = []),
          MainLoop.start(),
          (h.view.style.display = "block"),
          (y = document.getElementById("defly-io_300x250")) &&
            !_P &&
            (y.parentElement.removeChild(y),
            document
              .getElementById(
                "respawn-promo" + (2 == hz ? "-gm2" : 4 == hz ? "-gm4" : ""),
              )
              .appendChild(y));
        if (2 == hz && !_P) {
          var y = document.getElementById("defly-io_728x90");
          y &&
            (y.parentElement.removeChild(y),
            document.getElementById("curse-promo-gm2").appendChild(y));
        }
        if (1 == hz) {
          for (var b = "", c = 0; c < _V; c++) {
            var X = AV[c + (Pz >= 1 ? 1 : 0)];
            16252714 == X && (X = 13817893);
            var H = Bl(X, 0.2);
            b +=
              '<div class="bar" ' +
              (MV == c + 1 + (Pz >= 1 ? 1 : 0)
                ? 'id="map-control-bar-value"'
                : 'id="map-control-bar-team-' + ((Pz >= 1 ? 2 : 0) + c) + '"') +
              ' style="background: linear-gradient(to bottom, ' +
              HP(X) +
              ", " +
              HP(H) +
              ');"></div>';
          }
          document.getElementById("score-bars").innerHTML = b;
        }
        (document.getElementById("play-button").style.display = "block"),
          (document.getElementById("play-spinner").style.display = "none"),
          (document.getElementById("respawn-button").style.display =
            "inline-block"),
          (document.getElementById("respawn-spinner").style.display = "none"),
          (document.getElementById("spawn-warning").style.display = "none"),
          (document.getElementById("homepage").style.display = "none"),
          (document.getElementById("respawn").style.display = "none"),
          (document.getElementById("upgrade-block").style.display = "none"),
          document.getElementById("choose-team-popup") &&
            (document.getElementById("choose-team-popup").style.display =
              "none");
        2 != hz &&
          (document.getElementById("xp-block").style.display = "block");
        if (4 == hz) {
          var r = document.getElementById("xp-block");
          (r.getElementsByClassName("score-bar")[0].style.display = "none"),
            (document.getElementById("xp-bar").style.display = "none");
        }
        if (
          ((document.getElementById("level-value").innerHTML = 0),
          (document.getElementById("xp-value").style.width = "0%"),
          (document.getElementById("upgrade-points").innerHTML = "0"),
          (document.getElementById("superpower-fuel").style.display = "none"),
          (document.getElementById("choose-superpower").style.display = "none"),
          (document.getElementById("lb-player-points").innerHTML = 0),
          (document.getElementById("lb-player-name").innerHTML = Cl(m)),
          (document.getElementById("fps").style.display = "block"),
          (document.getElementById("hide-xp-block").style.display = "none"),
          Oz > ez)
        ) {
          var M = Math.ceil((96 / Oz) * ez);
          (d.width = 96), (d.height = M);
        } else if (ez > Oz) {
          var u = Math.ceil((96 / ez) * Oz);
          (document.getElementById("minimap").style.width = u + "px"),
            (d.width = u),
            (d.height = 96);
        } else (d.width = 96), (d.height = 96);
        if (
          ((document.getElementById("minimap").style.width = d.width + "px"),
          (document.getElementById("minimap").style.height = d.height + "px"),
          2 == hz)
        ) {
          var G = document.getElementById("minimap-target-positions");
          G ||
            ((G = document.createElement("div")).setAttribute(
              "id",
              "minimap-target-positions",
            ),
            document
              .getElementById("minimap")
              .insertBefore(
                G,
                document.getElementById("minimap-team-positions"),
              )),
            (G.innerHTML = "");
        }
        1 == iV
          ? (document.getElementById("minimap").style.clipPath =
              "polygon(0 50%, 25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%)")
          : 2 == iV &&
            (document.getElementById("minimap").style.borderRadius = "50%");
        nv(),
          4 != hz &&
            (document.getElementById("minimap").style.display = "block");
        Fl &&
          ((document.getElementById("minimap").style.right = "unset"),
          (document.getElementById("minimap").style.left = "4px"),
          (document.getElementById("minimap").style.transformOrigin =
            "bottom left"),
          (1 != hz && 2 != hz) ||
            !document.getElementById("chat-button") ||
            (document.getElementById("chat-button").style.display =
              "inline-block"));
        document.getElementById("score").style.display = "block";
        for (var c = 0; c < 7; c++)
          document.getElementById("skill-plus-" + c).style.display = "block";
        document.getElementById("map-vote") &&
          (document.getElementById("map-vote").style.display = "none");
        (() => {
          P = new Date().getTime();
          var z = new Uint8Array(1);
          z.set([99], 0), q.send(z);
        })(),
          (1 != hz && 2 != hz) ||
            Fl ||
            mc ||
            XD(
              "Welcome to Team " +
                colorNamesNew[MV - 1] +
                "." +
                (customKeyboardCommands.TEAMMATES.length > 0 &&
                customKeyboardCommands.TEAMMATES[0] &&
                Object.keys(customKeyboardCommands.TEAMMATES[0]).length > 0
                  ? " Press [" +
                    oL(customKeyboardCommands.TEAMMATES[0]) +
                    "] to show your teammates positions"
                  : ""),
              PV ? "info-dark" : "info",
            );
        if (2 != hz || mc) {
          if (!L && 3 == hz) {
            var I = document.getElementById("choose-superpower"),
              A = I.getElementsByTagName("td");
            (A[3].innerHTML = "Grenade"),
              (A[9].innerHTML =
                '<div class="icon" onclick="defly.selectSuperpower(6);"><img src="img/sp6.png"></div>');
          }
        } else document.getElementById("buy-screen").style.display = "block";
        CD(),
          (oD = new Date().getTime()),
          mc &&
            ((XV[HV].visible = iz.visible = wz.visible = false),
            (n = XV[HV].position),
            clearTimeout(Sv));
        BV ||
          (window.location.hash = "#" + hz + "-" + k.replace(".defly.io", ""));
        !pV ||
          hD ||
          (0 != hz && 3 != hz) ||
          (hc(5),
          (hD = setInterval(() => {
            hc(5);
          }, 6e4)));
        w && (clearInterval(w), (w = null));
        if (4 == hz)
          if (0 != ZV) {
            (document.getElementById("spectate-1v1-ui").style.display = "none"),
              (document.getElementById("gm-1v1-lobby").style.display = "none"),
              document.getElementById("chat-block").classList.remove("typing"),
              document
                .getElementById("chat-block")
                .classList.remove("gm-1v1-lobby"),
              document.getElementById("chat-input").blur(),
              (K.moving = false),
              (Sc[0] = false),
              (Sc[1] = false),
              (Sc[2] = false),
              (Sc[3] = false);
            var O = document.createElement("div");
            O.setAttribute("id", "countdown-1v1"),
              (O.innerText = "5"),
              document.body.appendChild(O);
            const z = Date.now(),
              V = setInterval(() => {
                const l = Date.now() - z;
                l >= 5e3
                  ? (clearInterval(V),
                    (O.innerText = "GO!"),
                    anime({
                      targets: O,
                      easing: "linear",
                      duration: 1e3,
                      opacity: 0,
                      complete: () => {
                        document.body.removeChild(O);
                      },
                    }))
                  : (O.innerText = Math.ceil((5e3 - l) / 1e3));
              }, 100);
          } else (n = XV[HV].position), (XV[HV].visible = false);
      })(view);
      break;
    case 3:
      el(new Date().getTime() - Lz.shift());
      break;
    case 4:
      !((z) => {
        oD = new Date().getTime();
        var V = z.getInt32(1);
        if (lz - (Vz = V) >= 4) {
          var l = Math.max(1, Math.ceil((lz - Vz) / 10));
          0, (lz -= Math.max(1, Math.ceil((lz - Vz) / 10))), uv(-l);
        }
        if (Vz - lz >= 4) {
          var l = Math.max(1, Math.ceil((Vz - lz) / 10));
          0, (lz += l), uv(l);
        }
        if (Vz > lz) return void Dz.push({ turn: Vz, dv: z });
        if ((YD(z), lz - Vz > 0))
          for (var D = 0; D < Math.min(60, lz - Vz); D++)
            (2 == hz && 1 == JV) ||
              (4 == hz && lz < 300) ||
              (WP(true, false), XV[HV] && DP(XV[HV], true));
      })(view);
      break;
    case 5:
      !((z) => {
        var V = z.getUint8(1);
        if (3 == V) return;
        if (2 == V && ++TD > 10) return;
        var l = document.getElementById("user-error");
        l ||
          ((l = document.createElement("div")).setAttribute(
            "class",
            "user-error",
          ),
          l.setAttribute("id", "user-error"),
          window.document.body.appendChild(l));
        (l.innerHTML = fD[V - 1]),
          (l.style.opacity = 1),
          clearTimeout(ZD),
          clearInterval(FD),
          (ZD = setTimeout(() => {
            var z = new Date().getTime();
            FD = setInterval(() => {
              var V = new Date().getTime() - z;
              V > 500
                ? (clearInterval(FD), window.document.body.removeChild(l))
                : (l.style.opacity = 1 - V / 500);
            }, 20);
          }, 1e3));
      })(view);
      break;
    case 6:
      Pv(view);
      break;
    case 49:
      !((z) => {
        for (var V = Iz, l = z.getInt16(1), D = 3, v = 0; v < l; v++) {
          var c = z.getInt32(D),
            P = z.getInt32(D + 4),
            L = z.getFloat32(D + 8),
            W = z.getFloat32(D + 12),
            g = z.getUint8(D + 16),
            q = z.getUint8(D + 17),
            m = z.getFloat32(D + 18),
            h = z.getInt32(D + 22);
          if (((D += 26), RV[c])) 0;
          else {
            var U = Wv(P, g, q),
              t = new PIXI.Sprite(F[U]);
            (t.x = L),
              (t.y = W),
              (t.width = 2 * V),
              (t.height = 2 * V),
              (t.size = V),
              t.anchor.set(0.5),
              (t.owner = P),
              (t.hp = g),
              (t.maxHP = q),
              (t.creationTurn = h),
              (t.alpha = 1),
              (t.tint = 1 == hz || 2 == hz ? Ll(P) : Pl(P)),
              tV &&
                1 == P &&
                L >= jV.x1 &&
                L <= jV.x2 &&
                W >= jV.y1 &&
                W <= jV.y2 &&
                F["tower-kh"] &&
                ((t.texture = F["tower-kh"]), (t.tint = 15642415)),
              (t.lines = []),
              (t.dotId = c),
              a.addChild(t),
              (RV[c] = t),
              t.hp != t.maxHP &&
                3 != hz &&
                ((t.healthBar = Zv(t)),
                p.addChild(t.healthBar),
                (t.healthBar.outer.width =
                  (t.healthBar.width * t.hp) / t.maxHP)),
              m > 0 && Lv(t, m),
              (0 != hz && 3 != hz) || P != HV || (jP = true),
              E && (E.add(t, t.position), 3 == hz && av(t));
          }
        }
      })(view);
      break;
    case 7:
      gv(view);
      break;
    case 50:
      !((z) => {
        for (var V = z.getInt16(1), l = 3, D = 0; D < V; D++) {
          var v = z.getInt32(l),
            c = z.getInt32(l + 4),
            P = z.getInt32(l + 8),
            L = z.getInt32(l + 12),
            W = z.getInt32(l + 16),
            g = z.getInt32(l + 20);
          l += 24;
          var q = RV[P],
            m = RV[L];
          if (
            (q || console.error("could not find dot", P),
            m || console.error("could not find dot", L),
            yV[v])
          )
            0;
          else {
            var h = VD(q, m);
            (h.lineId = v),
              (h.owner = c),
              (h.tint = 1 == hz || 2 == hz ? Ll(c) : Pl(c)),
              tV && 15642415 == q.tint && (h.tint = 15642415),
              (h.dot1 = q),
              (h.dot2 = m),
              (h.leftZoneId = W),
              (h.rightZoneId = g),
              B.addChild(h),
              (yV[v] = h),
              _ && _.addLine(h, q.position, m.position),
              V < 20
                ? ((h.alpha = 0),
                  anime({
                    targets: h,
                    alpha: 3 == hz && q.isCaptured ? 0.6 : 1,
                    duration: 250,
                    easing: "linear",
                  }))
                : 3 == hz && q.isCaptured && (h.alpha = 0.6);
          }
        }
      })(view);
      break;
    case 8:
      hv(view, true);
      break;
    case 20:
      hv(view, false);
      break;
    case 51:
      !((z) => {
        for (var V = z.getInt16(1), l = 3, D = 0; D < V; D++)
          l = Uv(z, l, false, false);
        var v = z.getInt16(l);
        l += 2;
        for (var D = 0; D < v; D++) l = Uv(z, l, false, true);
        var c = z.getInt16(l);
        l += 2;
        for (var D = 0; D < c; D++) {
          var P = 0 == z.getUint8(l);
          l = Uv(z, ++l, true, P);
        }
      })(view);
      break;
    case 9:
      Tv(view);
      break;
    case 10:
      xv(view);
      break;
    case 52:
      !((z) => {
        sv(z.getInt32(1));
      })(view);
      break;
    case 11:
      !((z) => {
        var V = z.getInt16(1),
          l = z.getInt16(3),
          D = z.getInt32(5),
          v = z.getFloat32(9);
        v < 0 && (v = 0);
        for (
          var c = z.getUint8(21), P = [], L = 22, W = "", g = 0;
          g < c;
          g++
        ) {
          (P[g] = { id: z.getInt32(L), points: z.getInt32(L + 4) }), (L += 8);
          var q = l == g;
          if (!Fl || g < 5) {
            var m = 1 == hz || 2 == hz ? Ll(uV[P[g].id]) : Pl(P[g].id);
            W += `<div class="lb-item${q ? " is-self" : ""}"><span class="color" style="background-color: ${HP(m)}"></span><span class="rank">${g + 1}.</span><span class="player-name${g + 1 >= 10 ? " l" : ""}">${Cl(nz[P[g].id])}</span><span class="points">${P[g].points}</span></div>`;
          }
        }
        if (
          ((document.getElementById("lb-top").innerHTML = W),
          (document.getElementById("player-count").innerHTML = V),
          (document.getElementById("lb-player-rank").innerHTML = l + 1),
          (document.getElementById("lb-player-points").innerHTML = D),
          (document.getElementById("lb-player-line").style.display =
            l < (Fl ? 5 : P.length) ? "none" : "block"),
          !mc)
        ) {
          var h = (100 * v) / tD;
          1 != hz &&
            ((document.getElementById("map-control-value").innerHTML = rv(
              h > 99.9 ? 100 : h,
            )),
            (document.getElementById("map-control-bar-value").style.width =
              h + "%")),
            2 != hz &&
              3 != hz &&
              Mv < 80 &&
              h >= 80 &&
              !vv &&
              showAlert("You reached 80%, now kill everyone to win!", 2e4),
            (Mv = h);
        }
        4 != hz &&
          (document.getElementById("leaderboard-block").style.display =
            n && !mc ? "none" : "block");
      })(view);
      break;
    case 12:
      !((z) => {
        var V = z.getInt32(1);
        if (0 == V) (Nc = null), (iz.visible = false);
        else {
          var l = RV[V];
          Nc = l;
        }
      })(view);
      break;
    case 13:
      !((z) => {
        var V = z.getInt32(1),
          l = z.getInt32(5),
          D = z.getInt32(9),
          v = z.getInt32(13),
          c = z.getFloat32(17),
          P = z.getFloat32(21),
          L = z.getFloat32(25),
          W = z.getFloat32(29),
          g = z.getInt32(33);
        if (Uz[l]) var q = Uz[l];
        else {
          if (!aV || (1 != hz && 2 != hz) || D == MV)
            if (aV && 0 == hz && D != HV) var m = "shoot-enemy";
            else var m = "shoot";
          else var m = "shoot-enemy";
          var q = new PIXI.Sprite(F[m]);
          (q.width = 2 * Az * (qV ? 1.1 : 1)),
            (q.height = 2 * Az * (qV ? 1.1 : 1)),
            q.anchor.set(0.5),
            (q.owner = D),
            (q.creator = v),
            (q.tint = Bl(
              1 == hz || 2 == hz ? Ll(D) : Pl(D),
              "shoot-enemy" == m ? 0 : -0.2,
            )),
            o.addChild(q),
            (q.shootId = l),
            (Uz[l] = q);
        }
        (q.x = c),
          (q.y = P),
          (q.sx = L),
          (q.sy = W),
          (hV || UV) && (q.rotation = Math.atan2(W, L));
        (q.initialTurn = V),
          (q.initialX = c),
          (q.initialY = P),
          (q.lifetime = g);
        var h = lz - V;
        Ev(q, h), 0;
      })(view);
      break;
    case 14:
      !((z) => {
        var V = z.getInt32(1);
        if (Uz[V]) {
          var l = Uz[V];
          delete Uz[V], o.removeChild(l);
        }
      })(view);
      break;
    case 15:
      _v(view);
      break;
    case 32:
      _v(view, true);
      break;
    case 16:
      iv(view, true, false);
      break;
    case 17:
      iv(view, true, true);
      break;
    case 18:
      iv(view, false, false);
      break;
    case 19:
      iv(view, false, true);
      break;
    case 21:
      !((z) => {
        var V = T;
        T = z.getUint8(1);
        (Q = z.getFloat32(2)), (jz = z.getUint8(6));
        for (var l = 0, D = 0; D < Bz.length; D++)
          (Bz[D] = z.getUint8(7 + D)),
            (l += Bz[D]),
            (document.getElementById("skill-bar-" + D).innerHTML =
              wv('<span class="full"></span>', Bz[D]) +
              wv("<span></span>", Mz[D] - Bz[D])),
            (document.getElementById("skill-plus-" + D).style.display =
              0 == jz || Bz[D] >= Mz[D] ? "none" : "block");
        (() => {
          for (let z = 0; z < Bz.length; z++)
            Bz[z] != Cz[z] && az.push(z), (Cz[z] = Bz[z]);
        })(),
          jz > 0
            ? ((document.getElementById("upgrade-points").innerHTML = jz),
              (document.getElementById("upgrade-block").style.display =
                "block"),
              anime({
                targets: "#upgrade-block",
                easing: "easeInQuad",
                left: "16px",
                duration: 250,
                complete: () => {
                  jz <= 0 &&
                    ((document.getElementById("upgrade-block").style.left =
                      "-264px"),
                    (document.getElementById("upgrade-block").style.display =
                      "none"));
                },
              }))
            : (document.getElementById("upgrade-points").innerHTML = jz);
        jz > 0 &&
          0 == l &&
          (() => {
            if (az.length > 0) {
              document
                .getElementById("upgrade-block")
                .classList.add("ask-redo");
              for (var z = [], V = 0; V < Bz.length; V++)
                (document.getElementById("skill-plus-" + V).style.display =
                  "none"),
                  (z[V] = 0);
              for (
                var l = 0, V = 0;
                V < az.length &&
                !(z[az[V]] < Mz[az[V]] && (z[az[V]]++, ++l >= jz));
                V++
              );
              for (var V = 0; V < Bz.length; V++)
                document.getElementById("skill-bar-" + V).innerHTML =
                  wv('<span class="full"></span>', z[V]) +
                  wv("<span></span>", Mz[V] - z[V]);
            }
          })();
        var v = V == T ? Q : 1,
          c = true,
          P = 1e3 / (T - V + 1),
          L = () => {
            !c &&
              V < T &&
              ((document.getElementById("xp-value").style.width = "0%"),
              V++,
              (document.getElementById("level-value").innerHTML = V),
              (v = V == T ? Q : 1)),
              (c = false);
            var z = {
              targets: "#xp-value",
              width: [
                document.getElementById("xp-value").style.width,
                100 * v + "%",
              ],
              easing: "linear",
              duration: P,
            };
            V < T && (z.complete = L), anime(z);
          };
        L();
        T > V && T >= 32
          ? ((document.getElementById("hide-xp-block").style.display = "block"),
            (Av = new Date().getTime()))
          : V >= 32 &&
            new Date().getTime() - Av > 6e4 &&
            (document.getElementById("xp-bar").style.display = "none");
        BP = l > 0;
      })(view);
      break;
    case 22:
      !((z) => {
        var V = z.getInt32(1),
          l = z.getInt32(5);
        0;
        if (Uz[l]) {
          var D = Uz[l];
          delete Uz[l], o.removeChild(D);
        }
        if (RV[V]) {
          var v = RV[V];
          v.healthBar ||
            3 == hz ||
            ((v.healthBar = Zv(v)), p.addChild(v.healthBar)),
            (v.hp -= 1),
            3 == hz
              ? (v.texture = F["dot" + v.hp + "-" + v.maxHP])
              : (v.healthBar.outer.width =
                  (v.healthBar.width * v.hp) / v.maxHP);
        }
      })(view);
      break;
    case 30:
      !((z) => {
        var V = z.getInt32(1);
        0;
        if (RV[V]) {
          var l = RV[V];
          if (z.byteLength >= 10) {
            l.maxHP = z.getUint8(5);
            var D = z.getFloat32(6);
            l.shield || Lv(l, D),
              (l.shield.appearPercent = D),
              (l.shield.lastAppearTurn = -1e3),
              (l.shield.state = 0),
              (l.shield.alpha = 0);
          }
          (l.hp = l.maxHP),
            3 == hz
              ? (l.texture = F["dot" + l.hp + "-" + l.maxHP])
              : l.healthBar && (p.removeChild(l.healthBar), delete l.healthBar);
        }
      })(view);
      break;
    case 23:
      document.getElementById("choose-superpower").style.display = "block";
      break;
    case 24:
      !((z) => {
        Zz = z.getFloat32(1);
        var V = Fz;
        (Fz = 1 == z.getUint8(5)),
          Ov(),
          !V &&
            Fz &&
            4 != oz &&
            6 != oz &&
            anime({
              targets: "#superpower-fuel-value",
              width: ["100%", "0%"],
              easing: "linear",
              duration: 1e3 * Dl[oz],
            });
      })(view);
      break;
    case 25: {
      var D = view.getInt32(1),
        v = view.getInt32(5);
      cl[v] || Pl(v), (cl[D] = cl[v]), v == HV && (rV = D);
      break;
    }
    case 26:
      !((z) => {
        var V = z.getInt32(1),
          l = z.getFloat32(5),
          D = z.getFloat32(9),
          v = z.getFloat32(13),
          c = z.getFloat32(17),
          P = new PIXI.Sprite(F.flashbang);
        P.anchor.set(0.5),
          P.position.set(l, D),
          (P.width = 0.75 * kz),
          (P.height = 0.75 * kz),
          o.addChild(P);
        var L = 0;
        V == HV
          ? (L = 0.5)
          : 1 == hz && uV[V] == MV
            ? (L = 0.5)
            : n && (L = 0.5);
        anime({
          targets: P,
          duration: 1500,
          x: v,
          y: c,
          rotation: 2 * Math.PI,
          easing: "easeOutCubic",
          complete: ((z) => () => {
            o.removeChild(z),
              anime({
                targets: U,
                alpha: [L, 1],
                easing: "easeInQuint",
                duration: 5e3,
              });
          })(P),
        });
      })(view);
      break;
    case 43:
      !((z) => {
        z.getInt32(1);
        var V = z.getFloat32(5),
          l = z.getFloat32(9),
          D = z.getFloat32(13),
          v = z.getFloat32(17),
          c = new PIXI.Sprite(F.emp);
        c.anchor.set(0.5),
          c.position.set(V, l),
          (c.width = 0.75 * kz),
          (c.height = 0.75 * kz),
          o.addChild(c),
          anime({
            targets: c,
            duration: 1500,
            x: D,
            y: v,
            rotation: 2 * Math.PI,
            easing: "easeOutCubic",
            complete: ((z) => () => {
              setTimeout(() => {
                o.removeChild(z), $v(z.x, z.y, 6);
              }, 1400);
            })(c),
          });
      })(view);
      break;
    case 53:
      !((z) => {
        var V = z.getInt32(1),
          l = z.getFloat32(5),
          D = z.getFloat32(9),
          v = z.getFloat32(13),
          c = z.getFloat32(17),
          P = new PIXI.Sprite(F.grenade);
        (P.tint = Pl(V)),
          P.anchor.set(0.5),
          P.position.set(l, D),
          (P.width = kz),
          (P.height = kz),
          o.addChild(P),
          anime({
            targets: P,
            duration: 1500,
            x: v,
            y: c,
            rotation: 2 * Math.PI,
            easing: "easeOutCubic",
            complete: ((z) => () => {
              setTimeout(() => {
                o.removeChild(z), $v(z.x, z.y, 6);
              }, 1400);
            })(P),
          });
      })(view);
      break;
    case 27:
      !((z) => {
        var V = z.getInt32(1),
          l = z.getFloat32(5),
          D = z.getFloat32(9),
          v = new PIXI.Sprite(F.portal1);
        (v.width = 2 * kz),
          (v.height = 2 * kz),
          v.anchor.set(0.5),
          XV[V]
            ? v.position.set(XV[V].position.x, XV[V].position.y)
            : v.position.set(-1e4, -1e4);
        Z.addChildAt(v, 0);
        var c = new PIXI.Sprite(F.portal2);
        (c.width = 2 * kz),
          (c.height = 2 * kz),
          c.anchor.set(0.5),
          c.position.set(l, D),
          Z.addChildAt(c, 1);
        var P = XV[V] ? XV[V].scale.x : 1,
          L = XV[V] ? XV[V].scale.y : 1;
        anime({
          targets: XV[V] ? XV[V].scale : { x: 1, y: 1 },
          x: 0,
          y: 0,
          easing: "easeInCubic",
          duration: 500 * Dl[5],
          complete: ((z, v) => () => {
            Z.removeChild(z),
              XV[V]
                ? (XV[V] && XV[V].position.set(l, D),
                  anime({
                    targets: XV[V] ? XV[V].scale : { x: 0, y: 0 },
                    x: P,
                    y: L,
                    easing: "easeOutCubic",
                    duration: 500 * Dl[5],
                    complete: ((z) => () => {
                      Z.removeChild(z), XV[V] && XV[V].scale.set(1, 1);
                    })(v),
                  }))
                : Z.removeChild(v);
          })(v, c),
        });
      })(view);
      break;
    case 28:
      !((z) => {
        (Kz = z.getInt32(1)),
          2 != hz || n
            ? 4 == hz &&
              0 != Kz &&
              (XV[HV] && (XV[HV].visible = false),
              (document.getElementById("gm-1v1-lobby").style.display = "none"),
              document.getElementById("chat-block").classList.remove("typing"),
              document
                .getElementById("chat-block")
                .classList.remove("gm-1v1-lobby"),
              document.getElementById("chat-input").blur(),
              (document.getElementById("spectate-1v1-ui").style.display =
                "block"))
            : ((n = XV[HV].position) || (n = { x: Oz / 2, y: ez / 2 }),
              (f = -1e3),
              (XV[HV].visible = false),
              (Xz = -1),
              (document.getElementById("buy-screen").style.display = "none"),
              showAlert("You are spectating until end of round", 1e4),
              (Gv = setTimeout(() => {
                2 == JV &&
                  showAlert(
                    (Fl ? "Tap" : "Click") +
                      " anywhere to spectate next teammate",
                    1e4,
                  ),
                  (Gv = null);
              }, 1e4)));
        pV &&
          hD &&
          mc &&
          0 == Kz &&
          setTimeout(() => {
            hc(2);
          }, 3e3);
      })(view);
      break;
    case 29:
      !((z) => {
        var V = z.getInt32(1),
          l = Nl(z, 5),
          D = z.getInt32(6 + 2 * l.length),
          v = -1;
        z.byteLength >= 6 + 2 * l.length + 4 + 4 - 1 &&
          (v = z.getInt32(6 + 2 * l.length + 4));
        var c = 0;
        z.byteLength >= 6 + 2 * l.length + 4 + 4 + 1 &&
          ((c = z.getUint8(6 + 2 * l.length + 4 + 4)), (fz[V] = c));
        0;
        (nz[V] = ol(l, " ").substring(0, 12)),
          (V != HV || "?skin-editor" !== window.location.search) && (Tz[V] = D);
        XV[V] && (XV[V].usernameText.text = nz[V]);
        -1 != v && ((uV[V] = v), V == HV && (MV = v));
        2 == hz &&
          (delete cl[V],
          V == HV && ((iz.tint = Pl(HV)), (wz.tint = Pl(HV))),
          XV[V] && zc(V));
        c > 0 && V == HV && V > 0 && XV[HV] && zc(V);
      })(view);
      break;
    case 31:
      !((z) => {
        var V = z.getInt32(1);
        if (0 != V)
          var l = 1 == hz || 2 == hz ? Ll(V) : Pl(V),
            D = (16711680 & l) >> 16,
            v = (65280 & l) >> 8,
            c = 255 & l,
            P = 255;
        else
          var D = 0,
            v = 0,
            c = 0,
            P = 0;
        var L = 5,
          W = [];
        for (; L + 3 <= z.byteLength; ) {
          var g = z.getUint8(L),
            q = z.getUint8(L + 1),
            m = z.getUint8(L + 2);
          W.push({ y: g, x1: q, x2: m }), (L += 3);
        }
        0 != V || mc || x.data.set(J.data);
        ((z, V, l, D, v, c) => {
          for (var P = 0; P < z.length; P++)
            for (var L = z[P].x1; L <= z[P].x2; L++) {
              var W = 4 * (z[P].y * J.width + L);
              (c &&
                0 == J.data[W + 0] &&
                0 == J.data[W + 1] &&
                0 == J.data[W + 2] &&
                255 == J.data[W + 3]) ||
                ((J.data[W + 0] = V),
                (J.data[W + 1] = l),
                (J.data[W + 2] = D),
                (J.data[W + 3] = v));
            }
        })(W, D, v, c, P, FV),
          kv && clearTimeout(kv);
        kv = setTimeout(() => {
          if (
            (s.putImageData(J, 0, 0), Iv && clearInterval(Iv), 0 == V && !mc)
          ) {
            var z = 0;
            Iv = setInterval(() => {
              z++,
                s.putImageData(z % 2 == 0 ? J : x, 0, 0),
                z >= 10 && clearInterval(Iv);
            }, 250);
          }
        }, 100);
      })(view);
      break;
    case 34:
      !((z) => {
        z.getUint8(1);
        var V = z.getFloat32(2),
          l = z.getFloat32(6),
          D = z.getFloat32(10),
          v = (z.getFloat32(14), (100 * V) / tD);
        1 == hz &&
          document.getElementById("respawn-max-control-label") &&
          (document.getElementById("respawn-max-control-label").innerHTML =
            "Territory  built by you: ");
        2 != hz &&
          ((document.getElementById("respawn-max-control").innerHTML = rv(v)),
          (document.getElementById("respawn-max-score").innerHTML =
            Math.floor(l)));
        document.getElementById(
          "respawn-earned-coins" + (2 == hz ? "-gm2" : ""),
        ).innerHTML =
          sz || Jz || D < 1
            ? Math.floor(D)
            : '<span style="text-decoration: line-through;">' +
              Math.floor(D) +
              "</span> 0";
        (document.getElementById(
          "respawn-panel-earnings" + (2 == hz ? "-gm2" : ""),
        ).style.display = "table-cell"),
          Zl &&
            !_P &&
            ((document.getElementById(
              "respawn-promo" + (2 == hz ? "-gm2" : ""),
            ).innerHTML =
              '<img style="cursor: pointer;" onclick="defly.showMyAccount();" src="img/premium-inc.png">'),
            (document.getElementById(
              "respawn-promo" + (2 == hz ? "-gm2" : ""),
            ).style.backgroundColor = "transparent"));
        if (!_P && (sz || Jz) && !Zl && qz > 5) {
          var c = Math.random() < 0.5;
          (document.getElementById(
            "respawn-feedback" + (2 == hz ? "-gm2" : ""),
          ).style.display = c ? "none" : "block"),
            (document.getElementById(
              "respawn-get-premium" + (2 == hz ? "-gm2" : ""),
            ).style.display = c ? "block" : "none");
        }
      })(view);
      break;
    case 35:
      !((z) => {
        var V = mc && 1 == e;
        2 == hz && ((AV = OV), (colorNamesNew = Vl));
        var l = z.getUint8(1);
        _V = z.getUint8(2);
        for (var D = 3, v = {}, c = 0; c < _V; c++) {
          var P = z.getInt32(D);
          2 != hz &&
            !Rv &&
            0 == c &&
            P > 1 &&
            (AV.splice(0, 0, 5066061),
            colorNamesNew.splice(0, 0, "Walls"),
            (Rv = true));
          var L = z.getFloat32(D + 4);
          L < 0 && (L = 0);
          var W = 1 == z.getUint8(D + 8),
            g = z.getUint8(D + 9);
          D += 10;
          for (var q = [], m = 0; m < g; m++) {
            var h = z.getInt32(D);
            (D += 4), q.push(h);
          }
          v[P] = { mapPercent: L, members: q, available: W };
        }
        var U = '<tr class="team-name">';
        for (var t in v) {
          var j = AV[t - 1];
          16252714 == j && (j = 13817893),
            (U +=
              "<td" +
              (V ? ' style="background-color: ' + HP(j) + ';"' : "") +
              ">" +
              colorNamesNew[t - 1] +
              "</td>");
        }
        if (1 == hz)
          for (var t in ((U += '</tr><tr class="map-percent">'), v)) {
            var a = v[t];
            U += "<td>" + rv(a.mapPercent ? a.mapPercent : 0) + "%</td>";
          }
        if (!V)
          for (var t in ((U += '</tr><tr class="player-count">'), v))
            v[t].members || console.error(v, t, v[t]),
              (U += "<td>" + v[t].members.length + "/" + l + " players</td>");
        for (var t in ((U += '</tr><tr class="player-names">'), v)) {
          var a = v[t];
          if (((U += "<td>"), pV && V && a.members.length > 6)) {
            for (var B = [], c = 0; c < 7; c++) {
              var C;
              do {
                C = Math.floor(Math.random() * a.members.length);
              } while (-1 !== B.indexOf(C));
              B.push(C);
            }
            for (var p = [], c = 0; c < B.length; c++) p.push(a.members[B[c]]);
            a.members = p;
          }
          for (var c = 0; c < Math.min(a.members.length, 6); c++) {
            var Y = a.members[c],
              o = nz[Y] ? nz[Y] : "Unknown";
            c > 0 && (U += "<br />"), (U += Cl(o));
          }
          a.members.length > 6 && (U += "<br />..."), (U += "</td>");
        }
        if (((U += "</tr><tr>"), !V)) {
          for (var t in ((U += '<tr id="team-choice-buttons">'), v)) {
            var j = AV[t - 1];
            16252714 == j && (j = 13817893),
              v[t].available
                ? (U +=
                    '<td><button class="button" style="background-color: ' +
                    HP(j) +
                    '" onclick="defly.selectTeam(' +
                    t +
                    ');">Select</button></td>')
                : (U +=
                    '<td><button class="button disabled" style="background-color: ' +
                    HP(j) +
                    '">Unavailable</button></td>');
          }
          U += "</tr>";
        }
        if (V) {
          var Z = document.createElement("table");
          Z.setAttribute("id", "admin-player-list"),
            (Z.innerHTML = U),
            document.body.appendChild(Z);
        } else
          (document.getElementById("team-choice-table").innerHTML = U),
            (document.getElementById("team-choice-loading").style.display =
              "none"),
            (document.getElementById("choose-team-popup").style.display =
              "block"),
            clearTimeout(Sv),
            (Sv = setTimeout(Xv, CV ? 1e3 : 1e4)),
            document.getElementById("youtube-live") &&
              (document.getElementById("youtube-live").style.display = "none");
        pV &&
          !hD &&
          ((hD = setInterval(() => {
            hc(5);
          }, 6e4)),
          (UD = setInterval(() => {
            hc(8),
              setTimeout(() => {
                document.body.removeChild(
                  document.getElementById("admin-player-list"),
                );
              }, 1e4);
          }, 6e4)));
      })(view);
      break;
    case 36:
      fv(view);
      break;
    case 37:
      fv(view, true);
      break;
    case 38:
      !((z) => {
        var V = 1,
          l = Pz >= 1 ? 2 : 1;
        for (; V + 4 <= z.byteLength; ) {
          var D = z.getFloat32(V);
          1 != hz ||
            l != MV ||
            mc ||
            ((document.getElementById("map-control-value").innerHTML = rv(
              D > 99.9 ? 100 : D,
            )),
            (document.getElementById("map-control-bar-value").style.width =
              D + "%")),
            (V += 4);
          var v = document.getElementById(
            "map-control-bar-team-" + (l - (Pz >= 1 ? 0 : 1)),
          );
          v && (v.style.width = D + "%"), l++;
        }
      })(view);
      break;
    case 39:
      !((z) => {
        if (WV) return;
        var V = Cl(ol(Nl(z, 1), ""));
        if (mc) {
          var l = V.match(/^(.* joined the game in team )#([1-9])$/);
          l && (V = l[1] + colorNamesNew[parseInt(l[2]) - 1]);
        }
        XD(V, PV ? "info-dark" : "info");
      })(view);
      break;
    case 40:
      !((z) => {
        if (4 == hz) {
          var V = z.getInt32(1),
            l = z.getInt32(5),
            D = z.byteLength >= 10 && 1 == z.getUint8(9);
          (document.getElementById("gm-1v1-result-title").innerHTML = D
            ? "Match cancelled (opponent disconnected)"
            : 0 == V
              ? "No winner, rematch?"
              : V == HV
                ? "You defeated " + Cl(nz[l])
                : "You lost to " + Cl(nz[V])),
            (document.getElementById("respawn-earned-coins-gm4").innerHTML = D
              ? 0
              : V == HV
                ? 10
                : 0),
            (document.getElementById(
              "respawn-total-earned-coins-gm4",
            ).innerHTML = 10 * Rz);
        } else {
          document.getElementById("game-won") &&
            document.body.removeChild(document.getElementById("game-won"));
          var v = Math.round((1 * z.getInt32(1)) / 60),
            c = document.createElement("div");
          c.setAttribute("id", "game-won"),
            PV && (c.style.color = "white"),
            document.body.appendChild(c),
            (vv = true);
          var P = c;
          if (!n) {
            P = document.createElement("div");
            var L = document.createElement("div");
            L.className = "table-container";
            var W = document.createElement("table"),
              g = document.getElementById("lb-player-points").innerHTML,
              q = document.getElementById("map-control-value").innerHTML + "%",
              m = lz / 60;
            mz = m;
            var h = Math.floor(m / 60),
              U = Math.floor(m % 60),
              t = (h > 0 ? h + " min. " : "") + U + " s";
            (W.innerHTML =
              '<tr><td class="stat">Score:</td><td class="value" >' +
              g +
              '</td></tr><tr><td class="stat">Map controlled:</td><td class="value">' +
              q +
              '</td></tr><tr><td class="stat">Time Alive:</td><td class="value">' +
              t +
              '</td></tr><tr><td class="stat">Kills:</td><td class="value">' +
              Rz +
              "</td></tr>"),
              (sz || Jz) &&
                (W.innerHTML +=
                  '<tr><td class="stat">Coins earned:</td><td class="value"><span>' +
                  CL(hz, g) +
                  '</span> <img src="img/coin.png"></td></tr>'),
              c.appendChild(P),
              L.appendChild(W),
              c.appendChild(L);
            var j = document.createElement("div");
            j.className = "buttons";
            var a = document.createElement("button"),
              B = document.createElement("button");
            a.setAttribute("type", "button"),
              B.setAttribute("type", "button"),
              (a.className = "back button"),
              (B.className = "button homepage"),
              (a.innerHTML = "Keep playing"),
              (B.innerHTML = "Back to homepage"),
              j.appendChild(a),
              j.appendChild(B),
              c.appendChild(j),
              a.addEventListener("click", () => {
                (L.style.display = "none"), (j.style.display = "none");
              }),
              B.addEventListener("click", Il);
          }
          anime({
            targets: c,
            delay: 1e3,
            opacity: [0, 1],
            easing: "linear",
            duration: 500,
          }),
            setInterval(() => {
              v--,
                (P.innerHTML =
                  (n
                    ? "Game has been won!"
                    : "Congratulations, You won the game !") +
                  '<div class="sub"> (server will restart in ' +
                  v +
                  " seconds...)</div>");
            }, 1e3),
            n ||
              (!(() => {
                eD = new PIXI.Container();
                window.innerWidth, window.innerHeight;
                for (
                  var z = 0.05 * window.innerWidth,
                    V = 0.12 * window.innerWidth,
                    l = -Math.PI / 2,
                    D = l - Math.PI / 8,
                    v = l + Math.PI / 8,
                    c = 0;
                  c < 300;
                  c++
                ) {
                  var P = new PIXI.Sprite(F.confetti),
                    L =
                      (window.innerHeight / 40) *
                      ((m = 1.33), (q = 0.66) + Math.random() * (m - q));
                  (P.size = L),
                    (P.width = L),
                    (P.height = L / 2),
                    (P.x =
                      c < 150
                        ? 0.25 * window.innerWidth
                        : 0.75 * window.innerWidth),
                    (P.y = window.innerHeight);
                  var W =
                      Math.random() * (v - D) +
                      D +
                      (c < 150 ? 0 : (0 * -Math.PI) / 2),
                    g = Math.random() * (V - z) + z;
                  (P.sx = Math.cos(W) * g),
                    (P.sy = Math.sin(W) * g),
                    (P.tint =
                      (Dv(30, 255) << 16) + (Dv(30, 230) << 8) + Dv(30, 230)),
                    (P.r = L),
                    (P.d = 300 * Math.random() + 11),
                    (P.tilt = Math.floor(33 * Math.random()) - 11),
                    (P.tiltAngleIncremental = 0.07 * Math.random() + 0.05),
                    (P.tiltAngle = 0),
                    P.anchor.set(0.5),
                    eD.addChild(P);
                }
                var q, m;
                clearInterval(ND),
                  (ND = setInterval(() => {
                    for (var z = 0; z < eD.children.length; z++) {
                      var V = eD.children[z];
                      (V.x += V.sx),
                        (V.y += V.sy),
                        (V.sx *= 0.9),
                        (V.sy *= 0.9),
                        (V.tiltAngle += V.tiltAngleIncremental),
                        (V.y += (Math.cos(V.d) + 3 + V.r / 2) / 2),
                        (V.tilt = 15 * Math.sin(V.tiltAngle - z / 3)),
                        (V.rotation = V.tilt / 30 + Math.PI / 2),
                        (V.width =
                          V.size *
                          (0.8 * Math.abs(Math.sin(V.tiltAngle)) + 0.2)),
                        (V.height =
                          (V.size / 2) *
                          (0.8 * Math.abs(Math.cos(V.tiltAngle)) + 0.2));
                    }
                  }, 20));
              })(),
              setTimeout(() => {
                clearInterval(ND), (eD = null);
              }, 1e4));
        }
      })(view);
      break;
    case 54:
      !((z) => {
        var V = z.getInt32(1);
        V == HV
          ? showAlert("You reached 80%, now kill everyone to win!", 2e4, true)
          : 0 == V || V == HV || n
            ? 0 != V ||
              0 == cv ||
              n ||
              showAlert("Your position is no longer being shown!", 5e3, true)
            : showAlert(
                "A player reached 80%, your position is shown to them!",
                2e4,
                true,
              );
        cv = V;
      })(view);
      break;
    case 41:
      !((z) => {
        var V = z.getInt32(1),
          l = Nl(z, 5);
        if (-2 == V) return void showAlert(l, 5e3);
        if (4 == hz && 0 == V && l.startsWith("1v1RESULT/")) {
          var D = l.split("/"),
            v = 1 == parseInt(D[1]),
            c = 2 == parseInt(D[1]),
            P = parseInt(D[2]),
            L = parseInt(D[3]),
            W = P == HV || L == HV;
          return void XD(
            c
              ? P == HV || L == HV
                ? "Your match was cancelled"
                : "Match between " +
                  Cl(nz[P]) +
                  " and " +
                  Cl(nz[L]) +
                  " was cancelled"
              : v
                ? (P == HV ? "You" : Cl(nz[P])) +
                  " and " +
                  (L == HV ? "you" : Cl(nz[L])) +
                  " stupidly collided"
                : (L == HV ? "You are " : Cl(nz[L]) + " is ") +
                  "victorious over " +
                  (P == HV ? "you" : Cl(nz[P])),
            W ? "bold" : PV ? "info-dark" : "info",
          );
        }
        0 == V
          ? (l = ol(l, ""))
          : -1 != V && 0 != V && V != HV && (l = ol(l, "$#&@%"));
        -1 != V && 0 != V && (l = Cl(l));
        -1 == V
          ? XD(l, "system")
          : 0 != V || WV
            ? l.length > 0 &&
              !LV &&
              XD(
                '<span class="name">' +
                  Cl(nz[V]) +
                  ": </span><span>" +
                  l +
                  "</span>",
              )
            : XD(l, PV ? "info-dark" : "info");
      })(view);
      break;
    case 42:
      !((z) => {
        var V = z.getInt32(1),
          l = z.getFloat32(5),
          D = z.getFloat32(9),
          v = z.getFloat32(13);
        switch (V) {
          case 0: {
            var c = "capture-blue-A";
            break;
          }
          case 1: {
            var c = "capture-blue-B";
          }
        }
        var P = new PIXI.Graphics();
        P.position.set(l, D),
          (P.visible = false),
          (P.alpha = 0.5),
          a.addChild(P);
        var L = new PIXI.Sprite(F[c]);
        L.position.set(l, D),
          (L.width = 2 * v),
          (L.height = 2 * v),
          L.anchor.set(0.5),
          a.addChild(L),
          (rD[V] = {
            x: l,
            y: D,
            type: V,
            radius: v,
            progress: P,
            sprite: L,
          });
        var W = document.getElementById("minimap-target-positions");
        if (l >= -12 && D >= -12 && l <= Oz + 12 && D <= ez + 12) {
          var g = document.createElement("div");
          (g.innerHTML = 0 == V ? "A" : "B"),
            (g.style.left = (l / Oz) * 100 + "%"),
            (g.style.top = (D / ez) * 100 + "%"),
            W.appendChild(g);
        }
      })(view);
      break;
    case 44:
      !((z) => {
        var V = JV;
        (JV = z.getUint8(1)), (xV = z.getFloat32(2)), 0;
        if (
          ((document.getElementById("countdown").style.display = "block"),
          lv(),
          V != JV)
        )
          if (1 == JV)
            showAlert("Round will start shortly", 1e3 * (xV - 1)),
              mc ||
                ((n = null),
                (Kz = 0),
                XV[HV] && (XV[HV].visible = true),
                (Nc = null),
                (document.getElementById("respawn-gm2").style.display = "none"),
                (document.getElementById("bs-kills").innerHTML = Rz),
                (document.getElementById("bs-deaths").innerHTML = yz),
                (document.getElementById("bs-rounds-won").innerHTML =
                  bz + "/" + Xz),
                (document.getElementById("buy-screen").style.display = "block"),
                (Sc = [false, false, false, false]),
                Xc());
          else if (2 == JV)
            showAlert(
              2 == uV[HV]
                ? "Protect the blue bomb spots or kill every red player to win"
                : "Plant the bomb at blue spots or kill every blue player to win",
              1e4,
            );
          else if (3 == JV) {
            var l = z.getUint8(6),
              D = z.getUint8(7);
            2 == D && ((Hz = true), (rz = new Date().getTime())),
              showAlert(MD[(l == MV ? 0 : 4) + D], 5e3),
              l == MV && bz++,
              Xz++,
              (document.getElementById("countdown-value").className = ""),
              (document.getElementById("countdown-bomb-message").style.display =
                "none"),
              (document.getElementById("respawn-gm2").style.display = "none"),
              "undefined" != typeof gtag &&
                gtag("event", "RoundEnded", {
                  event_category: "Game",
                  event_label: l == MV ? "Win" : "Lose",
                });
          } else
            4 == JV &&
              (showAlert(
                2 == uV[HV]
                  ? "The bomb has been planted! Defuse it by staying still inside the bomb spot"
                  : "Your team planted the bomb, defend it until the countdown reaches 0",
                1e4,
              ),
              (document.getElementById("countdown-value").className =
                "animated pulse bigger"),
              (document.getElementById("countdown-bomb-message").style.display =
                "block"));
        Gv && (clearTimeout(Gv), (Gv = null));
      })(view);
      break;
    case 45:
      !((z) => {
        var V = z.getUint8(1),
          l = rD[z.getUint8(2)],
          D = z.getInt32(3),
          v = l.progress;
        0 == V
          ? (v.clear(),
            (v.visible = true),
            v.animInterval && clearInterval(v.animInterval),
            (v.startTime = new Date().getTime()),
            (v.animInterval = setInterval(() => {
              var z = new Date().getTime() - v.startTime;
              v.clear();
              var V = Math.min(z, D) / D;
              4 == JV && (V = 1 - V),
                V > 0 &&
                  (v.beginFill(AV[2]),
                  v.arc(
                    0,
                    0,
                    l.radius,
                    -Math.PI / 2,
                    -Math.PI / 2 + 2 * Math.PI * V,
                  ),
                  v.lineTo(0, 0),
                  v.endFill()),
                z > D &&
                  (clearInterval(v.animInterval),
                  delete v.animInterval,
                  delete v.startTime);
            }, 20)))
          : 1 == V
            ? (l.progress.visible = false)
            : 2 == V &&
              (v.animInterval && clearInterval(v.animInterval),
              v.clear(),
              v.beginFill(AV[2]),
              v.arc(0, 0, l.radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI),
              v.lineTo(0, 0),
              v.endFill());
      })(view);
      break;
    case 46:
      !((z) => {
        var V = z.getFloat32(1);
        document.getElementById("money-left-gm2").innerHTML = V;
        var l = z.getFloat32(5);
        document.getElementById("money-spent-gm2").innerHTML = l;
        var D = z.getFloat32(9);
        document.getElementById("money-earned-gm2").innerHTML = D;
        for (var v = z.getUint8(13), c = 0; c <= 5; c++)
          document.getElementById("vehicule-" + c + "-gm2").className =
            v == c ? "selected" : "";
        (document.getElementById("gear-100-gm2").innerHTML = z.getUint8(14)),
          (document.getElementById("gear-101-gm2").innerHTML = z.getUint8(15)),
          (document.getElementById("gear-102-gm2").innerHTML = z.getUint8(16)),
          (document.getElementById("gear-103-gm2").innerHTML = z.getUint8(17)),
          (document.getElementById("gear-104-gm2").innerHTML = z.getUint8(18)),
          dD();
      })(view);
      break;
    case 47:
      !((z) => {
        var V = z.getInt32(1);
        document.getElementById("respawn-button").innerHTML =
          V > 0 ? "Respawn<div>at level " + V + "</div>" : "Respawn";
      })(view);
      break;
    case 48:
      !((z) => {
        var V = z.getUint8(1);
        uD = [];
        for (var l = 2, D = "", v = 0; v < V; v++) {
          var c = z.getUint8(l),
            P = Nl(z, l + 1);
          (l += 2 + 2 * P.length),
            uD.push({ id: c, name: P }),
            (D +=
              '<div onclick="defly.voteForMap(' + v + ');">' + P + "</div>");
        }
        console.log("received map to vote for", uD),
          (document.getElementById("map-vote-candidates").innerHTML = D),
          (document.getElementById("map-vote").style.display = "block");
      })(view);
      break;
    case 55:
      (document.getElementById("spawn-lose").style.display = "block"),
        (document.getElementById("respawn-button").style.display = "none");
      break;
    case 56:
      !((z) => {
        (jV = {
          x1: z.getFloat32(1),
          y1: z.getFloat32(5),
          x2: z.getFloat32(9),
          y2: z.getFloat32(13),
        }),
          (tV = true),
          (F["tower-kh"] = PIXI.Texture.fromImage("img/tower-kh.png"));
      })(view);
      break;
    case 57:
      !((z) => {
        if (Rv) return;
        for (
          var V = Nl(z, 1).replace(/ +/g, "").split("-"), l = 0;
          l < V.length;
          l++
        ) {
          var D = parseInt(V[l]);
          isFinite(D) &&
            D >= 1 &&
            D <= IV.length &&
            ((AV[l] = IV[D - 1]), zl || (colorNamesNew[l] = colorNames[D - 1]));
        }
      })(view);
      break;
    case 58:
      !((z) => {
        var V = z.getInt32(1),
          l = z.getFloat32(5),
          D = z.getFloat32(9),
          v = z.getUint8(13) > 0,
          c = z.getFloat32(14),
          P = z.getFloat32(18);
        if ((console.log("INPUT", V, v, l, D, c, P), XV[Kz])) {
          var L = new PIXI.Sprite(F.shoot);
          L.anchor.set(0.5),
            isFinite(c)
              ? ((L.width = L.height = 0.2 * kz),
                (L.tint = 255),
                (L.x = c),
                (L.y = P))
              : ((L.width = L.height = 0.1 * kz),
                (L.tint = 16711680),
                (L.x = XV[Kz].x + Math.cos(l) * D),
                (L.y = XV[Kz].y + Math.sin(l) * D)),
            Z.addChild(L),
            anime({
              targets: L,
              alpha: 0,
              easing: "linear",
              duration: 500,
              complete: () => {
                Z.removeChild(L);
              },
            });
          var W =
            XV[Kz].filters && XV[Kz].filters.length > 0
              ? XV[Kz].filters[0]
              : null;
          W ||
            ((W = new PIXI.filters.ColorMatrixFilter()),
            (XV[Kz].filters = [W])),
            v ? W.brightness(2) : W.reset();
        }
      })(view);
      break;
    case 59:
      !((z) => {
        if (Rv) return;
        for (var V = Nl(z, 1).split(";"), l = 0; l < V.length; l++)
          colorNamesNew[l] = V[l];
        zl = true;
      })(view);
      break;
    case 60:
      !((z) => {
        var V = false;
        if (!wD) {
          if (
            ((document.getElementById("homepage").style.display = "none"),
            (document.getElementById("homepage").style.display = "none"),
            _D(),
            (V = true),
            document
              .getElementById("gm-1v1-button-continue")
              .addEventListener("click", ED),
            document
              .getElementById("gm-1v1-button-back")
              .addEventListener("click", Il),
            document
              .getElementById("gm-1v1-button-back2")
              .addEventListener("click", Il),
            document
              .getElementById("back-to-1v1-lobby-button")
              .addEventListener("click", () => {
                Tc(-1),
                  _D(),
                  "undefined" != typeof aiptag &&
                    aiptag.cmd.display.push &&
                    !_P &&
                    Date.now() - uz > 3e4 &&
                    (aiptag.cmd.display.push(() => {
                      aipDisplayTag.display("defly-io_300x250");
                    }),
                    (uz = Date.now()));
              }),
            document
              .getElementById("spectate-1v1-previous-button")
              .addEventListener("click", () => {
                Tc(0, true);
              }),
            document
              .getElementById("spectate-1v1-next-button")
              .addEventListener("click", () => {
                Tc(0, false);
              }),
            document.getElementById("gm-1v1-players-header"))
          ) {
            const z = document
              .getElementById("gm-1v1-players-header")
              .getElementsByTagName("th");
            for (let V = 0; V < z.length; V++)
              z[V].addEventListener("click", () => {
                AD(V);
              });
          }
          "undefined" != typeof aiptag &&
            aiptag.cmd.display.push &&
            !_P &&
            (aiptag.cmd.display.push(() => {
              aipDisplayTag.display("defly-io_300x250");
            }),
            (uz = Date.now())),
            (wD = true);
        }
        for (var l = z.getInt32(1), D = 5, v = 0; v < l; v++) {
          var c = z.getInt32(D),
            P = z.getInt32(D + 4),
            L = z.getInt32(D + 8),
            W = z.getUint8(D + 12);
          D += 13;
          var g = nz[c];
          V ||
            EV[c] ||
            XD(Cl(g) + " entered the lobby", PV ? "info-dark" : "info"),
            (EV[c] = { name: g, kills: P, deaths: L, status: W }),
            zv == c &&
              ((Vv && 1 == W) || (!Vv && 0 == W)) &&
              (document.getElementById("gm-1v1-confirm-duel").style.visibility =
                "hidden");
        }
        OD();
      })(view);
      break;
    case 61:
      !((z) => {
        var V = z.getInt32(1);
        XD(Cl(EV[V].name) + " left the lobby", PV ? "info-dark" : "info"),
          delete EV[V],
          OD(),
          delete cl[V],
          delete nz[V],
          zv == V &&
            (document.getElementById("gm-1v1-confirm-duel").style.visibility =
              "hidden");
      })(view);
      break;
    case 62:
      !((z) => {
        var V = z.getInt32(1);
        V && XD(Cl(EV[V].name) + " is challenging you!", "bold");
        var l = z.getInt32(5),
          D = "";
        for (let V = 0; V < l; V++) {
          const l = z.getInt32(9 + 4 * V);
          D +=
            '<div><div class="duel-text">' +
            Cl(EV[l].name) +
            ' is challenging you, accept?</div> <div onclick="if (event.isTrusted) defly.answerChallenge(' +
            l +
            ', true);" class="button orange">YES</div> <div onclick="if (event.isTrusted) defly.answerChallenge(' +
            l +
            ', false);" class="button">NO</div></div>';
        }
        document.getElementById("gm-1v1-duel-list").innerHTML = D;
      })(view);
      break;
    case 63:
      !((z) => {
        var V = z.getInt32(1),
          l = z.getUint8(5);
        l < 2 &&
          (XD(
            Cl(EV[V].name) +
              (l ? " accepted" : " rejected") +
              " your challenge",
            "bold",
          ),
          (EV[V].challenged = false),
          OD());
        if (1 == l || 2 == l)
          for (var V in ((ZV = V), EV)) EV[V].challenged = false;
      })(view);
      break;
    case 64:
      !((z) => {
        var V = Nl(z, 1)
          .replace(/[ ,-]+/g, " ")
          .split(" ");
        Gz = [];
        for (var l = 0; l < V.length; l++) {
          var D = parseInt(V[l]);
          DD[D] ? Gz.push(D) : console.error("Skin id does not exists", D);
        }
      })(view);
      break;
    case 98:
      (xz = true), console.log("Received: kicked for inactivity");
      try {
        q.close();
      } catch (z) {}
      (n || vv) && document.location.reload();
      break;
    case 99: {
      var c = new Date().getTime() - P;
      el(c), console.log("ping is", c), 0;
      break;
    }
    default:
      console.log("unhandled message code", opcode);
  }
}
function el(z) {
  new Date().getTime();
  L
    ? ((L = 0.9 * L + 0.1 * z), z > W && (W = z), z < g && (g = z))
    : ((W = L = z), (g = L));
}
function Nl(z, V) {
  for (var l = z.getUint8(V++), D = "", v = 0; v < l; v++) {
    var c = z.getUint8(V + 2 * v + 1) | (z.getUint8(V + 2 * v + 0) << 8);
    D += String.fromCharCode(c);
  }
  return D;
}
function zD(z, V, l) {
  z.setUint8(V, l.length);
  for (var D = 0; D < l.length; D++) {
    var v = l.charCodeAt(D);
    z.setUint8(V + 1 + 2 * D + 1, 255 & v),
      z.setUint8(V + 1 + 2 * D + 0, v >>> 8);
  }
}
function VD(z, V) {
  var l = new PIXI.Sprite(F["wall-line"]);
  return (
    (l.dot1 = z),
    (l.dot2 = V),
    (l.rotation = Math.atan2(V.y - z.y, V.x - z.x)),
    (l.x = (z.x + V.x) / 2),
    (l.y = (z.y + V.y) / 2),
    l.anchor.set(0.5),
    (l.height = dV),
    (l.width =
      Math.sqrt((V.x - z.x) ** 2 + (V.y - z.y) ** 2) - 0.9 * (z.size + V.size)),
    z.lines.push(l),
    V.lines.push(l),
    l
  );
}
var lD,
  DD = {
    1: {
      base: "player1",
      notint: "player1-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 0.6329729782327356,
        },
      ],
      size: 1,
    },
    2: {
      base: "player2",
      notint: "player2-notint",
      rotors: [
        {
          img: "rotor2",
          x: -30.96 / 46.24,
          y: -30.96 / 46.24,
          speed: 8 * Math.PI,
          size: 19.593 / 65.333,
        },
        {
          img: "rotor3",
          x: -30.96 / 46.24,
          y: 30.96 / 46.24,
          speed: 8 * Math.PI,
          size: 19.593 / 65.333,
        },
        {
          img: "rotor3",
          x: 30.96 / 46.24,
          y: -30.96 / 46.24,
          speed: 8 * Math.PI,
          size: 19.593 / 65.333,
        },
        {
          img: "rotor2",
          x: 30.96 / 46.24,
          y: 30.96 / 46.24,
          speed: 8 * Math.PI,
          size: 19.593 / 65.333,
        },
      ],
      size: 65.333 / 102.769,
    },
    3: {
      base: "player3",
      notint: "player3-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 0.6329729782327356,
        },
      ],
      size: 104.789 / 102.769,
    },
    4: {
      base: "player4",
      notint: "player4-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 0.6329729782327356,
        },
      ],
      size: 102.621 / 102.769,
    },
    5: {
      base: "player5",
      notint: "player5-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 0.6329729782327356,
        },
      ],
      size: 97.57 / 102.769,
    },
    6: {
      base: "player6",
      notint: "player6-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 0.6329729782327356,
        },
      ],
      size: 102.621 / 102.769,
    },
    7: {
      base: "player7",
      notint: "player7-notint",
      rotors: [
        {
          img: "rotor2",
          x: -21.97 / 38.3945,
          y: -21.72 / 38.3945,
          speed: 8 * Math.PI,
          size: 19.593 / 76.789,
        },
        {
          img: "rotor3",
          x: -21.72 / 38.3945,
          y: 21.72 / 38.3945,
          speed: 8 * Math.PI,
          size: 19.593 / 76.789,
        },
        {
          img: "rotor3",
          x: 21.97 / 38.3945,
          y: -21.72 / 38.3945,
          speed: 8 * Math.PI,
          size: 19.593 / 76.789,
        },
        {
          img: "rotor2",
          x: 21.97 / 38.3945,
          y: 21.72 / 38.3945,
          speed: 8 * Math.PI,
          size: 19.593 / 76.789,
        },
      ],
      size: 76.789 / 102.769,
    },
    8: {
      base: "player8",
      notint: "player8-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: (17.22 / 97.641) * 2,
          speed: 4 * Math.PI,
          size: 16.545 / 97.641,
        },
        {
          img: "rotor1",
          x: 0,
          y: (-17.22 / 97.641) * 2,
          speed: 4 * Math.PI,
          size: 16.545 / 97.641,
        },
      ],
      size: 97.641 / 102.769,
    },
    9: {
      base: "player9",
      notint: "player9-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 51.183 / 64.879,
        },
      ],
      size: 64.879 / 102.769,
    },
    10: {
      base: "player10",
      notint: "player10-notint",
      rotors: [
        {
          img: "rotor1",
          x: (-22.48 / 72.412) * 2,
          y: 0,
          speed: 4 * Math.PI,
          size: 33.953 / 72.412,
        },
        {
          img: "rotor1",
          x: (22.48 / 72.412) * 2,
          y: 0,
          speed: 4 * Math.PI,
          size: 33.953 / 72.412,
        },
      ],
      size: 72.412 / 102.769,
    },
    11: {
      base: "player11",
      notint: "player11-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 65.05 / 82.769,
        },
      ],
      size: 82.769 / 102.769,
    },
    12: {
      base: "player12",
      notint: "player12-notint",
      rotors: [
        {
          img: "rotor2",
          x: -15.95 / 39.848,
          y: -24.85 / 39.848,
          speed: 8 * Math.PI,
          size: 15.577 / 79.696,
        },
        {
          img: "rotor3",
          x: -15.95 / 39.848,
          y: 24.85 / 39.848,
          speed: 8 * Math.PI,
          size: 15.577 / 79.696,
        },
        {
          img: "rotor3",
          x: 15.95 / 39.848,
          y: -24.85 / 39.848,
          speed: 8 * Math.PI,
          size: 15.577 / 79.696,
        },
        {
          img: "rotor2",
          x: 15.95 / 39.848,
          y: 24.85 / 39.848,
          speed: 8 * Math.PI,
          size: 15.577 / 79.696,
        },
      ],
      size: 79.696 / 102.769,
    },
    13: {
      base: "player13",
      notint: "player13-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 65.05 / 88.841,
        },
      ],
      size: 88.841 / 102.769,
    },
    14: {
      base: "player14",
      notint: "player14-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 34.038 / 88.841,
        },
      ],
      size: 88.841 / 102.769,
    },
    15: {
      base: "player15",
      notint: "player15-notint",
      rotors: [
        {
          img: "rotor4",
          x: 0,
          y: 0,
          speed: 2 * Math.PI,
          size: 44.206 / 59.912,
        },
      ],
      size: 0.6412750926835914,
    },
    16: {
      base: "player16",
      notint: "player16-notint",
      rotors: [
        {
          img: "rotor1",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 0.6329729782327356,
        },
      ],
      size: 113.538 / 102.769,
    },
    17: {
      base: "player17",
      notint: "player17-notint",
      rotors: [
        {
          img: "rotor3",
          x: 0,
          y: -22.05 / 37.365,
          speed: 4 * Math.PI,
          size: 19.289 / 74.73,
        },
        {
          img: "rotor3",
          x: 0,
          y: 22.05 / 37.365,
          speed: 4 * Math.PI,
          size: 19.289 / 74.73,
        },
        {
          img: "rotor3",
          x: 21.82 / 37.365,
          y: -22.83 / 37.365,
          speed: 4 * Math.PI,
          size: 19.289 / 74.73,
        },
        {
          img: "rotor3",
          x: 21.82 / 37.365,
          y: 22.83 / 37.365,
          speed: 4 * Math.PI,
          size: 19.289 / 74.73,
        },
      ],
      size: 74.73 / 102.769,
    },
    18: {
      base: "player18",
      notint: "player18-notint",
      rotors: [
        {
          img: "rotor2",
          x: -25.63 / 38.7155,
          y: 0,
          speed: 4 * Math.PI,
          size: 16.111 / 96.214,
        },
        {
          img: "rotor2",
          x: 11.5 / 38.7155,
          y: 22.28 / 38.7155,
          speed: 4 * Math.PI,
          size: 20.019 / 96.214,
        },
        {
          img: "rotor2",
          x: 11.5 / 38.7155,
          y: -22.28 / 38.7155,
          speed: 4 * Math.PI,
          size: 20.019 / 96.214,
        },
      ],
      size: 96.214 / 102.769,
    },
    19: {
      base: "player19",
      notint: "player19-notint",
      rotors: [
        {
          img: "rotor1",
          x: -3.4 / 35.1875,
          y: 16.14 / 35.1875,
          speed: 4 * Math.PI,
          size: 9.354 / 70.375,
        },
        {
          img: "rotor1",
          x: -3.4 / 35.1875,
          y: -16.14 / 35.1875,
          speed: 4 * Math.PI,
          size: 9.354 / 70.375,
        },
      ],
      size: 79.214 / 102.769,
    },
    20: {
      base: "player20",
      notint: "player20-notint",
      rotors: [
        {
          img: "rotor3",
          x: 0,
          y: 23.61 / 35.6755,
          speed: 8 * Math.PI,
          size: 42.767 / 71.351,
        },
        {
          img: "rotor3",
          x: 0,
          y: -23.61 / 35.6755,
          speed: 8 * Math.PI,
          size: 42.767 / 71.351,
        },
      ],
      size: 71.351 / 102.769,
    },
    21: {
      base: "player21",
      notint: "player21-notint",
      rotors: [
        {
          img: "rotor5",
          x: 0,
          y: 0,
          speed: 4 * Math.PI,
          size: 68.192 / 100.233,
        },
      ],
      size: 113.491 / 102.769,
    },
    22: {
      base: "player22",
      notint: "player22-notint",
      rotors: [{ img: "rotor6", x: 0, y: 0, speed: 4 * Math.PI, size: 1 }],
      size: 225 / 256,
    },
    23: {
      base: "player23",
      notint: "player23-notint",
      rotors: [{ img: "rotor6", x: 0, y: 0, speed: 4 * Math.PI, size: 1 }],
      size: 225 / 256,
    },
    24: {
      base: "player24",
      notint: "player24-notint",
      rotors: [
        { img: "rotor7c", x: 0, y: 0, speed: 2 * Math.PI, size: 1, layer: 0 },
      ],
      size: 0.6412750926835914,
    },
    25: {
      base: "player25",
      notint: "player25-notint",
      rotors: [
        { img: "rotor8b", x: 0, y: 0, speed: 2 * Math.PI, size: 1, layer: 1 },
      ],
      size: 0.6412750926835914,
    },
  };
function vD(z, V) {
  return (
    (lD && lD.width == z && lD.height == V) ||
      (((lD = document.createElement("canvas")).width = z), (lD.height = V)),
    lD
  );
}
var cD = {};
function PD(z, V) {
  if (cD[z.textureCacheIds[0] + "-" + V])
    var l = cD[z.textureCacheIds[0] + "-" + V];
  else {
    var D = V,
      v = V;
    z.width > z.height && (v = (V / z.width) * z.height),
      z.width < z.height && (D = (V / z.height) * z.width);
    var c = vD(D, v),
      P = c.getContext("2d");
    P.clearRect(0, 0, D, v),
      P.drawImage(
        z.baseTexture.source,
        z.orig.x,
        z.orig.y,
        z.orig.width,
        z.orig.height,
        0,
        0,
        D,
        v,
      );
    l = c.toDataURL("image/png");
    cD[z.textureCacheIds[0] + "-" + V] = l;
  }
  return l;
}
function LD(z, V) {
  for (
    var l = z.getImageData(0, 0, z.canvas.width, z.canvas.height),
      D = (16711680 & V) >> 16,
      v = (65280 & V) >> 8,
      c = 255 & V,
      P = 0;
    P < l.data.length;
    P += 4
  ) {
    var L = l.data[P + 0],
      W = l.data[P + 1],
      g = l.data[P + 2];
    (l.data[P + 0] = (L * D) / 255),
      (l.data[P + 1] = (W * v) / 255),
      (l.data[P + 2] = (g * c) / 255);
  }
  z.putImageData(l, 0, 0);
}
function WD(z, V) {
  var l = vD(256, 256),
    D = l.getContext("2d"),
    v = DD[Tz[z] ? Tz[z] : 1],
    c = document.createElement("div");
  if (
    ((c.skinId = Tz[z] ? Tz[z] : 1),
    (c.style.position = "relative"),
    (c.style.display = "inline-block"),
    (c.style.width = V + "px"),
    (c.style.height = V + "px"),
    (c.style.backgroundColor = "#F2F7FF"),
    !v)
  )
    return (c.className = "loading"), c;
  D.clearRect(0, 0, 256, 256), (D.globalCompositeOperation = "source-over");
  var P = document.createElement("img");
  (P.style.position = "absolute"),
    (P.style.top = (V * (1 - 0.9)) / 2 + "px"),
    (P.style.left = (V * (1 - 0.9)) / 2 + "px"),
    (P.style.width = 0.9 * V + "px"),
    (P.style.height = 0.9 * V + "px"),
    F[v.base] &&
      (D.drawImage(
        F[v.base].baseTexture.source,
        F[v.base].orig.x,
        F[v.base].orig.y,
        F[v.base].orig.width,
        F[v.base].orig.height,
        0,
        0,
        256,
        256,
      ),
      LD(D, Pl(z))),
    F[v.notint] &&
      D.drawImage(
        F[v.notint].baseTexture.source,
        F[v.notint].orig.x,
        F[v.notint].orig.y,
        F[v.notint].orig.width,
        F[v.notint].orig.height,
        0,
        0,
        256,
        256,
      );
  var L = l.toDataURL("image/png");
  (P.src = L), c.appendChild(P);
  var W =
    -1 !=
    [81, 82, 83, 84, 85, 86, 87, 88, 90, 95, 57, 62, 63, 70].indexOf(Tz[z])
      ? 1
      : 2;
  c.rotors = [];
  for (var g = 0; g < v.rotors.length; g++) {
    var q = v.rotors[g];
    if (F[q.img] && q.visibility != W) {
      var m = document.createElement("img");
      if (
        ((m.style.position = "absolute"),
        (m.style.left =
          (V * (1 - 0.9)) / 2 -
          (0.9 * -q.x * V) / 2 -
          (0.9 * V * Math.abs(q.size)) / 2 +
          (0.9 * V) / 2 +
          "px"),
        (m.style.top =
          (V * (1 - 0.9)) / 2 -
          (0.9 * -q.y * V) / 2 -
          (((0.9 * V * Math.abs(q.size)) / F[q.img].orig.width) *
            F[q.img].orig.height) /
            2 +
          (0.9 * V) / 2 +
          "px"),
        (m.style.width = 0.9 * V * Math.abs(q.size) + "px"),
        (m.style.height =
          ((0.9 * V * Math.abs(q.size)) / F[q.img].orig.width) *
            F[q.img].orig.height +
          "px"),
        q.tinted)
      ) {
        D.clearRect(0, 0, 256, 256),
          D.save(),
          q.size < 0 && (D.translate(256, 0), D.scale(-1, 1)),
          D.drawImage(
            F[q.img].baseTexture.source,
            F[q.img].orig.x,
            F[q.img].orig.y,
            F[q.img].orig.width,
            F[q.img].orig.height,
            0,
            0,
            256,
            256,
          ),
          D.restore(),
          LD(D, Pl(z));
        L = l.toDataURL("image/png");
      } else L = PD(F[q.img], 256);
      (m.src = L),
        q.speed > 0
          ? (m.style.animation =
              "spinInverse " + (2 * Math.PI) / q.speed + "s linear infinite")
          : q.speed < 0 &&
            (m.style.animation =
              "spin " + (2 * Math.PI) / -q.speed + "s linear infinite"),
        void 0 !== q.layer
          ? c.insertBefore(m, c.childNodes[q.layer])
          : c.appendChild(m);
    }
  }
  return c;
}
function gD(z) {
  2 != hz &&
    (SV && (Tz[z] = Math.floor(7 * Math.random()) + 72),
    Gz && Gz.length > 0 && (Tz[z] = Gz[Math.floor(Math.random() * Gz.length)]),
    hV &&
      ((Tz[z] = Math.floor(7 * Math.random()) + 114),
      Math.random() <= 0.01 && (Tz[z] = 121)),
    UV && (Tz[z] = Math.floor(6 * Math.random()) + 130));
  var V = DD[Tz[z] ? Tz[z] : 1];
  V || (V = DD[1]);
  var l = new PIXI.Container(),
    D = new PIXI.Sprite(F[V.base]);
  (D.width = 2 * kz * V.size),
    (D.height = 2 * kz * V.size),
    D.anchor.set(0.5),
    (D.tint = Pl(z)),
    l.addChild(D);
  var v = new PIXI.Sprite(F[V.notint]);
  (v.width = 2 * kz * V.size),
    (v.height = 2 * kz * V.size),
    v.anchor.set(0.5),
    l.addChild(v),
    (l.rotors = []);
  for (var c = 0; c < V.rotors.length; c++) {
    var P = V.rotors[c],
      L = new PIXI.Sprite(F[P.img]);
    (L.width = 2 * kz * V.size * P.size),
      (L.height = (L.width / L.texture.width) * L.texture.height),
      L.anchor.set(0.5),
      (L.baseRotation = 0),
      (L.x = P.x * kz * V.size),
      (L.y = P.y * kz * V.size),
      void 0 !== P.layer && P.layer <= l.children.length
        ? l.addChildAt(L, P.layer)
        : l.addChild(L),
      void 0 !== P.tinted && P.tinted && (L.tint = Pl(z)),
      l.rotors.push({
        sprite: L,
        speed: P.speed,
        visibility: void 0 !== P.visibility ? P.visibility : 0,
        fixedRotation: void 0 !== P.fixedRotation && P.fixedRotation,
        noRotation: void 0 !== P.noRotation && P.noRotation,
      });
  }
  var W = new PIXI.Sprite(F.shield);
  (W.width = 2 * kz),
    (W.height = 2 * kz),
    W.anchor.set(0.5),
    (W.tint = Pl(z)),
    (W.visible = false);
  var g = new PIXI.Text(nz[z] ? nz[z] : "", {
    fontFamily: "Arial",
    fontSize: Math.round(window.innerHeight / 60),
    fill: PV ? 16777215 : 0,
    align: "center",
  });
  if (
    (g.anchor.set(0.5),
    g.scale.set(1 / U.scale.x),
    (l.sx = 0),
    (l.sy = 0),
    (l.name = name),
    (l.playerId = z),
    (XV[z] = l),
    Z.addChild(l),
    (l.shield = W),
    Z.addChild(W),
    (l.usernameText = g),
    Y.addChild(g),
    n && z == HV && ((l.visible = false), (g.visible = false)),
    fz[z])
  )
    if (F["badge-" + fz[z]]) {
      var q = new PIXI.Sprite(F["badge-" + fz[z]]);
      (q.height = 0.6 * kz),
        (q.width = (q.height / q.texture.height) * q.texture.width),
        Y.addChild(q),
        q.anchor.set(0.5),
        (l.badge = q);
    } else {
      var m = new PIXI.loaders.Loader();
      m.add("badge-" + fz[z], "img/badges/" + fz[z] + ".png"),
        m.load((V, D) => {
          if (((F["badge-" + fz[z]] = D["badge-" + fz[z]].texture), l.parent)) {
            var v = new PIXI.Sprite(F["badge-" + fz[z]]);
            (v.height = 0.6 * kz),
              (v.width = (v.height / v.texture.height) * v.texture.width),
              Y.addChild(v),
              v.anchor.set(0.5),
              (l.badge = v);
          }
        });
    }
  return l;
}
var qD,
  mD,
  hD,
  UD,
  tD = 0;
function jD() {
  (tD =
    1 == iV
      ? ((3 * Math.sqrt(3)) / 2) * (Oz / 2) ** 2
      : 2 == iV
        ? (((Math.PI * Oz) / 2) * ez) / 2
        : Oz * ez),
    (mD = [
      0 -
        ((3 *
          (qD = [
            (ez / Oz) * 2,
            (ez / -Oz) * 2,
            (ez / -Oz) * 2,
            (ez / Oz) * 2,
          ])[0]) /
          4) *
          Oz,
      ez - ((3 * qD[1]) / 4) * Oz,
      0 - ((1 * qD[2]) / 4) * Oz,
      ez - ((1 * qD[3]) / 4) * Oz,
    ]);
}
function aD(z) {
  if (0 == iV)
    z.x < 0 && (z.x = 0),
      z.x > Oz && (z.x = Oz),
      z.y < 0 && (z.y = 0),
      z.y > ez && (z.y = ez);
  else if (1 == iV) {
    if (
      (z.x < 0 && (z.x = 0),
      z.x > Oz && (z.x = Oz),
      z.y < 0 && (z.y = 0),
      z.y > ez && (z.y = ez),
      z.x > (3 * Oz) / 4)
    ) {
      var V = qD[z.y < ez / 2 ? 0 : 1],
        l = mD[z.y < ez / 2 ? 0 : 1],
        D = (z.y - l) / V;
      z.x > D && (z.x = D);
    } else if (z.x < (1 * Oz) / 4) {
      (V = qD[z.y < ez / 2 ? 2 : 3]), (l = mD[z.y < ez / 2 ? 2 : 3]);
      var v = (z.y - l) / V;
      z.x < v && (z.x = v);
    }
  } else if (2 == iV) {
    if (z.dst2XY(Oz / 2, Oz / 2) > (Oz / 2) ** 2) {
      var c = Math.atan2(z.y - ez / 2, z.x - Oz / 2);
      (z.x = Oz / 2 + (Math.cos(c) * Oz) / 2),
        (z.y = ez / 2 + (Math.sin(c) * ez) / 2);
    }
  }
}
function BD(z) {
  if (z) {
    var V = az.slice();
    az = [];
    for (var l = 0; l < V.length; l++) Lc(V[l], true);
  } else if (((az = []), jz > 0))
    for (l = 0; l < Bz.length; l++)
      (document.getElementById("skill-plus-" + l).style.display =
        Bz[l] >= Mz[l] ? "none" : "block"),
        (document.getElementById("skill-bar-" + l).innerHTML =
          wv('<span class="full"></span>', Bz[l]) +
          wv("<span></span>", Mz[l] - Bz[l]));
  document.getElementById("upgrade-block").classList.remove("ask-redo");
}
function CD() {
  (document.getElementById("respawn").style.color = PV ? "white" : ""),
    (document.getElementById("respawn").style.backgroundColor = PV
      ? "rgba(255, 255, 255, 0.2)"
      : ""),
    (document.getElementById("respawn-gm2").style.color = PV ? "white" : ""),
    (document.getElementById("respawn-gm2").style.backgroundColor = PV
      ? "rgba(255, 255, 255, 0.2)"
      : ""),
    (document.getElementById("chat-input").style.color = PV ? "white" : ""),
    (document.getElementById("chat-history").style.color = PV ? "white" : ""),
    (document.getElementById("chat-history-full").style.color = PV
      ? "white"
      : ""),
    (document.getElementById("fps").style.color = PV ? "white" : ""),
    (document.getElementById("choose-superpower").style.color = PV
      ? "white"
      : ""),
    (document.getElementById("upgrade-block").style.color = PV ? "white" : ""),
    (document.getElementById("countdown").style.color = PV ? "white" : "");
  for (
    var z = document.getElementsByClassName("bars-bg"), V = 0;
    V < z.length;
    V++
  )
    z[V].style.backgroundColor = PV ? "rgba(84, 84, 84, 0.7)" : "";
  for (
    z = document.getElementsByClassName("score-bar"), V = 0;
    V < z.length;
    V++
  )
    z[V].style.backgroundColor = PV ? "rgba(255, 255, 255, 0.5)" : "";
  for (z = document.getElementsByClassName("xp-bar"), V = 0; V < z.length; V++)
    z[V].style.backgroundColor = PV ? "rgba(255, 255, 255, 0.5)" : "";
  PV
    ? document.body.classList.add("dark-theme")
    : document.body.classList.remove("dark-theme");
}
function pD(z, V, l) {
  var D = (l.x - z) ** 2 + (l.y - V) ** 2;
  if (D < 0.01 || D > 1) (l.x = z), (l.y = V);
  else {
    var v = 0.01 / D;
    (l.x = v * l.x + (1 - v) * z), (l.y = v * l.y + (1 - v) * V);
  }
}
function YD(z) {
  var V = 5,
    l = z.getInt16(V);
  V += 2;
  for (var D = {}, v = 0; v < l; v++) {
    var c = z.getInt32(V),
      P = z.getFloat32(V + 4),
      L = z.getFloat32(V + 8),
      W = z.getFloat32(V + 12),
      g = z.getFloat32(V + 16),
      q = z.getFloat32(V + 20),
      m = z.getUint8(V + 24);
    (V += 25),
      XV[c] || gD(c),
      (D[c] = true),
      c != HV
        ? ((XV[c].x = P),
          (XV[c].y = L),
          (XV[c].sx = W),
          (XV[c].sy = g),
          (XV[c].rotation = q),
          (XV[c].superpower = 255 == m ? -1 : m),
          (XV[c].shield.visible = 3 == m),
          XV[c].shield.visible && XV[c].shield.position.set(P, L))
        : ((XV[c].sx = W), (XV[c].sy = g), (XV[c].shield.visible = 3 == m)),
      pD(P, L, XV[c]);
  }
  for (var c in XV)
    if ("ghost" != c && !D[c]) {
      var h = XV[c];
      delete XV[c],
        Z.removeChild(h),
        Y.removeChild(h.usernameText),
        h.shield && Z.removeChild(h.shield),
        h.badge && Y.removeChild(h.badge);
    }
  if (XV[HV])
    ((U = document.getElementById("minimap-position")).style.left =
      (XV[HV].x / Oz) * 100 + "%"),
      (U.style.top = (XV[HV].y / ez) * 100 + "%");
  else if (XV[Kz]) {
    var U;
    ((U = document.getElementById("minimap-position")).style.left =
      (XV[Kz].x / Oz) * 100 + "%"),
      (U.style.top = (XV[Kz].y / ez) * 100 + "%");
  }
  if (!oV && (1 == hz || 2 == hz || 3 == hz)) {
    var t = "";
    for (var c in XV) {
      if (c != HV && uV[c] == MV && !mc)
        t +=
          '<div class="minimap-position" style="left: ' +
          (XV[c].x / Oz) * 100 +
          "%; top: " +
          (XV[c].y / ez) * 100 +
          '%;"></div>';
    }
    document.getElementById("minimap-team-positions").innerHTML = t;
  }
}
var oD = 0;
var ZD,
  FD,
  KD,
  nD,
  fD = [
    "Can't cross enemy lines",
    "Can't build: too close from existing dot",
    "Can't build line so long",
    "Can't build line on existing dot",
    "Can't build dot on existing line",
  ],
  TD = 0;
function showAlert(z, V, l) {
  var D = document.getElementById("user-info");
  D && l && (window.document.body.removeChild(D), (D = null)),
    D ||
      ((D = document.createElement("div")).setAttribute("class", "user-info"),
      D.setAttribute("id", "user-info"),
      window.document.body.appendChild(D)),
    (D.innerHTML = z),
    PV && (D.style.color = "white"),
    (D.style.opacity = 1),
    clearTimeout(KD),
    clearInterval(nD),
    (KD = setTimeout(() => {
      var z = new Date().getTime();
      nD = setInterval(() => {
        var V = new Date().getTime() - z;
        V > 500
          ? (clearInterval(nD), window.document.body.removeChild(D))
          : (D.style.opacity = 1 - V / 500);
      }, 20);
    }, V));
}
function QD(z) {
  var V = document.getElementById("fade-screen");
  V ||
    ((V = document.createElement("div")).setAttribute("id", "fade-screen"),
    window.document.body.appendChild(V)),
    anime({
      targets: V,
      opacity: [0, 1],
      easing: "linear",
      duration: 500,
      complete: z,
    });
}
function dD(z) {
  var V = document.getElementById("fade-screen");
  V &&
    anime({
      targets: V,
      opacity: [1, 0],
      easing: "linear",
      duration: 500,
      complete: () => {
        window.document.body.removeChild(V), "function" == typeof z && z();
      },
    });
}
var sD = [];
function JD() {
  for (
    var z = document.getElementById("toasts"),
      V = "",
      l = new Date().getTime(),
      D = sD.length - 1;
    D >= 0;
    D--
  ) {
    if (l - sD[D].t >= 9900) sD.splice(D, 1);
    else
      V =
        "<div" +
        (sD[D].c ? " class=" + sD[D].c : "") +
        ">" +
        sD[D].s +
        "</div>" +
        V;
  }
  z.innerHTML = V;
}
function xD(z, V) {
  sD.push({ t: new Date().getTime(), s: z, c: V }), JD(), setTimeout(JD, 1e4);
}
var SD = [],
  RD = [];
function yD() {
  for (
    var z = document.getElementById("chat-history"),
      V = "",
      l = new Date().getTime(),
      D = SD.length - 1;
    D >= 0;
    D--
  ) {
    if (l - SD[D].t >= 2e4) SD.splice(D, 1);
    else
      V =
        "<div" +
        (SD[D].c ? " class=" + SD[D].c : "") +
        ">" +
        SD[D].s +
        "</div>" +
        V;
  }
  z.innerHTML = V;
}
function bD(z) {
  for (
    var V =
        document.getElementById("chat-history-full").scrollHeight -
          document.getElementById("chat-history-full").scrollTop -
          document.getElementById("chat-history-full").offsetHeight <=
        1,
      l = document.getElementById("chat-history-full"),
      D = "",
      v = 0;
    v < RD.length;
    v++
  ) {
    D +=
      "<div" + (RD[v].c ? " class=" + RD[v].c : "") + ">" + RD[v].s + "</div>";
  }
  (l.innerHTML = D),
    z &&
      V &&
      (document.getElementById("chat-history-full").scrollTop =
        document.getElementById("chat-history-full").scrollHeight);
}
function XD(z, V) {
  for (SD.push({ t: new Date().getTime(), s: z, c: V }); SD.length > 10; )
    SD.splice(0, 1);
  for (yD(), setTimeout(yD, 2e4), RD.push({ s: z, c: V }); RD.length > 100; )
    RD.splice(0, 1);
  document.getElementById("chat-block").classList.contains("typing") &&
    bD(true);
}
function HD(z) {
  z = z.substring(0, 255);
  var V = new DataView(new ArrayBuffer(2 + 2 * z.length));
  V.setUint8(0, 10), V.setUint8(1, z.length);
  for (var l = 0; l < z.length; l++) {
    var D = z.charCodeAt(l);
    V.setUint8(2 + 2 * l + 1, 255 & D), V.setUint8(2 + 2 * l + 0, D >>> 8);
  }
  q.send(V.buffer);
}
var rD = [];
var MD = [
  "You win! You protected your bomb spots until the end",
  "You win! All enemies have been killed!",
  "You win! The bomb exploded",
  "You win! You defused the bomb",
  "You lose! You failed to plant the bomb before the countdown",
  "You lose! All your teammates have been killed",
  "You lose! You failed to defuse the bomb",
  "You lose! The enemy defused the bomb",
];
var uD = [];
function ED() {
  (document.getElementById("gm-1v1-continue-spinner").style.display =
    "inline-block"),
    (document.getElementById("gm-1v1-button-continue").style.display = "none"),
    (Ml = iD),
    !BV && Date.now() - Ez > 12e4 && Gl()
      ? "undefined" != typeof gtag &&
        gtag("event", "Respawn", {
          event_category: "Click",
          event_label: "VideoAd",
        })
      : (iD(),
        "undefined" != typeof gtag &&
          gtag("event", "Respawn", {
            event_category: "Click",
            event_label: "NoVideoAd",
          }));
}
function _D() {
  (document.getElementById("gm-1v1-lobby").style.display = "block"),
    document.getElementById("chat-block").classList.add("typing"),
    document.getElementById("chat-block").classList.add("gm-1v1-lobby"),
    (document.getElementById("spectate-1v1-ui").style.display = "none"),
    sz || Jz || (document.getElementById("chat-input").style.display = "none");
}
function iD() {
  var z = document.getElementById("gm-1v1-main"),
    V = { v: 1 };
  anime({
    targets: V,
    v: 0,
    easing: "easeOutQuad",
    duration: 500,
    update: () => {
      z.style.gridTemplateRows = `${50 + 50 * V.v}% 50%`;
    },
    complete: () => {
      z.style.gridTemplateRows = "50% 50%";
      document.getElementById("gm-1v1-continue-spinner").style.display = "none";
      document.getElementById("gm-1v1-button-continue").style.display = "none";
      document.getElementById("gm-1v1-button-back").style.display =
        "inline-block";
    },
  });
}
var wD = false;
let GD = 0,
  kD = 0,
  ID = ["name", "kills", "deaths", "statusText"];
function AD(z) {
  GD == z ? (kD = (kD + 1) % 3) : ((GD = z), (kD = 1)), OD();
}
function OD() {
  const z = [];
  for (var V in EV) {
    z.push(V);
    var l = EV[V];
    EV[V].statusText = l.challenged
      ? "Asked"
      : 0 == l.status
        ? "Lobby"
        : "Arena";
  }
  0 != kD &&
    ((z, V, l) => {
      z.sort((z, D) =>
        "string" == typeof EV[z][V]
          ? EV[z][V].localeCompare(EV[D][V]) * (l ? 1 : -1)
          : (EV[z][V] - EV[D][V]) * (l ? 1 : -1),
      );
    })(z, ID[GD], 1 == kD);
  const D = document
    .getElementById("gm-1v1-players-header")
    .getElementsByTagName("th");
  for (let z = 0; z < D.length; z++)
    D[z].classList = GD == z && 0 != kD ? (1 == kD ? "sortA" : "sortD") : "";
  for (var v = "", c = 0; c < z.length; c++) {
    const V = z[c];
    l = EV[V];
    v +=
      '<tr id="gm1-player-"+id ' +
      (V == HV ? 'class="is-local-player" ' : "") +
      'onclick="defly.select1v1Player(' +
      V +
      ');"><td>' +
      Cl(l.name) +
      "</td><td>" +
      l.kills +
      "</td><td>" +
      l.deaths +
      "</td><td>" +
      l.statusText +
      "</td></tr>";
  }
  document.getElementById("gm-1v1-players").innerHTML = v;
}
var eD,
  ND,
  zv = 0,
  Vv = false;
function lv() {
  var z = Math.floor(xV / 60),
    V = Math.ceil(xV % 60);
  60 == V && ((V = 0), z++),
    (document.getElementById("countdown-value").textContent =
      (z > 0 ? "0" + z + ":" : "00:") + (V > 9 ? V : "0" + V));
}
function Dv(z, V) {
  return z + Math.floor(Math.random() * (V - z));
}
var vv = false;
var cv = 0;
function Pv(z) {
  var V = z.getInt32(1),
    l = z.getInt32(5),
    D = z.getFloat32(9),
    v = z.getFloat32(13),
    c = z.getUint8(17),
    P = z.getUint8(18),
    L = z.getFloat32(19),
    W = z.getInt32(23),
    g = Iz;
  if (RV[V]) 0;
  else {
    var q = new PIXI.Sprite(F.dot1);
    (q.x = D),
      (q.y = v),
      (q.width = 2 * g),
      (q.height = 2 * g),
      (q.size = g),
      q.anchor.set(0.5),
      (q.owner = l),
      (q.hp = c),
      (q.maxHP = P),
      (q.creationTurn = W),
      (q.alpha = 1),
      (q.tint = 1 == hz || 2 == hz ? Ll(l) : Pl(l)),
      tV &&
        1 == l &&
        D >= jV.x1 &&
        D <= jV.x2 &&
        v >= jV.y1 &&
        v <= jV.y2 &&
        F["tower-kh"] &&
        ((q.texture = F["tower-kh"]), (q.tint = 15642415)),
      (q.lines = []),
      (q.dotId = V),
      a.addChild(q),
      (RV[V] = q),
      q.hp != q.maxHP &&
        ((q.healthBar = Zv(q)),
        p.addChild(q.healthBar),
        (q.healthBar.outer.width = (q.healthBar.width * q.hp) / q.maxHP)),
      L > 0 && Lv(q, L),
      (0 != hz && 3 != hz) || l != HV || (jP = true);
  }
}
function Lv(z, V) {
  var l = new PIXI.Sprite(F.shield);
  (l.x = z.x),
    (l.y = z.y),
    (l.width = 1.709089011247097 * z.width),
    (l.height = 1.709089011247097 * z.height),
    l.anchor.set(0.5),
    (l.tint = 1 == hz || 2 == hz ? Ll(z.owner) : Pl(z.owner)),
    (l.lastAppearTurn = -1e3),
    (l.appearPercent = V),
    (l.state = 0),
    (l.alpha = 0),
    a.addChild(l),
    (z.shield = l);
}
function Wv(z, V, l) {
  return 3 == hz && 0 != l
    ? "dot" + V + "-" + l
    : SV || !aV || (1 != hz && 2 != hz) || z == MV
      ? !SV && aV && 0 == hz && z != HV
        ? "dot1-enemy"
        : "dot1"
      : "dot1-enemy";
}
function gv(z) {
  var V = z.getInt32(1),
    l = z.getInt32(5),
    D = z.getInt32(9),
    v = z.getInt32(13),
    c = z.getInt32(17),
    P = z.getInt32(21),
    L = RV[D],
    W = RV[v];
  if (
    (L || console.error("could not find dot", D),
    W || console.error("could not find dot", v),
    yV[V])
  )
    0;
  else {
    var g = VD(L, W);
    (g.lineId = V),
      (g.owner = l),
      (g.tint = 1 == hz || 2 == hz ? Ll(l) : Pl(l)),
      tV && 15642415 == L.tint && (g.tint = 15642415),
      (g.dot1 = L),
      (g.dot2 = W),
      (g.leftZoneId = c),
      (g.rightZoneId = P),
      B.addChild(g),
      (yV[V] = g),
      _ && _.addLine(g, L.position, W.position),
      (g.alpha = 0),
      anime({ targets: g, alpha: 1, duration: 250, easing: "linear" });
  }
}
function qv(z, V, l, D, v, c) {
  return z >= l && z <= D && V >= v && V <= c;
}
function mv(z, V, l, D, v, c, P, L) {
  if (z > c) {
    var W = (c - l) / (z - l);
    (z = c), (V = (V - D) * W + D);
  } else if (z < v) {
    W = (v - l) / (z - l);
    (z = v), (V = (V - D) * W + D);
  }
  if (V > L) {
    W = (L - D) / (V - D);
    (V = L), (z = (z - l) * W + l);
  } else if (V < P) {
    W = (P - D) / (V - D);
    (V = P), (z = (z - l) * W + l);
  }
  return { x: z, y: V };
}
function hv(z, V) {
  var l = z.getInt32(1),
    D = z.getInt32(5),
    v = z.getFloat32(9),
    c = z.getInt16(13),
    P = z.byteLength > 15 + 5 * c;
  if (P && bV[l]) {
    for (var L = bV[l], W = 0; W < L.linePath.length; W++)
      L.linePath[W].leftZoneId == l && (L.linePath[W].leftZoneId = 0),
        L.linePath[W].rightZoneId == l && (L.linePath[W].rightZoneId = 0);
    C.removeChild(L),
      delete bV[l],
      i &&
        i.removeZone(
          L,
          L.zoneBounds.minX,
          L.zoneBounds.maxX,
          L.zoneBounds.minY,
          L.zoneBounds.maxY,
        );
  }
  if (bV[l]) 0;
  else {
    var g,
      q,
      m = [],
      h = [];
    for (W = 0; W < c; W++) {
      var U = z.getInt32(15 + 5 * W),
        t = 0 == z.getUint8(15 + 5 * W + 4);
      yV[U] || console.error("new zone: line not found: " + U);
      var j = yV[U];
      if ((m.push(j), t ? (j.leftZoneId = l) : (j.rightZoneId = l), 1 == W)) {
        var a;
        j.dot1 == g.dot1 || j.dot1 == g.dot2
          ? (a = j.dot1)
          : (j.dot2 != g.dot1 && j.dot2 != g.dot2) || (a = j.dot2);
        var B = g.dot1 == a ? g.dot2 : g.dot1;
        P || (h.push(B.x, B.y), h.push(a.x, a.y)),
          (q = j.dot1 == a ? j.dot2 : j.dot1);
      } else
        W > 1 && (P || h.push(q.x, q.y), (q = j.dot1 != q ? j.dot1 : j.dot2));
      g = j;
    }
    if (P) {
      var p = 15 + 5 * c,
        Y = z.getInt16(p),
        o = [];
      for (W = 0; W < Y; W++) {
        var Z = z.getInt32(p + 2 + 4 * W);
        RV[Z] || console.error("new simplified zone: dot not found: " + Z);
        var F = RV[Z].x,
          K = RV[Z].y;
        h.push(F, K), o.push(RV[Z]);
      }
      var n = 0,
        f = 0,
        T = Oz,
        $ = ez;
      if (z.byteLength >= p + 2 + 4 * Y + 16) {
        (n = z.getFloat32(p + 2 + 4 * Y)),
          (T = z.getFloat32(p + 2 + 4 * Y + 4)),
          (f = z.getFloat32(p + 2 + 4 * Y + 8)),
          ($ = z.getFloat32(p + 2 + 4 * Y + 12));
        var Q = [],
          d = h[h.length - 2],
          s = h[h.length - 1],
          J = h[0],
          x = h[1];
        for (W = 0; W < h.length / 2; W++) {
          if (((F = J), (K = x), W < h.length / 2 - 1))
            (J = h[2 * (W + 1) + 0]), (x = h[2 * (W + 1) + 1]);
          else (J = h[0]), (x = h[1]);
          var S = qv(d, s, n, T, f, $),
            R = qv(F, K, n, T, f, $),
            y = qv(J, x, n, T, f, $);
          if (R) Q.push(F, K);
          else if (S || R || y) {
            if (S) {
              var b = mv(F, K, d, s, n, T, f, $);
              Q.push(b.x, b.y);
            }
            if (y) {
              b = mv(F, K, J, x, n, T, f, $);
              Q.push(b.x, b.y);
            }
          } else
            Q.push(Math.max(n, Math.min(T, F)), Math.max(f, Math.min($, K)));
          (d = F), (s = K);
        }
        h = Q;
      }
    }
    if (
      (((L = new PIXI.Graphics()).simplified = P),
      P && (L.simplifiedDotPath = o),
      (L.zoneId = l),
      (L.owner = D),
      (L.linePath = m),
      (L.areaScore = v),
      L.beginFill(1 == hz || 2 == hz ? Ll(D) : Pl(D), 0.5),
      tV && m.length > 0 && 15642415 == m[0].tint && L.beginFill(15642415, 0.5),
      L.drawPolygon(h),
      L.endFill(),
      (L.polygon = h),
      C.addChild(L),
      (bV[l] = L),
      V && D == HV)
    ) {
      pz++, Oc(L.areaScore / 4);
      var X = Math.ceil(L.areaScore / 4);
      if (pz <= 5 || X >= 50) {
        var H = {
          x: (L.linePath[0].dot1.x + L.linePath[0].dot2.x) / 2,
          y: (L.linePath[0].dot1.y + L.linePath[0].dot2.y) / 2,
        };
        Ic(H.x, H.y, "+" + X);
      }
    }
    V &&
      ((L.alpha = 0),
      anime({ targets: L, alpha: 1, duration: 250, easing: "linear" })),
      (0 != hz && 3 != hz) || D != HV || (aP = true);
  }
}
function Uv(z, V, l, D) {
  var v = z.getInt32(V),
    c = z.getInt32(V + 4),
    P = z.getFloat32(V + 8),
    L = z.getInt16(V + 12);
  if (((V += 14), l && bV[v])) {
    for (var W = bV[v], g = 0; g < W.linePath.length; g++)
      W.linePath[g].leftZoneId == v && (W.linePath[g].leftZoneId = 0),
        W.linePath[g].rightZoneId == v && (W.linePath[g].rightZoneId = 0);
    C.removeChild(W),
      delete bV[v],
      i &&
        i.removeZone(
          W,
          W.zoneBounds.minX,
          W.zoneBounds.maxX,
          W.zoneBounds.minY,
          W.zoneBounds.maxY,
        );
  }
  if (bV[v]) V += 5 * L;
  else {
    var q,
      m,
      h = [],
      U = [];
    for (g = 0; g < L; g++) {
      var t = z.getInt32(V),
        j = 0 == z.getUint8(V + 4);
      (V += 5), yV[t] || console.error("new zone: line not found: " + t);
      var a = yV[t];
      if ((h.push(a), j ? (a.leftZoneId = v) : (a.rightZoneId = v), 1 == g)) {
        var B;
        a.dot1 == q.dot1 || a.dot1 == q.dot2
          ? (B = a.dot1)
          : (a.dot2 != q.dot1 && a.dot2 != q.dot2) || (B = a.dot2);
        var p = q.dot1 == B ? q.dot2 : q.dot1;
        l || (U.push(p.x, p.y), U.push(B.x, B.y)),
          (m = a.dot1 == B ? a.dot2 : a.dot1);
      } else
        g > 1 && (l || U.push(m.x, m.y), (m = a.dot1 != m ? a.dot1 : a.dot2));
      q = a;
    }
    if (l) {
      var Y = z.getInt16(V);
      V += 2;
      var o = [];
      for (g = 0; g < Y; g++) {
        var Z = z.getInt32(V);
        (V += 4),
          RV[Z] || console.error("new simplified zone: dot not found: " + Z);
        var F = RV[Z].x,
          K = RV[Z].y;
        U.push(F, K), o.push(RV[Z]);
      }
      var n = z.getFloat32(V),
        f = z.getFloat32(V + 4),
        T = z.getFloat32(V + 8),
        $ = z.getFloat32(V + 12);
      V += 16;
      var Q = [],
        d = U[U.length - 2],
        s = U[U.length - 1],
        J = U[0],
        x = U[1];
      for (g = 0; g < U.length / 2; g++) {
        if (((F = J), (K = x), g < U.length / 2 - 1))
          (J = U[2 * (g + 1) + 0]), (x = U[2 * (g + 1) + 1]);
        else (J = U[0]), (x = U[1]);
        var S = qv(d, s, n, f, T, $),
          R = qv(F, K, n, f, T, $),
          y = qv(J, x, n, f, T, $);
        if (R) Q.push(F, K);
        else if (S || R || y) {
          if (S) {
            var b = mv(F, K, d, s, n, f, T, $);
            Q.push(b.x, b.y);
          }
          if (y) {
            b = mv(F, K, J, x, n, f, T, $);
            Q.push(b.x, b.y);
          }
        } else Q.push(Math.max(n, Math.min(f, F)), Math.max(T, Math.min($, K)));
        (d = F), (s = K);
      }
      U = Q;
    }
    if (
      (((W = new PIXI.Graphics()).simplified = l),
      l && (W.simplifiedDotPath = o),
      (W.zoneId = v),
      (W.owner = c),
      (W.linePath = h),
      (W.areaScore = P),
      W.beginFill(1 == hz || 2 == hz ? Ll(c) : Pl(c), 0.5),
      tV && h.length > 0 && 15642415 == h[0].tint && W.beginFill(15642415, 0.5),
      W.drawPolygon(U),
      W.endFill(),
      (W.polygon = U),
      C.addChild(W),
      (bV[v] = W),
      D && c == HV)
    ) {
      pz++, Oc(W.areaScore / 4);
      var X = Math.floor(W.areaScore / 4);
      if (pz <= 10 || X >= 200) {
        var H = {
          x: (W.linePath[0].dot1.x + W.linePath[0].dot2.x) / 2,
          y: (W.linePath[0].dot1.y + W.linePath[0].dot2.y) / 2,
        };
        Ic(H.x, H.y, "+" + X);
      }
    }
    if (
      (D &&
        ((W.alpha = 0),
        anime({ targets: W, alpha: 1, duration: 250, easing: "linear" })),
      (0 != hz && 3 != hz) || c != HV || (aP = true),
      i)
    ) {
      for (
        n = U[0], f = U[0], T = U[1], $ = U[1], g = 0;
        g < U.length / 2;
        g++
      ) {
        var r;
        (r = U[2 * g]) < n ? (n = r) : r > f && (f = r),
          (r = U[2 * g + 1]) < T ? (T = r) : r > $ && ($ = r);
      }
      (W.zoneBounds = { minX: n, maxX: f, minY: T, maxY: $ }),
        i.addZone(W, n, f, T, $),
        3 == hz &&
          ((z) => {
            for (
              var V = E.getAllInRect(
                  z.zoneBounds.minX,
                  z.zoneBounds.maxX,
                  z.zoneBounds.minY,
                  z.zoneBounds.maxY,
                ),
                l = 0;
              l < V.length;
              l++
            ) {
              var D = V[l];
              D.owner != z.owner && Cv(z.polygon, D.position) && tv(D);
            }
          })(W);
    }
  }
  return V;
}
function tv(z) {
  (z.alpha = 0.6), (z.isCaptured = true);
  for (var V = 0; V < z.lines.length; V++) z.lines[V].alpha = 0.6;
}
function jv(z) {
  (z.alpha = 1), (z.isCaptured = false);
  for (var V = 0; V < z.lines.length; V++) z.lines[V].alpha = 1;
}
function av(z) {
  for (var V = i.getAllInRange(z.position, 0, 0), l = 0; l < V.length; l++) {
    var D = V[l];
    z.owner != D.owner && Cv(D.polygon, z.position) && tv(z);
  }
}
function Bv(z) {
  for (
    var V = E.getAllInRect(
        z.zoneBounds.minX,
        z.zoneBounds.maxX,
        z.zoneBounds.minY,
        z.zoneBounds.maxY,
      ),
      l = 0;
    l < V.length;
    l++
  ) {
    var D = V[l];
    D.owner != z.owner && Cv(z.polygon, D.position) && jv(D);
  }
}
function Cv(z, V) {
  for (
    var l = z[z.length - 2], D = z[z.length - 1], v = false, c = 0;
    c < z.length;
    c += 2
  ) {
    var P = z[c],
      L = z[c + 1];
    ((L < V.y && D >= V.y) || (D < V.y && L >= V.y)) &&
      P + ((V.y - L) / (D - L)) * (l - P) < V.x &&
      (v = !v),
      (l = P),
      (D = L);
  }
  return v;
}
function pv(z) {
  var V = XV[HV] || XV[Kz] || n;
  if (!V)
    return (
      console.log("Unkown current position in isDotOutOfView", HV, Kz), true
    );
  var l = Math.floor(V.x / wV),
    D = Math.floor(V.y / wV),
    v = Math.floor(z.x / wV),
    c = Math.floor(z.y / wV),
    P = Math.ceil(Nz / 2 / wV),
    L = Math.ceil(zV / 2 / wV);
  return v < l - P || v > l + P || c < D - L || c > D + L;
}
function Yv(z) {
  if (z.shieldAppearAnim) {
    try {
      z.shieldAppearAnim.pause();
    } catch (z) {}
    z.shieldAppearAnim = null;
  }
  z.shield.alpha = 1;
  var V = z.shield.width;
  z.dotBlastAnim = anime({
    targets: z.shield,
    width: [V, 1.5 * V],
    height: [V, 1.5 * V],
    alpha: 0,
    duration: 300,
    easing: "linear",
    complete: () => {
      (z.shield.width = V), (z.shield.height = V), (z.dotBlastAnim = null);
    },
  });
}
function ov(z, V, l) {
  delete bV[z.zoneId],
    i &&
      (i.removeZone(
        z,
        z.zoneBounds.minX,
        z.zoneBounds.maxX,
        z.zoneBounds.minY,
        z.zoneBounds.maxY,
      ),
      3 == hz && V && Bv(z)),
    V
      ? anime({
          targets: z,
          alpha: 0,
          duration: 250,
          easing: "linear",
          complete: ((z) => () => {
            C.removeChild(z);
          })(z),
        })
      : C.removeChild(z),
    z.owner == HV && V && !l && Oc(-z.areaScore / 4);
  for (var D = {}, v = 0; v < z.linePath.length; v++) {
    var c = z.linePath[v];
    c.leftZoneId == z.zoneId && (c.leftZoneId = 0),
      c.rightZoneId == z.zoneId && (c.rightZoneId = 0),
      V &&
        !l &&
        (c.leftZoneId ||
          c.rightZoneId ||
          (c.dot1.shield &&
            !gP(c.dot1) &&
            ((D[c.dot1.dotId] = true),
            (c.dot1.shield.state = 0),
            (c.dot1.shield.alpha = 0)),
          c.dot2.shield &&
            !gP(c.dot2) &&
            ((D[c.dot2.dotId] = true),
            (c.dot2.shield.state = 0),
            (c.dot2.shield.alpha = 0)))),
      bV[c.leftZoneId] ||
        bV[c.rightZoneId] ||
        SL ||
        (pv(c.dot1) &&
          pv(c.dot2) &&
          (B.removeChild(c),
          delete yV[c.lineId],
          _ && _.removeLine(c, c.dot1.position, c.dot2.position),
          c.dot1.lines.splice(c.dot1.lines.indexOf(c), 1),
          c.dot2.lines.splice(c.dot2.lines.indexOf(c), 1),
          Fv(c.dot1),
          Fv(c.dot2)));
  }
  for (var P in D) {
    var L = RV[P];
    L && Yv(L);
  }
}
function Zv(z) {
  var V = new PIXI.Container(),
    l = new PIXI.Graphics();
  l.beginFill(32768),
    l.drawRoundedRect(0, 0, 4 * Iz, Iz, Iz / 4),
    l.endFill(),
    V.addChild(l);
  var D = new PIXI.Graphics();
  return (
    D.beginFill(65280),
    D.drawRoundedRect(0, 0, 4 * Iz, Iz, Iz / 4),
    D.endFill(),
    V.addChild(D),
    (V.outer = D),
    V.position.set(z.position.x - V.width / 2, z.position.y + 1.5 * Iz),
    V
  );
}
function Fv(z) {
  0 == z.lines.length &&
    pv(z) &&
    (a.removeChild(z),
    delete RV[z.dotId],
    E && E.remove(z, z.position),
    z.healthBar && p.removeChild(z.healthBar),
    z.shield && a.removeChild(z.shield),
    z.text && a.removeChild(z.text));
}
function Kv(z, V, l, D, v, c, P) {
  z < 0 && (z = 0), V >= J.width && (V = J.width - 1);
  for (
    var L = 4 * (l * J.width + z), W = 4 * (l * J.width + V), g = L;
    g <= W;
    g += 4
  )
    (J.data[g + 0] = D),
      (J.data[g + 1] = v),
      (J.data[g + 2] = c),
      (J.data[g + 3] = P);
}
function nv() {
  (J = s.createImageData(d.width, d.height)),
    (x = s.createImageData(d.width, d.height)),
    s.putImageData(J, 0, 0);
}
function fv(z, V) {
  if (mc && V && BV) {
    if (Oz > ez) {
      var l = Math.ceil((256 / Oz) * ez);
      (d.width = 256), (d.height = l);
    } else if (ez > Oz) {
      var D = Math.ceil((256 / ez) * Oz);
      (document.getElementById("minimap").style.width = D + "px"),
        (d.width = D),
        (d.height = 256);
    } else (d.width = 256), (d.height = 256);
    (d.style.transformOrigin = "top left"),
      "256px" != document.getElementById("minimap").style.width &&
        (d.style.transform = "scale(0.375)");
  }
  nv();
  for (
    var v = Pl(HV),
      c = (16711680 & v) >> 16,
      P = (65280 & v) >> 8,
      L = 255 & v,
      W = 1,
      g = V ? 7 : 3;
    W + g <= z.byteLength;

  ) {
    if (V) {
      var q = z.getInt32(W);
      (c =
        (16711680 &
          (v =
            (Pz >= 1 || 2 == hz) && 1 == q
              ? 0
              : 1 == hz || 2 == hz
                ? Ll(q)
                : Pl(q))) >>
        16),
        (P = (65280 & v) >> 8),
        (L = 255 & v),
        (W += 4);
    }
    var m = z.getUint8(W),
      h = z.getUint8(W + 1),
      U = z.getUint8(W + 2);
    (W += 3), Kv(h, U, m, c, P, L, 255);
  }
  kv && clearTimeout(kv),
    (kv = setTimeout(() => {
      s.putImageData(J, 0, 0);
    }, 100));
}
function Tv(z) {
  var V = z.getInt32(1),
    l = z.getInt32(5),
    D = Uz[l];
  if (RV[V]) {
    var v = RV[V];
    delete RV[V],
      E && E.remove(v, v.position),
      a.removeChild(v),
      Hv(
        1 == hz || 2 == hz ? Ll(v.owner) : Pl(v.owner),
        v.x,
        v.y,
        6,
        Iz,
        2,
        D ? { x: 0.25 * D.sx, y: 0.25 * D.sy } : void 0,
        3 == hz && v.isCaptured ? 0.6 : 1,
      ),
      v.healthBar && p.removeChild(v.healthBar),
      v.shield && a.removeChild(v.shield),
      v.text && a.removeChild(v.text);
    for (var c = 0; c < v.lines.length; c++) {
      var P = v.lines[c];
      delete yV[P.lineId],
        _ && _.removeLine(P, P.dot1.position, P.dot2.position),
        anime({
          targets: P,
          alpha: 0,
          duration: 250,
          easing: "linear",
          complete: ((z) => () => {
            B.removeChild(z);
          })(P),
        }),
        P.leftZoneId && bV[P.leftZoneId] && ov(bV[P.leftZoneId], true),
        P.rightZoneId && bV[P.rightZoneId] && ov(bV[P.rightZoneId], true);
      var L = P.dot1 == v ? P.dot2 : P.dot1;
      L.lines.splice(L.lines.indexOf(P), 1), Fv(L);
    }
  } else if (z.byteLength >= 21) {
    const V = z.getInt32(9),
      l = z.getFloat32(13),
      v = z.getFloat32(17);
    Hv(
      1 == hz || 2 == hz ? Ll(V) : Pl(V),
      l,
      v,
      6,
      Iz,
      2,
      D ? { x: 0.25 * D.sx, y: 0.25 * D.sy } : void 0,
      1,
    );
  }
  D &&
    (delete Uz[l],
    o.removeChild(D),
    D.creator == HV && qz < 3 && v && ++Yz <= 10 && Ic(v.x, v.y, "+10"));
}
function $v(z, V, l) {
  var D = new PIXI.Sprite(F["death-blast"] ? F["death-blast"] : F.shoot);
  (D.x = z),
    (D.y = V),
    D.anchor.set(0.5),
    mV || (D.tint = 16739353),
    p.addChild(D),
    anime({
      targets: D,
      alpha: [1, 0],
      width: [0, 2 * l * 1.2],
      height: [0, 2 * l * 1.2],
      duration: 500,
      easing: "linear",
      complete: ((z) => () => {
        p.removeChild(z);
      })(D),
    });
}
var Qv = false;
function dv(z, V, l) {
  var D = new PIXI.Text(z, {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: Math.round(Math.min(window.innerHeight, window.innerWidth) / 30),
    fill: V || 56576,
    align: "center",
  });
  D.anchor.set(0.5),
    D.position.set(window.innerWidth / 2, 0.1 * window.innerHeight),
    S.addChild(D),
    anime({
      targets: D,
      easing: "linear",
      alpha: [1, 0],
      y: 0.02 * window.innerHeight,
      duration: 2e3,
      complete: () => {
        S.removeChild(D);
      },
    }),
    l &&
      anime({
        targets: D.scale,
        x: [0.5, 1],
        y: [0.5, 1],
        easing: "easeOutBack",
        duration: 500,
      });
}
function sv(z) {
  var V = {},
    l = {},
    D = {};
  for (var v in bV) bV[v].owner == z && (V[v] = true);
  for (var v in yV) yV[v].owner == z && (l[v] = true);
  for (var v in RV) RV[v].owner == z && (D[v] = true);
  for (var v in V) {
    anime({
      targets: bV[v],
      alpha: 0,
      duration: 250,
      easing: "linear",
      complete: ((z) => () => {
        C.removeChild(z);
      })(bV[v]),
    });
    var c = bV[v];
    delete bV[v],
      i &&
        (i.removeZone(
          c,
          c.zoneBounds.minX,
          c.zoneBounds.maxX,
          c.zoneBounds.minY,
          c.zoneBounds.maxY,
        ),
        3 == hz && Bv(c));
  }
  for (var v in l) {
    var P = yV[v];
    anime({
      targets: P,
      alpha: 0,
      duration: 250,
      easing: "linear",
      complete: ((z) => () => {
        B.removeChild(z);
      })(P),
    }),
      delete yV[v],
      _ && _.removeLine(P, P.dot1.position, P.dot2.position);
  }
  for (var v in D) {
    RV[v].healthBar && p.removeChild(RV[v].healthBar),
      RV[v].shield && a.removeChild(RV[v].shield),
      RV[v].text && a.removeChild(RV[v].text),
      anime({
        targets: RV[v],
        alpha: 0,
        duration: 250,
        easing: "linear",
        complete: ((z) => () => {
          a.removeChild(z);
        })(RV[v]),
      });
    var L = RV[v];
    delete RV[v], E && E.remove(L, L.position);
  }
}
function Jv(z) {
  return (
    '<span style="font-weight:700;color:' +
    HP(Pl(z)) +
    '">' +
    Cl(nz[z]) +
    (aV ? " (" + colorNamesNew[uV[z] - 1] + ")" : "") +
    "</span>"
  );
}
function xv(z) {
  var V = z.getInt32(1),
    l = z.getUint8(5),
    D = z.getInt32(6),
    v = 50;
  z.byteLength >= 14 && (v = z.getFloat32(10));
  var c = 0;
  if (
    (z.byteLength >= 18 && (c = z.getInt32(14)),
    V == HV && yz++,
    ((1 == l && D == HV) ||
      (2 == l && c == HV) ||
      (5 == l && D == HV) ||
      D == rV) &&
      Rz++,
    1 != hz && 2 != hz)
  )
    (3 == hz && 0 != l) || sv(V),
      V != HV &&
        XV[V] &&
        (1 == l
          ? D == HV
            ? (dv(
                "You killed " + nz[V] + "!",
                PV ? 16777215 : Bl(Pl(HV), -0.7),
                true,
              ),
              XD(
                "<span>You killed </span><span>" +
                  Cl(nz[V]) +
                  "</span><span> (kills: " +
                  Rz +
                  ")</span>",
                PV ? "info-dark" : "info",
              ))
            : WV ||
              XD(
                "<span>" + Cl(nz[V]) + "</span><span> has been killed</span>",
                PV ? "info-dark" : "info",
              )
          : 2 == l
            ? (WV ||
                XD(
                  "<span>" +
                    Cl(nz[V]) +
                    "</span><span> crashed into a wall</span>" +
                    (c == HV ? "<span> (you get the kill)</span>" : ""),
                  PV ? "info-dark" : "info",
                ),
              c == HV &&
                dv(
                  "You killed " + nz[V] + "!",
                  PV ? 16777215 : Bl(Pl(HV), -0.7),
                  true,
                ))
            : 3 == l
              ? WV ||
                XD(
                  "<span>" +
                    Cl(nz[V]) +
                    "</span><span> died in a collision</span>",
                  PV ? "info-dark" : "info",
                )
              : 5 == l &&
                (D == HV
                  ? (dv(
                      "You exploded " + nz[V] + "!",
                      PV ? 16777215 : Bl(Pl(HV), -0.7),
                      true,
                    ),
                    XD(
                      "<span>You exploded </span><span>" +
                        Cl(nz[V]) +
                        "</span><span> (kills: " +
                        Rz +
                        ")</span>",
                      PV ? "info-dark" : "info",
                    ))
                  : WV ||
                    XD(
                      "<span>" +
                        Cl(nz[V]) +
                        "</span><span> has been exploded</span>",
                      PV ? "info-dark" : "info",
                    )));
  else
    try {
      1 == l && (uV[V] == MV || uV[D] == MV || (BV && mc))
        ? D == HV
          ? (dv(
              "You killed " + nz[V] + "!",
              PV ? 16777215 : Bl(Pl(HV), -0.7),
              true,
            ),
            XD(
              "<span>You killed </span>" +
                Jv(V) +
                "<span> (kills: " +
                Rz +
                ")</span>",
              PV ? "info-dark" : "info",
            ))
          : WV ||
            XD(
              Jv(V) + "<span> has been killed by </span>" + Jv(D),
              PV ? "info-dark" : "info",
            )
        : 2 == l && (uV[V] == MV || c == HV || (BV && mc))
          ? (WV ||
              XD(
                Jv(V) +
                  "<span> crashed into a wall</span>" +
                  (c == HV ? "<span> (you get the kill)</span>" : ""),
                PV ? "info-dark" : "info",
              ),
            c == HV &&
              dv(
                "You killed " + nz[V] + "!",
                PV ? 16777215 : Bl(Pl(HV), -0.7),
                true,
              ))
          : 3 == l &&
            (uV[V] == MV || (BV && mc)) &&
            (WV ||
              XD(
                Jv(V) + "<span> died colliding with </span>" + Jv(D),
                PV ? "info-dark" : "info",
              ));
    } catch (z) {}
  if (
    (!XV[V] ||
      0 == l ||
      (1 != hz && 2 != hz && 3 != hz) ||
      $v(XV[V].x, XV[V].y, v),
    V == HV)
  ) {
    if ((qz++, "undefined" != typeof Storage))
      try {
        localStorage.setItem("gamesPlayed", qz);
      } catch (z) {
        console.log(z);
      }
    switch (
      ((iz.visible = false),
      (wz.visible = false),
      (n = XV[HV] ? XV[HV].position : { x: Oz / 2, y: ez / 2 }),
      (f = lz),
      !XV[HV] || (4 == hz && 4 == l) || (XV[HV].visible = false),
      l)
    ) {
      case 0: {
        var P = "The connection with the server has been lost";
        break;
      }
      case 1:
        P = "You were killed by " + (nz[D] ? Cl(nz[D]) : " an unknown player");
        break;
      case 2: {
        var L = nz[D] ? Cl(nz[D]) : "somebody";
        (1 != hz && 2 != hz) || (L = "Team " + colorNamesNew[D - 1]);
        P = "You crashed into " + L + "'s wall";
        break;
      }
      case 3:
        P = "You collided with " + (nz[D] ? Cl(nz[D]) : " an unknown player");
        break;
      case 5:
        P =
          "You were exploded by " + (nz[D] ? Cl(nz[D]) : " an unknown player");
    }
    if (4 == hz) {
      (Wz = []),
        (K.moving = false),
        (XV[HV].moving = false),
        (Sc[0] = false),
        (Sc[1] = false),
        (Sc[2] = false),
        (Sc[3] = false),
        (mz = q = lz / 60);
      var W = Math.floor(q / 60),
        g = Math.floor(q % 60);
      (document.getElementById("gm-1v1-fight-duration").innerHTML =
        (W > 0 ? W + " min. " : "") + g + " s"),
        (ZV = 0);
    } else if (2 == hz)
      (document.getElementById("respawn-kill-reason-gm2").innerHTML = P),
        (document.getElementById("respawn-score-gm2").innerHTML =
          document.getElementById("lb-player-points").innerHTML),
        (document.getElementById("respawn-kills-gm2").innerHTML = Rz),
        (Rz = 0),
        (document.getElementById("respawn-deaths-gm2").innerHTML = yz),
        (document.getElementById("respawn-rounds-won-gm2").innerHTML =
          bz + "/" + Xz);
    else {
      var q;
      (document.getElementById("respawn-kill-reason").innerHTML = P),
        (document.getElementById("respawn-score").innerHTML =
          document.getElementById("lb-player-points").innerHTML),
        (document.getElementById("respawn-map").innerHTML =
          document.getElementById("map-control-value").innerHTML + "%"),
        (mz = q = lz / 60);
      (W = Math.floor(q / 60)), (g = Math.floor(q % 60));
      (document.getElementById("respawn-alive").innerHTML =
        (W > 0 ? W + " min. " : "") + g + " s"),
        (document.getElementById("respawn-level").innerHTML =
          document.getElementById("level-value").innerHTML);
    }
    (document.getElementById("choose-superpower").style.display = "none"),
      (document.getElementById("xp-block").style.display = "none"),
      (document.getElementById("upgrade-block").style.display = "none"),
      (Qv = true),
      setTimeout(() => {
        mc || 4 != hz
          ? mc ||
            (2 == hz && 3 == JV) ||
            (document.getElementById(
              "respawn" + (2 == hz ? "-gm2" : ""),
            ).style.display = "block")
          : (QD(() => {
              (document.getElementById("gm-1v1-button-back").style.display =
                "none"),
                (document.getElementById(
                  "gm-1v1-button-continue",
                ).style.display = "inline-block"),
                (document.getElementById("gm-1v1-main").style.gridTemplateRows =
                  "100% 50%"),
                _D(),
                (document.getElementById("gm-1v1-result").style.display =
                  "block"),
                (document.getElementById("gm-1v1-noresult").style.display =
                  "none"),
                bD(),
                (document.getElementById("chat-history-full").scrollTop =
                  document.getElementById("chat-history-full").scrollHeight),
                dD();
            }),
            "undefined" != typeof aiptag &&
              aiptag.cmd.display.push &&
              !_P &&
              Date.now() - uz > 3e4 &&
              (aiptag.cmd.display.push(() => {
                aipDisplayTag.display("defly-io_300x250");
              }),
              (uz = Date.now()))),
          (Qv = false);
      }, 1500),
      (iz.visible = false),
      (wz.visible = false),
      (Nc = null),
      "undefined" != typeof aiptag &&
        aiptag.cmd.display.push &&
        !_P &&
        (aiptag.cmd.display.push(() => {
          aipDisplayTag.display("defly-io_300x250");
        }),
        aiptag.cmd.display.push(() => {
          aipDisplayTag.display("defly-io_728x90");
        })),
      parseInt(document.getElementById("lb-player-points").innerHTML),
      parseInt(
        Math.floor(
          100 * document.getElementById("map-control-value").innerHTML,
        ),
      ),
      Math.floor(q),
      document.getElementById("level-value").innerHTML,
      "undefined" != typeof gtag &&
        (gtag("event", "PlayerKilled", {
          event_category: "Game",
          score: parseInt(
            document.getElementById("lb-player-points").innerHTML,
          ),
          mapPercent: parseInt(
            Math.floor(
              100 * document.getElementById("map-control-value").innerHTML,
            ),
          ),
          gameDuration: Math.floor(q),
        }),
        gtag("set", {
          page_title: "respawn" + (2 == hz ? "-gm2" : ""),
          page_path: "/respawn" + (2 == hz ? "-gm2" : ""),
        }),
        gtag("event", "page_view")),
      (document.getElementById("respawn-panel-earnings").style.display =
        "none"),
      (document.getElementById("respawn-panel-earnings-gm2").style.display =
        "none"),
      (document.getElementById("buy-screen").style.display = "none"),
      document.getElementById("game-won") &&
        document.body.removeChild(document.getElementById("game-won"));
  } else V == Kz && XV[V] && (n = XV[V].position);
  4 == hz &&
    XV[V] &&
    (4 != l &&
      ((XV[V].visible = false),
      (XV[V].usernameText.visible = false),
      XV[V].badge && (XV[V].badge.visible = false)),
    (XV[V].moving = false),
    (XV[V].sx = 0),
    (XV[V].sy = 0)),
    !XV[V] ||
      (4 == hz && 4 == l) ||
      Hv(Pl(V), XV[V].x, XV[V].y, 10, 0.5 * kz, 6),
    3 != hz && 4 != hz && delete cl[V],
    4 == hz ||
      (1 != l && 5 != l) ||
      D != HV ||
      !XV[V] ||
      (Ic(XV[V].x, XV[V].y, 2 == hz ? "+1000" : "+500"), Oc(500));
}
var Sv,
  Rv = false;
var yv = -1;
function bv(z) {
  clearTimeout(Sv), (yv = z);
  var V = new DataView(new ArrayBuffer(5));
  V.setUint8(0, 8),
    V.setInt32(1, z),
    q.send(V.buffer),
    document.getElementById("team-choice-buttons") &&
      (document.getElementById("team-choice-buttons").style.display = "none"),
    (document.getElementById("team-choice-loading").style.display = "block");
}
function Xv() {
  var z = new DataView(new ArrayBuffer(1));
  z.setUint8(0, 9), q.send(z.buffer);
}
function Hv(z, V, l, D, v, c, P, L) {
  void 0 === L && (L = 1);
  for (var W = P ? Math.atan2(P.y, P.x) : null, g = 0; g < D; g++) {
    var q = new PIXI.Sprite(F.debris);
    (q.tint = z),
      (q.alpha = L),
      (q.width = v),
      (q.height = (v / q.texture.width) * q.texture.height);
    var m = W
        ? W + Math.random() * Math.PI - Math.PI / 2
        : Math.random() * Math.PI * 2,
      h = Math.random() * kz * c,
      U = (Math.random() * Math.PI) / 4;
    (q.x = V + Math.cos(m) * kz * 0.25),
      (q.y = l + Math.sin(m) * kz * 0.25),
      (q.rotation = Math.random() * Math.PI * 2),
      Z.addChild(q),
      anime({
        targets: q,
        x: V + Math.cos(m) * h + (P ? P.x : 0),
        y: l + Math.sin(m) * h + (P ? P.y : 0),
        rotation: q.rotation + U,
        alpha: 0,
        duration: 2e3,
        easing: "easeOutQuart",
        complete: ((z) => () => {
          Z.removeChild(z);
        })(q),
      });
  }
}
function rv(z) {
  return z.toFixed(2).replace(/[.]?0+$/, "");
}
var Mv = 0;
function uv(z) {
  for (var V in Uz) Ev(Uz[V], z);
}
function Ev(z, V) {
  if (lz + V <= z.initialTurn)
    return (z.x = z.initialX), void (z.y = z.initialY);
  (z.lifetime -= V),
    (z.x += ((1 * z.sx) / 60) * V),
    (z.y += ((1 * z.sy) / 60) * V);
}
function _v(z, V) {
  var l = z.getInt32(1);
  bV[l] && ov(bV[l], true, V);
}
function iv(z, V, l) {
  var D = z.getFloat32(1);
  var v = (z) => (V ? (l ? z.x >= D : z.x < D) : l ? z.y >= D : z.y < D),
    c = {},
    P = {},
    L = {};
  for (var W in bV) {
    var g = true;
    if ((m = bV[W]).simplified)
      for (var q = 0; q < m.simplifiedDotPath.length; q++) {
        if (!v((t = m.simplifiedDotPath[q]))) {
          g = false;
          break;
        }
      }
    else
      for (q = 0; q < m.linePath.length; q++) {
        if (!v((h = m.linePath[q]).dot1) || !v(h.dot2)) {
          g = false;
          break;
        }
      }
    g && (c[W] = true);
  }
  for (var W in c) {
    var m = bV[W];
    0,
      delete bV[W],
      i &&
        i.removeZone(
          m,
          m.zoneBounds.minX,
          m.zoneBounds.maxX,
          m.zoneBounds.minY,
          m.zoneBounds.maxY,
        ),
      C.removeChild(m);
    for (q = 0; q < m.linePath.length; q++) {
      (h = m.linePath[q]).leftZoneId == m.zoneId && (h.leftZoneId = 0),
        h.rightZoneId == m.zoneId && (h.rightZoneId = 0),
        h.leftZoneId ||
          h.rightZoneId ||
          (h.dot1.shield &&
            !gP(h.dot1) &&
            ((h.dot1.shield.state = 0), (h.dot1.shield.alpha = 0)),
          h.dot2.shield &&
            !gP(h.dot2) &&
            ((h.dot2.shield.state = 0), (h.dot2.shield.alpha = 0)));
    }
  }
  for (var W in yV) {
    var h = yV[W];
    bV[h.leftZoneId] ||
      bV[h.rightZoneId] ||
      (v(h.dot1) && v(h.dot2) && (P[h.lineId] = true));
  }
  for (var W in P) {
    yV[W] || console.error("could not find line ", W);
    h = yV[W];
    delete yV[W],
      _ && _.removeLine(h, h.dot1.position, h.dot2.position),
      B.removeChild(h),
      h.dot1.lines.splice(h.dot1.lines.indexOf(h), 1),
      h.dot2.lines.splice(h.dot2.lines.indexOf(h), 1);
  }
  for (var W in RV) {
    if (0 == (t = RV[W]).lines.length) v(t) && (L[W] = true);
    else
      for (var U = 0; U < t.lines.length; U++)
        yV[t.lines[U].lineId] ||
          console.error("dot has removed line", W, t, t.lines[U].lineId);
  }
  for (var W in L) {
    var t = RV[W];
    delete RV[W],
      E && E.remove(t, t.position),
      a.removeChild(t),
      t.healthBar && p.removeChild(t.healthBar),
      t.shield && a.removeChild(t.shield),
      t.text && a.removeChild(t.text);
  }
}
function wv(z, V) {
  for (var l = "", D = 0; D < V; D++) l += z;
  return l;
}
var Gv,
  kv,
  Iv,
  Av = 0;
function Ov() {
  var z = "";
  customKeyboardCommands.SUPERPOWER.length >= 1 &&
    customKeyboardCommands.SUPERPOWER[0] &&
    Object.keys(customKeyboardCommands.SUPERPOWER[0]).length > 0 &&
    (z = oL(customKeyboardCommands.SUPERPOWER[0])),
    customKeyboardCommands.SUPERPOWER.length >= 2 &&
      customKeyboardCommands.SUPERPOWER[1] &&
      Object.keys(customKeyboardCommands.SUPERPOWER[1]).length > 0 &&
      (z +=
        (z.length > 0 ? " or " : "") +
        oL(customKeyboardCommands.SUPERPOWER[1]));
  var V = Fz
    ? ll[oz] + " active"
    : Zz >= 100
      ? ll[oz] + " ready, " + (Fl ? "double-tap" : "press " + z)
      : "Recharging " + ll[oz] + "...";
  document.getElementById("superpower-label").textContent != V &&
    (document.getElementById("superpower-label").textContent = V);
  var l = Math.min(100, Zz) + "%";
  document.getElementById("superpower-fuel-value").style.width != l &&
    (document.getElementById("superpower-fuel-value").style.width = l);
}
function ev() {
  var z = new DataView(new ArrayBuffer(9));
  z.setUint8(0, 7),
    z.setFloat32(1, K.aimDirection),
    z.setFloat32(5, K.aimDistance),
    q.send(z.buffer);
}
function Nv(z) {
  return tz ? Math.round(z / nV) * nV + (nV / 2) * 0 : z;
}
function zc(z) {
  XV[z].parent.removeChild(XV[z]),
    XV[z].usernameText.parent.removeChild(XV[z].usernameText),
    XV[z].shield && XV[z].shield.parent.removeChild(XV[z].shield),
    XV[z].badge && XV[z].badge.parent.removeChild(XV[z].badge);
  var V = XV[z];
  delete XV[z],
    gD(z),
    XV[z].position.set(V.x, V.y),
    (XV[z].rotation = V.rotation);
}
anime.easings.flashbangCurve = (z) =>
  z < 0.5
    ? anime.easings.easeInQuad(2 * z) / 2
    : anime.easings.easeInQuad(2 * (0.5 - (z - 0.5))) + 0.5;
var Vc = [],
  lc = false;
function Dc() {
  for (var z = 0; z < Vc.length; z++)
    p.removeChild(Vc[z].playerText), p.removeChild(Vc[z]);
  (Vc = []), (lc = false);
}
function vc(z) {
  var V = window.innerWidth / 2,
    l = window.innerHeight / 2,
    D = (z.y - l) / (z.x - V),
    v = D * V,
    c = l / D;
  return -l <= v && v <= l
    ? z.x > V
      ? { x: window.innerWidth, y: l + D * V, s: 0 }
      : { x: 0, y: l - D * V, s: 2 }
    : -V <= c && c <= V
      ? z.y > l
        ? { x: V + l / D, y: window.innerHeight, s: 3 }
        : { x: V - l / D, y: 0, s: 1 }
      : null;
}
function cc(z) {
  if (n) return n;
  var V = Bz[4] / 2;
  !Fl && K.aimDistance > 0 && (V = Math.min(K.aimDistance, V));
  var l = new PIXI.Point(
    (z ? z.x : XV[HV].x) + V * Math.cos(K.aimDirection),
    (z ? z.y : XV[HV].y) + V * Math.sin(K.aimDirection),
  );
  return aD(l), l;
}
function Pc() {
  if (!n) {
    var z = cc();
    if (SL) {
      for (var V in RV) {
        var l = RV[V];
        if (l.owner == MV)
          if (
            (((z = cc()).x = Nv(z.x)), (z.y = Nv(z.y)), l.position.dst(z) < Iz)
          ) {
            if (Nc && Nc != l)
              if (!EL(l, Nc))
                (D = new DataView(new ArrayBuffer(25))).setInt32(1, RL++),
                  D.setInt32(5, l.owner),
                  D.setInt32(9, Nc.dotId),
                  D.setInt32(13, l.dotId),
                  D.setInt32(17, 0),
                  D.setInt32(21, 0),
                  gv(D);
            return (Nc = l), void (iz.visible = true);
          }
      }
      var D = new DataView(new ArrayBuffer(27)),
        v = RL++;
      if (
        (D.setInt32(1, v),
        D.setInt32(5, MV),
        D.setFloat32(9, Nv(z.x)),
        D.setFloat32(13, Nv(z.y)),
        D.setUint8(17, 1),
        D.setUint8(18, 1),
        D.setFloat32(19, 0),
        D.setInt32(23, 0),
        Pv(D),
        null != Nc)
      )
        (D = new DataView(new ArrayBuffer(25))).setInt32(1, RL++),
          D.setInt32(5, MV),
          D.setInt32(9, Nc.dotId),
          D.setInt32(13, v),
          D.setInt32(17, 0),
          D.setInt32(21, 0),
          gv(D);
      (Nc = RV[v]), (iz.visible = true), (sc = false);
    } else {
      (D = new DataView(new ArrayBuffer(1))).setUint8(0, 16),
        q.send(D.buffer),
        (sc = false);
    }
  }
}
function Lc(z, V) {
  if (
    (document.getElementById("upgrade-block").classList.contains("ask-redo") &&
      !V &&
      BD(false),
    jz <= 0)
  )
    setTimeout(() => {
      (document.getElementById("upgrade-block").style.left = "-264px"),
        (document.getElementById("upgrade-block").style.display = "none");
    }, 300);
  else {
    var l = new DataView(new ArrayBuffer(2));
    l.setUint8(0, 5),
      l.setUint8(1, z),
      q.send(l.buffer),
      Bz[z] < Mz[z] &&
        --jz <= 0 &&
        anime({
          targets: "#upgrade-block",
          easing: "easeInQuad",
          left: "-264px",
          duration: 250,
          complete: () => {
            jz <= 0 &&
              ((document.getElementById("upgrade-block").style.left = "-264px"),
              (document.getElementById("upgrade-block").style.display =
                "none"));
          },
        }),
      window.event && window.event.preventDefault();
  }
}
function Wc() {
  var z = new DataView(new ArrayBuffer(5));
  z.setUint8(0, 4), z.setInt32(1, $z), q.send(z.buffer);
}
function gc() {
  (document.getElementById("respawn-gm2").style.display = "none"),
    showAlert(
      (Fl ? "Tap" : "Click") + " anywhere to spectate next player",
      1e4,
    );
}
var qc,
  mc = false;
function hc(z, V) {
  if (q && 1 == q.readyState) {
    V || (V = "");
    var l = new DataView(new ArrayBuffer(3 + 2 * V.length));
    l.setUint8(0, 128),
      l.setUint8(1, z),
      zD(l, 2, V),
      q.send(l.buffer),
      (mc = true);
  }
}
var Uc = 0;
function tc() {
  if (q && 1 == q.readyState && ((XV[HV] && !n) || mc)) {
    var z = new DataView(new ArrayBuffer(20));
    z.setUint8(0, 2);
    var V = (K.shooting ? 1 : 0) + (K.moving ? 2 : 0) + (1 == sV ? 4 : 0);
    z.setUint8(1, V),
      z.setFloat32(2, K.moveDirection),
      z.setFloat32(6, K.aimDirection),
      z.setInt16(10, L || 0),
      z.setFloat32(12, K.aimDistance),
      q.send(z.buffer),
      (Uc = new Date().getTime()),
      Lz.push(Uc),
      Wz.push({
        turn: lz + (60 * (L || 0)) / 1e3,
        input: {
          shooting: K.shooting,
          moving: K.moving,
          aimDirection: K.aimDirection,
          moveDirection: K.moveDirection,
        },
      }),
      (Fc = false);
  }
  SL &&
    Wz.push({
      turn: lz,
      input: {
        shooting: K.shooting,
        moving: K.moving,
        aimDirection: K.aimDirection,
        moveDirection: K.moveDirection,
      },
    });
}
var jc,
  ac,
  Bc,
  Cc,
  pc,
  Yc,
  oc,
  Zc = 0,
  Fc = false;
function Kc(z) {
  if ((0 != e || SL) && (4 != hz || !n)) {
    if (((vz = z.clientX), (cz = z.clientY), XV[HV])) {
      var V = Math.atan2(
        cz - window.innerHeight / 2,
        vz - window.innerWidth / 2,
      );
      (XV[HV].rotation = V),
        (K.aimDirection = V),
        (K.aimDistance =
          Math.sqrt(
            (cz - window.innerHeight / 2) ** 2 +
              (vz - window.innerWidth / 2) ** 2,
          ) / U.scale.x),
        1 == gz &&
          ((K.moveDirection = V + (Rc ? Math.PI : 0)), (K.moving = true)),
        cV &&
          ((K.moveDirection = K.aimDirection),
          (K.moving = K.aimDistance > 4 * kz));
      var l = new Date().getTime();
      l - Zc > 20 ? (tc(), (Zc = l)) : (Fc = true);
    }
    if (SL) {
      var D = cc();
      document.getElementById("defuse-editor-position").innerHTML =
        Nv(D.x).toFixed(2) + " " + Nv(D.y).toFixed(2);
    }
  }
}
function nc(z) {
  return (z.clientX - M.x) ** 2 + (z.clientY - M.y) ** 2 <= M.width ** 2;
}
function fc(z) {
  if (0 != e)
    if (Kz && 2 != hz && 4 != hz)
      document.getElementById(
        "respawn" + (2 == hz ? "-gm2" : ""),
      ).style.display = "block";
    else if (4 != hz || !n)
      if (2 == hz && n) Tc();
      else {
        var V = new Date().getTime(),
          l = 1 * jl;
        if ("touchend" === z.type || "touchcancel" === z.type)
          for (var D = 0; D < z.changedTouches.length; D++) {
            var v = z.changedTouches[D];
            if (
              (jc && jc.identifier == v.identifier
                ? ((K.moving = false),
                  tc(),
                  (b.visible = false),
                  (X.visible = false),
                  (jc = null))
                : Cc && Cc.identifier == v.identifier
                  ? ((K.shooting = false),
                    tc(),
                    (H.visible = false),
                    (r.visible = false),
                    (Cc = null))
                  : Bc &&
                    Bc.identifier == v.identifier &&
                    ((sc = false), (Bc = null)),
              Yc && v.identifier == Yc.identifier && V - Yc.time < 250)
            )
              if (
                (W = Math.sqrt(
                  (Yc.clientX - v.clientX) ** 2 + (Yc.clientY - v.clientY) ** 2,
                )) <
                0.2 * jl
              ) {
                if (oc && V - oc.time < 250)
                  if (
                    (W = Math.sqrt(
                      (oc.clientX - v.clientX) ** 2 +
                        (oc.clientY - v.clientY) ** 2,
                    )) <
                    0.2 * jl
                  ) {
                    var c = K.aimDirection,
                      P = K.aimDistance;
                    (K.aimDirection = Math.atan2(
                      v.clientY - window.innerHeight / 2,
                      v.clientX - window.innerWidth / 2,
                    )),
                      (K.aimDistance =
                        Math.sqrt(
                          (window.innerWidth / 2 - v.clientX) ** 2 +
                            (window.innerHeight / 2 - v.clientY) ** 2,
                        ) / U.scale.x),
                      ev(),
                      (c = K.aimDirection = c),
                      (P = K.aimDistance = P);
                  }
                (oc = {
                  clientX: v.clientX,
                  clientY: v.clientY,
                  identifier: v.identifier,
                }).time = V;
              }
          }
        else if ("touchstart" === z.type)
          for (D = 0; D < z.changedTouches.length; D++) {
            v = z.changedTouches[D];
            if (
              (((Yc = {
                clientX: v.clientX,
                clientY: v.clientY,
                identifier: v.identifier,
              }).time = V),
              nc(v) && !K.shooting)
            )
              (V = new Date().getTime()) - dc > 200
                ? (Pc(), (dc = V))
                : (sc = true),
                3 == hz &&
                  ((sc = true),
                  (Bc = {
                    clientX: v.clientX,
                    clientY: v.clientY,
                    identifier: v.identifier,
                  })),
                (Yc = null);
            else
              v.clientX <= window.innerWidth / 2
                ? ((jc = {
                    clientX: v.clientX,
                    clientY: v.clientY,
                    identifier: v.identifier,
                  }),
                  (b.width = l),
                  (b.height = l),
                  (b.x = jc.clientX),
                  (b.y = jc.clientY),
                  (X.width = l / 2),
                  (X.height = l / 2),
                  (X.x = jc.clientX),
                  (X.y = jc.clientY),
                  (b.visible = true),
                  (X.visible = true))
                : ((Cc = {
                    clientX: v.clientX,
                    clientY: v.clientY,
                    identifier: v.identifier,
                  }),
                  (H.width = l),
                  (H.height = l),
                  (H.x = Cc.clientX),
                  (H.y = Cc.clientY),
                  (r.width = l / 2),
                  (r.height = l / 2),
                  (r.x = Cc.clientX),
                  (r.y = Cc.clientY),
                  (H.visible = true),
                  (r.visible = true));
          }
        else if ("touchmove" === z.type)
          for (D = 0; D < z.changedTouches.length; D++) {
            v = z.changedTouches[D];
            if (jc && v.identifier == jc.identifier && XV[HV]) {
              if (
                ((ac = {
                  clientX: v.clientX,
                  clientY: v.clientY,
                  identifier: v.identifier,
                }),
                (X.x = ac.clientX),
                (X.y = ac.clientY),
                (W = Math.sqrt(
                  (ac.clientX - jc.clientX) ** 2 +
                    (ac.clientY - jc.clientY) ** 2,
                )) >=
                  0.2 * l)
              ) {
                var L = Math.atan2(
                  ac.clientY - jc.clientY,
                  ac.clientX - jc.clientX,
                );
                (K.moveDirection = L),
                  (K.moving = true),
                  (V = new Date().getTime()) - Zc > 20
                    ? (tc(), (Zc = V))
                    : (Fc = true),
                  W >= 0.4 * l &&
                    ((X.x = b.x + Math.cos(L) * l * 0.4),
                    (X.y = b.y + Math.sin(L) * l * 0.4),
                    (jc.clientX =
                      v.clientX + Math.cos(L + Math.PI) * Math.min(W, l)),
                    (jc.clientY =
                      v.clientY + Math.sin(L + Math.PI) * Math.min(W, l)),
                    (b.x = jc.clientX),
                    (b.y = jc.clientY));
              }
            } else if (Cc && v.identifier == Cc.identifier && XV[HV]) {
              (pc = {
                clientX: v.clientX,
                clientY: v.clientY,
                identifier: v.identifier,
              }),
                (r.x = pc.clientX),
                (r.y = pc.clientY);
              var W = Math.sqrt(
                (pc.clientX - Cc.clientX) ** 2 + (pc.clientY - Cc.clientY) ** 2,
              );
              L = Math.atan2(pc.clientY - Cc.clientY, pc.clientX - Cc.clientX);
              (K.aimDirection = L),
                (XV[HV].rotation = L),
                (K.shooting = true),
                (V = new Date().getTime()) - Zc > 20
                  ? (tc(), (Zc = V))
                  : (Fc = true),
                W >= 0.4 * l &&
                  ((r.x = H.x + Math.cos(L) * l * 0.4),
                  (r.y = H.y + Math.sin(L) * l * 0.4));
            }
          }
        z.preventDefault();
      }
}
function Tc(z, V) {
  var l = new DataView(new ArrayBuffer(2 + (z ? 4 : 0)));
  l.setUint8(0, 12),
    l.setUint8(1, V ? 1 : 0),
    z && l.setInt32(2, z),
    q.send(l.buffer);
}
function Qc() {
  if (1 == Sz) return;
  if (-1 == Sz && !settings.chatEnabled) return;
  const z = document.getElementById("chat-guidelines-popup");
  z &&
    (z.classList.add("visible"),
    document.activeElement == document.getElementById("chat-input") &&
      hideChatInput());
}
var dc = 0,
  sc = false;
function Jc(z) {
  if (
    (mc ||
      !n ||
      Qv ||
      2 == hz ||
      4 == hz ||
      (document.getElementById("respawn").style.display = "block"),
    (0 != e || SL) && (4 != hz || !n))
  )
    if (2 == hz && n) Tc();
    else {
      void 0 !== JL[z.button] && (rc(JL[z.button]), z.preventDefault()),
        window.focus();
      var V = document.getElementById("chat-input");
      V &&
        document.activeElement == V &&
        (document.getElementById("chat-block").classList.remove("typing"),
        V.blur());
    }
}
function xc(z) {
  (0 != e || SL) &&
    ((SL &&
      z.target.parentElement &&
      "defuse-help-content" == z.target.parentElement.id) ||
      (4 == hz && n) ||
      (void 0 !== JL[z.button] && Mc(JL[z.button])));
}
var Sc = [false, false, false, false],
  Rc = false,
  yc = false,
  bc = false;
function Xc() {
  if ((mc || XV[HV]) && 1 != gz)
    if (Sc[0] || Sc[1] || Sc[2] || Sc[3]) {
      var z = 0,
        V = 0;
      Sc[0] ? (V -= 1) : Sc[1] && (V += 1),
        Sc[2] ? (z -= 1) : Sc[3] && (z += 1);
      var l = Math.atan2(V, z);
      (K.moving && K.moveDirection == l) ||
        ((K.moving = true), (K.moveDirection = l), tc()),
        mc && (Kz = 0);
    } else (K.moving = false), tc();
}
var Hc = false;
function rc(z) {
  switch (z) {
    case "MUP":
      (Sc[0] = true), Xc();
      break;
    case "MDOWN":
      (Sc[1] = true), Xc();
      break;
    case "MLEFT":
      (Sc[2] = true), Xc();
      break;
    case "MRIGHT":
      (Sc[3] = true), Xc();
      break;
    case "TLEFT":
      yc = true;
      break;
    case "TRIGHT":
      bc = true;
      break;
    case "SHOOT":
      K.shooting = true;
      tc();
      iz.visible = false;
      break;
    case "BUILD":
      if (!Hc && !K.shooting) {
        Hc = true;
        const now = Date.now();
        if (now - dc > 200) {
          Pc();
          dc = now;
        } else {
          sc = true;
        }
        if (hz === 3) {
          sc = true;
        }
      }
      break;
    case "SUPERPOWER":
      Fz || ev();
  }
}
function Mc(z) {
  switch (z) {
    case "MUP":
      (Sc[0] = false), Xc();
      break;
    case "MDOWN":
      (Sc[1] = false), Xc();
      break;
    case "MLEFT":
      (Sc[2] = false), Xc();
      break;
    case "MRIGHT":
      (Sc[3] = false), Xc();
      break;
    case "TLEFT":
      yc = false;
      break;
    case "TRIGHT":
      bc = false;
      break;
    case "SHOOT":
      if (((K.shooting = false), tc(), (iz.visible = !!Nc), SL))
        for (var V in ((Nc = null), (iz.visible = false), RV)) {
          var l = RV[V],
            D = cc();
          if (((D.x = Nv(D.x)), (D.y = Nv(D.y)), l.position.dst(D) < Iz)) {
            var v = new DataView(new ArrayBuffer(9));
            return v.setInt32(1, l.dotId), v.setInt32(5, 0), void Tv(v);
          }
        }
      break;
    case "BUILD":
      (Hc = false), 3 == hz && (sc = false);
      break;
    case "MOVEWMOUSE":
      vV &&
        (Ec++,
        (cV = !cV),
        kc(),
        (K.moving = false),
        tc(),
        Ec < 4 &&
          showAlert(
            "Move with mouse " +
              (cV ? "ENABLED" : "DISABLED") +
              (customKeyboardCommands.MOVEWMOUSE.length > 0 &&
              customKeyboardCommands.MOVEWMOUSE[0] &&
              Object.keys(customKeyboardCommands.MOVEWMOUSE[0]).length > 0
                ? " (shortcut: " +
                  oL(customKeyboardCommands.MOVEWMOUSE[0]) +
                  ")"
                : ""),
            2e3,
          ));
      break;
    case "TEAMMATES":
      (1 != hz && 2 != hz) || (lc ? Dc() : (Dc(), (lc = true)));
  }
}
function uc(z) {
  if (
    z.isTrusted &&
    z instanceof KeyboardEvent &&
    (0 != e || SL) &&
    (4 != hz || !n)
  ) {
    var V = "string" == typeof z.code && z.code.length > 0,
      l = document.getElementById("chat-input");
    if (!(l && document.activeElement == l)) {
      if (V && dL[z.code]) rc(dL[z.code]);
      else if ((V && "Digit1" == z.code) || (!V && 49 == z.keyCode)) Lc(0);
      else if ((V && "Digit2" == z.code) || (!V && 50 == z.keyCode)) Lc(1);
      else if ((V && "Digit3" == z.code) || (!V && 51 == z.keyCode)) Lc(2);
      else if ((V && "Digit4" == z.code) || (!V && 52 == z.keyCode)) Lc(3);
      else if ((V && "Digit5" == z.code) || (!V && 53 == z.keyCode)) Lc(4);
      else if ((V && "Digit6" == z.code) || (!V && 54 == z.keyCode)) Lc(5);
      else if ((V && "Digit7" == z.code) || (!V && 55 == z.keyCode)) Lc(6);
      else if (66 == z.keyCode) {
        (D = document.getElementById("xp-block")).style.opacity &&
        1 != D.style.opacity
          ? 0 == D.style.opacity
            ? (D.style.opacity = 1)
            : 0.5 == D.style.opacity && (D.style.opacity = 0)
          : (D.style.opacity = 0.5);
      } else if (76 == z.keyCode) {
        var D;
        (D = document.getElementById("leaderboard-block")).style.opacity &&
        1 != D.style.opacity
          ? 0 == D.style.opacity
            ? (D.style.opacity = 1)
            : 0.5 == D.style.opacity && (D.style.opacity = 0)
          : (D.style.opacity = 0.5);
      } else if (73 == z.keyCode)
        document.getElementById("settings-popup").style.display =
          "block" == document.getElementById("settings-popup").style.display
            ? "none"
            : "block";
      else if (
        !(
          9 == z.keyCode ||
          (z.keyCode >= 65 && z.keyCode <= 90) ||
          60 == z.keyCode
        )
      )
        return;
      n || z.preventDefault();
    }
  }
}
var Ec = 0;
function _c(z) {
  if (z.isTrusted && z instanceof KeyboardEvent) {
    var V = hz == 4 && !!n;
    if (e != 0 || SL || V) {
      var l = document.getElementById("chat-input"),
        D = l && document.activeElement == l,
        v = typeof z.code == "string" && z.code.length > 0;

      if (D) {
        if (z.keyCode == 13) {
          l.value.length > 0 && HD(l.value);
          l.value = "";
          l.blur();
          document.getElementById("chat-block").classList.remove("typing");
        }
      } else if (v && dL[z.code]) {
        Mc(dL[z.code]);
      } else if (mc && ((v && z.code == "KeyJ") || (!v && z.keyCode == 74))) {
        var c = document.getElementById("xp-block");
        c.style.display = c.style.display == "block" ? "none" : "block";
        c.getElementsByClassName("xp-bar")[0].style.display = "none";
        c.getElementsByClassName("text")[1].style.display = "none";
        var P = "";
        for (var L = 0; L < _V; L++) {
          var W = AV[L + (Pz >= 1 ? 1 : 0)];
          if (W == 16252714) W = 13817893;
          var g = Bl(W, 0.2);
          P +=
            '<div class="bar" id="map-control-bar-team-' +
            ((Pz >= 1 ? 1 : 0) + L) +
            '" style="background: linear-gradient(to bottom, ' +
            HP(W) +
            ", " +
            HP(g) +
            ');"></div>';
        }
        document.getElementById("score-bars").innerHTML = P;
      } else if (mc && ((v && z.code == "KeyI") || (!v && z.keyCode == 73))) {
        var q = document.getElementById("fps");
        q.style.display = q.style.display == "block" ? "none" : "block";
      } else if (mc && ((v && z.code == "KeyO") || (!v && z.keyCode == 79))) {
        hc(2);
      } else if (mc && ((v && z.code == "KeyR") || (!v && z.keyCode == 82))) {
        hc(5);
      } else if (mc && ((v && z.code == "KeyT") || (!v && z.keyCode == 84))) {
        clearInterval(hD);
        hD = null;
      } else if (mc && ((v && z.code == "KeyY") || (!v && z.keyCode == 89))) {
        clearInterval(UD);
      } else if (mc && ((v && z.code == "KeyN") || (!v && z.keyCode == 78))) {
        hc(6);
      } else if (mc && z.keyCode == 77) {
        if (d.style.transform == "none") {
          document.getElementById("minimap").style.width =
            0.375 * d.width + "px";
          document.getElementById("minimap").style.height =
            0.375 * d.height + "px";
          d.style.transform = "scale(0.375)";
        } else {
          document.getElementById("minimap").style.width = d.width + "px";
          document.getElementById("minimap").style.height = d.height + "px";
          d.style.transform = "none";
        }
      } else if (mc && z.keyCode == 70) {
        var m = Math.min(window.innerWidth, window.innerHeight) - 32;
        document.getElementById("minimap").style.width = m + "px";
        document.getElementById("minimap").style.height =
          (m / d.width) * d.height + "px";
        d.style.transform = "scale(" + m / 256 + ")";
      } else if (mc && ((v && z.code == "KeyH") || (!v && z.keyCode == 72))) {
        var a = document.getElementById("admin-player-list");
        a ? document.body.removeChild(a) : hc(8);
      } else {
        if (z.code == "KeyP") {
          showAlert("grid version = " + (Gc = (Gc + 1) % 2), 3000);
          kc();
        } else if (z.code == "KeyO" && !SL) {
          showAlert("interpolation = " + (CP = !CP), 3000);
        }
      }
    }
  }
}

function wc(z) {}
var Gc = 0;
function kc() {
  h.resize(window.innerWidth, window.innerHeight), (lV = Nz), (DV = zV);
  var z = window.innerWidth / window.innerHeight;
  if (
    (lV < DV * z ? (DV = lV / z) : (lV = DV * z),
    Fl &&
      ((jl = Math.min(tl().dpcm(), window.innerHeight / 6)),
      (lV *= 0.75),
      (DV *= 0.75),
      M &&
        ((M.width = 1 * jl),
        (M.height = 1 * jl),
        (M.x = window.innerWidth - 0.75 * jl),
        (M.y = window.innerHeight - 0.75 * jl),
        (M.visible = true))),
    0 != e || SL)
  ) {
    var V = XV[HV] || XV[Kz] || n;
    if (V) {
      var l = V.x - lV / 2,
        D = V.y - DV / 2,
        v = window.innerWidth / lV,
        c = window.innerHeight / DV;
      U.setTransform(-l * v, -D * c, v, c, 0, 0, 0, 0, 0);
    }
    t.removeChildren();
    var P = 1 / v;
    if (P <= 1) {
      var L = Math.round(nV / P) * P;
      L <= 0 && (L = 1e-6);
      var W = Math.floor(window.innerWidth / L / v) + 2,
        g = Math.floor(window.innerHeight / L / c) + 2;
      if (0 == Gc) {
        for (var q = 0; q <= W; q++) {
          ((m = new PIXI.Sprite(F.gridpixel)).width = 1 / v),
            (m.height = Math.min(ez, g * L)),
            (m.x = q * L),
            (m.y = 0),
            m.x <= Oz && t.addChild(m),
            0 != iV || (0 != q && q != W && m.x != Oz)
              ? (m.tint = PV ? 2236962 : 14540253)
              : (m.tint = 4473924);
        }
        for (q = 0; q <= g; q++) {
          var m;
          ((m = new PIXI.Sprite(F.gridpixel)).width = Math.min(Oz, W * L)),
            (m.height = 1 / c),
            (m.x = 0),
            (m.y = q * L),
            m.y <= ez && t.addChild(m),
            0 != iV || (0 != q && q != g && m.y != ez)
              ? (m.tint = PV ? 2236962 : 14540253)
              : (m.tint = 4473924);
        }
        var a = t.children[0];
        t.removeChild(a), t.addChild(a);
      } else if (1 == Gc) {
        var B = new PIXI.Graphics();
        for (q = 0; q <= W; q++)
          0 != iV || (0 != q && q != W)
            ? B.lineStyle(1 / v / 2 / 2, PV ? 4473924 : 8947848)
            : B.lineStyle(1 / v, PV ? 8947848 : 4473924),
            B.moveTo(q * L, 0).lineTo(q * L, g * L);
        for (q = 0; q <= g; q++)
          0 != iV || (0 != q && q != g)
            ? B.lineStyle(1 / v / 2 / 2, PV ? 4473924 : 8947848)
            : B.lineStyle(1 / v, PV ? 8947848 : 4473924),
            B.moveTo(0, q * L).lineTo(W * L, q * L);
        t.addChild(B);
      }
    }
    if (0 == iV) j.removeChildren();
    else if (1 == iV) {
      j.removeChildren(),
        (C = new PIXI.Graphics()).lineStyle(1 / v, 4473924, 1, 0.5),
        C.moveTo(0, ez / 2)
          .lineTo(Oz / 4, 0)
          .lineTo((3 * Oz) / 4, 0)
          .lineTo(Oz, ez / 2)
          .lineTo((3 * Oz) / 4, ez)
          .lineTo(Oz / 4, ez)
          .lineTo(0, ez / 2),
        j.addChild(C);
    } else if (2 == iV) {
      var C;
      j.removeChildren(),
        (C = new PIXI.Graphics()).lineStyle(1 / v, 4473924, 1, 0.5),
        C.drawEllipse(Oz / 2, ez / 2, Oz / 2, ez / 2),
        j.addChild(C);
    }
    for (q = 0; q < Y.children.length; q++)
      Y.children[q] instanceof PIXI.Text &&
        (Y.children[q].scale.set(1 / U.scale.x),
        (Y.children[q].style.fontSize = Math.round(window.innerHeight / 60)));
    u && R.removeChild(u),
      cV &&
        (((u = new PIXI.Sprite(F.shoot)).width = 4 * kz * 2 * U.scale.x),
        (u.height = 4 * kz * 2 * U.scale.y),
        (u.tint = PV ? 16777215 : 0),
        (u.alpha = 0.1),
        u.anchor.set(0.5),
        u.position.set(window.innerWidth / 2, window.innerHeight / 2),
        R.addChild(u));
  }
}
function Ic(z, V, l) {
  var D = new PIXI.Text(l, {
    fontFamily: "Arial",
    fontSize: 26,
    fontWeight: 700,
    fill: PV ? 16777215 : Bl(Pl(HV), -0.7),
    align: "center",
  });
  (D.x = z),
    (D.y = V),
    D.anchor.set(0.5),
    D.scale.set(0.03),
    a.addChild(D),
    anime({
      targets: D,
      y: V - 5,
      alpha: { value: 0, easing: "easeInQuad" },
      easing: "linear",
      duration: 1e3,
      complete: ((z) => () => {
        a.removeChild(z);
      })(D),
    });
}
function Ac() {}
function Oc(z) {
  z;
}
function ec(z) {
  for (; z < 2 * Math.PI; ) z += 2 * Math.PI;
  for (; z > 2 * Math.PI; ) z -= 2 * Math.PI;
  return z;
}
var Nc = null;
function zP(z, V, l) {
  this.gridSize = l;
  var D = Math.ceil((z + 1) / l),
    v = Math.ceil((V + 1) / l);
  this.grid = [];
  for (var c = 0; c < D; c++) {
    this.grid[c] = [];
    for (var P = 0; P < v; P++) this.grid[c][P] = new Set();
  }
}
function VP(z, V, l, D) {
  var v = 0,
    c = Math.abs(l - z),
    P = Math.abs(D - V),
    L = 2 * c,
    W = 2 * P,
    g = z < l ? 1 : -1,
    q = V < D ? 1 : -1,
    m = z,
    h = V,
    U = [];
  if (c >= P)
    for (; U.push(m, h), m != l; )
      (m += g), (v += W) > c && ((h += q), (v -= L));
  else
    for (; U.push(m, h), h != D; )
      (h += q), (v += L) > P && ((m += g), (v -= W));
  return U;
}
function lP(z, V, l, D, v) {
  var c = (l.x - z.x) * (V.x - z.x) + (l.y - z.y) * (V.y - z.y),
    P = z.dst(V);
  if ((c /= P * P) < 0) var L = new PIXI.Point(z.x, z.y);
  else if (c > 1) L = new PIXI.Point(V.x, V.y);
  else {
    var W = new PIXI.Point(V.x, V.y).sub(z);
    L = new PIXI.Point(z.x, z.y).add(W.scl(c));
  }
  return (P = L.dst(l)) < D ? (v.copy(L), v.sub(l).nor(), D - P) : 1 / 0;
}
function DP(z, V) {
  var l = new PIXI.Point();
  (z.lastX = z.x), (z.lastY = z.y);
  var D = V ? (1 + (0.3 * Bz[0]) / 8) * (1 == oz && Fz ? 1.5 : 1) : 1;
  if (z.moving)
    (z.sx += (Math.cos(z.moveDirection) * TV * D * 1) / 60),
      (z.sy += (Math.sin(z.moveDirection) * TV * D * 1) / 60);
  else {
    var v = Math.sqrt(z.sx * z.sx + z.sy * z.sy),
      c = Math.atan2(z.sy, z.sx) + Math.PI;
    (z.sx += Math.cos(c) * Math.min(v, ($V * D * 1) / 60)),
      (z.sy += Math.sin(c) * Math.min(v, ($V * D * 1) / 60));
  }
  var P = Math.sqrt(z.sx * z.sx + z.sy * z.sy),
    L = fV * D;
  if (P > L) {
    c = Math.atan2(z.sy, z.sx);
    (z.sx = Math.cos(c) * L), (z.sy = Math.sin(c) * L);
  }
  if (
    ((z.x += (1 * z.sx) / 60),
    (z.y += (1 * z.sy) / 60),
    aD(z.position),
    z.moving && (Pz >= 1 || 2 == hz) && 1 != uV[z.playerId])
  )
    if (_)
      for (
        var W = _.getAllInRange(z.position, 1, 1), g = 0;
        g < W.length;
        g++
      ) {
        if (1 == (h = W[g]).owner) {
          var q = lP(
            h.dot1.position,
            h.dot2.position,
            z.position,
            (kz / GV) * QV,
            l,
          );
          if (isFinite(q)) {
            (z.x = z.lastX + l.x * dV * -0.25),
              (z.y = z.lastY + l.y * dV * -0.25);
            break;
          }
        }
      }
    else
      for (var m in yV) {
        var h;
        if (1 == (h = yV[m]).owner) {
          q = lP(
            h.dot1.position,
            h.dot2.position,
            z.position,
            (kz / GV) * QV,
            l,
          );
          if (isFinite(q)) {
            (z.x = z.lastX + l.x * dV * -0.25),
              (z.y = z.lastY + l.y * dV * -0.25);
            break;
          }
        }
      }
}
function vP(z, V, l) {
  return (z.x - V.x) * (l.y - V.y) - (z.y - V.y) * (l.x - V.x);
}
function cP(z, V) {
  if (
    z.position.dst(V.position) < Iz + Az &&
    V.shield &&
    1 == V.shield.state &&
    z.lastPosition
  ) {
    var l = ((z, V, l, D) => {
      var v = V.x - z.x,
        c = V.y - z.y,
        P = l.x - z.x,
        L = l.y - z.y,
        W = v * v + c * c,
        g = (v * P + c * L) / W,
        q = g * g - (P * P + L * L - D * D) / W;
      if (q < 0) return null;
      var m = Math.sqrt(q),
        h = -g + m,
        U = -g - m,
        t = new PIXI.Point(z.x - v * h, z.y - c * h);
      return t.dst(z) <= z.dst(V)
        ? t
        : 0 == q
          ? (console.error(
              "error getCircleSegmentIntersectionPoint",
              z,
              V,
              l,
              D,
            ),
            null)
          : (t.set(z.x - v * U, z.y - c * U), t);
    })(z.lastPosition, z.position, V.position, Iz + Az);
    if (l) {
      var D = z.position.cpy().sub(z.lastPosition),
        v = V.position.cpy().sub(l).nor(),
        c = D.cpy().sub(v.cpy().scl(2 * D.dot(v))),
        P = z.position.cpy();
      z.position.set(l.x, l.y), z.position.add(c.nor().scl(l.dst(P)));
      var L = Math.sqrt(z.sx * z.sx + z.sy * z.sy);
      return (
        c.nor().scl(L),
        (z.sx = c.x),
        (z.sy = c.y),
        (hV || UV) && (z.rotation = Math.atan2(z.sy, z.sx)),
        true
      );
    }
  }
  return false;
}
(zP.prototype.add = function (z, V) {
  this.grid[Math.floor(V.x / this.gridSize)][
    Math.floor(V.y / this.gridSize)
  ].add(z);
}),
  (zP.prototype.addLine = function (z, V, l) {
    for (
      var D = VP(
          Math.floor(V.x / this.gridSize),
          Math.floor(V.y / this.gridSize),
          Math.floor(l.x / this.gridSize),
          Math.floor(l.y / this.gridSize),
        ),
        v = 0;
      v < D.length;
      v += 2
    )
      this.grid[D[v]][D[v + 1]].add(z);
  }),
  (zP.prototype.addZone = function (z, V, l, D, v) {
    for (
      var c = Math.floor(V / this.gridSize),
        P = Math.floor(D / this.gridSize),
        L = Math.floor(l / this.gridSize),
        W = Math.floor(v / this.gridSize),
        g = c;
      g <= L;
      g++
    )
      for (var q = P; q <= W; q++) this.grid[g][q].add(z);
  }),
  (zP.prototype.remove = function (z, V) {
    this.grid[Math.floor(V.x / this.gridSize)][
      Math.floor(V.y / this.gridSize)
    ].delete(z);
  }),
  (zP.prototype.removeLine = function (z, V, l) {
    for (
      var D = VP(
          Math.floor(V.x / this.gridSize),
          Math.floor(V.y / this.gridSize),
          Math.floor(l.x / this.gridSize),
          Math.floor(l.y / this.gridSize),
        ),
        v = 0;
      v < D.length;
      v += 2
    )
      this.grid[D[v]][D[v + 1]].delete(z);
  }),
  (zP.prototype.removeZone = function (z, V, l, D, v) {
    for (
      var c = Math.floor(V / this.gridSize),
        P = Math.floor(D / this.gridSize),
        L = Math.floor(l / this.gridSize),
        W = Math.floor(v / this.gridSize),
        g = c;
      g <= L;
      g++
    )
      for (var q = P; q <= W; q++) this.grid[g][q].delete(z);
  }),
  (zP.prototype.update = function (z, V, l) {
    var D = Math.floor(V.x / this.gridSize),
      v = Math.floor(V.y / this.gridSize),
      c = Math.floor(l.x / this.gridSize),
      P = Math.floor(l.y / this.gridSize);
    (D == c && v == P) || (this.grid[D][v].delete(z), this.grid[c][P].add(z));
  }),
  (zP.prototype.getAllInRange = function (z, V, l) {
    for (
      var D = new Set(),
        v = Math.floor(z.x / this.gridSize),
        c = Math.floor(z.y / this.gridSize),
        P = -V;
      P <= V;
      P++
    )
      for (var L = -l; L <= l; L++)
        v + P >= 0 &&
          v + P < this.grid.length &&
          c + L >= 0 &&
          c + L < this.grid[0].length &&
          this.grid[v + P][c + L].forEach((z) => {
            D.add(z);
          });
    var W = [];
    return (
      D.forEach((z) => {
        W.push(z);
      }),
      W
    );
  }),
  (zP.prototype.getAllInRect = function (z, V, l, D) {
    for (
      var v = new Set(),
        c = Math.floor(z / this.gridSize),
        P = Math.floor(l / this.gridSize),
        L = Math.floor(V / this.gridSize),
        W = Math.floor(D / this.gridSize),
        g = c;
      g <= L;
      g++
    )
      for (var q = P; q <= W; q++)
        this.grid[g][q].forEach((z) => {
          v.add(z);
        });
    var m = [];
    return (
      v.forEach((z) => {
        m.push(z);
      }),
      m
    );
  }),
  (PIXI.ObservablePoint.prototype.dst = function (z) {
    var V = z.x - this.x,
      l = z.y - this.y;
    return Math.sqrt(V * V + l * l);
  }),
  (PIXI.ObservablePoint.prototype.dst2 = function (z) {
    var V = z.x - this.x,
      l = z.y - this.y;
    return V * V + l * l;
  }),
  (PIXI.ObservablePoint.prototype.dst2XY = function (z, V) {
    var l = z - this.x,
      D = V - this.y;
    return l * l + D * D;
  }),
  (PIXI.ObservablePoint.prototype.sub = function (z) {
    return (this.x -= z.x), (this.y -= z.y), this;
  }),
  (PIXI.ObservablePoint.prototype.add = function (z) {
    return (this.x += z.x), (this.y += z.y), this;
  }),
  (PIXI.ObservablePoint.prototype.scl = function (z) {
    return (this.x *= z), (this.y *= z), this;
  }),
  (PIXI.ObservablePoint.prototype.len = function (z) {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }),
  (PIXI.ObservablePoint.prototype.len2 = function (z) {
    return this.x * this.x + this.y * this.y;
  }),
  (PIXI.ObservablePoint.prototype.nor = function () {
    var z = this.len2();
    return 0 == z || 1 == z ? this : this.scl(1 / Math.sqrt(z));
  }),
  (PIXI.ObservablePoint.prototype.cpy = function () {
    return new PIXI.Point(this.x, this.y);
  }),
  (PIXI.ObservablePoint.prototype.rotate90 = function (z) {
    var V = this.x;
    return (
      z >= 0
        ? ((this.x = -this.y), (this.y = V))
        : ((this.x = this.y), (y = -V)),
      this
    );
  }),
  (PIXI.ObservablePoint.prototype.dot = function (z) {
    return this.x * z.x + this.y * z.y;
  }),
  (PIXI.Point.prototype.dst = PIXI.ObservablePoint.prototype.dst),
  (PIXI.Point.prototype.dst2 = PIXI.ObservablePoint.prototype.dst2),
  (PIXI.Point.prototype.dst2XY = PIXI.ObservablePoint.prototype.dst2XY),
  (PIXI.Point.prototype.sub = PIXI.ObservablePoint.prototype.sub),
  (PIXI.Point.prototype.add = PIXI.ObservablePoint.prototype.add),
  (PIXI.Point.prototype.scl = PIXI.ObservablePoint.prototype.scl),
  (PIXI.Point.prototype.len = PIXI.ObservablePoint.prototype.len),
  (PIXI.Point.prototype.len2 = PIXI.ObservablePoint.prototype.len2),
  (PIXI.Point.prototype.nor = PIXI.ObservablePoint.prototype.nor),
  (PIXI.Point.prototype.cpy = PIXI.ObservablePoint.prototype.cpy),
  (PIXI.Point.prototype.rotate90 = PIXI.ObservablePoint.prototype.rotate90),
  (PIXI.Point.prototype.dot = PIXI.ObservablePoint.prototype.dot);
var PP = new PIXI.Point();
function LP(z, V) {
  var l = ((z, V, l, D, v) => {
    var c = (l.x - z.x) * (V.x - z.x) + (l.y - z.y) * (V.y - z.y),
      P = z.dst(V);
    if ((c /= P * P) < 0 || c > 1) return 1 / 0;
    var L = new PIXI.Point(V.x, V.y).sub(z),
      W = new PIXI.Point(z.x, z.y).add(L.scl(c));
    return (P = W.dst(l)) < D ? (v.copy(l), v.sub(W).nor(), P) : 1 / 0;
  })(V.dot1.position, V.dot2.position, z.position, Az, PP);
  if (isFinite(l) && z.lastPosition) {
    var D = z.position.cpy().sub(z.lastPosition);
    if (
      (Math.sign(vP(z.position, V.dot1.position, V.dot2.position)) !=
        Math.sign(vP(z.lastPosition, V.dot1.position, V.dot2.position)) &&
        PP.scl(-1),
      D.dot(PP) < 0)
    ) {
      var v = V.dot2.position.cpy().sub(V.dot1.position).rotate90(1).nor(),
        c = D.cpy().sub(v.cpy().scl(2 * D.dot(v)));
      z.position.sub(D.scl(l / Iz)).add(c.cpy().scl(Iz - l / Iz));
      var P = Math.sqrt(z.sx * z.sx + z.sy * z.sy);
      return (
        c.nor().scl(P),
        (z.sx = c.x),
        (z.sy = c.y),
        (hV || UV) && (z.rotation = Math.atan2(z.sy, z.sx)),
        true
      );
    }
  }
  return false;
}
function WP(z, V) {
  var l = new PIXI.Point();
  if (z)
    for (var D in XV)
      if (D != HV) {
        var v = XV[D];
        if (
          ((v.lastX = v.x),
          (v.lastY = v.y),
          (v.x += (1 * v.sx) / 60),
          (v.y += (1 * v.sy) / 60),
          aD(v.position),
          !((2 != hz && 4 != hz) || (0 == v.sx && 0 == v.sy) || 1 == uV[D]))
        )
          if (_)
            for (
              var c = _.getAllInRange(v.position, 1, 1), P = 0;
              P < c.length;
              P++
            ) {
              if (1 == (h = c[P]).owner) {
                var L = lP(
                  h.dot1.position,
                  h.dot2.position,
                  v.position,
                  (kz / GV) * QV,
                  l,
                );
                if (isFinite(L)) {
                  (v.x = v.lastX + l.x * dV * -0.25),
                    (v.y = v.lastY + l.y * dV * -0.25);
                  break;
                }
              }
            }
          else
            for (var W in yV) {
              if (1 == (h = yV[W]).owner) {
                L = lP(
                  h.dot1.position,
                  h.dot2.position,
                  v.position,
                  (kz / GV) * QV,
                  l,
                );
                if (isFinite(L)) {
                  (v.x = v.lastX + l.x * dV * -0.25),
                    (v.y = v.lastY + l.y * dV * -0.25);
                  break;
                }
              }
            }
      }
  if (V) {
    var g = {};
    for (var q in Uz)
      Uz[q].lifetime--,
        Uz[q].lifetime <= 0
          ? (g[q] = true)
          : ((Uz[q].lastPosition = Uz[q].position.cpy()),
            (Uz[q].x += (1 * Uz[q].sx) / 60),
            (Uz[q].y += (1 * Uz[q].sy) / 60),
            !Uz[q].endoflife &&
              Uz[q].lifetime <= 20 &&
              ((Uz[q].endoflife = true),
              anime({
                targets: Uz[q],
                alpha: 0,
                width: 1.25 * Uz[q].width,
                height: 1.25 * Uz[q].height,
                duration: 1e3 / 3,
                easing: "easeInCubic",
              })));
    for (var q in g) o.removeChild(Uz[q]), delete Uz[q];
    for (var q in Uz) {
      if (!((m = Uz[q]).initialTurn >= lz))
        if (E)
          for (
            c = E.getAllInRange(m.position, 0, 0), P = 0;
            P < c.length;
            P++
          ) {
            if ((L = c[P]).owner != m.owner && cP(m, L)) break;
          }
        else
          for (var P in RV) {
            if ((L = RV[P]).owner != m.owner && cP(m, L)) break;
          }
    }
    z: for (var q in Uz) {
      var m = Uz[q];
      if (_)
        for (c = _.getAllInRange(m.position, 0, 0), P = 0; P < c.length; P++) {
          if ((h = c[P]).owner != m.owner && LP(m, h)) continue z;
        }
      else
        for (var P in yV) {
          var h;
          if ((h = yV[P]).owner != m.owner && LP(m, h)) continue z;
        }
    }
  }
}
function gP(z) {
  for (var V = 0; V < z.lines.length; V++) {
    var l = z.lines[V];
    if (
      (l.leftZoneId && bV[l.leftZoneId]) ||
      (l.rightZoneId && bV[l.rightZoneId])
    )
      return true;
  }
  return false;
}
function qP(z) {
  var V = new Date().getTime();
  if (e > 0 || SL) {
    lz++;
    for (var l = false; Dz.length > 0 && Dz[0].turn <= lz; )
      YD(Dz[0].dv), (l = true), Dz.splice(0, 1);
    if ((WP(!l && (2 != hz || 1 != JV), true), n))
      l || (XV[HV] && !XV[HV].visible && DP(XV[HV], true));
    else {
      for (; Wz.length > 0 && Wz[0].turn <= lz; )
        XV[HV] &&
          ((XV[HV].shooting = Wz[0].input.shooting),
          (XV[HV].moving = Wz[0].input.moving),
          (XV[HV].aimDirection = Wz[0].input.aimDirection),
          (XV[HV].moveDirection = Wz[0].input.moveDirection)),
          Wz.splice(0, 1);
      l ||
        tP ||
        (Fz && 5 == oz) ||
        (2 == hz && 1 == JV) ||
        (4 == hz && lz < 300) ||
        DP(XV[HV], true);
    }
  }
  var D = 3 == hz && XV[HV];
  for (var v in RV) {
    var c = RV[v];
    if (c.shield) {
      var P = c.shield,
        L =
          D &&
          c.owner != HV &&
          c.owner != Kz &&
          c.position.dst2(XV[HV].position) <= 6.25;
      if (0 == P.state && P.lastAppearTurn <= lz - 300 && gP(c) && !L) {
        if (
          ((P.width = 2 * Iz * 1.709089011247097),
          (P.height = 2 * Iz * 1.709089011247097),
          c.dotBlastAnim)
        ) {
          try {
            c.dotBlastAnim.pause();
          } catch (z) {}
          c.dotBlastAnim = null;
        }
        TP
          ? (P.alpha = 1)
          : (c.shieldAppearAnim = anime({
              targets: P,
              alpha: 1,
              duration: 250,
              easing: "linear",
              complete: ((z) => () => {
                0 != z.state || c.dotBlastAnim || (z.alpha = 0),
                  (c.shieldAppearAnim = null);
              })(P),
            })),
          (P.state = 1),
          (P.lastAppearTurn =
            c.creationTurn + 300 * Math.floor((lz - c.creationTurn) / 300));
      }
      1 == P.state &&
      lz >= P.lastAppearTurn + 300 * P.appearPercent &&
      P.appearPercent < 1
        ? (TP
            ? (P.alpha = 0)
            : anime({
                targets: P,
                alpha: 0,
                duration: 250,
                easing: "linear",
              }),
          (P.state = 0))
        : 1 == P.state &&
          L &&
          ((P.alpha = 0), (P.state = 0), (P.lastAppearTurn = 0), Yv(c));
    }
  }
  oz >= 0 && ((Zz += 100 / (60 * vl[oz])), Fz || Ov());
  V = new Date().getTime();
  if (
    (Fc && V - Uc >= 20
      ? tc()
      : (yc || bc) &&
        XV[HV] &&
        (yc && (K.aimDirection -= 0.05),
        bc && (K.aimDirection += 0.05),
        (XV[HV].rotation = K.aimDirection),
        tc()),
    (!n || mc) && V - Uc > 500 && tc(),
    sc && V - dc > 200 && (Pc(), (dc = V), 3 == hz && (sc = true)),
    2 == hz &&
      xV > 0 &&
      (4 == JV &&
        xV > 20 &&
        xV - z / 1e3 <= 20 &&
        (document.getElementById("countdown-value").className =
          "animated pulse huge"),
      (3 == JV) & (xV > 0.5) && xV - z / 1e3 <= 0.5 && QD(),
      (xV -= z / 1e3),
      lv(),
      K.moving && !n && ((2 == MV && 4 == JV) || (3 == MV && 2 == JV))))
  )
    for (var W = 0; W < rD.length; W++) {
      if (4 != JV || rD[W].progress.visible)
        Math.sqrt((rD[W].x - XV[HV].x) ** 2 + (rD[W].y - XV[HV].y) ** 2) <
          rD[W].radius &&
          showAlert(
            2 == MV
              ? "Stay still to defuse the bomb"
              : "Stay still to plant the bomb",
            100,
          );
    }
}
function mP(z, V, l) {
  var D = z * Math.PI * 2 * V,
    v = z * (2 * Math.PI * l + Math.PI / 2);
  return Math.sin(D) * Math.cos(v);
}
function hP(z) {
  return z * (2 - z);
}
var UP,
  tP = false,
  jP = false,
  aP = false,
  BP = false,
  CP = false,
  pP = 0;
function YP(z) {
  var V = performance.now(),
    l = pP ? V - pP : 0;
  pP = V;
  var D,
    v,
    c,
    P = XV[Kz] || XV[HV] || n;
  if (P) {
    var L = { x: P.x, y: P.y };
    if (n && lz - f <= 90) L = n;
    else if (n && lz - f > 90 && lz - f < 120) {
      var W = (lz - f - 90) / 30;
      L = { x: n.x * (1 - W) + P.x * W, y: n.y * (1 - W) + P.y * W };
    }
    if (CP) {
      var g = { x: L.x, y: L.y };
      UP &&
        ((L.x = L.x * z + UP.x * (1 - z)), (L.y = L.y * z + UP.y * (1 - z))),
        (UP = g);
    }
    var q = L.x - lV / 2,
      m = L.y - DV / 2,
      j = 0,
      a = 0;
    if (Hz) {
      var B = new Date().getTime() - rz;
      if (B > 1e3) (Hz = false), (U.rotation = 0);
      else {
        var C = B / 1e3;
        (j = 1 * mP(C, Math.PI, Math.PI / 2) * hP(1 - C)),
          (a = 1 * mP(C, 0.33 * Math.PI, 0.66 * Math.PI) * hP(1 - C));
      }
    }
    if (
      (U.position.set((-q + j) * U.scale.x, (-m + a) * U.scale.y),
      t.position.set(Math.floor(q / nV) * nV, Math.floor(m / nV) * nV),
      t.x < 0 && (t.x = 0),
      t.y < 0 && (t.y = 0),
      t.x + t.width > Oz && (t.x = Oz - t.width),
      t.y + t.height > ez && (t.y = ez - t.height),
      0 == Gc)
    ) {
      var Y = 1 / U.scale.x,
        o = (U.position.x % 1) * Y,
        Z = (U.position.y % 1) * Y;
      (t.position.x = Math.round(t.position.x / Y) * Y - o + (Y / 2) * 0),
        (t.position.y = Math.round(t.position.y / Y) * Y - Z + (Y / 2) * 0);
    }
    var $ = cc(L);
    if (iz && Nc) {
      (v = Nc),
        (c = $),
        ((D = iz).rotation = Math.atan2(Nv(c.y) - v.y, Nv(c.x) - v.x)),
        (D.x =
          (v.x +
            Math.cos(D.rotation) * (0.9 * v.size) +
            Nv(c.x) -
            Math.cos(D.rotation) * ((0.9 * wz.width) / 2)) /
          2),
        (D.y =
          (v.y +
            Math.sin(D.rotation) * (0.9 * v.size) +
            Nv(c.y) -
            Math.sin(D.rotation) * ((0.9 * wz.width) / 2)) /
          2),
        (D.width =
          Math.sqrt((v.x - Nv(c.x)) ** 2 + (v.y - Nv(c.y)) ** 2) -
          0.9 * (v.size + wz.width / 2));
      var Q = Nc.position.dst($);
      (iz.visible = !n && !K.shooting && Q < VV),
        (iz.height = Q > 0.8 * VV ? ((1 - Q / VV) / 0.2) * dV : dV);
    }
    (wz.visible = !n && !K.shooting),
      wz.visible && wz.position.set(Nv($.x), Nv($.y));
  }
  if (CP) {
    for (var d in XV) {
      ((s = XV[d]).realX = s.x),
        (s.realY = s.y),
        s.lastVisualX &&
          ((s.x = s.x * z + s.lastVisualX * (1 - z)),
          (s.y = s.y * z + s.lastVisualY * (1 - z))),
        (s.lastVisualX = s.realX),
        (s.lastVisualY = s.realY);
    }
    for (var d in Uz) {
      ((b = Uz[d]).realX = b.x),
        (b.realY = b.y),
        b.lastVisualX &&
          ((b.x = b.x * z + b.lastVisualX * (1 - z)),
          (b.y = b.y * z + b.lastVisualY * (1 - z))),
        (b.lastVisualX = b.realX),
        (b.lastVisualY = b.realY);
    }
  }
  for (var d in XV)
    for (var s = XV[d], J = 0; J < s.rotors.length; J++) {
      var x = s.rotors[J];
      if (
        (x.noRotation
          ? (x.sprite.rotation = -s.rotation)
          : 0 != x.speed &&
            ((x.sprite.baseRotation -= (x.speed * l) / 1e3),
            x.fixedRotation
              ? (x.sprite.rotation = x.sprite.baseRotation)
              : (x.sprite.rotation = x.sprite.baseRotation - s.rotation)),
        1 == x.visibility)
      ) {
        var y = d == HV ? XV[d].moving : 0 != XV[d].sx || 0 != XV[d].sy;
        (x.sprite.visible = y),
          SV &&
            d != HV &&
            ((XV[d].usernameText.visible = y),
            XV[d].badge && (XV[d].badge.visible = y));
      } else if (2 == x.visibility) {
        y = d == HV ? XV[d].moving : 0 != XV[d].sx || 0 != XV[d].sy;
        x.sprite.visible = !y;
      }
    }
  for (var d in XV)
    XV[d].shield.position.set(XV[d].position.x, XV[d].position.y),
      XV[d].usernameText.position.set(
        XV[d].position.x,
        XV[d].position.y - 1.3 * kz,
      ),
      XV[d].badge &&
        XV[d].badge.position.set(
          XV[d].position.x -
            XV[d].usernameText.width / 2 -
            XV[d].badge.width / 2 -
            0.5 * kz,
          XV[d].usernameText.y,
        );
  if (
    (XV[HV] &&
      lz > 300 &&
      ((XV[HV].usernameText.alpha = lz > 360 ? 0 : 1 - (lz - 300) / 60),
      XV[HV].badge && (XV[HV].badge.alpha = XV[HV].usernameText.alpha)),
    (1 != hz && 2 != hz) ||
      (() => {
        if (lc) {
          for (var z in XV)
            if (uV[z] == MV) {
              for (var V = false, l = 0; l < Vc.length; l++)
                if (Vc[l].playerId == z) {
                  V = true;
                  break;
                }
              if (!V) {
                var D = new PIXI.Sprite(F.marker2);
                (D.width = kz),
                  (D.height = (D.width / D.texture.width) * D.texture.height),
                  D.anchor.set(0.5),
                  (D.tint = Pl(z)),
                  (D.playerId = z),
                  p.addChild(D),
                  Vc.push(D);
                var v = new PIXI.Text(nz[z] ? nz[z] : "", {
                  fontFamily: "Arial",
                  fontSize: Math.round(window.innerHeight / 60),
                  fill: PV ? 16777215 : 0,
                  align: "center",
                });
                v.anchor.set(0.5),
                  v.scale.set(1 / U.scale.x),
                  (D.playerText = v),
                  p.addChild(v);
              }
            }
          for (l = 0; l < Vc.length; l++) {
            var c = Vc[l],
              P = XV[c.playerId];
            if (P) {
              var L = U.localTransform.apply(P.position, new PIXI.Point());
              if (
                L.x < 0 ||
                L.y < 0 ||
                L.x > window.innerWidth ||
                L.y > window.innerHeight
              ) {
                var W = vc(L);
                W &&
                  ((c.visible = true),
                  (c.playerText.visible = true),
                  U.localTransform.applyInverse(
                    new PIXI.Point(W.x, W.y),
                    c.position,
                  ),
                  (c.rotation = Math.atan2(
                    L.y - window.innerHeight / 2,
                    L.x - window.innerWidth / 2,
                  )),
                  0 == W.s
                    ? ((c.x -= c.width / 2),
                      (c.playerText.x =
                        c.x - c.width / 2 - c.playerText.width / 2),
                      (c.playerText.y =
                        c.y + Math.sin(c.rotation + Math.PI) * c.width * 1.2))
                    : 1 == W.s
                      ? ((c.y += c.height / 2),
                        (c.playerText.x =
                          c.x +
                          Math.cos(c.rotation + Math.PI) * c.height * 1.2),
                        (c.playerText.y =
                          c.y + c.height + c.playerText.height / 2))
                      : 2 == W.s
                        ? ((c.x += c.width / 2),
                          (c.playerText.x =
                            c.x + c.width / 2 + c.playerText.width / 2),
                          (c.playerText.y =
                            c.y +
                            Math.sin(c.rotation + Math.PI) * c.width * 1.2))
                        : ((c.y -= c.height / 2),
                          (c.playerText.x =
                            c.x +
                            Math.cos(c.rotation + Math.PI) * c.height * 1.2),
                          (c.playerText.y =
                            c.y - c.height - c.playerText.height / 2)));
              } else (c.visible = false), (c.playerText.visible = false);
            } else
              p.removeChild(Vc[l].playerText),
                p.removeChild(Vc[l]),
                Vc.splice(l, 1),
                l--;
          }
        }
      })(),
    h.render(U),
    h.render(S, void 0, false),
    CP)
  ) {
    for (var d in XV) {
      ((s = XV[d]).x = s.realX), (s.y = s.realY);
    }
    for (var d in Uz) {
      var b;
      ((b = Uz[d]).x = b.realX), (b.y = b.realY);
    }
  }
  (Fl || cV) && h.render(R, void 0, false),
    eD && h.render(eD, void 0, false),
    e > 0 && !n && new Date().getTime() - oD > 1e3
      ? ((tP = true),
        (document.getElementById("internet-issue").style.display = "block"))
      : tP &&
        ((document.getElementById("internet-issue").style.display = "none"),
        (tP = false));
}
var oP,
  ZP,
  FP,
  KP,
  nP = 60,
  fP = 0,
  TP = false;
function $P(z, V) {
  (document.getElementById("fps").textContent =
    "server: " + k + " fps: " + Math.round(z) + " ping: " + Math.round(L)),
    V &&
      (console.log("panic: simulation is too late, dropping updates"),
      MainLoop.resetFrameDelta(),
      SL || (lz = Vz)),
    lz > nP && ((nP += ++fP < 10 ? 600 : 3600), Math.round(z), Math.round(L)),
    (TP = z < 30);
}
function QP(z) {
  var V = z.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
    l = decodeURIComponent(
      window
        .atob(V)
        .split("")
        .map((z) => "%" + ("00" + z.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
  return JSON.parse(l);
}
function dP(z) {
  return !(
    z.endsWith("@gmail.com") ||
    z.endsWith("@googlemail.com") ||
    z.endsWith("@icloud.com") ||
    z.endsWith("@hotmail.com") ||
    z.endsWith("@yahoo.com") ||
    z.endsWith("@outlook.com")
  );
}
function sP(z, V) {
  (sz = true),
    (oP = z),
    (FP = V.picture),
    (KP = V.email),
    yP(),
    dP(KP) &&
      (document.getElementById("account-warning").style.display = "block");
}
function JP() {
  if (((opcode = null), "undefined" != typeof Storage))
    try {
      localStorage.removeItem("sessionId");
    } catch (z) {
      console.log(z);
    }
}
function xP() {
  google.accounts.id.revoke(KP, (z) => {
    console.log("User signed out from google."),
      z.successful ||
        (alert("Google logout error: " + z.error),
        console.error("Google logout error: " + z.error)),
      (sz = false),
      JP(),
      (document.getElementById("account-warning").style.display = "none"),
      google.accounts.id.disableAutoSelect();
    try {
      localStorage.removeItem("previousGoogleCredential");
    } catch (z) {}
  });
}
function SP(z) {
  if ((console.log("Facebook login status", z), !sz))
    if ("connected" === z.status) {
      (Jz = true),
        (ZP = z.authResponse.accessToken),
        FB.api("/me?fields=picture,email&redirect=false", (z) => {
          z && z.picture && z.picture.data && (FP = z.picture.data.url),
            z && z.email && (KP = z.email),
            yP();
        });
      try {
        localStorage.removeItem("wasLoggedInWithGoogle");
      } catch (z) {}
    } else Jz && JP(), (Jz = false);
}
function RP() {
  var z = new XMLHttpRequest();
  (z.onreadystatechange = () => {
    if (4 == z.readyState && 200 == z.status)
      if (-1 != z.responseText.indexOf("ERROR"))
        console.error("loginOnServer returned ERROR"), bP();
      else {
        var V = z.responseText.split("\n");
        opcode = V[0];
        var v = V[1];
        uP = V[2].split(" ").map(Number);
        V[3];
        if (
          ((EP = new Number(V[4])),
          V.length >= 6 &&
            (_P = new Number(V[5]) > 0) &&
            (document.getElementById("curse-promo") &&
              (document.getElementById("curse-promo").style.display = "none"),
            document.getElementById("banner-on-homepage") &&
              (document.getElementById("banner-on-homepage").style.display =
                "none")),
          V.length >= 7 && (iP = parseInt(V[6])),
          "undefined" != typeof Storage)
        )
          try {
            localStorage.setItem("sessionId", opcode);
          } catch (z) {
            console.log(z);
          }
        F && VL(true),
          window.location.search.startsWith("?my-account")
            ? BL()
            : "?tourney-mgr" == window.location.search
              ? kL()
              : 0 == window.location.search.indexOf("?tourney-join") &&
                (() => {
                  var z = document
                    .getElementById("username")
                    .value.substring(0, 14);
                  if (
                    (z = window.prompt(
                      "Please enter your tournament username. Warning: this can't be changed afterwards: ",
                      z,
                    ))
                  ) {
                    var V = new XMLHttpRequest();
                    (V.onreadystatechange = () => {
                      4 == V.readyState && 200 == V.status
                        ? -1 != V.responseText.indexOf("ERROR")
                          ? alert(V.responseText.replace("ERROR\n", ""))
                          : kL()
                        : 4 == V.readyState &&
                          200 != V.status &&
                          V.onerror(V.status);
                    }),
                      (V.onerror = (z) => {
                        xD(
                          new Date().toLocaleTimeString() +
                            " - Error joining team",
                          "error",
                        );
                      });
                    var D = window.location.search.replace(
                      "?tourney-join&c=",
                      "",
                    );
                    V.open(
                      "GET",
                      G +
                        "/tourney/useInviteCode?s=" +
                        (opcode || "") +
                        "&c=" +
                        encodeURIComponent(D) +
                        "&n=" +
                        encodeURIComponent(z),
                      true,
                    ),
                      V.send(null);
                  }
                })(),
          v &&
            void 0 !== D &&
            D != opcode &&
            xD(
              "Attention: your account was connected after you joined, your game won't be recorded and you won't earn coins",
              "error",
            ),
          Qc();
      }
    else 4 == z.readyState && 200 != z.status && z.onerror(z.status);
  }),
    (z.onerror = (z) => {
      bP(),
        xD(
          new Date().toLocaleTimeString() + " - Error at login on server",
          "error",
        ),
        console.error("loginOnServer error");
    }),
    z.open(
      "POST",
      G +
        "/login?s=" +
        (opcode || "") +
        (sz ? "&a=1" : "") +
        (!sz && Jz ? "&a=2" : "") +
        "&app=" +
        (document.getElementById("privacy-policy-checkbox").checked ? 1 : 0) +
        "&ecs=" +
        (document.getElementById("emailing-consent-checkbox").checked ? 1 : 0) +
        "&ect=" +
        encodeURIComponent(
          document.getElementById("emailing-consent-text").innerHTML,
        ),
      true,
    ),
    sz ? z.send(oP) : Jz ? z.send(ZP) : z.send(null);
}
function yP() {
  (document.getElementById("login-popup").style.display = "none"),
    (document.getElementById("unconnected-block").style.display = "none"),
    (document.getElementById("connected-block").style.display = "block"),
    (document.getElementById("profile-picture").src = FP),
    (document.getElementById("respawn-not-connected").style.display = "none"),
    (document.getElementById("respawn-not-connected-gm2").style.display =
      "none"),
    (document.getElementById("respawn-not-connected-gm4").style.display =
      "none"),
    RP();
}
function bP() {
  return (
    sz && xP(),
    Jz && FB.logout(SP),
    (document.getElementById("connected-block").style.display = "none"),
    (document.getElementById("unconnected-block").style.display = "block"),
    lL(1),
    DL(0),
    false
  );
}
function XP() {
  (document.getElementById("login-popup").style.display = "block"),
    (void 0 !== window.google &&
      void 0 !== window.google.accounts &&
      void 0 !== window.google.accounts.id) ||
      (document.getElementById("google-login-button").innerHTML =
        '<div class="blocked">Your browser is blocking Google API. Unblock to sign-in with Google.</div>');
}
function HP(z) {
  return (
    "rgb(" +
    [(16711680 & (z >>>= 0)) >>> 16, (65280 & z) >>> 8, 255 & z].join(",") +
    ")"
  );
}
window.onGoogleLibraryLoad = () => {
  try {
    var z = localStorage.getItem("previousGoogleCredential");
    if (z) {
      var V;
      try {
        V = QP(z);
      } catch (z) {}
      V && Date.now() / 1e3 < V.exp - 60
        ? sP(z, V)
        : google.accounts.id.prompt((z) => {
            0;
          });
    } else
      localStorage.getItem("wasLoggedInWithGoogle") &&
        google.accounts.id.prompt((z) => {
          0;
        });
  } catch (z) {}
};
var rP = [],
  MP = {
    skinFacebookLiked: false,
    skinTwitterTweet: false,
    skinTwitterFollow: false,
    skinYoutubeSubscribe: false,
    skinFacebookShare: false,
    skinDiscordJoin: false,
  },
  uP = [],
  EP = 0,
  _P = false,
  iP = 0;
function wP(z, V, l, D, v, c, P, L) {
  z.className += " locked";
  var W = document.createElement("a");
  l && ((W.href = l), (W.target = "_blank")),
    (W.innerHTML = D),
    (W.className = "button " + v),
    z.appendChild(W),
    L ||
      W.addEventListener("click", () => {
        if (
          ((z.className = "card"),
          (z.getElementsByTagName("a")[0].style.display = "none"),
          c)
        ) {
          MP[c] = true;
          try {
            localStorage.setItem(c, true);
          } catch (z) {}
        }
        "undefined" != typeof gtag &&
          gtag("event", P, { event_category: "Click" });
      });
}

var kP = [
    { name: "Holidays", list: [68, 64, 65, 66, 67, 69, 70] },
    { name: "Helicopter", list: [1, 3, 4, 5, 6, 21, 26] },
    { name: "Drone", list: [2, 7, 14, 18, 19, 12, 27] },
    { name: "Gyrocopter", list: [8, 9, 10, 13, 11, 20, 28] },
    { name: "UFO", list: [15, 29, 24, 25, 30, 31, 32] },
    { name: "Space", list: [17, 40, 41, 42, 43, 44, 45] },
    { name: "Jet", list: [33, 34, 35, 36, 37, 38, 39] },
    { name: "Beast", list: [16, 46, 47, 23, 48, 22, 49] },
    { name: "Blades", list: [50, 51, 52, 53, 54, 55, 56] },
    { name: "Mythical", list: [57, 58, 59, 60, 61, 62, 63] },
    { name: "Insects", list: [89, 90, 91, 92, 93, 94, 95] },
    { name: "Astrorace.io", list: [107, 108, 109, 110, 111, 112, 113] },
    { name: "Crystals", list: [122, 123, 124, 125, 126, 127, 128] },
    {
      name: "Premium",
      list: [81, 82, 83, 84, 85, 86, 87, 88, 100, 101, 102, 103, 104, 105, 106],
    },
    { name: "Elite", list: [71, 79, 96, 97, 98, 99, 136, 137, 138, 139] },
    { name: "Creeper", list: [72, 73, 74, 75, 76, 77, 78] },
    { name: "Paper", list: [130, 131, 132, 133, 134, 135] },
    { name: "Star Wars", list: [114, 115, 116, 117, 118, 119, 120, 121] },
    { name: "Other", list: [129] },
  ],
  IP = -1;
function AP(z) {
  for (var V = 0; V < kP.length; V++)
    if (-1 !== kP[V].list.indexOf(z)) return V;
  return -1;
}
function OP(z) {
  return (
    1 == z ||
    (2 == z
      ? MP.skinFacebookLiked
      : 3 == z ||
        (4 == z
          ? MP.skinTwitterFollow
          : 5 == z
            ? MP.skinTwitterTweet
            : 6 == z
              ? MP.skinYoutubeSubscribe
              : 7 == z
                ? sz || Jz
                : 8 == z
                  ? MP.skinDiscordJoin
                  : -1 !== uP.indexOf(z)))
  );
}
function eP(z) {
  for (var V = AP(z), l = 0; l < kP[V].list.length; l++)
    if (kP[V].list[l] != z && !OP(kP[V].list[l])) return false;
  return true;
}
function NP(z) {
  (document.getElementById("skin-tab-" + IP).className = "skin-tab"),
    (document.getElementById("skin-tab-" + z).className = "skin-tab selected"),
    (IP = z),
    VL(true);
}
function zL(z, V, l) {
  var D = document.createElement("div");
  return (
    D.setAttribute("id", "skin-tab-" + z),
    (D.className = "skin-tab" + (l ? " selected" : "")),
    (D.innerHTML = V),
    D.addEventListener("click", () => {
      NP(z);
    }),
    D
  );
}
function VL(z) {
  if (z) {
    document.getElementById("skin-homepage-canvas").innerHTML = "";
    document.getElementById("skin-popup-canvas").innerHTML = "";
    document.getElementById("skin-list").innerHTML = "";
  }

  cl[-1] = kV[Qz >= 0 ? Qz : 0];
  Tz[-1] = $z;

  const V = WD(-1, 50);
  document.getElementById("skin-homepage-canvas").appendChild(V);
  const l = WD(-1, 100);
  document.getElementById("skin-popup-canvas").appendChild(l);
  rP = [V, l];

  const D = document.getElementById("skin-tabs");
  while (D.firstChild) D.removeChild(D.firstChild);
  D.appendChild(zL(-1, "All", IP == -1));
  for (let v = 0; v < kP.length; v++) D.appendChild(zL(v, kP[v].name, IP == v));

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const seasonal = [];
  if (month == 2) seasonal.push(64);
  if ((month == 3 && day >= 15) || (month == 4 && day <= 14)) seasonal.push(65);
  if (month == 4) seasonal.push(66);
  if ((month == 10 && day >= 15) || (month == 11 && day <= 14))
    seasonal.push(67);
  if (month == 12) seasonal.push(68);
  if (month == 1) seasonal.push(69);

  const q = [71, 79, 80, 96, 97, 98, 99, 136, 137, 138, 139];
  const m = [64, 65, 66, 67, 68, 69];
  let h = seasonal.concat([
    1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 107, 13, 14, 18, 108, 81, 19, 11, 12, 89,
    109, 110, 90, 122, 123, 124, 91, 17, 40, 33, 34, 16, 50, 51, 111, 125, 92,
    20, 21, 93, 15, 29, 41, 35, 46, 52, 53, 94, 112, 126, 127, 42, 43, 36, 37,
    24, 25, 47, 54, 44, 38, 23, 30, 31, 55, 57, 58, 59, 60, 61, 62, 95, 113,
    128, 48, 22, 26, 27, 28, 32, 45, 39, 49, 56, 63,
  ]);
  if (IP != -1) h = kP[IP].list;

  for (let v = 0; v < h.length; v++) {
    const U = h[v];
    let t;
    if (DD[U]) {
      cl[-1] = kV[Qz >= 0 ? Qz : 0];
      Tz[-1] = U;
      t = WD(-1, 64);
    } else {
      t = document.createElement("div");
      t.innerHTML = "?";
      t.style.width = "64px";
      t.style.height = "64px";
      t.style.position = "relative";
      t.style.display = "inline-block";
      t.style.lineHeight = "64px";
      t.style.fontSize = "3vh";
    }

    const j = document.createElement("div");
    const highlight = [
      26, 27, 28, 32, 39, 45, 49, 56, 63, 70, 95, 113, 128,
    ].includes(U);
    j.className =
      "card" +
      (highlight ? " highlight" : "") +
      (U >= 64 && U <= 70 ? " season" : "");
    j.style.cursor = "pointer";
    j.appendChild(t);

    const B = uP.indexOf(U) === -1;

    document.getElementById("skin-list").appendChild(j);
    rP.push(t);
    j.addEventListener(
      "click",
      ((z) => () => {
        lL(z);
      })(U),
    );
  }

  if (!z) {
    for (let v = 0; v < kV.length; v++) {
      const Y = document.createElement("div");
      Y.style.backgroundColor = HP(kV[v]);
      Y.style.width = "32px";
      Y.style.height = "32px";
      Y.style.display = "inline-block";
      Y.style.cursor = "pointer";
      Y.style.marginLeft = "2px";
      Y.addEventListener(
        "click",
        (
          (z) => () =>
            DL(z)
        )(v),
      );
      document.getElementById("color-list").appendChild(Y);
    }
  }
}

function lL(z, V) {
  $z = z;
  for (var l = 0; l < 2; l++) {
    Tz[-1] = z;
    var D = rP[l],
      v = WD(-1, D.offsetWidth);
    D.parentNode.replaceChild(v, D), (rP[l] = v);
  }
  if (!V && "undefined" != typeof Storage)
    try {
      localStorage.setItem("playerSkin", $z);
    } catch (z) {
      console.log(z);
    }
  "undefined" != typeof gtag &&
    gtag("event", "ChangeSkinModel", { event_category: "Click", value: z });
}
function DL(z, V) {
  Qz = z;
  for (var l = 0; l < rP.length; l++)
    if (rP[l].skinId) {
      (cl[-1] = kV[Qz >= 0 ? Qz : 0]), (Tz[-1] = rP[l].skinId);
      var D = rP[l],
        v = WD(-1, D.offsetWidth);
      D.parentNode.replaceChild(v, D), (rP[l] = v);
    }
  if (!V && "undefined" != typeof Storage)
    try {
      localStorage.setItem("playerSkinColor", Qz);
    } catch (z) {
      console.log(z);
    }
  "undefined" != typeof gtag &&
    gtag("event", "ChangeSkinColor", { event_category: "Click", value: z });
}
var vL,
  cL,
  PL = 999,
  LL = {};
function WL(z) {
  var V = new FileReader();

  V.onload = () => {
    var l =
      "data:image/png;base64," +
      btoa(String.fromCharCode.apply(null, new Uint8Array(V.result)));

    LL[z.name] = l;
    F[z.name] = PIXI.Texture.fromImage(l);
    localStorage.setItem("skinEditorImages", JSON.stringify(LL));

    mL();
  };

  V.readAsArrayBuffer(z);
}
function gL() {
  if (
    (delete XV[-2],
    (Tz[-2] = PL),
    gD(-2),
    cL.stage.removeChildren(),
    cL.stage.addChild(XV[-2]),
    document.getElementById("show-collision-circle").checked)
  ) {
    var z = new PIXI.Graphics();
    z.lineStyle(1, 16711680),
      z.drawCircle(0, 0, (kz / GV) * QV),
      XV[-2].addChild(z);
  }
  cL.stage.setTransform(
    cL.width / 2 / cL.resolution,
    cL.height / 2 / cL.resolution,
    1 / DD[PL].size,
    1 / DD[PL].size,
    0,
    0,
    0,
    0,
    0,
  ),
    localStorage.setItem("skinEditorSkinModel", JSON.stringify(DD[PL]));
}
function qL(z, V) {
  var l = '<option name=""></option>';
  for (var D in LL)
    l +=
      "<option " +
      (z.img == D ? "selected " : "") +
      'name="' +
      D +
      '">' +
      D +
      "</option>";
  var v = document.createElement("div"),
    c = document.createElement("span");
  c.innerHTML = "Rotor: ";
  var P = document.createElement("select");
  P.innerHTML = l;
  var L = document.createElement("span");
  L.innerHTML = " X: ";
  var W = document.createElement("input");
  W.setAttribute("type", "number"),
    W.setAttribute("step", "0.1"),
    W.setAttribute("value", z.x);
  var g = document.createElement("span");
  g.innerHTML = " Y: ";
  var q = document.createElement("input");
  q.setAttribute("type", "number"),
    q.setAttribute("step", "0.1"),
    q.setAttribute("value", z.y);
  var m = document.createElement("span");
  m.innerHTML = " RPS: ";
  var h = document.createElement("input");
  h.setAttribute("type", "number"),
    h.setAttribute("step", "0.1"),
    h.setAttribute("value", z.speed / Math.PI / 2);
  var U = document.createElement("span");
  U.innerHTML = " Size: ";
  var t = document.createElement("input");
  t.setAttribute("type", "number"),
    t.setAttribute("step", "0.1"),
    t.setAttribute("value", z.size);
  var j = document.createElement("span");
  j.innerHTML = " Layer: ";
  var a = document.createElement("input");
  a.setAttribute("type", "number"), a.setAttribute("value", z.layer);
  var B = document.createElement("span");
  B.innerHTML = " Visibility: ";
  var C = document.createElement("input");
  C.setAttribute("type", "number"),
    C.setAttribute(
      "title",
      "0=always\n1=only when moving\n2=only when standing still",
    ),
    C.setAttribute("value", z.visibility);
  var p = document.createElement("span");
  p.innerHTML = " FixedRot";
  var Y = document.createElement("input");
  Y.setAttribute("type", "checkbox"),
    Y.setAttribute("title", "on = rotation is not cumulative with copter hull"),
    z.fixedRotation && Y.setAttribute("checked", "");
  var o = document.createElement("span");
  o.innerHTML = " NoRot";
  var Z = document.createElement("input");
  Z.setAttribute("type", "checkbox"),
    Z.setAttribute(
      "title",
      "on = the rotor does not rotate and has fixed direction independent from copter direction",
    ),
    z.noRotation && Z.setAttribute("checked", "");
  var F = document.createElement("span");
  F.innerHTML = " Tinted";
  var K = document.createElement("input");
  K.setAttribute("type", "checkbox"),
    K.setAttribute("title", "on = rotor is tinted with player color"),
    z.tinted && K.setAttribute("checked", "");
  var n = document.createElement("button");
  function f() {
    (z.img = P.value),
      (z.x = parseFloat(W.value)),
      (z.y = parseFloat(q.value)),
      (z.speed = parseFloat(h.value) * Math.PI * 2),
      (z.size = parseFloat(t.value)),
      (z.layer = Math.max(0, a.value)),
      (z.visibility = C.value),
      (z.fixedRotation = Y.checked),
      (z.noRotation = Z.checked),
      (z.tinted = K.checked),
      gL();
  }
  return (
    (n.className = "button"),
    (n.innerHTML = "remove"),
    v.appendChild(c),
    v.appendChild(P),
    v.appendChild(L),
    v.appendChild(W),
    v.appendChild(g),
    v.appendChild(q),
    v.appendChild(m),
    v.appendChild(h),
    v.appendChild(U),
    v.appendChild(t),
    v.appendChild(j),
    v.appendChild(a),
    v.appendChild(B),
    v.appendChild(C),
    v.appendChild(p),
    v.appendChild(Y),
    v.appendChild(o),
    v.appendChild(Z),
    v.appendChild(F),
    v.appendChild(K),
    v.appendChild(n),
    P.addEventListener("change", f),
    W.addEventListener("input", f),
    q.addEventListener("input", f),
    h.addEventListener("input", f),
    t.addEventListener("input", f),
    a.addEventListener("input", f),
    C.addEventListener("input", f),
    Y.addEventListener("input", f),
    Z.addEventListener("input", f),
    K.addEventListener("input", f),
    n.addEventListener("click", () => {
      DD[PL].rotors.splice(V, 1), gL(), mL();
    }),
    v
  );
}
function mL() {
  var z = '<option name=""></option>';
  for (var V in LL) z += `<option name="${V}">${V}</option>`;
  document.getElementById("skin-editor-base").innerHTML = z;
  document.getElementById("skin-editor-notint").innerHTML = z;
  document.getElementById("skin-editor-size").value = DD[PL].size;
  for (var l = document.getElementById("skin-editor-rotors"); l.firstChild; ) {
    l.removeChild(l.firstChild);
  }
  for (var V in DD[PL].rotors) {
    var D = qL(DD[PL].rotors[V], V);
    l.appendChild(D);
  }
  var v = document.createElement("button");
  v.innerHTML = "Add rotor";
  v.className = "button";
  l.appendChild(v);
  v.addEventListener("click", () => {
    DD[PL].rotors.push({
      img: "rotor1",
      x: 0,
      y: 0,
      speed: 4 * Math.PI,
      size: 1,
    });
    mL();
  });
  document.getElementById("skin-editor-base").value = DD[PL].base;
  document.getElementById("skin-editor-notint").value = DD[PL].notint;
}
function hL() {
  kz = 64;
  var z = PIXI.autoDetectRenderer(128, 128, {
    antialias: true,
    transparent: false,
    resolution: zz * Ul,
  });
  z.plugins.interaction &&
    (z.plugins.interaction.destroy(), (z.plugins.interaction = null)),
    z.plugins.accessibility &&
      (z.plugins.accessibility.destroy(), (z.plugins.accessibility = null)),
    (z.backgroundColor = 15923199),
    (cL = z);
  var V = new PIXI.Container();
  (z.stage = V),
    V.setTransform(z.width / 2 / zz, z.height / 2 / zz, 1, 1, 0, 0, 0, 0, 0),
    document.getElementById("skin-editor-canvas").appendChild(z.view),
    (DD[PL] = { base: "", notint: "", rotors: [], size: 1 });
  try {
    if (
      (localStorage.getItem("skinEditorSkinModel") &&
        (DD[PL] = JSON.parse(localStorage.getItem("skinEditorSkinModel"))),
      localStorage.getItem("skinEditorImages"))
    )
      for (var l in (LL = JSON.parse(localStorage.getItem("skinEditorImages"))))
        F[l] = PIXI.Texture.fromImage(LL[l]);
  } catch (err) {}
  mL(),
    (Tz[-2] = PL),
    (cl[-2] = kV[Qz >= 0 ? Qz : 0]),
    setTimeout(gL, 0),
    (cL.stance = 1),
    (vL = setInterval(() => {
      for (var l = XV[-2], D = 0; D < l.rotors.length; D++) {
        var v = l.rotors[D];
        v.noRotation
          ? (v.sprite.rotation = -l.rotation)
          : 0 != v.speed &&
            ((v.sprite.baseRotation -= (v.speed * (1e3 / 60)) / 1e3),
            v.fixedRotation
              ? (v.sprite.rotation = v.sprite.baseRotation)
              : (v.sprite.rotation = v.sprite.baseRotation - l.rotation));
        var c = 0 != cL.stance;
        1 == v.visibility
          ? (v.sprite.visible = c)
          : 2 == v.visibility && (v.sprite.visible = !c);
      }
      z.render(V);
    }, 1e3 / 60));
  defly.closeSkinEditor = UL;
  defly.saveSkin = tL;
  defly.clearSkin = () => {
    localStorage.removeItem("skinEditorImages"),
      localStorage.removeItem("skinEditorSkinModel"),
      (DD[PL] = { base: "", notint: "", rotors: [], size: 1 }),
      (LL = {}),
      gL(),
      mL();
  };
  document.getElementById("skin-upload-input").addEventListener("change", jL),
    document
      .getElementById("skin-editor-input")
      .addEventListener("change", () => {
        !((z) => {
          for (var V = 0; V < z.files.length; V++) WL(z.files[V]);
        })(document.getElementById("skin-editor-input"));
      });
  document.getElementById("skin-editor-size").addEventListener("input", () => {
    (DD[PL].size = parseFloat(
      document.getElementById("skin-editor-size").value,
    )),
      gL();
  });
  document.getElementById("skin-editor-base").addEventListener("change", () => {
    (DD[PL].base = document.getElementById("skin-editor-base").value), gL();
  });
  document
    .getElementById("skin-editor-notint")
    .addEventListener("change", () => {
      (DD[PL].notint = document.getElementById("skin-editor-notint").value),
        gL();
    });
  document
    .getElementById("show-collision-circle")
    .addEventListener("change", gL);
  document.getElementById("stance-idle").addEventListener("click", () => {
    (cL.stance = 0),
      document.getElementById("stance-idle").classList.remove("back"),
      document.getElementById("stance-moving").classList.add("back");
  });
  document.getElementById("stance-moving").addEventListener("click", () => {
    (cL.stance = 1),
      document.getElementById("stance-idle").classList.add("back"),
      document.getElementById("stance-moving").classList.remove("back");
  });
  var D = "";
  for (var l in F) {
    D += `<option name="${l}">${l}</option>`;
  }

  document.getElementById("skin-editor-game-sprites").innerHTML = D;

  document
    .getElementById("skin-editor-input2")
    .addEventListener("change", () => {
      var z = document.getElementById("skin-editor-input2").files[0];
      var V = new FileReader();

      V.onload = () => {
        var z =
          "data:image/png;base64," +
          btoa(String.fromCharCode.apply(null, new Uint8Array(V.result)));
        var l = document.createElement("img");
        l.src = z;

        F[document.getElementById("skin-editor-game-sprites").value] =
          PIXI.Texture.fromImage(l.src);

        document.getElementById("skin-editor-input2").value = "";
      };

      V.readAsArrayBuffer(z);
    });

  document.getElementById("skin-editor").style.display = "block";
}
function UL() {
  clearInterval(vL),
    (document.getElementById("skin-editor").style.display = "none"),
    lL(PL, true);
}
function tL() {
  var z = {};
  for (var V in ((z[DD[PL].base] = LL[DD[PL].base]),
  (z[DD[PL].notint] = LL[DD[PL].notint]),
  DD[PL].rotors))
    z[DD[PL].rotors[V].img] = LL[DD[PL].rotors[V].img];
  var l = new Blob([JSON.stringify({ spec: DD[PL], images: z })], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(l, new Date().toISOString() + " defly.io skin.txt");
}
function jL() {
  var z = document.getElementById("skin-upload-input").files[0],
    V = new FileReader();
  (V.onload = () => {
    var z = JSON.parse(V.result);
    for (var l in (console.log(z), (DD[PL] = z.spec), z.images)) {
      var D = document.createElement("img");
      (D.src = z.images[l]),
        (LL[l] = z.images[l]),
        (F[l] = PIXI.Texture.fromImage(D.src));
    }
    localStorage.setItem("skinEditorImages", JSON.stringify(LL)),
      gL(),
      mL(),
      (document.getElementById("skin-upload-input").value = "");
  }),
    V.readAsText(z);
}
function aL(z) {
  var V = z,
    D = new XMLHttpRequest();
  (D.onreadystatechange = () => {
    4 == D.readyState && D.status;
  }),
    (D.onerror = (z) => {
      dl("Error updating badge"), console.log(z);
    }),
    D.open("POST", `${G}/account/updateBadge?s=${opcode}&b=${V}`, true),
    D.send(null);
}
function BL() {
  if (sz || Jz) {
    var z = new XMLHttpRequest();
    (z.onreadystatechange = () => {
      if (4 == z.readyState && 200 == z.status) {
        var V = z.responseText.split("\n");
        (_P = parseInt(V[0]) > 0),
          (EP = V[1]),
          (document.getElementById("ma-coins").innerHTML = Math.floor(EP)),
          (document.getElementById("account-premium").style.display = _P
            ? "block"
            : "none"),
          (document.getElementById("account-standard").style.display = _P
            ? "none"
            : "block"),
          (document.getElementById("reserved-nickname").value = V[2]),
          (document.getElementById("ma-player-name").innerHTML =
            document.getElementById("username").value);
        var l = parseInt(V[3]);
        V.length >= 5 &&
          ((document.getElementById("discord-id").value = V[4]),
          V.length >= 6 &&
            V[5].length > 0 &&
            (document.getElementById("discord-id").value = "@" + V[5]));
        for (
          var D = `<span class="empty${0 == l ? " selected" : ""}">NONE</span>`,
            v = 1;
          v <= 47;
          v++
        )
          D +=
            "<img " +
            (v == l ? 'class="selected" ' : "") +
            'src="img/badges/' +
            v +
            '.png">';
        if (
          ((document.getElementById("badge-select").innerHTML = D),
          document
            .getElementById("badge-select")
            .addEventListener("click", (z) => {
              if ((console.log(z), "IMG" == z.target.tagName)) {
                var V = z.target.src.split("/");
                aL(parseInt(V[V.length - 1]));
              } else aL(0);
              document
                .getElementById("badge-select")
                .childNodes.forEach((z) => {
                  z.classList.remove("selected");
                }),
                z.target.classList.add("selected");
            }),
          document.getElementById("my-account-button") &&
            ((document.getElementById("my-account-button").enabled = true),
            (document.getElementById("my-account-button").innerHTML =
              ml("My Account"))),
          (document.getElementById("my-account").style.display = "block"),
          !_P)
        ) {
          var c = document.getElementById("change-discord-id-block");
          c.parentElement.removeChild(c),
            document.getElementById("change-discord-id-np").appendChild(c);
        }
      } else 4 == z.readyState && 200 != z.status && z.onerror(z.status);
    }),
      (z.onerror = (z) => {
        xD(
          new Date().toLocaleTimeString() + " - Error getting account info",
          "error",
        ),
          console.log(z);
      }),
      z.open("POST", `${G}/account/myInfo?s=${opcode}`, true),
      z.send(null),
      document.getElementById("my-account-button") &&
        ((document.getElementById("my-account-button").enabled = false),
        (document.getElementById("my-account-button").innerHTML =
          ml("Loading...")));
  } else XP();
}
function CL(z, V, l, D) {
  switch (z) {
    case 0:
    case 3:
    case 2:
      return Math.floor(V / 100);
    case 1:
      return Math.floor(V / 200);
    case 4:
      return 10 * D;
  }
}
var pL = ["FFA", "Team", "Defuse", "E-FFA", "1v1"];
var YL = {
  3: "Break",
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Ctrl",
  18: "Alt",
  19: "Pause",
  20: "Caps Lock",
  21: "Hangul",
  22: "Hanja",
  27: "Escape",
  28: "Conversion",
  29: "Non-conversion",
  32: "Space",
  33: "PgUp",
  34: "PgDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  41: "Select",
  42: "Print",
  43: "Execute",
  44: "PrtnScreen",
  45: "Insert",
  46: "Delete",
  47: "Help",
  48: "Digit0",
  49: "Digit1",
  50: "Digit2",
  51: "Digit3",
  52: "Digit4",
  53: "Digit5",
  54: "Digit6",
  55: "Digit7",
  56: "Digit8",
  57: "Digit9",
  58: ":",
  59: "=",
  60: "<",
  61: "=",
  63: "ÃŸ",
  64: "@",
  65: "a",
  66: "b",
  67: "c",
  68: "d",
  69: "e",
  70: "f",
  71: "g",
  72: "h",
  73: "i",
  74: "j",
  75: "k",
  76: "l",
  77: "m",
  78: "n",
  79: "o",
  80: "p",
  81: "q",
  82: "r",
  83: "s",
  84: "t",
  85: "u",
  86: "v",
  87: "w",
  88: "x",
  89: "y",
  90: "z",
  91: "MetaLeft",
  92: "MetaRight",
  93: "ContextMenu",
  95: "Sleep",
  96: "Numpad0",
  97: "Numpad1",
  98: "Numpad2",
  99: "Numpad3",
  100: "Numpad4",
  101: "Numpad5",
  102: "Numpad6",
  103: "Numpad7",
  104: "Numpad8",
  105: "Numpad9",
  106: "NumpadMultiply",
  107: "NumpadAdd",
  108: "Underscore",
  109: "NumpadSubtract",
  111: "NumpadDivide",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  160: "^",
  161: "!",
  162: "Ø›",
  163: "#",
  164: "$",
  165: "Ã¹",
  166: "Page Backward",
  167: "Page Forward",
  168: "Refresh",
  173: "Mute",
  174: "Volume-",
  175: "Volume+",
  176: "Next",
  177: "Previous",
  178: "Stop",
  179: "Play/pause",
  180: "E-mail",
  181: "Mute",
  182: "Volume-",
  183: "Volume+",
  186: "BracketRight",
  187: "Equal",
  188: "Comma",
  189: "Minus",
  190: "Period",
  191: "Slash",
  192: "BackQuote",
  193: "?",
  194: "Numpad.",
  219: "BracketLeft",
  220: "Backslash",
  221: "BracketRight",
  222: "Quote",
  223: "`",
  224: "Cmd",
  225: "AltGr",
  226: "IntlBackslash",
};
function oL(z) {
  return z.code
    ? z.code.replace(/^Key/, "")
    : z.keyCode
      ? YL[z.keyCode]
        ? YL[z.keyCode]
        : z.keyCode
      : void 0 !== z.button
        ? 0 == z.button
          ? "Left Click"
          : 1 == z.button
            ? "Middle Click"
            : 2 == z.button
              ? "Right Click"
              : "Mouse button " + z.button
        : "&nbsp;";
}
var ZL,
  FL,
  KL,
  nL = 0;
function fL(z, V, l) {
  new Date().getTime() - nL < 500 ||
    ((z.innerHTML = "Press a key / click"),
    (z.className = "waiting"),
    window.addEventListener("keydown", TL, true),
    window.addEventListener("mousedown", $L, true),
    (ZL = z),
    (FL = V),
    (KL = l),
    (customKeyboardCommands[V][l] = {}));
}
function TL(z) {
  "KeyB" == z.code || "KeyI" == z.code || "KeyL" == z.code || "Enter" == z.code
    ? (dl("This key is reserved"), QL({ keyCode: 27 }))
    : QL({ code: z.code, keyCode: z.keyCode }),
    z.preventDefault(),
    z.stopPropagation(),
    (z.returnValue = false);
}
function $L(z) {
  QL({ button: z.button }),
    z.preventDefault(),
    z.stopPropagation(),
    (z.returnValue = false);
}
function QL(z) {
  window.removeEventListener("keydown", TL, true),
    window.removeEventListener("mousedown", $L, true),
    (ZL.className = ""),
    (nL = new Date().getTime()),
    void 0 !== z.keyCode && 27 == z.keyCode
      ? (ZL.innerHTML = "&nbsp;")
      : ((customKeyboardCommands[FL][KL] = z), (ZL.innerHTML = oL(z))),
    localStorage.setItem("keyBindings", JSON.stringify(customKeyboardCommands)),
    e > 0 && xL();
}
var dL = {},
  sL = {},
  JL = {};
function xL() {
  for (var z in ((dL = {}), (sL = {}), (JL = {}), customKeyboardCommands))
    for (var V = 0; V < customKeyboardCommands[z].length; V++) {
      var l = customKeyboardCommands[z][V];
      l &&
        (void 0 !== l.code && (dL[l.code] = z),
        void 0 !== l.keyCode && (sL[l.keyCode] = z),
        void 0 !== l.button && (JL[l.button] = z));
    }
}
var SL = false,
  RL = 1,
  yL = [],
  bL = [];
function XL(z, V, l) {
  yL[z] ||
    ((yL[z] = new PIXI.Sprite(F["capture-blue-" + (0 == z ? "A" : "B")])),
    (yL[z].width = 12),
    (yL[z].height = 12),
    yL[z].anchor.set(0.5),
    a.addChild(yL[z])),
    yL[z].position.set(V, l);
}
function HL(z, V, l, D) {
  function v(z, V, l) {
    z.removeChildren();
    for (var D = 0; D < 16; D++) {
      var v = new PIXI.Text(D + 1, {
        fontSize: 24,
        fill: V,
        align: "center",
      });
      v.scale.set(1 / 24, 1 / 24),
        v.anchor.set(0.5, 0.5),
        (v.position.x = l >= 2 ? (D % 4) * 3 : (Math.floor(D / 4) % 4) * 3),
        (v.position.y = l >= 2 ? (Math.floor(D / 4) % 4) * 3 : (D % 4) * 3),
        1 == l && (v.position.x = 9 - v.position.x),
        3 == l && (v.position.y = 9 - v.position.y),
        z.addChild(v);
    }
    var c = new PIXI.Sprite(F.marker);
    c.anchor.set(0.5, 0.5),
      c.position.set(4.5, 4.5),
      (c.rotation =
        0 == l ? Math.PI : 1 == l ? 0 : 2 == l ? -Math.PI / 2 : Math.PI / 2),
      c.scale.set(0.25 / 24, 0.25 / 24),
      (c.tint = V),
      z.addChild(c);
  }
  bL[z]
    ? bL[z].position.x == V &&
      bL[z].position.y == l &&
      ((bL[z].spawnDirection = (bL[z].spawnDirection + 1) % 4),
      v(bL[z], OV[z], bL[z].spawnDirection))
    : ((bL[z] = new PIXI.Graphics()),
      bL[z].beginFill(OV[z], 0.5),
      bL[z].drawRect(0, 0, 9, 9),
      a.addChild(bL[z]),
      (bL[z].spawnDirection = void 0 === D ? 0 : D),
      v(bL[z], OV[z], bL[z].spawnDirection)),
    bL[z].position.set(V, l);
}
function rL(z, V, l) {
  var D = z.dst2(V);
  if (0 == D) return z;
  var v = ((l.x - z.x) * (V.x - z.x) + (l.y - z.y) * (V.y - z.y)) / D;
  return v < 0
    ? z
    : v > 1
      ? V
      : new PIXI.Point(z.x + v * (V.x - z.x), z.y + v * (V.y - z.y));
}
function ML(z, V) {
  return z.dot1 == V
    ? z.rotation
    : z.rotation > 0
      ? z.rotation - Math.PI
      : z.rotation + Math.PI;
}
function uL(z) {
  var V = [];
  for (var l in yV) (yV[l].dot1 != z && yV[l].dot2 != z) || V.push(yV[l]);
  return (
    V.sort((V, l) => {
      var D = ec(ML(V, z));
      return ec(ML(l, z)) - D;
    }),
    V
  );
}
function EL(z, V) {
  for (var l = uL(z), D = 0; D < l.length; D++)
    if (l[D].dot1 == V || l[D].dot2 == V) return true;
  return false;
}
function _L(z, V, l) {
  void 0 === l && (l = []);
  for (var D = [], v = 0; v < z.length; v++) {
    var c = z[v],
      P = z[(v + 1) % z.length];
    if (void 0 !== V) var L = V[v];
    else
      for (var W in yV)
        if (
          (yV[W].dot1 == c && yV[W].dot2 == P) ||
          (yV[W].dot1 == P && yV[W].dot2 == c)
        ) {
          L = yV[W];
          break;
        }
    (D[v] = ML(L, c)), (l[v] = L.dot1 == c);
  }
  var g = 0,
    q = 0;
  for (v = 0; v < D.length; v++)
    (g += ec(ec(D[v]) - ec(D[(v + 1) % D.length] + Math.PI))),
      (q += ec(ec(D[(v + 1) % D.length]) - ec(D[v] + Math.PI)));
  return g > q;
}
function iL(z) {
  for (var V = [], l = null, D = 0; D < z.length; D++) {
    var v = z[D];
    if (l)
      for (var c in yV)
        if (
          (yV[c].dot1 == v && yV[c].dot2 == l) ||
          (yV[c].dot2 == v && yV[c].dot1 == l)
        ) {
          V.push(yV[c]);
          break;
        }
    l = v;
  }
  for (var c in yV)
    if (
      (yV[c].dot1 == z[0] && yV[c].dot2 == l) ||
      (yV[c].dot2 == z[0] && yV[c].dot1 == l)
    ) {
      V.push(yV[c]);
      break;
    }
  var P = [],
    L = _L(z, V, P),
    W = new DataView(new ArrayBuffer(15 + 5 * z.length));
  W.setInt32(1, RL++),
    W.setInt32(5, z[0].owner),
    W.setFloat32(9, 0),
    W.setInt16(13, z.length);
  for (D = 0; D < V.length; D++) {
    var g = V[D];
    W.setInt32(15 + 5 * D, g.lineId),
      W.setUint8(15 + 5 * D + 4, (L && P[D]) || (!L && !P[D]) ? 0 : 1);
  }
  hv(W, false);
}
function wL() {
  var z, V;
  (SL = true),
    xL(),
    AV.splice(0, 0, 5066061),
    colorNamesNew.splice(0, 0, "Walls"),
    (Oz = 210),
    (ez = 120),
    (kz = 1),
    (Iz = 0.6),
    (Az = 0.3),
    (QV = 0.6763066483560869),
    (dV = 0.6),
    (fV = 7),
    (TV = 96),
    ($V = 48),
    2 * (kz *= GV),
    (VV = 1e3),
    (Nz = 70),
    (zV = 40),
    (MV = 1),
    (F["tower-kh"] = PIXI.Texture.fromImage("img/tower-kh.png")),
    (K = { shooting: false, moving: false, aimDirection: 0, moveDirection: 0 }),
    (z = document.createElement("div")).setAttribute(
      "id",
      "defuse-editor-help",
    ),
    (z.innerHTML =
      '<div style="text-align:center"><div id="defuse-help-hide" class="button" onclick="$(\'#defuse-help-content\').toggle();$(\'#defuse-help-hide\').toggle();$(\'#defuse-help-show\').toggle();">Hide menu</div><div style="display:none" id="defuse-help-show" class="button" onclick="$(\'#defuse-help-content\').toggle();$(\'#defuse-help-hide\').toggle();$(\'#defuse-help-show\').toggle();">Show menu</div></div><div id="defuse-help-content"><div onclick="defly.editor.downloadMap();" class="button">Download the map file</div><div onclick="defly.editor.loadMap();" class="button">Load a map file</div><div onclick="defly.editor.mapDim();" class="button">Change map dimensions</div><div onclick="defly.editor.mapShape();" class="button">Switch map shape</div><div onclick="defly.editor.kothBounds();" class="button">Edit KOTH Bounds</div><div style="margin-top:16px;">Key bindings:</div><ul><li> WASD: move</li><li>Right-Click/space: build a tower</li><li>Left-Click: remove tower/cancel wall</li><li>+/- and mouse wheel: zoom</li><li>=: Reset zoom</li><li>F: color grey enclosed area (grey areas appear on the minimap)</li><li>G: snap cursor to grid</li><li>X: view/hide helicopter</li><li>Y: (DEFUSE) place bomb spot A</li><li>U: (DEFUSE) place bomb spot B</li><li>R: (DEFUSE) place blue spawn area / rotate blue spawn</li><li>T: (DEFUSE) place red spawn area / rotate red spawn</li><li>N: Change Team Color</li><li>B: Load background image trace</li></ul></div>'),
    document.body.appendChild(z),
    (z = document.createElement("div")).setAttribute(
      "id",
      "defuse-editor-position",
    ),
    document.body.appendChild(z),
    MainLoop.start(),
    (document.getElementById("homepage").style.display = "none"),
    (h.view.style.display = "block"),
    (hz = 2),
    (uV[(HV = 1)] = 1),
    gD(HV),
    (XV[HV].visible = false),
    XV[HV].position.set(Oz / 2, ez / 2),
    (iz = new PIXI.Sprite(F["wall-line"])).anchor.set(0.5),
    (iz.height = dV),
    (iz.alpha = 0.2),
    (iz.tint = Pl(HV)),
    (iz.visible = false),
    B.addChild(iz),
    (wz = new PIXI.Sprite(F.dot1)).anchor.set(0.5),
    (wz.width = 2 * Iz),
    (wz.height = 2 * Iz),
    (wz.alpha = 0.2),
    (wz.tint = Pl(HV)),
    a.addChild(wz),
    (Bz = [128, 8, 8, 8, 2048, 8, 8]),
    kc(),
    window.addEventListener(
      "wheel",
      (z) => {
        z.deltaY < 0 &&
          ((Nz /= 1.1),
          (zV /= 1.1),
          (fV /= 1.1),
          (TV /= 1.1),
          ($V /= 1.1),
          kc()),
          z.deltaY > 0 &&
            ((Nz *= 1.1),
            (zV *= 1.1),
            (fV *= 1.1),
            (TV *= 1.1),
            ($V *= 1.1),
            kc());
      },
      true,
    );
  var l = new PIXI.Container();
  U.addChildAt(l, 0),
    window.addEventListener(
      "keydown",
      (z) => {
        if ("+" == z.key)
          (Nz /= 1.1), (zV /= 1.1), (fV /= 1.1), (TV /= 1.1), ($V /= 1.1), kc();
        else if ("-" == z.key)
          (Nz *= 1.1), (zV *= 1.1), (fV *= 1.1), (TV *= 1.1), ($V *= 1.1), kc();
        else if ("=" == z.key)
          (Nz = 70), (zV = 40), (fV = 7), (TV = 96), ($V = 48), kc();
        else if ("g" == z.key) tz = !tz;
        else if ("x" == z.key) XV[HV].visible = !XV[HV].visible;
        else if ("n" == z.key) {
          var D = window.prompt("Team ID? 1=grey, 2 = blue, etc up to 13", MV);
          D && ((MV = D), (iz.tint = Ll(MV)), (wz.tint = Ll(MV)), (Nc = null));
        } else if ("b" == z.key)
          (o = document.createElement("input")).setAttribute("type", "file"),
            o.setAttribute("accept", "image/*"),
            o.addEventListener("change", () => {
              var z = new FileReader();
              (z.onload = () => {
                var D = z.result,
                  v = new Image();
                (v.onload = () => {
                  var z = new PIXI.Texture(new PIXI.BaseTexture(v));
                  (V = new PIXI.Sprite(z)).anchor.set(0.5, 0.5),
                    (V.width = Oz),
                    (V.height = (Oz / z.width) * z.height),
                    V.height > ez &&
                      ((V.height = ez), (V.width = (ez / z.height) * z.width)),
                    (V.x = Oz / 2),
                    (V.y = ez / 2),
                    l.removeChildren(),
                    l.addChild(V);
                }),
                  (v.src = D);
              }),
                z.readAsDataURL(o.files[0]);
            }),
            setTimeout(() => {
              o.click();
            }, 200);
        else if ("y" == z.key) {
          XL(0, Nv((v = cc()).x), Nv(v.y));
        } else if ("u" == z.key) {
          XL(1, Nv((v = cc()).x), Nv(v.y));
        } else if ("r" == z.key) {
          HL(1, Nv((v = cc()).x) - 4.5, Nv(v.y) - 4.5);
        } else if ("t" == z.key) {
          HL(2, Nv((v = cc()).x) - 4.5, Nv(v.y) - 4.5);
        } else if ("f" == z.key) {
          var v = cc(),
            c = null,
            P = Number.MAX_VALUE;
          for (var L in yV) {
            var W = rL((m = yV[L]).dot1.position, m.dot2.position, v).dst2(v);
            W < P && ((P = W), (c = m));
          }
          if (c) {
            var g,
              q = vP(v, c.dot1.position, c.dot2.position) >= 0;
            if (q && c.leftZoneId > 0)
              return (
                (g = new DataView(new ArrayBuffer(5))).setInt32(
                  1,
                  c.leftZoneId,
                ),
                void _v(g)
              );
            if (!q && c.rightZoneId > 0)
              return (
                (g = new DataView(new ArrayBuffer(5))).setInt32(
                  1,
                  c.rightZoneId,
                ),
                void _v(g)
              );
            for (
              var m,
                h = [(m = c).dot1],
                U = m,
                t = m.dot1,
                j = m.dot2,
                a = false;
              j != t;

            )
              if (j != t) {
                var B = h.indexOf(j);
                if (-1 != B) for (; h.length > B; ) h.splice(B, 1);
                var C = uL(j),
                  p = C.indexOf(U);
                if (-1 === p)
                  return void console.error("currentLine not found");
                if (q) var Y = C[(p - 1 + C.length) % C.length];
                else Y = C[(p + 1) % C.length];
                if (
                  (h.push(j), (U = Y), (j = Y.dot1 == j ? Y.dot2 : Y.dot1) == t)
                )
                  if (q == _L(h)) {
                    a = true;
                    break;
                  }
              }
            j == t && h.length > 2 && a && iL(h);
          }
        }
        var o;
      },
      true,
    ),
    (window.defly.editor = {
      downloadMap: () => {
        var z = "MAP_WIDTH " + Oz + "\nMAP_HEIGHT " + ez + "\n";
        tV &&
          (z +=
            "KOTH " + jV.x1 + " " + jV.y1 + " " + jV.x2 + " " + jV.y2 + "\n");
        for (var V = 0; V < yL.length; V++)
          yL[V] && (z += "t " + V + " " + yL[V].x + " " + yL[V].y + "\n");
        for (V = 0; V < bL.length; V++)
          bL[V] &&
            (z +=
              "s " +
              V +
              " " +
              bL[V].x +
              " " +
              bL[V].y +
              " " +
              bL[V].spawnDirection +
              "\n");
        for (var l in RV)
          z +=
            "d " +
            l +
            " " +
            RV[l].x +
            " " +
            RV[l].y +
            (1 == RV[l].owner ? "" : " " + RV[l].owner) +
            "\n";
        for (var l in yV)
          z += "l " + yV[l].dot1.dotId + " " + yV[l].dot2.dotId + "\n";
        for (var l in bV) {
          z += "z";
          var D = bV[l].linePath,
            v = D[D.length - 1];
          for (V = 0; V < D.length; V++) {
            var c = D[V];
            (z +=
              " " +
              (c.dot1 == v.dot1 || c.dot1 == v.dot2 ? c.dot1 : c.dot2).dotId),
              (v = c);
          }
          z += "\n";
        }
        var P = new Blob([z], { type: "text/plain;charset=utf-8" });
        saveAs(P, new Date().toISOString() + " defly.io defuse map.txt");
      },
      loadMap: () => {
        var z = document.createElement("input");
        z.setAttribute("type", "file");
        z.setAttribute("accept", ".txt");
        z.addEventListener("change", () => {
          var V = new FileReader();
          (V.onload = () => {
            var l = V.result.split(/\r?\n/);
            a.removeChildren(),
              B.removeChildren(),
              C.removeChildren(),
              B.addChild(iz),
              a.addChild(wz),
              (RV = {}),
              (yV = {}),
              (bV = {}),
              (Nc = null),
              (wz.visible = true),
              (iz.visible = false),
              (yL = []),
              (bL = []),
              (RL = 1);
            for (var D = 0; D < l.length; D++) {
              var v = l[D].split(" ");
              switch (v[0]) {
                case "MAP_WIDTH":
                  Oz = parseFloat(v[1]);
                  break;
                case "MAP_HEIGHT":
                  (ez = parseFloat(v[1])),
                    1 == iV
                      ? ez > (Math.sqrt(3) * Oz) / 2
                        ? (Oz = (ez / Math.sqrt(3)) * 2)
                        : Oz > (ez / Math.sqrt(3)) * 2 &&
                          (ez = (Math.sqrt(3) * Oz) / 2)
                      : 2 == iV && (Oz >= ez ? (ez = Oz) : (Oz = ez)),
                    jD();
                  break;
                case "KOTH":
                  (jV = {
                    x1: parseFloat(v[1]),
                    y1: parseFloat(v[2]),
                    x2: parseFloat(v[3]),
                    y2: parseFloat(v[4]),
                  }),
                    (tV = true);
                  break;
                case "t":
                  XL(
                    parseInt(v[1]),
                    parseFloat(v[2]),
                    parseFloat(v[3]),
                    v.length >= 5 && parseInt(v[4]),
                  );
                  break;
                case "s":
                  HL(
                    parseInt(v[1]),
                    parseFloat(v[2]),
                    parseFloat(v[3]),
                    v.length >= 5 ? parseInt(v[4]) : 0,
                  );
                  break;
                case "d":
                  (c = new DataView(new ArrayBuffer(27))).setInt32(
                    1,
                    parseInt(v[1]),
                  ),
                    c.setInt32(5, v.length >= 5 ? parseInt(v[4]) : 1),
                    c.setFloat32(9, parseFloat(v[2])),
                    c.setFloat32(13, parseFloat(v[3])),
                    c.setUint8(17, 1),
                    c.setUint8(18, 1),
                    c.setFloat32(19, 0),
                    c.setInt32(23, 0),
                    Pv(c),
                    (RL = Math.max(RL, parseInt(v[1]) + 1));
                  break;
                case "l": {
                  var c,
                    P = RV[parseInt(v[1])],
                    L = RV[parseInt(v[2])];
                  EL(P, L) ||
                    ((c = new DataView(new ArrayBuffer(25))).setInt32(1, RL++),
                    c.setInt32(5, P.owner),
                    c.setInt32(9, P.dotId),
                    c.setInt32(13, L.dotId),
                    c.setInt32(17, 0),
                    c.setInt32(21, 0),
                    gv(c));
                  break;
                }
                case "z":
                  for (var W = [], g = 1; g < v.length; g++) {
                    var q = RV[parseInt(v[g])];
                    W.push(q);
                  }
                  iL(W);
              }
            }
            XV[HV].position.set(Oz / 2, ez / 2),
              kc(),
              xD("File loaded: " + z.files[0].name);
          }),
            V.readAsText(z.files[0]);
        }),
          setTimeout(() => {
            z.click();
          }, 200);
      },
      mapDim: () => {
        var z = parseInt(prompt("Map Width?", Oz));
        if (z) {
          var V = parseInt(prompt("Map Height?", ez));
          V &&
            ((Oz = z),
            (ez = V),
            XV[HV].x > Oz && (XV[HV].x = Oz),
            XV[HV].y > ez && (XV[HV].y = ez),
            kc());
        }
      },
      mapShape: () => {
        1 == (iV = (iV + 1) % 3)
          ? (ez = (Math.sqrt(3) * Oz) / 2)
          : 2 == iV && (ez = Oz),
          jD(),
          kc();
      },
      kothBounds: () => {
        var z = prompt(
          "Upper-left X coordinate? (empty to remove KOTH bounds)",
          jV ? jV.x1 : "",
        );
        if (z) {
          var V = prompt("Upper-left Y coordinate?", jV ? jV.y1 : ""),
            l = prompt("Lower-right X coordinate?", jV ? jV.x2 : ""),
            D = prompt("Lower-right Y coordinate?", jV ? jV.y2 : "");
          (jV = {
            x1: parseFloat(z),
            y1: parseFloat(V),
            x2: parseFloat(l),
            y2: parseFloat(D),
          }),
            (tV = true);
        } else (jV = null), (tV = false);
        for (var v in RV) {
          var c = RV[v],
            P = 15642415 == c.tint;
          if (
            (tV && c.x >= jV.x1 && c.x <= jV.x2 && c.y >= jV.y1 && c.y <= jV.y2
              ? ((c.texture = F["tower-kh"]), (c.tint = 15642415))
              : ((c.texture = F.dot1), (c.tint = Ll(c.owner))),
            P ^ (15642415 == c.tint))
          )
            for (var L = 0; L < c.lines.length; L++) c.lines[L].tint = c.tint;
        }
      },
    });
}
function GL() {
  try {
    if (
      (v && (document.getElementById("server-block").style.display = "block"),
      (document.getElementById("preferred-server-block").style.display =
        "none"),
      (z = null),
      window.location.hash.length > 0)
    ) {
      var V = window.location.hash.replace(/^#/, "").split("-");
      V.length >= 2 &&
        ((hz = parseInt(V.shift())),
        il(),
        (z = V.join("-")),
        (document.getElementById("server-block").style.display = "none"),
        (document.getElementById("preferred-server-block").style.display =
          "block"),
        (document.getElementById("preferred-server").innerHTML = z));
    }
  } catch (z) {
    console.error(z);
  }
}
function kL() {
  (document.getElementById("homepage-loading").style.display = "block"),
    (document.getElementById("homepage-loaded").style.display = "none");
  var z = new XMLHttpRequest();
  (z.onreadystatechange = () => {
    if (4 == z.readyState && 200 == z.status) {
      var V = z.responseText.split("\n"),
        D = document.createElement("div");
      (D.className = "tourney-mgr"),
        ((v = document.createElement("div")).className = "title"),
        (v.innerHTML = "My Team"),
        D.appendChild(v);
      for (var v, c = false, P = 0; P < V.length - 1; P += 3)
        V[P] == iP && 1 == V[P + 2] && (c = true);
      for (P = 0; P < V.length - 1; P += 3) {
        var L = document.createElement("div");
        if (
          ((L.className = "member"),
          (L.innerHTML = (1 == V[P + 2] ? "CAPTAIN - " : "") + V[P + 1]),
          c && 1 != V[P + 2])
        ) {
          var W = document.createElement("span");
          (W.className = "button remove"),
            (W.innerHTML = "Remove"),
            L.appendChild(W),
            W.addEventListener(
              "click",
              ((z) => () => {
                if (
                  window.confirm("Really remove this player from the team?")
                ) {
                  var V = new XMLHttpRequest();
                  (V.onreadystatechange = () => {
                    4 == V.readyState && 200 == V.status
                      ? kL()
                      : 4 == V.readyState &&
                        200 != V.status &&
                        V.onerror(V.status);
                  }),
                    (V.onerror = (z) => {
                      xD(
                        new Date().toLocaleTimeString() +
                          " - Error removing member",
                        "error",
                      );
                    }),
                    V.open(
                      "GET",
                      G + "/tourney/remove?s=" + (opcode || "") + "&u=" + z,
                      true,
                    ),
                    V.send(null);
                }
              })(V[P]),
            );
        }
        D.appendChild(L);
      }
      if (c)
        ((v = document.createElement("div")).className = "bottom button"),
          (v.innerHTML = "Generate invite link"),
          D.appendChild(v),
          v.addEventListener("click", () => {
            var z = new XMLHttpRequest();
            (z.onreadystatechange = () => {
              if (4 == z.readyState && 200 == z.status) {
                D.removeChild(v);
                var V = document.createElement("div");
                (V.className = "bottom link"),
                  (V.innerHTML =
                    "http://" +
                    document.location.host +
                    "?tourney-join&c=" +
                    z.responseText),
                  D.appendChild(V);
              } else
                4 == z.readyState && 200 != z.status && z.onerror(z.status);
            }),
              (z.onerror = (z) => {
                xD(
                  new Date().toLocaleTimeString() +
                    " - Error changing invite code",
                  "error",
                );
              }),
              z.open(
                "GET",
                G + "/tourney/changeInviteCode?s=" + (opcode || ""),
                true,
              ),
              z.send(null);
          });
      document.body.appendChild(D);
    }
  }),
    (z.onerror = (z) => {
      xD(
        new Date().toLocaleTimeString() + " - Error fetching team members",
        "error",
      );
    }),
    z.open("GET", G + "/tourney/members?s=" + (opcode || ""), true),
    z.send(null);
}
function IL() {
  var z = "none";
  h &&
    h.view &&
    (document.body.removeChild(h.view), (z = h.view.style.display));
  PIXI.utils.isWebGLSupported(),
    (h = PIXI.autoDetectRenderer(256, 256, {
      antialias: true,
      transparent: false,
      resolution: zz * Ul,
    })).plugins.interaction &&
      (h.plugins.interaction.destroy(), (h.plugins.interaction = null)),
    h.plugins.accessibility &&
      (h.plugins.accessibility.destroy(), (h.plugins.accessibility = null)),
    h.view.addEventListener("touchstart", fc, true),
    h.view.addEventListener("touchmove", fc, true),
    h.view.addEventListener("touchend", fc, true),
    h.view.addEventListener("touchcancel", fc, true),
    h.view.addEventListener("mousedown", Jc, true),
    (h.view.tabindex = 1),
    (h.backgroundColor = PV ? 0 : 15923199),
    (h.view.style.position = "fixed"),
    (h.view.style.top = 0),
    (h.view.style.left = 0),
    (h.autoResize = true),
    (h.view.style.display = z),
    (h.view.oncontextmenu = (z) => (z.preventDefault(), false)),
    document.body.appendChild(h.view),
    kc(),
    h.view.addEventListener(
      "webglcontextlost",
      (z) => {
        console.error("WebGL context lost", z),
          z.preventDefault(),
          MainLoop.stop(),
          setTimeout(() => {
            h.view.getContext("webgl").isContextLost() &&
              (console.error(
                "Context was not restored after 1 second, recreating",
              ),
              IL(),
              MainLoop.start());
          }, 1e3);
      },
      false,
    ),
    h.view.addEventListener(
      "webglcontextrestored",
      () => {
        console.error("WebGL context restored, recreating"),
          IL(),
          MainLoop.start();
      },
      false,
    );
}
function AL() {
  (F.dot1 = PIXI.Texture.fromImage("img/dot1s.png")),
    (F.debris = PIXI.Texture.fromImage("img/debrishw.png")),
    (F.shoot = PIXI.Texture.fromImage("img/hwbullet.png")),
    (F["death-blast"] = PIXI.Texture.fromImage("img/hwdeathblast.png")),
    (qV = true),
    (document.querySelector("#homepage .logo img").src = "img/logohw5.png");
}
function OL() {
  try {
    var D = localStorage.getItem("quality");
    D && al(D);
  } catch (z) {
    console.error(z);
  }
  try {
    if ("undefined" != typeof Storage) {
      if (
        (localStorage.getItem("username") &&
          (document.getElementById("username").value =
            localStorage.getItem("username")),
        localStorage.getItem("sessionId") &&
          (opcode = localStorage.getItem("sessionId")),
        localStorage.getItem("keyBindings")
          ? (customKeyboardCommands = JSON.parse(
              localStorage.getItem("keyBindings"),
            ))
          : localStorage.getItem("trackPadFriendlyMode") &&
            ("1" == localStorage.getItem("trackPadFriendlyMode") &&
              ((customKeyboardCommands.MUP = [{ code: "KeyW", keyCode: 87 }]),
              (customKeyboardCommands.MDOWN = [{ code: "KeyS", keyCode: 83 }]),
              (customKeyboardCommands.MLEFT = [{ code: "KeyA", keyCode: 65 }]),
              (customKeyboardCommands.MRIGHT = [{ code: "KeyD", keyCode: 68 }]),
              (customKeyboardCommands.SHOOT = [
                { button: 0 },
                { code: "ArrowUp", keyCode: 38 },
              ]),
              (customKeyboardCommands.TLEFT = [
                { code: "ArrowLeft", keyCode: 37 },
              ]),
              (customKeyboardCommands.TRIGHT = [
                { code: "ArrowRight", keyCode: 39 },
              ])),
            localStorage.removeItem("trackPadFriendlyMode"),
            localStorage.setItem(
              "keyBindings",
              JSON.stringify(customKeyboardCommands),
            )),
        localStorage.getItem("moveWithMouse") &&
          ((vV = "1" == localStorage.getItem("moveWithMouse")),
          (document.getElementById("controls-mwm").checked = vV),
          (cV = vV)),
        localStorage.getItem("colorBlindMode") &&
          ((aV = "1" == localStorage.getItem("colorBlindMode")),
          (document.getElementById("controls-colorblind").checked = aV)),
        localStorage.getItem("darkTheme") &&
          ((PV = "1" == localStorage.getItem("darkTheme")),
          (document.getElementById("theme-radio1").checked = !PV),
          (document.getElementById("theme-radio2").checked = PV),
          CD()),
        localStorage.getItem("chatDisabled") &&
          ((LV = "1" == localStorage.getItem("chatDisabled")),
          (document.getElementById("settings-disablechat").checked = LV)),
        localStorage.getItem("infologDisabled") &&
          ((WV = "1" == localStorage.getItem("infologDisabled")),
          (document.getElementById("settings-disableinfolog").checked = WV)),
        localStorage.getItem("chatSize"))
      ) {
        gV = parseInt(localStorage.getItem("chatSize"));
        for (
          var v = document.getElementsByName("settings-chat-size"), c = 0;
          c < v.length;
          c++
        )
          v[c].checked = v[c].value == gV;
        document.getElementById("chat-history").className = "size" + gV;
      }
      localStorage.getItem("gameMode") &&
        ((hz = parseInt(localStorage.getItem("gameMode"))), il()),
        localStorage.getItem("initialGameMode")
          ? (KV = parseInt(localStorage.getItem("initialGameMode")))
          : localStorage.getItem("gameMode") ||
            ((KV = Math.random() < 0.5 ? 0 : 3),
            localStorage.setItem("initialGameMode", KV),
            localStorage.setItem("gameMode", KV),
            (hz = KV),
            il());
      var P = document.getElementById("settings-bindings");
      for (var L in keyboardCommands) {
        var W = document.createElement("div");
        W.className = "binding";
        var g = document.createElement("div");
        (g.className = "name"),
          (g.innerHTML = keyboardCommands[L]),
          W.appendChild(g);
        var q = document.createElement("div");
        (q.className = "value"), W.appendChild(q);
        var m = document.createElement("div");
        q.appendChild(m);
        var K = document.createElement("div");
        (K.className = "value"), W.appendChild(K);
        var n = document.createElement("div");
        K.appendChild(n), P.appendChild(W);
        var f = customKeyboardCommands[L];
        (m.innerHTML =
          f.length >= 1 && f[0] && Object.keys(f[0]).length > 0
            ? oL(f[0])
            : "&nbsp;"),
          (n.innerHTML =
            f.length >= 2 && f[1] && Object.keys(f[1]).length > 0
              ? oL(f[1])
              : "&nbsp;"),
          m.addEventListener(
            "click",
            ((z, V, l) => () => {
              fL(z, V, 0);
            })(m, L),
            false,
          ),
          n.addEventListener(
            "click",
            ((z, V, l) => () => {
              fL(z, V, 1);
            })(n, L),
            false,
          );
      }
      localStorage.getItem("chatGuidelines") &&
        (Sz = parseInt(localStorage.getItem("chatGuidelines")));
    }
  } catch (z) {
    console.error(z);
  }
  PIXI.ticker.shared.stop(),
    IL(),
    window.addEventListener("resize", kc, true),
    window.addEventListener("mousemove", Kc, true),
    window.addEventListener("mouseup", xc, true),
    window.addEventListener("wheel", wc, true),
    window.addEventListener("keydown", uc, true),
    window.addEventListener("keyup", _c, true),
    (window.oncontextmenu = (z) => (z.preventDefault(), false)),
    window.addEventListener(
      "blur",
      () => {
        0 != e && ((Sc = [false, false, false, false]), Xc());
      },
      true,
    ),
    (document.getElementById("chat-input").onpaste = (z) => {
      z.preventDefault();
    }),
    (U = new PIXI.Container()),
    (t = new PIXI.Container()),
    U.addChild(t),
    (j = new PIXI.Container()),
    U.addChild(j),
    (C = new PIXI.Container()),
    U.addChild(C),
    (B = new PIXI.Container()),
    U.addChild(B),
    (a = new PIXI.Container()),
    U.addChild(a),
    (Y = new PIXI.Container()),
    U.addChild(Y),
    (p = new PIXI.Container()),
    U.addChild(p),
    (o = new PIXI.Container()),
    U.addChild(o),
    (Z = new PIXI.Container()),
    U.addChild(Z),
    (R = new PIXI.Container()),
    (S = new PIXI.Container()),
    MainLoop.setBegin(Ac).setUpdate(qP).setDraw(YP).setEnd($P),
    PIXI.loader
      .add("img/spritesheet9.json")
      .add("img/spritesheet92.json")
      .add("wall-line", "img/line1.png")
      .add("gridpixel", "img/gridpixel.png")
      .load((z, V) => {
        for (var l in ((-1 ==
          window.location.search.indexOf("playEpicTourney") &&
          -1 == window.location.search.indexOf("streamEpicTourney")) ||
          ((BV = true),
          (CV = true),
          (hz = 1),
          (document.getElementById("gamemode-0").style.display = "none"),
          (document.getElementById("gamemode-2").style.display = "none"),
          (document.getElementById("gamemode-3").style.display = "none"),
          document.getElementById("gamemode-1").classList.add("selected"),
          document.getElementById("gamemode-4") &&
            (document.getElementById("gamemode-4").style.display = "none")),
        ("?streamTourney" != window.location.search &&
          "?streamEpicTourney" != window.location.search) ||
          ((pV = true), (BV = true)),
        bl(),
        V))
          if (V[l].error) {
            console.error("error loading asset", V[l].error),
              ml(
                "Error loading game images, please reload the page. Clear your browser cache if this happens repeatedly.",
              ),
              V[l].error;
            break;
          }
        for (var D in ((F =
          PIXI.loader.resources["img/spritesheet9.json"].textures),
        PIXI.loader.resources["img/spritesheet92.json"].textures))
          F[D] = PIXI.loader.resources["img/spritesheet92.json"].textures[D];
        var v;
        (F.gridpixel = PIXI.loader.resources.gridpixel.texture),
          (F.gridpixel.baseTexture.mipmap = false),
          (F["wall-line"] = PIXI.loader.resources["wall-line"].texture),
          (_z() || -1 != window.location.search.indexOf("halloween")) && AL(),
          ((11 == (v = new Date()).getMonth() &&
            v.getDate() >= 21 &&
            v.getDate() <= 27) ||
            -1 != window.location.search.indexOf("winter")) &&
            ((F.dot1 = PIXI.Texture.fromImage("img/tower-gift.png")),
            (F.shoot = PIXI.Texture.fromImage("img/bullet-snowflake.png")),
            (F["death-blast"] = PIXI.Texture.fromImage("img/death-santa.png")),
            (mV = true)),
          -1 != window.location.search.indexOf("starwars") &&
            ((F.dot1 = PIXI.Texture.fromImage("img/tower-starwars.png")),
            (F.shoot = PIXI.Texture.fromImage("img/bullet-laser.png")),
            (F["death-blast"] = PIXI.Texture.fromImage(
              "img/death-starwars.png",
            )),
            (hV = true),
            (PV = true),
            (h.backgroundColor = PV ? 0 : 15923199),
            kc(),
            CD()),
          -1 != window.location.search.indexOf("paper") &&
            ((F.dot1 = PIXI.Texture.fromImage("img/tower-paper.png")),
            (F.shoot = PIXI.Texture.fromImage("img/bullet-paper.png")),
            (F["wall-line"] = PIXI.Texture.fromImage(
              "img/wall-line-paper.png",
            )),
            (F["death-blast"] = PIXI.Texture.fromImage(
              "img/explosion-paper.png",
            )),
            (UV = true)),
          Fl &&
            document.getElementById("youtube-live") &&
            (document.getElementById("youtube-live").style.display = "none"),
          document.getElementById("chat-guidelines-popup") &&
            (document
              .getElementById("chat-guidelines-accept")
              .addEventListener("click", () => $c(true)),
            document
              .getElementById("chat-guidelines-deny")
              .addEventListener("click", () => $c(false))),
          (document.getElementById("homepage-loading").style.display = "none"),
          (document.getElementById("homepage-loaded").style.display = "block"),
          GL(),
          VL(),
          ((b = new PIXI.Sprite(F.shoot)).visible = false),
          (b.tint = 0),
          (b.alpha = 0.1),
          b.anchor.set(0.5),
          ((X = new PIXI.Sprite(F.shoot)).visible = false),
          (X.tint = 0),
          (X.alpha = 0.3),
          X.anchor.set(0.5),
          R.addChild(b),
          R.addChild(X),
          ((H = new PIXI.Sprite(F.shoot)).visible = false),
          (H.tint = 0),
          (H.alpha = 0.1),
          H.anchor.set(0.5),
          ((r = new PIXI.Sprite(F.shoot)).visible = false),
          (r.tint = 0),
          (r.alpha = 0.3),
          r.anchor.set(0.5),
          R.addChild(H),
          R.addChild(r),
          ((M = new PIXI.Sprite(F.build)).visible = false),
          M.anchor.set(0.5),
          (M.alpha = 0.5),
          R.addChild(M),
          qV &&
            PIXI.loader.resources.pumpkin &&
            ((F.dot1 = PIXI.loader.resources.dot1s.texture),
            (F.debris = PIXI.loader.resources.debris.texture),
            (F.shoot = PIXI.loader.resources.pumpkin.texture)),
          mV &&
            PIXI.loader.resources["tower-winter"] &&
            ((F.dot1 = PIXI.loader.resources["tower-winter"].texture),
            (F.debris = PIXI.loader.resources["debris-winter"].texture)),
          "?skin-editor" == window.location.search && hL(),
          PIXI.loader.add("add-skins", "img/add-skins.js").load((z, V) => {
            var l = JSON.parse(V["add-skins"].data),
              D = [];
            for (var v in l.images) F[v] = PIXI.Texture.fromImage(l.images[v]);
            for (var c in l.specs)
              (DD[parseInt(c)] = l.specs[c]), D.push(parseInt(c));
            setTimeout(() => {
              for (var z in (VL(true), Tz))
                if (XV[z] && -1 !== D.indexOf(Tz[z])) {
                  var V = XV[z];
                  Z.removeChild(V),
                    Y.removeChild(V.usernameText),
                    V.shield && Z.removeChild(V.shield),
                    V.badge && Y.removeChild(V.badge),
                    gD(z),
                    (XV[z].x = V.x),
                    (XV[z].y = V.y),
                    (XV[z].sx = V.sx),
                    (XV[z].sy = V.sy);
                }
            });
          }),
          ("?defuse-editor" != window.location.search &&
            "?map-editor" != window.location.search) ||
            wL(),
          document
            .getElementById("preferred-server-block")
            .getElementsByClassName("close")[0]
            .addEventListener("click", () => {
              history.replaceState(
                "",
                document.title,
                window.location.pathname + window.location.search,
              ),
                GL();
            }),
          document.getElementById("redo-last-upgrade-yes-button") &&
            document
              .getElementById("redo-last-upgrade-yes-button")
              .addEventListener("click", () => {
                BD(true);
              }),
          document.getElementById("redo-last-upgrade-no-button") &&
            document
              .getElementById("redo-last-upgrade-no-button")
              .addEventListener("click", () => {
                BD(false);
              });
      }),
    $(() => {
      ($("#server").selectmenu().data("ui-selectmenu")._renderItem = (z, V) => {
        var l = $("<li>"),
          D = $("<div>", { text: V.label });
        return (
          V.element.attr("data-ping") &&
            $("<span>", {
              class: "ping",
              text: "(ping: " + V.element.attr("data-ping") + ")",
            }).appendTo(D),
          l.append(D).appendTo(z)
        );
      }),
        $("#server-button").removeAttr("aria-owns");
    });
  try {
    "undefined" != typeof Storage &&
      (localStorage.getItem("gamesPlayed") &&
        (qz = localStorage.getItem("gamesPlayed")),
      localStorage.getItem("showTuto") &&
        (dz = "true" == localStorage.getItem("showTuto")),
      localStorage.getItem("playerSkin") &&
        ($z = parseInt(localStorage.getItem("playerSkin"))),
      localStorage.getItem("playerSkinColor") &&
        (Qz = parseInt(localStorage.getItem("playerSkinColor"))),
      localStorage.getItem("skinFacebookLiked") &&
        (MP.skinFacebookLiked =
          "true" == localStorage.getItem("skinFacebookLiked")),
      localStorage.getItem("skinTwitterTweet") &&
        (MP.skinTwitterTweet =
          "true" == localStorage.getItem("skinTwitterTweet")),
      localStorage.getItem("skinTwitterFollow") &&
        (MP.skinTwitterFollow =
          "true" == localStorage.getItem("skinTwitterFollow")),
      localStorage.getItem("skinYoutubeSubscribe") &&
        (MP.skinYoutubeSubscribe =
          "true" == localStorage.getItem("skinYoutubeSubscribe")),
      localStorage.getItem("skinFacebookShare") &&
        (MP.skinFacebookShare =
          "true" == localStorage.getItem("skinFacebookShare")),
      localStorage.getItem("skinDiscordJoin") &&
        (MP.skinDiscordJoin =
          "true" == localStorage.getItem("skinDiscordJoin")));
  } catch (z) {
    console.log(z);
  }
  (Zl = (() => {
    var z = false,
      V = document.createElement("div");
    if (
      (V.setAttribute(
        "class",
        "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ad-text adSense adBlock adContent adBanner",
      ),
      V.setAttribute(
        "style",
        "width: 1px ! important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
      ),
      window.document.body.appendChild(V),
      null !== window.document.body.getAttribute("abp") ||
        null === V.offsetParent ||
        0 == V.offsetHeight ||
        0 == V.offsetLeft ||
        0 == V.offsetTop ||
        0 == V.offsetWidth ||
        0 == V.clientHeight ||
        0 == V.clientWidth)
    )
      z = true;
    else if (void 0 !== window.getComputedStyle) {
      var l = window.getComputedStyle(V, null);
      !l ||
        ("none" != l.getPropertyValue("display") &&
          "hidden" != l.getPropertyValue("visibility")) ||
        (z = true);
    }
    return window.document.body.removeChild(V), z;
  })()),
    (d = document.getElementById("minimap-canvas")),
    (s = document.getElementById("minimap-canvas").getContext("2d")),
    (fl || Tl || Ql || $l) &&
      document.getElementById("portal-button") &&
      (document.getElementById("portal-button").style.display = "none");
  try {
    (navigator.language.startsWith("ru") ||
      navigator.language.startsWith("uk")) &&
      ((document
        .getElementById("portal-button")
        .getElementsByTagName("a")[0].href = "http://vseigru.net"),
      (document
        .getElementById("portal-button")
        .getElementsByTagName("a")[0].innerHTML = "More Games"));
  } catch (z) {
    console.error(z);
  }
  document.getElementById("gsignin-blocker") &&
    (document.getElementById("gsignin-blocker").addEventListener(
      "click",
      () => {
        document.getElementById("privacy-policy-checkbox").checked ||
          dl("You must accept the terms of service and privacy policy");
      },
      true,
    ),
    document
      .getElementById("privacy-policy-checkbox")
      .addEventListener("click", () => {
        document.getElementById("gsignin-blocker").style.pointerEvents =
          document.getElementById("privacy-policy-checkbox").checked
            ? "none"
            : "all";
      }));
}
"loading" !== document.readyState
  ? OL()
  : document.addEventListener("DOMContentLoaded", OL, false),
  window.addEventListener("beforeunload", (z) => {
    if ((0 != e && !n && !xz) || mc || SL) {
      return (z.returnValue = "Exit the game?"), "Exit the game?";
    }
  });

window.defly = (() => {
  return {
    selectMode: (V) => {
      BV ||
        ("none" !== document.getElementById("play-button").style.display &&
          ((hz = V),
          il(),
          bl(),
          z &&
            (history.replaceState(
              "",
              document.title,
              window.location.pathname + window.location.search,
            ),
            GL())));
    },
    clickPlay: () => {
      if (pV && !qc) {
        qc = window.prompt("?", "");
      }

      if (pV || !BV || sz || Jz) {
        _l();
        if (typeof gtag !== "undefined") {
          gtag("event", "Play", {
            event_category: "Click",
            gamesPlayed: qz,
            initialGameMode: KV === -1 ? null : KV,
          });
        }

        try {
          localStorage.setItem("gameMode", hz);
        } catch (error) {
          console.error(error);
        }
      } else {
        dl("You must sign-in to participate in the tournament", "", () => {
          XP();
        });
      }
    },
    backToHomepage: Il,
    respawn: () => {
      (Ml = Wc),
        !BV && (mz > 600 || 2 == qz || (qz > 2 && (qz - 2) % 2 == 0)) && Gl()
          ? "undefined" != typeof gtag &&
            gtag("event", "Respawn", {
              event_category: "Click",
              event_label: "VideoAd",
            })
          : (Wc(),
            "undefined" != typeof gtag &&
              gtag("event", "Respawn", {
                event_category: "Click",
                event_label: "NoVideoAd",
              })),
        (Rz = 0),
        (document.getElementById("respawn-spinner").style.display =
          "inline-block"),
        (document.getElementById("respawn-button").style.display = "none"),
        (document.getElementById("xp-bar").style.display = "block");
    },
    spectate: () => {
      2 == hz
        ? xV >= 30
          ? ((Ml = gc),
            (2 == qz || (qz > 2 && (qz - 2) % 2 == 0)) && Gl()
              ? "undefined" != typeof gtag &&
                gtag("event", "Spectate", {
                  event_category: "Click",
                  event_label: "VideoAd",
                })
              : gc())
          : gc()
        : (document.getElementById("respawn").style.display = "none");
    },
    upgrade: Lc,
    selectSuperpower: (z) => {
      document.getElementById("choose-superpower").style.display = "none";
      var V = new DataView(new ArrayBuffer(2));
      V.setUint8(0, 6);
      V.setUint8(1, z);
      q.send(V.buffer);
      oz = z;
      Zz = 0;
      document.getElementById("superpower-fuel").style.display = "block";
      if (window.event) window.event.preventDefault();
    },
    promoComplete: kl,
    setQuality: al,
    chooseSkin: () => {
      (document.getElementById("skin-popup").style.display = "block"),
        document.getElementById("homepage").classList.add("blurred"),
        "undefined" != typeof gtag &&
          gtag("event", "SelectSkin", { event_category: "Click" });
    },
    closeSkinSelector: () => {
      (document.getElementById("skin-popup").style.display = "none"),
        document.getElementById("homepage").classList.remove("blurred"),
        "undefined" != typeof gtag &&
          gtag("event", "CloseSkinPopup", {
            event_category: "Click",
            playerSkin: $z,
            playerSkinColor: Qz,
          });
    },
    changeSkinColor: DL,
    changeSkinTab: NP,
    sac: hc,
    selectTeam: bv,
    buyGear: (z) => {
      var V = new DataView(new ArrayBuffer(3));
      V.setUint8(0, 11), V.setUint8(1, z), V.setUint8(2, 0), q.send(V.buffer);
    },
    sellGear: (z) => {
      var V = new DataView(new ArrayBuffer(3));
      V.setUint8(0, 11), V.setUint8(1, z), V.setUint8(2, 1), q.send(V.buffer);
    },
    changeControls: () => {
      (aV = document.getElementById("controls-colorblind").checked),
        (vV = document.getElementById("controls-mwm").checked),
        (cV = vV);
      try {
        localStorage.setItem("moveWithMouse", vV ? 1 : 0),
          localStorage.setItem("colorBlindMode", aV ? 1 : 0);
      } catch (z) {
        console.log(z);
      }
      if (e > 0)
        for (var z in RV)
          RV[z].texture = F[Wv(RV[z].owner, RV[z].hp, RV[z].maxHP)];
    },
    changeTheme: () => {
      (PV = document.getElementById("theme-radio2").checked),
        (h.backgroundColor = PV ? 0 : 15923199);
      try {
        localStorage.setItem("darkTheme", PV ? 1 : 0);
      } catch (z) {
        console.log(z);
      }
      if ((kc(), e > 0))
        for (var z in XV) XV[z].usernameText._style.fill = PV ? 16777215 : 0;
      CD();
    },
    changeChatSettings: () => {
      (LV = document.getElementById("settings-disablechat").checked),
        (WV = document.getElementById("settings-disableinfolog").checked);
      for (
        var z = document.getElementsByName("settings-chat-size"), V = 0;
        V < z.length;
        V++
      )
        z[V].checked && (gV = z[V].value);
      document.getElementById("chat-history").className = `size${gV}`;
      try {
        localStorage.setItem("chatDisabled", LV ? 1 : 0),
          localStorage.setItem("infologDisabled", WV ? 1 : 0),
          localStorage.setItem("chatSize", gV);
      } catch (z) {
        console.log(z);
      }
    },
    joinTourney: () => {
      if (pV || sz || Jz) {
        if (!N) {
          (N = true),
            (BV = true),
            (YV = true),
            pV && (qc = window.prompt("?", "")),
            (hz = 0);
          for (var z = 0; z <= 4; z++)
            document.getElementById("gamemode-" + z) &&
              (document.getElementById("gamemode-" + z).style.display = "none");
          (document.getElementById("server-block").style.display = "none"),
            (document.getElementById("play-button").style.display = "none"),
            (document.getElementById("play-spinner").style.display = "block"),
            bl(),
            _z() && !qV && AL();
        }
      } else dl("Log-in first to participate the tournament", "", XP);
    },
    voteForMap: (z) => {
      document.getElementById("map-vote").style.display = "none";
      var V = new DataView(new ArrayBuffer(2));
      V.setUint8(0, 13), V.setUint8(1, uD[z].id);
      q.send(V.buffer);
    },
    recreateRenderer: IL,
    select1v1Player: (z) => {
      if (z && z != HV) {
        zv = z;
        var V = EV[z];
        if (V.challenged) return false;
        switch (V.status) {
          case 0:
          case 2:
            document.getElementById("gm-1v1-confirm-duel-text").innerHTML =
              `Challenge ${Cl(V.name)} ?`;
            Vv = true;
            break;
          case 1:
            document.getElementById("gm-1v1-confirm-duel-text").innerHTML =
              `Spectate ${Cl(V.name)} ?`;
            Vv = false;
        }
        document.getElementById("gm-1v1-confirm-duel").style.visibility =
          "visible";
      } else
        document.getElementById("gm-1v1-confirm-duel").style.visibility =
          "hidden";
      return false;
    },
    confirmChallenge: (z) => {
      if (Vv) {
        if (z) {
          XD("You challenged " + Cl(EV[zv].name), "bold");
          var V = new DataView(new ArrayBuffer(5));
          V.setUint8(0, 14),
            V.setInt32(1, zv),
            q.send(V.buffer),
            (EV[zv].challenged = true),
            OD();
        }
      } else z && Tc(zv);
      zv = 0;
      document.getElementById("gm-1v1-confirm-duel").style.visibility =
        "hidden";
    },
    answerChallenge: (z, V) => {
      var l = new DataView(new ArrayBuffer(6));
      l.setUint8(0, 15);
      l.setInt32(1, z);
      l.setUint8(5, V ? 1 : 0);
      q.send(l.buffer);
      XD(
        "You " +
          (V ? "accepted" : "rejected") +
          " the challenge from " +
          Cl(EV[z].name),
        "bold",
      );
    },
  };
})();
