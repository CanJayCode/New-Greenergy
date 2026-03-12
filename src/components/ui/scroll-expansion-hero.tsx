'use client';

import React, {
    useEffect,
    useRef,
    useState,
    ReactNode,
    TouchEvent,
    WheelEvent,
} from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionSection = motion.section as any;
const MotionP = motion.p as any;
const MotionH2 = motion.h2 as any;

interface ScrollExpandMediaProps {
    mediaType?: 'video' | 'image';
    mediaSrc: string;
    posterSrc?: string;
    bgImageSrc: string;
    title?: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: ReactNode;
}

const ScrollExpandMedia = ({
    mediaType = 'video',
    mediaSrc,
    posterSrc,
    bgImageSrc,
    title,
    date,
    scrollToExpand,
    textBlend,
    children,
}: ScrollExpandMediaProps) => {
    const [showContent, setShowContent] = useState<boolean>(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
    const [touchStartY, setTouchStartY] = useState<number>(0);
    const [isMobileState, setIsMobileState] = useState<boolean>(false);

    // Motion Values for smooth animation
    const targetProgress = useMotionValue(0);
    const scrollProgress = useSpring(targetProgress, {
        damping: 30,
        stiffness: 150,
        mass: 0.5,
        restDelta: 0.001
    });

    const [currentProgress, setCurrentProgress] = useState(0);

    const sectionRef = useRef<HTMLDivElement | null>(null);

    // Keep track of internal state based on smooth progress
    useEffect(() => {
        return scrollProgress.on('change', (latest) => {
            setCurrentProgress(latest);
            if (latest >= 0.99) {
                setMediaFullyExpanded(true);
                setShowContent(true);
            } else if (latest < 0.75) {
                setShowContent(false);
                if (latest < 0.95) {
                    setMediaFullyExpanded(false);
                }
            }
        });
    }, [scrollProgress]);

    useEffect(() => {
        targetProgress.set(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
    }, [mediaType, targetProgress]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
                // We're at the top and scrolling up - allow collapsing
                setMediaFullyExpanded(false);
                e.preventDefault();
            } else if (!mediaFullyExpanded) {
                e.preventDefault();
                // Normalized scroll delta
                const scrollDelta = e.deltaY * 0.0015;
                const newProgress = Math.min(
                    Math.max(targetProgress.get() + scrollDelta, 0),
                    1
                );
                targetProgress.set(newProgress);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            setTouchStartY(e.touches[0].clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!touchStartY) return;

            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;

            if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                e.preventDefault();
            } else if (!mediaFullyExpanded) {
                e.preventDefault();
                // Normalized touch delta
                const scrollFactor = deltaY < 0 ? 0.012 : 0.008;
                const scrollDelta = deltaY * scrollFactor;
                const newProgress = Math.min(
                    Math.max(targetProgress.get() + scrollDelta, 0),
                    1
                );
                targetProgress.set(newProgress);
                setTouchStartY(touchY);
            }
        };

        const handleTouchEnd = (): void => {
            setTouchStartY(0);
        };

        window.addEventListener('wheel', handleWheel as unknown as EventListener, {
            passive: false,
        });
        window.addEventListener(
            'touchstart',
            handleTouchStart as unknown as EventListener,
            { passive: false }
        );
        window.addEventListener(
            'touchmove',
            handleTouchMove as unknown as EventListener,
            { passive: false }
        );
        window.addEventListener('touchend', handleTouchEnd as EventListener);

        return () => {
            window.removeEventListener(
                'wheel',
                handleWheel as unknown as EventListener
            );
            window.removeEventListener(
                'touchstart',
                handleTouchStart as unknown as EventListener
            );
            window.removeEventListener(
                'touchmove',
                handleTouchMove as unknown as EventListener
            );
            window.removeEventListener('touchend', handleTouchEnd as EventListener);
        };
    }, [mediaFullyExpanded, touchStartY, targetProgress]);

    useEffect(() => {
        const checkIfMobile = (): void => {
            setIsMobileState(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Smoothed calculations
    const mediaWidth = useTransform(scrollProgress, [0, 1], [300, isMobileState ? 950 : 1550]);
    const mediaHeight = useTransform(scrollProgress, [0, 1], [400, isMobileState ? 600 : 800]);
    const textTranslateX = useTransform(scrollProgress, [0, 1], [0, isMobileState ? 180 : 150]);
    const bgOpacity = useTransform(scrollProgress, [0, 1], [1, 0]);

    const firstWord = title ? title.split(' ')[0] : '';
    const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

    return (
        <div
            ref={sectionRef}
            className='transition-colors duration-700 ease-in-out overflow-x-hidden'
        >
            <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
                <div className='relative w-full flex flex-col items-center min-h-[100dvh] text-white'>
                    <MotionDiv
                        className='absolute inset-0 z-0 h-full'
                        style={{ opacity: bgOpacity } as any}
                    >
                        <img
                            src={bgImageSrc}
                            alt='Background'
                            className='w-screen h-screen object-cover object-center'
                        />
                        <div className='absolute inset-0 bg-black/10' />
                    </MotionDiv>

                    <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
                        <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative overflow-hidden'>
                            <MotionDiv
                                className='absolute z-0 top-1/2 left-1/2 rounded-2xl overflow-hidden bg-black'
                                style={{
                                    width: isMobileState ? 320 : 640,
                                    height: isMobileState ? 180 : 360,
                                    maxWidth: '95vw',
                                    maxHeight: '90vh',
                                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.5)',
                                    x: '-50%',
                                    y: '-50%',
                                    scale: useTransform(scrollProgress, [0, 1], [1, isMobileState ? 3 : 4]),
                                    willChange: 'transform',
                                    backfaceVisibility: 'hidden',
                                    transformStyle: 'preserve-3d'
                                } as any}
                            >
                                {mediaType === 'video' ? (
                                    mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be') ? (
                                        <div className='relative w-full h-full pointer-events-none'>
                                            <iframe
                                                width='100%'
                                                height='100%'
                                                src={
                                                    mediaSrc.includes('embed')
                                                        ? mediaSrc +
                                                        (mediaSrc.includes('?') ? '&' : '?') +
                                                        'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                                                        : (mediaSrc.includes('watch?v=') ? mediaSrc.replace('watch?v=', 'embed/') : mediaSrc.replace('youtu.be/', 'youtube.com/embed/')) +
                                                        '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                                                        (mediaSrc.includes('v=') ? mediaSrc.split('v=')[1] : mediaSrc.split('/').pop())
                                                }
                                                className='w-full h-full'
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                allowFullScreen
                                            />
                                            <div className='absolute inset-0 z-10' />
                                            <MotionDiv
                                                className='absolute inset-0 bg-black/30'
                                                style={{
                                                    opacity: useTransform(scrollProgress, [0, 1], [0.7, 0.2])
                                                } as any}
                                            />
                                        </div>
                                    ) : (
                                        <div className='relative w-full h-full pointer-events-none'>
                                            <video
                                                src={mediaSrc}
                                                poster={posterSrc}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload='auto'
                                                className='w-full h-full object-cover'
                                                controls={false}
                                                disablePictureInPicture
                                                disableRemotePlayback
                                            />
                                            <div className='absolute inset-0 z-10' />
                                            <MotionDiv
                                                className='absolute inset-0 bg-black/30'
                                                style={{
                                                    opacity: useTransform(scrollProgress, [0, 1], [0.7, 0.2])
                                                } as any}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <div className='relative w-full h-full'>
                                        <img
                                            src={mediaSrc}
                                            alt={title || 'Media content'}
                                            className='w-full h-full object-cover'
                                        />
                                        <MotionDiv
                                            className='absolute inset-0 bg-black/50'
                                            style={{
                                                opacity: useTransform(scrollProgress, [0, 1], [0.7, 0.4])
                                            } as any}
                                        />
                                    </div>
                                )}

                                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                                    {date && (
                                        <MotionP
                                            className='text-2xl text-white font-bold'
                                            style={{ x: useTransform(scrollProgress, (v: number) => `-${v * (isMobileState ? 180 : 150)}vw`) } as any}
                                        >
                                            {date}
                                        </MotionP>
                                    )}
                                    {scrollToExpand && (
                                        <MotionP
                                            className='text-white/80 font-medium text-center'
                                            style={{ x: useTransform(scrollProgress, (v: number) => `${v * (isMobileState ? 180 : 150)}vw`) } as any}
                                        >
                                            {scrollToExpand}
                                        </MotionP>
                                    )}
                                </div>
                            </MotionDiv>

                            <div
                                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                                    }`}
                            >
                                <MotionH2
                                    className='text-5xl md:text-7xl lg:text-9xl font-black text-white transition-none'
                                    style={{ x: useTransform(scrollProgress, (v: number) => `-${v * (isMobileState ? 180 : 150)}vw`) } as any}
                                >
                                    {firstWord}
                                </MotionH2>
                                <MotionH2
                                    className='text-5xl md:text-7xl lg:text-9xl font-black text-center text-white transition-none'
                                    style={{ x: useTransform(scrollProgress, (v: number) => `${v * (isMobileState ? 180 : 150)}vw`) } as any}
                                >
                                    {restOfTitle}
                                </MotionH2>
                            </div>
                        </div>

                        <MotionSection
                            className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 bg-black/50 backdrop-blur-md'
                            initial={{ opacity: 0 } as any}
                            animate={{ opacity: showContent ? 1 : 0 } as any}
                            transition={{ duration: 0.7 } as any}
                        >
                            {children}
                        </MotionSection>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ScrollExpandMedia;
