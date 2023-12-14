import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <div className="flex justify-center space-x-6 p-6 border-b shadow-sm relative">
      <p>Planner</p>
      <p>Sports</p>

      <div className="absolute top-6 right-6">
        <UserButton afterSignOutUrl="/login" />
      </div>
    </div>
  );
}
