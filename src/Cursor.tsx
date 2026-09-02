import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    // Added <HTMLDivElement> so TypeScript knows what these refs point to
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorFollowerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hide the default system cursor globally
        document.body.style.cursor = 'none';

        // Typed the event 'e' as a MouseEvent
        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Main tiny dot follows mouse exactly
            gsap.to(cursorDotRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out"
            });

            // Larger follower circle trails slightly behind for the abstract feel
            gsap.to(cursorFollowerRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.6,
                ease: "power3.out"
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        // Cleanup function
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <>
            {/* The main golden dot */}
            <div
                ref={cursorDotRef}
                style={{
                    position: 'fixed', top: 0, left: 0, width: '6px', height: '6px',
                    backgroundColor: '#FFD700', borderRadius: '50%', pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)', zIndex: 9999,
                    boxShadow: '0 0 5px rgba(255, 215, 0, 0.8)'
                }}
            />
            {/* The trailing blue wireframe circle */}
            <div
                ref={cursorFollowerRef}
                style={{
                    position: 'fixed', top: 0, left: 0, width: '40px', height: '40px',
                    border: '1px solid rgba(0, 191, 255, 0.5)', borderRadius: '50%',
                    pointerEvents: 'none', transform: 'translate(-50%, -50%)', zIndex: 9998,
                    mixBlendMode: 'screen'
                }}
            />
        </>
    );
}