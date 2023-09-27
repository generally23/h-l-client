import React from 'react';
import {
  Twitter,
  Facebook,
  Email,
  WhatsApp,
  Instagram,
} from '@mui/icons-material';

export const FacebookLogo = props => (
  <Facebook fontSize='large' {...props} sx={{ fill: '#375899' }} />
);

export const TwitterLogo = props => (
  <Twitter fontSize='large' {...props} sx={{ fill: '#1d9bf0' }} />
);

export const EmailLogo = props => (
  <Email fontSize='large' {...props} sx={{ fill: '' }} />
);

export const WhatsAppLogo = props => (
  <WhatsApp fontSize='large' {...props} sx={{ fill: '#24d366' }} />
);

export const InstagramLogo = props => (
  <Instagram fontSize='large' {...props} sx={{ fill: '#E4405F' }} />
);
