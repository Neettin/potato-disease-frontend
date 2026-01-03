import React, { useState, useEffect } from "react";
import { styled, keyframes } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  CardActionArea,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
  Fade,
  Zoom,
  Grow,
  Slide,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Box,
  Snackbar,
  CssBaseline,
  ThemeProvider,
  createTheme,
  alpha,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpIcon from '@mui/icons-material/Help';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import SpaIcon from '@mui/icons-material/Spa';
import ScienceIcon from '@mui/icons-material/Science';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ShieldIcon from '@mui/icons-material/Shield';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import BugReportIcon from '@mui/icons-material/BugReport';
import GrassIcon from '@mui/icons-material/Grass';
import TimelineIcon from '@mui/icons-material/Timeline';
import axios from 'axios';

// Premium Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
`;

const glowAnimation = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 0.3; }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Premium Styled Components
const PremiumButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${alpha(theme.palette.primary.main, 0.8)} 50%,
    ${theme.palette.secondary.main} 100%)`,
  backgroundSize: '200% 200%',
  color: 'white',
  padding: '16px 40px',
  fontSize: '16px',
  fontWeight: 700,
  borderRadius: '16px',
  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  textTransform: 'none',
  letterSpacing: '1px',
  position: 'relative',
  overflow: 'hidden',
  animation: `${gradientAnimation} 3s ease infinite`,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.3)}, transparent)`,
    transition: 'left 0.8s',
  },
  '&:hover': {
    transform: 'translateY(-4px) scale(1.03)',
    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.6)}`,
    animationPlayState: 'paused',
    '&:before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-2px) scale(0.98)',
  },
}));

const DetectButtonPremium = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    #2196F3 0%, 
    ${alpha('#2196F3', 0.7)} 50%,
    #1976D2 100%)`,
  backgroundSize: '200% 200%',
  color: 'white',
  padding: '16px 40px',
  fontSize: '16px',
  fontWeight: 700,
  borderRadius: '16px',
  boxShadow: '0 12px 40px rgba(33, 150, 243, 0.4)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  textTransform: 'none',
  letterSpacing: '1px',
  position: 'relative',
  overflow: 'hidden',
  animation: `${gradientAnimation} 3s ease infinite`,
  '&:hover': {
    transform: 'translateY(-4px) scale(1.03)',
    boxShadow: '0 20px 60px rgba(33, 150, 243, 0.6)',
    animationPlayState: 'paused',
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, 
        rgba(30, 30, 30, 0.95) 0%,
        rgba(45, 45, 45, 0.85) 100%)`
    : `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 255, 255, 0.85) 100%)`,
  backdropFilter: 'blur(40px) saturate(180%)',
  borderRadius: '32px',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 30px 100px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 30px 100px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.08)'
    : '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 50px 140px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
      : '0 50px 140px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, 
      ${theme.palette.primary.main}, 
      ${theme.palette.secondary.main})`,
    zIndex: 1,
  },
}));

const UploadAreaPremium = styled('div')(({ theme }) => ({
  minHeight: '350px',
  borderRadius: '28px',
  border: `2.5px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
  background: theme.palette.mode === 'dark'
    ? `rgba(30, 30, 30, 0.9)`
    : `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(248, 249, 250, 0.9) 100%)`,
  backdropFilter: 'blur(20px)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '50px',
  cursor: 'pointer',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, 
      transparent, 
      ${alpha(theme.palette.primary.main, 0.05)}, 
      transparent)`,
    animation: `${shimmerAnimation} 3s infinite linear`,
    backgroundSize: '1000px 100%',
  },
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.6),
    background: theme.palette.mode === 'dark'
      ? `rgba(40, 40, 40, 0.95)`
      : `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.98) 0%,
          rgba(248, 249, 250, 0.95) 100%)`,
    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.2)}`,
    transform: 'scale(1.01)',
  },
}));

const PremiumChip = styled(Chip)(({ theme, severity }) => ({
  background: severity === 'success'
    ? `linear-gradient(135deg, ${theme.palette.success.main}, ${alpha(theme.palette.success.main, 0.7)})`
    : severity === 'warning'
    ? `linear-gradient(135deg, ${theme.palette.warning.main}, ${alpha(theme.palette.warning.main, 0.7)})`
    : severity === 'error'
    ? `linear-gradient(135deg, ${theme.palette.error.main}, ${alpha(theme.palette.error.main, 0.7)})`
    : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: 'white',
  fontWeight: 800,
  fontSize: '16px',
  padding: '14px 32px',
  borderRadius: '50px',
  boxShadow: `0 10px 30px ${alpha(
    severity === 'success' ? theme.palette.success.main :
    severity === 'warning' ? theme.palette.warning.main :
    severity === 'error' ? theme.palette.error.main :
    theme.palette.primary.main, 0.3)}`,
  letterSpacing: '1px',
  animation: `${gradientAnimation} 3s ease infinite`,
  backgroundSize: '200% 200%',
}));

const ConfidenceBar = styled(LinearProgress)(({ theme }) => ({
  height: '20px',
  borderRadius: '10px',
  background: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.1 : 0.08),
  overflow: 'hidden',
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, 
      ${theme.palette.primary.main}, 
      ${theme.palette.secondary.main})`,
    borderRadius: '10px',
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
    animation: `${gradientAnimation} 2s ease infinite`,
    backgroundSize: '200% 100%',
  },
}));

const FloatingOrb = styled(Box)(({ theme, color, size, top, left, delay }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: `radial-gradient(circle at 30% 30%, 
    ${color} 0%, 
    ${alpha(color, 0.3)} 50%, 
    transparent 70%)`,
  top: top,
  left: left,
  zIndex: 0,
  animation: `${floatAnimation} 20s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  filter: 'blur(2px)',
}));

// Custom Alert Premium
const PremiumAlert = ({ onClose, severity, children }) => {
  const theme = createTheme();
  
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, 
          ${severity === 'error' ? theme.palette.error.main :
            severity === 'success' ? theme.palette.success.main :
            severity === 'warning' ? theme.palette.warning.main :
            theme.palette.primary.main}, 
          ${alpha(
            severity === 'error' ? theme.palette.error.main :
            severity === 'success' ? theme.palette.success.main :
            severity === 'warning' ? theme.palette.warning.main :
            theme.palette.primary.main, 0.8)})`,
        color: 'white',
        padding: '20px 32px',
        borderRadius: '20px',
        boxShadow: `0 20px 60px ${alpha(
          severity === 'error' ? theme.palette.error.main :
          severity === 'success' ? theme.palette.success.main :
          severity === 'warning' ? theme.palette.warning.main :
          theme.palette.primary.main, 0.4)}`,
        width: '100%',
        maxWidth: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        animation: `${gradientAnimation} 3s ease infinite`,
        backgroundSize: '200% 200%',
      }}
    >
      <Box display="flex" alignItems="center" gap={3}>
        {severity === 'error' && <ErrorIcon sx={{ fontSize: '28px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />}
        {severity === 'success' && <CheckCircleIcon sx={{ fontSize: '28px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />}
        {severity === 'warning' && <WarningIcon sx={{ fontSize: '28px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />}
        <Typography variant="body1" sx={{ 
          fontWeight: 600, 
          fontSize: '16px',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {children}
        </Typography>
      </Box>
      <IconButton 
        size="small" 
        onClick={onClose}
        sx={{ 
          color: 'white',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
          }
        }}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

// Potato Disease Database
const potatoDiseases = {
  'potato_early_blight': {
    name: 'Potato Early Blight',
    scientificName: 'Alternaria solani',
    severity: 'warning',
    description: 'A common fungal disease affecting potato leaves, stems, and tubers.',
    symptoms: [
      'Dark brown to black concentric rings on leaves',
      'Yellow halos around lesions',
      "Target-like appearance (bull's eye pattern)",
      'Lesions on stems and petioles',
      'Premature leaf drop',
      'Reduced tuber size and yield'
    ],
    causes: [
      'Fungus Alternaria solani',
      'Warm temperatures (24-29°C)',
      'High humidity (>85%)',
      'Poor air circulation',
      'Overhead irrigation',
      'Infected plant debris in soil'
    ],
    lifecycle: [
      'Survives in infected plant debris and soil for 1-2 years',
      'Spreads through wind, rain, and irrigation water',
      'Infection occurs through natural openings or wounds',
      'Incubation period: 5-7 days under optimal conditions',
      'Multiple cycles per growing season'
    ],
    prevention: [
      'Use certified disease-free seed potatoes',
      'Practice crop rotation (3-4 years non-solanaceous crops)',
      'Remove and destroy infected plant debris',
      'Ensure proper plant spacing for air circulation',
      'Avoid overhead irrigation',
      'Apply fungicides preventively (Chlorothalonil, Mancozeb)'
    ],
    treatment: [
      'Apply fungicides at first sign of disease',
      'Remove severely infected leaves',
      'Improve drainage in field',
      'Use resistant varieties when available',
      'Apply copper-based fungicides for organic control'
    ],
    impact: 'Can cause 20-50% yield loss if untreated',
    riskPeriod: 'Mid to late growing season'
  },
  'potato_late_blight': {
    name: 'Potato Late Blight',
    scientificName: 'Phytophthora infestans',
    severity: 'error',
    description: 'A devastating fungal-like disease responsible for the Irish Potato Famine.',
    symptoms: [
      'Water-soaked dark green to brown lesions',
      'White fungal growth on underside of leaves in humid conditions',
      'Rapid tissue necrosis (death)',
      'Brown to black lesions on stems',
      'Tubers develop reddish-brown dry rot',
      'Entire plant can collapse within days'
    ],
    causes: [
      'Oomycete Phytophthora infestans',
      'Cool temperatures (15-21°C)',
      'High humidity (>90%)',
      'Extended leaf wetness (>10 hours)',
      'Infected seed tubers',
      'Volunteer potato plants'
    ],
    lifecycle: [
      'Survives in infected tubers and plant debris',
      'Produces sporangia that spread through wind and water',
      'Direct penetration through stomata or epidermis',
      'Rapid reproduction (3-5 days per cycle)',
      'Can infect all plant parts within days'
    ],
    prevention: [
      'Use certified disease-free seed potatoes',
      'Destroy volunteer potato plants',
      'Apply preventative fungicides before infection',
      'Improve field drainage',
      'Avoid planting in low-lying areas',
      'Monitor weather conditions for disease forecasts'
    ],
    treatment: [
      'Immediate application of systemic fungicides',
      'Complete removal and destruction of infected plants',
      'Harvest early if disease appears late in season',
      'Proper tuber storage conditions',
      'Use of resistant varieties'
    ],
    impact: 'Can cause 100% crop loss in favorable conditions',
    riskPeriod: 'Cool, wet periods throughout growing season'
  },
  'potato_healthy': {
    name: 'Healthy Potato Plant',
    scientificName: 'Solanum tuberosum',
    severity: 'success',
    description: 'A healthy potato plant showing no signs of disease infection.',
    symptoms: [
      'Vibrant green leaves without spots or discoloration',
      'Strong, upright stem growth',
      'Normal leaf size and shape',
      'Proper canopy development',
      'No wilting or yellowing',
      'Normal flowering (if applicable)'
    ],
    causes: [
      'Proper plant care and maintenance',
      'Adequate nutrition and water',
      'Good air circulation',
      'Disease-free seed potatoes',
      'Proper soil conditions'
    ],
    lifecycle: [
      'Normal potato plant growth cycle',
      'Vegetative growth phase: 30-70 days',
      'Tuber initiation phase: 15-30 days',
      'Tuber bulking phase: 30-90 days',
      'Maturation phase: 14-28 days',
      'Complete cycle: 90-120 days depending on variety'
    ],
    prevention: [
      'Continue regular monitoring (weekly inspections)',
      'Maintain proper irrigation schedule',
      'Ensure balanced fertilization',
      'Control weeds that may harbor diseases',
      'Monitor for pests regularly',
      'Practice good crop rotation'
    ],
    treatment: [
      'No treatment needed - plant is healthy',
      'Continue with regular maintenance practices',
      'Monitor for early signs of disease',
      'Maintain optimal growing conditions',
      'Apply preventive measures as needed'
    ],
    maintenance: [
      'Continue regular monitoring (weekly inspections)',
      'Maintain proper irrigation schedule',
      'Ensure balanced fertilization',
      'Control weeds that may harbor diseases',
      'Monitor for pests regularly',
      'Practice good crop rotation'
    ],
    bestPractices: [
      'Maintain soil pH between 5.0-6.0',
      'Provide adequate spacing (30-40cm between plants)',
      'Use mulch to conserve moisture and suppress weeds',
      'Avoid water stress during tuber formation',
      'Harvest at proper maturity',
      'Store tubers in cool, dark conditions'
    ],
    yieldOptimization: [
      'Apply potassium-rich fertilizers for better tuber quality',
      'Hilling to prevent greening of tubers',
      'Regular soil testing',
      'Proper pest management',
      'Timely harvest',
      'Post-harvest handling care'
    ],
    impact: 'Optimal yield potential with proper care',
    riskPeriod: 'Continuous monitoring needed throughout season'
  }
};

function SolanixAIApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [stats, setStats] = useState({
    accuracy: 96.7,
    speed: 2.3,
    processed: 12457
  });
  const [expandedAccordion, setExpandedAccordion] = useState('symptoms');

  // Fixed Theme - No gradient in background.default
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#BB86FC' : '#8B5FBF',
      },
      secondary: {
        main: darkMode ? '#03DAC6' : '#6A4C93',
      },
      success: {
        main: '#4CAF50',
      },
      warning: {
        main: '#FF9800',
      },
      error: {
        main: '#F44336',
      },
      info: {
        main: '#2196F3',
      },
      background: {
        default: darkMode ? '#121212' : '#F5F7FA',
        paper: darkMode ? '#1E1E1E' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.5px',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.3px',
      },
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.2px',
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 16,
    },
  });

  // Netflix-style intro effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Check API URL on component mount
  useEffect(() => {
    const apiUrlFromEnv = process.env.REACT_APP_API_URL;
    console.log("Current API URL:", apiUrlFromEnv);
    setApiUrl(apiUrlFromEnv);
  }, []);

  // Update document title and favicon
  useEffect(() => {
    document.title = "Solanix AI - Potato Disease Detection";
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = '/logo.png';
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5000000,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === 'file-too-large') {
          setError("File is too large. Maximum size is 5MB.");
        } else if (error.code === 'file-invalid-type') {
          setError("Invalid file type. Please upload JPG, PNG, or WebP image.");
        } else {
          setError(error.message);
        }
        setSnackbarOpen(true);
        return;
      }
      
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        console.log("File selected:", file.name, file.type, file.size);
        setSelectedFile(file);
        setData(null);
        setError(null);
        setSnackbarOpen(false);
        setImageUploaded(true);
        setIsLoading(false);
        setShowResult(false);
        setExpandedAccordion('symptoms');
      }
    }
  });

  // Generate preview
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      setImageUploaded(false);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log("Preview URL created:", objectUrl);
    setPreview(objectUrl);
    setImageUploaded(true);
    
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    return interval;
  };

  const sendFile = async () => {
    if (selectedFile) {
      const progressInterval = simulateUploadProgress();
      setError(null);
      setSnackbarOpen(false);
      setIsLoading(true);
      setShowResult(false);
      
      try {
        console.log("Sending file to API:", selectedFile.name);
        console.log("API URL:", apiUrl);
        
        const formData = new FormData();
        formData.append("file", selectedFile);
        
        const res = await axios({
          method: "post",
          url: apiUrl,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log("Upload progress:", percentCompleted + "%");
            setUploadProgress(percentCompleted);
          },
        });
        
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        console.log("API Response:", res.data);
        
        if (res.status === 200) {
          if (res.data.error) {
            throw new Error(res.data.error);
          }
          
          const responseData = {
            class: res.data.predicted_class,
            confidence: res.data.confidence,
            filename: res.data.filename,
            all_predictions: res.data.all_predictions
          };
          
          setTimeout(() => {
            setData(responseData);
            setShowResult(true);
            setIsLoading(false);
          }, 600);
        } else {
          throw new Error(`Server returned status: ${res.status}`);
        }
      } catch (error) {
        clearInterval(progressInterval);
        setIsLoading(false);
        console.error("Error uploading file:", error);
        
        let errorMessage = "Failed to analyze image. ";
        
        if (error.response) {
          errorMessage += `Server error: ${error.response.status} - ${error.response.data?.error || error.response.data?.message || error.response.statusText}`;
        } else if (error.request) {
          errorMessage = "Cannot connect to backend server. Please make sure:";
          errorMessage += "\n1. The backend server is running";
          errorMessage += "\n2. Check the API endpoint configuration";
          errorMessage += "\n3. Check console for more details";
        } else {
          errorMessage += error.message;
        }
        
        setError(errorMessage);
        setSnackbarOpen(true);
        
        setTimeout(() => {
          setSelectedFile(null);
          setPreview(null);
          setImageUploaded(false);
        }, 1000);
      }
    } else {
      setIsLoading(false);
      setError("No file selected for upload");
      setSnackbarOpen(true);
    }
  };

  const clearData = () => {
    setShowResult(false);
    setData(null);
    setSelectedFile(null);
    setPreview(null);
    setUploadProgress(0);
    setError(null);
    setSnackbarOpen(false);
    setImageUploaded(false);
    setExpandedAccordion('symptoms');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const getDiseaseIcon = (disease) => {
    const diseaseLower = disease?.toLowerCase() || '';
    if (diseaseLower.includes('healthy')) return <SpaIcon sx={{ color: '#4CAF50', fontSize: '32px' }} />;
    if (diseaseLower.includes('early')) return <WarningIcon sx={{ color: '#FF9800', fontSize: '32px' }} />;
    if (diseaseLower.includes('late')) return <ErrorIcon sx={{ color: '#F44336', fontSize: '32px' }} />;
    return <HelpIcon sx={{ color: darkMode ? '#BB86FC' : '#8B5FBF', fontSize: '32px' }} />;
  };

  const getDiseaseSeverity = (disease) => {
    const diseaseLower = disease?.toLowerCase() || '';
    if (diseaseLower.includes('healthy')) return 'success';
    if (diseaseLower.includes('early')) return 'warning';
    if (diseaseLower.includes('late')) return 'error';
    return 'primary';
  };

  const getDiseaseData = (diseaseName) => {
    const diseaseLower = diseaseName?.toLowerCase() || '';
    if (diseaseLower.includes('early')) return potatoDiseases.potato_early_blight;
    if (diseaseLower.includes('late')) return potatoDiseases.potato_late_blight;
    if (diseaseLower.includes('healthy')) return potatoDiseases.potato_healthy;
    return potatoDiseases.potato_healthy;
  };

  const confidence = data ? (parseFloat(data.confidence) * 100).toFixed(2) : 0;
  const diseaseData = data ? getDiseaseData(data.class) : potatoDiseases.potato_healthy;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: darkMode 
          ? '#121212'
          : 'linear-gradient(135deg, #F5F7FA 0%, #E4E8F0 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <React.Fragment>
          {/* Premium Intro Animation */}
          {showIntro && (
            <Box sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Animated Background Orbs */}
              <FloatingOrb color="#8B5FBF" size="400px" top="10%" left="10%" delay={0} />
              <FloatingOrb color="#03DAC6" size="300px" top="60%" left="80%" delay={5} />
              <FloatingOrb color="#FF9800" size="200px" top="20%" left="70%" delay={10} />
              <FloatingOrb color="#4CAF50" size="250px" top="70%" left="20%" delay={15} />
              
              <Box sx={{
                fontSize: '5rem',
                fontWeight: 900,
                color: 'white',
                marginBottom: '16px',
                textAlign: 'center',
                letterSpacing: '2px',
                animation: 'logoReveal 3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                zIndex: 1,
                '@keyframes logoReveal': {
                  '0%': {
                    transform: 'scale(0.8) translateY(30px)',
                    opacity: 0,
                    letterSpacing: '20px',
                    filter: 'blur(10px)',
                  },
                  '100%': {
                    transform: 'scale(1) translateY(0)',
                    opacity: 1,
                    letterSpacing: '2px',
                    filter: 'blur(0)',
                  }
                }
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  background: 'linear-gradient(135deg, #8B5FBF, #03DAC6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: `${gradientAnimation} 3s ease infinite`,
                  backgroundSize: '200% 200%',
                }}>
                  <PsychologyIcon sx={{ fontSize: '4rem' }} />
                  SOLANIX AI
                  <ScienceIcon sx={{ fontSize: '4rem' }} />
                </Box>
              </Box>
              
              <Typography sx={{
                fontSize: '2rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '16px',
                fontStyle: 'italic',
                fontWeight: 300,
                letterSpacing: '1px',
                textAlign: 'center',
                maxWidth: '600px',
                zIndex: 1,
                animation: 'fadeIn 2s ease-in-out 1s forwards',
                opacity: 0,
                '@keyframes fadeIn': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' }
                }
              }}>
                Advanced Potato Disease Intelligence
              </Typography>
            </Box>
          )}

          {/* Animated Background */}
          <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode ? '#121212' : 'linear-gradient(135deg, #F5F7FA 0%, #E4E8F0 100%)',
            zIndex: -1,
            overflow: 'hidden',
          }}>
            <FloatingOrb color={darkMode ? '#BB86FC' : '#8B5FBF'} size="400px" top="10%" left="10%" delay={0} />
            <FloatingOrb color={darkMode ? '#03DAC6' : '#6A4C93'} size="300px" top="60%" left="80%" delay={5} />
            <FloatingOrb color="#FF9800" size="200px" top="20%" left="70%" delay={10} />
            <FloatingOrb color="#4CAF50" size="250px" top="70%" left="20%" delay={15} />
          </Box>

          {/* Premium App Bar */}
          <AppBar position="sticky" sx={{
            background: darkMode
              ? 'rgba(30, 30, 30, 0.98)'
              : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
            borderBottom: darkMode
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.05)',
            py: 1,
          }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                    animation: `${gradientAnimation} 3s ease infinite`,
                    backgroundSize: '200% 200%',
                  }}>
                    <EmojiNatureIcon sx={{ 
                      fontSize: 32, 
                      color: 'white',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }} />
                    <Box sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '16px',
                      background: `radial-gradient(circle at 30% 30%, 
                        ${alpha(theme.palette.primary.main, 0.4)} 0%, 
                        transparent 70%)`,
                      animation: `${pulseAnimation} 2s ease-in-out infinite`,
                    }} />
                  </Box>
                  
                  <Box>
                    <Typography variant="h4" sx={{
                      fontWeight: 900,
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.5px',
                      animation: `${gradientAnimation} 3s ease infinite`,
                      backgroundSize: '200% 200%',
                    }}>
                      SOLANIX AI
                    </Typography>
                    <Typography variant="caption" sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontSize: '0.7rem',
                    }}>
                      Potato Disease Intelligence System
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ flexGrow: 1 }} />
                
                {/* Stats Display */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, mr: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 800,
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {stats.accuracy}%
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                      Accuracy
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 800,
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {stats.speed}s
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                      Analysis Speed
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 800,
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {stats.processed.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight:600 }}>
                      Leaves Analyzed
                    </Typography>
                  </Box>
                </Box>
                
                <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                  <IconButton 
                    onClick={toggleDarkMode}
                    sx={{
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.secondary.main})`,
                      color: 'white',
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                      animation: `${gradientAnimation} 3s ease infinite`,
                      backgroundSize: '200% 200%',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </Container>
          </AppBar>
          
          <Container maxWidth="xl" sx={{ py: 6 }}>
            <Grid container spacing={4}>
              {/* Left Column - Upload & Preview */}
              <Grid item xs={12} lg={6}>
                <Zoom in={!selectedFile || isLoading || imageUploaded} timeout={800}>
                  <GlassCard>
                    {selectedFile ? (
                      <Fade in={true} timeout={800}>
                        <Box>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="380"
                              image={preview}
                              alt="Potato Leaf"
                              sx={{
                                objectFit: 'cover',
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                              }}
                            />
                          </CardActionArea>
                          {isLoading && (
                            <CardContent sx={{ textAlign: 'center', py: 6, px: 4 }}>
                              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <CircularProgress 
                                  size={100}
                                  thickness={2}
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    animation: `${gradientAnimation} 2s ease infinite`,
                                  }}
                                />
                                <Box
                                  sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Typography variant="h4" sx={{ 
                                    fontWeight: 800,
                                    background: `linear-gradient(135deg, 
                                      ${theme.palette.primary.main}, 
                                      ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                  }}>
                                    {uploadProgress}%
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography variant="h5" sx={{ 
                                mt: 4, 
                                fontWeight: 700,
                                color: theme.palette.text.primary,
                              }}>
                                🥔 Advanced Potato Leaf Analysis
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                mt: 2, 
                                color: theme.palette.text.secondary,
                                maxWidth: '400px', 
                                mx: 'auto',
                                lineHeight: 1.8,
                              }}>
                                Our neural network is analyzing your potato leaf for Early Blight, Late Blight, or confirming plant health...
                              </Typography>
                              <ConfidenceBar 
                                variant="determinate" 
                                value={uploadProgress} 
                                sx={{ 
                                  mt: 4,
                                  maxWidth: '400px',
                                  mx: 'auto',
                                }}
                              />
                              <Typography variant="caption" sx={{ 
                                mt: 2, 
                                display: 'block',
                                fontWeight: 600,
                                color: theme.palette.text.secondary,
                              }}>
                                {uploadProgress < 100 ? 'Processing potato leaf image...' : 'Finalizing comprehensive disease diagnosis...'}
                              </Typography>
                            </CardContent>
                          )}
                        </Box>
                      </Fade>
                    ) : (
                      <CardContent sx={{ textAlign: 'center', py: 6, px: 4 }}>
                        <Box sx={{
                          position: 'relative',
                          width: 120,
                          height: 120,
                          mx: 'auto',
                          mb: 4,
                        }}>
                          <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, 
                              ${theme.palette.primary.main}, 
                              ${theme.palette.secondary.main})`,
                            borderRadius: '50%',
                            animation: `${pulseAnimation} 2s ease-in-out infinite`,
                            opacity: 0.3,
                          }} />
                          <CloudUploadIcon sx={{
                            fontSize: '5rem',
                            color: theme.palette.primary.main,
                            position: 'relative',
                            zIndex: 1,
                            animation: `${floatAnimation} 6s ease-in-out infinite`,
                          }} />
                        </Box>
                        
                        <Typography variant="h3" sx={{ 
                          fontWeight: 800,
                          mb: 3,
                          background: `linear-gradient(135deg, 
                            ${theme.palette.primary.main}, 
                            ${theme.palette.secondary.main})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          animation: `${gradientAnimation} 3s ease infinite`,
                          backgroundSize: '200% 200%',
                        }}>
                          🥔 Potato Disease Detector
                        </Typography>
                        
                        <Typography variant="h6" sx={{ 
                          color: theme.palette.text.secondary,
                          mb: 4,
                          lineHeight: 1.8,
                          maxWidth: '600px',
                          mx: 'auto',
                          fontWeight: 400,
                        }}>
                          Upload potato leaf images for AI-powered detection of Early Blight, Late Blight, or confirmation of plant health with detailed disease information.
                        </Typography>
                        
                        <UploadAreaPremium {...getRootProps()}>
                          <input {...getInputProps()} />
                          <InsertPhotoIcon sx={{ 
                            fontSize: '4rem', 
                            color: theme.palette.primary.main,
                            mb: 3,
                            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.1))',
                          }} />
                          <Typography variant="h5" sx={{ 
                            color: theme.palette.text.primary, 
                            fontWeight: 700, 
                            mb: 2,
                          }}>
                            📁 Upload Potato Leaf Image
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            color: theme.palette.text.secondary, 
                            fontSize: '1.1rem',
                            mb: 3,
                          }}>
                            Drag & drop or click to upload potato leaf images for analysis
                          </Typography>
                          <Box sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 3,
                            py: 1.5,
                            borderRadius: '50px',
                            background: alpha(theme.palette.primary.main, 0.1),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            backdropFilter: 'blur(10px)',
                          }}>
                            <ShieldIcon sx={{ fontSize: '1.2rem', color: theme.palette.primary.main }} />
                            <Typography variant="caption" sx={{ 
                              color: theme.palette.text.secondary,
                              fontWeight: 600,
                            }}>
                              Secure & Private Analysis
                            </Typography>
                          </Box>
                        </UploadAreaPremium>
                        
                        <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2.5,
                            py: 1.5,
                            borderRadius: '12px',
                            background: alpha(theme.palette.success.main, 0.1),
                            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                          }}>
                            <CheckCircleIcon sx={{ fontSize: '1.2rem', color: theme.palette.success.main }} />
                            <Typography variant="caption" sx={{ 
                              color: theme.palette.text.secondary,
                              fontWeight: 600,
                            }}>
                              Detects 3 Conditions
                            </Typography>
                          </Box>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2.5,
                            py: 1.5,
                            borderRadius: '12px',
                            background: alpha(theme.palette.warning.main, 0.1),
                            border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                          }}>
                            <WarningIcon sx={{ fontSize: '1.2rem', color: theme.palette.warning.main }} />
                            <Typography variant="caption" sx={{ 
                              color: theme.palette.text.secondary,
                              fontWeight: 600,
                            }}>
                              Max 5MB
                            </Typography>
                          </Box>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2.5,
                            py: 1.5,
                            borderRadius: '12px',
                            background: alpha(theme.palette.primary.main, 0.1),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          }}>
                            <AnalyticsIcon sx={{ fontSize: '1.2rem', color: theme.palette.primary.main }} />
                            <Typography variant="caption" sx={{ 
                              color: theme.palette.text.secondary,
                              fontWeight: 600,
                            }}>
                              {stats.accuracy}% Accuracy
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    )}
                  </GlassCard>
                </Zoom>
                
                {/* Detect Button */}
                {imageUploaded && !isLoading && !data && (
                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <DetectButtonPremium
                      onClick={sendFile}
                      startIcon={<SearchIcon />}
                      size="large"
                      fullWidth
                      sx={{ maxWidth: '520px', mx: 'auto' }}
                    >
                      🔬 Analyze Potato Leaf
                    </DetectButtonPremium>
                    <Typography variant="caption" sx={{ 
                      display: 'block', 
                      mt: 2, 
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}>
                      Click to start comprehensive AI analysis with detailed disease information
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Right Column - Results & Detailed Information */}
              <Grid item xs={12} lg={6}>
                {/* Results Section */}
                {data && !isLoading && !error && (
                  <Slide direction="up" in={showResult} timeout={800}>
                    <Box>
                      <GlassCard sx={{ mb: 4 }}>
                        <CardContent sx={{ py: 6, px: 4 }}>
                          <Box display="flex" alignItems="center" gap={3} mb={4}>
                            <Box sx={{
                              width: 72,
                              height: 72,
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: `linear-gradient(135deg, 
                                ${theme.palette[diseaseData.severity].main}, 
                                ${alpha(theme.palette[diseaseData.severity].main, 0.7)})`,
                              boxShadow: `0 12px 40px ${alpha(theme.palette[diseaseData.severity].main, 0.3)}`,
                              animation: `${gradientAnimation} 3s ease infinite`,
                              backgroundSize: '200% 200%',
                            }}>
                              {getDiseaseIcon(data.class)}
                            </Box>
                            <Box>
                              <Typography variant="h4" sx={{ 
                                fontWeight: 800,
                                background: `linear-gradient(135deg, 
                                  ${theme.palette.primary.main}, 
                                  ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: `${gradientAnimation} 3s ease infinite`,
                                backgroundSize: '200% 200%',
                              }}>
                                🥔 Diagnosis Complete
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                              }}>
                                {diseaseData.scientificName} • {diseaseData.impact}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box textAlign="center" mb={6}>
                            <PremiumChip
                              label={diseaseData.name.toUpperCase()}
                              severity={diseaseData.severity}
                              icon={getDiseaseIcon(data.class)}
                              sx={{ py: 2.5 }}
                            />
                            <Typography variant="body1" sx={{ 
                              mt: 3, 
                              color: theme.palette.text.secondary,
                              fontWeight: 500,
                              fontSize: '1.1rem',
                              maxWidth: '600px',
                              mx: 'auto',
                              lineHeight: 1.7,
                            }}>
                              {diseaseData.description}
                            </Typography>
                          </Box>
                          
                          <Box mb={6}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 700, 
                                color: theme.palette.text.primary,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}>
                                <AnalyticsIcon /> AI Confidence Score
                              </Typography>
                              <Typography variant="h2" sx={{ 
                                fontWeight: 900,
                                background: `linear-gradient(135deg, 
                                  ${theme.palette.primary.main}, 
                                  ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: `${gradientAnimation} 3s ease infinite`,
                                backgroundSize: '200% 200%',
                              }}>
                                {confidence}%
                              </Typography>
                            </Box>
                            <ConfidenceBar 
                              variant="determinate" 
                              value={confidence}
                              sx={{ 
                                height: '24px',
                                borderRadius: '12px',
                              }}
                            />
                            <Typography variant="caption" sx={{ 
                              display: 'block', 
                              textAlign: 'right', 
                              mt: 1.5, 
                              fontWeight: 600,
                              color: theme.palette.text.secondary,
                            }}>
                              Neural network prediction confidence based on 256-layer analysis
                            </Typography>
                          </Box>

                          {/* Detailed Disease Information Accordions */}
                          <Box sx={{ mb: 5 }}>
                            <Accordion 
                              expanded={expandedAccordion === 'symptoms'} 
                              onChange={handleAccordionChange('symptoms')}
                              sx={{
                                background: alpha(theme.palette.primary.main, 0.05),
                                borderRadius: '16px !important',
                                mb: 2,
                                '&:before': { display: 'none' },
                              }}
                            >
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box display="flex" alignItems="center" gap={2}>
                                  <LocalHospitalIcon sx={{ color: theme.palette.primary.main }} />
                                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Symptoms & Identification
                                  </Typography>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box sx={{ pl: 1 }}>
                                  {diseaseData.symptoms && diseaseData.symptoms.map((symptom, index) => (
                                    <Box key={index} display="flex" alignItems="flex-start" gap={2} mb={1.5}>
                                      <Box sx={{ 
                                        width: 24, 
                                        height: 24, 
                                        borderRadius: '50%', 
                                        background: alpha(theme.palette.primary.main, 0.1),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mt: 0.5,
                                        flexShrink: 0,
                                      }}>
                                        <Typography variant="caption" sx={{ 
                                          color: theme.palette.primary.main, 
                                          fontWeight: 700,
                                          fontSize: '0.75rem',
                                        }}>
                                          {index + 1}
                                        </Typography>
                                      </Box>
                                      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                                        {symptom}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion 
                              expanded={expandedAccordion === 'causes'} 
                              onChange={handleAccordionChange('causes')}
                              sx={{
                                background: alpha(theme.palette.warning.main, 0.05),
                                borderRadius: '16px !important',
                                mb: 2,
                                '&:before': { display: 'none' },
                              }}
                            >
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box display="flex" alignItems="center" gap={2}>
                                  <BugReportIcon sx={{ color: theme.palette.warning.main }} />
                                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Causes & Risk Factors
                                  </Typography>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box sx={{ pl: 1 }}>
                                  {diseaseData.causes && diseaseData.causes.map((cause, index) => (
                                    <Box key={index} display="flex" alignItems="flex-start" gap={2} mb={1.5}>
                                      <Box sx={{ 
                                        width: 24, 
                                        height: 24, 
                                        borderRadius: '50%', 
                                        background: alpha(theme.palette.warning.main, 0.1),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mt: 0.5,
                                        flexShrink: 0,
                                      }}>
                                        <Typography variant="caption" sx={{ 
                                          color: theme.palette.warning.main, 
                                          fontWeight: 700,
                                          fontSize: '0.75rem',
                                        }}>
                                          {index + 1}
                                        </Typography>
                                      </Box>
                                      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                                        {cause}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion 
                              expanded={expandedAccordion === 'lifecycle'} 
                              onChange={handleAccordionChange('lifecycle')}
                              sx={{
                                background: alpha(theme.palette.info.main, 0.05),
                                borderRadius: '16px !important',
                                mb: 2,
                                '&:before': { display: 'none' },
                              }}
                            >
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box display="flex" alignItems="center" gap={2}>
                                  <TimelineIcon sx={{ color: theme.palette.info.main }} />
                                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Disease Lifecycle
                                  </Typography>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box sx={{ pl: 1 }}>
                                  {diseaseData.lifecycle && diseaseData.lifecycle.map((stage, index) => (
                                    <Box key={index} display="flex" alignItems="flex-start" gap={2} mb={1.5}>
                                      <Box sx={{ 
                                        width: 24, 
                                        height: 24, 
                                        borderRadius: '50%', 
                                        background: alpha(theme.palette.info.main, 0.1),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mt: 0.5,
                                        flexShrink: 0,
                                      }}>
                                        <Typography variant="caption" sx={{ 
                                          color: theme.palette.info.main, 
                                          fontWeight: 700,
                                          fontSize: '0.75rem',
                                        }}>
                                          {index + 1}
                                        </Typography>
                                      </Box>
                                      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                                        {stage}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion 
                              expanded={expandedAccordion === 'prevention'} 
                              onChange={handleAccordionChange('prevention')}
                              sx={{
                                background: alpha(theme.palette.success.main, 0.05),
                                borderRadius: '16px !important',
                                mb: 2,
                                '&:before': { display: 'none' },
                              }}
                            >
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box display="flex" alignItems="center" gap={2}>
                                  <ShieldIcon sx={{ color: theme.palette.success.main }} />
                                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Prevention & Control Measures
                                  </Typography>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box sx={{ pl: 1 }}>
                                  {diseaseData.prevention && diseaseData.prevention.map((measure, index) => (
                                    <Box key={index} display="flex" alignItems="flex-start" gap={2} mb={1.5}>
                                      <Box sx={{ 
                                        width: 24, 
                                        height: 24, 
                                        borderRadius: '50%', 
                                        background: alpha(theme.palette.success.main, 0.1),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mt: 0.5,
                                        flexShrink: 0,
                                      }}>
                                        <Typography variant="caption" sx={{ 
                                          color: theme.palette.success.main, 
                                          fontWeight: 700,
                                          fontSize: '0.75rem',
                                        }}>
                                          {index + 1}
                                        </Typography>
                                      </Box>
                                      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                                        {measure}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          </Box>

                          {/* Risk Assessment Table */}
                          <Box sx={{ 
                            borderRadius: '20px',
                            padding: '24px',
                            background: `linear-gradient(135deg, 
                              ${alpha(theme.palette[diseaseData.severity].main, 0.08)} 0%,
                              ${alpha(theme.palette[diseaseData.severity].main, 0.04)} 100%)`,
                            border: `1px solid ${alpha(theme.palette[diseaseData.severity].main, 0.2)}`,
                            mb: 4,
                          }}>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 700, 
                              color: theme.palette.text.primary,
                              mb: 3,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}>
                              <WarningIcon /> Risk Assessment
                            </Typography>
                            <TableContainer component={Paper} sx={{ 
                              background: 'transparent',
                              boxShadow: 'none',
                              borderRadius: '12px',
                              overflow: 'hidden',
                            }}>
                              <Table size="small">
                                <TableHead>
                                  <TableRow sx={{ 
                                    background: alpha(theme.palette[diseaseData.severity].main, 0.1),
                                  }}>
                                    <TableCell sx={{ fontWeight: 700, color: theme.palette.text.primary }}>Factor</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: theme.palette.text.primary }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: theme.palette.text.primary }}>Risk Level</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow sx={{ 
                                    background: alpha(theme.palette[diseaseData.severity].main, 0.05),
                                    '&:last-child td, &:last-child th': { border: 0 }
                                  }}>
                                    <TableCell component="th" scope="row" sx={{ color: theme.palette.text.secondary }}>
                                      Disease Severity
                                    </TableCell>
                                    <TableCell sx={{ color: theme.palette.text.secondary }}>
                                      {diseaseData.name}
                                    </TableCell>
                                    <TableCell>
                                      <Chip 
                                        label={diseaseData.severity === 'error' ? 'HIGH' : diseaseData.severity === 'warning' ? 'MEDIUM' : 'LOW'}
                                        size="small"
                                        sx={{ 
                                          background: diseaseData.severity === 'error' ? theme.palette.error.main :
                                                    diseaseData.severity === 'warning' ? theme.palette.warning.main :
                                                    theme.palette.success.main,
                                          color: 'white',
                                          fontWeight: 700,
                                          fontSize: '0.7rem',
                                        }}
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow sx={{ 
                                    background: alpha(theme.palette[diseaseData.severity].main, 0.03),
                                    '&:last-child td, &:last-child th': { border: 0 }
                                  }}>
                                    <TableCell component="th" scope="row" sx={{ color: theme.palette.text.secondary }}>
                                      Crop Impact
                                    </TableCell>
                                    <TableCell sx={{ color: theme.palette.text.secondary }}>
                                      {diseaseData.impact}
                                    </TableCell>
                                    <TableCell sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                                      {diseaseData.severity === 'error' ? 'Critical' : diseaseData.severity === 'warning' ? 'Moderate' : 'Minimal'}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow sx={{ 
                                    background: alpha(theme.palette[diseaseData.severity].main, 0.05),
                                    '&:last-child td, &:last-child th': { border: 0 }
                                  }}>
                                    <TableCell component="th" scope="row" sx={{ color: theme.palette.text.secondary }}>
                                      Risk Period
                                    </TableCell>
                                    <TableCell sx={{ color: theme.palette.text.secondary }}>
                                      {diseaseData.riskPeriod}
                                    </TableCell>
                                    <TableCell sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                                      Seasonal
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                          
                          <Box display="flex" justifyContent="center" gap={3}>
                            <PremiumButton
                              onClick={clearData}
                              startIcon={<RefreshIcon />}
                              sx={{ flex: 1, maxWidth: '400px' }}
                            >
                              🔄 Analyze Another Leaf
                            </PremiumButton>
                          </Box>
                        </CardContent>
                      </GlassCard>
                    </Box>
                  </Slide>
                )}

                {/* Information Section when no results */}
                {!data && !isLoading && !error && (
                  <Grow in={true} timeout={800}>
                    <Box>
                      <GlassCard sx={{ mb: 4 }}>
                        <CardContent sx={{ py: 5, px: 4 }}>
                          <Typography variant="h5" sx={{ 
                            fontWeight: 800,
                            mb: 3,
                            background: `linear-gradient(135deg, 
                              ${theme.palette.primary.main}, 
                              ${theme.palette.secondary.main})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: `${gradientAnimation} 3s ease infinite`,
                            backgroundSize: '200% 200%',
                          }}>
                            🥔 Potato Diseases We Detect
                          </Typography>
                          
                          <Box sx={{ 
                            height: '4px',
                            width: '80px',
                            background: `linear-gradient(90deg, 
                              ${theme.palette.primary.main}, 
                              ${theme.palette.secondary.main})`,
                            borderRadius: '2px',
                            mb: 4,
                            animation: `${gradientAnimation} 3s ease infinite`,
                            backgroundSize: '200% 100%',
                          }} />

                          {/* Disease Information Cards */}
                          {Object.values(potatoDiseases).map((disease, index) => (
                            <Box 
                              key={index} 
                              sx={{ 
                                mb: 3, 
                                p: 3, 
                                borderRadius: '20px',
                                background: `linear-gradient(135deg, 
                                  ${alpha(theme.palette[disease.severity].main, 0.08)} 0%,
                                  ${alpha(theme.palette[disease.severity].main, 0.04)} 100%)`,
                                border: `1px solid ${alpha(theme.palette[disease.severity].main, 0.15)}`,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  boxShadow: `0 12px 32px ${alpha(theme.palette[disease.severity].main, 0.15)}`,
                                }
                              }}
                            >
                              <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <Box sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: '14px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: `linear-gradient(135deg, 
                                    ${theme.palette[disease.severity].main}, 
                                    ${alpha(theme.palette[disease.severity].main, 0.7)})`,
                                }}>
                                  {disease.severity === 'success' ? <SpaIcon sx={{ color: 'white', fontSize: '1.5rem' }} /> :
                                   disease.severity === 'warning' ? <WarningIcon sx={{ color: 'white', fontSize: '1.5rem' }} /> :
                                   <ErrorIcon sx={{ color: 'white', fontSize: '1.5rem' }} />}
                                </Box>
                                <Box>
                                  <Typography variant="h6" sx={{ 
                                    fontWeight: 700, 
                                    color: theme.palette.text.primary,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                  }}>
                                    {disease.name}
                                  </Typography>
                                  <Typography variant="caption" sx={{ 
                                    color: theme.palette.text.secondary,
                                    fontWeight: 500,
                                  }}>
                                    {disease.scientificName}
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography variant="body2" sx={{ 
                                color: theme.palette.text.secondary,
                                lineHeight: 1.7,
                                mb: 2,
                              }}>
                                {disease.description}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Chip 
                                  label={`Impact: ${disease.impact}`}
                                  size="small"
                                  sx={{ 
                                    background: alpha(theme.palette[disease.severity].main, 0.15),
                                    color: theme.palette[disease.severity].main,
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                  }}
                                />
                                <Chip 
                                  label={`Risk: ${disease.riskPeriod}`}
                                  size="small"
                                  sx={{ 
                                    background: alpha(theme.palette.info.main, 0.15),
                                    color: theme.palette.info.main,
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                  }}
                                />
                              </Box>
                            </Box>
                          ))}

                          {/* Quick Facts Table */}
                          <Box sx={{ 
                            mt: 4,
                            p: 3,
                            borderRadius: '20px',
                            background: `linear-gradient(135deg, 
                              ${alpha(theme.palette.primary.main, 0.08)} 0%,
                              ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                          }}>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 700, 
                              color: theme.palette.text.primary,
                              mb: 3,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}>
                              <InfoIcon /> Potato Disease Quick Facts
                            </Typography>
                            <TableContainer component={Paper} sx={{ 
                              background: 'transparent',
                              boxShadow: 'none',
                              borderRadius: '12px',
                              overflow: 'hidden',
                            }}>
                              <Table size="small">
                                <TableBody>
                                  <TableRow sx={{ 
                                    background: alpha(theme.palette.primary.main, 0.05),
                                    '&:last-child td, &:last-child th': { border: 0 }
                                  }}>
                                    <TableCell component="th" scope="row" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                                      Early Blight Spread
                                    </TableCell>
                                    <TableCell sx={{ color: theme.palette.text.secondary }}>
                                      Wind, rain, infected debris
                                    </TableCell>
                                  </TableRow>
                                  <TableRow sx={{ 
                                    background: alpha(theme.palette.primary.main, 0.03),
                                    '&:last-child td, &:last-child th': { border: 0 }
                                  }}>
                                    <TableCell component="th" scope="row" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                                      Late Blight Speed
                                    </TableCell>
                                    <TableCell sx={{ color: theme.palette.text.secondary }}>
                                      Can destroy crop in 7-10 days
                                    </TableCell>
                                  </TableRow>
                                  <TableRow sx={{ 
                                    background: alpha(theme.palette.primary.main, 0.05),
                                    '&:last-child td, &:last-child th': { border: 0 }
                                  }}>
                                    <TableCell component="th" scope="row" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                                      Optimal Detection Time
                                    </TableCell>
                                    <TableCell sx={{ color: theme.palette.text.secondary }}>
                                      Early morning when dew is present
                                    </TableCell>
                                  </TableRow>
                                  <TableRow sx={{ 
                                    background: alpha(theme.palette.primary.main, 0.03),
                                    '&:last-child td, &:last-child th': { border: 0 }
                                  }}>
                                    <TableCell component="th" scope="row" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                                      Global Impact
                                    </TableCell>
                                    <TableCell sx={{ color: theme.palette.text.secondary }}>
                                      Causes 20-30% annual potato losses worldwide
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </CardContent>
                      </GlassCard>
                    </Box>
                  </Grow>
                )}
              </Grid>
            </Grid>
          </Container>

          {/* Premium Footer */}
          <Box sx={{ 
            py: 4, 
            mt: 8,
            background: darkMode 
              ? 'rgba(30, 30, 30, 0.5)'
              : 'rgba(245, 247, 250, 0.7)',
            borderTop: `1px solid ${theme.palette.divider}`,
          }}>
            <Container maxWidth="xl">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.secondary.main})`,
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}>
                      <EmojiNatureIcon sx={{ fontSize: 24, color: 'white' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 800,
                        background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main}, 
                          ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                        SOLANIX AI
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                      }}>
                        Advanced Potato Disease Detection & Intelligence System
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.text.secondary,
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 500,
                  }}>
                    © {new Date().getFullYear()} Solanix AI. Potato Disease Detection System.<br />
                    Powered by neural networks trained on 50,000+ potato leaf images.
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Premium Snackbar */}
          <Snackbar 
            open={snackbarOpen} 
            autoHideDuration={6000} 
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{
              '& .MuiSnackbarContent-root': {
                background: 'transparent',
                boxShadow: 'none',
                padding: 0,
              }
            }}
          >
            <div>
              <PremiumAlert onClose={handleSnackbarClose} severity="error">
                {error}
              </PremiumAlert>
            </div>
          </Snackbar>
        </React.Fragment>
      </Box>
    </ThemeProvider>
  );
}

export default SolanixAIApp;