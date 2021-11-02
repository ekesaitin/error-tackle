# error-tackle

## 初始化

```sh
pnpm i
```

### 开发编译

```sh
pnpm run dev
```

### 打包

```sh
pnpm run build
```

项目结构

```sh
error-tackle
 ├── dist               # 打包输出路径
 ├── examples           # 用来编写测试栗子
 ├── src                # 开发源码
 │   ├── action         # 记录用户操作
 │   ├── client         # 获取用户设备信息
 │   ├── error          # 错误捕获相关
 │   ├── index.ts       # 入口文件
 │   ├── report         # 将错误信息上报
 │   └── utils          # 工具库
 ├── package.json
 ├── pnpm-lock.yaml
 ├── README.md
 ├── rollup.config.js
 └── tsconfig.json
```
