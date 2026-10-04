export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Avenue - SRM KTR Opportunities Platform.</p>
        <p className="mt-2">Built for students, by students.</p>
      </div>
    </footer>
  );
}
