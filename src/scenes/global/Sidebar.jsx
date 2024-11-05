import { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import { IconButton } from "@mui/material";
import { ColorModeContext } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import SearchIcon from "@mui/icons-material/Search";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      color="inherit"
      startIcon={icon}
      onClick={() => setSelected(title)}
      component={Link}
      to={to}
      sx={{
        color: selected === title ? colors.grey[100] : colors.grey[300],
        "&:hover": {
          color: colors.grey[100],
        },
      }}
    >
      <Typography>{title}</Typography>
    </Button>
  );
};

const Header = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="static" sx={{ background: colors.primary[400] }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <img
            alt="logo"
            width="210px"
            height="60px"
            src={`../../assets/logo2.png`}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexGrow={1} px={10}>
          <Item
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Forecast"
            to="./forecast"
            icon={<ShowChartIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Inventory"
            to="/team"
            icon={<WarehouseIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Plan"
            to="/contacts"
            icon={<AvTimerIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Optimize"
            to="/invoices"
            icon={<ManageHistoryIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Reports"
            to="/form"
            icon={<TextSnippetIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Calendar"
            to="/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" p={2}>
          {/* SEARCH BAR */}
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* ICONS */}
          <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <img
            alt="profile-user"
            width="40px"
            height="40px"
            src={`../../assets/user.png`}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        </Box>
        {/* <Box textAlign="center" mr={2}>
          <Typography variant="h6" color={colors.grey[100]}>
            Ed Roh
          </Typography>
          <Typography variant="body2" color={colors.greenAccent[500]}>
            VP Fancy Admin
          </Typography>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
