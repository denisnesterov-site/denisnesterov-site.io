const productsBtn = document.querySelectorAll('.btn2');
const cartProductsList = document.querySelector('.cart-content_list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart-quantity');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};

const printQuantity = () => {
    let length = cartProductsList.querySelector('.cart-content_item').children.length;
    cartQuantity.textContent = length;
};

const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} р.`;
};

const generateCartProduct = (img, title, price, id) => {
    return `
        <li class="cart-content_item">
            <article class="cart-content_product cart-product" data-id = "${id}">
                <img src="${img}" class="cart-product_img">
                <div class="cart-product_text">
                    <h3 class="cart-product_title">${title}</h3>
                    <span class="cart-product_price">${price} р.</span>
                </div>
                <button class="cart-product_delete" aria-label="Удалить товар"></button>
            </article>
        </li>
    
    `;
}

const deleteProducts = (productParent) => {
    
    let id = productParent.querySelector('.cart-product').dataset.id;
    //document.querySelector(`.catalog_item[data-id = "${}"]`).querySelector('.btn2').disabled = false;

    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product_price').textContent));
    minusFullPrice(currentPrice);
    printFullPrice();
    productParent.remove();
    printQuantity();
    
};

productsBtn.forEach(el => {
    el.closest('.catalog_item').setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.catalog_item');
        let id = parent.dataset.id;
        let img = parent.querySelector('.item_img').getAttribute('src');
        let title = parent.querySelector('.subtitle').textContent;
        let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.cost').textContent));

        //summ
        plusFullPrice(priceNumber);
        console.log(price);
        //print full price
        printFullPrice();
        //add to cart
        cartProductsList.querySelector('.cart-content_item').insertAdjacentHTML('beforeend', generateCartProduct(img, title, priceNumber, id))
        //count and print quantity
        printQuantity();
        //disabled btn
        self.disabled = true;
    });
});

cartProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-product_delete')) {
        deleteProducts(e.target.closest('.cart-content_item'));
    }
});