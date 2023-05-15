import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { Email } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';

const TouristTable = ({ tourists }) => {

  
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '800px', margin: 'auto' }}>
      <Table aria-label="tourist table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Avatar</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tourists.map((tourist) => (
            <TableRow key={tourist.id}>
              <TableCell component="th" scope="row">
                <Avatar sx={{ bgcolor: getRandomColor() }}>
                  {tourist.name.charAt(0).toUpperCase()}
                </Avatar>
              </TableCell>
              <TableCell align="left">{tourist.name}</TableCell>
              <TableCell align="left">{tourist.email}</TableCell>
              <TableCell align="left">
                <Button
                  href={`mailto:?to=${tourist.email}`}
                  style={{ marginLeft: 20 }}
                  startIcon={<Email />}
                  variant="contained"
                  color="primary"
                >
                  Contact
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 50%)`;
};

export default TouristTable;
