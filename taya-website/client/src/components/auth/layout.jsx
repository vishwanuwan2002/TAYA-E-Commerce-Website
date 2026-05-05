import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.06),transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col md:flex-row">
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 lg:p-12">
          <div className="max-w-md rounded-[2rem] border-2 border-red-200/60 bg-white/70 p-10 shadow-2xl shadow-red-200/30 backdrop-blur-md transition-all duration-500 hover:shadow-red-300/40 hover:border-red-300/80">
            <p className="text-xs uppercase tracking-[0.4em] text-red-600 font-bold">Taya Clothing</p>
            <h2 className="mt-6 text-5xl font-bold tracking-tight text-black">
              Modern Fashion.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-700">
              Experience a cleaner, sharper shopping experience with premium design and elegant simplicity.
            </p>
            <div className="mt-8 flex gap-2">
              <div className="h-1 w-8 rounded-full bg-red-500"></div>
              <div className="h-1 w-8 rounded-full bg-red-300"></div>
              <div className="h-1 w-8 rounded-full bg-red-200"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md rounded-[2rem] border-2 border-red-200/50 bg-white/95 p-6 shadow-lg shadow-red-200/20 backdrop-blur-md md:p-8 transition-all duration-500">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
