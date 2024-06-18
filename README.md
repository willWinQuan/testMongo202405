
> node v20.13.1

> express v4.19.2

> mongodb v7.0

> docker v26.1.1

**本地测试需安装**
```
  nvm 安装，切换node版本
  nvm use 20.13.1

  安装docker
  安装docker desktop (docker 可视化)

  初始化发布一次项目（发布方法：docker发布，配置文件Dockerfile、Dockerfile.mongo、compose.yaml、initDB.sh、mongod.cfg）,以便初始化本地mongodb 数据库

  安装mongodb compass （mongodb 可视化）
```

**说明**
```
 mongoose 连接db
 agenda 连接池
 typedi 便捷获取方法操作instance
 celebrate 主用来express中间传参校验必须项
 reflect-metadata 命名空间依赖注入 service 文件夹可见使用@service()
 dotenv .env 配置项

 Dockerfile 配置docker node 发布的image
 Dockerfile.mongo （compose.yaml 网络问题拉不了镜像，改为使用Form mongo:7.0） 并创建db数据存储的文件夹
 compose.yaml 合并镜像并添加配置

```
**注：compose.yaml的${xxxx} 变量是自适应获取.env 的配置，所以不同的环境只需变换.env的内容**

**docker 发布**
```
 npm run build #build 代码
 .env 修改version 版本号
 docker compose build #build 镜像
 docker compose up -d #创建/更新容器
 docker image prune -a -f #清除无用镜像
```

