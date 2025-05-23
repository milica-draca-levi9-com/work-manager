import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 text-gray-500 md:hidden" />
          <h2 className="text-xl font-bold text-gray-800">Night Train Navigator</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-500">Hello,</p>
              <p className="text-md font-semibold">Jane Doe</p>
            </div>
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src="/developer-avatar.png" alt="Jane Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
