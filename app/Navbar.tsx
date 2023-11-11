export default function Navbar() {
  return (
    <div className="flex justify-center space-x-6 p-6 border-b shadow-sm relative">
      <p>Todo</p>
      <p>Planner</p>
      <p>Sports</p>

      <div className="absolute top-6 right-6">
        <p>avatar here</p>
      </div>
    </div>
  );
}
