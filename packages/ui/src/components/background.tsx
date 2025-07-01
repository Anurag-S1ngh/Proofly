export default function TitleWithGrid() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center bg-white">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Title */}
      <h1 className="relative text-4xl font-bold text-gray-800 z-10">
        Your Title Here
      </h1>
    </div>
  );
}
