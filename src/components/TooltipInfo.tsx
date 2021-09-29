import InfoIcon from '@mui/icons-material/Info';
import { Tooltip, IconButton } from '@mui/material';
import React from 'react';

export const TooltipInfo: React.FC<{ message: any }> = ({ message }) => {
  return (
    <Tooltip placement={'top'} title={message}>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};
