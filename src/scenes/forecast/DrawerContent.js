import React, { useState } from 'react';
import { Box, Button, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, TextField, Switch } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const DrawerContent = ({ toggleDrawer }) => {
    const [file, setFile] = useState(null);
    const [forecastMethod, setForecastMethod] = useState('');

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleForecastMethodChange = (event) => {
        setForecastMethod(event.target.value);
    };

    const handleForecast = () => {
        console.log('File:', file);
        console.log('Forecast Method:', forecastMethod);
    };

    return (
        <Box p={4} width={350} role="presentation">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="600">Launch Forecast</Typography>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <FormControl fullWidth margin="normal">
                <InputLabel id="forecast-strategy-label">Forecast Strategy</InputLabel>
                <Select
                    labelId="forecast-strategy-label"
                    label="Forecast Strategy"
                    value={forecastMethod}
                    onChange={handleForecastMethodChange}
                >
                    <MenuItem value="top-down">Top-Down</MenuItem>
                    <MenuItem value="bottom-up">Bottom-Up</MenuItem>
                </Select>
            </FormControl>

            <TextField fullWidth label="Forecast Horizon" margin="normal" defaultValue="12" />

            <FormControl fullWidth margin="normal">
                <InputLabel id="breakdown-label">Breakdown</InputLabel>
                <Select labelId="breakdown-label" label="Breakdown">
                    <MenuItem value="by-category">by category</MenuItem>
                    <MenuItem value="by-region">by region</MenuItem>
                    <MenuItem value="by-location">by location</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="forecast-model-label">Forecast Model</InputLabel>
                <Select labelId="forecast-model-label" label="Forecast Model">
                    <MenuItem value="default">Intuendi (default)</MenuItem>
                </Select>
            </FormControl>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography>Use Partial Sales</Typography>
                <Switch />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography>Keep Overrides</Typography>
                <Switch />
            </Box>

            <Box mt={4} mb={2}>
                <Typography variant="h6" fontWeight="600" mb="10px">Upload File</Typography>
                <Button
                    variant="outlined"
                    component="label"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    sx={{ padding: '10px 20px', borderRadius: '4px' }}
                >
                    Choose File
                    <input type="file" hidden onChange={handleFileUpload} />
                </Button>
                {file && <Typography variant="body2" mt="10px">{file.name}</Typography>}
            </Box>

            <Button fullWidth variant="contained" color="primary" onClick={handleForecast}>
                Generate Forecast
            </Button>
        </Box>
    );
};

export default DrawerContent;
