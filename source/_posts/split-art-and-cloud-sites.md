---
title: 把个人博客和茶叶站拆到两个域名
date: 2026-08-10 11:00:00
updated: 2026-08-21 21:00:00
categories: 项目记录
tags:
  - 项目
  - 复盘
  - 博客
cover: /img/zhuyz-cover-project.svg
comments: false
---

桌面上一度有两个几乎同名的博客目录，GitHub 仓库、主题和域名也缠在一起。这次把它们按域名拆开。

## 项目目标

- [zhuyz.art](https://zhuyz.art/)：AnZhiYu 主题个人博客
- [zhuyz.cloud](https://zhuyz.cloud/)：凤凰单枞茶叶展示站
- 两边源码、Git 仓库和发布方式分开，避免再推错仓库

## 实现要点

个人博客使用 Hexo + AnZhiYu，发布到 `zhuyz.art` 服务器的静态根目录。茶叶站继续走 GitHub Pages，自定义域名保持 `zhuyz.cloud`。

本地目录也按这个边界区分：带空格的 `Zhuyz Pro 博客` 是 `.art` 个人博客；不带空格的 `Zhuyz Pro博客` 是 `.cloud` 茶叶仓库。

## 复盘

最容易出错的不是构建，而是同名目录和旧接单页残留。首页如果还写着“下单”“流量卡”，线上看起来就不是个人博客。拆分后要同时改文案、导航和发布目标，而不是只改域名。
