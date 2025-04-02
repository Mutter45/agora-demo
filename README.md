## 声网集成演示

本项目仅当集成演示使用

客户问题：

- 客户集成 agora-fls-sdk 时，babel 出现一系列的问题；

4-2 :

- 客户 dev 环境下，理论上不需要考虑 babel，因此只要把 webpack.base.conf.js 文件 babel-loader 相关的内容注释掉，就可以正常使用；
- 处理 babel 场景下的问题：
  - 当前 webpack3.x + babel 锁版本的情况下，不支持 sdk 携带 for -await 的写法，因此会出现 cannot find file module 的报错，这个在 agora-fls-sdk 目录下，提供了最新的包 ，已修复，后续问题排查可以沿用此包；
  - 剩下的问题：
    - 报错信息 Cannot convert a Symbol value to a string，这个理论上在 @babel/preset-env 应该兼容的，但是客户的环境过于陈旧，和 vue2.x / webpack3.x 版本可能存在冲突，需要后续评估方案；
