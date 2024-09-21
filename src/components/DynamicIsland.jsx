import {
  DotsThree,
  Lock,
  LockOpen,
  Waveform,
  X,
  Rewind,
  FastForward,
  Play,
  Pause,
  Star,
  SpeakerHifi,
  XLogo,
  InstagramLogo,
  SnapchatLogo,
  GithubLogo,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { useCallback, useRef, useEffect, useState } from "react";

export default function DynamicIsland() {
  const [locked, setLocked] = useState(true);

  const islandContainer = useRef(null);
  const lock = useRef(null);
  const nav = useRef(null);

  const [activeTab, setActiveTab] = useState(null);

  const handleUnlock = useCallback(() => {
    setLocked((prev) => !prev);
  }, []);

  // Main island container animation
  useEffect(() => {
    gsap.to(islandContainer.current, {
      width: locked ? "auto" : activeTab ? 384 : 160,
      height: locked ? "auto" : activeTab ? 200 : 35,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)", // Spring effect
    });
  }, [locked, activeTab]);

  return (
    <>
      <div
        className="h-screen w-screen fixed top-0 left-0 z-[-1]"
        onClick={() => setActiveTab(null)}
      ></div>
      <div
        id="island"
        className="bg-black text-white hover:scale-105 dynamic-island border-white/20 border flex items-center overflow-hidden justify-center text-xl"
      >
        <div
          ref={islandContainer}
          className="island-container p-2.5 flex items-center justify-center"
        >
          <div className="flex items-center justify-between w-full">
            {!activeTab && (
              <div
                ref={lock}
                onClick={handleUnlock}
                className="flex items-center hover:scale-105 transition-all duration-500 hover:text-white"
              >
                {locked ? (
                  <Lock weight="bold" />
                ) : (
                  <LockOpen weight="bold" className="text-green-500" />
                )}
              </div>
            )}

            {!locked && !activeTab && (
              <div ref={nav} className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("music")}
                  className="flex items-center hover:scale-105 transition-all duration-500 hover:text-white"
                >
                  <Waveform weight="bold" />
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className="flex items-center hover:scale-105 transition-all duration-500 hover:text-white"
                >
                  <DotsThree weight="bold" />
                </button>
              </div>
            )}
          </div>

          <MusicPlayer activeTab={activeTab} setActiveTab={setActiveTab} />
          <About activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </>
  );
}

function About({ activeTab, setActiveTab }) {
  const about = useRef(null);

  useEffect(() => {
    if (activeTab === "about") {
      // Animate entering
      gsap.from(about.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)", // Spring effect
      });
    } else if (about.current) {
      // Animate exiting
      gsap.to(about.current, {
        opacity: 0,
        scale: 1,
        duration: 1.5,
        ease: "elastic.in(1, 0.5)", // Spring effect
        onComplete: () => setActiveTab(null), // Cleanup after animation
      });
    }
  }, [activeTab]);

  return (
    activeTab === "about" && (
      <div
        ref={about}
        className="w-min h-min min-w-[350px] min-h-[140px] relative p-4 self-center text-sm text-zinc-400 flex flex-col gap-2"
      >
        <div>
          Hey, <strong className="text-white">I'm Harry!</strong> I made this
          fun{" "}
          <strong className="text-white">dynamic island web experiment</strong>{" "}
          because I wanted to bring some of that slick mobile magic to the
          web—plus, it's just fun to play with{" "}
          <strong className="text-white">bouncy buttons!</strong>
        </div>
        <div className="text-white flex item-center gap-2 flex-wrap text-xs">
          <a
            href="http://x.com/theharryszn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 p-1 px-2 hover:bg-zinc-800/60 rounded-full transition-all group"
          >
            <XLogo weight="bold" />
            <span className="font-medium">Twitter</span>
          </a>
          <a
            href="http://instagram.com/theharryszn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 p-1 px-2 hover:bg-zinc-800/60 rounded-full transition-all group"
          >
            <InstagramLogo weight="bold" />
            <span className="font-medium">Instagram</span>
          </a>
          <a
            href="http://snapchat.com/theharryszn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 p-1 px-2 hover:bg-zinc-800/60 rounded-full transition-all group"
          >
            <SnapchatLogo weight="bold" />
            <span className="font-medium">Snapchat</span>
          </a>
          <a
            href="http://github.com/theharryszn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 p-1 px-2 hover:bg-zinc-800/60 rounded-full transition-all group"
          >
            <GithubLogo weight="bold" />
            <span className="font-medium">Github</span>
          </a>
        </div>
      </div>
    )
  );
}

function MusicPlayer({ activeTab, setActiveTab }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const music = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleStar = () => {
    setIsStarred((prev) => !prev);
  };

  // Handle entering/exiting animation for the music tab
  useEffect(() => {
    if (activeTab === "music") {
      // Animate entering
      gsap.from(music.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)", // Spring effect
      });
    } else if (music.current) {
      // Animate exiting
      gsap.to(music.current, {
        opacity: 0,
        scale: 1,
        duration: 1.5,
        ease: "elastic.in(1, 0.5)", // Spring effect
        onComplete: () => setActiveTab(null), // Cleanup after animation
      });
    }
  }, [activeTab]);

  return (
    activeTab === "music" && (
      <div
        ref={music}
        className="p-5 flex flex-col gap-4 w-min h-min min-w-[350px] min-h-[140px] relative"
      >
        <div className="flex items-center gap-3 text-base">
          <img
            src="https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2F88dd524122ced79a8f14bffbaade50d1.999x999x1.png"
            alt="albumm"
            className="aspect-square w-12 rounded-xl bg-zinc-900 object-cover"
          />
          <div className="flex-1">
            <div className="font-semibold">iseoluwa</div>
            <div className="text-zinc-500 font-medium">Fireboy DML</div>
          </div>
          <button className="flex items-center hover:scale-105 transition-all duration-500 hover:text-white text-zinc-500">
            <Waveform weight="bold" size={30} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <div>1:20</div>
          <div className="bg-zinc-800 rounded-full flex-1 h-2 overflow-hidden">
            <div className="w-1/2 h-full bg-zinc-500"></div>
          </div>
          <div>-0:34</div>
        </div>
        <div className="text-sm flex items-center justify-between gap-5">
          <button className="flex items-center hover:scale-105 transition-all duration-500 hover:text-white">
            <SpeakerHifi weight="bold" size={28} className="text-green-500" />
          </button>
          <button className="flex items-center hover:scale-105 transition-all duration-500 hover:text-white">
            <Rewind weight="fill" size={35} />
          </button>
          <button
            className="flex items-center hover:scale-105 transition-all duration-500 hover:text-white"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause weight="fill" size={35} />
            ) : (
              <Play weight="fill" size={35} />
            )}
          </button>
          <button className="flex items-center hover:scale-105 transition-all duration-500 hover:text-white">
            <FastForward weight="fill" size={35} />
          </button>
          <button onClick={handleStar}>
            {isStarred ? (
              <Star weight="fill" size={28} className="text-yellow-500" />
            ) : (
              <Star size={28} />
            )}
          </button>
        </div>
      </div>
    )
  );
}
