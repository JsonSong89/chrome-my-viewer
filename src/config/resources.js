"use strict";

// 所有http resource在此定义,由于不想开放delete谓词的跨域权限,所有更新和删除 也是post

import Vue from "vue";
import VueResource from "vue-resource";
import util from "source/util";

import ssoLogin from "source/ssoLogin";
//保证VueResource挂载完毕
Vue.use(VueResource);
//添加post方法-->指向save
Vue.resource.actions.post = Vue.resource.actions.save;
Vue.resource.actions.get = Vue.resource.actions.query;

let getPath = (path) => util.getConfigPath(path);


let _downloadRes = function (path, params) {
    let user = ssoLogin.getUser();
    let url = `${util.getConfigPath(path)}?requestCheckToken=${user.token}&requestCheckGuid=${user.guid}`;
    if (params) {
        Object.keys(params).forEach(key => url += `&${key}=${params[key]}`)
    }
    return url
};

//用户登录登出
export let back_logout = Vue.resource(getPath("logout"));
export let back_login = Vue.resource(getPath("login"));
//分拣-分拣员
export let sorter_one = Vue.resource(getPath("sorter/{id}"));
export let sorter_query = Vue.resource(getPath("sorter/query"));
//分拣-分拣组
export let sortGroup_one = Vue.resource(getPath("sortGroup/{id}"));
export let sortGroup_query = Vue.resource(getPath("sortGroup/query"));
//分拣-分拣记录
export let sortRecord_query = Vue.resource(getPath("sortRecord/query"));
//分拣-分拣规则
export let sortRule_query = Vue.resource(getPath("sortRule/query"));
export let sortRule_create = Vue.resource(getPath("sortRule/create"));
export let sortRule_one = Vue.resource(getPath("sortRule/{id}"));
// 企业
export let enterprise_query = Vue.resource(getPath("enterprises/query"));
// 流水
export let turnover_query = Vue.resource(getPath("turnover/query"));
// 产品
export let product_submitPrice = Vue.resource(getPath("products/submitPrice"));
// 库存
export let goodsStocks_updateStock = Vue.resource(getPath("goodsStocks/updateStock"));
export let sortInfoAssign_query = Vue.resource(getPath("sortInfoAssign/query"));
export let sortInfoAssign_exportSoring = Vue.resource(getPath("sortInfoAssign/exportSoring"));
export let sortInfoAssign_assignSortInfo = Vue.resource(getPath("sortInfoAssign/assignSortInfo"));
export let sortInfoAssign_printSortInfo = Vue.resource(getPath("sortInfoAssign/printSortInfo"));
// 系统枚举
export let config_saveAllEnum = Vue.resource(getPath("config/saveAllEnum"));
export let config_deleteEnum = Vue.resource(getPath("config/deleteEnum"));
export let config_getAllDictionaryEnum = Vue.resource(getPath("config/getAllDictionaryEnum"));
export let config_saveEnum = Vue.resource(getPath("config/saveEnum"));

//download
export let salesOrder_downloadSalesProductCount = (opt) => _downloadRes("salesOrder/downloadSalesProductCount", opt);
export let salesOrder_downloadSalesCustomerCount = (opt) => _downloadRes("salesOrder/downloadSalesCustomerCount", opt);
export let purchaseOrder_downloadPurchaseRangeCount = (opt) => _downloadRes("purchaseOrder/downloadPurchaseRangeCount", opt);
export let purchaseOrder_downloadPurchaseProductCount = (opt) => _downloadRes("purchaseOrder/downloadPurchaseProductCount", opt);
export let goodsStocks_downloadLossRangeCount = (opt) => _downloadRes("goodsStocks/downloadLossRangeCount", opt);
export let download_downloadReport = (opt) => _downloadRes("goodsInfos/downloadReport", opt);
//excel export 下载地址
exports.download_downloadSorting = (opt) => _downloadRes("salesOrder/downloadSorting", opt);
exports.download_downloadPurchase = (opt) => _downloadRes("salesOrder/downloadPurchase", opt);
exports.download_downloadDelivery = (opt) => _downloadRes("salesOrder/downloadDelivery", opt);
exports.download_downloadReport = (opt) => _downloadRes("goodsInfos/downloadReport", opt);


