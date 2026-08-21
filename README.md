# Zhuyz Pro 个人博客

AnZhiYu 主题的个人博客，正式地址是 [https://zhuyz.art/](https://zhuyz.art/)。

这个目录只维护个人博客，不包含茶叶站内容，也不提供下单、支付或会员功能。

## 和旁边目录的区别

| 目录 | 站点 | 用途 |
| --- | --- | --- |
| `C:\Users\Anderson\Desktop\Zhuyz Pro 博客` | [zhuyz.art](https://zhuyz.art/) | 当前这个 AnZhiYu 个人博客 |
| `C:\Users\Anderson\Desktop\Zhuyz Pro博客` | [zhuyz.cloud](https://zhuyz.cloud/) | 凤凰单枞茶叶展示站，GitHub Pages 仓库 |
| `C:\Users\Anderson\Desktop\凤凰单枞博客` | 旧工作副本 | 不要再当成正式源码目录 |

GitHub 仓库分开：

- 个人博客：`zhuyzPro/zhuyz-art-blog`
- 茶叶站：`zhuyzPro/ZhuyzPro.github.io`

## 本地预览

```bash
npm ci
npm run dev
```

本地地址：`http://localhost:4010/`

## 构建

```bash
npm run build
```

产物在 `public/`。生产环境发布到服务器静态根目录，需要保留 `/healthz` 和 `/api/v1/` 给授权网关，不要覆盖 `:3342` 和 `:6888`。
