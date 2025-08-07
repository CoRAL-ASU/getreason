import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Abstract } from '../components/sections/Abstract';
import { Dataset } from '../components/sections/Dataset';
import { Methodology } from '../components/sections/Methodology';
import { Results } from '../components/sections/Results';
import { Authors } from '../components/sections/Authors';
import { Resources } from '../components/sections/Resources';
import { Contact } from '../components/sections/Contact';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Abstract />
      <Dataset />
      <Methodology />
      <Results />
      <Authors />
      <Resources />
      <Contact />
    </>
  );
}; 