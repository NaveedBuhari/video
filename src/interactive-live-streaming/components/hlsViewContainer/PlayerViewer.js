import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../../static/animations/wait_for_HLS_animation.json";
import stoppedHLSSnimationData from "../../../static/animations/stopped_HLS_animation.json";
import Hls from "hls.js";
import useIsMobile from "../../../hooks/useIsMobile";
import useIsTab from "../../../hooks/useIsTab";
import { useMediaQuery } from "react-responsive";
import { useMeetingAppContext } from "../../../MeetingAppContextDef";

export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const PlayerViewer = () => {
  const { canPlay, downstreamUrl, afterMeetingJoinedHLSState } = useMeetingAppContext();
  // const [canPlay, setCanPlay] = useState(false);
  const playerRef = useRef();

  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const lottieSize = isMobile
    ? 180
    : isTab
    ? 180
    : isLGDesktop
    ? 240
    : isXLDesktop
    ? 240
    : 160;

  async function waitForHLSPlayable(downstreamUrl, maxRetry) {
    return new Promise(async (resolve, reject) => {
      if (maxRetry < 1) {
        return reject(false);
      }

      let status;

      try {
        const res = await fetch(downstreamUrl, {
          method: "GET",
        });
        status = res.status;
      } catch (err) {}

      if (status === 200) {
        return resolve(true);
      }

      await sleep(1000);

      return resolve(
        await waitForHLSPlayable(downstreamUrl, maxRetry - 1).catch((err) => {})
      );
    });
  }

  // const checkHLSPlayable = async (downstreamUrl) => {
  //   const canPlay = await waitForHLSPlayable(downstreamUrl, 20);

  //   if (canPlay) {
  //     setCanPlay(true);
  //   } else {
  //     setCanPlay(false);
  //   }
  // };

  useEffect(async () => {
    if (downstreamUrl) {
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

      // checkHLSPlayable(downstreamUrl);
    } else {
      // setCanPlay(false);
    }
  }, [downstreamUrl]);

  useEffect(() => {
    if (downstreamUrl && canPlay) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          autoStartLoad: true,
          defaultAudioCodec: "mp4a.40.2",
        });

        let player = document.querySelector("#hlsPlayer");

        hls.loadSource(downstreamUrl);
        hls.attachMedia(player);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {});
        hls.on(Hls.Events.ERROR, function (err) {
          console.log(err);
        });
      } else {
        if (typeof playerRef.current?.play === "function") {
          playerRef.current.src = downstreamUrl;
          playerRef.current.play();
        }
        // console.error("HLS is not supported");
      }
    }
  }, [downstreamUrl, canPlay]);

  return (
    <div
      className={`h-full w-full ${
        downstreamUrl && canPlay ? "bg-gray-800" : "bg-gray-750"
      } relative overflow-hidden rounded-lg`}
    >
      {downstreamUrl && canPlay ? (
        <div className="flex flex-col  items-center justify-center absolute top-0 left-0 bottom-0 right-0">
          <video
            ref={playerRef}
            id="hlsPlayer"
            autoPlay={true}
            controls
            style={{ width: "100%", height: "100%" }}
            playsInline
            muted={true}
            playing="true"
            onError={(err) => {
              console.log(err, "hls video error");
            }}
          ></video>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center absolute top-0 left-0 bottom-0 right-0">
            <div
              style={{
                height: lottieSize,
                width: lottieSize,
              }}
            >
              <Lottie
                animationData={
                  afterMeetingJoinedHLSState === "STOPPED"
                    ? stoppedHLSSnimationData
                    : animationData
                }
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                }}
                loop={afterMeetingJoinedHLSState === "STOPPED" ? false : true}
                autoPlay={true}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
            <p className="text-white text-center font-semibold text-2xl mt-0">
              {afterMeetingJoinedHLSState === "STOPPED"
                ? "Host has stopped the live streaming."
                : "Waiting for host to start live stream."}
            </p>
            {afterMeetingJoinedHLSState !== "STOPPED" && (
              <p className="text-white text-center font-semibold text-2xl">
                Meanwhile, take a few deep breaths.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerViewer;