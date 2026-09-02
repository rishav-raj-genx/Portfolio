import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './Cursor';
import SplineScene from './SplineScene';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const container = useRef(null);

  function onLoad(spline) {
    const drop1 = spline.findObjectByName('Droplet 1');
    const drop2 = spline.findObjectByName('Droplet 2');
    const drop3 = spline.findObjectByName('Droplet 3');
    const sprout = spline.findObjectByName('Sprout');
    const bigTree = spline.findObjectByName('BigTree');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    if (drop1 && drop2 && drop3) {
      tl.to(drop1.position, { y: drop1.position.y - 400, duration: 1 }, 0);
      tl.to(drop2.position, { y: drop2.position.y - 400, duration: 1 }, 0.2);
      tl.to(drop3.position, { y: drop3.position.y - 400, duration: 1 }, 0.4);
    }

    if (sprout && bigTree) {
      tl.to(sprout.scale, { x: 0, y: 0, z: 0, duration: 0.5 }, 1.5);
      tl.to(bigTree.scale, { x: 1, y: 1, z: 1, duration: 1 }, 1.5);
    }

    gsap.utils.toArray('.story-text').forEach((text) => {
      gsap.fromTo(text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: text,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );
    });
  }

  return (
    <div ref={container} style={{ position: 'relative', height: '400vh', backgroundColor: '#000000', margin: 0 }}>

      <CustomCursor />
      <SplineScene onLoad={onLoad} />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', padding: '10vw' }}>

        <section style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
          <h1 className="story-text" style={{ fontSize: '5rem', margin: 0, color: '#FFD700', fontWeight: 'lighter' }}>
            Rishav Raj
          </h1>
        </section>

        <section style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
          <h2 className="story-text" style={{ fontSize: '3rem', maxWidth: '600px', color: '#00BFFF', fontWeight: 'lighter' }}>
            Nurturing foundations with React & JavaScript. Building dynamic, fully responsive CRUD applications.
          </h2>
        </section>

        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <h2 className="story-text" style={{ fontSize: '3rem', maxWidth: '600px', color: '#00FF00', fontWeight: 'lighter', textAlign: 'right' }}>
            Contributing to open source. Squashing layout bugs in the Gambit project and executing professional GitHub workflows.
          </h2>
        </section>

        <section style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
          <h2 className="story-text" style={{ fontSize: '3rem', maxWidth: '600px', color: '#FFD700', fontWeight: 'lighter' }}>
            Thriving in 24-hour sprints, architecting scalable Node.js Web Apps utilizing Express and Handlebars.
          </h2>
        </section>

      </div>
    </div>
  );
}