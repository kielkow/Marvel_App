import React from 'react';
import { useSelector } from 'react-redux';

export default function Hero() {
  const heroedata = useSelector(state => state.hero);
  console.log('HERO DATA', heroedata);
  return <div>View Hero</div>;
}
