import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import BorderGlow from './BorderGlow'
import GradientText from './GradientText'

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
const defaultVideoCdnBase = 'https://mzl-portfolio-video.oss-cn-chengdu.aliyuncs.com'
const videoCdnBase = (import.meta.env.VITE_VIDEO_CDN_BASE || defaultVideoCdnBase).replace(/\/+$/, '')
const videoPath = (path) => (videoCdnBase ? `${videoCdnBase}/${path.replace(/^\/+/, '')}` : '')
const heroHls = videoPath('/hls/hero/v720p/index.m3u8')
const defaultQualityOptions = [
  { value: '480', height: 480, label: '480p' },
  { value: '720', height: 720, label: '720p' },
  { value: '1080', height: 1080, label: '1080p' },
]

const profile = {
  name: '马哲林',
  title: '动态设计师 / AI 设计师',
  email: '879134129@qq.com',
  phone: '17793079621',
  wechat: '微信',
  qq: '879134129',
  location: '重庆',
}

const projects = [
  {
    title: 'AI影像',
    meta: '生成式视觉 / 智能分镜 / 影像实验',
    label: '01',
    description: '将 AI 图像、视频生成与后期合成整合为完整影像流程，用于概念片、品牌短片和视觉提案。',
    palette: 'project-a',
    poster: assetPath('/project-ai-poster.jpg'),
    preview: assetPath('/previews/project-ai-preview.mp4'),
    hls: videoPath('/hls/project-ai/master.m3u8'),
    video: assetPath('/project-ai-video.mp4'),
  },
  {
    title: '品牌演绎',
    meta: '标识动效 / 视觉系统 / 品牌影片',
    label: '02',
    description: '围绕品牌气质建立动态语言，将标识、字体、版式和转场演绎为可复用的传播资产。',
    palette: 'project-b',
    poster: assetPath('/project-brand-poster.jpg'),
    preview: assetPath('/previews/project-brand-preview.mp4'),
    hls: videoPath('/hls/project-brand/master.m3u8'),
    video: assetPath('/project-brand-video.mp4'),
  },
  {
    title: '粒子动态',
    meta: '粒子系统 / 节奏控制 / 抽象视觉',
    label: '03',
    description: '通过粒子、流体、光线和空间节奏构建动态视觉，用于开场、舞台屏幕和氛围短片。',
    palette: 'project-c',
    poster: assetPath('/project-particle-poster.jpg'),
    preview: assetPath('/previews/project-particle-preview.mp4'),
    hls: videoPath('/hls/project-particle/master.m3u8'),
    video: assetPath('/project-particle-video.m4v'),
  },
  {
    title: '科技包装',
    meta: '产品包装 / 科技质感 / 发布视觉',
    label: '04',
    description: '为科技产品和数字内容设计包装视觉，强化材质、结构、镜头运动与信息层级。',
    palette: 'project-d',
    poster: assetPath('/project-tech-poster.jpg'),
    preview: assetPath('/previews/project-tech-preview.mp4'),
    hls: videoPath('/hls/project-tech/master.m3u8'),
    video: assetPath('/project-tech-video.mp4'),
  },
  {
    title: '其他影像',
    meta: '实验短片 / 活动视觉 / 多媒介内容',
    label: '05',
    description: '承接更多影像方向的探索与制作，包括实验片、活动开场、社媒内容和跨媒介视觉。',
    palette: 'project-e',
    poster: assetPath('/project-other-poster.jpg'),
    preview: assetPath('/previews/project-other-preview.mp4'),
    hls: videoPath('/hls/project-other/master.m3u8'),
    video: assetPath('/project-other-video.mp4'),
  },
]

const experienceItems = [
  {
    year: '2015',
    title: '进入视觉设计领域',
    text: '从平面视觉、品牌基础和平面版式训练开始，建立对构图、字体、节奏和视觉层级的系统理解。',
  },
  {
    year: '2016',
    title: '深入品牌视觉设计和展厅平面设计',
    text: '开始将标识、版式和品牌视觉转化为落地的展陈设计，参与品牌视觉，展厅平面等内容制作。',
  },
  {
    year: '2018',
    title: '转向动态影像和三维动态设计',
    text: '将三维、粒子、合成和数字内容流程整合到项目中，形成面向商业传播的动态视觉系统。',
  },
  {
    year: '持续更新',
    title: 'AI设计与影像系统',
    text: '继续将生成式工具、动态设计和品牌内容流程结合，扩展更多商业与实验项目。',
  },
]

const strengths = [
  ['河南理工大学', '大学期间自学平面设计相关知识及相应的平面软件。', '2011-2015'],
  ['邦和文化有限公司', '负责辅助公司的平面设计及平面排版的相关工作。', '2015-2016'],
  ['西创集团', '独立完成集团的平面设计和品牌视觉的相关工作。', '2016-2018'],
  ['汉沙数字科技集团', '负责公司承接的动态视觉项目中的三维动态的场景搭建，动态设计，材质渲染工作。', '2019-至今'],
]

const socialItems = [
  {
    id: 'wechat',
    label: '微信',
    value: profile.wechat,
    qrSrc: assetPath('/wechat-qrcode.png'),
  },
  {
    id: 'qq',
    label: 'QQ',
    value: profile.qq,
    qrSrc: assetPath('/qq-qrcode.png'),
  },
]

function RotatingText({ texts, className = '' }) {
  const text = texts[0] ?? ''

  return (
    <span className={`text-rotate ${className}`}>
      <span className="text-rotate-sr-only">{text}</span>
      <span className="text-rotate-word" aria-hidden="true">
        {Array.from(text).map((char, index) => (
          <span className="text-rotate-element" style={{ '--char-index': index }} key={`${char}-${index}`}>
            {char}
          </span>
        ))}
      </span>
    </span>
  )
}

function SocialIcon({ type }) {
  if (type === 'wechat') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M13.4 9.2c-5.2 0-9.2 3.1-9.2 7 0 2.2 1.3 4.1 3.4 5.4l-.7 2.5 3-1.4c1.1.3 2.2.5 3.5.5 5.2 0 9.2-3.1 9.2-7s-4-7-9.2-7Z" />
        <path d="M20.5 13.8c4.2.5 7.3 3.1 7.3 6.4 0 1.9-1 3.5-2.8 4.7l.6 2.1-2.6-1.2c-.9.3-1.9.4-3 .4-3.5 0-6.5-1.8-7.7-4.3" />
        <circle cx="10.4" cy="15.7" r="1.1" />
        <circle cx="16.2" cy="15.7" r="1.1" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 4.7c-4.1 0-7.4 3.9-7.4 8.8 0 1.8.3 3.6.9 5.1l-2.2 4.8 4.2-.8c1.2.9 2.8 1.4 4.5 1.4s3.3-.5 4.5-1.4l4.2.8-2.2-4.8c.6-1.5.9-3.3.9-5.1 0-4.9-3.3-8.8-7.4-8.8Z" />
      <path d="M12.9 24.2 16 27.3l3.1-3.1" />
      <circle cx="13.3" cy="13.3" r="1.1" />
      <circle cx="18.7" cy="13.3" r="1.1" />
    </svg>
  )
}

function QrArtwork({ type }) {
  const pattern =
    type === 'wechat'
      ? [
          [42, 10],
          [54, 10],
          [78, 10],
          [34, 22],
          [58, 22],
          [70, 22],
          [46, 34],
          [82, 34],
          [22, 46],
          [58, 46],
          [70, 46],
          [34, 58],
          [46, 58],
          [82, 58],
          [10, 70],
          [34, 70],
          [58, 70],
          [70, 82],
        ]
      : [
          [42, 10],
          [66, 10],
          [78, 22],
          [34, 34],
          [46, 34],
          [70, 34],
          [22, 46],
          [58, 46],
          [82, 46],
          [34, 58],
          [70, 58],
          [10, 70],
          [46, 70],
          [58, 82],
          [82, 82],
          [34, 94],
          [70, 94],
          [94, 94],
        ]

  return (
    <svg className="qr-art" viewBox="0 0 120 120" role="img" aria-label={`${type === 'wechat' ? '微信' : 'QQ'}二维码`}>
      <rect width="120" height="120" rx="14" />
      {[
        [10, 10],
        [88, 10],
        [10, 88],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <rect width="28" height="28" rx="3" />
          <rect x="7" y="7" width="14" height="14" rx="2" />
        </g>
      ))}
      <g transform="translate(88 88)" opacity="0.18">
        <rect width="28" height="28" rx="3" />
        <rect x="7" y="7" width="14" height="14" rx="2" />
      </g>
      {pattern.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" rx="1.5" />
      ))}
    </svg>
  )
}

function OrnamentLayer({ variant = 'dark' }) {
  const ornamentCopy = {
    hero: {
      left: 'OPENING FRAME / MZL',
      right: 'SCREEN FIELD / MOTION ID',
      note: 'GENERATIVE IMAGE / BRAND MOTION / AI DESIGN',
    },
    projects: {
      left: 'SELECTED WORKS / CASE FIELD',
      right: 'VIDEO CLEAN AREA / DATA LAYER',
      note: 'PROJECT ARCHIVE / VISUAL SYSTEM / OUTPUT',
    },
    experience: {
      left: 'ABILITY MAP / GROWTH',
      right: 'DESIGN METHOD / BLUEPRINT',
      note: 'LAYOUT / BRAND / MOTION / AI PIPELINE',
    },
    strengths: {
      left: 'CAREER TIMELINE / 2011-2026',
      right: 'ROLE MARKERS / WORKFLOW',
      note: 'FROM GRAPHIC DESIGN TO 3D MOTION SYSTEM',
    },
    contact: {
      left: 'CONTACT SIGNAL / CQ',
      right: 'SOCIAL CODE / QR ACCESS',
      note: 'ADDRESS / PHONE / EMAIL / SOCIAL MEDIA',
    },
    dark: {
      left: 'MOTION INDEX / 2011-2026',
      right: 'PRIMARY FUNCTION / VISUAL SYSTEM',
      note: 'AI DESIGN / BRAND MOTION / SCENE RENDER',
    },
  }
  const copy = ornamentCopy[variant] ?? ornamentCopy.dark

  return (
    <div className={`ornament-layer ornament-layer-${variant}`} aria-hidden="true">
      <span className="ornament-dotfield ornament-dotfield-a" />
      <span className="ornament-dotfield ornament-dotfield-b" />
      <span className="ornament-plus ornament-plus-a" />
      <span className="ornament-plus ornament-plus-b" />
      <span className="ornament-line ornament-line-a" />
      <span className="ornament-line ornament-line-b" />
      <span className="ornament-ring" />
      <span className="ornament-ticks" />
      <span className="ornament-label ornament-label-left">{copy.left}</span>
      <span className="ornament-label ornament-label-right">{copy.right}</span>
      <span className="ornament-note">{copy.note}</span>
    </div>
  )
}

function HlsVideo({
  hls: hlsSrc,
  fallback,
  autoPlay = false,
  className,
  poster,
  controls = false,
  muted = false,
  loop = false,
  onClick,
  onDoubleClick,
  showFallbackMessage = false,
}) {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const [loadError, setLoadError] = useState(false)
  const [qualityOptions, setQualityOptions] = useState([])
  const [selectedQuality, setSelectedQuality] = useState('auto')
  const [qualityOpen, setQualityOpen] = useState(false)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return undefined
    }

    let hlsInstance
    let disposed = false
    hlsRef.current = null
    setLoadError(false)
    setQualityOptions([])
    setSelectedQuality('auto')
    setQualityOpen(false)
    const playVideo = () => {
      if (autoPlay) {
        video.play().catch(() => {})
      }
    }

    if (hlsSrc && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsSrc
      playVideo()
    } else if (hlsSrc) {
      import('hls.js')
        .then(({ default: Hls }) => {
          if (disposed) {
            return
          }

          if (!Hls.isSupported()) {
            video.src = fallback
            playVideo()
            return
          }

          hlsInstance = new Hls({
            capLevelToPlayerSize: true,
            startLevel: -1,
          })
          hlsRef.current = hlsInstance
          hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
            if (disposed) {
              return
            }

            const levels = hlsInstance.levels
              .map((level, index) => ({
                index,
                value: String(level.height || index),
                height: level.height,
                bitrate: level.bitrate,
                label: level.height ? `${level.height}p` : `${Math.round(level.bitrate / 1000)}K`,
              }))
              .filter((level) => level.height || level.bitrate)
              .sort((a, b) => a.height - b.height || a.bitrate - b.bitrate)

            setQualityOptions(
              levels.filter((level, index, list) => index === list.findIndex((item) => item.label === level.label)),
            )
          })
          hlsInstance.loadSource(hlsSrc)
          hlsInstance.attachMedia(video)
          playVideo()
        })
        .catch(() => {
          if (!disposed) {
            video.src = fallback
            setLoadError(false)
            playVideo()
          }
        })
    } else {
      video.src = fallback
      playVideo()
    }

    return () => {
      disposed = true
      hlsRef.current = null
      hlsInstance?.destroy()
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [autoPlay, fallback, hlsSrc])

  const handleQualityChange = (event) => {
    const value = event.target.value
    const hlsInstance = hlsRef.current
    const video = videoRef.current

    setSelectedQuality(value)
    setQualityOpen(false)
    event.currentTarget.blur()

    if (hlsInstance) {
      if (value === 'auto') {
        hlsInstance.currentLevel = -1
        return
      }

      const targetLevel = hlsInstance.levels.findIndex((level) => String(level.height) === value)
      hlsInstance.currentLevel = targetLevel >= 0 ? targetLevel : Number(value)
      return
    }

    if (!video || !hlsSrc) {
      return
    }

    if (value === 'auto') {
      video.src = hlsSrc
    } else {
      video.src = hlsSrc.replace(/master\.m3u8$/, `v${value}p/index.m3u8`)
    }

    video.play().catch(() => {})
  }

  const visibleQualityOptions = qualityOptions.length > 1 ? qualityOptions : defaultQualityOptions

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onError={() => setLoadError(true)}
      />
      {showFallbackMessage && loadError && fallback && (
        <a className="video-fallback-link" href={fallback} target="_blank" rel="noreferrer">
          视频加载失败，打开备用 MP4
        </a>
      )}
      {controls && hlsSrc && (
        <label
          className={`video-quality-control ${qualityOpen ? 'is-open' : ''}`}
          onMouseEnter={() => setQualityOpen(true)}
          onMouseLeave={() => setQualityOpen(false)}
          onFocus={() => setQualityOpen(true)}
        >
          <span>清晰度</span>
          <select value={selectedQuality} onChange={handleQualityChange} aria-label="选择视频清晰度">
            <option value="auto">自动</option>
            {visibleQualityOptions.map((level) => (
              <option key={`${level.value}-${level.label}`} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </label>
      )}
    </>
  )
}


function trapDialogFocus(event, container) {
  if (event.key !== 'Tab' || !container) {
    return
  }

  const focusable = Array.from(
    container.querySelectorAll('a[href], button:not([disabled]), select:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'),
  ).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')

  if (!focusable.length) {
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function ProjectPlayer({ project, onClose, onVideoClick, onVideoDoubleClick }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <div className="project-player-modal" role="dialog" aria-modal="true" aria-label={`播放${project.title}完整视频`}>
      <button className="project-player-backdrop" type="button" aria-label="Close video player" onClick={onClose} />
      <div ref={panelRef} className="project-player-panel" onKeyDown={(event) => trapDialogFocus(event, panelRef.current)}>
        <button ref={closeRef} className="project-player-close" type="button" aria-label="Close video player" onClick={onClose}>
          ×
        </button>
        <div className="project-player-stage">
          <HlsVideo
            className="project-player-video"
            hls={project.hls}
            fallback={project.video}
            poster={project.poster}
            controls
            autoPlay
            onClick={onVideoClick}
            onDoubleClick={onVideoDoubleClick}
            showFallbackMessage
          />
        </div>
        <div className="project-player-meta">
          <span>{project.label}</span>
          <strong>{project.title}</strong>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeQr, setActiveQr] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const [navOpen, setNavOpen] = useState(false)
  const videoClickTimer = useRef(null)
  const navRef = useRef(null)
  const navButtonRef = useRef(null)
  const qrCloseRef = useRef(null)
  const qrPanelRef = useRef(null)
  const returnFocusRef = useRef(null)
  const activeSocial = socialItems.find((item) => item.id === activeQr)

  const closeNav = () => {
    setNavOpen(false)
  }

  const handleNavLinkClick = () => {
    closeNav()
  }

  const openProject = (project, event) => {
    returnFocusRef.current = event.currentTarget
    setActiveProject(project)
  }

  const openQr = (id, event) => {
    returnFocusRef.current = event.currentTarget
    setActiveQr(id)
  }

  const closeQr = () => {
    setActiveQr(null)
  }

  const closeProject = () => {
    setActiveProject(null)
  }

  const toggleVideoPlayback = (video) => {
    if (video.paused) {
      video.play().catch(() => {})
      return
    }

    video.pause()
  }

  const handleVideoClick = (event) => {
    const video = event.currentTarget

    window.clearTimeout(videoClickTimer.current)
    videoClickTimer.current = window.setTimeout(() => {
      toggleVideoPlayback(video)
    }, 220)
  }

  const handleVideoDoubleClick = (event) => {
    const video = event.currentTarget

    window.clearTimeout(videoClickTimer.current)
    video.play().catch(() => {})

    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen()
    }
  }

  useLayoutEffect(() => {
    const initialHash = window.location.hash.slice(1)

    if (initialHash) {
      requestAnimationFrame(() => {
        document.getElementById(initialHash)?.scrollIntoView({ block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const revealGroups = [
      {
        selector: '.hero-media, .project-image, .contact-bg',
        type: 'media',
      },
      {
        selector: '.project-copy, .release-card, .strength-card, .contact-column',
        type: 'panel',
      },
      {
        selector: '.nav, .hero-mark, .hero-actions',
        type: 'button',
      },
      {
        selector:
          '.kicker, .section-heading p, .release-heading h2, .release-heading p, .project-meta span, .project-copy h3, .project-copy p, .release-date, .release-card h3, .release-card p, .strength-card h3, .strength-card p, .contact-title p, .contact-label, .contact-column p, .contact-column a',
        type: 'text',
      },
    ]

    const revealItems = revealGroups.flatMap(({ selector, type }) =>
      Array.from(document.querySelectorAll(selector)).map((element) => ({ element, type })),
    )

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    revealItems.forEach(({ element, type }, index) => {
      element.classList.add('reveal', `reveal-${type}`)
      element.style.setProperty('--reveal-index', String(index % 7))

      if (prefersReducedMotion) {
        element.classList.add('is-visible')
      }
    })

    if (prefersReducedMotion) {
      return undefined
    }

    void document.documentElement.offsetHeight

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    let observeFrame = 0

    observeFrame = requestAnimationFrame(() => {
      observeFrame = requestAnimationFrame(() => {
        revealItems.forEach(({ element }) => observer.observe(element))
      })
    })

    return () => {
      cancelAnimationFrame(observeFrame)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!activeQr) {
      return undefined
    }

    qrCloseRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeQr()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      returnFocusRef.current?.focus?.()
    }
  }, [activeQr])

  useEffect(() => {
    if (!activeProject) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeProject()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      returnFocusRef.current?.focus?.()
    }
  }, [activeProject])

  useEffect(() => {
    if (!navOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) {
        closeNav()
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeNav()
        navButtonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navOpen])

  return (
    <main className="site-shell">
      <section className="hero" id="home" aria-label="首页">
        <div className="hero-media" aria-hidden="true">
          <HlsVideo
            className="hero-video"
            hls={heroHls}
            fallback={assetPath('/hero-video.mp4')}
            autoPlay
            muted
            loop
            onClick={handleVideoClick}
            onDoubleClick={handleVideoDoubleClick}
          />
          <span className="light-field" />
        </div>

        <OrnamentLayer variant="hero" />
        <img className="hero-mark" src={assetPath('/mzl-logo-white.png')} alt="马哲林标识" />

        <nav ref={navRef} className={`nav ${navOpen ? 'is-open' : ''}`} aria-label="主导航">
          <button
            ref={navButtonRef}
            className="nav-trigger"
            type="button"
            aria-label={navOpen ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={navOpen}
            aria-controls="primary-navigation"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <div className="nav-panel" id="primary-navigation">
            <a className="brand" href="#home" onClick={handleNavLinkClick}>
              {profile.name}
              <span>{profile.title}</span>
            </a>
            <div className="nav-links">
              <a href="#projects" onClick={handleNavLinkClick}>项目</a>
              <a href="#experience" onClick={handleNavLinkClick}>能力</a>
              <a href="#strengths" onClick={handleNavLinkClick}>经历</a>
              <a href="#contact" onClick={handleNavLinkClick}>联系</a>
            </div>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-index" aria-hidden="true">
              <span>
                MOTION DESIGNER
                <br />/ AI DESIGNER
              </span>
            </div>
            <h1 className="hero-title">
              动态设计师
              <span>/ AI 设计师</span>
            </h1>
            <span className="hero-orb" aria-hidden="true" />
            <p className="hero-name">马哲林 <span aria-hidden="true">✦</span></p>
            <p className="kicker">生成式影像 / 品牌动效 / 数字内容</p>
            <p className="hero-subline">GENERATIVE IMAGERY / BRAND MOTION / DIGITAL CONTENT</p>
            <div className="hero-actions">
              <a href="#projects">查看精选项目</a>
            </div>
          </div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <OrnamentLayer variant="projects" />
        <div className="section-heading">
          <p>精选项目</p>
        </div>

        <div className="project-board">
          {projects.map((project) => (
            <article className="project-row" key={project.title}>
              <div
                className={`project-image ${project.palette}`}
              >
                {project.poster && <img className="project-poster" src={project.poster} alt="" loading="lazy" />}
                {project.video && (
                  <video
                    className="project-video"
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={project.poster}
                  />
                )}
                <button
                  className="project-play-surface"
                  type="button"
                  onClick={(event) => openProject(project, event)}
                  aria-label={`播放${project.title}完整视频`}
                >
                  <span className="project-play-indicator" aria-hidden="true">
                    <span className="project-play-icon" />
                  </span>
                </button>
                <span />
              </div>
              <div className="project-copy">
                <div className="project-meta">
                  <span>{project.label}</span>
                  <span>{project.meta}</span>
                </div>
                <h3>
                  <GradientText
                    className="project-gradient-title"
                    colors={['#0b1620', '#2f6dff', '#9b5cff', '#ff8a3d']}
                    animationSpeed={4}
                    direction="horizontal"
                    pauseOnHover
                  >
                    {project.title}
                  </GradientText>
                </h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience section" id="experience">
        <OrnamentLayer variant="experience" />
        <div className="experience-inner">
          <div className="release-heading">
            <h2>个人能力</h2>
            <span aria-hidden="true" />
            <p>持续积累视觉、动态与智能生成能力</p>
          </div>

          <div className="release-timeline" aria-label="个人能力时间线">
            {experienceItems.map((item) => (
              <article className="release-card" key={item.year}>
                <div className="release-date">{item.year}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="strengths section" id="strengths">
        <OrnamentLayer variant="strengths" />
        <div className="section-heading">
          <p>个人经历</p>
        </div>
        <div className="strength-grid">
          {strengths.map(([title, text, period]) => (
            <BorderGlow
              className="strength-card"
              key={title}
              edgeSensitivity={26}
              glowColor="184 92 72"
              backgroundColor="rgba(8, 14, 18, 0.62)"
              borderRadius={28}
              glowRadius={46}
              glowIntensity={0.95}
              coneSpread={24}
              animated={false}
              colors={['#78f7ff', '#35d9c4', '#7b61ff']}
              fillOpacity={0.16}
            >
              <article className="strength-card-content">
                <span />
                <h3>{title}</h3>
                <p>{text}</p>
                {period && <time className="strength-period">{period}</time>}
              </article>
            </BorderGlow>
          ))}
        </div>
      </section>

      <section className="contact-finale" id="contact">
        <OrnamentLayer variant="contact" />
        <div className="contact-bg" aria-hidden="true" />
        <div className="contact-title">
          <p>个人信息</p>
        </div>
        <div className="contact-grid contact-directory">
          <div className="contact-column">
            <span className="contact-label">地址</span>
            <p>地址：{profile.location}大石坝</p>
          </div>
          <div className="contact-column">
            <span className="contact-label">联系方式</span>
            <a href={`tel:${profile.phone}`}>电话：{profile.phone}</a>
            <a href={`mailto:${profile.email}`}>邮箱：{profile.email}</a>
          </div>
          <div className="contact-column contact-social">
            <span className="contact-label">社交媒体</span>
            <div className="social-actions" aria-label="社交媒体二维码">
              {socialItems.map((item) => (
                <button className="social-button" type="button" key={item.id} onClick={(event) => openQr(item.id, event)}>
                  <SocialIcon type={item.id} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {activeSocial && (
          <div className="qr-modal" role="dialog" aria-modal="true" aria-label={`${activeSocial.label}二维码`}>
            <button className="qr-modal-backdrop" type="button" aria-label="关闭二维码" onClick={closeQr} />
            <div ref={qrPanelRef} className="qr-panel" onKeyDown={(event) => trapDialogFocus(event, qrPanelRef.current)}>
              <button ref={qrCloseRef} className="qr-close" type="button" aria-label="关闭二维码" onClick={closeQr}>
                ×
              </button>
              <img className="qr-art" src={activeSocial.qrSrc} alt={`${activeSocial.label}二维码`} />
              <div className="qr-copy">
                <span>{activeSocial.label}</span>
                <strong>{activeSocial.value}</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      {activeProject && (
        <ProjectPlayer
          project={activeProject}
          onClose={closeProject}
          onVideoClick={handleVideoClick}
          onVideoDoubleClick={handleVideoDoubleClick}
        />
      )}
    </main>
  )
}

export default App
