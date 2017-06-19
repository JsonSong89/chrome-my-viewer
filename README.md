# vue chrome extension example

本项目基于[基础模板](https://github.com/cucygh/vue-chrome-extension-example)
进行了二次开发.
## Installation

	$ yarn

## Usage

`dev:chrome` 开启插件端代码的监控,`dev:app`开启位于src的应用端webpack的dev service

## 工作流程简述
由popup.html引入popup.js,popup.js打包了一个vue应用(app/component/app.vue),通过chrome扩展,将initPageApp注入到content script环境



### 应用端

由于gulp和webpack搭配不便,且应用端需要更复杂的webpack打包策略,现将应用端代码独立出来单独用webpack管理,支持TypeScript,class风格的vue组件,配置入口是src/initPageApp.ts
