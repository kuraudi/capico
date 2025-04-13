(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_98262e._.js", {

"[project]/src/app/GlobalContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "RoleProvider": (()=>RoleProvider),
    "useGlobalContext": (()=>useGlobalContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
;
;
const GlobalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const RoleProvider = ({ children })=>{
    _s();
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("guest");
    const [userInfo, setUserInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: ""
    });
    const [coinPrices, setCoinPrices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [totalBalance, setTotalBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        totalBalanceUSD: 0,
        totalBalanceBTC: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleProvider.useEffect": ()=>{
            const savedRole = localStorage.getItem("role");
            setRole(savedRole || "guest");
            if (!savedRole) localStorage.setItem("role", "guest");
            // 📌 Загрузка списка монет из БД
            const fetchCoins = {
                "RoleProvider.useEffect.fetchCoins": async ()=>{
                    try {
                        const { data: coins } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("http://127.0.0.1:8000/market");
                        // const { data: metaInfo } = await axios.get(
                        //   "http://127.0.0.1:8000/market/metainfo"
                        // );
                        // 📌 Преобразуем данные в массив массивов
                        const updatedPrices = coins.map({
                            "RoleProvider.useEffect.fetchCoins.updatedPrices": (coin)=>[
                                    coin[0],
                                    {
                                        name: coin[1].name,
                                        url_logo: coin[1].logo,
                                        price: 0,
                                        price24hPcnt: 0,
                                        turnover24h: 0,
                                        lowPrice24h: 0,
                                        highPrice24h: 0,
                                        volume24h: 0
                                    }
                                ]
                        }["RoleProvider.useEffect.fetchCoins.updatedPrices"]);
                        setCoinPrices(updatedPrices);
                    } catch (error) {
                        console.error("❌ Ошибка загрузки монет:", error);
                    }
                }
            }["RoleProvider.useEffect.fetchCoins"];
            // 🔄 Функция для обновления цен из Redis
            const updatePriceFromRedis = {
                "RoleProvider.useEffect.updatePriceFromRedis": async ()=>{
                    try {
                        const { data: response } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("http://127.0.0.1:8000/market/prices");
                        // console.log("💰 Обновленные цены:", response);
                        setCoinPrices({
                            "RoleProvider.useEffect.updatePriceFromRedis": (prev)=>{
                                const updated = prev.map({
                                    "RoleProvider.useEffect.updatePriceFromRedis.updated": ([symbol, coin])=>{
                                        const found = response.find({
                                            "RoleProvider.useEffect.updatePriceFromRedis.updated.found": (el)=>el[0] === symbol
                                        }["RoleProvider.useEffect.updatePriceFromRedis.updated.found"]);
                                        return [
                                            symbol,
                                            {
                                                ...coin,
                                                ...found ? found[1] : {}
                                            }
                                        ]; // 🔥 Тут явно указываем тип
                                    }
                                }["RoleProvider.useEffect.updatePriceFromRedis.updated"]);
                                // 📌 Сортируем по цене (по убыванию)
                                return updated.sort({
                                    "RoleProvider.useEffect.updatePriceFromRedis": (a, b)=>(b[1].price ?? 0) - (a[1].price ?? 0)
                                }["RoleProvider.useEffect.updatePriceFromRedis"]);
                            }
                        }["RoleProvider.useEffect.updatePriceFromRedis"]);
                    } catch (error) {
                        console.error("❌ Ошибка загрузки цен из Redis:", error);
                    }
                }
            }["RoleProvider.useEffect.updatePriceFromRedis"];
            fetchCoins();
            updatePriceFromRedis();
            const interval = setInterval(updatePriceFromRedis, 3000);
            return ({
                "RoleProvider.useEffect": ()=>clearInterval(interval)
            })["RoleProvider.useEffect"];
        }
    }["RoleProvider.useEffect"], []);
    const [userCoinsBalances, setUserCoinBalances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleProvider.useEffect": ()=>{
            const fetchUserBalances = {
                "RoleProvider.useEffect.fetchUserBalances": async ()=>{
                    try {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("http://127.0.0.1:8000/market/user-balances", {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("access")}`
                            }
                        });
                        console.log(response.data, "ai");
                        setUserCoinBalances(response.data);
                    } catch (error) {
                        console.error("Ошибка при получении баланса:", error);
                    }
                }
            }["RoleProvider.useEffect.fetchUserBalances"];
            const fetchTotalBalance = {
                "RoleProvider.useEffect.fetchTotalBalance": async ()=>{
                    try {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("http://127.0.0.1:8000/market/test", {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("access")}`
                            }
                        });
                        setTotalBalance({
                            "RoleProvider.useEffect.fetchTotalBalance": ()=>({
                                    totalBalanceUSD: response.data.total_balance ?? 0,
                                    totalBalanceBTC: response.data.total_balance_btc ?? 0
                                })
                        }["RoleProvider.useEffect.fetchTotalBalance"]);
                    } catch (error) {
                        console.error("Ошибка при получении баланса:", error);
                    }
                }
            }["RoleProvider.useEffect.fetchTotalBalance"];
            // Вызов функции
            fetchUserBalances();
            fetchTotalBalance();
            setUserInfo({
                "RoleProvider.useEffect": (prev)=>({
                        ...prev,
                        email: localStorage.getItem("email") ?? ""
                    })
            }["RoleProvider.useEffect"]);
        }
    }["RoleProvider.useEffect"], []);
    const updateRole = (newRole)=>{
        setRole(newRole);
        localStorage.setItem("role", newRole);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalContext.Provider, {
        value: {
            role,
            setRole: updateRole,
            coinPrices,
            userCoinsBalances,
            totalBalance,
            userInfo
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/GlobalContext.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
};
_s(RoleProvider, "R8qFnbmkGSMEr11Boq/ZPsED49o=");
_c = RoleProvider;
const useGlobalContext = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(GlobalContext);
    if (!context) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
};
_s1(useGlobalContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "RoleProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/layout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>RootLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/GlobalContext.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {}, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/app/layout.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = RootLayout;
var _c;
__turbopack_refresh__.register(_c, "RootLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_98262e._.js.map