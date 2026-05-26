import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { staggerContainer, fadeUp } from "./revealVariants";
import Reveal from "./Reveal";

// Helper to extract clean YouTube ID from embed links
const getYouTubeId = (url) => {
  if (!url) return "";
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
};

// Helper to split title for premium serif styling
const formatTitle = (title) => {
  if (!title) return { main: "", serif: "" };
  if (title.includes(" || ")) {
    const parts = title.split(" || ");
    return { main: parts[0] + " ", serif: parts[1] };
  }
  if (title.includes("!")) {
    const parts = title.split("!");
    return { main: parts[0] + " ", serif: "!" };
  }
  if (title.includes("of ")) {
    const parts = title.split("of ");
    return { main: parts[0] + "of ", serif: parts[1] };
  }

  // split near middle for standard words
  const words = title.split(" ");
  if (words.length > 2) {
    const mid = Math.ceil(words.length / 2);
    return {
      main: words.slice(0, mid).join(" ") + " ",
      serif: words.slice(mid).join(" "),
    };
  }
  return { main: title, serif: "" };
};

// Video Card sub-component for managing individual play states
function VideoCard({ video, index, aspectClass, category }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(video.src);

  // Dynamic aesthetic tones for backgrounds from global styling sheet
  const tones = ["a", "b", "c", "d", "e", "f"];
  const tone = tones[index % 6];

  const getTag = () => {
    if (category === "long") {
      return "YouTube - Long-form";
    }
    if (category === "ads") {
      return "Social Ad - Square";
    }
    return "Short-form - Reel";
  };

  const getOverlayBadge = () => {
    if (category === "ads") {
      return "Social Ad";
    }
    return "Short-Form";
  };

  const { main, serif } = formatTitle(video.title);

  return (
    <motion.div variants={fadeUp} className="work-card group" data-tone={tone}>
      <div
        className={`work-thumb relative w-full ${aspectClass} overflow-hidden bg-black`}
      >
        {/* Elegant Floating Glassmorphic Badge */}
        {category !== "long" && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md bg-black/40 border border-white/10 text-white/90 pointer-events-none">
            {getOverlayBadge()}
          </div>
        )}

        {playing ? (
          <iframe
            src={`${video.src}${video.src.includes("?") ? "&" : "?"}autoplay=1`}
            title={video.title || "Video edit preview"}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="absolute inset-0 cursor-pointer flex items-center justify-center"
            role="button"
            aria-label={`Play ${video.title || "video"}`}
            onClick={() => setPlaying(true)}
            style={{
              backgroundImage: videoId
                ? `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/45" />

            {/* Glowing circular play button */}
            <div className="work-play transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/35">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {category === "long" && video.title && (
        <div className="work-meta">
          <div className="work-tag">{getTag()}</div>
          <h3>
            {main}
            {serif && <span className="serif">{serif}</span>}
          </h3>
        </div>
      )}
    </motion.div>
  );
}

export default function Work() {
  const [activeTab, setActiveTab] = useState("reels"); // 'reels' | 'long' | 'ads'
  const carouselRef = useRef(null);
  const isLoopAdjustingRef = useRef(false);
  const isUserDraggingRef = useRef(false);
  const loopResetTimerRef = useRef(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    hasMoved: false,
  });
  const suppressClickRef = useRef(false);
  const LOOP_SETS = 5;

  // Short-form videos data
  const shortFormVideos = [
    {
      type: "iframe",
      src: "https://www.youtube.com/embed/m1h0Le6JjdQ",
      title: "The Story of Repair.sg",
    },
    {
      type: "iframe",
      src: "https://www.youtube.com/embed/R8ER9BfbnJc",
      title: "The Story of Repair.sg",
    },
    {
      type: "iframe",
      src: "https://www.youtube.com/embed/tULM8uFkKBM",
      title: "Every Entrepreneur Should Know This!",
    },
    {
      type: "iframe",
      src: "https://www.youtube.com/embed/Jp6MAD3YD7I",
      title: "Every Entrepreneur Should Know This!",
    },
    {
      type: "iframe",
      src: "https://www.youtube.com/embed/3U6OHt-CGHo",
      title: "The Story of Repair.sg",
    },
    {
      type: "iframe",
      src: "https://www.youtube.com/embed/v46gC12y3ME",
      title: "Every Entrepreneur Should Know This!",
    },
    {
      type: "iframe",
      src: "https://www.youtube.com/embed/mmjqRN9jpT4",
      title: "Every Entrepreneur Should Know This!",
    },
  ];

  // Long-form videos data
  const longFormVideos = [
    {
      src: "https://www.youtube.com/embed/sm4f33tKyQ8",
      title: "Ground Mount Panel Installation || Option One Solar",
    },
    {
      src: "https://www.youtube.com/embed/jdRKfbjGmW4",
      title: "Ground Mount Panel Installation || Option One Solar",
    },
    {
      src: "https://www.youtube.com/embed/gGPZmM8JSHA",
      title: "Ground Mount Panel Installation || Option One Solar",
    },
    {
      src: "https://www.youtube.com/embed/Y7F5uVba2A0",
      title: "Ground Mount Panel Installation || Option One Solar",
    },
  ];

  // Ads square videos data
  const adsVideos = [
    {
      src: "https://www.youtube.com/embed/XRP_GhySBjE?enablejsapi=1",
      hasTitle: false,
      type: "iframe",
    },
    {
      src: "https://www.youtube.com/embed/n_xrYTgYPQI?enablejsapi=1",
      hasTitle: false,
      type: "iframe",
    },
    {
      src: "https://www.youtube.com/embed/AdPYy0fCEGM?enablejsapi=1",
      hasTitle: false,
      type: "iframe",
    },
    {
      src: "https://www.youtube.com/embed/Cg19ZH4ey4o?enablejsapi=1",
      hasTitle: false,
      type: "iframe",
    },
  ];

  // Ads long videos data
  const adsLongVideos = [
    {
      src: "https://www.youtube.com/embed/jM4kh6Y-tKo?enablejsapi=1",
      hasTitle: false,
      type: "iframe",
    },
    {
      src: "https://www.youtube.com/embed/xevHz3N53f4?enablejsapi=1",
      hasTitle: false,
      type: "iframe",
    },
    {
      src: "https://www.youtube.com/embed/xCKzbzXck4A?enablejsapi=1",
      hasTitle: false,
      type: "iframe",
    },
    {
      src: "https://www.youtube.com/embed/PeEuHr1kFjE?enablejsapi=1",
      hasTitle: false,
      type: "iframe",
    },
  ];

  // Combined Social Ads (Square format)
  const combinedAds = [...adsVideos, ...adsLongVideos];

  const tabs = [
    { id: "reels", label: "Short-form" },
    { id: "long", label: "YouTube Long-form" },
    { id: "ads", label: "Social Ads" },
  ];

  // Helper to dynamically calculate one full set width from actual DOM coordinates
  const getSingleSetWidth = () => {
    if (carouselRef.current && carouselRef.current.children.length >= 8) {
      const children = carouselRef.current.children;
      const firstRect = children[0].getBoundingClientRect();
      const nextSetRect = children[shortFormVideos.length].getBoundingClientRect();
      return nextSetRect.left - firstRect.left;
    }
    // Fallback to estimated sizing if layout is not fully complete
    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? 330 : 460;
    const gap = isMobile ? 16 : 28;
    return (cardWidth + gap) * shortFormVideos.length;
  };

  // Set initial scroll position to middle set for infinite looping
  useEffect(() => {
    if (activeTab === "reels" && carouselRef.current) {
      const timer = setTimeout(() => {
        if (carouselRef.current) {
          const singleSetWidth = getSingleSetWidth();
          carouselRef.current.scrollLeft = singleSetWidth * 2;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  useEffect(() => {
    return () => {
      if (loopResetTimerRef.current) {
        clearTimeout(loopResetTimerRef.current);
      }
    };
  }, []);

  const handleCarouselScroll = () => {
    if (!carouselRef.current || isLoopAdjustingRef.current || isUserDraggingRef.current) {
      return;
    }

    const track = carouselRef.current;
    const singleSetWidth = getSingleSetWidth();
    const minSafeScroll = singleSetWidth;
    const maxSafeScroll = singleSetWidth * (LOOP_SETS - 2);

    const adjustLoopPosition = (targetLeft) => {
      isLoopAdjustingRef.current = true;
      const previousSnapType = track.style.scrollSnapType;
      track.style.scrollSnapType = "none";
      track.scrollLeft = targetLeft;

      requestAnimationFrame(() => {
        track.style.scrollSnapType = previousSnapType;
        isLoopAdjustingRef.current = false;
      });
    };

    if (loopResetTimerRef.current) {
      clearTimeout(loopResetTimerRef.current);
    }

    // Recenter only after scroll settles so the seam shift doesn't interrupt active motion.
    loopResetTimerRef.current = setTimeout(() => {
      if (!carouselRef.current || isLoopAdjustingRef.current) {
        return;
      }

      const currentLeft = carouselRef.current.scrollLeft;
      if (currentLeft <= minSafeScroll - 5) {
        adjustLoopPosition(currentLeft + singleSetWidth);
      } else if (currentLeft >= maxSafeScroll + 5) {
        adjustLoopPosition(currentLeft - singleSetWidth);
      }
    }, 80);
  };

  const handleScroll = (direction) => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      const track = carouselRef.current;
      const firstChild = track.children[0];
      const secondChild = track.children[1];

      // Calculate actual card width and gap dynamically from the DOM
      const cardWidth = firstChild.getBoundingClientRect().width;
      const gap = secondChild
        ? secondChild.getBoundingClientRect().left - firstChild.getBoundingClientRect().right
        : (window.innerWidth <= 768 ? 16 : 28);

      const scrollAmount = cardWidth + gap; // scroll one card at a time to preserve centered focus
      const singleSetWidth = getSingleSetWidth();
      const minSafeScroll = singleSetWidth;
      const maxSafeScroll = singleSetWidth * (LOOP_SETS - 2);
      const delta = direction === "left" ? -scrollAmount : scrollAmount;
      const projectedLeft = track.scrollLeft + delta;

      // Pre-shift before animating to avoid crossing the seam during smooth scrolling.
      if (projectedLeft <= minSafeScroll + 20) {
        track.scrollLeft += singleSetWidth;
      } else if (projectedLeft >= maxSafeScroll - 20) {
        track.scrollLeft -= singleSetWidth;
      }

      track.scrollBy({
        left: delta,
        behavior: "smooth",
      });
    }
  };

  const endDrag = () => {
    if (!carouselRef.current || !dragStateRef.current.isDragging) {
      return;
    }

    dragStateRef.current.isDragging = false;
    isUserDraggingRef.current = false;
    const track = carouselRef.current;
    track.classList.remove("is-dragging");
    if (!dragStateRef.current.hasMoved) {
      suppressClickRef.current = false;
    }
  };

  const handlePointerDown = (e) => {
    // Keep native touch scrolling; drag-to-scroll is for mouse users.
    if (e.pointerType !== "mouse" || e.button !== 0 || !carouselRef.current) {
      return;
    }

    const track = carouselRef.current;
    dragStateRef.current = {
      isDragging: true,
      startX: e.clientX,
      startScrollLeft: track.scrollLeft,
      hasMoved: false,
    };
    isUserDraggingRef.current = true;
    suppressClickRef.current = false;
    track.classList.add("is-dragging");
  };

  const handlePointerMove = (e) => {
    if (!dragStateRef.current.isDragging || !carouselRef.current) {
      return;
    }

    const { startX, startScrollLeft } = dragStateRef.current;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 8) {
      dragStateRef.current.hasMoved = true;
      suppressClickRef.current = true;
    }

    carouselRef.current.scrollLeft = startScrollLeft - deltaX;
  };

  const handleClickCapture = (e) => {
    if (!suppressClickRef.current) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    suppressClickRef.current = false;
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case "long":
        return (
          <motion.div
            key="long-grid"
            className="work-grid grid-cols-2"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {longFormVideos.map((video, idx) => (
              <VideoCard
                key={video.src + idx}
                video={video}
                index={idx}
                aspectClass="aspect-long"
                category="long"
              />
            ))}
          </motion.div>
        );
      case "ads":
        return (
          <motion.div
            key="ads-grid"
            className="work-grid grid-cols-4"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {combinedAds.map((video, idx) => (
              <VideoCard
                key={video.src + idx}
                video={video}
                index={idx}
                aspectClass="work-thumb aspect-square"
                category="ads"
              />
            ))}
          </motion.div>
        );
      case "reels":
      default:
        return (
          <div className="relative">
            {/* Full-width Carousel Outer Segment */}
            <div className="reels-carousel-section">
              {/* Edge-to-edge side fading vignette masks aligned with the viewport edges */}
              <div className="carousel-vignette-left" />
              <div className="carousel-vignette-right" />

              <motion.div
                ref={carouselRef}
                key="reels-carousel"
                className="reels-carousel-track"
                onScroll={handleCarouselScroll}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onPointerLeave={endDrag}
                onClickCapture={handleClickCapture}
                variants={staggerContainer(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                {[
                  ...shortFormVideos,
                  ...shortFormVideos,
                  ...shortFormVideos,
                  ...shortFormVideos,
                  ...shortFormVideos,
                ].map((video, idx) => (
                  <div key={video.src + idx} className="reels-card-wrapper">
                    <VideoCard
                      video={video}
                      index={idx}
                      aspectClass="work-thumb aspect-short"
                      category="reels"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Minimalist Floating Controls */}
            <div className="carousel-controls">
              <button
                className="carousel-btn"
                onClick={() => handleScroll("left")}
                aria-label="Scroll carousel left"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="carousel-btn"
                onClick={() => handleScroll("right")}
                aria-label="Scroll carousel right"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="work" id="work">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Selected work</div>
              <h2>
                Recent <span className="serif">edits</span>.
              </h2>
            </div>
            <p>
              A curated collection of projects across YouTube long-form, social
              ads and short-form content. Click through to watch.
            </p>
          </div>
        </Reveal>

        {/* Dynamic Category Navigation Tabs */}
        <div className="work-tabs-container">
          <div className="work-tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`work-tab-btn ${isActive ? "is-active" : ""}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Animated Content Container */}
        {renderActiveContent()}
      </div>
    </section>
  );
}


