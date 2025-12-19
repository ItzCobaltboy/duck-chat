import { useState } from 'react';
import FadeContent from '../components/FadeContent';
import LightPillar from '../components/LightPillar';
import GradientText from '../components/GradientText';
import DecryptedText from '../components/DecryptedText';
import Button from './start_button'

import './intro.css';

export function IntroScreen({ setShowIntro }) {

    const [isFadingOut, setIsFadingOut] = useState(false);

    function handleEnterClick() {
        setIsFadingOut(true);
        // Wait for fade-out animation to complete before hiding intro
        setTimeout(() => {setShowIntro(false);}, 500);
    }

    return (
        <>
        {/* Background LightPillar */}
        <div className={`lightpillar-bg`}>
            <LightPillar
            topColor="#2e27ff"
            bottomColor="#cd89db"
            intensity={0.5}
            rotationSpeed={0.3}
            glowAmount={0.005}
            pillarWidth={3.0}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={45}
            interactive={false}
            mixBlendMode="normal"
            />
        </div>

        {/* Foreground content */}
        <div className={`intro-screen ${isFadingOut ? 'hidden' : ''}`}>
            <GradientText
            colors={["#1CCEFF", "#FFFFFF", "#C67BFF","#1CCEFF", "#FFFFFF", "#C67BFF", "#1CCEFF", "#FFFFFF", "#C67BFF" ,"#1CCEFF"]}
            animationSpeed={12}
            showBorder={false}
            className="custom-class"
            >
            <h1>Welcome to Duck Chat!</h1>
            </GradientText>

            <FadeContent blur={true} duration={1.5} delay={1.0}>
            <p>Your friendly chat application.</p>
            <div className='get-started-container'>
                <Button onClick={() => handleEnterClick()} />
            </div>
            </FadeContent>
        </div>
        </>
    );
}
