import { Duck } from "./demo";

interface Props {
  d: Duck;
}

export default function DuckItem(p: Props) {
  const duck = p.d;
  return (
    <div>
      <span>{duck.name}</span>
      <button onClick={() => duck.makeSound(`${duck.name} quack`)}></button>
    </div>
  );
}
