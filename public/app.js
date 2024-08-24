'use strict'
document.addEventListener('DOMContentLoaded', () => {
    const btnsTables = document.querySelectorAll('.tables-wrapper .table-item .btn button');
    const popupTable = document.querySelector('.popup-leave-table');

    if (btnsTables && popupTable) {
        btnsTables.forEach(btn => {
            btn.addEventListener('click', () => {
                popupTable.classList.add('active');
                popupTable.querySelector('.title').innerHTML = `Make empty ${btn.parentNode.parentNode.parentNode.querySelector('.table-title').innerHTML}?`;
                popupTable.querySelector('#id').value = btn.parentNode.parentNode.parentNode.querySelector('.id').value;
            });
        });

        document.querySelector('.choose-no').addEventListener('click', () => {
            popupTable.classList.remove('active');
        });
    }

    const popupBtnsClose = document.querySelectorAll('.admin-panel-wrapper .close-popup');
    const popupBtnsOpen = document.querySelectorAll('.admin-panel-wrapper .open-popup')

    if (popupBtnsClose && popupBtnsOpen) {
        popupBtnsClose.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentNode.classList.remove('active-popup');
            });
        });

        popupBtnsOpen.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentNode.querySelector('.popup-add-product').classList.add('active-popup');
            });
        });
    }

    const menuCategoryTitles = document.querySelectorAll('.menu-wrapper li');
    const productImage = document.querySelectorAll('.menu-wrapper .product-image img');
    const productsCollections = document.querySelectorAll('.menu-wrapper .products .product');

    if (menuCategoryTitles && productImage && productsCollections) {
        menuCategoryTitles.forEach((li, idx) => {
            li.addEventListener('click', () => {
                menuCategoryTitles.forEach(el => {
                    el.classList.remove('active-category');
                });

                productsCollections.forEach(prod => {
                    prod.classList.remove('active-product');
                });

                productsCollections.forEach(prod => {
                    if (prod.classList.value.includes(menuCategoryTitles[idx].classList.value)) {
                        prod.classList.add('active-product');
                    }
                });

                li.classList.add('active-category');
            });
        });

        productImage.forEach(img => {
            img.src = img.src.replace('http://localhost:5000/management/images/', '/');
        });
    }

    const btnsAddToCart = document.querySelectorAll('.menu-wrapper .products .product button');3+\67
    
    const cart = document.querySelector('.menu-wrapper .cart');

    if (btnsAddToCart) {
        btnsAddToCart.forEach(btn => {
            btn.addEventListener('click', () => {
                let isSame = false;
                const cartProducts = document.querySelectorAll('.menu-wrapper .cart .cart-prod');
                const name = btn.parentNode.parentNode.querySelector('.title-product').innerHTML;
                const price = btn.parentNode.parentNode.querySelector('.price').innerHTML;
                const amount = btn.parentNode.querySelector('input').value;

                if (cartProducts) {
                    cartProducts.forEach(prod => {
                        const equalName = prod.querySelector('.cart-prod-title').innerHTML;

                        if (name === equalName) {
                            const newValue = Number(amount) + Number(prod.querySelector('.cart-prod-price .amount').innerHTML.replace('(x', '').replace(')', ''));
                            prod.querySelector('.cart-prod-price .amount').innerHTML = '(x' + newValue + ')';
                            prod.querySelector('.amount').value = newValue;
                            isSame = true;
                            return;
                        }
                    });
                }

                if (isSame) return;
                cart.innerHTML += `<div class="cart-prod">
                            <input type="hidden" class="name" name="name" value="${name}">
                            <input type="hidden" class="price" name="price" value="${Number(price.replace('RON', ''))}">
                            <input type="hidden" class="amount" name="amount" value="${amount}">
                            <div class="cart-prod-title">${name}</div>
                            <div class="cart-prod-price"><span class="price">${price} </span> <span class="amount">(x${amount})</span></div>
                            <div class="delete-cart-prod"><i class="fa-solid fa-trash"></i></div>
                        </div>`

                cart.querySelectorAll('.delete-cart-prod i').forEach(btn => {
                    btn.onclick = () => {
                        cart.removeChild(btn.parentNode.parentNode);
                    };
                });
            });
        });
    }

    const btnsSearch = document.querySelectorAll('.products-collection .search');
    const collections = document.querySelectorAll('.products-collection');

    const showAllProdBtns = document.querySelectorAll('.products-collection .show-all');

    btnsSearch.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const name = document.querySelectorAll('.products-collection .name-value')[idx].value.toLowerCase();

            const products = collections[idx].querySelectorAll('.product-crud');

            products.forEach(prod => {
                prod.classList.remove('show');
            });

            products.forEach(prod => {
                const title = prod.querySelector('.name').textContent.toLowerCase();

                if (title.includes(name)) {
                    prod.classList.add('show');
                }
            });
        });
    });

    showAllProdBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const products = collections[idx].querySelectorAll('.product-crud');

            products.forEach(prod => {
                prod.classList.add('show');
            });
        });
    });
});