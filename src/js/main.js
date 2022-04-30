import ProductData from './productData.js'
import ProductList from './productList'

const dataSource = new ProductData('tents')

const listTemplate = document.querySelector('.product-list')

const renderedList = new ProductList('tents', dataSource, listTemplate);

renderedList.init();