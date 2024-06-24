import { useSortingAlgorithmContext } from "./context/Visualizer";

export default function App() {

  const { arrayToSort, isSorting } = useSortingAlgorithmContext();

  return (
    <h1 className="text-3xl font-bold underline">
      {isSorting.toString()}
    </h1>
  )
}