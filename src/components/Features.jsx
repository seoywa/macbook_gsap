import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import React, { useRef, Suspense, useEffect } from "react";
import { features, featureSequence } from "../../constants/index";
import clsx from "clsx";
import { Html } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import MacbookModel from "../components/models/Macbook";
import useMacbookStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024)" });

  const { setTexture } = useMacbookStore();

  //Preload all feature videos during component mount;
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement("video");
      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      v.load();
    });
  }, []);

  useGSAP(() => {
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    //Sync the feature content

    const timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: "#f-canvas",
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      })
      .to("#f-canvas", {
        scrollTrigger: {
          trigger: "#features", // The section wrapping the canvas
          start: "center bottom", // When the bottom of the section hits bottom of viewport
          end: "bottom+=200 bottom", // Extend the fade duration
          scrub: true,
        },
        opacity: 0,
        ease: "power1.out",
      });

    //3D SPIN
    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
      });
    }

    //Content and texture syng
    timeline
      .call(() => setTexture("/videos/feature-1.mp4"))
      .to(".box1", { opacity: 1, y: 0, delay: 1 })

      .call(() => setTexture("/videos/feature-2.mp4"))
      .to(".box2", { opacity: 1, y: 0, delay: 1 })

      .call(() => setTexture("/videos/feature-3.mp4"))
      .to(".box3", { opacity: 1, y: 0, delay: 1 })

      .call(() => setTexture("/videos/feature-4.mp4"))
      .to(".box4", { opacity: 1, y: 0, delay: 1 })

      .call(() => setTexture("/videos/feature-5.mp4"))
      .to(".box5", { opacity: 1, y: 0, delay: 1 });
  }, []);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.06 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light</h2>

      <Canvas id="f-canvas" camera={{}}>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0.5">
        {features.map((feature, index) => (
          <div className={clsx("box", `box${index + 1}`, feature.styles)} key={feature.id}>
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className="text-white">{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
