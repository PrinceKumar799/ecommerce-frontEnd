import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Link } from '@mui/material';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Implement your signup logic here
    console.log('Signup:', { firstName, lastName, email, password });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h5">Sign Up</Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
          <Typography variant="body2" style={{ marginTop: '1rem' }}>
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
