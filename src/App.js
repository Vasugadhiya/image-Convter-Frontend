// ------------------------------------------------------------- Old Code ------------------------------------------------------------

// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   FormControl,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { LoadingButton } from '@mui/lab';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import GetAppIcon from '@mui/icons-material/GetApp';
// import Header from './Header'; // Import Header
// import Footer from './Footer'; // Import Footer
// import './App.css';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'png',
//   'jpeg',
//   'pdf',
//   'svg',
//   'jpg',
//   'gif',
//   'webp',
//   'tiff',
//   'raw',
//   'html',
//   'jpx',
//   'jxl',
//   'jp2',
//   'heif',
//   'avif',
// ];

// function App() {
//   const [imageData, setImageData] = useState();
//   const [imageType, setImageType] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [downloadUrl, setDownloadUrl] = useState('');
//   const [downloadEnabled, setDownloadEnabled] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [imagePreview, setImagePreview] = useState('');

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       setErrorMessage(''); // Reset error message
//       const formdata = new FormData();
//       formdata.append('image', imageData);
//       formdata.append('to', imageType);
//       const response = await axios.post(`https://image-convter-backend.vercel.app/convert`, formdata); // Live Mate Use Karavani
//       // const response = await axios.post(`http://localhost:8000/convert`, formdata); // Local Mate Use Karavani
//       setLoading(false);
//       setDownloadUrl(response.data.downloadLink);
//       setDownloadEnabled(true); // Enable download button
//     } catch (error) {
//       console.log('error', error);
//       setLoading(false);
//       setErrorMessage('Conversion failed. Please try again.');
//     }
//   };

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setImageType(value);
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImageData(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setDownloadEnabled(false);
//     }, 60000);
//   }, [downloadUrl]);

//   const handleDownload = async () => {
//     if (downloadEnabled) {
//       try {
//         const response = await axios.get(downloadUrl, { responseType: 'blob' });
//         const blob = new Blob([response.data], { type: response.data.type });
//         const link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = downloadUrl.split('/').pop(); // Use the file name from the URL
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } catch (error) {
//         console.log('Download error', error);
//       }
//     } else {
//       toast.error('Please try again!', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light',
//       });
//     }
//   };

//   return (
//     <Box>
//       <Header /> {/* Include Header */}
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//         bgcolor="#e0f7fa"
//       >
//         <Card sx={{ maxWidth: 500, width: '100%', padding: 5, bgcolor: '#ffffff', boxShadow: 3 }}>
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div" align="center">
//               Image Converter
//             </Typography>
//             <FormControl fullWidth sx={{ mt: 3 }}>
//               <Button
//                 variant="outlined"
//                 component="label"
//                 fullWidth
//                 startIcon={<CloudUploadIcon />}
//                 sx={{ height: '50px' }}
//               >
//                 Upload Image
//                 <input type="file" hidden onChange={handleFileChange} />
//               </Button>
//             </FormControl>
//             {imagePreview && (
//               <Box display="flex" justifyContent="center" mt={3}>
//                 <img src={imagePreview} alt="Uploaded Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
//               </Box>
//             )}
//             <FormControl fullWidth sx={{ mt: 3 }}>
//               <Select
//                 displayEmpty
//                 value={imageType}
//                 onChange={handleChange}
//                 input={<OutlinedInput />}
//                 renderValue={(selected) => {
//                   if (selected.length === 0) {
//                     return <em>Convert to</em>;
//                   }
//                   return selected;
//                 }}
//                 MenuProps={MenuProps}
//                 inputProps={{ 'aria-label': 'Without label' }}
//               >
//                 <MenuItem disabled value="">
//                   <em>Convert to</em>
//                 </MenuItem>
//                 {names.map((name) => (
//                   <MenuItem key={name} value={name}>
//                     {name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Box display="flex" justifyContent="center" mt={3}>
//               <LoadingButton
//                 size="large"
//                 onClick={handleClick}
//                 loading={loading}
//                 loadingIndicator="Converting…"
//                 variant="contained"
//                 fullWidth
//                 disabled={downloadUrl}
//                 sx={{
//                   height: '50px',
//                   bgcolor: '#0288d1',
//                   '&:hover': { bgcolor: '#0277bd' },
//                 }}
//               >
//                 <span>Convert Image</span>
//               </LoadingButton>
//             </Box>
//             {downloadUrl && (
//               <Box display="flex" justifyContent="center" mt={3}>
//                 <Button
//                   size="large"
//                   variant="contained"
//                   fullWidth
//                   onClick={handleDownload}
//                   startIcon={<GetAppIcon />}
//                   sx={{
//                     height: '50px',
//                     bgcolor: '#2e7d32',
//                     '&:hover': { bgcolor: '#1b5e20' },
//                   }}
//                 >
//                   <span>Download Now</span>
//                 </Button>
//               </Box>
//             )}
//             {errorMessage && (
//               <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
//                 {errorMessage}
//               </Typography>
//             )}
//           </CardContent>
//         </Card>
//       </Box>
//       <Footer /> {/* Include Footer */}
//       <ToastContainer />
//     </Box>
//   );
// }

// export default App;


// ---------------------------------------------------- New Code --------------------------------------------------------------------------------------

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import Header from './Header';
import Footer from './Footer';
import './App.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'png', 'jpeg', 'pdf', 'svg', 'jpg', 'gif', 'webp', 'tiff', 'raw', 'html', 'jpx', 'jxl', 'jp2', 'heif', 'avif','docx','pptx',
];

function App() {
  const [imageData, setImageData] = useState(null);
  const [imageType, setImageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadEnabled, setDownloadEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleClick = async () => {
    if (!imageData || !imageType) {
      toast.error('Please upload an image and select a conversion type.', {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const formData = new FormData();
      formData.append('image', imageData);
      formData.append('to', imageType);
      // const response = await axios.post(`https://image-convter-backend.vercel.app/convert`, formData);
      const response = await axios.post(`https://backend-image-convter.vercel.app/api/convert`, formData);
      setLoading(false);
      setDownloadUrl(response.data.downloadLink);
      setDownloadEnabled(true);
      toast.success('Conversion successful!', {
        position: 'top-right',
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Conversion error:', error);
      setLoading(false);
      setErrorMessage('Conversion failed. Please try again.');
    }
  };

  const handleChange = (event) => {
    setImageType(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageData(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (downloadUrl) {
      const timer = setTimeout(() => {
        setDownloadEnabled(false);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [downloadUrl]);

  const handleDownload = async () => {
    if (downloadEnabled) {
      try {
        const response = await axios.get(downloadUrl, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: response.data.type });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = downloadUrl.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Download error:', error);
      }
    } else {
      toast.error('Download link expired. Please convert the image again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh' }}>
      <Header />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 200px)" p={2}>
        <Card sx={{ maxWidth: 500, width: '100%', padding: 3, bgcolor: '#ffffff', boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" align="center" color="primary">
              Image Converter
            </Typography>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{
                  height: '50px',
                  bgcolor: '#1976d2',
                  '&:hover': { bgcolor: '#1565c0' },
                  transition: 'background-color 0.3s',
                }}
              >
                Upload Image
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {imageData && (
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
                  {imageData.name} ({(imageData.size / 1024).toFixed(2)} KB)
                </Typography>
              )}
            </FormControl>
            {imagePreview && (
              <Box display="flex" justifyContent="center" mt={3} sx={{ animation: 'fadeIn 0.5s' }}>
                <img src={imagePreview} alt="Uploaded Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: 5 }} />
              </Box>
            )}
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Select
                displayEmpty
                value={imageType}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected ? selected : <em>Convert to</em>)}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem disabled value="">
                  <em>Convert to</em>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="center" mt={3}>
              <LoadingButton
                size="large"
                onClick={handleClick}
                loading={loading}
                loadingIndicator={<CircularProgress color="inherit" size={24} />}
                variant="contained"
                fullWidth
                disabled={loading || downloadUrl}
                sx={{
                  height: '50px',
                  bgcolor: '#0288d1',
                  '&:hover': { bgcolor: '#0277bd' },
                  transition: 'background-color 0.3s',
                }}
              >
                <span>Convert Image</span>
              </LoadingButton>
            </Box>
            {downloadUrl && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={handleDownload}
                  startIcon={<GetAppIcon />}
                  sx={{
                    height: '50px',
                    bgcolor: '#2e7d32',
                    '&:hover': { bgcolor: '#1b5e20' },
                    transition: 'background-color 0.3s',
                  }}
                >
                  <span>Download Now</span>
                </Button>
              </Box>
            )}
            {errorMessage && (
              <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
      <Footer />
      <ToastContainer />
    </Box>
  );
}

export default App;



