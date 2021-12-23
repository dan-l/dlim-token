<template>
  <div class="dapp mx-auto">
    <h1>Dapp Token</h1>

    <b-alert
      variant="success"
      :show="hasSelectedWallet"
    >
      {{ `Account ${address}` }}
    </b-alert>

    <no-wallet v-if="!hasWalletApplication" />
    <connect-wallet v-else-if="!hasSelectedWallet" />
    <token v-else />
  </div>
</template>

<script>
import NoWallet from './NoWallet';
import ConnectWallet from './ConnectWallet';
import Token from './Token';

export default {
  name: 'Dapp',

  components: {
    NoWallet,
    ConnectWallet,
    Token
  },

  computed: {
    hasWalletApplication () {
      return !!window.ethereum;
    },

    hasSelectedWallet () {
      return this.$store.getters['wallet/hasAddress'];
    },

    address () {
      return this.$store.getters['wallet/address'];
    }
  }
};
</script>

<style>
.dapp {
  width: 500px;
}
</style>
