from config import DEBUG, HOST, PORT
from app import app

if __name__ == '__main__':
  if DEBUG:
    app.run(debug=True, host='', port=PORT)
  else:
    # TODO define for deployment
    pass
