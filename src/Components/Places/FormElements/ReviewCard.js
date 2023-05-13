import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { VictoryPie } from 'victory';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function ReviewsCard({ reviewsData}) {

    

    const colorScaleForSentiment = [
        "#FFD700",
        "#6A5ACD",
        "#808080"
    ];

    const colorScaleForStars = [
        "#FF2D2D",
        "#FFA500",
        "#98FB98",
        "#FFD700",
        "#00FF00"
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                    Reviews ({reviewsData.numberOfReviews})
                </Typography>

                <Typography variant="h6" component="h3" gutterBottom>
                    Ratings Average: {reviewsData.ratingsAverage && reviewsData.ratingsAverage.toFixed(2)}
                </Typography>

                <div style={{ display: 'flex', }}>
                    <VictoryPie
                        data={[
                            { x: 'Positive', y: reviewsData.positiveResponse },
                            { x: 'Negative', y: reviewsData.negativeResponse },
                            { x: 'Neutral', y: reviewsData.neutralResponse },
                        ]}
                        innerRadius={70}
                        labelRadius={90}
                        style={{ labels: { fill: 'black', fontSize: 16, fontWeight: 'bold' } }}
                        colorScale={colorScaleForSentiment}
                    />

                    <VictoryPie
                        data={reviewsData.ratingsData}
                        innerRadius={70}
                        labelRadius={100}
                        style={{ labels: { fill: 'black', fontSize: 16, fontWeight: 'bold' } }}
                        colorScale={colorScaleForStars}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <Typography variant="body1" gutterBottom>
                        Positive: {reviewsData.positivePercent && reviewsData.positivePercent.toFixed(2)}%
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        Negative: {reviewsData.negativePercent && reviewsData.negativePercent.toFixed(2)}%
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        Neutral: {reviewsData.neutralPercent && reviewsData.neutralPercent.toFixed(2)}%
                    </Typography>
                </div>


                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rating</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviewsData.reviews &&
                                reviewsData.reviews.map((review) => (
                                    <TableRow key={review._id}>
                                        <TableCell>{review.rating}</TableCell>
                                        <TableCell>{review.name}</TableCell>
                                        <TableCell>{review.comment}</TableCell>
                                        <TableCell>{
                                        `${new Date(review.date).getFullYear()}
                                        -${(new Date(review.date).getMonth()+1) < 10 ? '0' : ''}${(new Date(review.date).getMonth()+1)}-
                                        ${new Date(review.date).getDate() < 10 ? '0' : ''}
                                        ${new Date(review.date).getDate()}`}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}

export default ReviewsCard;
