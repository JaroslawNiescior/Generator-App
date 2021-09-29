import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LayersIcon from '@mui/icons-material/Layers';
import { NavLink } from 'react-router-dom';
import { ROUTES } from './consts';

export const mainListItems = (
  <div>
    <ListItem
      button
      component={NavLink}
      to={ROUTES.app.href}
      activeClassName="Mui-selected"
      exact
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem
      button
      component={NavLink}
      to={ROUTES.generator.href}
      activeClassName="Mui-selected"
      exact
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Generator" />
    </ListItem>
    <ListItem
      button
      component={NavLink}
      to={ROUTES.templates.href}
      activeClassName="Mui-selected"
      exact
    >
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Szablony" />
    </ListItem>
  </div>
);
