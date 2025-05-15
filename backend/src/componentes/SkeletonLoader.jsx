import React from 'react';
import { Skeleton } from '@mui/material';

export const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <Skeleton 
        key={i}
        variant="rectangular" 
        width="100%" 
        height={60} 
        animation="wave"
      />
    ))}
  </div>
);