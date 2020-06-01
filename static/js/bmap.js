"use strict"; function _classCallCheck(t, a) { if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function") } var _createClass = function () { function t(t, a) { for (var e = 0; e < a.length; e++) { var i = a[e]; i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } } return function (a, e, i) { return e && t(a.prototype, e), i && t(a, i), a } }(), BMapWX = function () { function t(a) { _classCallCheck(this, t), this.ak = a.ak } return _createClass(t, [{ key: "getWXLocation", value: function (t, a, e, i) { t = t || "gcj02", a = a || function () { }, e = e || function () { }, i = i || function () { }, wx.getLocation({ type: t, success: a, fail: e, complete: i }) } }, { key: "search", value: function (t) { var a = this; t = t || {}; var e = { query: t.query || "生活服务$美食&酒店", scope: t.scope || 1, filter: t.filter || "", coord_type: t.coord_type || 2, page_size: t.page_size || 10, page_num: t.page_num || 0, output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "", radius: t.radius || 2e3, ret_coordtype: "gcj02ll" }, i = { iconPath: t.iconPath, iconTapPath: t.iconTapPath, width: t.width, height: t.height, alpha: t.alpha || 1, success: t.success || function () { }, fail: t.fail || function () { } }, n = function (t) { e.location = t.latitude + "," + t.longitude, wx.request({ url: "https://api.map.baidu.com/place/v2/search", data: e, header: { "content-type": "application/json" }, method: "GET", success: function (t) { var a = t.data; if (0 === a.status) { var e = a.results, n = {}; n.originalData = a, n.wxMarkerData = []; for (var s = 0; s < e.length; s++)n.wxMarkerData[s] = { id: s, latitude: e[s].location.lat, longitude: e[s].location.lng, title: e[s].name, iconPath: i.iconPath, iconTapPath: i.iconTapPath, address: e[s].address, telephone: e[s].telephone, alpha: i.alpha, width: i.width, height: i.height }; i.success(n) } else i.fail({ errMsg: a.message, statusCode: a.status }) }, fail: function (t) { i.fail(t) } }) }, s = function (t) { i.fail(t) }, o = function (t) { }; if (t.location) { var c = t.location.split(",")[1]; n({ errMsg: "input location", latitude: t.location.split(",")[0], longitude: c }) } else a.getWXLocation("gcj02", n, s, o) } }, { key: "suggestion", value: function (t) { var a = this; t = t || {}; var e = { query: t.query || "", region: t.region || "全国", city_limit: t.city_limit || !1, output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "", ret_coordtype: "gcj02ll" }, i = { success: t.success || function () { }, fail: t.fail || function () { } }; wx.request({ url: "https://api.map.baidu.com/place/v2/suggestion", data: e, header: { "content-type": "application/json" }, method: "GET", success: function (t) { var a = t.data; 0 === a.status ? i.success(a) : i.fail({ errMsg: a.message, statusCode: a.status }) }, fail: function (t) { i.fail(t) } }) } }, { key: "regeocoding", value: function (t) { var a = this; t = t || {}; var e = { coordtype: t.coordtype || "gcj02ll", ret_coordtype: "gcj02ll", radius: t.radius || 1e3, ak: a.ak, sn: t.sn || "", output: t.output || "json", callback: t.callback || function () { }, extensions_poi: t.extensions_poi || 1, extensions_road: t.extensions_road || !1, extensions_town: t.extensions_town || !1, language: t.language || "zh-CN", language_auto: t.language_auto || 0 }, i = { iconPath: t.iconPath, iconTapPath: t.iconTapPath, width: t.width, height: t.height, alpha: t.alpha || 1, success: t.success || function () { }, fail: t.fail || function () { } }, n = function (t) { e.location = t.latitude + "," + t.longitude, wx.request({ url: "https://api.map.baidu.com/reverse_geocoding/v3", data: e, header: { "content-type": "application/json" }, method: "GET", success: function (a) { var e = a.data; if (0 === e.status) { var n = e.result, s = {}; s.originalData = e, s.wxMarkerData = [], s.wxMarkerData[0] = { id: 0, latitude: t.latitude, longitude: t.longitude, address: n.formatted_address, iconPath: i.iconPath, iconTapPath: i.iconTapPath, desc: n.sematic_description, business: n.business, alpha: i.alpha, width: i.width, height: i.height }, i.success(s) } else i.fail({ errMsg: e.message, statusCode: e.status }) }, fail: function (t) { i.fail(t) } }) }, s = function (t) { i.fail(t) }, o = function (t) { }; if (t.location) { var c = t.location.split(",")[1]; n({ errMsg: "input location", latitude: t.location.split(",")[0], longitude: c }) } else a.getWXLocation("gcj02", n, s, o) } }, { key: "geocoding", value: function (t) { var a = this; t = t || {}; var e = { address: t.address || "", city: t.city || "", ret_coordtype: t.coordtype || "gcj02ll", ak: a.ak, sn: t.sn || "", output: t.output || "json", callback: t.callback || function () { } }, i = { iconPath: t.iconPath, iconTapPath: t.iconTapPath, width: t.width, height: t.height, alpha: t.alpha || 1, success: t.success || function () { }, fail: t.fail || function () { } }; if (t.address) wx.request({ url: "https://api.map.baidu.com/geocoding/v3", data: e, header: { "content-type": "application/json" }, method: "GET", success: function (t) { var a = t.data; if (0 === a.status) { var e = a.result, n = a; n.originalData = a, n.wxMarkerData = [], n.wxMarkerData[0] = { id: 0, latitude: e.location.lat, longitude: e.location.lng, iconPath: i.iconPath, iconTapPath: i.iconTapPath, alpha: i.alpha, width: i.width, height: i.height }, i.success(n) } else i.fail({ errMsg: a.message, statusCode: a.status }) }, fail: function (t) { i.fail(t) } }); else { var n = { errMsg: "input address!" }; i.fail(n) } } }, { key: "weather", value: function (t) { var a = this; t = t || {}; var e = { coord_type: t.coord_type || "gcj02", output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "" }, i = { success: t.success || function () { }, fail: t.fail || function () { } }, n = function (t) { e.location = t.longitude + "," + t.latitude, wx.request({ url: "https://api.map.baidu.com/telematics/v3/weather", data: e, header: { "content-type": "application/json" }, method: "GET", success: function (t) { var a = t.data; if (0 === a.error && "success" === a.status) { var e = a.results, n = {}; n.originalData = a, n.currentWeather = [], n.currentWeather[0] = { currentCity: e[0].currentCity, pm25: e[0].pm25, date: e[0].weather_data[0].date, temperature: e[0].weather_data[0].temperature, weatherDesc: e[0].weather_data[0].weather, wind: e[0].weather_data[0].wind }, i.success(n) } else i.fail({ errMsg: a.message, statusCode: a.status }) }, fail: function (t) { i.fail(t) } }) }, s = function (t) { i.fail(t) }, o = function (t) { }; if (t.location) { var c = t.location.split(",")[0]; n({ errMsg: "input location", latitude: t.location.split(",")[1], longitude: c }) } else a.getWXLocation("gcj02", n, s, o) } }]), t }(); module.exports.BMapWX = BMapWX;
