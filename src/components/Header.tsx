import UserModalCard from "@/UI/UserModalCard";

export default function Header() {
  return (
    <header className="responsive border-b-[2px] border-slate-3">
      <div className="responsive_wrapper flex items-center justify-between py-3">
        <h1>MOVEA</h1>
        <nav>
          <ul className="flex gap-8">
            <li className="text-white">Movies</li>
            <li>TV shows</li>
            <li>Animations</li>
            <li>Plans</li>
          </ul>
        </nav>
        <div className="text-white bg-red-400 rounded-full">Hello</div>

        <UserModalCard />
      </div>
    </header>
  );
}
