import sys
sys.path.insert(0,'.')

from algobpy.parse import parse_params
from pyteal import *

def contract_account(receiver_addr):

    def basic_checks(txn: Txn): return And(
        txn.rekey_to() == Global.zero_address(),
        txn.close_remainder_to() == Global.zero_address()
    )

    '''
    Check if txn amount is less than 1 Algo and the correct receiver
    '''
    program = And(
        basic_checks(Txn),
        # Write your code here
    )

    return program

if __name__ == "__main__":
    # Default receiver address used if params are not supplied when deploying this contract
    params = {
        "RECEVIER": "WRBVLPUHQZ5O2UIZAKYKKMOUSNPOFIL6ALUZQZLHBDUSIKXHAEEIELWBFQ",
    }

    # Overwrite params if sys.argv[1] is passed
    if(len(sys.argv) > 1):
        params = parse_params(sys.argv[1], params)

    print(compileTeal(contract_account(params["RECEVIER"]), mode=Mode.Signature, version=5))