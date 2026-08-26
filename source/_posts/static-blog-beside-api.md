---
title: 静态博客和授权网关共用 443 的隔离方式
date: 2026-08-10 10:20:00
updated: 2026-08-21 21:00:00
categories: 技术笔记
tags:
  - Nginx
  - 部署
  - 静态站点
cover: /img/covers/landscape-lake.jpg
comments: false
published: false
---

`zhuyz.art` 根域名要放个人博客，但原来的授权网关、卡密后台和独角数卡还在同一台服务器上。这次部署只接管根站点，不覆盖既有接口和端口。

## 目标

- `https://zhuyz.art/` 返回 AnZhiYu 博客
- `/healthz` 和 `/api/v1/` 继续走授权网关
- `:3342` 后台和 `:6888` 商城保持原样

## 做法

博客静态文件放到独立 release 目录，用 `current` 软链接做原子切换。Nginx 对根路径走静态站，对网关路径保持精确反代，避免把博客文件误代理到 API。

本地构建后先核对页面里没有茶叶站文案，再上传新的 release。回滚时只需把 `current` 指回上一版目录。

## 结论

同一张 443 证书可以同时服务静态站和 API，前提是路由按路径切开，发布目录也不要和网关程序混在一起。
