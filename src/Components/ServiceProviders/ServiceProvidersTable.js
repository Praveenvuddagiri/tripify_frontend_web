import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

const ServiceProvidersTable = ({ serviceproviders }) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '800px', margin: 'auto' }}>
      <Table aria-label="serviceprovider table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Avatar</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceproviders.map((serviceprovider) => (
            <TableRow key={serviceprovider.id}>
              <TableCell component="th" scope="row">
                <Avatar sx={{ bgcolor: getRandomColor() }}>
                  {serviceprovider.name.charAt(0).toUpperCase()}
                </Avatar>
              </TableCell>
              <TableCell align="left">{serviceprovider.name}</TableCell>
              <TableCell align="left">{serviceprovider.email}</TableCell>
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

export default ServiceProvidersTable;
