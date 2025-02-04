(function() {
    var minimapMobs = {}
      , ignoredPlayerIdSet = {}
      , delayedGraphicsResizeTimer = null
      , isChatBoxVisible = false
      , i = 0
      , isChatHintRemoved = false
      , s = -1
      , a = 0
      , isChatMinimized = false
      , unreadMessageCount = 0
      , isScoreVisible = false
      , getScoresIntervalId = null
      , isContextMenuVisible = false
      , lastClickedPlayerId = null
      , isHelpVisible = false
      , isMainMenuVisible = false
      , isTooltipVisible = false
      , hideTooltipTimer = null
      , y = 0
      , isInviteVisible = false
      , isLoginVisible = false
      , applyPowerupTimer = null
      , isSpectating = false
      , lastPrivateMessage = null
      , chatBoxDimensions = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
      , noticeMessageTimerByType = {
        alert: null,
        information: null,
        default: null,
        destroyed: null
    }
      , noticeMessageVisibleByType = {
        alert: false,
        information: false,
        default: false,
        destroyed: false
    }
      , thisPlayerState = {
        score: -1,
        upgrades: -1,
        earnings: -1,
        kills: -1,
        deaths: -1
    }
      , hugeKillDeathNoticeInfo = false
      , currentUpgradeValueByName = {}
      , listOfPlayersKills = []
      , lastTimePlayerWasKilled = 0
      , aircraftInfoByType = {
        1: ["Predator", 80, 50, 75, 60, "BOOST", "Temporarily increases speed by burning energy"],
        2: ["Goliath", 30, 100, 30, 100, "REPEL", "Repels enemy aircraft and missiles"],
        3: ["Mohawk", 100, 40, 100, 40, "STRAFE", "Enables sideways flight"],
        4: ["Tornado", 60, 70, 50, 80, "MULTIFIRE", "Launches 3 missiles at the same time"],
        5: ["Prowler", 50, 70, 40, 60, "STEALTH", "Becomes invisible to enemy aircraft"],
        101: ["Speed"],
        102: ["Defense"],
        103: ["Energy Regen"],
        104: ["Missile Speed"]
    }
      , emoteById = ["tf", "pepe", "clap", "lol", "bro", "kappa", "cry", "rage"]
      , powerupNameById = ["", "Shield", "Inferno"];
    UI.show = function(e, t) {
        $(e).css({
            display: t ? "inline-block" : "block"
        })
    }
    ,
    UI.hide = function(e) {
        $(e).css({
            display: "none"
        })
    }
    ,
    UI.isEmote = function(e, t) {
        for (var n = 0; n < emoteById.length; n++)
            if (t) {
                if (e === ":" + emoteById[n] + ":")
                    return emoteById[n]
            } else if (e === emoteById[n])
                return emoteById[n];
        return false
    }
    ,
    UI.serverMessage = function(e) {
        var t = "alert";
        2 == e.type && (t = "information"),
        UI.showMessage(t, e.text, e.duration)
    }
    ,
    UI.showMessage = function(e, t, n) {
        $("#msg-" + e).removeClass("hidemsg").removeClass("popmsg"),
        $("#msg-" + e).html(t);
        var r = $("#msg-" + e).height();
        "default" != e && "destroyed" != e || $("#msg-" + e).css({
            "margin-top": "-" + Math.round(r / 2) + "px"
        }),
        $("#msg-" + e).addClass("popmsg"),
        noticeMessageVisibleByType[e] = true,
        clearTimeout(noticeMessageTimerByType[e]),
        noticeMessageTimerByType[e] = setTimeout(UI.hideMessage, n || 2e3, e)
    }
    ,
    UI.hideMessage = function(e) {
        $("#msg-" + e).addClass("hidemsg"),
        noticeMessageVisibleByType[e] = false,
        noticeMessageTimerByType[e] = setTimeout(function(t) {
            $("#msg-" + e).removeClass("popmsg").removeClass("hidemsg"),
            $("#msg-" + t).html("")
        }, 2500, e)
    }
    ,
    UI.wipeAllMessages = function() {
        for (var e in noticeMessageVisibleByType)
            noticeMessageVisibleByType[e] && UI.showMessage(e, "", 100)
    }
    ,
    UI.updateMyLevel = function(e) {
        game.myLevel = e,
        $("#score-rank").html(e),
        $("#lifetime-rank").html(e)
    }
    ,
    UI.newScore = function(scoreUpdateMsg) {
        if (scoreUpdateMsg.id != game.myID)
            return false;
        var t = scoreUpdateMsg.score - game.myScore
          , n = "";
        if (Math.abs(t) < 1 && (t = false),
        game.myScore = scoreUpdateMsg.score,
        scoreUpdateMsg.score != thisPlayerState.score && (thisPlayerState.score = scoreUpdateMsg.score,
        $("#score-score").html(scoreUpdateMsg.score)),
        scoreUpdateMsg.upgrades != thisPlayerState.upgrades) {
            var r = scoreUpdateMsg.upgrades - thisPlayerState.upgrades
              , i = -1 != thisPlayerState.upgrades;
            if (thisPlayerState.upgrades = scoreUpdateMsg.upgrades,
            $("#score-upgrades").html(scoreUpdateMsg.upgrades),
            X(),
            i && r > 0) {
                if (Sound.powerup(4, null),
                hugeKillDeathNoticeInfo && (hugeKillDeathNoticeInfo.msg += "<br>"),
                noticeMessageVisibleByType.default)
                    return n += '&nbsp;&nbsp;<span class="upgrade">+' + r + "</span>",
                    void $("#alert-update").append(n);
                n += '<span id="alert-update"><span class="upgrade">+' + r + '<span class="bold"> upgrade</span></span></span>'
            }
        }
        if (scoreUpdateMsg.earnings != thisPlayerState.earnings && 0 != game.myLevel) {
            thisPlayerState.earnings = scoreUpdateMsg.earnings,
            $("#lifetime-totalbounty").html(scoreUpdateMsg.earnings);
            var o = Math.ceil(Tools.rankToEarnings(game.myLevel + 1) - scoreUpdateMsg.earnings);
            $("#lifetime-nextbounty").html("+" + o)
        }
        if (scoreUpdateMsg.totalkills != thisPlayerState.kills || scoreUpdateMsg.totaldeaths != thisPlayerState.deaths) {
            var s = 0 == scoreUpdateMsg.totalkills || 0 == scoreUpdateMsg.totaldeaths ? "-" : (scoreUpdateMsg.totalkills / scoreUpdateMsg.totaldeaths).toFixed(2);
            $("#lifetime-kdratio").html(s)
        }
        scoreUpdateMsg.totalkills != thisPlayerState.kills && (thisPlayerState.kills = scoreUpdateMsg.totalkills,
        $("#lifetime-kills").html(scoreUpdateMsg.totalkills)),
        scoreUpdateMsg.totaldeaths != thisPlayerState.deaths && (thisPlayerState.deaths = scoreUpdateMsg.totaldeaths,
        $("#lifetime-deaths").html(scoreUpdateMsg.totaldeaths)),
        t && (hugeKillDeathNoticeInfo && (hugeKillDeathNoticeInfo.msg += "<br>"),
        n += UI.getScoreString(t)),
        hugeKillDeathNoticeInfo ? (UI.showMessage(hugeKillDeathNoticeInfo.type, hugeKillDeathNoticeInfo.msg + n, hugeKillDeathNoticeInfo.duration),
        hugeKillDeathNoticeInfo = false) : "" != n && UI.showMessage("default", n, 3e3)
    }
    ,
    UI.getScoreString = function(e, t, n) {
        var r = "positive"
          , i = "+";
        return e < 0 && (r = "negative",
        i = "-"),
        t && (r = t),
        '<span id="alert-update" class="' + r + '">' + i + Math.abs(e) + "</span>"
    }
    ;
    var updateMinimapMob = function(minimapMob) {
        minimapMob.sprite.position.set(game.screenX - config.minimapPaddingX - config.minimapSize * ((16384 - minimapMob.x) / 32768), game.screenY - config.minimapPaddingY - config.minimapSize / 2 * ((8192 - minimapMob.y) / 16384))
    };
    UI.wipeAllMinimapMobs = function() {
        for (var playerId in minimapMobs)
            game.graphics.layers.ui1.removeChild(minimapMobs[playerId].sprite),
            minimapMobs[playerId].sprite.destroy(),
            delete minimapMobs[playerId]
    }
    ,
    UI.showSpectator = function(e) {
        if (!isSpectating) {
            var t = config.mobile ? ' class="mobile"' : "";
            $("body").append('<div id="spectator"' + t + "></div>"),
            isSpectating = true
        }
        $("#spectator").html(e),
        Input.addTouchRejection("#spectator")
    }
    ,
    UI.hideSpectator = function() {
        isSpectating && ($("#spectator").remove(),
        isSpectating = false)
    }
    ,
    UI.addPowerup = function(e, t) {
        null != applyPowerupTimer && clearTimeout(applyPowerupTimer);
        var n = '<div class="powerup" id="powerup-' + e + '"><div class="percent ' + (1 == e ? "shield" : "rampage") + '" id="powerup-' + e + '-percent" style="transition: width ' + t + 'ms linear;"></div><div class="name">' + powerupNameById[e] + "</div></div>";
        $("#powerups").html(n),
        $("#powerup-" + e + "-percent").width(),
        $("#powerup-" + e + "-percent").css({
            width: "7%"
        }),
        applyPowerupTimer = setTimeout(function() {
            $("#powerup-" + e).remove()
        }, t)
    }
    ,
    UI.resetPowerups = function() {
        $("#powerups").html("")
    }
    ,
    UI.changeMinimapTeam = function(playerId, team) {
        if (null != minimapMobs[playerId] && null != minimapMobs[playerId].sprite) {
            var r = 1 == team ? "minimapBlue" : "minimapMob";
            minimapMobs[playerId].sprite.texture = Textures.getNamed(r)
        }
    }
    ,
    UI.scoreboardUpdate = function(msgData, msgRankings, maxScoreboard) {
        for (var i, o, s, a, l, u = 0, c = "", h = {}, d = false, p = 0, f = {}, g = "", m = "", v = "", y = 0; y < msgRankings.length; y++)
            null != (i = Players.get(msgRankings[y].id)) && (f = Tools.decodeMinimapCoords(msgRankings[y].x, msgRankings[y].y),
            i.lowResPos.x = f.x,
            i.lowResPos.y = f.y,
            msgRankings[y].id != game.myID ? 0 == msgRankings[y].x && 0 == msgRankings[y].y || (h[i.id] = true,
            null == minimapMobs[msgRankings[y].id] ? (v = "minimapMob",
            2 == game.gameType && 1 == i.team && (v = "minimapBlue"),
            minimapMobs[msgRankings[y].id] = {
                sprite: Textures.init(v),
                x: f.x,
                y: f.y
            }) : (minimapMobs[msgRankings[y].id].x = f.x,
            minimapMobs[msgRankings[y].id].y = f.y),
            updateMinimapMob(minimapMobs[msgRankings[y].id])) : p = y + 1);
        for (var b in minimapMobs)
            null == h[b] && (game.graphics.layers.ui1.removeChild(minimapMobs[b].sprite),
            minimapMobs[b].sprite.destroy(),
            delete minimapMobs[b]);
        if (0 != p) {
            maxScoreboard = maxScoreboard ? Tools.clamp(maxScoreboard, 1, msgData.length) : msgData.length;
            for (y = 0; y < maxScoreboard && (null == (i = Players.get(msgData[y].id)) || (u++,
            o = 1 == u ? '<span class="badge scoreboard gold"></span>' : 2 == u ? '<span class="badge scoreboard silver"></span>' : 3 == u ? '<span class="badge scoreboard bronze"></span>' : u + ".",
            s = i.me() ? " sel" : "",
            a = msgData[y].score,
            l = msgData[y].level,
            p > maxScoreboard && u == maxScoreboard - 1 && (c += '<div class="line dottedline">&middot; &middot; &middot;</div>',
            true,
            i = Players.get(game.myID),
            o = p + ".",
            a = game.myScore,
            l = game.myLevel,
            s = " sel",
            d = true),
            g = "",
            2 == game.gameType && (g = " team-" + i.team),
            m = "",
            4 == (o + "").length && (m = " bigger"),
            c += '<div class="line' + s + '"><span class="place' + m + '">' + o + '</span><span class="flag small flag-' + i.flag + '"></span><span class="nick' + g + '">' + UI.escapeHTML(i.name) + "</span>" + (0 == l ? "" : '<span class="holder">&nbsp;<span class="rank">' + l + "</span></span>") + '<span class="score">' + N(a) + "</span></div>",
            !d)); y++)
                ;
            $("#scoreboard").html(c)
        }
    }
    ;
    var N = function(e) {
        var t = "";
        e += "";
        for (var n = 0; n < e.length; n++)
            t += "<span>" + e[n] + "</span>";
        return t
    };
    UI.toggleChatBox = function(e) {
        if (!config.mobile)
            if (isChatBoxVisible) {
                if (isChatBoxVisible = false,
                e) {
                    var t = $("#chatinput").val();
                    "" !== t && "" !== t.trim() && (UI.parseCommand(t.trim()) || Network.sendChat(t)),
                    removeChatHint()
                }
                UI.hide("#chatinput"),
                $("#chatinput").val(""),
                $("#chatinput").blur()
            } else
                isChatMinimized && UI.maximizeChat(),
                Input.clearKeys(true),
                isChatBoxVisible = true,
                UI.show("#chatinput"),
                $("#chatinput").focus()
    }
    ,
    UI.shortcutChat = function(e) {
        isChatBoxVisible || ($("#chatinput").val(e),
        UI.toggleChatBox())
    }
    ;
    var removeChatHint = function() {
        isChatHintRemoved || (isChatHintRemoved = true,
        $("#chat-0").length && $("#chat-0").remove())
    };
    UI.parseCommand = function(e) {
        if ("/" !== e[0])
            return false;
        var t = e.split(" ")
          , n = t[0].substr(1).toLowerCase();
        if (0 == n.length)
            return false;
        if ("s" === n) {
            var r = e.indexOf(" ")
              , i = e.substr(r + 1);
            i.length > 0 && Network.sendSay(i)
        } else if ("t" === n) {
            r = e.indexOf(" ");
            var o = e.substr(r + 1);
            o.length > 0 && Network.sendTeam(o)
        } else if ("ignore" === n) {
            null == (s = Players.getByName(unescapePlayerName(t[1]))) ? UI.addChatMessage("Unknown player") : UI.chatIgnore(s.id)
        } else if ("unignore" === n) {
            null == (s = Players.getByName(unescapePlayerName(t[1]))) ? UI.addChatMessage("Unknown player") : UI.chatUnignore(s)
        } else if ("votemute" === n) {
            null == (s = Players.getByName(unescapePlayerName(t[1]))) ? UI.addChatMessage("Unknown player") : UI.chatVotemute(s)
        } else if ("w" === n)
            t.length >= 3 ? UI.chatWhisper(t[1], e.substr(4 + t[1].length)) : UI.addChatMessage("Usage: /w player message");
        else if ("spectate" === n) {
            var s;
            null == (s = Players.getByName(unescapePlayerName(t[1]))) ? UI.addChatMessage("Unknown player") : Network.sendCommand("spectate", s.id + "")
        } else
            "flag" === n || "flags" === n ? 2 == t.length ? Network.sendCommand("flag", e.substr(n.length + 2)) : UI.addChatMessage("Type /flag XX where XX is the 2-letter ISO code of a country", true) : "emotes" === n ? UI.addChatMessage("Emotes available: /tf /pepe /clap /lol /bro /kappa /cry /rage", true) : "help" === n ? UI.toggleHelp() : "debug" === n || (UI.isEmote(n) ? Network.sendSay(":" + n + ":") : Network.sendCommand(n, e.substr(n.length + 2)));
        return true
    }
    ,
    UI.addChatLine = function(msg, text, msgType) {
        if (!ignoredPlayerIdSet[msg.id]) {
            i++;
            if (0 == msgType)
                var o = '<div id="chat-' + i + '" class="line"><span class="playersel" data-playerid="' + msg.id + '"><span class="flag small flag-' + msg.flag + '"></span><span class="nick">' + UI.escapeHTML(msg.name) + '</span></span><span class="text">' + UI.escapeHTML(text) + "</span></div>";
            else if (1 == msgType || 2 == msgType) {
                var a = 1 == msgType ? "TO" : "FROM";
                2 == msgType && (lastPrivateMessage = escapePlayerName(msg.name));
                o = '<div id="chat-' + i + '" class="line"><span class="tag whisper">' + a + '</span><span class="playersel" data-playerid="' + msg.id + '"><span class="nick green">' + UI.escapeHTML(msg.name) + '</span></span><span class="text green">' + UI.escapeHTML(text) + "</span></div>";
                s = -1
            } else {
                o = '<div id="chat-' + i + '" class="line"><span class="tag team">TEAM</span><span class="playersel" data-playerid="' + msg.id + '"><span class="nick blue">' + UI.escapeHTML(msg.name) + '</span></span><span class="text blue">' + UI.escapeHTML(text) + "</span></div>";
                s = -1
            }
            var c = "#chat-" + (i - config.maxChatLines);
            if ($(c).length && $(c).remove(),
            $("#chatlines").append(o),
            isChatMinimized)
                unreadMessageCount++,
                $("#chatunreadlines").html(unreadMessageCount),
                1 == unreadMessageCount && UI.show("#chatunreadlines", true);
            else {
                var h = $("#chatbox");
                1 != msgType && 2 != msgType && msg.id != game.myID && h.is(":hover") || (h.perfectScrollbar("update"),
                h.scrollTop(h[0].scrollHeight))
            }
        }
    }
    ,
    UI.addChatMessage = function(e, t) {
        a = 0,
        s = -1;
        var n = '<div id="chat-' + ++i + '" class="line">' + (t ? "" : '<span class="nick">⚠</span>') + '<span class="text">' + e + "</span></div>"
          , r = "#chat-" + (i - config.maxChatLines);
        $(r).length && $(r).remove(),
        $("#chatlines").append(n);
        var o = $("#chatbox");
        o.perfectScrollbar("update"),
        o.scrollTop(o[0].scrollHeight)
    }
    ,
    UI.showChatLevel = function(e) {
        var t = null;
        2 == e ? t = "Type /flag XX where XX is the 2-letter ISO code of a country" : 3 == e ? t = "Emotes available: /tf /pepe /clap /lol /bro /kappa /cry /rage" : 4 == e && (t = "Flag Pack #1: communist confederate imperial rainbow jolly"),
        null != t && UI.addChatMessage(t, true)
    }
    ,
    UI.updateStats = function(e) {
        var t = e.playerstotal
          , n = "";
        n += '<div class="item"><span class="icon-container"><div class="icon players"></div></span><span class="greyed">' + e.playersgame + "&nbsp;/&nbsp;</span>" + t + '<span class="icon-container padded"><div class="icon ping"></div></span>' + e.ping + '<span class="millis">ms</span></div>',
        $("#gameinfo").html(n),
        game.ping = e.ping
    }
    ,
    UI.sayLine = function(e) {
        Players.say(e)
    }
    ,
    UI.escapeHTML = function(e) {
        return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;").replace(/`/g, "&#x60;")
    }
    ;
    var onWindowResize = function() {
        var width = window.innerWidth
          , height = window.innerHeight;
        width == game.screenX && height == game.screenY || (clearTimeout(delayedGraphicsResizeTimer),
        delayedGraphicsResizeTimer = setTimeout(function() {
            Graphics.resizeRenderer(width, height)
        }, 250))
    };
    UI.controlKey = function(e, t, n) {
        if (game.state != Network.STATE.PLAYING)
            return true;
        if (n)
            if (13 != e) {
                if (27 == e)
                    return isChatBoxVisible && UI.toggleChatBox(false),
                    void UI.closeAllPanels();
                if (191 != e)
                    if (75 != e)
                        switch (t) {
                        case "SHOWSCORE":
                            UI.toggleScore();
                            break;
                        case "MAINMENU":
                            UI.toggleMainMenu();
                            break;
                        case "SHOWGAMES":
                            Games.toggleGames();
                            break;
                        case "FULLSCREEN":
                            Graphics.toggleFullscreen(),
                            Input.clearKeys();
                            break;
                        case "MINIMIZECHAT":
                            UI.minimizeChat();
                            break;
                        case "MAXIMIZECHAT":
                            UI.maximizeChat();
                            break;
                        case "SAY":
                            UI.shortcutChat("/s ");
                            break;
                        case "TEAM":
                            UI.shortcutChat("/t ");
                            break;
                        case "REPLY":
                            null != lastPrivateMessage && UI.shortcutChat("/w " + lastPrivateMessage + " ");
                            break;
                        case "SPECTATE":
                            Network.spectateForce();
                            break;
                        case "UPGRADE1":
                            UI.selectUpgrade(1);
                            break;
                        case "UPGRADE2":
                            UI.selectUpgrade(2);
                            break;
                        case "UPGRADE3":
                            UI.selectUpgrade(3);
                            break;
                        case "UPGRADE4":
                            UI.selectUpgrade(4);
                            break;
                        case "SOUND":
                            Sound.toggle();
                            break;
                        case "HELP":
                            UI.toggleHelp();
                            break;
                        case "INVITE":
                            UI.toggleInvite();
                            break;
                        case "MOUSEMODE":
                            Input.toggleMouse()
                        }
                    else
                        Input.toggleKeybinds();
                else
                    UI.shortcutChat("/")
            } else
                UI.toggleChatBox(true)
    }
    ,
    UI.chatBoxOpen = function() {
        return isChatBoxVisible
    }
    ,
    UI.setupMinimap = function() {
        game.graphics.gui.minimap = Textures.init("minimap"),
        game.graphics.gui.minimap_box = Textures.init("minimapBox"),
        UI.resizeMinimap(),
        UI.visibilityMinimap(false)
    }
    ,
    UI.visibilityMinimap = function(isVisible) {
        game.graphics.gui.minimap.visible = isVisible,
        game.graphics.gui.minimap_box.visible = isVisible
    }
    ,
    UI.resizeMinimap = function() {
        game.graphics.gui.minimap.scale.set(config.minimapSize / 512),
        game.graphics.gui.minimap.position.set(game.screenX - config.minimapPaddingX, game.screenY - config.minimapPaddingY),
        game.graphics.gui.minimap_box.scale.set(.03 + 2 * config.minimapSize * (game.screenX / game.scale / 32768) / 64, .03 + config.minimapSize * (game.screenY / game.scale / 16384) / 64);
        for (var playerId in minimapMobs)
            updateMinimapMob(minimapMobs[playerId]);
        Games.update(true)
    }
    ,
    UI.setupHUD = function() {
        game.graphics.gui.hudHealth_shadow = Textures.init("hudHealth_shadow"),
        game.graphics.gui.hudHealth = Textures.init("hudHealth"),
        game.graphics.gui.hudHealth_mask = Textures.init("hudHealth_mask"),
        game.graphics.gui.hudHealth_mask.blendMode = PIXI.BLEND_MODES.LUMINOSITY,
        game.graphics.gui.hudHealth.rotation = -1.5,
        game.graphics.gui.hudHealth.position.set(330, 174),
        game.graphics.gui.hudHealth_mask.position.set(330, 174),
        game.graphics.gui.hudEnergy_shadow = Textures.init("hudEnergy_shadow"),
        game.graphics.gui.hudEnergy = Textures.init("hudEnergy"),
        game.graphics.gui.hudEnergy_mask = Textures.init("hudEnergy_mask"),
        game.graphics.gui.hudEnergy_mask.blendMode = PIXI.BLEND_MODES.LUMINOSITY,
        game.graphics.gui.hudEnergy.position.set(-250, 174),
        game.graphics.gui.hudEnergy_mask.position.set(-250, 174),
        UI.resizeHUD(),
        UI.visibilityHUD(false)
    }
    ,
    UI.visibilityHUD = function(e) {
        game.graphics.gui.hudHealth_shadow.visible = e,
        game.graphics.gui.hudHealth.visible = e,
        game.graphics.gui.hudEnergy_shadow.visible = e,
        game.graphics.gui.hudEnergy.visible = e
    }
    ,
    UI.resizeHUD = function() {
        var e = .5 * game.scale
          , t = game.halfScreenX - 30 * game.scale
          , n = game.halfScreenX + 30 * game.scale;
        game.graphics.gui.hudHealth_shadow.scale.set(e),
        game.graphics.gui.hudEnergy_shadow.scale.set(e),
        game.graphics.gui.hudHealth_shadow.position.set(t, game.halfScreenY),
        game.graphics.gui.hudEnergy_shadow.position.set(n, game.halfScreenY),
        game.graphics.gui.hudSpriteHealth.scale.set(e),
        game.graphics.gui.hudSpriteHealth.position.set(t, game.halfScreenY),
        game.graphics.gui.hudSpriteEnergy.scale.set(e),
        game.graphics.gui.hudSpriteEnergy.position.set(n, game.halfScreenY)
    }
    ,
    UI.selectAircraft = function(e) {
        Network.sendCommand("respawn", e + "")
    }
    ,
    UI.aircraftSelected = function(e) {
        e = parseInt(e);
        for (var t = 1; t <= 5; t++)
            t == e ? $("#selectaircraft-" + t).addClass("sel") : $("#selectaircraft-" + t).removeClass("sel")
    }
    ,
    UI.killed = function(playerKillMsg) {
        var t = null == playerKillMsg.level ? "" : '<span class="level">' + playerKillMsg.level + "</span>";
        (game.time - lastTimePlayerWasKilled > 1500 || listOfPlayersKills.length >= 6) && (listOfPlayersKills = []),
        lastTimePlayerWasKilled = game.time,
        listOfPlayersKills.push([playerKillMsg.flag, playerKillMsg.name, t]);
        for (var n = "", r = "", i = 0; i < listOfPlayersKills.length; i++)
            r = listOfPlayersKills[i][1],
            1 != listOfPlayersKills.length && r.length > 10 && (r = r.substr(0, 10) + "..."),
            n += '<span class="player"><span class="flag big flag-' + listOfPlayersKills[i][0] + '"></span>' + UI.escapeHTML(r) + listOfPlayersKills[i][2] + "</span>";
        hugeKillDeathNoticeInfo = {
            type: "default",
            duration: 3e3,
            msg: "You have destroyed" + n
        }
    }
    ,
    UI.killedBy = function(playerKillMsg) {
        var t = null == playerKillMsg.level ? "" : '<span class="level">' + playerKillMsg.level + "</span>";
        hugeKillDeathNoticeInfo = {
            type: "destroyed",
            duration: 3e3,
            msg: 'Destroyed by<span class="playerbig"><span class="flag big flag-' + playerKillMsg.flag + '"></span>' + UI.escapeHTML(playerKillMsg.name) + t + "</span>"
        }
    }
    ,
    UI.errorHandler = function(e) {
        switch (e.error) {
        case 1:
            UI.showMessage("alert", '<span class="info">DISCONNECTED</span>Packet flooding detected', 2e4),
            Network.receivedError(e.error);
            break;
        case 2:
            UI.showMessage("alert", '<span class="info">BANNED</span>Packet flooding detected', 2e4),
            Network.receivedError(e.error);
            break;
        case 3:
            UI.showMessage("alert", '<span class="info">BANNED</span>You have been globally banned', 2e4),
            Network.receivedError(e.error);
            break;
        case 4:
            Network.receivedError(e.error),
            Games.redirRoot();
            break;
        case 5:
            UI.showMessage("alert", '<span class="info">RESPAWN</span>Full health and 2 seconds of inactivity required', 3e3);
            break;
        case 6:
            UI.showMessage("alert", '<span class="info">DISCONNECTED</span>AFK for more than 10 minutes<br><span class="button" onclick="Network.reconnect()">RECONNECT</span>', 72e5),
            Network.receivedError(e.error);
            break;
        case 7:
            UI.showMessage("alert", '<span class="info">DISCONNECTED</span>You have been kicked out', 2e4),
            Network.receivedError(e.error);
            break;
        case 8:
            UI.showMessage("alert", '<span class="info">DISCONNECTED</span>Invalid login data', 2e4),
            Network.receivedError(e.error);
            break;
        case 9:
            UI.showMessage("alert", '<span class="info">DISCONNECTED</span>Incorrect protocol level<br>Please clear your browser cache and refresh', 2e4),
            Network.receivedError(e.error);
            break;
        case 10:
            UI.showMessage("alert", '<span class="info">BANNED</span>Account banned', 2e4),
            Network.receivedError(e.error);
            break;
        case 11:
            UI.showMessage("alert", '<span class="info">DISCONNECTED</span>Account already logged in<br><span class="button" onclick="Network.reconnect()">RECONNECT</span>', 2e4),
            Network.receivedError(e.error);
            break;
        case 12:
            UI.showMessage("alert", '<span class="info">RESPAWN</span>Cannot respawn or change aircraft in a Battle Royale game', 3e3);
            break;
        case 13:
            UI.showMessage("alert", '<span class="info">SPECTATE</span>Full health and 2 seconds of inactivity required', 3e3);
            break;
        case 20:
            UI.showMessage("information", '<span class="info">UPGRADE</span>Not enough upgrade points', 3e3);
            break;
        case 30:
            UI.addChatMessage("Chat throttled to prevent spamming");
            break;
        case 31:
            UI.showMessage("alert", '<span class="info">THROTTLED</span>Flag change too fast');
            break;
        case 100:
            UI.addChatMessage("Unknown command")
        }
    }
    ,
    UI.showCommandReply = function(e) {
        if (0 == e.type)
            UI.addChatMessage(UI.escapeHTML(e.text));
        else {
            var t = JSON.stringify(JSON.parse(e.text), null, "    ")
              , n = '<div class="close" onclick="$(this).parent().remove()"></div><div class="text"><pre>' + UI.escapeHTML(t) + "</pre></div>";
            $("body").append('<div id="debugpopup" oncontextmenu="event.stopPropagation()">' + n + "</div>")
        }
    }
    ,
    UI.updateHUD = function(e, t, n) {
        e = Tools.clamp(e, 0, 1),
        t = Tools.clamp(t, 0, 1),
        game.graphics.gui.hudHealth.rotation = -1.1 * (1 - e),
        game.graphics.gui.hudEnergy.rotation = Math.PI + 1.1 * (1 - t),
        game.graphics.gui.hudHealth.tint = e > .5 ? Tools.colorLerp(13487404, 2591785, 2 * (e - .5)) : Tools.colorLerp(12201261, 13487404, 2 * e);
        var r = 3374821;
        n && (r = t < config.ships[n.type].energyLight ? 2841755 : 3374821),
        game.graphics.gui.hudEnergy.tint = r
    }
    ,
    UI.minimizeChat = function(e) {
        isChatMinimized || (isChatBoxVisible && UI.toggleChatBox(),
        isChatMinimized = true,
        unreadMessageCount = 0,
        UI.hide("#chatbox"),
        UI.hide("#chatunreadlines"),
        UI.show("#maximizechat"),
        e && e.stopPropagation())
    }
    ,
    UI.maximizeChat = function() {
        if (isChatMinimized) {
            isChatMinimized = false,
            UI.hide("#maximizechat"),
            UI.hide("#chatunreadlines"),
            UI.show("#chatbox");
            var e = $("#chatbox");
            e.scrollTop(e[0].scrollHeight)
        }
    }
    ,
    UI.closeScore = function() {
        isScoreVisible && (UI.hidePanel("#scoredetailed"),
        isScoreVisible = false,
        clearInterval(getScoresIntervalId))
    }
    ,
    UI.openScore = function() {
        isScoreVisible || (UI.closeAllPanels("score"),
        UI.showPanel("#scoredetailed"),
        isScoreVisible = true,
        Network.getScores(),
        clearInterval(getScoresIntervalId),
        getScoresIntervalId = setInterval(Network.getScores, 5e3))
    }
    ,
    UI.toggleScore = function() {
        isScoreVisible ? UI.closeScore() : UI.openScore()
    }
    ,
    UI.openLogin = function() {
        isLoginVisible || (UI.showPanel("#loginselector"),
        isLoginVisible = true,
        Games.closeDropdowns())
    }
    ,
    UI.closeLogin = function() {
        isLoginVisible && (UI.hidePanel("#loginselector"),
        isLoginVisible = false)
    }
    ,
    UI.showPanel = function(e) {
        var t = .9
          , n = 1;
        config.phone && (t *= .7,
        n *= .7),
        $(e).css({
            display: "block",
            opacity: "0",
            transform: "scale(" + t + ")",
            "pointer-events": "auto"
        }),
        $(e).width(),
        $(e).css({
            opacity: "1",
            transform: "scale(" + n + ")",
            transition: "all 0.75s cubic-bezier(0.23, 1, 0.32, 1)"
        }),
        "#custom-msg" != e && Sound.UIClick()
    }
    ,
    UI.hidePanel = function(e, t, n) {
        if ("#custom-msg" != e || $("#custom-msg").length) {
            var r = .9;
            config.phone && (r *= .7),
            $(e).css({
                opacity: "0",
                transform: "scale(" + r + ")",
                "pointer-events": "none"
            }),
            Sound.UIClick(),
            setTimeout(function(e) {
                if (!("#mainmenu" === e ? isMainMenuVisible : "#scoredetailed" === e ? isScoreVisible : "#howtoplay" === e ? isHelpVisible : "#invitefriends" === e ? isInviteVisible : "#loginselector" === e ? isLoginVisible : t)) {
                    if (n)
                        return void $(e).remove();
                    $(e).css({
                        display: "none",
                        transform: "none",
                        transition: "none"
                    })
                }
            }, 800, e)
        }
    }
    ,
    UI.openInvite = function() {
        isInviteVisible || (UI.closeAllPanels("invite"),
        game.inviteLink = "https://airma.sh/#" + game.playRegion + "-" + game.playRoom,
        $("#invite-link").html(game.inviteLink),
        $("#invite-link").attr("href", game.inviteLink),
        UI.showPanel("#invitefriends"),
        isInviteVisible = true)
    }
    ,
    UI.closeInvite = function() {
        isInviteVisible && (UI.hidePanel("#invitefriends"),
        isInviteVisible = false)
    }
    ,
    UI.toggleInvite = function() {
        isInviteVisible ? UI.closeInvite() : UI.openInvite()
    }
    ,
    UI.closeMainMenu = function() {
        isMainMenuVisible && (UI.hidePanel("#mainmenu"),
        isMainMenuVisible = false)
    }
    ,
    UI.updateMainMenuSettings = function() {
        config.settings.hidpi ? $("#mainmenu-hidpi-tick").addClass("ticked") : $("#mainmenu-hidpi-tick").removeClass("ticked")
    }
    ,
    UI.openMainMenu = function() {
        isMainMenuVisible || (UI.closeAllPanels("mainmenu"),
        UI.updateMainMenuSettings(),
        UI.showPanel("#mainmenu"),
        isMainMenuVisible = true)
    }
    ,
    UI.toggleMainMenu = function() {
        isMainMenuVisible ? UI.closeMainMenu() : UI.openMainMenu()
    }
    ,
    UI.closeAllPanels = function(e) {
        "mainmenu" !== e && UI.closeMainMenu(),
        "score" !== e && UI.closeScore(),
        "help" !== e && UI.hideHelp(),
        "games" !== e && Games.closeGames(),
        "invite" !== e && UI.closeInvite(),
        "login" !== e && UI.closeLogin(),
        "keybinds" !== e && Input.closeKeybinds(),
        $("#custom-msg").length && UI.hidePanel("#custom-msg", false, true)
    }
    ;
    var B = function(e) {
        return (e = Math.round(e)) < 1e3 ? e : e < 1e5 ? (e / 1e3).toFixed(1) + " K" : e < 1e6 ? Math.round(e / 1e3) + " K" : (e / 1e6).toFixed(1) + " M"
    };
    UI.updateScore = function(e) {
        if (isScoreVisible) {
            var t = e.scores
              , n = ["gold", "silver", "bronze"];
            t.sort(function(e, t) {
                return t.score - e.score
            });
            var r = [["name", "&nbsp;"], ["kills", "Kills"], ["deaths", "Deaths"], ["damage", "Damage"], ["bounty", "Bounty"], ["rank", "Level"], ["ping", "Ping"]];
            e.c == Network.SERVERPACKET.SCORE_DETAILED_BTR ? r = [["name", "&nbsp;"], ["wins", "&nbsp;"], ["kills", "Kills"], ["deaths", "Deaths"], ["bounty", "Bounty"], ["rank", "Level"], ["ping", "Ping"]] : e.c == Network.SERVERPACKET.SCORE_DETAILED_CTF && (r = [["name", "&nbsp;"], ["captures", "&nbsp;"], ["kills", "Kills"], ["deaths", "Deaths"], ["bounty", "Bounty"], ["rank", "Level"], ["ping", "Ping"]]);
            for (var i = "", o = 0; o < r.length; o++)
                i += '<div class="' + r[o][0] + '">' + r[o][1] + "</div>";
            for (var s, a, l, u = "", h = "", d = -1, p = -1, f = 0; f < t.length; f++)
                null != (s = Players.get(t[f].id)) && (a = f <= 2 ? '&nbsp;<div class="badge detail ' + n[f] + '"></div>' : f + 1 + ".",
                l = s.me() ? " sel" : "",
                u = e.c == Network.SERVERPACKET.SCORE_DETAILED_CTF ? " team-" + s.team : e.c != Network.SERVERPACKET.SCORE_DETAILED_BTR || t[f].alive ? "" : " inactive",
                h += '<div class="item' + l + '"><div class="name"><div class="position">',
                h += a + '</div><div class="flag small flag-' + s.flag + '"></div>',
                h += '<div class="player' + u + '">' + UI.escapeHTML(s.name) + "</div></div>",
                e.c == Network.SERVERPACKET.SCORE_DETAILED_BTR && (0 == t[f].wins ? h += '<div class="wins">&nbsp;</div>' : h += '<div class="wins">' + t[f].wins + '<div class="wins-container">&nbsp;<div class="wins-icon"></div></div></div>'),
                e.c == Network.SERVERPACKET.SCORE_DETAILED_CTF && (0 == t[f].captures ? h += '<div class="captures">&nbsp;</div>' : h += '<div class="captures">' + t[f].captures + '<div class="captures-container">&nbsp;<div class="captures-icon"></div></div></div>'),
                h += '<div class="kills">' + t[f].kills + "</div>",
                h += '<div class="deaths">' + t[f].deaths + "</div>",
                e.c == Network.SERVERPACKET.SCORE_DETAILED && (h += '<div class="damage">' + B(t[f].damage) + "</div>"),
                h += '<div class="bounty">' + t[f].score + "</div>",
                h += '<div class="rank">' + (0 == t[f].level ? "&nbsp;" : t[f].level) + "</div>",
                h += '<div class="ping">' + t[f].ping + '<span class="ms">ms</span></div>',
                h += "</div>",
                e.c == Network.SERVERPACKET.SCORE_DETAILED ? t[f].damage > d && (d = t[f].damage,
                p = s) : e.c == Network.SERVERPACKET.SCORE_DETAILED_CTF ? t[f].captures > d && (d = t[f].captures,
                p = s) : t[f].kills > d && (d = t[f].kills,
                p = s));
            var g = ""
              , m = "";
            if (t.length > 1 && (g = "&bull;&nbsp;&nbsp;" + t.length + " players",
            d > 0)) {
                if (e.c == Network.SERVERPACKET.SCORE_DETAILED)
                    var v = B(d)
                      , y = " damage";
                else {
                    v = d + "",
                    y = e.c == Network.SERVERPACKET.SCORE_DETAILED_CTF ? " capture" : " kill";
                    d > 1 && (y += "s")
                }
                m = '<div class="mvpbadge">MVP</div><div class="flag flag-' + p.flag + '"></div><div class="name">' + UI.escapeHTML(p.name) + '</div><div class="damage">&nbsp;&nbsp;&bull;&nbsp;&nbsp;' + v + y + "</div>"
            }
            $("#scoreplayers").html(g),
            $("#scoretable").html(i),
            $("#scorecontainer").html(h),
            $("#scoremvp").html(m)
        }
    }
    ,
    UI.popMenu = function(e, n) {
        if (game.state == Network.STATE.LOGIN)
            return Games.closeDropdowns(),
            void UI.closeLogin();
        n || game.state != Network.STATE.PLAYING || UI.closeAllPanels();
        var r = $(e.target).parent().data("playerid");
        if (null == r && (r = $(e.target).data("playerid")),
        null != r && r != game.myID) {
            var i = Players.get(r);
            if (null == i)
                return true;
            var o = {
                left: "20px",
                top: $(e.target).parent()[0].getBoundingClientRect().top - 166 + "px"
            };
            isContextMenuVisible || (o.display = "block",
            isContextMenuVisible = true);
            var s = null == ignoredPlayerIdSet[i.id] ? "Ignore" : "Unignore"
              , a = '<div class="header">' + UI.escapeHTML(i.name) + '</div><div class="item" onclick="UI.contextWhisper()">Whisper</div><div class="item" onclick="UI.context' + s + '()">' + s + '</div><div class="item" onclick="UI.contextVotemute()">Vote mute</div><div class="arrow"></div>';
            return $("#contextmenu").html(a),
            $("#contextmenu").css(o),
            lastClickedPlayerId = i.id,
            e.stopPropagation(),
            false
        }
        UI.closeMenu()
    }
    ;
    var escapePlayerName = function(playerName) {
        return (playerName + "").replace(/&/g, "&a;").replace(/ /g, "&s;")
    }
      , unescapePlayerName = function(e) {
        return (e + "").replace(/&s;/g, " ").replace(/&a;/g, "&")
    };
    UI.chatWhisper = function(playerName, t) {
        playerName = unescapePlayerName(playerName);
        var n = Players.getByName(playerName);
        null != n ? Network.sendWhisper(n.id, t) : UI.addChatMessage("Unknown player")
    }
    ,
    UI.chatIgnore = function(e) {
        var n = Players.get(e);
        null != n && e != game.myID && null == ignoredPlayerIdSet[n.id] && (ignoredPlayerIdSet[n.id] = true,
        UI.addChatMessage("Ignoring player " + UI.escapeHTML(n.name) + "&nbsp;&nbsp;&bull;&nbsp;&nbsp;To unignore type /unignore " + UI.escapeHTML(escapePlayerName(n.name)), true))
    }
    ,
    UI.chatUnignore = function(e) {
        ignoredPlayerIdSet[e.id] && (delete ignoredPlayerIdSet[e.id],
        UI.addChatMessage("Removed player " + UI.escapeHTML(e.name) + " from ignore list", true))
    }
    ,
    UI.chatVotemute = function(e) {
        if (e.id != game.myID) {
            Network.voteMute(e.id);
            var t = Math.floor(Math.sqrt(Players.count()[1])) + 1;
            UI.addChatMessage("Voted to mute " + UI.escapeHTML(e.name) + "&nbsp;&nbsp;&bull;&nbsp;&nbsp;" + t + " total votes are required", true)
        }
    }
    ,
    UI.chatVotemutePass = function(e) {
        UI.addChatMessage("The vote to mute " + UI.escapeHTML(e.name) + " has passed", true)
    }
    ,
    UI.chatMuted = function() {
        UI.addChatMessage("You have been muted")
    }
    ,
    UI.contextWhisper = function() {
        if (null != lastClickedPlayerId) {
            var e = Players.get(lastClickedPlayerId);
            null != e && lastClickedPlayerId != game.myID && UI.shortcutChat("/w " + escapePlayerName(e.name) + " ")
        }
    }
    ,
    UI.contextIgnore = function() {
        null != lastClickedPlayerId && lastClickedPlayerId != game.myID && UI.chatIgnore(lastClickedPlayerId)
    }
    ,
    UI.contextUnignore = function() {
        if (null != lastClickedPlayerId) {
            var e = Players.get(lastClickedPlayerId);
            null != e && lastClickedPlayerId != game.myID && UI.chatUnignore(e)
        }
    }
    ,
    UI.contextVotemute = function() {
        if (null != lastClickedPlayerId) {
            var e = Players.get(lastClickedPlayerId);
            null != e && lastClickedPlayerId != game.myID && UI.chatVotemute(e)
        }
    }
    ,
    UI.closeMenu = function() {
        isContextMenuVisible && (UI.hide("#contextmenu"),
        isContextMenuVisible = false)
    }
    ,
    UI.nameEntered = function() {
        var e = $("#playername").val().trim();
        e.length > 0 ? (game.myOriginalName = e,
        Games.start(e, true)) : Games.highlightInput("#playername")
    }
    ,
    UI.selectUpgrade = function(e) {
        Network.sendCommand("upgrade", e + "")
    }
    ;
    var X = function() {
        for (var e = ["", "speed", "defense", "energy", "missile"], t = 1; t < 5; t++)
            t - 1,
            currentUpgradeValueByName[e[t]] < 5 && thisPlayerState.upgrades > 0 ? $("#selectupgrade-" + t).addClass("lighted") : $("#selectupgrade-" + t).removeClass("lighted")
    };
    UI.updateUpgrades = function(speedDefenseEnergyMissileArray, msgUpgrades, msgTypeId) {
        for (var r, upgradeKind = ["", "speed", "defense", "energy", "missile"], o = 1; o < 5; o++)
            r = o - 1,
            "",
            null != currentUpgradeValueByName[upgradeKind[o]] && currentUpgradeValueByName[upgradeKind[o]] == speedDefenseEnergyMissileArray[r] || (currentUpgradeValueByName[upgradeKind[o]] = speedDefenseEnergyMissileArray[r],
            $("#selectupgrade-" + o + "-level").html(speedDefenseEnergyMissileArray[r]),
            isTooltipVisible && y - 100 == o && UI.popTooltip(null, 100 + o));
        if (null != msgTypeId) {
            if (0 != msgTypeId) {
                var s = ["", "Speed", "Defense", "Energy Regen", "Missile Speed"]
                  , a = "+" + Math.round(100 * (config.upgrades[upgradeKind[msgTypeId]].factor[currentUpgradeValueByName[upgradeKind[msgTypeId]]] - 1)) + "% " + s[msgTypeId];
                UI.showMessage("information", '<span class="info">UPGRADE</span>' + a, 3e3),
                Sound.playerUpgrade()
            }
            thisPlayerState.upgrades = msgUpgrades,
            $("#score-upgrades").html(msgUpgrades)
        }
        X()
    }
    ,
    UI.resetUpgrades = function() {
        UI.updateUpgrades([0, 0, 0, 0])
    }
    ,
    UI.popBigMsg = function(e) {
        if (1 == e)
            var t = '<div id="big-message" onclick="UI.closeBigMsg()"><div class="msg">Mobile mode</div><div class="small">Mobile mode has touch controls and requires latest phone/tablet hardware.</div><div class="small nopadtop">For the full experience please play on a PC with a physical keyboard.</div><div class="greyed">Tap anywhere to close</div></div>';
        else
            t = '<div id="big-message"><div class="msg">WebGL required</div><div class="small">This game requires a WebGL enabled browser in order to run.<br>Please allow WebGL for this domain to continue.</div>';
        $("body").append(t)
    }
    ,
    UI.closeBigMsg = function() {
        $("#big-message").remove()
    }
    ,
    UI.showHelp = function(e) {
        isHelpVisible || (UI.closeAllPanels("help"),
        true === e ? $("#howtoplay").addClass("hide") : $("#howtoplay").removeClass("hide"),
        UI.showPanel("#howtoplay"),
        isHelpVisible = true)
    }
    ,
    UI.hideHelp = function() {
        isHelpVisible && (UI.hidePanel("#howtoplay"),
        isHelpVisible = false)
    }
    ,
    UI.toggleHelp = function() {
        isHelpVisible ? UI.hideHelp() : UI.showHelp()
    }
    ,
    UI.updateSound = function(e) {
        config.settings.sound ? ($("#settings-sound").addClass("soundon"),
        $("#settings-sound").removeClass("soundoff"),
        $("#mainmenu-sound-icon").addClass("soundon"),
        $("#mainmenu-sound-icon").removeClass("soundoff"),
        $("#mainmenu-sound-text").html("Disable Sound")) : ($("#settings-sound").addClass("soundoff"),
        $("#settings-sound").removeClass("soundon"),
        $("#mainmenu-sound-icon").addClass("soundoff"),
        $("#mainmenu-sound-icon").removeClass("soundon"),
        $("#mainmenu-sound-text").html("Enable Sound")),
        e && UI.showMessage("alert", '<span class="info">SOUND</span>' + (config.settings.sound ? "Enabled" : "Disabled"), 3e3)
    }
    ,
    UI.gameStart = function(e, t) {
        t && ($("#login-ui").remove(),
        UI.show("#logosmall"),
        UI.show("#menu", true),
        config.mobile || UI.show("#chatbox"),
        UI.show("#roomnamecontainer"),
        UI.show("#scoreboard"),
        UI.show("#scorebig"),
        UI.show("#settings"),
        UI.show("#sidebar"),
        config.mobile && H(),
        config.settings.helpshown || (UI.showHelp(true),
        config.settings.helpshown = true,
        Tools.setSettings({
            helpshown: true
        }))),
        UI.hide("#gamespecific"),
        $("#gameinfo").html("&nbsp;"),
        $("#gameinfo").addClass("ingame"),
        currentUpgradeValueByName = {},
        UI.resetUpgrades(),
        UI.hideSpectator(),
        UI.resetPowerups(),
        $("#open-menu").html("Connecting..."),
        game.myName = e,
        Network.setup()
    }
    ;
    var H = function() {
        Y(),
        Graphics.toggleFullscreen(),
        Input.setupTouch()
    }
      , Y = function() {
        $("#howtoplay").addClass("mobile"),
        $("#howtoplay").html('<div class="header">HOW TO PLAY</div><div class="mobile-graphic"></div><div class="commands">For the best game experience play on a PC</div>')
    };
    UI.reconnection = function() {
        i = 0,
        s = -1,
        thisPlayerState = {
            score: -1,
            upgrades: -1,
            earnings: -1,
            kills: -1,
            deaths: -1
        },
        hugeKillDeathNoticeInfo = false,
        currentUpgradeValueByName = {},
        ignoredPlayerIdSet = {},
        UI.resetUpgrades(),
        UI.resetPowerups(),
        UI.hideSpectator(),
        UI.wipeAllMinimapMobs(),
        UI.wipeAllMessages(),
        Games.wipe(),
        $("#gameinfo").html("&nbsp;"),
        $("#scoreboard").html(""),
        $("#chatlines").html(""),
        $("#score-score").html("&nbsp;"),
        $("#score-upgrades").html("&nbsp;"),
        $("#score-rank").html("-"),
        $("#roomname").html("&nbsp;"),
        $("#open-menu").html("Switching Game...")
    }
    ,
    UI.loggedIn = function(e) {
        $("#roomname").html(game.roomName),
        $("#scoreheader").html(game.roomName + "&nbsp;&nbsp;"),
        $("#open-menu").html('<span class="arrowdown"></span>' + game.roomName + '&nbsp;&nbsp;<span class="region">&bull;&nbsp;&nbsp;' + game.regionName + "</span>"),
        UI.visibilityHUD(true),
        UI.visibilityMinimap(true),
        UI.updateHUD(1, 1)
    }
    ,
    UI.popTooltip = function(e, t) {
        if (null == t)
            var n = e.data.t
              , r = e.currentTarget.getBoundingClientRect();
        else
            n = t;
        var i = "";
        if (n < 100) {
            var o = aircraftInfoByType[n]
              , s = ["", "Agility", "Defense", "Regen", "Damage"];
            i += '<div class="header">' + o[0] + "</div>";
            for (var a = 1; a <= 4; a++)
                i += '<div class="item"><div class="name">' + s[a] + '</div><div class="val">&nbsp;<div class="bar"><div class="progress" style="width: ' + o[a] + '%"></div></div></div></div>';
            i += '<div class="item"><div class="special">' + o[5] + '</div><div class="desc">' + o[6] + "</div></div>",
            i += '<div class="item"><div class="clickto">Click to respawn</div></div>'
        } else {
            var l = ["", "speed", "defense", "energy", "missile"]
              , u = n - 100
              , c = currentUpgradeValueByName[l[u]]
              , h = "+" + Math.round(100 * (config.upgrades[l[u]].factor[currentUpgradeValueByName[l[u]]] - 1)) + "%";
            if (i += '<div class="header">' + aircraftInfoByType[n][0] + "</div>",
            i += '<div class="item"><div class="level">' + c + " / " + (config.upgrades[l[u]].factor.length - 1) + "</div>",
            c > 0 && (i += '<div class="percent">' + h + "</div></div>"),
            c < config.upgrades[l[u]].factor.length - 1) {
                i += '<div class="item smaller"><div class="requires">Requires 1 upgrade point</div></div>';
                i += '<div class="item smaller"><div class="clickto">Click to upgrade to ' + (h = "+" + Math.round(100 * (config.upgrades[l[u]].factor[currentUpgradeValueByName[l[u]] + 1] - 1)) + "%") + "</div></div>"
            } else
                i += '<div class="item smaller"><div class="clickto">Max upgrade reached</div></div>'
        }
        i += '<div class="arrow"></div>',
        null == t && $("#tooltip").css({
            left: Math.round(r.left + 60) + "px",
            top: Math.round(r.top - 10) + "px"
        }),
        $("#tooltip").html(i),
        y = n,
        null != hideTooltipTimer && clearTimeout(hideTooltipTimer),
        isTooltipVisible || (isTooltipVisible = true,
        UI.show("#tooltip"))
    }
    ,
    UI.closeTooltip = function() {
        isTooltipVisible && (null != hideTooltipTimer && clearTimeout(hideTooltipTimer),
        hideTooltipTimer = setTimeout(function() {
            isTooltipVisible && (UI.hide("#tooltip"),
            $("#tooltip").html(""),
            isTooltipVisible = false,
            hideTooltipTimer = null)
        }, 250))
    }
    ,
    UI.startDragChat = function(e) {
        chatBoxDimensions.x = e.originalEvent.pageX,
        chatBoxDimensions.y = e.originalEvent.pageY,
        chatBoxDimensions.width = $("#chatbox").width() + 16,
        chatBoxDimensions.height = $("#chatbox").height() + 16,
        $("#chatbox").addClass("hovered"),
        $(window).on("mousemove", UI.dragChat),
        $(window).on("mouseup", UI.endDragChat)
    }
    ,
    UI.dragChat = function(e) {
        var t = e.originalEvent.pageX
          , n = e.originalEvent.pageY;
        if (0 != t && 0 != n) {
            game.screenY - n < 100 && (n = game.screenY - 100);
            var r = t - chatBoxDimensions.x
              , i = n - chatBoxDimensions.y;
            $("#chatbox").css({
                width: chatBoxDimensions.width + r + "px",
                height: chatBoxDimensions.height - i + "px"
            }),
            $("#minimizechatcontainer").css({
                width: chatBoxDimensions.width + r + "px",
                bottom: chatBoxDimensions.height - i + "px"
            }),
            $("#chatinput").css({
                width: chatBoxDimensions.width + r - 12 + "px",
                bottom: chatBoxDimensions.height - i + 20 + "px"
            })
        }
    }
    ,
    UI.endDragChat = function(e) {
        $("#chatbox").removeClass("hovered"),
        $(window).off("mousemove", UI.dragChat),
        $(window).off("mouseup", UI.endDragChat)
    }
    ,
    UI.setup = function() {
        $(window).resize(onWindowResize),
        $(window).on("orientationchange", onWindowResize),
        $(window).on("contextmenu", function(e) {
            return UI.popMenu(e, true),
            e.preventDefault(),
            false
        }),
        $(window).on("focus", Input.gameFocus),
        $(window).on("blur", Input.gameBlur),
        $(window).on("click", UI.popMenu),
        $("#minimizechat").on("click", UI.minimizeChat),
        $("#maximizechat").on("click", UI.maximizeChat),
        $("#viewscore").on("click", function(e) {
            game.state == Network.STATE.PLAYING && (UI.openScore(),
            e.stopPropagation())
        }),
        $("#selectaircraft-1").on("click", function() {
            UI.selectAircraft(1)
        }),
        $("#selectaircraft-2").on("click", function() {
            UI.selectAircraft(2)
        }),
        $("#selectaircraft-3").on("click", function() {
            UI.selectAircraft(3)
        }),
        $("#selectaircraft-4").on("click", function() {
            UI.selectAircraft(4)
        }),
        $("#selectaircraft-5").on("click", function() {
            UI.selectAircraft(5)
        }),
        $("#mainmenu-fullscreen").on("click", Graphics.toggleFullscreen),
        $("#mainmenu-invite").on("click", UI.openInvite),
        $("#mainmenu-score").on("click", UI.openScore),
        $("#mainmenu-game").on("click", Games.popGames),
        $("#mainmenu-hidpi").on("click", Graphics.toggleHiDPI),
        $("#mainmenu-sound").on("click", Sound.toggle),
        config.mobile ? ($("#mainmenu-keybinds-text").html("<br>How To Play"),
        $("#mainmenu-keybinds").on("click", UI.toggleHelp),
        $(".keybind").css({
            display: "none"
        })) : $("#mainmenu-keybinds").on("click", Input.openKeybinds),
        $("#settings-mainmenu").on("click", function(e) {
            UI.toggleMainMenu(),
            e.stopPropagation()
        }),
        $("#settings-sound").on("click", function(e) {
            Sound.toggle(),
            e.stopPropagation()
        }),
        $("#mainmenu").on("click", function(e) {
            e.stopPropagation()
        }),
        $("#scoredetailed").on("click", function(e) {
            e.stopPropagation()
        }),
        $("#invitefriends").on("click", function(e) {
            e.stopPropagation()
        }),
        $("#keybinds").on("click", function(e) {
            e.stopPropagation()
        }),
        $("#invite-link").on("contextmenu", function(e) {
            e.stopPropagation()
        }),
        $("#resetbinds").on("click", Input.resetBinds),
        config.mobile || ($("#chatbox").perfectScrollbar({
            suppressScrollX: true,
            handlers: ["click-rail", "drag-scrollbar", "wheel", "touch"]
        }),
        $("#chatinput").on("blur", function() {
            isChatBoxVisible && UI.toggleChatBox(false)
        }),
        $("#resizechat").on("mousedown", UI.startDragChat)),
        $("#scorecontainer").perfectScrollbar({
            suppressScrollX: true,
            handlers: ["click-rail", "drag-scrollbar", "wheel", "touch"]
        }),
        $("#selectupgrade-1").on("click", function() {
            UI.selectUpgrade(1)
        }),
        $("#selectupgrade-2").on("click", function() {
            UI.selectUpgrade(2)
        }),
        $("#selectupgrade-3").on("click", function() {
            UI.selectUpgrade(3)
        }),
        $("#selectupgrade-4").on("click", function() {
            UI.selectUpgrade(4)
        });
        var e;
        for (e = 1; e <= 5; e++)
            $("#selectaircraft-" + e).on("mouseenter", {
                t: e
            }, UI.popTooltip),
            $("#selectaircraft-" + e).on("mouseleave", UI.closeTooltip);
        for (e = 1; e <= 4; e++)
            $("#selectupgrade-" + e).on("mouseenter", {
                t: 100 + e
            }, UI.popTooltip),
            $("#selectupgrade-" + e).on("mouseleave", UI.closeTooltip);
        $("#playbutton").on("click", function() {
            Sound.UIClick(),
            UI.nameEntered()
        }),
        $("#playername").on("keypress", function(e) {
            13 === e.which && UI.nameEntered()
        }),
        window.onerror = function(e, t, n, r, i) {
            game.state !== Network.STATE.PLAYING && game.state !== Network.STATE.CONNECTING || Tools.handleError({
                msg: e,
                url: t,
                lineNo: n,
                columnNo: r,
                error: i
            })
        }
    }
})();
