import { useNavigate } from "react-router-dom";

interface HeaderProps {
  headerText?: string;
  onHeaderButtonClick?: () => void;
}

export default function Header({ headerText, onHeaderButtonClick }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full flex items-center justify-between px-8 h-[64px] bg-[#1F1F1F] border-b border-[#2C2C2C7D] shadow-[2px_4px_4px_0_#0000001F] backdrop-blur-[32px]">
      <div className="flex justify-start mb-6">
        <img
          src="/logo.png"
          alt="Levitation Logo"
          className="h-12 w-auto object-contain"
          style={{ maxWidth: 160 }}
        />
      </div>
      {headerText && (
        <button
          onClick={
            onHeaderButtonClick
              ? onHeaderButtonClick
              : () => navigate("/") // fallback to login
          }
          className="border border-[#d0ff7d] text-[#9fc135] px-5 py-1 rounded-lg text-xs font-medium bg-transparent hover:bg-[#d0ff7d22] transition"
        >
          {headerText}
        </button>
      )}
    </header>
  );
}
