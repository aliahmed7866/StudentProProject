## StudentPro API

An API that allows team members to access data required for the front-end.

## Usage

Simply make requests to the endpoints. These can be found in the docs at the /docs endpoint.

## Running

To run the API on your local machine, follow the steps below:

1. Make sure you have Python 3.9+ installed.

2. Set up a virtual environment using venv in the same directory:

`py -m venv venv`

To enter the environment (on Windows) run:

`venv\Scripts\Activate.bat`

3. Install/update the required dependancies:

`pip install -U -r requirements.txt`

4. Start the API using Uvicorn:

`uvicorn main:app --reload`
