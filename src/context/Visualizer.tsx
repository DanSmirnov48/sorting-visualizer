import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SortingAlgorithmType } from "../lib/types";
import { generateRandomNumberFromInterval, MAX_ANIMATION_SPEED } from "../lib/utils";

interface SortingAlgorithmContextType {
    arrayToSort: number[];
    selectedAlgorithm: SortingAlgorithmType;
    isSorting: boolean;
    setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
    setIsSorting: (isSorting: boolean) => void;
    animationSpeed: number;
    setAnimationSpeed: (speed: number) => void;
    resetArrayAndAnimation: () => void;
    runAnimation: () => void;
    isAnimationComplete: boolean;
    requiresReset: boolean;
}

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined);

export const SortingAlgorithmProvider = ({ children }: { children: ReactNode }) => {
    const [arrayToSort, setArrayToSort] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>("bubble");
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);
    const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED);
    const requiresReset = isAnimationComplete || isSorting;

    useEffect(() => {
        resetArrayAndAnimation();
        window.addEventListener("resize", resetArrayAndAnimation);

        return () => {
            window.removeEventListener("resize", resetArrayAndAnimation);
        };
    }, []);

    const resetArrayAndAnimation = () => {
        const contentContainer = document.getElementById("content-container");
        if (!contentContainer) return;
        const contentContainerWidth = contentContainer.clientWidth;

        const tempArray: number[] = [];
        const numLines = contentContainerWidth / 8;
        const containerHeight = window.innerHeight;
        const maxLineHeight = Math.max(containerHeight - 420, 100);

        for (let i = 0; i < numLines; i++) {
            tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight));
        }

        setArrayToSort(tempArray);
        setIsSorting(false);
        setIsAnimationComplete(false);
    }

    const runAnimation = () => { }

    const value = {
        arrayToSort,
        selectedAlgorithm,
        setSelectedAlgorithm,
        isSorting,
        setIsSorting,
        animationSpeed,
        setAnimationSpeed,
        isAnimationComplete,
        resetArrayAndAnimation,
        runAnimation,
        requiresReset
    };

    return <SortingAlgorithmContext.Provider value={value}>{children}</SortingAlgorithmContext.Provider>
}

export const useSortingAlgorithmContext = (): SortingAlgorithmContextType => {
    const context = useContext(SortingAlgorithmContext);
    if (context === undefined) {
        throw new Error("useSortingAlgorithmContext must be used within a SortingAlgorithmProvider");
    }
    return context;
};