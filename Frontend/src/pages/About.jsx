import React from 'react';
import { Box, Typography, Avatar, Grid, Chip, Divider, Stack, Button } from '@mui/material';
import AutherImage from '../assets/blog.png'

const About = () => {
  return (
    <Box sx={{ padding: '40px 20px', maxWidth: '1000px', margin: 'auto' }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h2" fontWeight="bold">About This Blog</Typography>
        <Typography variant="subtitle1" color="text.secondary" mt={2}>
          A space where thoughts, code, and creativity meet.
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4}>
          <Avatar
            alt="Author"
            src={AutherImage}
            sx={{ width: 150, height: 150, margin: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight="bold">Hi, I'm Shivam 👋</Typography>
          <Typography variant="body1" mt={1}>
            I'm a full-stack developer and writer who loves sharing knowledge, tutorials, and stories around web development, personal growth, and the tech world.
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="outlined" href="https://twitter.com" target="_blank">Twitter</Button>
            <Button variant="outlined" href="/contact">Contact Me</Button>
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 5 }} />

      <Box mb={5}>
        <Typography variant="h4" gutterBottom>🌟 Our Mission</Typography>
        <Typography variant="body1" color="text.secondary">
          This blog is a journey of learning and teaching. It’s built to simplify development concepts, spark curiosity, and help developers of all levels grow together.
        </Typography>
      </Box>

      <Box mb={5}>
        <Typography variant="h4" gutterBottom>📚 What I Write About</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Chip label="JavaScript" color="primary" />
          <Chip label="React.js" color="secondary" />
          <Chip label="Node.js" color="success" />
          <Chip label="Web Dev Tips" />
          <Chip label="Career Advice" />
          <Chip label="Personal Growth" />
        </Stack>
      </Box>

      <Box mb={5}>
        <Typography variant="h4" gutterBottom>🛠️ Tech Stack</Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Built with:
        </Typography>
        <Stack direction="row" spacing={2}>
          <Chip label="React.js" />
          <Chip label="Vite" />
          <Chip label="Express.js" />
          <Chip label="MongoDB" />
          <Chip label="JWT" />
        </Stack>
      </Box>
    </Box>
  );
};

export default About;