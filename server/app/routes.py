from flask import Blueprint, jsonify, request, current_app

from app.controllers import TokenController
from app.web3 import W3Manager

# define the blueprint
blueprint_routes = Blueprint(name="blueprint_routes", import_name=__name__)

@blueprint_routes.route('/showBalance', methods=['GET'])
def showBalance():
  token_address = request.args.get('token_address')
  if not token_address:
    return jsonify(
      errors='No token_address specified in query param'
    )

  wallet_address = request.args.get('wallet_address')
  if not wallet_address:
    return jsonify(
      errors='No wallet_address specified in query param'
    )

  w3_manager = W3Manager(current_app.config['INFURA_HTTP_PROVIDER_ENDPOINT'])
  ctrl = TokenController(w3_manager, token_address)
  balance = ctrl.getBalance(wallet_address)

  if balance is None:
    return jsonify(
      errors='Balance cannot be retrieved. Please make sure the token and wallet address is correct'
    )

  return jsonify(
    balance=balance
  )
