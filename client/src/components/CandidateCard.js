import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Candidate({ id, name, voteCount }) {

  return (
    <Card variant="outlined"
     sx={{ background: 'rgba(0, 0, 32, 0.5)', maxWidth: 345, minWidth: 300, 
            ":hover": {
          boxShadow: '0px 0px 20px 1px rgba(255, 187, 118, 0.498)',
          border: '1px solid rgba(255, 255, 255, 0.454)',
          transition: 'box-shadow 0.3s, border 0.3s', // Optional: add a smooth transition effect
        },
     }}>
      <CardHeader
        title={
          <Typography align="center" variant="h3">
            {name}
          </Typography>
        }
      />
      <CardContent sx={{ padding: 0 }}>
        
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        {voteCount && (
          <Typography align="center" variant="h2">
            <strong>{voteCount}</strong> votes
          </Typography>
        )}
      </CardActions>
    </Card>
  );
}
