import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Proje Bulunamadı</h2>
      <p className="text-gray-600 mb-4">
        Aradığınız proje mevcut değil veya silinmiş olabilir.
      </p>
      <Link
        href="/"
        className="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
} 