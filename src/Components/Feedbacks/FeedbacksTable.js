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
import { Email, Feedback } from '@mui/icons-material';

const FeedbacksTable = ({ feedbacks }) => {

  
  return (
    <TableContainer component={Paper} sx={{ minWidth: '800px', maxWidth: '85%', margin: 'auto' }}>
      <Table aria-label="feedback table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Avatar</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow key={feedback.id}>
              <TableCell component="th" scope="row">
                <Avatar sx={{ bgcolor: getRandomColor() }}>
                  {feedback.name.charAt(0).toUpperCase()}
                </Avatar>
              </TableCell>
              <TableCell align="left">{feedback.name}</TableCell>
              <TableCell align="left">{feedback.email}</TableCell>
              <TableCell align="left">{feedback.description}</TableCell>
              <TableCell align="left">{new Date(feedback.createdAt).toLocaleString()}</TableCell>
              <TableCell align="left">
                <Button
                  href={`mailto:?to=${feedback.email}`}
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

export default FeedbacksTable;
