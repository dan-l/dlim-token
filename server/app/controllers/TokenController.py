class TokenController:

  def __init__(self, w3_manager, token_address):
    self._token_address = token_address;
    self._w3_manager = w3_manager

  def getBalance(self, wallet_address):
    return self._w3_manager.balanceOf(self._token_address, wallet_address);
