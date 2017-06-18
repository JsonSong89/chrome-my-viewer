/**
 * Created by Administrator on 2017/4/11.
 */


import Vue from "vue"
import _ from "lodash"
import {Component} from 'vue-property-decorator'
import moment from "moment";
import axios from "axios";
import $ from "jquery";
export {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'


/**
 * 常用vue生命周期钩子
 * */
export let Hooks = {
  created: "created",
  mounted: "mounted",
  beforeDestroy: "beforeDestroy",
  //beforeRouteEnter: "beforeRouteEnter",
  beforeRouteUpdate: "beforeRouteUpdate",
};

export {
  Vue, moment, _, axios, $
}

