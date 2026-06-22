# 阿里云 OSS / CDN / HLS 视频部署说明

当前网站的视频策略：

- 项目区默认显示封面图。
- 鼠标悬停播放 `public/previews/` 里的轻量预览 MP4。
- 点击项目后，播放器优先读取阿里云 OSS/CDN 上的 HLS 地址。
- 如果没有配置 CDN 地址，则回退到 GitHub Pages 中的压缩 MP4。

## 1. 已上传目录

需要上传到 OSS 的本地目录：

```text
cdn-video/hls/
```

上传后 OSS 路径需要保持：

```text
hls/project-ai/master.m3u8
hls/project-brand/master.m3u8
hls/project-particle/master.m3u8
hls/project-tech/master.m3u8
hls/project-other/master.m3u8
```

## 2. 配置 CORS

进入 Bucket：

```text
权限控制 -> 跨域设置 CORS
```

新增规则：

```text
来源 Origin:
https://zhelinma123-collab.github.io
http://127.0.0.1:5173
http://localhost:5173

允许 Methods:
GET, HEAD

允许 Headers:
*

暴露 Headers:
ETag, Content-Length, Content-Type

缓存时间:
3600
```

## 3. 公共访问或 CDN

测试阶段可以使用 Bucket 公共读；正式上线更建议使用 CDN 加速域名。

最终需要得到一个可直接访问的基础地址，例如：

```text
https://mzl-portfolio-video.oss-cn-chengdu.aliyuncs.com
```

或：

```text
https://video.example.com
```

然后测试：

```text
https://你的域名/hls/project-ai/master.m3u8
```

## 4. 配置 GitHub Actions 变量

进入 GitHub 仓库：

```text
Settings -> Secrets and variables -> Actions -> Variables
```

新增变量：

```text
VITE_VIDEO_CDN_BASE=https://你的OSS或CDN域名
```

不要在末尾加 `/`。

## 5. 重新部署

配置变量后，重新运行 GitHub Actions 的部署流程，或推送一次新提交。

部署成功后，网站点击项目视频会读取：

```text
${VITE_VIDEO_CDN_BASE}/hls/project-ai/master.m3u8
```

## 6. 重新生成 HLS

如果后续替换高清源视频，先把高清 MP4 放到：

```text
cdn-video/full/
```

然后运行：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build-hls.ps1
```

生成完成后，重新上传 `cdn-video/hls/`。
