import { createContext, ReactNode, useContext, useState } from "react";
import { SortingAlgorithmType } from "../lib/types";
import { MAX_ANIMATION_SPEED } from "../lib/utils";

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
}

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined);

export const SortingAlgorithmProvider = ({ children }: { children: ReactNode }) => {
    const [arrayToSort, setArrayToSort] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>("bubble");
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);
    const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED);

    const resetArrayAndAnimation = () => { }

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