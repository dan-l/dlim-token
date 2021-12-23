# Flask API server for interacting with ETH smart contract

- Using [Web3py](https://web3py.readthedocs.io/en/stable/quickstart.html) 
- Using `Infura` as the remote node provider to interact with ETH blockchain
- Define `INFURA_HTTP_PROVIDER_ENDPOINT` env var to connect via w3 `HTTPProvider` 
- Define the ABI json file under `web3/contracts` dir to access the contract via w3's `ContractFactory`


### Development
- `pipenv install flask`
- `pipenv shell `
- `python server.py`
- `curl  'http://localhost:8800/api/v1/showBalance?token_address=x&wallet_address=x'`
