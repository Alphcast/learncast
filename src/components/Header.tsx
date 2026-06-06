interface HeaderProps {
  dark: boolean
  onToggleDark: () => void
}

export function Header({ dark, onToggleDark }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-[#1E293B] shadow-[0_2px_8px_rgba(21,101,192,0.10)] sticky top-0 z-100 border-b-3 border-[#E3F2FD] dark:border-[#1E3A5F]">
      <div className="max-w-[1100px] mx-auto px-5 py-[10px] flex items-center justify-between gap-3">
        <a href="/" className="flex items-center gap-[10px] no-underline" onClick={e => e.preventDefault()}>
          <img src="/learn1.png" alt="LearnCast" className="w-[46px] h-[46px] rounded-full object-cover border-2 border-[#42A5F5]" />
          <div>
            <span className="font-nunito font-900 text-[1.25rem] text-[#1565C0] dark:text-[#42A5F5] leading-[1.1]">
              LearnCast
            </span>
            <span className="text-[#2E7D32] dark:text-[#66BB6A] text-[.85rem] font-600 block">
              Hub
            </span>
          </div>
        </a>
        <div className="text-[.78rem] text-[#475569] dark:text-[#94A3B8] italic hidden sm:block">
          Practice Smart, Excel with Confidence
        </div>
        <button
          onClick={onToggleDark}
          className="bg-[#F0F4FA] dark:bg-[#263148] border-[1.5px] border-[#DDE4F0] dark:border-[#334155] rounded-[20px] px-[14px] py-[5px] cursor-pointer text-[.82rem] text-[#475569] dark:text-[#94A3B8] font-sora transition-all duration-200 hover:bg-[#E3F2FD] hover:text-[#1565C0] dark:hover:bg-[#1E3A5F] dark:hover:text-[#42A5F5]"
        >
          {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </header>
  )
}
