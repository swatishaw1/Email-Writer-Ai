import { useState } from 'react'
import './App.css'
import { Container, TextField, Typography, Box, FormControl, Select, InputLabel, MenuItem, CircularProgress, Button } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async() =>{
    setLoading(true);
    setError('');
    try {
      console.log(`here: ${import.meta.env.VITE_API_URL}`);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/email/generator`,{emailContent,tone});
      //We are getting string from backend though its a additional check that respose is actually a string or not
      setGeneratedReply(typeof response.data==='string'?response.data:JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to fatch email.Please try again');
      console.error(error);
    }finally{
      setLoading(false);
    }
  };  
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant='h3' component="h1" sx={{ mb: 5 }} gutterBottom>Email Reply Generator</Typography>
      <Box sx={{ marginTop:2 }}>
        <TextField fullWidth multiline rows={6} variant='outlined' label="Original Email Content" value={emailContent || ''} onChange={(e) => setEmailContent(e.target.value)} sx={{ mx: 2 }} />
      
      <FormControl fullWidth sx={{ m:2 }}>
          <InputLabel>Tone(Optional)</InputLabel>
          <Select
          value={tone || ''}
          label={"Tone(Optional)"}
          onChange={(e)=>setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
            <MenuItem value="Concise">Concise</MenuItem>
            <MenuItem value="Apologetic">Apologetic</MenuItem>
          </Select>
        </FormControl>
        <Box display={'flex'} justifyContent={'center'}>
        <Button maxwidth="md" sx={{ mx:3}} 
        variant='contained'
        onClick={handleSubmit} 
        disabled={!emailContent || loading}>
          {loading ? <CircularProgress size={24}/> : "Generate Reply"}
        </Button></Box>
        </Box>
        {error &&(
          <Typography color='error' sx={{ mb:2 }}>{error}</Typography>
        )}
        {generatedReply && (
          <Box sx={{mt:3}}>
            <Typography variant='h6' gutterBottom>Generated Reply:</Typography>
            <TextField fullWidth multiline rows={6} variant='outlined' value={generatedReply||''} inputProps={{readOnly:true}}/>
            <Button variant='outlined' sx={{mt:2}}
            onClick={() => navigator.clipboard.writeText(generatedReply)}//This is how we copy text to clipboard
            >Copy to Clipboard</Button>
          </Box>
        )}
    </Container>
  )
}

export default App
