function checkPing(V) {
  I[V] = new WebSocket(Jl(c[V].uri));
  I[V].binaryType = "arraybuffer";
  I[V].pings = [];
  I[V].sendPing = function () {
    this.lastPingTime = Date.now();
    this.send(Uint8Array.of(99));
  };
  I[V].addEventListener("open", (z) => {
    z.target.sendPing();
  });
  I[V].addEventListener("error", function (z) {
    if (!this.cancelled)
      xD(
        `${new Date().toLocaleTimeString()} - Error reaching server in ${V} ${z.type} ${z.code}`,
        "",
      );
  });
  I[V].addEventListener("close", () => {});
  I[V].addEventListener("message", (l) => {
    var D = new DataView(l.data).getUint8(0);
    if (D == 99) {
      l.target.pings.push(Date.now() - l.target.lastPingTime);
      if (l.target.pings.length >= 3) {
        l.target.close();
        delete I[V];
        A[V] = Math.min(...l.target.pings);
        console.log("Best ping for region", V, A[V]);
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

function bl() {
  if (c) {
    for (var z in c) I[z] && ((I[z].cancelled = !0), I[z].close()), delete I[z];
    A = [];
    document.getElementById("server").innerHTML = "Loading";
    $("#server").selectmenu("refresh");
    clearTimeout(Sl);
  }

  var z = new XMLHttpRequest();
  z.onreadystatechange = () => {
    if (z.readyState == 4 && z.status == 200) {
      try {
        var V = z.responseText.split("\n");
        c = JSON.parse(V[0]);
        BV ? (c = { TR: c.TR }) : delete c.TR;
        var l = !1;
        for (var D in c) c[D] && (checkPing(D), (l = !0));
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
              var L = JSON.parse(P),
                W = new Date(L.ts ? parseInt(L.ts) : L.date).getTime(),
                g = Date.now(),
                q = W - g,
                m = L.duration || 1,
                h = document.getElementById("event-placeholder");

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

  z.open("GET", G + "/servers?m=" + hz, true);
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
    if (P.readyState !== 4) return;

    if (P.status === 200) {
      var response = P.responseText;

      if (response.includes("LOGIN_ERROR")) {
        dl(
          "The session has expired, please reload the page and try again",
          "",
          () => document.location.reload(),
        );
      } else if (response.includes("ERROR")) {
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
      } else if (response.includes("RESERVED_NICKNAME")) {
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
      } else {
        var parts = response.split(" ");
        k = parts[0];
        l = parts[1];
        if (parts.length >= 3) hz = parseInt(parts[2]);

        if (typeof Storage !== "undefined") {
          try {
            localStorage.setItem("sessionId", l);
          } catch (err) {
            console.log(err);
          }
        }

        console.log("Server", k, "reservationKey", V);
        Hl();
      }
    } else {
      P.onerror(P.status);
    }
  };

  P.onerror = () => {
    xD(new Date().toLocaleTimeString() + " - Error selecting server", "error");
    Rl = setTimeout(Xl, 3000);
  };

  var url =
    G +
    "?r=" +
    (D || "") +
    "&m=" +
    hz +
    "&u=" +
    encodeURIComponent(c) +
    "&fu=" +
    encodeURIComponent(ol(c)) +
    "&s=" +
    (l || "") +
    (sz ? "&a=1" : "") +
    (!sz && Jz ? "&a=2" : "") +
    (z ? "&p=" + encodeURIComponent(z) : "");

  P.open("POST", url, true);
  if (sz) P.send(oP);
  else if (Jz) P.send(ZP);
  else P.send(null);
}

function Hl() {
  q
    ? console.error("Already connected to server")
    : ((document.getElementById("play-button").style.display = "none"),
      (document.getElementById("play-spinner").style.display = "block"),
      (cl = {}),
      (Tz = {}),
      ((q = new WebSocket(Jl(k))).binaryType = "arraybuffer"),
      q.addEventListener("open", (z) => {
        console.log("socket connected"),
          (() => {
            0 ==
              (m = document.getElementById("username").value.substring(0, 12))
                .length && (m = "Player");
            if ("undefined" != typeof Storage)
              try {
                localStorage.setItem("username", m);
              } catch (z) {
                console.log(z);
              }
            var z = l || "";
            D = z;
            var V = new DataView(
              new ArrayBuffer(2 + 2 * m.length + 1 + 2 * z.length + 4 + 4),
            );
            V.setUint8(0, 1),
              zD(V, 1, m),
              zD(V, 2 + 2 * m.length, z),
              V.setInt32(2 + 2 * m.length + 1 + 2 * z.length, $z),
              V.setInt32(2 + 2 * m.length + 1 + 2 * z.length + 4, qz),
              q.send(V.buffer),
              pV && hc(1, qc);
          })();
      }),
      q.addEventListener("error", (z) => {
        console.error(z),
          xD(
            new Date().toLocaleTimeString() +
              " - Websocket error " +
              z.type +
              " " +
              z.code,
            "error",
          ),
          z.type;
      }),
      q.addEventListener("close", (z) => {
        if ((console.log("socket closed", z), !O))
          if ("no-session" === z.reason)
            dl("Your session was not found, try again", "", () => {
              document.location.reload();
            });
          else if ("duplicate-session" === z.reason)
            dl(
              "You have been kicked out because someone else just connected with the same account",
              "",
              () => {
                document.location.reload();
              },
            );
          else if (0 == e)
            xz
              ? dl("You have been kicked out for inactivity.", "", () => {
                  document.location.reload();
                })
              : dl(
                  "Connection to the server failed. Please try again in a few minutes and contact us if the problem persists.",
                  "",
                  () => {
                    z.code, document.location.reload();
                  },
                );
          else {
            if ((z.code, XV[HV] && !n)) {
              var V = new DataView(new ArrayBuffer(10));
              V.setUint8(0, 10),
                V.setInt32(1, HV),
                V.setUint8(5, 0),
                V.setInt32(6, 0),
                xv(V);
            }
            dl(
              xz
                ? "You have been kicked out for inactivity."
                : "The connection to the server has been lost.",
              "",
              () => {
                (document.getElementById("internet-issue").style.display =
                  "none"),
                  (document.getElementById("respawn-buttons").style.display =
                    "none"),
                  (document.getElementById(
                    "respawn-buttons-gm2",
                  ).style.display = "none"),
                  MainLoop.stop(),
                  4 == hz && document.location.reload();
              },
            );
          }
        (q = null), (O = !1), 0, (Lz = []);
      }),
      q.addEventListener("message", Ol));
}

function Hl() {
  if (q) {
    console.error("Already connected to server");
    return;
  }

  document.getElementById("play-button").style.display = "none";
  document.getElementById("play-spinner").style.display = "block";

  cl = {};
  Tz = {};

  q = new WebSocket(Jl(k));
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

    D = l || "";
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

function Ol(z) {
  var V = new DataView(z.data),
    l = V.getUint8(0);
  switch (l) {
    case 1:
      console.error("received map unavailable"),
        Al++,
        (0 != hz && 1 != hz && 3 != hz) || 1 != e
          ? 1 == hz && -1 != yv
            ? setTimeout(() => {
                bv(yv);
              }, 250)
            : ((O = !0), q.close(), (Rl = setTimeout(Xl, 250)))
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
            shooting: !1,
            moving: !1,
            aimDirection: 0,
            moveDirection: 0,
          }),
          (Wz = []),
          (Dz = []),
          (rD = []),
          (Nc = null),
          (oz = -1),
          (Fz = !1),
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
        var L = !1;
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
            (L = !0),
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
        for (var R in cl) R != HV && cl[R] == J && (x[R] = !0);
        for (var R in x) delete cl[R];
        (XV[HV].x = l),
          (XV[HV].y = D),
          (iz = new PIXI.Sprite(F["wall-line"])).anchor.set(0.5),
          (iz.height = dV),
          (iz.alpha = 0.2),
          (iz.tint = Pl(HV)),
          (iz.visible = !1),
          B.addChild(iz),
          (wz = new PIXI.Sprite(F.dot1)).anchor.set(0.5),
          (wz.width = 2 * Iz),
          (wz.height = 2 * Iz),
          (wz.alpha = 0.2),
          (wz.tint = Pl(HV)),
          (wz.visible = !1),
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
            ((XV[HV].visible = iz.visible = wz.visible = !1),
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
              (K.moving = !1),
              (Sc[0] = !1),
              (Sc[1] = !1),
              (Sc[2] = !1),
              (Sc[3] = !1);
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
          } else (n = XV[HV].position), (XV[HV].visible = !1);
      })(V);
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
              (WP(!0, !1), XV[HV] && DP(XV[HV], !0));
      })(V);
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
      })(V);
      break;
    case 6:
      Pv(V);
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
              (0 != hz && 3 != hz) || P != HV || (jP = !0),
              E && (E.add(t, t.position), 3 == hz && av(t));
          }
        }
      })(V);
      break;
    case 7:
      gv(V);
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
      })(V);
      break;
    case 8:
      hv(V, !0);
      break;
    case 20:
      hv(V, !1);
      break;
    case 51:
      !((z) => {
        for (var V = z.getInt16(1), l = 3, D = 0; D < V; D++)
          l = Uv(z, l, !1, !1);
        var v = z.getInt16(l);
        l += 2;
        for (var D = 0; D < v; D++) l = Uv(z, l, !1, !0);
        var c = z.getInt16(l);
        l += 2;
        for (var D = 0; D < c; D++) {
          var P = 0 == z.getUint8(l);
          l = Uv(z, ++l, !0, P);
        }
      })(V);
      break;
    case 9:
      Tv(V);
      break;
    case 10:
      xv(V);
      break;
    case 52:
      !((z) => {
        sv(z.getInt32(1));
      })(V);
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
            W +=
              '<div class="lb-item' +
              (q ? " is-self" : "") +
              '"><span class="color" style="background-color: ' +
              HP(m) +
              '"></span><span class="rank">' +
              (g + 1) +
              '.</span><span class="player-name' +
              (g + 1 >= 10 ? " l" : "") +
              '">' +
              Cl(nz[P[g].id]) +
              '</span><span class="points">' +
              P[g].points +
              "</span></div>";
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
      })(V);
      break;
    case 12:
      !((z) => {
        var V = z.getInt32(1);
        if (0 == V) (Nc = null), (iz.visible = !1);
        else {
          var l = RV[V];
          Nc = l;
        }
      })(V);
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
      })(V);
      break;
    case 14:
      !((z) => {
        var V = z.getInt32(1);
        if (Uz[V]) {
          var l = Uz[V];
          delete Uz[V], o.removeChild(l);
        }
      })(V);
      break;
    case 15:
      _v(V);
      break;
    case 32:
      _v(V, !0);
      break;
    case 16:
      iv(V, !0, !1);
      break;
    case 17:
      iv(V, !0, !0);
      break;
    case 18:
      iv(V, !1, !1);
      break;
    case 19:
      iv(V, !1, !0);
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
          c = !0,
          P = 1e3 / (T - V + 1),
          L = () => {
            !c &&
              V < T &&
              ((document.getElementById("xp-value").style.width = "0%"),
              V++,
              (document.getElementById("level-value").innerHTML = V),
              (v = V == T ? Q : 1)),
              (c = !1);
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
      })(V);
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
      })(V);
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
      })(V);
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
      })(V);
      break;
    case 25: {
      var D = V.getInt32(1),
        v = V.getInt32(5);
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
      })(V);
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
      })(V);
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
      })(V);
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
      })(V);
      break;
    case 28:
      !((z) => {
        (Kz = z.getInt32(1)),
          2 != hz || n
            ? 4 == hz &&
              0 != Kz &&
              (XV[HV] && (XV[HV].visible = !1),
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
              (XV[HV].visible = !1),
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
      })(V);
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
      })(V);
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
      })(V);
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
      })(V);
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
            (Rv = !0));
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
      })(V);
      break;
    case 36:
      fv(V);
      break;
    case 37:
      fv(V, !0);
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
      })(V);
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
      })(V);
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
            (vv = !0);
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
      })(V);
      break;
    case 54:
      !((z) => {
        var V = z.getInt32(1);
        V == HV
          ? showAlert("You reached 80%, now kill everyone to win!", 2e4, !0)
          : 0 == V || V == HV || n
            ? 0 != V ||
              0 == cv ||
              n ||
              showAlert("Your position is no longer being shown!", 5e3, !0)
            : showAlert(
                "A player reached 80%, your position is shown to them!",
                2e4,
                !0,
              );
        cv = V;
      })(V);
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
      })(V);
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
        P.position.set(l, D), (P.visible = !1), (P.alpha = 0.5), a.addChild(P);
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
      })(V);
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
                XV[HV] && (XV[HV].visible = !0),
                (Nc = null),
                (document.getElementById("respawn-gm2").style.display = "none"),
                (document.getElementById("bs-kills").innerHTML = Rz),
                (document.getElementById("bs-deaths").innerHTML = yz),
                (document.getElementById("bs-rounds-won").innerHTML =
                  bz + "/" + Xz),
                (document.getElementById("buy-screen").style.display = "block"),
                (Sc = [!1, !1, !1, !1]),
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
            2 == D && ((Hz = !0), (rz = new Date().getTime())),
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
      })(V);
      break;
    case 45:
      !((z) => {
        var V = z.getUint8(1),
          l = rD[z.getUint8(2)],
          D = z.getInt32(3),
          v = l.progress;
        0 == V
          ? (v.clear(),
            (v.visible = !0),
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
            ? (l.progress.visible = !1)
            : 2 == V &&
              (v.animInterval && clearInterval(v.animInterval),
              v.clear(),
              v.beginFill(AV[2]),
              v.arc(0, 0, l.radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI),
              v.lineTo(0, 0),
              v.endFill());
      })(V);
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
      })(V);
      break;
    case 47:
      !((z) => {
        var V = z.getInt32(1);
        document.getElementById("respawn-button").innerHTML =
          V > 0 ? "Respawn<div>at level " + V + "</div>" : "Respawn";
      })(V);
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
      })(V);
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
          (tV = !0),
          (F["tower-kh"] = PIXI.Texture.fromImage("img/tower-kh.png"));
      })(V);
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
      })(V);
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
      })(V);
      break;
    case 59:
      !((z) => {
        if (Rv) return;
        for (var V = Nl(z, 1).split(";"), l = 0; l < V.length; l++)
          colorNamesNew[l] = V[l];
        zl = !0;
      })(V);
      break;
    case 60:
      !((z) => {
        var V = !1;
        if (!wD) {
          if (
            ((document.getElementById("homepage").style.display = "none"),
            (document.getElementById("homepage").style.display = "none"),
            _D(),
            (V = !0),
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
                Tc(0, !0);
              }),
            document
              .getElementById("spectate-1v1-next-button")
              .addEventListener("click", () => {
                Tc(0, !1);
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
            (wD = !0);
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
      })(V);
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
      })(V);
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
      })(V);
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
          (EV[V].challenged = !1),
          OD());
        if (1 == l || 2 == l)
          for (var V in ((ZV = V), EV)) EV[V].challenged = !1;
      })(V);
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
      })(V);
      break;
    case 98:
      (xz = !0), console.log("Received: kicked for inactivity");
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
      console.log("unhandled message code", l);
  }
}
const defly = {
  answerChallenge: (z, V) => {
    var l = new DataView(new ArrayBuffer(6));
    l.setUint8(0, 15),
      l.setInt32(1, z),
      l.setUint8(5, V ? 1 : 0),
      q.send(l.buffer),
      XD(
        "You " +
          (V ? "accepted" : "rejected") +
          " the challenge from " +
          Cl(EV[z].name),
        "bold",
      );
  },
  confirmChallenge: (z) => {
    if (Vv) {
      if (z) {
        XD("You challenged " + Cl(EV[zv].name), "bold");
        var V = new DataView(new ArrayBuffer(5));
        V.setUint8(0, 14),
          V.setInt32(1, zv),
          q.send(V.buffer),
          (EV[zv].challenged = !0),
          OD();
      }
    } else z && Tc(zv);
    (zv = 0),
      (document.getElementById("gm-1v1-confirm-duel").style.visibility =
        "hidden");
  },
  select1v1Player: (z) => {
    if (z && z != HV) {
      zv = z;
      var V = EV[z];
      if (V.challenged) return !1;
      switch (V.status) {
        case 0:
        case 2:
          (document.getElementById("gm-1v1-confirm-duel-text").innerHTML =
            "Challenge " + Cl(V.name) + " ?"),
            (Vv = !0);
          break;
        case 1:
          (document.getElementById("gm-1v1-confirm-duel-text").innerHTML =
            "Spectate " + Cl(V.name) + " ?"),
            (Vv = !1);
      }
      document.getElementById("gm-1v1-confirm-duel").style.visibility =
        "visible";
    } else
      document.getElementById("gm-1v1-confirm-duel").style.visibility =
        "hidden";
    return !1;
  },
  selectSuperpower: (z) => {
    document.getElementById("choose-superpower").style.display = "none";
    var V = new DataView(new ArrayBuffer(2));
    V.setUint8(0, 6),
      V.setUint8(1, z),
      q.send(V.buffer),
      (oz = z),
      (Zz = 0),
      (document.getElementById("superpower-fuel").style.display = "block"),
      window.event && window.event.preventDefault();
  },
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
};
