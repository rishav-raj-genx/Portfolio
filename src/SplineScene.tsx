import Spline from '@splinetool/react-spline';

// Added the TypeScript definition for the onLoad prop
export default function SplineScene({ onLoad }: { onLoad: (spline: any) => void }) {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
            <Spline
                scene="https://prod.spline.design/BgRHCqD5C3jPrcHaKRfDNNg6/scene.splinecode"
                onLoad={onLoad}
            />
        </div>
    );
}