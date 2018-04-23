# ibird-mongoose-adapter

Mongoosee适配器，封装持久层的增删改查以供上层调用（可独立于`ibird`使用）

## 安装

```sh
npm install ibird-mongoose-adapter
```

## 引用

```js
const adapter = require('ibird-mongoose-adapter');
const actions = adapter();

```