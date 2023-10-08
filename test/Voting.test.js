const Election = artifacts.require('Election'); 

contract('Election', (accounts) => {
  let electionInstance;

  before(async () => {
    electionInstance = await Election.deployed();
  });

  it('should set the owner correctly', async () => {
    const owner = await electionInstance.owner();
    assert.equal(owner, accounts[0], 'Owner is not set correctly');
  });

  it('should start the election', async () => {
    await electionInstance.startElection({ from: accounts[0] });
    const electionState = await electionInstance.electionState();
    assert.equal(electionState, 1, 'Election was not started');
  });

});
