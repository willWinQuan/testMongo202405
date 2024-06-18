* docker 发布
```
 npm run build #build 代码
 .env 修改version 版本号
 docker compose build #build 镜像
 docker compose up -d #创建/更新容器
 docker image prune -a -f #清除无用镜像
```