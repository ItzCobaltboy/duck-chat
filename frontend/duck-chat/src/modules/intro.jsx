import { useState, useEffect } from 'react';
import FadeContent from '../components/FadeContent';
import LightPillar from '../components/LightPillar';
import GradientText from '../components/GradientText';
import DecryptedText from '../components/DecryptedText';
import AnimatedContent from '../components/AnimatedContent';
import { NeonCard } from './NeonCard';
import Button from './start_button'

import './intro.css';
import { Card } from '@heroui/card';

export function IntroScreen({ setShowIntro }) {

    const [isFadingOut, setIsFadingOut] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    function handleEnterClick() {
        setIsFadingOut(true);
        // Wait for fade-out animation to complete before hiding intro
        setTimeout(() => {setShowIntro(false);}, 500);
    }

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const backdropOpacity = Math.max(1 - scrollY / 500, 0);


    return (
        <>
        {/* Background LightPillar */}
        <div className={`lightpillar-bg`} style={{ opacity: backdropOpacity, transition: 'opacity 0.2s ease-out' }}>
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
        <div className={`intro-screen ${isFadingOut ? 'hidden' : ''}`} >
            <GradientText
            colors={["#1CCEFF", "#FFFFFF", "#C67BFF","#1CCEFF", "#FFFFFF", "#C67BFF", "#1CCEFF", "#FFFFFF", "#C67BFF" ,"#1CCEFF"]}
            animationSpeed={12}
            showBorder={false}
            className="custom-class"
            >
            {/* <h1 className='title'>Welcome to Duck Chat!</h1> */}
            <DecryptedText
                text="Welcome to Duck Chat!"
                speed={40}
                maxIterations={20}
                sequential={true}
                // className="revealed"
                // parentClassName="all-letters"
                // encryptedClassName="encrypted"
                animateOn='view'
                revealDirection="start"

                style={{ fontSize: '3rem' }}
                />

            
            </GradientText>

            <FadeContent blur={true} duration={1.5} delay={1.0}>
            <p>The Modern Place for Modern Yapping.</p>
            <div className='get-started-container'>
                <Button onClick={() => handleEnterClick()} />
            </div>
            </FadeContent>
        </div>

        <div className='card-array'>
            <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}>
                <NeonCard isPink={true}>
                    <div className="card-header">Zero Profiles. Zero Attachments.</div>
                    <p>
                    No bios. No usernames. No “link in bio”. You show up, type words,
                    and disappear like a digital ghost. As it should be.
                    </p>
                </NeonCard>
            </AnimatedContent>
            <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
            >
               
                <NeonCard isBlue={true}>
                <div className="card-header">Talk To Absolute Strangers</div>
                <p>
                    Could be your next best friend. Could be someone typing with one hand.
                    You will never know. That's the thrill. That's the chaos.
                </p>
                </NeonCard>

            </AnimatedContent>
            <AnimatedContent
                distance={150}
                direction="vertical"
                reverse={false}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.3}
                >
                <NeonCard isWhite={true}>
                    <div className="card-header">Skip Without Guilt</div>
                    <p>
                    Vibe’s off? One click and they’re gone forever.
                    No awkward goodbyes. No explanations. Just pure social violence.
                    </p>
                </NeonCard>
            </AnimatedContent>
        </div>
        </>
    );
}
