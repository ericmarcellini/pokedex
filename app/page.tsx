"use client";

import Head from 'next/head';
import PokemonList from '../components/PokemonList';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to My Next.js App</h1>
    </main>
  );
}