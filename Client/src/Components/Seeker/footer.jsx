import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#333', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              CareerLink is a leading job portal that connects job seekers with
              employers across various industries. We aim to help individuals
              find their dream jobs and assist companies in hiring the right
              talent.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" sx={{}}>
              Useful Links
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, textDecoration: 'none' }}>
              <Link
                href="/jobs"
                color="inherit"
                sx={{ textDecoration: 'none', paddingBottom: '1rem' }}
              >
                Browse Jobs
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <Link
                href="/companies"
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                Companies
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <Link
                href="/contact"
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                Contact Us
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
              Connect With Us
            </Typography>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ mr: 1 }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ mr: 1 }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ mr: 1 }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} CareerLink. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
