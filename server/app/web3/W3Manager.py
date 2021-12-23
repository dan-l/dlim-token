from web3 import Web3
import os
import json
import logging

'''
The quickest way to interact with the Ethereum blockchain is to use a remote node provider, like Infura. You can connect to a remote node by specifying the endpoint,
'''
class W3Manager:
  def __init__(self, provider_url):
    self.w3 = Web3(Web3.HTTPProvider(provider_url))


  def balanceOf(self, token_address, wallet_address):
    try:
      abi = self._getABI(token_address)
    except OSError as e:
      logging.exception('File not found error')
      return None

    token = self.w3.eth.contract(address=token_address, abi=abi)
    return token.functions.balanceOf(wallet_address).call()


  def _getABI(self, token_address):
    abs_path = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(abs_path, 'contracts/%s.json' % token_address)

    with open(path) as f:
      data = json.load(f)

    return data['abi']

