import { useEffect, useState } from "react";
import {Box, Grid, Button, Typography} from "@mui/material";

import Candidate from "../components/CandidateCard";
import CandidateForm from "../components/CandidateForm";
import VotersForm from "../components/VotersForm";

export default function Organizer({ role, contract, web3, currentAccount }) {
  const [electionState, setElectionState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);

  const [open, setOpen] = useState(false);

  const getCandidates = async () => {
    if (contract) {
      console.log(contract);
      const count = await contract.methods.candidatesCount().call();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidateDetails(i).call();
        temp.push({ name: candidate[0], votes: candidate[1] });
      }
      setCandidates(temp);
      setLoading(false);
      console.log(temp);
    }
  };

  const getElectionState = async () => {
    if (contract) {
      const state = await contract.methods.electionState().call();
      setElectionState(parseInt(state));
    }
  };

  useEffect(() => {
    getElectionState();
    getCandidates();
  }, [contract]);



  const handleAgree = async () => {
    if (electionState === 0) {
      try {
        if (contract) {
          await contract.methods.startElection().send({ from: currentAccount });
          getElectionState();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (electionState === 1) {
      try {
        if (contract) {
          await contract.methods.endElection().send({ from: currentAccount });
          getElectionState();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    setOpen(false);
  };

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          Loading...
        </Box>
      ) : (
        <Box >
          <Grid container sx={{ mt: 0 }} spacing={4}>
            <Grid item xs={12}>
              <Typography align="center" variant="h6" color="textSecondary">
                ELECTION STATUS :{" "}
                {electionState === 0 && "Election has not started."}
                {electionState === 1 && "Election is in progress."}
                {electionState === 2 && "Election has ended."}
              </Typography> 
            </Grid>
            
            {electionState !== 2 && (
              <Grid item xs={6} sx={{ display: "flex" }}>
                <Button
                  variant="outlined"
                  size="large"
                  color="warning"
                  sx={{ width: "50%", margin: "auto", height:"150px", fontSize:'24px'}}
                  onClick={handleAgree}
                >
                  {electionState === 0 && "Start Election"}
                  {electionState === 1 && "End Election"}
                </Button>
              </Grid>
            )}

            <Grid item xs={6}>
              <Typography align="center" variant="h6">
                {electionState === 0 && "ADD VOTERS / CANDIDATES"}
                {electionState === 1 && "CURRENT STATUS"}
                {electionState === 2 && "ELECTION RESULT"}
              </Typography>
              
            

            {electionState === 0 && (
              <>
                  <VotersForm
                    contract={contract}
                    web3={web3}
                    currentAccount={currentAccount}
                  />
                  <CandidateForm
                    contract={contract}
                    web3={web3}
                    currentAccount={currentAccount}
                  />
                </>
            )}
</Grid>
            {electionState > 0 && (
              <Grid
                item
                xs={12}
                sx={{
                  overflowY: "hidden",
                  overflowX: "auto",
                  display: "flex",
                  width: "98vw",
                  justifyContent: "center",
                }}
              >
                {candidates &&
                  candidates.map((candidate, index) => (
                    <Box sx={{ mx: 2 }} key={index}>
                      <Candidate
                        id={index}
                        name={candidate.name}
                        voteCount={candidate.votes}
                      />
                    </Box>
                  ))}
              </Grid>
            )}
          </Grid>

         
        </Box>
      )}
    </Box>
  );
}
