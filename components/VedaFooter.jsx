import Link from "next/link";

export default function VedaFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#040b15] text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl font-black">
                V
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Veda
                </h2>

                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Smart Healthcare
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md leading-7 text-slate-400">
              A smarter healthcare management platform designed
              to simplify doctor, patient and visit management.
            </p>

          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Product
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/veda"
                className="text-sm text-slate-500 transition hover:text-white"
              >
                Home
              </Link>

              <a
                href="/veda#features"
                className="text-sm text-slate-500 transition hover:text-white"
              >
                Features
              </a>

              <a
                href="/veda#about"
                className="text-sm text-slate-500 transition hover:text-white"
              >
                About
              </a>

              <a
                href="/veda.apk"
                download="Veda.apk"
                className="text-sm text-cyan-400 transition hover:text-cyan-300"
              >
                Download App
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-slate-500 transition hover:text-white"
              >
                AlphaAryX
              </Link>

              <a
                href="mailto:alphaaryx@gmail.com"
                className="text-sm text-slate-500 transition hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>

        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Veda. All rights reserved.
          </p>

          <p className="text-xs text-slate-600">
            A product by{" "}
            <span className="font-medium text-slate-400">
              AlphaAryX
            </span>
          </p>

        </div>

      </div>
    </footer>
  );
}