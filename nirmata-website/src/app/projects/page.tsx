"use client";

import Link from "next/link";
import Image from "next/image";
import { Music, ArrowRight, Calendar, PlayCircle } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: "infiniteInferno",
      title: "Infinite Inferno",
      description: "Latest release from Nirmata - A powerful journey through sound",
      path: "/projects/InfiniteInferno",
      status: "Latest Release",
      year: "2024",
      coverImage: "/INFERNO_COVER_NOW.png"
    },
    {
      id: "faceless2",
      title: "Faceless II",
      description: "The continuation of the Faceless saga",
      path: "/projects/faceless2",
      status: "Available Now",
      year: "2024",
      coverImage: "/FACELESS FINAL.png"
    },
    {
      id: "faceless",
      title: "Faceless",
      description: "The original Faceless release",
      path: "/projects/faceless",
      status: "Classic Release",
      year: "2023",
      coverImage: "/FACELESS FINAL.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        <div className="relative px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center mb-6">
              <Music className="h-16 w-16 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Nirmata Projects
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Explore our electronic press kits and dive deep into each release
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.path}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Cover Image */}
              <div className="aspect-square overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-300 ring-1 ring-purple-700/50">
                    <Calendar className="mr-1 h-3 w-3" />
                    {project.year}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-900/50 px-3 py-1 text-xs font-medium text-green-300 ring-1 ring-green-700/50">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">View EPK</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-purple-400 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>

      {/* Footer section */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400">
            Each Electronic Press Kit contains detailed information about the release,
            including credits, streaming links, and band information.
          </p>
        </div>
      </div>
    </div>
  );
}
