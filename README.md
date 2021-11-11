# error-tackle

## 初始化安装依赖

```sh
yarn
```

## 开发编译

```sh
yarn dev
```

## 打包

```sh
yarn build
```

项目结构

```sh
error-tackle
 ├── dist               # 打包输出路径
 ├── examples           # 用来编写测试栗子
 ├── src                # 开发源码
 │   ├── action         # 记录用户操作
 │   ├── error          # 错误捕获相关
 │   ├── report         # 将错误信息上报
 │   ├── typings        # 类型定义
 │   └── utils          # 工具库
 │   ├── index.ts       # 主入口
 ├── package.json
 ├── pnpm-lock.yaml
 ├── README.md
 ├── rollup.config.js
 └── tsconfig.json
```

## 基础用法

```javascript
import { createTackle } from 'error-tackle'

// 简单的初始化这样就可以了
createTackle()

// 也可以传入options配置,配置具体信息看下面的TackleOptions
createTackle({
  // some options
})
```

### TackleOptions

### TackleOptions

| 参数          | 说明                                             | 类型                   | 默认值    |
| ------------- | ------------------------------------------------ | ---------------------- | --------- |
| url           | 上报信息的接口地址                               | `string`               | undefined |
| method        | 上报信息的请求方式                               | `"GET"\|"POST"\|"IMG"` | IMG       |
| logError      | 是否在控制台打印错误                             | `boolean`              | true      |
| extendsData   | 上报信息需要额外携带的数据                       | `any`                  | null      |
| onError       | 捕获到错误时会执行的方法                         | `onError`              | undefined |
| jsError       | 是否捕获 js 错误（TypeError、ReferenceError 等） | `boolean`              | true      |
| promiseError  | 是否捕获 promise 错误                            | `boolean`              | true      |
| resourceError | 是否捕获资源错误                                 | `boolean`              | true      |
| consoleError  | 是否捕获 console.error 错误                      | `boolean`              | false     |
| ajaxError     | 是否捕获 ajax 错误 （xmlHttpRequest、fetch）     | `boolean`              | true      |
| vueError      | 是否捕获 vue 错误                                | `boolean`              | false     |
| vueApp        | vue 应用实例                                     | `VueApp`               | null      |
| coverError    | 是否阻止错误继续向上传播                         | `boolean`              | true      |

### onError

| 参数 | 说明     | 类型        |
| ---- | -------- | ----------- |
| info | 错误信息 | `ErrorInfo` |
| `--` | 返回值   | `void`      |

### ErrorInfo

最终获取的错误信息如下，某些错误类型会有部分信息无法获取到，比如资源错误无法获取报错源信息，那就没有 source、name、lineno、colno。
|参数|说明|类型|一定包含|
|--|--|--|--|
|type| 错误类型 |`string`|是|
|error| 捕获的 error 本体 |`any`|是|
|message| 报错信息 |`string`|是|
|source| 错误源文件 |`string`|否|
|name| 报错误所在的方法名 |`string`|否|
|lineno| 错误所在行 |`number`|否|
|colno| 错误所在列 |`number`|否|
|datatime| 出现错误的时间 |`string`|是|
|extendsData| 自定义上报时额外携带的参数 |`any`|否|
|userAgent| 用户设备信息 |`UserAgentObj`|是|

### UserAgentObj

| 参数           | 说明         | 类型     |
| -------------- | ------------ | -------- |
| browserName    | 浏览器名称   | `string` |
| browserVersion | 浏览器版本   | `string` |
| osName         | 操作系统名称 | `string` |
| osVersion      | 操作系统版本 | `string` |
| deviceName     | 设备名称     | `string` |
