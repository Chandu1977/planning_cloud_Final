import React, { useState } from 'react';
import { Box, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Drawer, IconButton, CircularProgress } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const CustomAnalysis = ({ open, onClose, onForecastComplete }) => {
    const [file, setFile] = useState(null);
    const [dateColumn, setDateColumn] = useState('');
    const [qtyColumn, setQtyColumn] = useState('');
    const [periods, setPeriods] = useState(12);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file || !dateColumn || !qtyColumn || !periods) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('date_column', dateColumn);
        formData.append('qty_column', qtyColumn);
        formData.append('periods', periods);

        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            onForecastComplete(response.data); // Pass data to parent component
            onClose(); // Close the drawer
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            setLoading(false);
        }
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box p={4} width={350} role="presentation">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight="600">Launch Forecast</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <FormControl fullWidth margin="normal">
                    <TextField
                        type="file"
                        variant="outlined"
                        onChange={handleFileUpload}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="date-column-label">Date Column</InputLabel>
                    <Select
                        labelId="date-column-label"
                        value={dateColumn}
                        onChange={(e) => setDateColumn(e.target.value)}
                    >
                        <MenuItem value="Date">Date</MenuItem>
                        <MenuItem value="date">date</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="qty-column-label">Quantity Column</InputLabel>
                    <Select
                        labelId="qty-column-label"
                        value={qtyColumn}
                        onChange={(e) => setQtyColumn(e.target.value)}
                    >
                        <MenuItem value="Qty">Qty</MenuItem>
                        <MenuItem value="quantity">quantity</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="forecast-period-label">Forecast Period (months)</InputLabel>
                    <Select
                        labelId="forecast-period-label"
                        value={periods}
                        onChange={(e) => setPeriods(e.target.value)}
                    >
                        {[...Array(24).keys()].map(i => (
                            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={loading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload and Forecast'}
                </Button>
            </Box>
        </Drawer>
    );
};

export default CustomAnalysis;
