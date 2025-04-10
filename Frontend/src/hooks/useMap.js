import { useContext } from 'react';
import { MapContext } from '../contexts/MapContext';

export const useMap = () => {
  const context = useContext(MapContext);
  return context;
};