
import { Download, ShieldCheck, Users, Activity, BarChart3 } from "lucide-react";

export default function VedaPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">

     

      {/* HERO */}
      <section className="relative">

        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-[-200px] top-[-150px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute right-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:py-32">

          {/* Left */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Smart Healthcare Platform
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Healthcare,
              <span className="block text-cyan-400">
                made simpler.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              Veda brings doctors, patients, visits and healthcare
              insights together in one simple, modern platform.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <a
                href="/veda.apk"
                download="Veda.apk"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/20 active:scale-95"
              >
                <Download size={19} />
                Download Veda
              </a>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/[0.07]"
              >
                Explore Features
              </a>

            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
              <span>Android</span>
              <span>•</span>
              <span>Version 1.0.1</span>
              <span>•</span>
              <span>Free Download</span>
            </div>

          </div>

          {/* Product Visual */}
          <div className="relative">

            <div className="absolute inset-0 rounded-[50px] bg-cyan-400/10 blur-[80px]" />

            <div className="relative mx-auto max-w-md rounded-[40px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

              {/* Fake App Header */}
              <div className="rounded-[28px] bg-[#0b1728] p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs text-slate-500">
                      Welcome back
                    </p>

                    <h3 className="mt-1 text-xl font-semibold">
                      Veda
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-lg font-black text-slate-950">
                    V
                  </div>

                </div>

                {/* Stats */}
                <div className="mt-7 grid grid-cols-2 gap-3">

                  <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
                    <Users size={18} className="text-cyan-400" />
                    <p className="mt-4 text-2xl font-bold">Patients</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Organized records
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
                    <Activity size={18} className="text-blue-400" />
                    <p className="mt-4 text-2xl font-bold">Visits</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Easy management
                    </p>
                  </div>

                </div>

                {/* Analytics */}
                <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.04] p-5">

                  <div className="flex items-center gap-3">
                    <BarChart3 size={20} className="text-cyan-400" />

                    <div>
                      <p className="text-sm font-medium">
                        Healthcare Analytics
                      </p>

                      <p className="text-xs text-slate-500">
                        Insights at a glance
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex h-20 items-end gap-2">
                    {[35, 55, 42, 70, 52, 82, 68].map((height, i) => (
                      <div
                        key={i}
                        style={{ height: `${height}%` }}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-cyan-500/20 to-cyan-400"
                      />
                    ))}
                  </div>

                </div>

              </div>

              {/* Secure badge */}
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
                <ShieldCheck className="text-cyan-400" size={20} />

                <div>
                  <p className="text-sm font-medium">
                    Built for modern healthcare
                  </p>

                  <p className="text-xs text-slate-500">
                    Simple. Organized. Smart.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative border-t border-white/5 px-6 py-24 md:px-16"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Features
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Everything you need to manage healthcare.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Veda is designed around the everyday workflow of
              healthcare management.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: Users,
                title: "Patient Management",
                text: "Keep patient information organized and accessible.",
              },
              {
                icon: Activity,
                title: "Visit Management",
                text: "Create and manage healthcare visits with ease.",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                text: "Understand your healthcare activity through insights.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Access",
                text: "Role-based access designed for healthcare workflows.",
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.text}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-white/5 px-6 py-24 md:px-16"
      >

        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2 md:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              About Veda
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              One platform.
              <span className="block text-cyan-400">
                A smarter workflow.
              </span>
            </h2>
          </div>

          <div>
            <p className="leading-8 text-slate-400">
              Veda is built to reduce the complexity of everyday
              healthcare management. From maintaining patient records
              to managing visits and understanding activity through
              analytics, everything is designed to stay simple and
              accessible.
            </p>

            <p className="mt-5 leading-8 text-slate-400">
              The goal is straightforward: make healthcare management
              more organized so professionals can focus on what matters.
            </p>
          </div>

        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="px-6 py-24">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[40px] border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent px-7 py-16 text-center md:px-16">

          <div className="absolute left-1/2 top-[-150px] h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="relative">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Get Veda
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Start managing healthcare
              <span className="block text-cyan-400">
                the smarter way.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
              Download the Veda Android application and get started.
            </p>

            <a
              href="/veda.apk"
              download="Veda.apk"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/20 active:scale-95"
            >
              <Download size={19} />
              Download Veda APK
            </a>

          </div>
        </div>
      </section>

    </main>
  );
}