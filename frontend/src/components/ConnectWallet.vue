<template>
  <div>
    <b-alert show variant="warning">No wallet selected.</b-alert>
    <b-button
      variant="outline-primary"
      @click="connectWallet"
    >
      Connect
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'ConnectWallet',

  methods: {
    async connectWallet () {
      const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

      this.handleWalletEvents();
      this.$store.dispatch('wallet/setSelectedAddress', selectedAddress);
    },

    handleWalletEvents () {
      window.ethereum.on('accountsChanged', ([newAddress]) => {
        this.$store.dispatch('wallet/setSelectedAddress', undefined);
      });

      window.ethereum.on('chainChanged', ([networkId]) => {
        this.$store.dispatch('wallet/setSelectedAddress', undefined);
      });
    }
  }
};
</script>
