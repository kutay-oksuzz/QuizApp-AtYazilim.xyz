export default function Header() {
  return (
    <header className="flex items-center justify-between overflow-x-hidden px-11 py-5 font-semibold">
      <img src="logo.svg" className="h-12 w-12"></img>
      <ul className="flex cursor-pointer items-center justify-between gap-3 p-2">
        <li className="rounded-lg bg-[#f7e2d4] px-3 py-2 text-[#5D5C61] duration-300 hover:bg-slate-100">
          About
        </li>
        <li className="rounded-lg bg-[#f7e2d4] px-3 py-2 text-[#5D5C61] duration-300 hover:bg-slate-100">
          Blog
        </li>
        <li className="rounded-lg bg-[#f7e2d4] px-3 py-2 text-[#5D5C61] duration-300 hover:bg-slate-100">
          Showcase
        </li>
      </ul>
    </header>
  );
}
