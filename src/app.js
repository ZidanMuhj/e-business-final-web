document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Web Design', img: '1.jpg', price: 750000 },
      { id: 2, name: 'Application Software', img: '2.jpg', price: 1000000 },
      { id: 3, name: 'Shopping Website', img: '3.PNG', price: 500000 },
      { id: 4, name: 'Portfolio Website', img: '4.png', price: 200000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if(!cartItem){
        this.items.push({...newItem, quantity: 1, total: newItem.price});
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if(item.id !== newItem.id) {
            return item;
          } else{
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += newItem.price;
            return item;
          }
        })
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if(cartItem.quantity > 1) {
        this.items = this.items.map((item) =>{
          if(item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter ((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    }
  });
});

const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};