<template>
  <div>
    <b-spinner
      v-if="!address"
      variant="primary"
    >
    </b-spinner>
    <template  v-else>
      <b-card
        :title="`${this.tokenName} (${this.tokenSymbol})`"
        tag="article"
      >
        <b-card-text>
          {{ balance }}
        </b-card-text>

        <b-button
          variant="outline-primary"
          @click="updateBalance"
        >
          Refresh
      </b-button>
      </b-card>

      <b-card
        title="Transfer"
        :sub-title="`transfer ${tokenSymbol} to others`"
      >
        <b-spinner
          v-if="this.tx.id"
          variant="primary"
        >
        </b-spinner>
        <b-form
          v-else
          @submit="onSubmitTransfer"
          @reset="onResetTransfer"
        >
          <b-form-group
             id="input-group-1"
             label="Address"
             label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.transferAddress"
              type="text"
              placeholder="Enter value"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Value"
            label-for="input-2"
            description="Please make sure you have enough balance to transfer."
          >
            <b-form-input
              id="input-2"
              v-model="form.transferValue"
              type="text"
              placeholder="Enter value"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-alert
          :show="!!tx.error"
          class="mt-4"
          variant="danger"
        >
           {{ tx.error }}
         </b-alert>
       </b-card>
    </template>
  </div>
</template>

<script>
// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from 'ethers';
// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import TokenArtifact from '../contracts/Token.json';
import contractAddress from '../contracts/contract-address.json';

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const token = new ethers.Contract(
  contractAddress.Token,
  TokenArtifact.abi,
  provider.getSigner(0)
);

export default {
  name: 'Token',

  data () {
    return {
      tokenName: undefined,
      tokenSymbol: undefined,
      balance: 0,
      form: {
        transferAddress: undefined,
        transferValue: 0
      },
      tx: {
        id: undefined,
        error: undefined
      }
    };
  },

  async created () {
    this.tokenName = await token.name();
    this.tokenSymbol = await token.symbol();

    await this.updateBalance();
  },

  computed: {
    address () {
      return this.$store.getters['wallet/address'];
    }
  },

  methods: {
    async updateBalance () {
      this.balance = await token.balanceOf(this.address);
    },

    async onSubmitTransfer (event) {
      event.preventDefault();
      try {
        await this.transfer();
        // If we got here, the transaction was successful, so you may want to
        // update your state. Here, we update the user's balance.
        await this.updateBalance();
      } catch (e) {
        this.tx.error = e.message;
      }
    },

    async transfer () {
      const to = this.form.transferAddress;
      const amount = this.form.transferValue;
      this.tx.error = undefined;

      try {
        // user validation to avoid wasting gas for invalid input that fails the transaction
        this.userInputValidation(to, amount);

        // Sending a transaction is a complex operation:
        //   - The user can reject it
        //   - It can fail before reaching the ethereum network (i.e. if the user
        //     doesn't have ETH for paying for the tx's gas)
        //   - It has to be mined, so it isn't immediately confirmed.
        //     Note that some testing networks, like Hardhat Network, do mine
        //     transactions immediately, but your dapp should be prepared for
        //     other networks.
        //   - It can fail once mined.

        // We send the transaction, and save its hash in the Dapp's state. This
        // way we can indicate that we are waiting for it to be mined.
        const tx = await token.transfer(to, amount);
        this.tx.id = tx.hash;

        // We use .wait() to wait for the transaction to be mined. This method
        // returns the transaction's receipt.
        const receipt = await tx.wait();

        // The receipt, contains a status flag, which is 0 to indicate an error.
        if (receipt.status === 0) {
          // We can't know the exact error that made the transaction fail when it
          // was mined, so we throw this generic one.
          throw new Error('Transaction failed');
        }
      } catch (e) {
        // We check the error code to see if this error was produced because the
        // user rejected a tx. If that's the case, we do nothing.
        if (e.code === ERROR_CODE_TX_REJECTED_BY_USER) {
          return;
        }

        throw e;
      } finally {
        this.tx.id = undefined;
      }
    },

    userInputValidation (to, amount) {
      if (Number(amount) > this.balance) {
        throw new Error(`Amount ${amount} is greater than balance. Refresh balance to see the latest balance.`);
      }

      if (!to.startsWith('0x')) {
        throw new Error('Make sure you enter a valid address');
      }
    },

    onResetTransfer (event) {
      event.preventDefault();
      this.form.transferAddress = undefined;
      this.form.transferValue = undefined;
    }
  }
};
</script>
